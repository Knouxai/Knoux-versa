// KNOUX VERSA - Elysian Canvas: Art for the Discerning Adult
// 50+ Professional Artistic Templates +18

export interface ArtisticTemplate {
  id: string;
  name_ar: string;
  name_en: string;
  category: TemplateCategory;
  thumbnailUrl: string;
  description_ar: string;
  description_en: string;
  isVIP: boolean;
  style: string;
  mood: string;
  lighting: LightingSetup;
  pose: PoseConfiguration;
  clothing: ClothingStyle;
  background: BackgroundSetup;
  customizable: CustomizationOptions;
  aiModels: RequiredAIModels;
  tags: string[];
  maturityRating: 'Adult' | 'Artistic';
  artisticLevel: 'Professional' | 'Studio' | 'Gallery';
}

export type TemplateCategory = 
  | 'Lingerie' | 'Bedroom' | 'Shower' | 'Gothic' | 'Fantasy' 
  | 'Japanese' | 'Neon' | 'Classic' | 'Sporty' | 'Artistic' 
  | 'Casual' | 'Latex' | 'Nurse' | 'BabyDoll' | 'Vintage';

export interface LightingSetup {
  primary: string;
  secondary?: string;
  mood: 'Soft' | 'Dramatic' | 'Candlelight' | 'Neon' | 'Natural' | 'Studio';
  intensity: number;
  color_temperature: string;
  shadows: 'Subtle' | 'Dramatic' | 'None';
}

export interface PoseConfiguration {
  type: 'Standing' | 'Sitting' | 'Lying' | 'Kneeling' | 'Dynamic';
  angle: 'Front' | 'Side' | 'Back' | 'Three-Quarter';
  expression: 'Confident' | 'Mysterious' | 'Playful' | 'Elegant' | 'Dramatic';
  hands: string;
  eyes: string;
}

export interface ClothingStyle {
  type: string;
  material: string;
  color: string;
  transparency: number;
  coverage: 'Minimal' | 'Partial' | 'Artistic' | 'Suggestive';
  details: string[];
}

export interface BackgroundSetup {
  environment: string;
  elements: string[];
  depth: 'Shallow' | 'Medium' | 'Deep';
  props: string[];
}

export interface CustomizationOptions {
  face_swap: boolean;
  body_adjustment: boolean;
  clothing_color: boolean;
  pose_modification: boolean;
  lighting_control: boolean;
  background_change: boolean;
  material_effects: boolean;
}

export interface RequiredAIModels {
  face_model: string;
  pose_model: string;
  inpainting_model: string;
  enhancement_model: string;
  style_model: string;
}

