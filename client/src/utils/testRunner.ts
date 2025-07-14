// أداة اختبار سريعة للخدمات
// Quick Service Test Runner

import { optimizedAIServiceClient } from "@/lib/optimizedAIServiceClient";

export interface TestResult {
  serviceId: string;
  success: boolean;
  processingTime: number;
  error?: string;
  metadata?: any;
}

export class ServiceTestRunner {
  private testImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

  async testLightweightOperations(): Promise<TestResult[]> {
    const operations = [
      "brightness",
      "contrast",
      "saturation",
      "sepia",
      "grayscale",
      "invert",
    ];

    const results: TestResult[] = [];

    for (const operation of operations) {
      try {
        console.log(`🧪 اختبار ${operation}...`);

        const startTime = Date.now();
        const result = await optimizedAIServiceClient.processRequest({
          serviceId: operation,
          imageData: this.testImage,
          settings: { value: 0.5 },
        });

        results.push({
          serviceId: operation,
          success: result.success,
          processingTime: Date.now() - startTime,
          error: result.error,
          metadata: result.metadata,
        });

        console.log(
          `${result.success ? "✅" : "❌"} ${operation}: ${Date.now() - startTime}ms`,
        );
      } catch (error) {
        results.push({
          serviceId: operation,
          success: false,
          processingTime: 0,
          error: error instanceof Error ? error.message : "خطأ غير معروف",
        });
        console.error(`❌ ${operation}:`, error);
      }
    }

    return results;
  }

  async testLocalTools(): Promise<TestResult[]> {
    const tools = ["beauty_filter", "face_expression", "bg_remover"];

    const results: TestResult[] = [];

    for (const tool of tools) {
      try {
        console.log(`🔬 اختبار ${tool}...`);

        const startTime = Date.now();
        const result = await optimizedAIServiceClient.processRequest({
          serviceId: tool,
          imageData: this.testImage,
          settings: {},
        });

        results.push({
          serviceId: tool,
          success: result.success,
          processingTime: Date.now() - startTime,
          error: result.error,
          metadata: result.metadata,
        });

        console.log(
          `${result.success ? "✅" : "❌"} ${tool}: ${Date.now() - startTime}ms`,
        );
      } catch (error) {
        results.push({
          serviceId: tool,
          success: false,
          processingTime: 0,
          error: error instanceof Error ? error.message : "خطأ غير معروف",
        });
        console.error(`❌ ${tool}:`, error);
      }
    }

    return results;
  }

  async testCloudServices(): Promise<TestResult[]> {
    const services = ["vip_magic_morph"];
    const results: TestResult[] = [];

    for (const service of services) {
      try {
        console.log(`☁️ اختبار ${service}...`);

        const startTime = Date.now();
        const result = await optimizedAIServiceClient.processRequest({
          serviceId: service,
          imageData: this.testImage,
          settings: {},
          isVIP: true,
        });

        results.push({
          serviceId: service,
          success: result.success,
          processingTime: Date.now() - startTime,
          error: result.error,
          metadata: result.metadata,
        });

        console.log(
          `${result.success ? "✅" : "❌"} ${service}: ${Date.now() - startTime}ms`,
        );
      } catch (error) {
        results.push({
          serviceId: service,
          success: false,
          processingTime: 0,
          error: error instanceof Error ? error.message : "خطأ غير معروف",
        });
        console.error(`❌ ${service}:`, error);
      }
    }

    return results;
  }

  async runAllTests(): Promise<{
    lightweight: TestResult[];
    local: TestResult[];
    cloud: TestResult[];
    summary: {
      total: number;
      passed: number;
      failed: number;
      avgProcessingTime: number;
    };
  }> {
    console.log("🚀 بدء اختبار جميع الخدمات...");

    const lightweight = await this.testLightweightOperations();
    const local = await this.testLocalTools();
    const cloud = await this.testCloudServices();

    const allResults = [...lightweight, ...local, ...cloud];
    const passed = allResults.filter((r) => r.success).length;
    const failed = allResults.length - passed;
    const avgProcessingTime =
      allResults.reduce((sum, r) => sum + r.processingTime, 0) /
      allResults.length;

    console.log(`📊 ملخص الاختبارات:`);
    console.log(`   المجموع: ${allResults.length}`);
    console.log(`   نجح: ${passed}`);
    console.log(`   فشل: ${failed}`);
    console.log(`   متوسط الوقت: ${avgProcessingTime.toFixed(2)}ms`);

    return {
      lightweight,
      local,
      cloud,
      summary: {
        total: allResults.length,
        passed,
        failed,
        avgProcessingTime,
      },
    };
  }

  async testServiceStatus(): Promise<Record<string, any>> {
    const services = ["brightness", "beauty_filter", "vip_magic_morph"];
    const statuses: Record<string, any> = {};

    for (const service of services) {
      try {
        const status = await optimizedAIServiceClient.getServiceStatus(service);
        statuses[service] = status;
      } catch (error) {
        statuses[service] = {
          available: false,
          error: error instanceof Error ? error.message : "خطأ غير معروف",
        };
      }
    }

    return statuses;
  }

  async testCachePerformance(): Promise<{
    cacheStats: any;
    cacheTest: TestResult;
  }> {
    // اختبار الكاش
    console.log("💾 اختبار أداء الكاش...");

    const testRequest = {
      serviceId: "brightness",
      imageData: this.testImage,
      settings: { value: 0.5 },
    };

    // الطلب الأو�� (بدون كاش)
    const startTime1 = Date.now();
    const result1 = await optimizedAIServiceClient.processRequest(testRequest);
    const time1 = Date.now() - startTime1;

    // الطلب الثاني (مع الكاش)
    const startTime2 = Date.now();
    const result2 = await optimizedAIServiceClient.processRequest(testRequest);
    const time2 = Date.now() - startTime2;

    const cacheStats = optimizedAIServiceClient.getCacheStats();

    console.log(`⏱️ الطلب الأول: ${time1}ms`);
    console.log(`⚡ الطلب الثاني (كاش): ${time2}ms`);
    console.log(
      `🚀 تحسن السرعة: ${(((time1 - time2) / time1) * 100).toFixed(1)}%`,
    );

    return {
      cacheStats,
      cacheTest: {
        serviceId: "cache_test",
        success: result1.success && result2.success,
        processingTime: time2,
        metadata: {
          firstRequestTime: time1,
          secondRequestTime: time2,
          speedImprovement: (((time1 - time2) / time1) * 100).toFixed(1) + "%",
        },
      },
    };
  }
}

// إنشاء مثيل واحد للاستخدام
export const testRunner = new ServiceTestRunner();

// دالة مساعدة للاختبار السريع
export async function quickTest(): Promise<void> {
  try {
    const results = await testRunner.runAllTests();
    console.table(results.summary);

    // اختبار الكاش
    const cacheTest = await testRunner.testCachePerformance();
    console.log("📊 إحصائيات الكاش:", cacheTest.cacheStats);

    // اختبار حالة الخدمات
    const serviceStatuses = await testRunner.testServiceStatus();
    console.log("🔧 حالة الخدمات:", serviceStatuses);
  } catch (error) {
    console.error("❌ فشل في الاختبار العام:", error);
  }
}

// تصدير للاستخدام في وحدة التحكم
if (typeof window !== "undefined") {
  (window as any).quickTest = quickTest;
  (window as any).testRunner = testRunner;
  (window as any).aiClient = optimizedAIServiceClient;
}
