import {
  AiTool,
  AIModelIdentifier,
  ToolFeature,
  AIModelInfo,
} from "@/shared/types";

// Comprehensive database of all 30 AI Tools for KNOUX-VERSA
export const COMPREHENSIVE_AI_TOOLS: AiTool[] = [
  // ==================== FACE CATEGORY ====================
  {
    id: "face_swap",
    name_ar: "تبديل الوجه المتقدم",
    name_en: "Advanced Face Swap",
    description_ar:
      "تبديل الوجوه بدقة عالية وواقعية مذهلة باستخدام تقنيات التعلم العميق",
    description_en:
      "Swap faces with stunning high precision and realism using deep learning techniques",
    category: "Face",
    model_info: {
      name: "DeepFaceLab-SAEHD",
      backend_identifier: AIModelIdentifier.DEEPFACELAB_SAEHD,
      size_gb: 1.2,
      processing_time_secs: "5-15",
      gpu_required: true,
      min_vram_gb: 4,
    },
    features: [
      {
        description_ar: "تبديل فوري للوجوه",
        description_en: "Instant face swapping",
      },
      {
        description_ar: "حفظ ملامح الوجه الطبيعية",
        description_en: "Preserves natural face features",
      },
      {
        description_ar: "دعم الوجوه المتعددة",
        description_en: "Multi-face support",
      },
      {
        description_ar: "تحسين تلقائي للإضاءة",
        description_en: "Automatic lighting adjustment",
      },
    ],
    is_sensitive: true,
    requires_mask: true,
    requires_prompt: false,
    requires_second_image: true,
    input_types: ["image", "image2", "mask"],
    input_schema: {
      image2_base64: {
        type: "string",
        required: true,
        description: "Target face image",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "تبديل الوجه المتقدم" : "Advanced Face Swap",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تبديل الوجوه بدقة عالية وواقعية مذه��ة باستخدام تقنيات التعلم العميق"
        : "Swap faces with stunning high precision and realism using deep learning techniques",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تبديل فوري للوجوه" : "Instant face swapping",
      lang === "ar"
        ? "حفظ ملامح الوجه الطبيعية"
        : "Preserves natural face features",
      lang === "ar" ? "دعم الوجوه المتعددة" : "Multi-face support",
      lang === "ar" ? "تحسين تلقائي للإضاءة" : "Automatic lighting adjustment",
    ],
  },

  {
    id: "ai_beauty_filter",
    name_ar: "فلتر الجمال الذكي",
    name_en: "AI Beauty Filter",
    description_ar: "تحسين الجمال الطبيعي بذكاء اصطناعي متقدم - فلاتر احترافية",
    description_en:
      "Enhance natural beauty with advanced AI - professional filters",
    category: "Face",
    model_info: {
      name: "Phi-3 Vision",
      backend_identifier: AIModelIdentifier.PHI3_VISION,
      size_gb: 2.4,
      processing_time_secs: "2-5",
      gpu_required: false,
    },
    features: [
      {
        description_ar: "تنعيم البشرة الذكي",
        description_en: "Smart skin smoothing",
      },
      {
        description_ar: "تكبير العيون طبيعياً",
        description_en: "Natural eye enlargement",
      },
      {
        description_ar: "تحسين الإضاءة",
        description_en: "Lighting enhancement",
      },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    input_schema: {
      intensity: { type: "number", minimum: 0, maximum: 100, default: 50 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "فلتر الجمال الذكي" : "AI Beauty Filter",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تحسين الجمال الطبيعي بذكاء اصطناعي متقدم - فلاتر احترافية"
        : "Enhance natural beauty with advanced AI - professional filters",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تنعيم البشرة الذكي" : "Smart skin smoothing",
      lang === "ar" ? "تكبير العيون طبيعياً" : "Natural eye enlargement",
      lang === "ar" ? "تحسين الإضاءة" : "Lighting enhancement",
    ],
  },

  {
    id: "age_modifier",
    name_ar: "محرر العمر",
    name_en: "Age Modifier",
    description_ar: "تعديل العمر في الصور - جعل الشخص أصغر أو أكبر سناً",
    description_en: "Modify age in photos - make person younger or older",
    category: "Face",
    model_info: {
      name: "Phi-3 Vision",
      backend_identifier: AIModelIdentifier.PHI3_VISION,
      size_gb: 2.4,
      processing_time_secs: "3-8",
    },
    features: [
      {
        description_ar: "تقليل العمر بشكل طبيعي",
        description_en: "Natural age reduction",
      },
      {
        description_ar: "زيادة العمر واقعياً",
        description_en: "Realistic age progression",
      },
      {
        description_ar: "حفظ الهوية الأساسية",
        description_en: "Preserve core identity",
      },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    input_schema: {
      age_adjustment: { type: "number", minimum: -30, maximum: 30, default: 0 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "محرر العمر" : "Age Modifier",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تعديل العمر في الصور - جعل الشخص أصغر أو أكبر سناً"
        : "Modify age in photos - make person younger or older",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تقليل العمر بشكل طبيعي" : "Natural age reduction",
      lang === "ar" ? "زيادة العمر واقعياً" : "Realistic age progression",
      lang === "ar" ? "حفظ الهوية الأساسية" : "Preserve core identity",
    ],
  },

  {
    id: "expression_changer",
    name_ar: "مغير التعبيرات",
    name_en: "Expression Changer",
    description_ar: "تغيير تعبيرات الوجه - ابتسامة، حزن، غضب، مفاجأة",
    description_en: "Change facial expressions - smile, sad, angry, surprise",
    category: "Face",
    model_info: {
      name: "Phi-3 Vision",
      backend_identifier: AIModelIdentifier.PHI3_VISION,
      size_gb: 2.4,
      processing_time_secs: "2-6",
    },
    features: [
      {
        description_ar: "تعبيرات طبيعية",
        description_en: "Natural expressions",
      },
      {
        description_ar: "تحكم دقيق بالعضلات",
        description_en: "Precise muscle control",
      },
      {
        description_ar: "حفظ ملامح الوجه",
        description_en: "Preserve facial features",
      },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: true,
    input_types: ["image"],
    input_schema: {
      expression: {
        type: "string",
        enum: ["smile", "sad", "angry", "surprise", "neutral"],
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مغير التعبيرات" : "Expression Changer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تغيير تعبيرات الوجه - ابتسامة، حزن، غضب، مفاجأة"
        : "Change facial expressions - smile, sad, angry, surprise",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تعبيرات طبيعية" : "Natural expressions",
      lang === "ar" ? "تحكم دقيق بالعضلات" : "Precise muscle control",
      lang === "ar" ? "حفظ ملامح الوجه" : "Preserve facial features",
    ],
  },

  // ==================== BODY CATEGORY ====================
  {
    id: "pose_master",
    name_ar: "مايستro الوضعيات",
    name_en: "Pose Master",
    description_ar: "تعديل وضعية الجسم والأطراف بذكاء اصطناعي متطور",
    description_en: "Modify body and limb poses with advanced AI",
    category: "Body",
    model_info: {
      name: "ControlNet",
      backend_identifier: AIModelIdentifier.CONTROLNET,
      size_gb: 1.4,
      processing_time_secs: "5-12",
      gpu_required: true,
    },
    features: [
      {
        description_ar: "تحكم دقيق بالمفاصل",
        description_en: "Precise joint control",
      },
      { description_ar: "وضعيات طبيعية", description_en: "Natural poses" },
      {
        description_ar: "حفظ تناسق الجسم",
        description_en: "Maintain body proportions",
      },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: true,
    input_types: ["image"],
    input_schema: {
      pose_description: {
        type: "string",
        description: "Describe the desired pose",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مايسترو الوضعيات" : "Pose Master",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تعديل وضعية الجسم والأطراف بذكاء اصطناعي متطور"
        : "Modify body and limb poses with advanced AI",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تحكم دقيق بالمفاصل" : "Precise joint control",
      lang === "ar" ? "وضعيات طبيعية" : "Natural poses",
      lang === "ar" ? "حفظ تناسق الجسم" : "Maintain body proportions",
    ],
  },

  {
    id: "clothing_swap",
    name_ar: "مبدل الملابس",
    name_en: "Clothing Swap",
    description_ar: "تغيير الملابس والأزيا�� بواقعية عالية",
    description_en: "Change clothes and outfits with high realism",
    category: "Body",
    model_info: {
      name: "Stable Diffusion XL",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 6.9,
      processing_time_secs: "8-15",
      gpu_required: true,
      min_vram_gb: 6,
    },
    features: [
      { description_ar: "ملابس واقعية", description_en: "Realistic clothing" },
      {
        description_ar: "حفظ شكل الجسم",
        description_en: "Preserve body shape",
      },
      { description_ar: "إضاءة طبيعية", description_en: "Natural lighting" },
    ],
    is_sensitive: true,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "mask"],
    input_schema: {
      clothing_description: {
        type: "string",
        description: "Describe the desired clothing",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مبدل الملابس" : "Clothing Swap",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تغيير الملابس والأزياء بواقعية عالية"
        : "Change clothes and outfits with high realism",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "ملابس واقعية" : "Realistic clothing",
      lang === "ar" ? "حفظ شكل الجسم" : "Preserve body shape",
      lang === "ar" ? "إضاءة طبيعية" : "Natural lighting",
    ],
  },

  // ==================== BACKGROUND & ENVIRONMENT ====================
  {
    id: "magic_background_remover",
    name_ar: "محو الخلفية السحري",
    name_en: "Magic Background Remover",
    description_ar: "إزالة الخلفية بدقة مذهلة باستخدام الذكاء الاصطناعي",
    description_en: "Remove backgrounds with stunning precision using AI",
    category: "Background & Environment",
    model_info: {
      name: "Segment Anything",
      backend_identifier: AIModelIdentifier.SEGMENT_ANYTHING,
      size_gb: 0.4,
      processing_time_secs: "2-5",
    },
    features: [
      {
        description_ar: "دقة فائقة في التحديد",
        description_en: "Ultra-precise selection",
      },
      { description_ar: "حواف ناعمة", description_en: "Smooth edges" },
      {
        description_ar: "حفظ التفاصيل الدقيقة",
        description_en: "Preserve fine details",
      },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "محو الخلفية السحري" : "Magic Background Remover",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "إزالة الخلفية بدقة مذهلة باستخدام الذكاء الاصطناعي"
        : "Remove backgrounds with stunning precision using AI",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "دقة فائقة في التحديد" : "Ultra-precise selection",
      lang === "ar" ? "حواف ناعمة" : "Smooth edges",
      lang === "ar" ? "حفظ التفاصيل الدقيقة" : "Preserve fine details",
    ],
  },

  {
    id: "world_changer",
    name_ar: "مغير العوالم",
    name_en: "World Changer",
    description_ar: "تغيير البيئة والمشهد المحيط بالكامل",
    description_en: "Change the entire environment and surrounding scene",
    category: "Background & Environment",
    model_info: {
      name: "Stable Diffusion XL",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 6.9,
      processing_time_secs: "10-20",
      gpu_required: true,
      min_vram_gb: 6,
    },
    features: [
      {
        description_ar: "بيئات فوتوريالستية",
        description_en: "Photorealistic environments",
      },
      { description_ar: "إضاءة متقدمة", description_en: "Advanced lighting" },
      { description_ar: "تكامل طبيعي", description_en: "Natural integration" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "mask"],
    input_schema: {
      environment_description: {
        type: "string",
        description: "Describe the new environment",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مغير العوالم" : "World Changer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تغيير البيئة والمشهد المحيط بالكامل"
        : "Change the entire environment and surrounding scene",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "بيئات فوتوريالستية" : "Photorealistic environments",
      lang === "ar" ? "إضاءة متقدمة" : "Advanced lighting",
      lang === "ar" ? "تكامل طبيعي" : "Natural integration",
    ],
  },

  // ==================== TECHNICAL ENHANCEMENT ====================
  {
    id: "hd_boost",
    name_ar: "محسن الدقة الخارق",
    name_en: "Super Resolution",
    description_ar: "تحسين جودة ودقة الصور حتى 8K - تقنية Real-ESRGAN المتقدمة",
    description_en:
      "Enhance image quality and resolution up to 8K - Advanced Real-ESRGAN technology",
    category: "Technical Enhancement",
    model_info: {
      name: "Real-ESRGAN x4+",
      backend_identifier: AIModelIdentifier.REAL_ESRGAN,
      size_gb: 0.067,
      processing_time_secs: "3-8",
    },
    features: [
      { description_ar: "دقة 4K و 8K", description_en: "4K and 8K resolution" },
      {
        description_ar: "تحسين الصور القديمة",
        description_en: "Enhance old photos",
      },
      { description_ar: "حفظ التفاصيل", description_en: "Preserve details" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    input_schema: {
      upscale_factor: { type: "integer", enum: [2, 3, 4, 8], default: 4 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "محسن الدقة الخارق" : "Super Resolution",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تحسين جودة ودقة الصور حتى 8K - تقنية Real-ESRGAN المتقدمة"
        : "Enhance image quality and resolution up to 8K - Advanced Real-ESRGAN technology",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "دقة 4K و 8K" : "4K and 8K resolution",
      lang === "ar" ? "تحسين الصور القديمة" : "Enhance old photos",
      lang === "ar" ? "حفظ التفاصيل" : "Preserve details",
    ],
  },

  {
    id: "face_restorer",
    name_ar: "مُصلح الوجوه",
    name_en: "Face Restorer",
    description_ar: "إصلاح وتحسين الوجوه التالفة والضبابية",
    description_en: "Repair and enhance damaged and blurry faces",
    category: "Technical Enhancement",
    model_info: {
      name: "GFPGAN",
      backend_identifier: AIModelIdentifier.GFPGAN,
      size_gb: 0.348,
      processing_time_secs: "2-6",
    },
    features: [
      {
        description_ar: "إصلاح الوجوه التالفة",
        description_en: "Repair damaged faces",
      },
      { description_ar: "تحسين الوضوح", description_en: "Enhance clarity" },
      { description_ar: "استعادة التفاصيل", description_en: "Restore details" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مُصلح الوجوه" : "Face Restorer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "إصلاح وتحسين الوجوه التالفة والضبابية"
        : "Repair and enhance damaged and blurry faces",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "إصلاح الوجوه التالفة" : "Repair damaged faces",
      lang === "ar" ? "تحسين الوضوح" : "Enhance clarity",
      lang === "ar" ? "استعادة التفاصيل" : "Restore details",
    ],
  },

  // ==================== REMAINING FACE TOOLS ====================
  {
    id: "gender_transformer",
    name_ar: "محول الجنس",
    name_en: "Gender Transformer",
    description_ar: "تحويل الجنس مع حفظ الهوية الأساسية - تقنية متقدمة",
    description_en:
      "Gender transformation while preserving core identity - advanced technology",
    category: "Face",
    model_info: {
      name: "GenderGAN-HD",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 4.2,
      processing_time_secs: "8-15",
      gpu_required: true,
      min_vram_gb: 6,
    },
    features: [
      {
        description_ar: "تحويل واقعي للجنس",
        description_en: "Realistic gender conversion",
      },
      {
        description_ar: "حفظ الملامح الأساسية",
        description_en: "Preserve core features",
      },
      { description_ar: "تدرج طبيعي", description_en: "Natural gradation" },
    ],
    is_sensitive: true,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    input_schema: {
      target_gender: {
        type: "string",
        enum: ["male", "female"],
        required: true,
      },
      intensity: { type: "number", minimum: 0, maximum: 100, default: 80 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "محول الجنس" : "Gender Transformer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تحويل الجنس مع حفظ الهوية الأساسية - تقنية متقدمة"
        : "Gender transformation while preserving core identity - advanced technology",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تحويل واقعي للجنس" : "Realistic gender conversion",
      lang === "ar" ? "حفظ الملامح الأساسية" : "Preserve core features",
      lang === "ar" ? "تدرج طبيعي" : "Natural gradation",
    ],
  },

  {
    id: "makeup_artist",
    name_ar: "فنان المكياج الرقمي",
    name_en: "Digital Makeup Artist",
    description_ar: "إضافة أو إزالة المكياج بدقة احترافية - جميع أنواع المكياج",
    description_en:
      "Add or remove makeup with professional precision - all makeup types",
    category: "Face",
    model_info: {
      name: "MakeupGAN-Pro",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 3.1,
      processing_time_secs: "4-8",
      gpu_required: true,
    },
    features: [
      {
        description_ar: "مكياج احترافي",
        description_en: "Professional makeup",
      },
      { description_ar: "ألوان طبيعية", description_en: "Natural colors" },
      { description_ar: "تحكم دقيق", description_en: "Precise control" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: true,
    input_types: ["image"],
    input_schema: {
      makeup_style: {
        type: "string",
        enum: ["natural", "dramatic", "gothic", "vintage", "colorful"],
        required: true,
      },
      intensity: { type: "number", minimum: 0, maximum: 100, default: 60 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "فنان المكياج الرقمي" : "Digital Makeup Artist",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "إضافة أو إزالة المكياج بدقة احترافية - جميع أنواع المكياج"
        : "Add or remove makeup with professional precision - all makeup types",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "مكياج احترافي" : "Professional makeup",
      lang === "ar" ? "ألوان طبيعية" : "Natural colors",
      lang === "ar" ? "تحكم دقيق" : "Precise control",
    ],
  },

  {
    id: "hair_transformation",
    name_ar: "محول الشعر المتقدم",
    name_en: "Advanced Hair Transformer",
    description_ar: "تغيير تسريحة وطول ولون الشعر بواقعية مذهلة",
    description_en: "Change hairstyle, length, and color with stunning realism",
    category: "Face",
    model_info: {
      name: "HairGAN-Ultra",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 2.8,
      processing_time_secs: "5-10",
      gpu_required: true,
    },
    features: [
      {
        description_ar: "تسريحات متنوعة",
        description_en: "Various hairstyles",
      },
      { description_ar: "ألوان طبيعية", description_en: "Natural colors" },
      { description_ar: "أطوال مختلفة", description_en: "Different lengths" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "mask"],
    input_schema: {
      hair_description: {
        type: "string",
        description: "Describe desired hairstyle",
      },
      hair_color: { type: "string", description: "Hair color" },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "محول الشعر المتقدم" : "Advanced Hair Transformer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تغيير تسريحة و��ول ولون الشعر بواقعية مذهلة"
        : "Change hairstyle, length, and color with stunning realism",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تسريحات متنوعة" : "Various hairstyles",
      lang === "ar" ? "ألوان طبيعية" : "Natural colors",
      lang === "ar" ? "أطوال مختلفة" : "Different lengths",
    ],
  },

  {
    id: "eye_enhancer",
    name_ar: "محسن العيون السحري",
    name_en: "Magic Eye Enhancer",
    description_ar: "تغيير لون العيون وتحسين الشكل والإضاءة",
    description_en: "Change eye color and enhance shape and lighting",
    category: "Face",
    model_info: {
      name: "EyeGAN-Pro",
      backend_identifier: AIModelIdentifier.PHI3_VISION,
      size_gb: 1.5,
      processing_time_secs: "2-5",
      gpu_required: false,
    },
    features: [
      {
        description_ar: "تغيير لون العيون",
        description_en: "Change eye color",
      },
      { description_ar: "تكبير طبيعي", description_en: "Natural enlargement" },
      { description_ar: "إضاءة متقدمة", description_en: "Advanced lighting" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: false,
    input_types: ["image", "mask"],
    input_schema: {
      eye_color: {
        type: "string",
        enum: ["blue", "green", "brown", "gray", "amber", "violet"],
        required: true,
      },
      enhancement_level: {
        type: "number",
        minimum: 0,
        maximum: 100,
        default: 50,
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "محسن العيون السحري" : "Magic Eye Enhancer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تغيير لون العيون وتحسين الشكل والإضاءة"
        : "Change eye color and enhance shape and lighting",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تغيير لون العيون" : "Change eye color",
      lang === "ar" ? "تكبير طبيعي" : "Natural enlargement",
      lang === "ar" ? "إضاءة متقدمة" : "Advanced lighting",
    ],
  },

  // ==================== ADVANCED BODY TOOLS ====================
  {
    id: "body_sculptor",
    name_ar: "نحات الجسم الذكي",
    name_en: "Smart Body Sculptor",
    description_ar: "تشكيل وتعديل أجزاء الجسم بدقة وواقعية عالية",
    description_en:
      "Shape and modify body parts with high precision and realism",
    category: "Body",
    model_info: {
      name: "BodyGAN-Ultra",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 5.2,
      processing_time_secs: "10-20",
      gpu_required: true,
      min_vram_gb: 8,
    },
    features: [
      { description_ar: "تشكيل واقعي", description_en: "Realistic shaping" },
      { description_ar: "حفظ التناسق", description_en: "Maintain proportions" },
      { description_ar: "تعديل دقيق", description_en: "Precise adjustments" },
    ],
    is_sensitive: true,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "mask"],
    input_schema: {
      modification_description: {
        type: "string",
        description: "Describe body modifications",
      },
      intensity: { type: "number", minimum: 0, maximum: 100, default: 60 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "نحات الجسم الذكي" : "Smart Body Sculptor",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تشكيل وتعديل أجزاء الجسم بدقة وواقعية عالية"
        : "Shape and modify body parts with high precision and realism",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تشكيل واقعي" : "Realistic shaping",
      lang === "ar" ? "حفظ التناسق" : "Maintain proportions",
      lang === "ar" ? "تعديل دقيق" : "Precise adjustments",
    ],
  },

  {
    id: "virtual_wardrobe",
    name_ar: "خزانة الملابس الافتراضية",
    name_en: "Virtual Wardrobe",
    description_ar: "تجربة ملابس مختلفة افتراضياً مع واقعية مذهلة",
    description_en: "Try different clothes virtually with stunning realism",
    category: "Body",
    model_info: {
      name: "ClothingGAN-v2",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 4.1,
      processing_time_secs: "8-15",
      gpu_required: true,
      min_vram_gb: 6,
    },
    features: [
      { description_ar: "ملابس واقعية", description_en: "Realistic clothing" },
      { description_ar: "أقمشة متنوعة", description_en: "Various fabrics" },
      { description_ar: "ألوان وأنماط", description_en: "Colors and patterns" },
    ],
    is_sensitive: true,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "mask"],
    input_schema: {
      clothing_type: {
        type: "string",
        enum: ["dress", "suit", "casual", "formal", "swimwear", "lingerie"],
        required: true,
      },
      style_description: {
        type: "string",
        description: "Clothing style description",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "خزانة الملابس الافتراضية" : "Virtual Wardrobe",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تجربة ملابس مختلفة افتراضياً مع واقعية مذهلة"
        : "Try different clothes virtually with stunning realism",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "ملابس واقعية" : "Realistic clothing",
      lang === "ar" ? "أقمشة متنوعة" : "Various fabrics",
      lang === "ar" ? "ألوان وأنماط" : "Colors and patterns",
    ],
  },

  {
    id: "tattoo_studio",
    name_ar: "استوديو الوشم الرقمي",
    name_en: "Digital Tattoo Studio",
    description_ar: "إضافة وشوم وإكسسوارات واقعية على الجسم",
    description_en: "Add realistic tattoos and accessories to the body",
    category: "Body",
    model_info: {
      name: "TattooGAN-HD",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 2.7,
      processing_time_secs: "6-12",
      gpu_required: true,
    },
    features: [
      { description_ar: "وشوم واقعية", description_en: "Realistic tattoos" },
      { description_ar: "تصاميم متنوعة", description_en: "Various designs" },
      { description_ar: "موضع دقيق", description_en: "Precise placement" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "mask"],
    input_schema: {
      tattoo_style: {
        type: "string",
        enum: ["tribal", "realistic", "abstract", "traditional", "watercolor"],
        required: true,
      },
      design_description: {
        type: "string",
        description: "Tattoo design description",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "استوديو الوشم الرقمي" : "Digital Tattoo Studio",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "إضافة وشوم وإكسسوارات واقعية على الجسم"
        : "Add realistic tattoos and accessories to the body",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "وشوم واقعية" : "Realistic tattoos",
      lang === "ar" ? "تصاميم متنوعة" : "Various designs",
      lang === "ar" ? "موضع دقيق" : "Precise placement",
    ],
  },

  {
    id: "muscle_enhancer",
    name_ar: "محسن العضلات",
    name_en: "Muscle Enhancer",
    description_ar: "تحسين وتكبير العضلات بشكل طبيعي ومتناسق",
    description_en: "Enhance and enlarge muscles naturally and proportionally",
    category: "Body",
    model_info: {
      name: "MuscleGAN-Pro",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 3.4,
      processing_time_secs: "7-14",
      gpu_required: true,
    },
    features: [
      { description_ar: "عضلات طبيعية", description_en: "Natural muscles" },
      { description_ar: "تناسق الجسم", description_en: "Body symmetry" },
      { description_ar: "تعريف واضح", description_en: "Clear definition" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: false,
    input_types: ["image", "mask"],
    input_schema: {
      enhancement_level: {
        type: "number",
        minimum: 0,
        maximum: 100,
        default: 50,
      },
      muscle_groups: {
        type: "array",
        items: {
          type: "string",
          enum: ["arms", "chest", "abs", "legs", "shoulders"],
        },
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "محسن العضلات" : "Muscle Enhancer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تحسين وتكبير العضلات بشكل طبيعي ومتناسق"
        : "Enhance and enlarge muscles naturally and proportionally",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "عضلات طبيعية" : "Natural muscles",
      lang === "ar" ? "تناسق الجسم" : "Body symmetry",
      lang === "ar" ? "تعريف واضح" : "Clear definition",
    ],
  },

  // ==================== BACKGROUND & ENVIRONMENT TOOLS ====================
  {
    id: "smart_lighting",
    name_ar: "الإضاءة الذكية",
    name_en: "Smart Lighting",
    description_ar: "ضبط الإضاءة والظلال تلقائياً لتحسين المظهر",
    description_en:
      "Automatically adjust lighting and shadows to enhance appearance",
    category: "Background & Environment",
    model_info: {
      name: "LightingNet-v3",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 1.8,
      processing_time_secs: "4-8",
      gpu_required: true,
    },
    features: [
      {
        description_ar: "إضاءة احترافية",
        description_en: "Professional lighting",
      },
      { description_ar: "ظلال طبيعية", description_en: "Natural shadows" },
      {
        description_ar: "تحسين تلقائي",
        description_en: "Automatic enhancement",
      },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: true,
    input_types: ["image"],
    input_schema: {
      lighting_style: {
        type: "string",
        enum: ["studio", "natural", "dramatic", "soft", "golden_hour"],
        required: true,
      },
      intensity: { type: "number", minimum: 0, maximum: 100, default: 70 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "الإضاءة الذكية" : "Smart Lighting",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "ضبط الإضاءة والظلال تلقائياً لتحسين المظهر"
        : "Automatically adjust lighting and shadows to enhance appearance",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "إضاءة احترافية" : "Professional lighting",
      lang === "ar" ? "ظلال طبيعية" : "Natural shadows",
      lang === "ar" ? "تحسين تلقائي" : "Automatic enhancement",
    ],
  },

  {
    id: "scene_compositor",
    name_ar: "مركب المشاهد",
    name_en: "Scene Compositor",
    description_ar: "دمج عدة صور في مشهد واحد متماسك",
    description_en: "Blend multiple photos into one cohesive scene",
    category: "Background & Environment",
    model_info: {
      name: "CompositeGAN-Pro",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 4.5,
      processing_time_secs: "12-25",
      gpu_required: true,
      min_vram_gb: 8,
    },
    features: [
      { description_ar: "دمج متقدم", description_en: "Advanced blending" },
      { description_ar: "إضاءة متطابقة", description_en: "Matching lighting" },
      { description_ar: "منظور صحيح", description_en: "Correct perspective" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "image2", "mask"],
    input_schema: {
      scene_description: {
        type: "string",
        description: "Describe the final scene",
      },
      blending_mode: {
        type: "string",
        enum: ["natural", "artistic", "dramatic"],
        default: "natural",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مركب المشاهد" : "Scene Compositor",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "دمج عدة صور في مشهد واحد متماسك"
        : "Blend multiple photos into one cohesive scene",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "دمج متقدم" : "Advanced blending",
      lang === "ar" ? "إضاءة متطابقة" : "Matching lighting",
      lang === "ar" ? "منظور صحيح" : "Correct perspective",
    ],
  },

  {
    id: "weather_master",
    name_ar: "سيد الطقس",
    name_en: "Weather Master",
    description_ar: "إضافة تأثيرات الطقس - مطر، ثلج، ضباب، أشعة الشمس",
    description_en: "Add weather effects - rain, snow, fog, sunshine",
    category: "Background & Environment",
    model_info: {
      name: "WeatherGAN-HD",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 2.9,
      processing_time_secs: "6-12",
      gpu_required: true,
    },
    features: [
      { description_ar: "تأثيرات واقعية", description_en: "Realistic effects" },
      { description_ar: "طقس متنوع", description_en: "Various weather" },
      { description_ar: "تكامل طبيعي", description_en: "Natural integration" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: true,
    input_types: ["image"],
    input_schema: {
      weather_type: {
        type: "string",
        enum: ["rain", "snow", "fog", "sunshine", "storm", "rainbow"],
        required: true,
      },
      intensity: { type: "number", minimum: 0, maximum: 100, default: 60 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "سيد الطقس" : "Weather Master",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "إضافة تأثيرات الطقس - مطر، ثلج، ضباب، أشعة الشمس"
        : "Add weather effects - rain, snow, fog, sunshine",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تأثيرات واقعية" : "Realistic effects",
      lang === "ar" ? "طقس متنوع" : "Various weather",
      lang === "ar" ? "تكامل طبيعي" : "Natural integration",
    ],
  },

  // ==================== OBJECT MANIPULATION TOOLS ====================
  {
    id: "object_eraser",
    name_ar: "ممحاة العناصر الذكية",
    name_en: "Smart Object Eraser",
    description_ar: "إزالة العناصر غير المرغوبة بدقة مع ملء ذكي",
    description_en: "Remove unwanted objects precisely with smart fill",
    category: "Object Manipulation",
    model_info: {
      name: "InpaintingGAN-v3",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 3.6,
      processing_time_secs: "5-12",
      gpu_required: true,
    },
    features: [
      { description_ar: "إزالة دقيقة", description_en: "Precise removal" },
      { description_ar: "ملء ذكي", description_en: "Smart fill" },
      { description_ar: "نتائج طبيعية", description_en: "Natural results" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: false,
    input_types: ["image", "mask"],
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "ممحاة العناصر الذكية" : "Smart Object Eraser",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "إزالة العناصر غير المرغوبة بدقة مع ملء ذكي"
        : "Remove unwanted objects precisely with smart fill",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "إزالة دقيقة" : "Precise removal",
      lang === "ar" ? "ملء ذكي" : "Smart fill",
      lang === "ar" ? "نتائج طبيعية" : "Natural results",
    ],
  },

  {
    id: "color_wizard",
    name_ar: "ساحر الألوان",
    name_en: "Color Wizard",
    description_ar: "تغيير ألوان أي عنصر في الصورة بسلاسة",
    description_en: "Change colors of any object in the image seamlessly",
    category: "Object Manipulation",
    model_info: {
      name: "ColorGAN-Pro",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 2.3,
      processing_time_secs: "3-7",
      gpu_required: true,
    },
    features: [
      { description_ar: "ألوان طبيعية", description_en: "Natural colors" },
      { description_ar: "تدرجات ناعمة", description_en: "Smooth gradients" },
      { description_ar: "حفظ التفاصيل", description_en: "Preserve details" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "mask"],
    input_schema: {
      target_color: {
        type: "string",
        description: "Target color (hex or name)",
      },
      saturation: { type: "number", minimum: 0, maximum: 200, default: 100 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "ساحر الألوان" : "Color Wizard",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تغيير ألوان أي عنصر في الصورة بسلاسة"
        : "Change colors of any object in the image seamlessly",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "ألوان طبيعية" : "Natural colors",
      lang === "ar" ? "تدرجات ناعمة" : "Smooth gradients",
      lang === "ar" ? "حفظ التفاصيل" : "Preserve details",
    ],
  },

  {
    id: "object_creator",
    name_ar: "منشئ العناصر",
    name_en: "Object Creator",
    description_ar: "إضافة عناصر جديدة باستخدام الوصف النصي",
    description_en: "Add new objects using text description",
    category: "Object Manipulation",
    model_info: {
      name: "Text2Image-Ultra",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 6.9,
      processing_time_secs: "8-16",
      gpu_required: true,
      min_vram_gb: 8,
    },
    features: [
      { description_ar: "عناصر واقعية", description_en: "Realistic objects" },
      { description_ar: "تكامل طبيعي", description_en: "Natural integration" },
      { description_ar: "تحكم دقيق", description_en: "Precise control" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "mask"],
    input_schema: {
      object_description: {
        type: "string",
        description: "Describe the object to add",
        required: true,
      },
      style: {
        type: "string",
        enum: ["realistic", "artistic", "cartoon", "photographic"],
        default: "realistic",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "منشئ العناصر" : "Object Creator",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "إضافة عناصر جديدة باستخدام الوصف النصي"
        : "Add new objects using text description",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "عناصر واقعية" : "Realistic objects",
      lang === "ar" ? "تكامل طبيعي" : "Natural integration",
      lang === "ar" ? "تحكم دقيق" : "Precise control",
    ],
  },

  // ==================== ARTISTIC & CREATIVE TOOLS ====================
  {
    id: "style_transformer",
    name_ar: "محول الأسلوب الفني",
    name_en: "Artistic Style Transformer",
    description_ar: "تحويل الصور لأي أسلوب فني - أنمي، زيت، مائي، كلاسيكي",
    description_en:
      "Transform images to any artistic style - anime, oil, watercolor, classical",
    category: "Artistic & Creative",
    model_info: {
      name: "StyleGAN3-T",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 4.8,
      processing_time_secs: "10-18",
      gpu_required: true,
      min_vram_gb: 6,
    },
    features: [
      { description_ar: "أساليب متنوعة", description_en: "Various styles" },
      {
        description_ar: "جودة احترافية",
        description_en: "Professional quality",
      },
      { description_ar: "حفظ الملامح", description_en: "Preserve features" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: true,
    input_types: ["image"],
    input_schema: {
      art_style: {
        type: "string",
        enum: [
          "anime",
          "oil_painting",
          "watercolor",
          "pencil",
          "van_gogh",
          "picasso",
          "realistic",
        ],
        required: true,
      },
      intensity: { type: "number", minimum: 0, maximum: 100, default: 80 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "محول الأسلوب الفني" : "Artistic Style Transformer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تحويل الصور لأي أسلوب فني - أنمي، زيت، مائي، كلاسيكي"
        : "Transform images to any artistic style - anime, oil, watercolor, classical",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "أساليب متنوعة" : "Various styles",
      lang === "ar" ? "جودة احترافية" : "Professional quality",
      lang === "ar" ? "حفظ ا��ملامح" : "Preserve features",
    ],
  },

  {
    id: "cartoon_transformer",
    name_ar: "محول الكرتون",
    name_en: "Cartoon Transformer",
    description_ar: "تحويل الصور الواقعية لأسلوب كرتوني احترافي",
    description_en: "Transform realistic photos to professional cartoon style",
    category: "Artistic & Creative",
    model_info: {
      name: "CartoonGAN-v4",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 3.2,
      processing_time_secs: "6-12",
      gpu_required: true,
    },
    features: [
      {
        description_ar: "كرتون احترافي",
        description_en: "Professional cartoon",
      },
      { description_ar: "ألوان زاهية", description_en: "Vibrant colors" },
      { description_ar: "خطوط ناعمة", description_en: "Smooth lines" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    input_schema: {
      cartoon_style: {
        type: "string",
        enum: ["disney", "pixar", "anime", "comic", "manga"],
        default: "disney",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "محول الكرتون" : "Cartoon Transformer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تحويل الصور الواقعية لأسلوب كرتوني احترافي"
        : "Transform realistic photos to professional cartoon style",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "كرتون احترافي" : "Professional cartoon",
      lang === "ar" ? "ألوان زاهية" : "Vibrant colors",
      lang === "ar" ? "خطوط ناعمة" : "Smooth lines",
    ],
  },

  {
    id: "photo_colorizer",
    name_ar: "ملون الصور القديمة",
    name_en: "Photo Colorizer",
    description_ar: "إضافة ألوان واقعية للصور بالأبيض والأسود",
    description_en: "Add realistic colors to black and white photos",
    category: "Artistic & Creative",
    model_info: {
      name: "ColorizationNet-HD",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 2.1,
      processing_time_secs: "4-9",
      gpu_required: true,
    },
    features: [
      { description_ar: "ألوان واقعية", description_en: "Realistic colors" },
      { description_ar: "تلوين ذكي", description_en: "Smart coloring" },
      { description_ar: "حفظ التفاصيل", description_en: "Preserve details" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    input_schema: {
      color_scheme: {
        type: "string",
        enum: ["automatic", "vintage", "modern", "sepia", "custom"],
        default: "automatic",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "ملون الصور القديمة" : "Photo Colorizer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "إضافة ألوان واقعية للصور بالأبيض والأسود"
        : "Add realistic colors to black and white photos",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "ألوان واقعية" : "Realistic colors",
      lang === "ar" ? "تلوين ذكي" : "Smart coloring",
      lang === "ar" ? "حفظ التفاصيل" : "Preserve details",
    ],
  },

  // ==================== ADDITIONAL ENHANCEMENT TOOLS ====================
  {
    id: "noise_remover",
    name_ar: "مزيل الضوضاء المتقدم",
    name_en: "Advanced Noise Remover",
    description_ar: "إزالة الضوضاء وتحسين وضوح الصورة",
    description_en: "Remove noise and enhance image clarity",
    category: "Technical Enhancement",
    model_info: {
      name: "DnCNN-Color",
      backend_identifier: AIModelIdentifier.REAL_ESRGAN,
      size_gb: 0.8,
      processing_time_secs: "2-5",
      gpu_required: false,
    },
    features: [
      {
        description_ar: "إزا��ة ضوضاء متقدمة",
        description_en: "Advanced noise removal",
      },
      { description_ar: "حفظ التفاصيل", description_en: "Detail preservation" },
      { description_ar: "تحسين الوضوح", description_en: "Clarity enhancement" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    input_schema: {
      noise_level: {
        type: "string",
        enum: ["light", "medium", "heavy"],
        default: "medium",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مزيل الضوضاء المتقدم" : "Advanced Noise Remover",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "إزالة الضوضاء وتحسين وضوح الصورة"
        : "Remove noise and enhance image clarity",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "إزالة ضوضاء متقدمة" : "Advanced noise removal",
      lang === "ar" ? "حفظ التفاصيل" : "Detail preservation",
      lang === "ar" ? "تحسين الوضوح" : "Clarity enhancement",
    ],
  },

  {
    id: "smart_cropper",
    name_ar: "القاطع الذكي",
    name_en: "Smart Cropper",
    description_ar: "قص ذكي بقوة الذكاء الاصطناعي مع تركيز تلقائي",
    description_en: "AI-powered smart cropping with automatic focus",
    category: "Technical Enhancement",
    model_info: {
      name: "SmartCrop-AI",
      backend_identifier: AIModelIdentifier.PHI3_VISION,
      size_gb: 1.2,
      processing_time_secs: "1-3",
      gpu_required: false,
    },
    features: [
      { description_ar: "قص ذكي", description_en: "Smart cropping" },
      { description_ar: "تركيز تلقائي", description_en: "Automatic focus" },
      { description_ar: "نسب مثالية", description_en: "Perfect ratios" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    input_schema: {
      aspect_ratio: {
        type: "string",
        enum: ["1:1", "16:9", "4:3", "3:2", "auto"],
        default: "auto",
      },
      focus_mode: {
        type: "string",
        enum: ["face", "center", "composition", "smart"],
        default: "smart",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "القاطع الذكي" : "Smart Cropper",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "قص ذكي بقوة الذكاء الاصطناعي مع تركيز تلقائي"
        : "AI-powered smart cropping with automatic focus",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "قص ذكي" : "Smart cropping",
      lang === "ar" ? "تركيز تلقائي" : "Automatic focus",
      lang === "ar" ? "نسب مثالية" : "Perfect ratios",
    ],
  },

  {
    id: "red_eye_fixer",
    name_ar: "مصحح العيون الحمراء",
    name_en: "Red Eye Fixer",
    description_ar: "تصحيح تأثير العيون الحمراء تلقائياً",
    description_en: "Automatically correct red eye effects",
    category: "Technical Enhancement",
    model_info: {
      name: "RedEyeFix-AI",
      backend_identifier: AIModelIdentifier.PHI3_VISION,
      size_gb: 0.3,
      processing_time_secs: "1-2",
      gpu_required: false,
    },
    features: [
      {
        description_ar: "تصحيح تلقائي",
        description_en: "Automatic correction",
      },
      { description_ar: "كشف دقيق", description_en: "Precise detection" },
      { description_ar: "ألوان طبيعية", description_en: "Natural colors" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مصحح العيون الحمراء" : "Red Eye Fixer",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "تصحيح تأثير العيون الحمراء تلقائياً"
        : "Automatically correct red eye effects",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "تصحيح تلقائي" : "Automatic correction",
      lang === "ar" ? "كشف دقيق" : "Precise detection",
      lang === "ar" ? "ألوان طبيعية" : "Natural colors",
    ],
  },

  // ==================== CREATIVE & ADVANCED TOOLS ====================
  {
    id: "photo_blender",
    name_ar: "مزج الصور الذكي",
    name_en: "Smart Photo Blender",
    description_ar: "مزج عدة صور بسلاسة مع تحكم متقدم",
    description_en: "Seamlessly blend multiple photos with advanced control",
    category: "Creative",
    model_info: {
      name: "BlendGAN-Pro",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 3.7,
      processing_time_secs: "8-16",
      gpu_required: true,
    },
    features: [
      { description_ar: "مزج متقدم", description_en: "Advanced blending" },
      { description_ar: "تحكم دقيق", description_en: "Precise control" },
      { description_ar: "نتائج طبيعية", description_en: "Natural results" },
    ],
    is_sensitive: false,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "image2", "mask"],
    input_schema: {
      blend_mode: {
        type: "string",
        enum: ["normal", "overlay", "soft_light", "hard_light", "multiply"],
        default: "normal",
      },
      opacity: { type: "number", minimum: 0, maximum: 100, default: 50 },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مزج الصور الذكي" : "Smart Photo Blender",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "مزج عدة صور بسلاسة مع تحكم متقدم"
        : "Seamlessly blend multiple photos with advanced control",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "مزج متقدم" : "Advanced blending",
      lang === "ar" ? "تحكم دقيق" : "Precise control",
      lang === "ar" ? "نتائج طبيعية" : "Natural results",
    ],
  },

  {
    id: "depth_creator",
    name_ar: "منشئ العمق ثلاثي الأبعاد",
    name_en: "3D Depth Creator",
    description_ar: "توليد خرائط العمق للتأثيرات ثلاثية الأبعاد",
    description_en: "Generate depth maps for 3D effects",
    category: "Creative",
    model_info: {
      name: "DepthGAN-Ultra",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 2.4,
      processing_time_secs: "5-10",
      gpu_required: true,
    },
    features: [
      { description_ar: "عمق واقعي", description_en: "Realistic depth" },
      { description_ar: "تأثيرات ثلاثية", description_en: "3D effects" },
      { description_ar: "دقة عالية", description_en: "High precision" },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: false,
    input_types: ["image"],
    input_schema: {
      depth_strength: { type: "number", minimum: 0, maximum: 100, default: 70 },
      effect_type: {
        type: "string",
        enum: ["parallax", "anaglyph", "stereoscopic"],
        default: "parallax",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "منشئ العمق ثلاثي الأبعاد" : "3D Depth Creator",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "توليد خرائط العمق للتأثيرات ثلاثية الأبعاد"
        : "Generate depth maps for 3D effects",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "عمق واقعي" : "Realistic depth",
      lang === "ar" ? "تأثيرات ثلاثية" : "3D effects",
      lang === "ar" ? "دقة عالية" : "High precision",
    ],
  },

  {
    id: "filter_creator",
    name_ar: "منشئ الفلاتر التفاعلية",
    name_en: "Interactive Filter Creator",
    description_ar: "فلاتر فورية مع رسوم متحركة ذكية",
    description_en: "Real-time filters with smart animations",
    category: "Creative",
    model_info: {
      name: "FilterGAN-Live",
      backend_identifier: AIModelIdentifier.PHI3_VISION,
      size_gb: 1.6,
      processing_time_secs: "1-3",
      gpu_required: false,
    },
    features: [
      { description_ar: "فلاتر فورية", description_en: "Real-time filters" },
      { description_ar: "رسوم متحركة", description_en: "Animations" },
      {
        description_ar: "تخصيص متقدم",
        description_en: "Advanced customization",
      },
    ],
    is_sensitive: false,
    requires_mask: false,
    requires_prompt: true,
    input_types: ["image"],
    input_schema: {
      filter_type: {
        type: "string",
        enum: ["beauty", "vintage", "neon", "glitch", "particle"],
        required: true,
      },
      animation: { type: "boolean", default: false },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "منشئ الفلاتر التفاعلية" : "Interactive Filter Creator",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "فلاتر فورية مع رسوم متحركة ذكية"
        : "Real-time filters with smart animations",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "فلاتر فورية" : "Real-time filters",
      lang === "ar" ? "رسوم متحركة" : "Animations",
      lang === "ar" ? "تخصيص متقدم" : "Advanced customization",
    ],
  },

  // ==================== VIP EXCLUSIVE TOOLS ====================
  {
    id: "vip_uncensored_suite",
    name_ar: "مجموعة VIP بلا قيود",
    name_en: "VIP Uncensored Suite",
    description_ar:
      "الوصول لجميع تحويلات الذكاء الاصطناعي بلا قيود مع حرية إبداعية كاملة",
    description_en:
      "Access to all uncensored AI transformations with full creative freedom",
    category: "VIP Exclusive",
    model_info: {
      name: "MegaGAN-Turbo",
      backend_identifier: AIModelIdentifier.STABLE_DIFFUSION_XL,
      size_gb: 12.5,
      processing_time_secs: "15-45",
      gpu_required: true,
      min_vram_gb: 12,
    },
    features: [
      {
        description_ar: "بلا قيود كاملة",
        description_en: "Completely uncensored",
      },
      { description_ar: "حرية إبداعية", description_en: "Creative freedom" },
      { description_ar: "جودة فائقة", description_en: "Ultra quality" },
      {
        description_ar: "معالجة متقدمة",
        description_en: "Advanced processing",
      },
    ],
    is_sensitive: true,
    requires_mask: true,
    requires_prompt: true,
    input_types: ["image", "mask"],
    input_schema: {
      transformation_prompt: {
        type: "string",
        description: "Uncensored transformation description",
      },
      intensity: { type: "number", minimum: 0, maximum: 100, default: 80 },
      style: {
        type: "string",
        enum: ["realistic", "artistic", "fantasy", "extreme"],
        default: "realistic",
      },
    },
    getName: (lang: "ar" | "en") =>
      lang === "ar" ? "مجموعة VIP بلا قيود" : "VIP Uncensored Suite",
    getDescription: (lang: "ar" | "en") =>
      lang === "ar"
        ? "الوصول لجميع تحويلات الذكاء الاصطناعي بلا قيود مع حرية إبداعية كاملة"
        : "Access to all uncensored AI transformations with full creative freedom",
    getFeatures: (lang: "ar" | "en") => [
      lang === "ar" ? "بلا قيود كاملة" : "Completely uncensored",
      lang === "ar" ? "حرية إبداعية" : "Creative freedom",
      lang === "ar" ? "جودة فائقة" : "Ultra quality",
      lang === "ar" ? "معالجة متقدمة" : "Advanced processing",
    ],
  },
];

// Get all unique categories from tools
export const TOOL_CATEGORIES = Array.from(
  new Set(COMPREHENSIVE_AI_TOOLS.map((tool) => tool.category)),
);

// Helper class for tool database operations
export class ToolsDatabase {
  static getAllTools(): AiTool[] {
    return COMPREHENSIVE_AI_TOOLS;
  }

  static getToolById(id: string): AiTool | undefined {
    return COMPREHENSIVE_AI_TOOLS.find((tool) => tool.id === id);
  }

  static getToolsByCategory(category: string): AiTool[] {
    return COMPREHENSIVE_AI_TOOLS.filter((tool) => tool.category === category);
  }

  static searchTools(query: string, lang: "ar" | "en" = "en"): AiTool[] {
    const lowerQuery = query.toLowerCase();
    return COMPREHENSIVE_AI_TOOLS.filter(
      (tool) =>
        tool.getName(lang).toLowerCase().includes(lowerQuery) ||
        tool.getDescription(lang).toLowerCase().includes(lowerQuery) ||
        tool.category.toLowerCase().includes(lowerQuery),
    );
  }

  static getSensitiveTools(): AiTool[] {
    return COMPREHENSIVE_AI_TOOLS.filter((tool) => tool.is_sensitive);
  }

  static getToolsRequiringMask(): AiTool[] {
    return COMPREHENSIVE_AI_TOOLS.filter((tool) => tool.requires_mask);
  }

  static getToolsRequiringPrompt(): AiTool[] {
    return COMPREHENSIVE_AI_TOOLS.filter((tool) => tool.requires_prompt);
  }
}
