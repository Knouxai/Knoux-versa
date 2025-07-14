import { Router } from "express";
import rateLimit from "express-rate-limit";
import { aiServiceManager } from "../core/AIServiceManager";
import { validateAIRequest } from "../middleware/validation";
import { vipAuthMiddleware } from "../middleware/vipAuth";
import { getCurrentMetrics } from "../middleware/monitoring";

const router = Router();

// معدل الطلبات للمستخدمين العاديين
const standardRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 10, // 10 طلبات كحد أقصى
  message: {
    success: false,
    error: "تم تجاوز حد الطلبات المسموح، حاول مرة أخرى بعد 15 دقيقة",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// معدل الطلبات للمستخدمين VIP
const vipRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // 100 طلب كحد أقصى
  message: {
    success: false,
    error: "تم تجاوز حد طلبات VIP، حاول مرة أخرى بعد 15 دقيقة",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// فحص صحة النظام
router.get("/health", async (req, res) => {
  try {
    const isReady = aiServiceManager.isReady();
    const metrics = getCurrentMetrics();

    res.json({
      success: true,
      status: isReady ? "healthy" : "initializing",
      timestamp: new Date().toISOString(),
      metrics: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        requests: {
          total: metrics.requestCount,
          active: metrics.activeRequests,
          success: metrics.successCount,
          errors: metrics.errorCount,
        },
      },
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: "unhealthy",
      error: "System health check failed",
    });
  }
});

// حالة الخدمات
router.get("/status", async (req, res) => {
  try {
    const status = aiServiceManager.getServicesStatus();

    res.json({
      success: true,
      data: status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("خطأ في الحصول على حالة الخدمات:", error);
    res.status(500).json({
      success: false,
      error: "فشل في الحصول على حالة الخدمات",
    });
  }
});

// حالة خدمة محددة
router.get("/status/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const serviceInfo = aiServiceManager.getServiceInfo(serviceId);

    if (!serviceInfo) {
      return res.status(404).json({
        success: false,
        error: `خدمة غير موجودة: ${serviceId}`,
      });
    }

    const status = aiServiceManager.getServicesStatus();
    const serviceStatus = status.services[serviceId];

    res.json({
      success: true,
      available: true,
      service: serviceInfo,
      status: serviceStatus,
      model: serviceInfo.model,
      estimatedTime: serviceInfo.estimatedTime,
    });
  } catch (error) {
    console.error(
      `خطأ في الحصول على حالة الخدمة ${req.params.serviceId}:`,
      error,
    );
    res.status(500).json({
      success: false,
      error: "فشل في الحصول على حالة الخدمة",
    });
  }
});

// معالجة الطلبات
router.post(
  "/process",
  async (req, res, next) => {
    // تحد��د نوع المعدل حسب VIP
    const isVIP = req.body.isVIP || req.headers["x-vip-session"];
    if (isVIP) {
      return vipRateLimit(req, res, next);
    } else {
      return standardRateLimit(req, res, next);
    }
  },
  validateAIRequest,
  async (req, res, next) => {
    // التحقق من VIP إذا كان مطلوباً
    if (req.body.isVIP) {
      return vipAuthMiddleware(req, res, next);
    }
    next();
  },
  async (req, res) => {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      const {
        serviceId,
        imageData,
        settings = {},
        prompt = "",
        isVIP = false,
        selectionData,
        quality = "high",
      } = req.body;

      // التحقق من وجود الخدمة
      const serviceInfo = aiServiceManager.getServiceInfo(serviceId);
      if (!serviceInfo) {
        return res.status(404).json({
          success: false,
          error: `خدمة غير موجودة: ${serviceId}`,
          requestId,
        });
      }

      // التحقق من VIP للخدمات المحددة
      if (serviceInfo.isVIP && !isVIP) {
        return res.status(403).json({
          success: false,
          error: "هذه الخدمة تتطلب عضوية VIP",
          requestId,
          requiresVIP: true,
        });
      }

      console.log(`🚀 بدء معالجة الطلب ${requestId} للخدمة ${serviceId}`);

      // تحويل base64 إلى Buffer
      let imageBuffer: Buffer;
      if (imageData.startsWith("data:")) {
        const base64Data = imageData.split(",")[1];
        imageBuffer = Buffer.from(base64Data, "base64");
      } else {
        imageBuffer = Buffer.from(imageData, "base64");
      }

      // إرسال للمعالجة
      const processingRequestId = await aiServiceManager.processRequest({
        serviceId,
        imageData: imageBuffer,
        settings: {
          ...settings,
          prompt,
          quality,
          selectionData,
        },
        userId: req.ip,
        isVIP,
      });

      // إعداد الاستجابة المباشرة
      res.json({
        success: true,
        requestId: processingRequestId,
        message: "تم إرسال الطلب للمعالجة",
        estimatedTime: serviceInfo.estimatedTime,
      });

      // مراقبة نتيجة المعالجة
      const handleResult = (result: any) => {
        if (result.id === processingRequestId) {
          console.log(`✅ انتهت معالجة الطلب ${processingRequestId}`);
          aiServiceManager.off("result", handleResult);

          // هنا يمكن إضافة WebSocket للإشعارات المباشرة
          // أو حفظ النتيجة في قاعدة البيانات للاستعلام لاحقاً
        }
      };

      const handleError = (error: any) => {
        if (error.id === processingRequestId) {
          console.error(`❌ فشل الطلب ${processingRequestId}:`, error.error);
          aiServiceManager.off("error", handleError);
        }
      };

      aiServiceManager.on("result", handleResult);
      aiServiceManager.on("error", handleError);

      // تنظيف المراقبة بعد timeout
      setTimeout(() => {
        aiServiceManager.off("result", handleResult);
        aiServiceManager.off("error", handleError);
      }, serviceInfo.estimatedTime + 30000); // 30 ثانية إضافية
    } catch (error) {
      console.error(`❌ خطأ في معالجة الطلب ${requestId}:`, error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "خطأ داخلي في الخادم",
        requestId,
      });
    }
  },
);

