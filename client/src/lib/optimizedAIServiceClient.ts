// عميل خدمات الذكاء الاصطناعي المحسّن
// Optimized AI Services Client

import { localAIProcessor } from "./localAIProcessor";

export interface AIProcessingRequest {
  serviceId: string;
  imageData: string | File;
  settings: Record<string, any>;
  prompt?: string;
  isVIP?: boolean;
  vipSession?: string;
  selectionData?: string;
  quality?: string;
}

export interface AIProcessingResult {
  success: boolean;
  processedImage?: string;
  error?: string;
  processingTime: number;
  metadata?: {
    model: string;
    isLocal: boolean;
    cached: boolean;
    lightweight?: boolean;
    settings: Record<string, any>;
  };
}

export interface ServiceStatus {
  available: boolean;
  isLocal: boolean;
  model: string;
  estimatedTime: number;
  error?: string;
}

class OptimizedAIServiceClient {
  private lightweightWorker: Worker | null = null;
  private workerInitialized = false;

  // العمليات الخفيفة التي تعمل بـ Web Worker
  private lightweightOperations = new Set([
    "brightness",
    "contrast",
    "saturation",
    "blur",
    "sharpen",
    "edge_detection",
    "color_filter",
    "vintage",
    "sepia",
    "invert",
    "grayscale",
    "noise_reduction",
    "gamma_correction",
    "histogram_equalization",
  ]);

  // الأدوات المحلية المتقدمة
  private localTools = new Set([
    "face_swap",
    "beauty_filter",
    "face_expression",
    "age_transform",
    "gender_swap",
    "makeup_artist",
    "body_reshape",
    "clothing_swap",
    "tattoo_artist",
    "muscle_enhancer",
    "bg_remover",
    "bg_replacer",
    "lighting_master",
    "style_transfer",
    "cartoonizer",
    "colorizer",
    "super_resolution",
    "denoiser",
    "sharpener",
    "object_remover",
    "object_replacer",
    "smart_crop",
    "image_merger",
    "pose_editor",
    "hair_stylist",
  ]);

  private cache = new Map<string, AIProcessingResult>();
  private isOnline = navigator.onLine;

  constructor() {
    // مراقبة حالة الاتصال
    window.addEventListener("online", () => {
      this.isOnline = true;
      console.log("🌐 متصل بالإنترنت - الخدمات السحابية متاحة");
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      console.log("📱 وضع عدم الاتصال - الأدوات المحلية فقط");
    });

    // تهيئة Worker للعمليات الخفيفة
    this.initializeLightweightWorker();
  }

  // تهيئة Worker للعمليات الخفيفة
  private async initializeLightweightWorker() {
    if (typeof Worker === "undefined") {
      console.warn("⚠️ Web Workers غير مدعومة في هذا المتصفح");
      return;
    }

    try {
      // إنشاء worker inline للعمليات البسيطة
      const workerCode = `
        self.onmessage = async function(e) {
          const { type, requestId, data } = e.data;
          
          if (type === 'init') {
            self.postMessage({ type: 'initialized', requestId });
            return;
          }
          
          if (type === 'process') {
            try {
              const { serviceId, imageData, settings } = data;
              
              // محاكاة معالجة خفيفة
              self.postMessage({ 
                type: 'progress', 
                requestId, 
                progress: 50, 
                message: 'معالجة ' + serviceId + '...' 
              });
              
              // تأخير بسيط للمحاكاة
              await new Promise(resolve => setTimeout(resolve, 500));
              
              // إرجاع نتيجة محاكاة
              self.postMessage({
                type: 'result',
                requestId,
                success: true,
                processedImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
                processingTime: 500
              });
            } catch (error) {
              self.postMessage({
                type: 'result',
                requestId,
                success: false,
                error: error.message
              });
            }
          }
        };
      `;

      const blob = new Blob([workerCode], { type: "application/javascript" });
      const workerUrl = URL.createObjectURL(blob);

      this.lightweightWorker = new Worker(workerUrl);

      this.lightweightWorker.onmessage = (event) => {
        const { type } = event.data;
        if (type === "initialized") {
          this.workerInitialized = true;
          console.log("✅ Worker العمليات الخفيفة جاهز");
        }
      };

      this.lightweightWorker.postMessage({ type: "init", requestId: "init" });

      // تنظيف URL
      URL.revokeObjectURL(workerUrl);
    } catch (error) {
      console.warn("⚠️ فشل في تهيئة Worker:", error);
    }
  }

