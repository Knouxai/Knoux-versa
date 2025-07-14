// عامل معالجة الذكاء الاصطناعي الخفيف
// Lightweight AI Processing Worker

// دعم Web Workers مع TypeScript
declare const self: DedicatedWorkerGlobalScope;

interface WorkerMessage {
  type: "process" | "cancel" | "init";
  requestId: string;
  data?: any;
}

interface ProcessingTask {
  requestId: string;
  serviceId: string;
  imageData: ImageData;
  settings: Record<string, any>;
  onProgress?: (progress: number, message: string) => void;
}

class LightweightAIWorker {
  private isInitialized = false;
  private activeTasks = new Map<string, ProcessingTask>();
  private supportedOperations = new Set([
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

  constructor() {
    this.init();
  }

  async init() {
    if (this.isInitialized) return;

    console.log("🚀 تهيئة عامل الذكاء الاصطناعي الخفيف...");

    // تحقق من دعم ImageData
    if (typeof ImageData === "undefined") {
      console.warn("⚠️ ImageData غير مدعوم في هذا Worker");
      return;
    }

    this.isInitialized = true;
    console.log("✅ عامل الذكاء الاصطناعي الخفيف جاهز");
  }

  async processTask(task: ProcessingTask): Promise<any> {
    const { requestId, serviceId, imageData, settings } = task;

    try {
      console.log(`🔄 بدء معالجة ${serviceId} للطلب ${requestId}`);

      // تحقق من دعم العملية
      if (!this.supportedOperations.has(serviceId)) {
        throw new Error(`العملية ${serviceId} غير مدعومة في Worker الخفيف`);
      }

      // تقرير التقدم
      this.reportProgress(requestId, 10, "بدء المعالجة...");

      // تطبيق المرشح المناسب
      const processedImageData = await this.applyLightweightFilter(
        imageData,
        serviceId,
        settings,
        (progress, message) =>
          this.reportProgress(requestId, progress, message),
      );

      this.reportProgress(requestId, 90, "تحويل النتيجة...");

      // تحويل ImageData إلى base64
      const canvas = new OffscreenCanvas(
        processedImageData.width,
        processedImageData.height,
      );
      const ctx = canvas.getContext("2d")!;
      ctx.putImageData(processedImageData, 0, 0);

      const blob = await canvas.convertToBlob({
        type: "image/png",
        quality: 1.0,
      });
      const base64 = await this.blobToBase64(blob);

      this.reportProgress(requestId, 100, "تمت المعالجة بنجاح! ✨");

      return {
        requestId,
        success: true,
        processedImage: base64,
        processingTime: Date.now(),
        metadata: {
          serviceId,
          isLocal: true,
          worker: "lightweight",
          settings,
        },
      };
    } catch (error) {
      console.error(`❌ خطأ في معالجة ${serviceId}:`, error);
      return {
        requestId,
        success: false,
        error: error instanceof Error ? error.message : "خطأ غير معروف",
        processingTime: Date.now(),
      };
    } finally {
      this.activeTasks.delete(requestId);
    }
  }

  private async applyLightweightFilter(
    imageData: ImageData,
    operation: string,
    settings: Record<string, any>,
    onProgress: (progress: number, message: string) => void,
  ): Promise<ImageData> {
    const { width, height } = imageData;
    const data = new Uint8ClampedArray(imageData.data);

    onProgress(20, `تطبيق مرشح ${operation}...`);

    switch (operation) {
      case "brightness":
        this.applyBrightness(data, settings.value || 0.2);
        break;

      case "contrast":
        this.applyContrast(data, settings.value || 1.2);
        break;

      case "saturation":
        this.applySaturation(data, settings.value || 1.3);
        break;

      case "blur":
        await this.applyBlur(data, width, height, settings.radius || 1);
        break;

      case "sharpen":
        await this.applySharpen(data, width, height, settings.intensity || 1);
        break;

      case "edge_detection":
        await this.applyEdgeDetection(data, width, height);
        break;

      case "color_filter":
        this.applyColorFilter(
          data,
          settings.color || "#FF0000",
          settings.intensity || 0.3,
        );
        break;

      case "vintage":
        this.applyVintage(data);
        break;

      case "sepia":
        this.applySepia(data);
        break;

      case "invert":
        this.applyInvert(data);
        break;

      case "grayscale":
        this.applyGrayscale(data);
        break;

      case "noise_reduction":
        await this.applyNoiseReduction(data, width, height);
        break;

      case "gamma_correction":
        this.applyGammaCorrection(data, settings.gamma || 1.2);
        break;

      case "histogram_equalization":
        this.applyHistogramEqualization(data);
        break;

      default:
        throw new Error(`مرشح غير مدعوم: ${operation}`);
    }

    onProgress(80, "إنهاء المعالجة...");
    return new ImageData(data, width, height);
  }

  // مرشحات البكسل البسيطة
  private applyBrightness(data: Uint8ClampedArray, value: number): void {
    const adjustment = value * 255;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, data[i] + adjustment));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + adjustment));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + adjustment));
    }
  }

  private applyContrast(data: Uint8ClampedArray, factor: number): void {
    const offset = 128 * (1 - factor);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, data[i] * factor + offset));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * factor + offset));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * factor + offset));
    }
  }

  private applySaturation(data: Uint8ClampedArray, factor: number): void {
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = Math.min(255, Math.max(0, gray + factor * (data[i] - gray)));
      data[i + 1] = Math.min(
        255,
        Math.max(0, gray + factor * (data[i + 1] - gray)),
      );
      data[i + 2] = Math.min(
        255,
        Math.max(0, gray + factor * (data[i + 2] - gray)),
      );
    }
  }

  private applySepia(data: Uint8ClampedArray): void {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }
  }

  private applyGrayscale(data: Uint8ClampedArray): void {
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
  }

  private applyInvert(data: Uint8ClampedArray): void {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
  }

  private applyVintage(data: Uint8ClampedArray): void {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // تأثير قديم مع نغمة دافئة
      data[i] = Math.min(255, r * 1.1 + 20);
      data[i + 1] = Math.min(255, g * 0.9 + 10);
      data[i + 2] = Math.min(255, b * 0.8);
    }
  }

  private applyColorFilter(
    data: Uint8ClampedArray,
    color: string,
    intensity: number,
  ): void {
    // تحويل اللون من hex إلى RGB
    const hex = color.replace("#", "");
    const filterR = parseInt(hex.substr(0, 2), 16);
    const filterG = parseInt(hex.substr(2, 2), 16);
    const filterB = parseInt(hex.substr(4, 2), 16);

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * (1 - intensity) + filterR * intensity);
      data[i + 1] = Math.min(
        255,
        data[i + 1] * (1 - intensity) + filterG * intensity,
      );
      data[i + 2] = Math.min(
        255,
        data[i + 2] * (1 - intensity) + filterB * intensity,
      );
    }
  }

  private applyGammaCorrection(data: Uint8ClampedArray, gamma: number): void {
    const gammaCorrection = 1 / gamma;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, 255 * Math.pow(data[i] / 255, gammaCorrection));
      data[i + 1] = Math.min(
        255,
        255 * Math.pow(data[i + 1] / 255, gammaCorrection),
      );
      data[i + 2] = Math.min(
        255,
        255 * Math.pow(data[i + 2] / 255, gammaCorrection),
      );
    }
  }

  private applyHistogramEqualization(data: Uint8ClampedArray): void {
    // حساب الهستوجرام
    const histogram = new Array(256).fill(0);
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2],
      );
      histogram[gray]++;
    }

    // حساب التوزيع التراكمي
    const cdf = new Array(256);
    cdf[0] = histogram[0];
    for (let i = 1; i < 256; i++) {
      cdf[i] = cdf[i - 1] + histogram[i];
    }

    // تطبيق التعادل
    const totalPixels = data.length / 4;
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2],
      );
      const newGray = Math.round((cdf[gray] * 255) / totalPixels);

      const ratio = newGray / (gray || 1);
      data[i] = Math.min(255, data[i] * ratio);
      data[i + 1] = Math.min(255, data[i + 1] * ratio);
      data[i + 2] = Math.min(255, data[i + 2] * ratio);
    }
  }

  // مرشحات الالتفاف (أبطأ ولكن أكثر جودة)
  private async applyBlur(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    radius: number,
  ): Promise<void> {
    const kernel = this.generateGaussianKernel(radius);
    await this.applyConvolution(data, width, height, kernel);
  }

  private async applySharpen(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    intensity: number,
  ): Promise<void> {
    const kernel = [
      [0, -intensity, 0],
      [-intensity, 1 + 4 * intensity, -intensity],
      [0, -intensity, 0],
    ];
    await this.applyConvolution(data, width, height, kernel);
  }

  private async applyEdgeDetection(
    data: Uint8ClampedArray,
    width: number,
    height: number,
  ): Promise<void> {
    const kernel = [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ];
    await this.applyConvolution(data, width, height, kernel);
  }

  private async applyNoiseReduction(
    data: Uint8ClampedArray,
    width: number,
    height: number,
  ): Promise<void> {
    const kernel = [
      [1, 2, 1],
      [2, 4, 2],
      [1, 2, 1],
    ].map((row) => row.map((val) => val / 16));
    await this.applyConvolution(data, width, height, kernel);
  }

  private generateGaussianKernel(radius: number): number[][] {
    const size = radius * 2 + 1;
    const kernel: number[][] = [];
    const sigma = radius / 3;
    let sum = 0;

    for (let x = 0; x < size; x++) {
      kernel[x] = [];
      for (let y = 0; y < size; y++) {
        const distance = Math.sqrt((x - radius) ** 2 + (y - radius) ** 2);
        const value = Math.exp(-(distance ** 2) / (2 * sigma ** 2));
        kernel[x][y] = value;
        sum += value;
      }
    }

    // تطبيع الكيرنل
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        kernel[x][y] /= sum;
      }
    }

    return kernel;
  }

  private async applyConvolution(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    kernel: number[][],
  ): Promise<void> {
    const originalData = new Uint8ClampedArray(data);
    const kernelSize = kernel.length;
    const offset = Math.floor(kernelSize / 2);

    for (let y = offset; y < height - offset; y++) {
      for (let x = offset; x < width - offset; x++) {
        let r = 0,
          g = 0,
          b = 0;

        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const pixelY = y + ky - offset;
            const pixelX = x + kx - offset;
            const pixelIndex = (pixelY * width + pixelX) * 4;
            const kernelValue = kernel[ky][kx];

            r += originalData[pixelIndex] * kernelValue;
            g += originalData[pixelIndex + 1] * kernelValue;
            b += originalData[pixelIndex + 2] * kernelValue;
          }
        }

        const currentIndex = (y * width + x) * 4;
        data[currentIndex] = Math.min(255, Math.max(0, r));
        data[currentIndex + 1] = Math.min(255, Math.max(0, g));
        data[currentIndex + 2] = Math.min(255, Math.max(0, b));
      }

      // تقرير التقدم أثناء الالتفاف
      if (y % 10 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
  }

  private reportProgress(
    requestId: string,
    progress: number,
    message: string,
  ): void {
    self.postMessage({
      type: "progress",
      requestId,
      progress,
      message,
    });
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  cancelTask(requestId: string): void {
    if (this.activeTasks.has(requestId)) {
      this.activeTasks.delete(requestId);
      console.log(`🛑 تم إلغاء المهمة ${requestId}`);
    }
  }

  getActiveTasks(): string[] {
    return Array.from(this.activeTasks.keys());
  }
}

// إنشاء مثيل العامل
const worker = new LightweightAIWorker();

// معالج الرسائل
self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const { type, requestId, data } = event.data;

  switch (type) {
    case "init":
      await worker.init();
      self.postMessage({
        type: "initialized",
        requestId,
        supportedOperations: Array.from(worker["supportedOperations"]),
      });
      break;

    case "process":
      const result = await worker.processTask(data);
      self.postMessage({
        type: "result",
        requestId,
        ...result,
      });
      break;

    case "cancel":
      worker.cancelTask(requestId);
      self.postMessage({
        type: "cancelled",
        requestId,
      });
      break;

    default:
      console.warn(`نوع رسالة غير معروف: ${type}`);
  }
};

// معالج الأخطاء
self.onerror = (error) => {
  console.error("خطأ في عامل الذكاء الاصطناعي:", error);
  self.postMessage({
    type: "error",
    error: error.message || "خطأ غير معروف في Worker",
  });
};

export {}; // للتصدير كوحدة TypeScript
