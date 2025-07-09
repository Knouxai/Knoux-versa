export interface AiService {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: 'generation' | 'enhancement' | 'editing' | 'analysis' | 'transformation';
  categoryAr: string;
  icon: string;
  color: string;
  isVIP: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  supportedFormats: string[];
  features: string[];
  featuresAr: string[];
  limitations?: string[];
  limitationsAr?: string[];
  parameters: {
    name: string;
    nameAr: string;
    type: 'slider' | 'select' | 'toggle' | 'color' | 'text';
    defaultValue: any;
    options?: any[];
    min?: number;
    max?: number;
    step?: number;
  }[];
}

export const AI_SERVICES: AiService[] = [
  {
    id: 'magic-morph',
    name: 'Magic Morph',
    nameAr: 'التحويل السحري',
    description: 'Transform objects and people into anything with AI magic',
    descriptionAr: 'حول الأشياء والأشخاص إلى أي شيء بسحر الذكاء الاصطناعي',
    category: 'transformation',
    categoryAr: 'التحويل',
    icon: '🪄',
    color: 'from-purple-500 to-pink-500',
    isVIP: false,
    difficulty: 'medium',
    estimatedTime: '15-30 ثانية',
    supportedFormats: ['PNG', 'JPG', 'WEBP'],
    features: [
      'Object transformation',
      'Person transformation', 
      'Style preservation',
      'High quality output'
    ],
    featuresAr: [
      'تحويل الأشياء',
      'تحويل الأشخاص',
      'حفظ النمط',
      'جودة عالية'
    ],
    parameters: [
      {
        name: 'Transformation Strength',
        nameAr: 'قوة التحويل',
        type: 'slider',
        defaultValue: 75,
        min: 0,
        max: 100,
        step: 5
      },
      {
        name: 'Preserve Original',
        nameAr: 'حفظ الأصل',
        type: 'toggle',
        defaultValue: true
      }
    ]
  },
  {
    id: 'remove-replace',
    name: 'Remove & Replace',
    nameAr: 'إزالة واستبدال',
    description: 'Remove objects and replace with AI-generated content',
    descriptionAr: 'إزالة الأشياء واستبدالها بمحتوى مُولد بالذكاء الاصطناعي',
    category: 'editing',
    categoryAr: 'التحرير',
    icon: '✂️',
    color: 'from-blue-500 to-cyan-500',
    isVIP: false,
    difficulty: 'easy',
    estimatedTime: '10-20 ثانية',
    supportedFormats: ['PNG', 'JPG', 'WEBP'],
    features: [
      'Smart object removal',
      'Intelligent replacement',
      'Context preservation',
      'Seamless blending'
    ],
    featuresAr: [
      'إزالة ذكية للأشياء',
      'استبدال ذكي',
      'حفظ السياق',
      'مزج سلس'
    ],
    parameters: [
      {
        name: 'Removal Precision',
        nameAr: 'دقة الإزالة',
        type: 'slider',
        defaultValue: 80,
        min: 0,
        max: 100,
        step: 5
      },
      {
        name: 'Fill Method',
        nameAr: 'طريقة التعبئة',
        type: 'select',
        defaultValue: 'ai_generate',
        options: [
          { value: 'ai_generate', label: 'AI Generate', labelAr: 'توليد بالذكاء الاصطناعي' },
          { value: 'content_aware', label: 'Content Aware', labelAr: 'مدرك المحتوى' },
          { value: 'background_fill', label: 'Background Fill', labelAr: 'تعبئة الخلفية' }
        ]
      }
    ]
  },
  {
    id: 'style-transfer',
    name: 'Style Transfer',
    nameAr: 'نقل النمط',
    description: 'Apply artistic styles to your images with AI',
    descriptionAr: 'طبق الأنماط الفنية على صورك بالذكاء الاصطناعي',
    category: 'transformation',
    categoryAr: 'التحويل',
    icon: '🎨',
    color: 'from-orange-500 to-red-500',
    isVIP: false,
    difficulty: 'medium',
    estimatedTime: '20-40 ثانية',
    supportedFormats: ['PNG', 'JPG', 'WEBP'],
    features: [
      'Multiple art styles',
      'Style intensity control',
      'Content preservation',
      'High resolution output'
    ],
    featuresAr: [
      'أنماط فنية متعددة',
      'تحكم في شدة النمط',
      'حفظ المحتوى',
      'إخراج عالي الدقة'
    ],
    parameters: [
      {
        name: 'Style Type',
        nameAr: 'نوع النمط',
        type: 'select',
        defaultValue: 'impressionist',
        options: [
          { value: 'impressionist', label: 'Impressionist', labelAr: 'انطباعي' },
          { value: 'abstract', label: 'Abstract', labelAr: 'تجريدي' },
          { value: 'realistic', label: 'Realistic', labelAr: 'واقعي' },
          { value: 'anime', label: 'Anime', labelAr: 'أنمي' }
        ]
      },
      {
        name: 'Style Strength',
        nameAr: 'قوة النمط',
        type: 'slider',
        defaultValue: 70,
        min: 0,
        max: 100,
        step: 5
      }
    ]
  },
  {
    id: 'background-replace',
    name: 'Background Replace',
    nameAr: 'استبدال الخلفية',
    description: 'Replace backgrounds with AI-generated scenes',
    descriptionAr: 'استبدل الخلفيات بمشاهد مُولدة بالذكاء الاصطناعي',
    category: 'editing',
    categoryAr: 'التحرير',
    icon: '🏞️',
    color: 'from-green-500 to-teal-500',
    isVIP: false,
    difficulty: 'easy',
    estimatedTime: '15-25 ثانية',
    supportedFormats: ['PNG', 'JPG', 'WEBP'],
    features: [
      'Automatic segmentation',
      'Natural backgrounds',
      'Edge refinement',
      'Lighting adjustment'
    ],
    featuresAr: [
      'تقسيم تلقائي',
      'خلفيات طبيعية',
      'تحسين الحواف',
      'تعديل الإضاءة'
    ],
    parameters: [
      {
        name: 'Background Type',
        nameAr: 'نوع الخلفية',
        type: 'select',
        defaultValue: 'nature',
        options: [
          { value: 'nature', label: 'Nature', labelAr: 'طبيعة' },
          { value: 'urban', label: 'Urban', labelAr: 'حضري' },
          { value: 'studio', label: 'Studio', labelAr: 'استوديو' },
          { value: 'fantasy', label: 'Fantasy', labelAr: 'خيال' }
        ]
      },
      {
        name: 'Edge Softness',
        nameAr: 'نعومة الحواف',
        type: 'slider',
        defaultValue: 50,
        min: 0,
        max: 100,
        step: 5
      }
    ]
  },
  {
    id: 'object-recolor',
    name: 'Object Recolor',
    nameAr: 'إعادة تلوين الأشياء',
    description: 'Change colors of specific objects intelligently',
    descriptionAr: 'غير ألوان أشياء محددة بذكاء',
    category: 'editing',
    categoryAr: 'التحرير',
    icon: '🎨',
    color: 'from-pink-500 to-purple-500',
    isVIP: false,
    difficulty: 'easy',
    estimatedTime: '5-15 ثانية',
    supportedFormats: ['PNG', 'JPG', 'WEBP'],
    features: [
      'Selective coloring',
      'Natural color blending',
      'Material preservation',
      'Batch processing'
    ],
    featuresAr: [
      'تلوين انتقائي',
      'مزج ألوان طبيعي',
      'حفظ المواد',
      'معالجة مجمعة'
    ],
    parameters: [
      {
        name: 'Target Color',
        nameAr: 'اللون المستهدف',
        type: 'color',
        defaultValue: '#FF6B6B'
      },
      {
        name: 'Color Intensity',
        nameAr: 'شدة اللون',
        type: 'slider',
        defaultValue: 80,
        min: 0,
        max: 100,
        step: 5
      },
      {
        name: 'Preserve Shadows',
        nameAr: 'حفظ الظلال',
        type: 'toggle',
        defaultValue: true
      }
    ]
  },
  {
    id: 'text2image-add',
    name: 'Text to Image Add',
    nameAr: 'إضافة صورة من النص',
    description: 'Add AI-generated elements from text descriptions',
    descriptionAr: 'أضف عناصر مُولدة بالذكاء الاصطناعي من وصف نصي',
    category: 'generation',
    categoryAr: 'التوليد',
    icon: '📝',
    color: 'from-indigo-500 to-blue-500',
    isVIP: false,
    difficulty: 'medium',
    estimatedTime: '20-35 ثانية',
    supportedFormats: ['PNG', 'JPG', 'WEBP'],
    features: [
      'Text-based generation',
      'Contextual placement',
      'Style matching',
      'High quality synthesis'
    ],
    featuresAr: [
      'توليد مبني على النص',
      'وضع مناسب للسياق',
      'مطابقة النمط',
      'تركيب عالي الجودة'
    ],
    parameters: [
      {
        name: 'Generation Prompt',
        nameAr: 'نص التوليد',
        type: 'text',
        defaultValue: 'A beautiful butterfly'
      },
      {
        name: 'Blend Strength',
        nameAr: 'قوة المزج',
        type: 'slider',
        defaultValue: 70,
        min: 0,
        max: 100,
        step: 5
      },
      {
        name: 'Style Match',
        nameAr: 'مطابقة النمط',
        type: 'toggle',
        defaultValue: true
      }
    ]
  },
  {
    id: 'ai-enhance',
    name: 'AI Enhance',
    nameAr: 'التحسين بالذكاء الاصطناعي',
    description: 'Enhance image quality with AI upscaling',
    descriptionAr: 'حسن جودة الصورة بالترقية بالذكاء الاصطناعي',
    category: 'enhancement',
    categoryAr: 'التحسين',
    icon: '✨',
    color: 'from-yellow-500 to-orange-500',
    isVIP: false,
    difficulty: 'easy',
    estimatedTime: '10-20 ثانية',
    supportedFormats: ['PNG', 'JPG', 'WEBP'],
    features: [
      'AI upscaling',
      'Noise reduction',
      'Detail enhancement',
      'Color correction'
    ],
    featuresAr: [
      'ترقية بالذكاء الاصطناعي',
      'تقليل التشويش',
      'تحسين التفاصيل',
      'تصحيح الألوان'
    ],
    parameters: [
      {
        name: 'Upscale Factor',
        nameAr: 'معامل الترقية',
        type: 'select',
        defaultValue: '2x',
        options: [
          { value: '2x', label: '2x', labelAr: '2x' },
          { value: '4x', label: '4x', labelAr: '4x' },
          { value: '8x', label: '8x', labelAr: '8x' }
        ]
      },
      {
        name: 'Enhancement Level',
        nameAr: 'مستوى التحسين',
        type: 'slider',
        defaultValue: 75,
        min: 0,
        max: 100,
        step: 5
      }
    ]
  },
  {
    id: 'vip-magic-morph',
    name: 'VIP Magic Morph',
    nameAr: 'التحويل السحري VIP',
    description: 'Advanced transformation with uncensored capabilities',
    descriptionAr: 'تحويل متقدم مع إمكانيات غير مقيدة',
    category: 'transformation',
    categoryAr: 'التحويل',
    icon: '🔮',
    color: 'from-red-500 to-pink-500',
    isVIP: true,
    difficulty: 'hard',
    estimatedTime: '30-60 ثانية',
    supportedFormats: ['PNG', 'JPG', 'WEBP'],
    features: [
      'Uncensored transformations',
      'Advanced AI models',
      'Premium quality',
      'Exclusive styles',
      'No content restrictions'
    ],
    featuresAr: [
      'تحويلات غير مقيدة',
      'نماذج ذكاء اصطناعي متقدمة',
      'جودة مميزة',
      'أنماط حصرية',
      'بلا قيود محتوى'
    ],
    limitations: [
      'Requires VIP access',
      'Adult content only',
      'Age verification required'
    ],
    limitationsAr: [
      'يتطلب وصول VIP',
      'محتوى للبالغين فقط',
      'مطلوب التحقق من العمر'
    ],
    parameters: [
      {
        name: 'Adult Content Level',
        nameAr: 'مستوى المحتوى للبالغين',
        type: 'select',
        defaultValue: 'moderate',
        options: [
          { value: 'moderate', label: 'Moderate', labelAr: 'متوسط' },
          { value: 'explicit', label: 'Explicit', labelAr: 'صريح' },
          { value: 'extreme', label: 'Extreme', labelAr: 'متطرف' }
        ]
      },
      {
        name: 'Transformation Intensity',
        nameAr: 'شدة التحويل',
        type: 'slider',
        defaultValue: 85,
        min: 0,
        max: 100,
        step: 5
      },
      {
        name: 'Uncensored Mode',
        nameAr: 'النمط غير المقيد',
        type: 'toggle',
        defaultValue: true
      }
    ]
  }
];

export function getServiceById(id: string): AiService | undefined {
  return AI_SERVICES.find(service => service.id === id);
}

export function getServicesByCategory(category: AiService['category']): AiService[] {
  return AI_SERVICES.filter(service => service.category === category);
}

export function getVIPServices(): AiService[] {
  return AI_SERVICES.filter(service => service.isVIP);
}

export function getFreeServices(): AiService[] {
  return AI_SERVICES.filter(service => !service.isVIP);
}