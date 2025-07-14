export interface AppConfig {
  name: string;
  nameAr: string;
  version: string;
  description: string;
  descriptionAr: string;
  author: string;
  website: string;
  supportEmail: string;
  features: string[];
  featuresAr: string[];
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    logo: string;
    favicon: string;
  };
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    github?: string;
  };
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
  seo: {
    keywords: string[];
    keywordsAr: string[];
  };
}

// إعدادات التطبيق المخصصة
export const APP_CONFIG: AppConfig = {
  name: "KNOUX VERSA",
  nameAr: "نوكس فيرسا",
  version: "2.0.0",
  description: "The Ultimate AI Image Transformation Platform",
  descriptionAr: "المنصة النهائية لتحويل الصور بالذكاء الاصطناعي",
  author: "KNOUX Technologies",
  website: "https://knoux-versa.com",
  supportEmail: "support@knoux-versa.com",

  features: [
    "Advanced AI Image Processing",
    "22 Premium AI Services",
    "Real-time Transformations",
    "VIP Uncensored Content",
    "Professional Quality Output",
    "Arabic Language Support",
    "Cloud-based Processing",
    "Secure & Private",
  ],

  featuresAr: [
    "معالجة صور متقدمة بالذكاء الاصطناعي",
    "22 خدمة ذكاء اصطناعي مميزة",
    "تحويلات فورية",
    "محتوى VIP غير مقيد",
    "إخراج بجودة احترافية",
    "دعم اللغة العربية",
    "معالجة سحابية",
    "آمن وخاص",
  ],

  branding: {
    primaryColor: "#6366f1", // Indigo
    secondaryColor: "#8b5cf6", // Violet
    accentColor: "#f59e0b", // Amber
    logo: "/assets/logo.png",
    favicon: "/assets/favicon.ico",
  },

  social: {
    twitter: "https://twitter.com/knoux_tech",
    facebook: "https://facebook.com/knouxtech",
    instagram: "https://instagram.com/knoux.tech",
    youtube: "https://youtube.com/@knouxtech",
    github: "https://github.com/knoux-tech",
  },

  analytics: {
    enabled: process.env.NODE_ENV === "production",
    trackingId: process.env.ANALYTICS_TRACKING_ID,
  },

  seo: {
    keywords: [
      "AI image processing",
      "artificial intelligence",
      "image transformation",
      "photo editing",
      "face swap",
      "background removal",
      "style transfer",
      "image enhancement",
      "VIP services",
      "uncensored AI",
    ],

    keywordsAr: [
      "معالجة الصور بالذكاء الاصطناعي",
      "الذكاء الاصطناعي",
      "تحويل الصور",
      "تحرير الصور",
      "تبديل الوجه",
      "إزالة الخلفية",
      "نقل النمط",
      "تحسين الصور",
      "خدمات VIP",
      "ذكاء اصطناعي غير مقيد",
    ],
  },
};

// إعدادات الخدمات المتقدمة
export interface ServiceConfig {
  id: string;
  enabled: boolean;
  endpoint?: string;
  apiKey?: string;
  timeout: number;
  retries: number;
  rateLimit: {
    requests: number;
    window: number; // milliseconds
  };
}

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  huggingface: {
    id: "huggingface",
    enabled: !!process.env.HUGGINGFACE_API_KEY,
    endpoint: "https://api-inference.huggingface.co/models",
    apiKey: process.env.HUGGINGFACE_API_KEY,
    timeout: 30000,
    retries: 3,
    rateLimit: {
      requests: 10,
      window: 60000, // 1 minute
    },
  },

  openai: {
    id: "openai",
    enabled: !!process.env.OPENAI_API_KEY,
    endpoint: "https://api.openai.com/v1",
    apiKey: process.env.OPENAI_API_KEY,
    timeout: 45000,
    retries: 2,
    rateLimit: {
      requests: 20,
      window: 60000,
    },
  },

  anthropic: {
    id: "anthropic",
    enabled: !!process.env.ANTHROPIC_API_KEY,
    endpoint: "https://api.anthropic.com/v1",
    apiKey: process.env.ANTHROPIC_API_KEY,
    timeout: 30000,
    retries: 2,
    rateLimit: {
      requests: 15,
      window: 60000,
    },
  },

  google: {
    id: "google",
    enabled: !!process.env.GOOGLE_API_KEY,
    endpoint: "https://generativelanguage.googleapis.com/v1",
    apiKey: process.env.GOOGLE_API_KEY,
    timeout: 25000,
    retries: 3,
    rateLimit: {
      requests: 30,
      window: 60000,
    },
  },
};

// إعدادات ��لبيئة المختلفة
export const ENVIRONMENT_CONFIGS = {
  development: {
    logLevel: "debug",
    enableDevTools: true,
    hotReload: true,
    mockServices: true,
    corsOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
    rateLimitEnabled: false,
  },

  production: {
    logLevel: "error",
    enableDevTools: false,
    hotReload: false,
    mockServices: false,
    corsOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [],
    rateLimitEnabled: true,
  },

  staging: {
    logLevel: "info",
    enableDevTools: false,
    hotReload: false,
    mockServices: false,
    corsOrigins: ["https://staging.knoux-versa.com"],
    rateLimitEnabled: true,
  },
};

// الحصول على إعدادات البيئة الحالية
export function getCurrentEnvironmentConfig() {
  const env = process.env.NODE_ENV || "development";
  return (
    ENVIRONMENT_CONFIGS[env as keyof typeof ENVIRONMENT_CONFIGS] ||
    ENVIRONMENT_CONFIGS.development
  );
}

// التحقق من حالة الخدمات
export function getServicesStatus() {
  const enabledServices = Object.values(SERVICE_CONFIGS).filter(
    (config) => config.enabled,
  );
  const totalServices = Object.keys(SERVICE_CONFIGS).length;

  return {
    enabled: enabledServices.length,
    total: totalServices,
    services: SERVICE_CONFIGS,
    percentage: Math.round((enabledServices.length / totalServices) * 100),
  };
}

// إظهار ملخص التكوين
export function displayAppStatus() {
  const envConfig = getCurrentEnvironmentConfig();
  const servicesStatus = getServicesStatus();

  console.log("\n🚀 حالة تطبيق KNOUX VERSA:");
  console.log(`   الاسم: ${APP_CONFIG.nameAr} (${APP_CONFIG.name})`);
  console.log(`   الإصدار: ${APP_CONFIG.version}`);
  console.log(`   البيئة: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `   خدمات AI: ${servicesStatus.enabled}/${servicesStatus.total} (${servicesStatus.percentage}%)`,
  );
  console.log(`   CORS Origins: ${envConfig.corsOrigins.length} مصدر`);
  console.log(
    `   Rate Limiting: ${envConfig.rateLimitEnabled ? "مفعل" : "معطل"}`,
  );
  console.log(`   الموقع: ${APP_CONFIG.website}`);
  console.log(`   الدعم: ${APP_CONFIG.supportEmail}`);
  console.log("");
}