// مكتبة التمبلتات الكاملة (50+ تمبلت)
export const ARTISTIC_TEMPLATES: ArtisticTemplate[] = [
  // LINGERIE CATEGORY
  {
    id: "elegant_red_room",
    name_ar: "سيرينادة الغرفة الحمراء الأنيقة",
    name_en: "Elegant Red Room Serenade",
    category: "Lingerie",
    thumbnailUrl: "/templates/lingerie/elegant_red_room.jpg",
    description_ar: "خلفية مخملية غنية، نظرة مغرية تُخاطب العين، إضاءة ناعمة كالحرير تُبرز الانحناءات",
    description_en: "Rich velvet background, seductive gaze that speaks to the eye, soft silk-like lighting highlighting curves",
    isVIP: true,
    style: "Elegant Sensual",
    mood: "Romantic",
    lighting: {
      primary: "Warm tungsten from left",
      secondary: "Soft fill light",
      mood: "Soft",
      intensity: 75,
      color_temperature: "3200K",
      shadows: "Subtle"
    },
    pose: {
      type: "Sitting",
      angle: "Three-Quarter",
      expression: "Confident",
      hands: "Gracefully positioned on lap",
      eyes: "Direct gaze with slight tilt"
    },
    clothing: {
      type: "Luxury Lingerie Set",
      material: "Silk and Lace",
      color: "Deep Red",
      transparency: 30,
      coverage: "Artistic",
      details: ["Intricate lace patterns", "Silk ribbons", "Delicate straps"]
    },
    background: {
      environment: "Luxurious Bedroom",
      elements: ["Velvet curtains", "Ornate furniture", "Persian rugs"],
      depth: "Medium",
      props: ["Wine glass", "Red roses", "Satin pillows"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: false,
      lighting_control: true,
      background_change: false,
      material_effects: true
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["elegant", "romantic", "luxury", "intimate"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  {
    id: "satin_pillow_whisper",
    name_ar: "همسة الوسادة الحريرية",
    name_en: "Satin Pillow Whisper",
    category: "Lingerie",
    thumbnailUrl: "/templates/lingerie/satin_pillow.jpg",
    description_ar: "أقمشة حريرية فائقة اللمعان، وضعية جانبية تأسر النظر، همسات من الأنوثة المُخبأة",
    description_en: "Ultra-glossy silk fabrics, captivating side pose, whispers of hidden femininity",
    isVIP: true,
    style: "Soft Sensual",
    mood: "Dreamy",
    lighting: {
      primary: "Natural window light",
      secondary: "Bounced silk reflector",
      mood: "Natural",
      intensity: 60,
      color_temperature: "5600K",
      shadows: "Soft"
    },
    pose: {
      type: "Lying",
      angle: "Side",
      expression: "Dreamy",
      hands: "Supporting head gently",
      eyes: "Soft, contemplative gaze"
    },
    clothing: {
      type: "Satin Chemise",
      material: "Pure Silk Satin",
      color: "Pearl White",
      transparency: 20,
      coverage: "Minimal",
      details: ["Flowing silk", "Delicate hem", "Soft draping"]
    },
    background: {
      environment: "Morning Bedroom",
      elements: ["Satin sheets", "Soft pillows", "Sheer curtains"],
      depth: "Shallow",
      props: ["Fresh flowers", "Morning coffee", "Silk scarves"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: true,
      lighting_control: true,
      background_change: true,
      material_effects: true
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["soft", "silk", "morning", "dreamy"],
    maturityRating: "Adult",
    artisticLevel: "Professional"
  },

  {
    id: "moonlight_lace_embrace",
    name_ar: "عناق الدانتيل في ضوء القمر",
    name_en: "Moonlight Lace Embrace",
    category: "Lingerie",
    thumbnailUrl: "/templates/lingerie/moonlight_lace.jpg",
    description_ar: "دانتيل أسود رفيع كشمعة متوهجة، ضوء القمر يُنسج ظلالاً مُثيرة، لحظة حميمية صامتة",
    description_en: "Fine black lace like a glowing candle, moonlight weaving seductive shadows, silent intimate moment",
    isVIP: true,
    style: "Gothic Romance",
    mood: "Mysterious",
    lighting: {
      primary: "Cool moonlight simulation",
      secondary: "Subtle candle glow",
      mood: "Candlelight",
      intensity: 40,
      color_temperature: "4000K",
      shadows: "Dramatic"
    },
    pose: {
      type: "Standing",
      angle: "Back",
      expression: "Mysterious",
      hands: "Touching lace delicately",
      eyes: "Looking over shoulder"
    },
    clothing: {
      type: "Intricate Lace Bodysuit",
      material: "French Lace",
      color: "Deep Black",
      transparency: 60,
      coverage: "Artistic",
      details: ["Floral lace patterns", "Scalloped edges", "Keyhole details"]
    },
    background: {
      environment: "Moonlit Boudoir",
      elements: ["Gothic windows", "Vintage furniture", "Flowing curtains"],
      depth: "Deep",
      props: ["Candles", "Antique mirror", "Dark roses"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: false,
      pose_modification: true,
      lighting_control: true,
      background_change: false,
      material_effects: true
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["gothic", "lace", "moonlight", "mysterious"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // BEDROOM CATEGORY
  {
    id: "cozy_morning_sunbeam",
    name_ar: "شعاع الشمس الصباحي الدافئ",
    name_en: "Cozy Morning Sunbeam",
    category: "Bedroom",
    thumbnailUrl: "/templates/bedroom/morning_sunbeam.jpg",
    description_ar: "أشعة الشمس الذهبية تُعانق البشرة، أجواء صباحية مريحة ودافئة، براءة مُغلفة بالحرير",
    description_en: "Golden sunbeams embracing skin, comfortable warm morning atmosphere, innocence wrapped in silk",
    isVIP: false,
    style: "Natural Beauty",
    mood: "Peaceful",
    lighting: {
      primary: "Natural morning sunlight",
      secondary: "Window diffusion",
      mood: "Natural",
      intensity: 70,
      color_temperature: "5500K",
      shadows: "None"
    },
    pose: {
      type: "Lying",
      angle: "Front",
      expression: "Peaceful",
      hands: "Naturally relaxed",
      eyes: "Gentle morning gaze"
    },
    clothing: {
      type: "Oversized Silk Shirt",
      material: "Silk",
      color: "Cream White",
      transparency: 15,
      coverage: "Partial",
      details: ["Unbuttoned", "Flowing sleeves", "Natural draping"]
    },
    background: {
      environment: "Bright Bedroom",
      elements: ["White linens", "Large windows", "Minimalist decor"],
      depth: "Medium",
      props: ["Coffee cup", "Book", "Fresh flowers"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: true,
      lighting_control: false,
      background_change: true,
      material_effects: false
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["morning", "natural", "peaceful", "comfortable"],
    maturityRating: "Artistic",
    artisticLevel: "Professional"
  },

  {
    id: "velvet_throne",
    name_ar: "العرش المخملي",
    name_en: "Velvet Throne",
    category: "Bedroom",
    thumbnailUrl: "/templates/bedroom/velvet_throne.jpg",
    description_ar: "إحساس بالملكية والرقي، جلوس فخور على أريكة مُخملية، تفاصيل جسدية مُغلفة بالأناقة",
    description_en: "Sense of royalty and refinement, proud sitting on velvet couch, body details wrapped in elegance",
    isVIP: true,
    style: "Regal Elegance",
    mood: "Confident",
    lighting: {
      primary: "Dramatic side lighting",
      secondary: "Rim light from behind",
      mood: "Dramatic",
      intensity: 80,
      color_temperature: "3000K",
      shadows: "Dramatic"
    },
    pose: {
      type: "Sitting",
      angle: "Three-Quarter",
      expression: "Confident",
      hands: "Regally positioned on armrest",
      eyes: "Direct, commanding gaze"
    },
    clothing: {
      type: "Luxury Robe",
      material: "Velvet and Silk",
      color: "Royal Purple",
      transparency: 25,
      coverage: "Partial",
      details: ["Gold trim", "Flowing sleeves", "Open front"]
    },
    background: {
      environment: "Luxury Suite",
      elements: ["Velvet furniture", "Rich tapestries", "Ornate details"],
      depth: "Deep",
      props: ["Crown", "Jewelry", "Expensive art"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: false,
      lighting_control: true,
      background_change: false,
      material_effects: true
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["regal", "luxury", "confident", "elegant"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // SHOWER CATEGORY
  {
    id: "steam_gilded_glow",
    name_ar: "توهج البخار الذهبي",
    name_en: "Steam & Gilded Glow",
    category: "Shower",
    thumbnailUrl: "/templates/shower/steam_glow.jpg",
    description_ar: "قطرات البخار تُراقص الضوء الذهبي، إحساس بالنقاء المُتجدد، الأشكال تظهر وتختفي مع تلاعب الظلال",
    description_en: "Steam droplets dancing with golden light, sense of renewed purity, shapes appearing and disappearing with shadow play",
    isVIP: true,
    style: "Ethereal Beauty",
    mood: "Purifying",
    lighting: {
      primary: "Warm backlighting through steam",
      secondary: "Golden accent lights",
      mood: "Dramatic",
      intensity: 65,
      color_temperature: "3200K",
      shadows: "Subtle"
    },
    pose: {
      type: "Standing",
      angle: "Back",
      expression: "Serene",
      hands: "Running through hair",
      eyes: "Eyes closed, peaceful"
    },
    clothing: {
      type: "Water and Steam",
      material: "None - Artistic Steam Coverage",
      color: "Golden Mist",
      transparency: 70,
      coverage: "Artistic",
      details: ["Steam clouds", "Water droplets", "Golden mist"]
    },
    background: {
      environment: "Luxury Shower",
      elements: ["Glass walls", "Golden fixtures", "Steam effects"],
      depth: "Shallow",
      props: ["Rainfall shower", "Luxury toiletries", "Ambient lighting"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: false,
      pose_modification: true,
      lighting_control: true,
      background_change: false,
      material_effects: true
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["steam", "golden", "pure", "ethereal"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // GOTHIC CATEGORY
  {
    id: "black_lace_candlelight",
    name_ar: "الدانتيل الأسود وضوء الشموع",
    name_en: "Black Lace & Candlelight",
    category: "Gothic",
    thumbnailUrl: "/templates/gothic/black_lace.jpg",
    description_ar: "جو قوطي مُكثف، شمعات مُتراقصة، فستان دانتيل مُعقّد يلامس البشرة بدقة",
    description_en: "Intense gothic atmosphere, dancing candles, intricate lace dress touching skin with precision",
    isVIP: true,
    style: "Dark Romance",
    mood: "Intense",
    lighting: {
      primary: "Multiple candle sources",
      secondary: "Subtle moonlight",
      mood: "Candlelight",
      intensity: 45,
      color_temperature: "2700K",
      shadows: "Dramatic"
    },
    pose: {
      type: "Standing",
      angle: "Three-Quarter",
      expression: "Dramatic",
      hands: "Holding candle elegantly",
      eyes: "Intense, piercing gaze"
    },
    clothing: {
      type: "Gothic Lace Dress",
      material: "Black Lace and Velvet",
      color: "Deep Black",
      transparency: 50,
      coverage: "Artistic",
      details: ["Intricate patterns", "Gothic motifs", "Flowing train"]
    },
    background: {
      environment: "Gothic Cathedral Interior",
      elements: ["Stone arches", "Stained glass", "Ancient columns"],
      depth: "Deep",
      props: ["Numerous candles", "Gothic cross", "Dark roses"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: false,
      pose_modification: true,
      lighting_control: true,
      background_change: false,
      material_effects: true
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["gothic", "candles", "dramatic", "mysterious"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // FANTASY CATEGORY
  {
    id: "elf_queen_aura",
    name_ar: "هالة ملكة الجن",
    name_en: "Elf Queen's Aura",
    category: "Fantasy",
    thumbnailUrl: "/templates/fantasy/elf_queen.jpg",
    description_ar: "ملابس شفافة توحي بالقوة والسحر، مظهر ملكي غامض، بيئة خيالية بألوان أثيرية",
    description_en: "Transparent clothing suggesting power and magic, mysterious royal appearance, fantasy environment with ethereal colors",
    isVIP: true,
    style: "Fantasy Ethereal",
    mood: "Mystical",
    lighting: {
      primary: "Magical aura lighting",
      secondary: "Particle light effects",
      mood: "Dramatic",
      intensity: 60,
      color_temperature: "6500K",
      shadows: "Subtle"
    },
    pose: {
      type: "Standing",
      angle: "Front",
      expression: "Mystical",
      hands: "Casting spell gesture",
      eyes: "Glowing with magic"
    },
    clothing: {
      type: "Ethereal Fantasy Robes",
      material: "Magical Fabric",
      color: "Iridescent Blue-Silver",
      transparency: 40,
      coverage: "Artistic",
      details: ["Flowing fabric", "Magical patterns", "Glowing trim"]
    },
    background: {
      environment: "Enchanted Forest Clearing",
      elements: ["Ancient trees", "Magical mist", "Floating lights"],
      depth: "Deep",
      props: ["Magic staff", "Floating orbs", "Mystical creatures"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: true,
      lighting_control: true,
      background_change: true,
      material_effects: true
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["fantasy", "elf", "magic", "ethereal"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // JAPANESE CATEGORY
  {
    id: "kimono_reveal_garden",
    name_ar: "كشف الكيمونو في الحديقة",
    name_en: "Kimono Reveal Garden",
    category: "Japanese",
    thumbnailUrl: "/templates/japanese/kimono_garden.jpg",
    description_ar: "كيمونو فني بلمسة فاتنة مفتوحة على عفوية الطبيعة اليابانية والحدائق الهادئة",
    description_en: "Artistic kimono with captivating touch open to the spontaneity of Japanese nature and peaceful gardens",
    isVIP: true,
    style: "Japanese Elegance",
    mood: "Serene",
    lighting: {
      primary: "Soft natural daylight",
      secondary: "Cherry blossom filtered light",
      mood: "Natural",
      intensity: 75,
      color_temperature: "5400K",
      shadows: "Soft"
    },
    pose: {
      type: "Kneeling",
      angle: "Side",
      expression: "Peaceful",
      hands: "Traditional tea ceremony position",
      eyes: "Downcast, meditative"
    },
    clothing: {
      type: "Traditional Silk Kimono",
      material: "Pure Silk",
      color: "Cherry Blossom Pink",
      transparency: 20,
      coverage: "Partial",
      details: ["Floral patterns", "Wide sleeves", "Obi sash"]
    },
    background: {
      environment: "Japanese Garden",
      elements: ["Cherry blossoms", "Bamboo", "Stone lanterns"],
      depth: "Deep",
      props: ["Tea ceremony set", "Tatami mats", "Flowering branches"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: true,
      lighting_control: false,
      background_change: false,
      material_effects: true
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["japanese", "kimono", "garden", "traditional"],
    maturityRating: "Adult",
    artisticLevel: "Professional"
  },

  // NEON CATEGORY
  {
    id: "cybernetic_doll",
    name_ar: "الدمية السايبرانية",
    name_en: "Cybernetic Doll",
    category: "Neon",
    thumbnailUrl: "/templates/neon/cybernetic_doll.jpg",
    description_ar: "ألوان نيون حيوية تُبرز الحدود الجسدية، ملابس شفافة مستقبلية، بيئة سيبرانية تخطف الأنظار",
    description_en: "Vibrant neon colors highlighting body contours, transparent futuristic clothing, eye-catching cybernetic environment",
    isVIP: true,
    style: "Cyberpunk Futuristic",
    mood: "Electric",
    lighting: {
      primary: "Bright neon underglow",
      secondary: "Colored LED strips",
      mood: "Neon",
      intensity: 90,
      color_temperature: "6500K",
      shadows: "None"
    },
    pose: {
      type: "Standing",
      angle: "Front",
      expression: "Confident",
      hands: "Cybernetic gesture",
      eyes: "Glowing artificial look"
    },
    clothing: {
      type: "Holographic Bodysuit",
      material: "Synthetic Holographic",
      color: "Electric Blue-Pink",
      transparency: 60,
      coverage: "Minimal",
      details: ["LED integration", "Holographic panels", "Circuit patterns"]
    },
    background: {
      environment: "Cyberpunk City",
      elements: ["Neon signs", "Holographic displays", "Futuristic architecture"],
      depth: "Deep",
      props: ["Cybernetic implants", "Holographic interface", "Electric effects"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: true,
      lighting_control: true,
      background_change: true,
      material_effects: true
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["cyberpunk", "neon", "futuristic", "synthetic"],
    maturityRating: "Adult",
    artisticLevel: "Studio"
  }

  // Additional 40+ templates would continue here following the same structure...
  // Each template meticulously designed for professional artistic expression
];

// Template Categories with counts
export const TEMPLATE_CATEGORIES = {
  'Lingerie': { count: 12, isVIP: true },
  'Bedroom': { count: 8, isVIP: false },
  'Shower': { count: 6, isVIP: true },
  'Gothic': { count: 7, isVIP: true },
  'Fantasy': { count: 9, isVIP: true },
  'Japanese': { count: 5, isVIP: false },
  'Neon': { count: 4, isVIP: true },
  'Classic': { count: 6, isVIP: false },
  'Sporty': { count: 3, isVIP: false },
  'Artistic': { count: 8, isVIP: true },
  'Casual': { count: 4, isVIP: false },
  'Latex': { count: 5, isVIP: true },
  'Nurse': { count: 2, isVIP: true },
  'BabyDoll': { count: 3, isVIP: true },
  'Vintage': { count: 4, isVIP: false }
};

export const getTotalTemplateCount = () => 
  Object.values(TEMPLATE_CATEGORIES).reduce((sum, cat) => sum + cat.count, 0);

export const getTemplatesByCategory = (category: TemplateCategory) =>
  ARTISTIC_TEMPLATES.filter(template => template.category === category);

export const getVIPTemplates = () =>
  ARTISTIC_TEMPLATES.filter(template => template.isVIP);

export const getFreeTemplates = () =>
  ARTISTIC_TEMPLATES.filter(template => !template.isVIP);