// نظام التخصيص والترجمة الشامل للواجهة

export interface UIConfig {
  branding: {
    appName: string;
    appNameAr: string;
    tagline: string;
    taglineAr: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };

  navigation: {
    [key: string]: {
      en: string;
      ar: string;
    };
  };

  messages: {
    [key: string]: {
      en: string;
      ar: string;
    };
  };

  defaults: {
    promptText: string;
    primaryColor: string;
    processingTimeout: number;
    maxFileSize: number;
    supportedFormats: string[];
  };

  ai: {
    defaultParameters: {
      [toolId: string]: Record<string, any>;
    };
  };
}

export const UI_CONFIG: UIConfig = {
  branding: {
    appName: "KNOUX VERSA",
    appNameAr: "نوكس فيرسا",
    tagline: "The Ultimate AI Image Platform",
    taglineAr: "المنصة النهائية للصور بالذكاء الاصطناعي",
    logo: "/assets/logo.png",
    favicon: "/assets/favicon.ico",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#f59e0b",
  },

  navigation: {
    home: { en: "Home", ar: "الرئيسية" },
    tools: { en: "AI Tools", ar: "أدوات الذكاء الاصطناعي" },
    gallery: { en: "Gallery", ar: "المعرض" },
    templates: { en: "Templates", ar: "القوالب" },
    vip: { en: "VIP", ar: "كبار الشخصيات" },
    about: { en: "About", ar: "حول" },
    support: { en: "Support", ar: "الدعم" },
    settings: { en: "Settings", ar: "الإعدادات" },
  },

  messages: {
    welcome: {
      en: "Welcome to KNOUX VERSA",
      ar: "مرحباً بك في نوكس فيرسا",
    },
    processing: {
      en: "Processing your image...",
      ar: "جاري معالجة صورتك...",
    },
    completed: {
      en: "Processing completed successfully!",
      ar: "تمت المعالجة بنجاح!",
    },
    error: {
      en: "An error occurred. Please try again.",
      ar: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    },
    uploadImage: {
      en: "Upload an image to get started",
      ar: "ارفع صورة للبدء",
    },
    selectTool: {
      en: "Select an AI tool",
      ar: "اختر أداة ذكاء اصطناعي",
    },
    vipRequired: {
      en: "VIP access required for this feature",
      ar: "يتطلب وصول VIP لهذه الميزة",
    },
    downloadReady: {
      en: "Your image is ready for download",
      ar: "صورتك جاهزة للتحميل",
    },
  },

  defaults: {
    promptText: "A mystical transformation with ethereal lighting",
    primaryColor: "#6366f1",
    processingTimeout: 300000, // 5 minutes
    maxFileSize: 10485760, // 10MB
    supportedFormats: ["PNG", "JPG", "JPEG", "WEBP"],
  },

  ai: {
    defaultParameters: {
      "magic-morph": {
        transformationStrength: 75,
        preserveOriginal: true,
        quality: "high",
      },
      "remove-replace": {
        removalPrecision: 80,
        fillMethod: "ai_generate",
        blendStrength: 70,
      },
      "style-transfer": {
        styleType: "impressionist",
        styleStrength: 70,
        preserveContent: true,
      },
      "background-replace": {
        backgroundType: "nature",
        edgeSoftness: 50,
        lightingMatch: true,
      },
      "object-recolor": {
        targetColor: "#FF6B6B",
        colorIntensity: 80,
        preserveShadows: true,
      },
      "ai-enhance": {
        upscaleFactor: "2x",
        enhancementLevel: 75,
        noiseReduction: true,
      },
      "vip-magic-morph": {
        contentLevel: "moderate",
        transformationIntensity: 85,
        uncensoredMode: true,
      },
    },
  },
};

// نظام الترجمة
export class Translation {
  private static currentLanguage: "en" | "ar" = "ar";

  static setLanguage(lang: "en" | "ar") {
    this.currentLanguage = lang;
    // حفظ في localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }
  }

  static getLanguage(): "en" | "ar" {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("preferred-language") as "en" | "ar";
      if (saved) {
        this.currentLanguage = saved;
      }
    }
    return this.currentLanguage;
  }

  static t(key: string): string {
    const lang = this.getLanguage();

    // البحث في الرسائل
    if (UI_CONFIG.messages[key]) {
      return UI_CONFIG.messages[key][lang];
    }

    // البحث في التنقل
    if (UI_CONFIG.navigation[key]) {
      return UI_CONFIG.navigation[key][lang];
    }

    // العودة للمفتاح الأصلي إذا لم يتم العثور على الترجمة
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }

  static nav(key: string): string {
    const lang = this.getLanguage();
    return UI_CONFIG.navigation[key]?.[lang] || key;
  }

  static msg(key: string): string {
    const lang = this.getLanguage();
    return UI_CONFIG.messages[key]?.[lang] || key;
  }
}

// مساعدات CSS للألوان المخصصة
export const getCustomColors = () => ({
  primary: UI_CONFIG.branding.primaryColor,
  secondary: UI_CONFIG.branding.secondaryColor,
  accent: UI_CONFIG.branding.accentColor,
});

// الحصول على المعاملات الافتراضية لأداة
export const getDefaultParameters = (toolId: string): Record<string, any> => {
  return UI_CONFIG.ai.defaultParameters[toolId] || {};
};

// التحقق من دعم التنسيق
export const isSupportedFormat = (fileName: string): boolean => {
  const extension = fileName.split(".").pop()?.toUpperCase();
  return extension
    ? UI_CONFIG.defaults.supportedFormats.includes(extension)
    : false;
};

// فحص حجم الملف
export const isValidFileSize = (fileSize: number): boolean => {
  return fileSize <= UI_CONFIG.defaults.maxFileSize;
};

// تصدير الإعدادات للمكونات
export default UI_CONFIG;