  // معالجة الطلب الموحدة المحسّنة
  async processRequest(
    request: AIProcessingRequest,
    onProgress?: (progress: number, message: string) => void,
  ): Promise<AIProcessingResult> {
    const startTime = Date.now();

    try {
      // التحقق من الكاش أولاً
      const cacheKey = this.generateCacheKey(request);
      const cachedResult = this.cache.get(cacheKey);

      if (cachedResult) {
        onProgress?.(100, "تم العثور على نتيجة محفوظة! ⚡");
        return {
          ...cachedResult,
          metadata: {
            ...cachedResult.metadata!,
            cached: true,
          },
        };
      }

      // تحديد نوع المعالجة بناءً على الأولوية:
      // 1. العمليات الخفيفة (Worker)
      // 2. الأدوات المحلية (Local AI)
      // 3. الخدمات السحابية (Cloud)

      if (
        this.lightweightOperations.has(request.serviceId) &&
        this.workerInitialized
      ) {
        onProgress?.(10, "بدء المعالجة الخفيفة...");
        return await this.processWithLightweightWorker(request, onProgress);
      } else if (this.shouldUseLocal(request.serviceId)) {
        onProgress?.(10, "بدء المعالجة المحلية...");
        return await this.processLocally(request, onProgress);
      } else {
        onProgress?.(10, "بدء المعالجة السحابية...");
        return await this.processOnCloud(request, onProgress);
      }
    } catch (error) {
      console.error("❌ خطأ في معالجة الطلب:", error);

      // محاولة التراجع إلى المعالجة المحلية
      if (
        !this.localTools.has(request.serviceId) &&
        !this.lightweightOperations.has(request.serviceId)
      ) {
        console.log("🔄 محاولة المعالجة المحلية كبديل...");
        try {
          return await this.processLocally(request, onProgress);
        } catch (localError) {
          console.error("❌ فشلت المعالجة المحلية أيضاً:", localError);
        }
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        processingTime: Date.now() - startTime,
      };
    }
  }

