// وحدة عميل خدمات الذكاء الاصطناعي الموحدة
// Unified AI Services Client

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

class AIServiceClient {
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
    "eye_color_changer",
    "teeth_whitener",
    "scar_remover",
    "virtual_jewelry",
    "vintage_filter",
  ]);

  private cache = new Map<string, AIProcessingResult>();
  private isOnline = navigator.onLine;

  constructor() {
    // مراقبة حالة الاتصال
    window.addEventListener("online", () => {
      this.isOnline = true;
      console.log("🌐 تم الاتصال بالإنترنت - الخدمات السحابية متاحة");
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      console.log("📱 وضع عدم الاتصال - استخدام الأدوات المحلية فقط");
    });
  }

  // معالجة الطلب الموحدة
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

      // تحديد ما إذا كان سيتم استخدام المعالجة المحلية أم السحابية
      const useLocal = this.shouldUseLocal(request.serviceId);

      if (useLocal) {
        onProgress?.(10, "بدء المعالجة المحلية...");
        return await this.processLocally(request, onProgress);
      } else {
        onProgress?.(10, "بدء المعالجة السحابية...");
        return await this.processOnCloud(request, onProgress);
      }
    } catch (error) {
      console.error("❌ خطأ في معالجة الطلب:", error);

      // محاولة المعالجة المحلية كبديل
      if (!this.localTools.has(request.serviceId)) {
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
    // استخدم المحلي إذا:
    // 1. الأداة متاحة محلياً
    // 2. لا يوجد اتصال إنترنت
    // 3. أو إذا كانت الأداة في قائمة الأدوات المفضلة محلياً

    const isLocalTool = this.localTools.has(serviceId);
    const preferLocal = localStorage.getItem("prefer-local") === "true";

    if (!this.isOnline) {
      return true; // إجباري إذا لم يكن هناك اتصال
    }

    if (isLocalTool && preferLocal) {
      return true;
    }

    if (isLocalTool && !this.isCloudServiceAvailable(serviceId)) {
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
    const isLocal = this.localTools.has(serviceId);

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
        available: isLocal, // المحلي متاح دائماً
        isLocal,
        model: isLocal ? this.getLocalModelName(serviceId) : "Unknown",
        estimatedTime: isLocal ? this.getEstimatedTime(serviceId) : 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // مساعدات
  private getLocalModelName(serviceId: string): string {
    const modelMap: Record<string, string> = {
      face_swap: "DeepFaceLab SAEHD",
      beauty_filter: "Phi-3 Vision",
      super_resolution: "Real-ESRGAN x4+",
      style_transfer: "StyleGAN3-T",
      // ... المزيد
    };
    return modelMap[serviceId] || "Generic Local Model";
  }

  private getEstimatedTime(serviceId: string): number {
    const timeMap: Record<string, number> = {
      face_swap: 15000,
      beauty_filter: 5000,
      super_resolution: 8000,
      style_transfer: 12000,
      // ... المزيد
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
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// مثيل واحد للاستخدام العام
export const aiServiceClient = new AIServiceClient();

// أنواع البيانات
export type { AIProcessingRequest, AIProcessingResult, ServiceStatus };
