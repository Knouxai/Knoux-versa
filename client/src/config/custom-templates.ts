// نظام القوالب المخصصة بدلاً من البيانات الثابتة

export interface CustomTemplate {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category:
    | "portrait"
    | "landscape"
    | "artistic"
    | "fantasy"
    | "professional"
    | "creative";
  categoryAr: string;
  style: string;
  styleAr: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: string;
  thumbnail: string;
  isVIP: boolean;
  maturityRating: "general" | "teen" | "mature" | "adult";
  tags: string[];
  tagsAr: string[];
  prompt: string;
  negativePrompt?: string;
  settings: {
    steps: number;
    guidance: number;
    strength: number;
    quality: "standard" | "high" | "ultra";
  };
  featured: boolean;
  popularity: number;
}

// قوالب مخصصة عامة وآمنة
export const CUSTOM_TEMPLATES: CustomTemplate[] = [
  {
    id: "professional_headshot",
    name: "Professional Headshot",
    nameAr: "صورة شخصية مهنية",
    description:
      "Create a professional business portrait with elegant lighting",
    descriptionAr: "إنشاء صورة شخصية مهنية للأعمال مع إضاءة أنيقة",
    category: "professional",
    categoryAr: "مهني",
    style: "Corporate Professional",
    styleAr: "مهني للشركات",
    difficulty: "easy",
    estimatedTime: "15-25 ثانية",
    thumbnail: "/templates/professional/headshot_preview.jpg",
    isVIP: false,
    maturityRating: "general",
    tags: ["business", "professional", "portrait", "linkedin"],
    tagsAr: ["أعمال", "مهني", "صورة شخصية", "لينكدإن"],
    prompt:
      "professional business headshot, clean background, soft lighting, confident expression, business attire",
    negativePrompt: "casual clothes, messy background, poor lighting",
    settings: {
      steps: 30,
      guidance: 7.5,
      strength: 0.8,
      quality: "high",
    },
    featured: true,
    popularity: 95,
  },

  {
    id: "artistic_portrait",
    name: "Artistic Portrait",
    nameAr: "صورة فنية",
    description: "Transform into a beautiful artistic painting style",
    descriptionAr: "تحويل إلى أسلوب لوحة فنية جميلة",
    category: "artistic",
    categoryAr: "فني",
    style: "Oil Painting",
    styleAr: "رسم زيتي",
    difficulty: "medium",
    estimatedTime: "20-35 ثانية",
    thumbnail: "/templates/artistic/oil_painting_preview.jpg",
    isVIP: false,
    maturityRating: "general",
    tags: ["art", "painting", "classical", "renaissance"],
    tagsAr: ["فن", "رسم", "كلاسيكي", "نهضة"],
    prompt:
      "oil painting style portrait, classical art, renaissance style, masterpiece quality, rich colors",
    negativePrompt: "modern, digital, cartoon, anime",
    settings: {
      steps: 35,
      guidance: 8.0,
      strength: 0.75,
      quality: "ultra",
    },
    featured: true,
    popularity: 88,
  },

  {
    id: "fantasy_character",
    name: "Fantasy Character",
    nameAr: "شخصية خيالية",
    description: "Become a magical fantasy character",
    descriptionAr: "تحول إلى شخصية خيالية سحرية",
    category: "fantasy",
    categoryAr: "خيالي",
    style: "Epic Fantasy",
    styleAr: "خيال ملحمي",
    difficulty: "hard",
    estimatedTime: "30-45 ثانية",
    thumbnail: "/templates/fantasy/character_preview.jpg",
    isVIP: false,
    maturityRating: "teen",
    tags: ["fantasy", "magic", "character", "adventure"],
    tagsAr: ["خيال", "سحر", "شخصية", "مغامرة"],
    prompt:
      "epic fantasy character, magical atmosphere, detailed costume, mystical lighting, adventure theme",
    negativePrompt: "modern clothes, realistic, plain background",
    settings: {
      steps: 40,
      guidance: 9.0,
      strength: 0.85,
      quality: "ultra",
    },
    featured: true,
    popularity: 82,
  },

  {
    id: "vintage_style",
    name: "Vintage Style",
    nameAr: "أسلوب عتيق",
    description: "Classic vintage photography aesthetic",
    descriptionAr: "جمالية التصوير العتيق الكلاسيكي",
    category: "portrait",
    categoryAr: "صورة شخصية",
    style: "Vintage Photography",
    styleAr: "تصوير عتيق",
    difficulty: "easy",
    estimatedTime: "12-20 ثانية",
    thumbnail: "/templates/vintage/style_preview.jpg",
    isVIP: false,
    maturityRating: "general",
    tags: ["vintage", "retro", "classic", "nostalgia"],
    tagsAr: ["عتيق", "قديم", "كلاسيكي", "حنين"],
    prompt:
      "vintage photography style, sepia tones, soft focus, classic pose, timeless beauty",
    negativePrompt: "modern, digital effects, bright colors",
    settings: {
      steps: 25,
      guidance: 6.5,
      strength: 0.7,
      quality: "high",
    },
    featured: false,
    popularity: 75,
  },

  {
    id: "cyberpunk_future",
    name: "Cyberpunk Future",
    nameAr: "مستقبل سايبربانك",
    description: "Futuristic cyberpunk transformation",
    descriptionAr: "تحويل مستقبلي سايبربانك",
    category: "creative",
    categoryAr: "إبداعي",
    style: "Cyberpunk Aesthetic",
    styleAr: "جمالية سايبربانك",
    difficulty: "medium",
    estimatedTime: "25-40 ثانية",
    thumbnail: "/templates/cyberpunk/future_preview.jpg",
    isVIP: false,
    maturityRating: "teen",
    tags: ["cyberpunk", "futuristic", "neon", "technology"],
    tagsAr: ["سايبربانك", "مستقبلي", "نيون", "تكنولوجيا"],
    prompt:
      "cyberpunk style, neon lights, futuristic cityscape, high tech aesthetic, glowing elements",
    negativePrompt: "natural, organic, vintage, old-fashioned",
    settings: {
      steps: 32,
      guidance: 8.5,
      strength: 0.8,
      quality: "ultra",
    },
    featured: true,
    popularity: 78,
  },

  {
    id: "natural_beauty",
    name: "Natural Beauty",
    nameAr: "جمال طبيعي",
    description: "Enhance natural beauty with soft enhancements",
    descriptionAr: "تعزيز الجمال الطبيعي مع تحسينات ناعمة",
    category: "portrait",
    categoryAr: "صورة شخصية",
    style: "Natural Enhancement",
    styleAr: "تحسين طبيعي",
    difficulty: "easy",
    estimatedTime: "10-18 ثانية",
    thumbnail: "/templates/natural/beauty_preview.jpg",
    isVIP: false,
    maturityRating: "general",
    tags: ["natural", "beauty", "enhancement", "soft"],
    tagsAr: ["طبيعي", "جمال", "تحسين", "ناعم"],
    prompt:
      "natural beauty enhancement, soft lighting, gentle features, healthy glow, subtle improvements",
    negativePrompt:
      "over-processed, artificial, heavy makeup, dramatic changes",
    settings: {
      steps: 20,
      guidance: 6.0,
      strength: 0.6,
      quality: "high",
    },
    featured: false,
    popularity: 92,
  },
];