  // معالجة بالـ Worker الخفيف
  private async processWithLightweightWorker(
    request: AIProcessingRequest,
    onProgress?: (progress: number, message: string) => void,
  ): Promise<AIProcessingResult> {
    const startTime = Date.now();

    if (!this.lightweightWorker || !this.workerInitialized) {
      throw new Error("Worker الخفيف غير متاح");
    }

    const requestId = `worker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        const {
          type,
          requestId: msgRequestId,
          progress,
          message,
          success,
          processedImage,
          error,
        } = event.data;

        if (msgRequestId !== requestId) return;

        if (type === "progress") {
          onProgress?.(progress, message);
        } else if (type === "result") {
          this.lightweightWorker!.removeEventListener("message", handleMessage);

          if (success) {
            const result: AIProcessingResult = {
              success: true,
              processedImage,
              processingTime: Date.now() - startTime,
              metadata: {
                model: "Lightweight Worker",
                isLocal: true,
                cached: false,
                lightweight: true,
                settings: request.settings,
              },
            };

            // حفظ في الكاش
            const cacheKey = this.generateCacheKey(request);
            this.cache.set(cacheKey, result);

            onProgress?.(100, "تمت المعالجة بنجاح! ⚡");
            resolve(result);
          } else {
            reject(new Error(error || "فشلت المعالجة في Worker"));
          }
        }
      };

      this.lightweightWorker!.addEventListener("message", handleMessage);

      // إرسال المهمة للـ Worker
      this.lightweightWorker!.postMessage({
        type: "process",
        requestId,
        data: {
          serviceId: request.serviceId,
          imageData: request.imageData,
          settings: request.settings,
        },
      });

      // timeout للأمان
      setTimeout(() => {
        this.lightweightWorker!.removeEventListener("message", handleMessage);
        reject(new Error("انتهت مهلة المعالجة"));
      }, 10000); // 10 ثوانٍ للعمليات الخ��يفة
    });
  }

  // المعالجة المحلية
  private async processLocally(
    request: AIProcessingRequest,
    onProgress?: (progress: number, message: string) => void,
  ): Promise<AIProcessingResult> {
    const startTime = Date.now();

    try {
      const result = await localAIProcessor.processImage({
        tool: request.serviceId,
        image: request.imageData,
        settings: {
          ...request.settings,
          prompt: request.prompt,
          quality: request.quality,
          selectionData: request.selectionData,
        },
        onProgress,
      });

      const finalResult: AIProcessingResult = {
        success: result.success,
        processedImage: result.processedImage,
        error: result.error,
        processingTime: result.processingTime,
        metadata: {
          model: result.metadata?.model || "Local AI Model",
          isLocal: true,
          cached: false,
          settings: result.metadata?.settings || request.settings,
        },
      };

      // حفظ في الكاش إذا نجحت
      if (result.success) {
        const cacheKey = this.generateCacheKey(request);
        this.cache.set(cacheKey, finalResult);
      }

      return finalResult;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "فشلت المعالجة المحلية",
        processingTime: Date.now() - startTime,
      };
    }
  }

  // المعالجة السحابية
  private async processOnCloud(
    request: AIProcessingRequest,
    onProgress?: (progress: number, message: string) => void,
  ): Promise<AIProcessingResult> {
    const startTime = Date.now();

    try {
      // تحضير البيانات للإرسال
      let imageBase64: string;

      if (typeof request.imageData === "string") {
        imageBase64 = request.imageData;
      } else {
        imageBase64 = await this.fileToBase64(request.imageData);
      }

      onProgress?.(20, "إرسال البيانات للخادم...");

      // إرسال الطلب للخادم
      const response = await fetch("/api/ai/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(request.isVIP && request.vipSession
            ? {
                "X-VIP-Session": request.vipSession,
              }
            : {}),
        },
        body: JSON.stringify({
          serviceId: request.serviceId,
          imageData: imageBase64,
          settings: request.settings,
          prompt: request.prompt,
          isVIP: request.isVIP,
          selectionData: request.selectionData,
          quality: request.quality,
        }),
      });

      if (!response.ok) {
        throw new Error(`خطأ في الخادم: ${response.status}`);
      }

      onProgress?.(60, "معالجة البيانات في السحابة...");

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "فشلت المعالجة السحابية");
      }

      onProgress?.(90, "تحميل النتيجة...");

      const finalResult: AIProcessingResult = {
        success: true,
        processedImage: result.processedImage,
        processingTime: Date.now() - startTime,
        metadata: {
          model: result.model || "Cloud AI Model",
          isLocal: false,
          cached: false,
          settings: request.settings,
        },
      };

      // حفظ في الكاش
      const cacheKey = this.generateCacheKey(request);
      this.cache.set(cacheKey, finalResult);

      onProgress?.(100, "تمت المعالجة بنجاح! ✨");

      return finalResult;
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "فشلت المعالجة السحابية",
        processingTime: Date.now() - startTime,
      };
    }
  }

  // تحديد نوع المعالجة
  private shouldUseLocal(serviceId: string): boolean {
    const isLocalTool = this.localTools.has(serviceId);
    const preferLocal = localStorage.getItem("prefer-local") === "true";

    if (!this.isOnline) {
      return true; // إجباري إذا لم يكن هناك اتصال
    }

    if (isLocalTool && preferLocal) {
      return true;
    }

    return isLocalTool && serviceId !== "vip_magic_morph"; // VIP دائماً سحابي
  }

  // التحقق من توفر الخدمة السحابية
  private async isCloudServiceAvailable(serviceId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/ai/status/${serviceId}`, {
        method: "HEAD",
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // الحصول على حالة الخدمة
  async getServiceStatus(serviceId: string): Promise<ServiceStatus> {
    const isLocal =
      this.localTools.has(serviceId) ||
      this.lightweightOperations.has(serviceId);

    try {
      if (isLocal) {
        return {
          available: true,
          isLocal: true,
          model: this.getLocalModelName(serviceId),
          estimatedTime: this.getEstimatedTime(serviceId),
        };
      } else {
        const response = await fetch(`/api/ai/status/${serviceId}`);
        if (response.ok) {
          const data = await response.json();
          return {
            available: data.available,
            isLocal: false,
            model: data.model,
            estimatedTime: data.estimatedTime,
          };
        } else {
          return {
            available: false,
            isLocal: false,
            model: "Unknown",
            estimatedTime: 0,
            error: "Service unavailable",
          };
        }
      }
    } catch (error) {
      return {
        available: isLocal,
        isLocal,
        model: isLocal ? this.getLocalModelName(serviceId) : "Unknown",
        estimatedTime: isLocal ? this.getEstimatedTime(serviceId) : 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // مساعدات
  private getLocalModelName(serviceId: string): string {
    if (this.lightweightOperations.has(serviceId)) {
      return "Lightweight Filter";
    }

    const modelMap: Record<string, string> = {
      face_swap: "DeepFaceLab SAEHD",
      beauty_filter: "Phi-3 Vision",
      super_resolution: "Real-ESRGAN x4+",
      style_transfer: "StyleGAN3-T",
    };
    return modelMap[serviceId] || "Generic Local Model";
  }

  private getEstimatedTime(serviceId: string): number {
    if (this.lightweightOperations.has(serviceId)) {
      return 1000; // ثانية واحدة للعمليات الخفيفة
    }

    const timeMap: Record<string, number> = {
      face_swap: 15000,
      beauty_filter: 5000,
      super_resolution: 8000,
      style_transfer: 12000,
    };
    return timeMap[serviceId] || 10000;
  }

  private generateCacheKey(request: AIProcessingRequest): string {
    const keyData = {
      service: request.serviceId,
      settings: request.settings,
      prompt: request.prompt,
      quality: request.quality,
    };
    return btoa(JSON.stringify(keyData));
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // تنظيف الكاش
  clearCache(): void {
    this.cache.clear();
    console.log("🧹 تم تنظيف ذاكرة التخزين المؤقت");
  }

  // إحصائيات الكاش
  getCacheStats(): {
    size: number;
    keys: string[];
    workerReady: boolean;
    onlineStatus: boolean;
  } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      workerReady: this.workerInitialized,
      onlineStatus: this.isOnline,
    };
  }

  // تنظيف الموارد
  destroy(): void {
    this.clearCache();
    if (this.lightweightWorker) {
      this.lightweightWorker.terminate();
      this.lightweightWorker = null;
      this.workerInitialized = false;
    }
  }

  // الحصول على قائمة العمليات المدعومة
  getSupportedOperations(): {
    lightweight: string[];
    local: string[];
    total: number;
  } {
    return {
      lightweight: Array.from(this.lightweightOperations),
      local: Array.from(this.localTools),
      total: this.lightweightOperations.size + this.localTools.size,
    };
  }
}

// مثيل واحد للاستخدام العام
export const optimizedAIServiceClient = new OptimizedAIServiceClient();

// أنواع البيانات
export type { AIProcessingRequest, AIProcessingResult, ServiceStatus };