// الحصول على نتيجة الطلب
router.get("/result/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;

    // هنا يمكن البحث في قاعدة البيانات أو الكاش عن النتيجة
    // للآن سنرجع رسالة أن الطلب قيد المعالجة

    res.json({
      success: true,
      status: "processing",
      message: "الطلب قيد المعالجة، يرجى المحاولة مرة أخرى",
      requestId,
    });
  } catch (error) {
    console.error(
      `خطأ في الحصول على نتيجة الطلب ${req.params.requestId}:`,
      error,
    );
    res.status(500).json({
      success: false,
      error: "فشل في الحصول على نتيجة الطلب",
    });
  }
});

// إلغاء الطلب
router.delete("/cancel/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;

    // إلغاء الطلب من القائمة إذا كان ما زال في الانتظار
    // للآن سنرجع رسالة نجاح

    res.json({
      success: true,
      message: "تم إلغاء الطلب",
      requestId,
    });
  } catch (error) {
    console.error(`خطأ في إلغاء الطلب ${req.params.requestId}:`, error);
    res.status(500).json({
      success: false,
      error: "فشل في إلغاء الطلب",
    });
  }
});

// الحصول على قائمة الخدمات المتاحة
router.get("/services", async (req, res) => {
  try {
    const services = aiServiceManager.getServicesStatus();

    const servicesList = Object.entries(services.services).map(
      ([id, service]: [string, any]) => ({
        id,
        name: service.name,
        model: service.model,
        isVIP: service.isVIP,
        gpuRequired: service.gpuRequired,
        estimatedTime: service.estimatedTime,
        available: service.workersReady,
        activeProcessing: service.activeProcessing,
      }),
    );

    res.json({
      success: true,
      services: servicesList,
      totalServices: servicesList.length,
      availableServices: servicesList.filter((s) => s.available).length,
    });
  } catch (error) {
    console.error("خطأ في الحصول على قائمة الخدمات:", error);
    res.status(500).json({
      success: false,
      error: "فشل في الحصول على قائمة الخدمات",
    });
  }
});

// معلومات الإحصائيات
router.get("/metrics", async (req, res) => {
  try {
    const metrics = getCurrentMetrics();
    const servicesStatus = aiServiceManager.getServicesStatus();

    res.json({
      success: true,
      metrics: {
        system: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          timestamp: new Date().toISOString(),
        },
        requests: {
          total: metrics.requestCount,
          active: metrics.activeRequests,
          success: metrics.successCount,
          errors: metrics.errorCount,
          successRate:
            metrics.requestCount > 0
              ? ((metrics.successCount / metrics.requestCount) * 100).toFixed(
                  2,
                ) + "%"
              : "0%",
        },
        services: {
          total: Object.keys(servicesStatus.services).length,
          queueLength: servicesStatus.queueLength,
          totalActive: servicesStatus.totalActive,
        },
        cache: servicesStatus.cacheStats,
      },
    });
  } catch (error) {
    console.error("خطأ في الحصول على الإحصائيات:", error);
    res.status(500).json({
      success: false,
      error: "فشل في الحصول على الإحصائيات",
    });
  }
});

export default router;