// VIP قوالب (محدودة ومتحفظة)
export const VIP_TEMPLATES: CustomTemplate[] = [
  {
    id: "glamour_portrait",
    name: "Glamour Portrait",
    nameAr: "صورة ساحرة",
    description: "Sophisticated glamour photography style",
    descriptionAr: "أسلوب التصوير الساحر المتطور",
    category: "artistic",
    categoryAr: "فني",
    style: "High Fashion Glamour",
    styleAr: "سحر الأزياء الراقية",
    difficulty: "hard",
    estimatedTime: "35-50 ثانية",
    thumbnail: "/templates/vip/glamour_preview.jpg",
    isVIP: true,
    maturityRating: "mature",
    tags: ["glamour", "fashion", "elegant", "sophisticated"],
    tagsAr: ["ساحر", "أزياء", "أنيق", "متطور"],
    prompt:
      "high fashion glamour photography, elegant pose, dramatic lighting, luxury aesthetic, magazine quality",
    negativePrompt: "casual, simple, plain, amateur",
    settings: {
      steps: 45,
      guidance: 9.5,
      strength: 0.9,
      quality: "ultra",
    },
    featured: true,
    popularity: 85,
  },
];

// دوال مساعدة للقوالب
export const getTemplateById = (id: string): CustomTemplate | undefined => {
  const allTemplates = [...CUSTOM_TEMPLATES, ...VIP_TEMPLATES];
  return allTemplates.find((template) => template.id === id);
};

export const getTemplatesByCategory = (
  category: CustomTemplate["category"],
): CustomTemplate[] => {
  const allTemplates = [...CUSTOM_TEMPLATES, ...VIP_TEMPLATES];
  return allTemplates.filter((template) => template.category === category);
};

export const getFeaturedTemplates = (): CustomTemplate[] => {
  const allTemplates = [...CUSTOM_TEMPLATES, ...VIP_TEMPLATES];
  return allTemplates.filter((template) => template.featured);
};

export const getFreeTemplates = (): CustomTemplate[] => {
  return CUSTOM_TEMPLATES.filter((template) => !template.isVIP);
};

export const getVIPTemplates = (): CustomTemplate[] => {
  return VIP_TEMPLATES;
};

export const getTemplatesByMaturity = (
  rating: CustomTemplate["maturityRating"],
): CustomTemplate[] => {
  const allTemplates = [...CUSTOM_TEMPLATES, ...VIP_TEMPLATES];
  return allTemplates.filter((template) => template.maturityRating === rating);
};

export const searchTemplates = (
  query: string,
  language: "en" | "ar" = "ar",
): CustomTemplate[] => {
  const allTemplates = [...CUSTOM_TEMPLATES, ...VIP_TEMPLATES];
  const searchTerm = query.toLowerCase();

  return allTemplates.filter((template) => {
    const name = language === "ar" ? template.nameAr : template.name;
    const description =
      language === "ar" ? template.descriptionAr : template.description;
    const tags = language === "ar" ? template.tagsAr : template.tags;

    return (
      name.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm) ||
      tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  });
};

// الفئات المتاحة
export const TEMPLATE_CATEGORIES = [
  { id: "portrait", name: "Portrait", nameAr: "صورة شخصية" },
  { id: "landscape", name: "Landscape", nameAr: "منظر طبيعي" },
  { id: "artistic", name: "Artistic", nameAr: "فني" },
  { id: "fantasy", name: "Fantasy", nameAr: "خيالي" },
  { id: "professional", name: "Professional", nameAr: "مهني" },
  { id: "creative", name: "Creative", nameAr: "إبداعي" },
];

export default CUSTOM_TEMPLATES;
