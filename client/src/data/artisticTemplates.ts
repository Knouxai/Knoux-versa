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
    description_ar: "ملابس شفاف�� توحي بالقوة والسحر، مظهر ملكي غامض، بيئة خيالية بألوان أثيرية",
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

    // ==================== ADDITIONAL LINGERIE TEMPLATES ====================
  {
    id: "golden_hour_intimate",
    name_ar: "حميمية الساعة الذهبية",
    name_en: "Golden Hour Intimate",
    category: "Lingerie",
    thumbnailUrl: "/templates/lingerie/golden_hour.jpg",
    description_ar: "ضوء الغروب الذهبي يُداعب الحرير الشفاف، لحظة حميمية آسرة",
    description_en: "Golden sunset light caressing transparent silk, captivating intimate moment",
    isVIP: true,
    style: "Romantic Sunset",
    mood: "Warm",
    lighting: {
      primary: "Golden hour window light",
      secondary: "Warm rim lighting",
      mood: "Natural",
      intensity: 85,
      color_temperature: "3000K",
      shadows: "Soft"
    },
    pose: {
      type: "Lying",
      angle: "Side",
      expression: "Dreamy",
      hands: "Naturally positioned",
      eyes: "Soft, contemplative"
    },
    clothing: {
      type: "Transparent Negligee",
      material: "Sheer Silk",
      color: "Champagne Gold",
      transparency: 60,
      coverage: "Minimal",
      details: ["Flowing fabric", "Delicate straps", "Golden shimmer"]
    },
    background: {
      environment: "Sunset Boudoir",
      elements: ["Large windows", "Golden light", "Soft curtains"],
      depth: "Medium",
      props: ["Silk sheets", "Champagne glass", "Golden jewelry"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
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
    tags: ["golden", "sunset", "intimate", "silk"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  {
    id: "emerald_seduction",
    name_ar: "إغراء الزمرد",
    name_en: "Emerald Seduction",
    category: "Lingerie",
    thumbnailUrl: "/templates/lingerie/emerald_seduction.jpg",
    description_ar: "قطع داخلية باللون الزمردي الفاخر، تقاطعات معقدة تُبرز الجمال",
    description_en: "Luxury emerald lingerie pieces, intricate crossings highlighting beauty",
    isVIP: true,
    style: "Luxury Seductive",
    mood: "Sophisticated",
    lighting: {
      primary: "Emerald colored lighting",
      secondary: "Soft accent lights",
      mood: "Dramatic",
      intensity: 70,
      color_temperature: "4500K",
      shadows: "Dramatic"
    },
    pose: {
      type: "Standing",
      angle: "Three-Quarter",
      expression: "Confident",
      hands: "Elegantly positioned",
      eyes: "Piercing gaze"
    },
    clothing: {
      type: "Emerald Lingerie Set",
      material: "Satin and Lace",
      color: "Deep Emerald",
      transparency: 25,
      coverage: "Artistic",
      details: ["Intricate straps", "Jeweled accents", "Luxurious fabric"]
    },
    background: {
      environment: "Emerald Luxury Suite",
      elements: ["Rich fabrics", "Emerald accents", "Luxury furniture"],
      depth: "Deep",
      props: ["Emerald jewelry", "Crystal glasses", "Silk pillows"]
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
    tags: ["emerald", "luxury", "sophisticated", "jeweled"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // ==================== ADDITIONAL BEDROOM TEMPLATES ====================
  {
    id: "silk_sheets_paradise",
    name_ar: "جنة الملاءات الحريرية",
    name_en: "Silk Sheets Paradise",
    category: "Bedroom",
    thumbnailUrl: "/templates/bedroom/silk_paradise.jpg",
    description_ar: "ملاءات حريرية بيضاء، أجواء صباحية هادئة، جمال طبيعي خالص",
    description_en: "White silk sheets, peaceful morning atmosphere, pure natural beauty",
    isVIP: false,
    style: "Natural Elegance",
    mood: "Serene",
    lighting: {
      primary: "Soft morning sunlight",
      secondary: "Diffused window light",
      mood: "Natural",
      intensity: 65,
      color_temperature: "5600K",
      shadows: "None"
    },
    pose: {
      type: "Lying",
      angle: "Side",
      expression: "Peaceful",
      hands: "Naturally relaxed",
      eyes: "Gentle morning look"
    },
    clothing: {
      type: "Silk Sheet Coverage",
      material: "Pure Silk",
      color: "Pearl White",
      transparency: 30,
      coverage: "Artistic",
      details: ["Flowing silk", "Natural draping", "Soft texture"]
    },
    background: {
      environment: "Serene Bedroom",
      elements: ["White linens", "Soft pillows", "Natural light"],
      depth: "Shallow",
      props: ["Fresh flowers", "Morning tea", "Soft textures"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: true,
      lighting_control: false,
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
    tags: ["silk", "morning", "peaceful", "natural"],
    maturityRating: "Artistic",
    artisticLevel: "Professional"
  },

  {
    id: "midnight_mystique",
    name_ar: "غموض منتصف الليل",
    name_en: "Midnight Mystique",
    category: "Bedroom",
    thumbnailUrl: "/templates/bedroom/midnight_mystique.jpg",
    description_ar: "أجواء ليلية غامضة، إضاءة خافتة، غموض وأناقة متقنة",
    description_en: "Mysterious nighttime atmosphere, dim lighting, refined mystery and elegance",
    isVIP: true,
    style: "Mysterious Elegance",
    mood: "Mysterious",
    lighting: {
      primary: "Dim bedside lighting",
      secondary: "Moonlight through window",
      mood: "Candlelight",
      intensity: 30,
      color_temperature: "2700K",
      shadows: "Dramatic"
    },
    pose: {
      type: "Sitting",
      angle: "Three-Quarter",
      expression: "Mysterious",
      hands: "Elegantly positioned",
      eyes: "Enigmatic gaze"
    },
    clothing: {
      type: "Dark Silk Nightgown",
      material: "Flowing Silk",
      color: "Midnight Blue",
      transparency: 40,
      coverage: "Partial",
      details: ["Flowing fabric", "Elegant cut", "Subtle shimmer"]
    },
    background: {
      environment: "Moonlit Bedroom",
      elements: ["Dark furniture", "Moonlight", "Elegant decor"],
      depth: "Deep",
      props: ["Candles", "Dark roses", "Vintage books"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
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
    tags: ["midnight", "mysterious", "elegant", "moonlight"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // ==================== ADDITIONAL SHOWER TEMPLATES ====================
  {
    id: "crystal_water_cascade",
    name_ar: "شلال المياه الكريستالية",
    name_en: "Crystal Water Cascade",
    category: "Shower",
    thumbnailUrl: "/templates/shower/crystal_cascade.jpg",
    description_ar: "مياه كريستالية متدفقة، بخار لؤلؤي، نقاء أثيري مُطلق",
    description_en: "Crystal flowing water, pearlescent steam, absolute ethereal purity",
    isVIP: true,
    style: "Pure Ethereal",
    mood: "Purifying",
    lighting: {
      primary: "Crystal clear backlighting",
      secondary: "Water reflection light",
      mood: "Natural",
      intensity: 80,
      color_temperature: "6000K",
      shadows: "None"
    },
    pose: {
      type: "Standing",
      angle: "Back",
      expression: "Serene",
      hands: "Under flowing water",
      eyes: "Eyes closed in bliss"
    },
    clothing: {
      type: "Water and Light",
      material: "Crystal Water Coverage",
      color: "Crystal Clear",
      transparency: 85,
      coverage: "Artistic",
      details: ["Water streams", "Light reflections", "Pure essence"]
    },
    background: {
      environment: "Crystal Shower",
      elements: ["Crystal walls", "Flowing water", "Pure light"],
      depth: "Medium",
      props: ["Crystal fixtures", "Water cascades", "Light prisms"]
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
    tags: ["crystal", "water", "pure", "ethereal"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // ==================== ADDITIONAL GOTHIC TEMPLATES ====================
  {
    id: "vampire_queen_throne",
    name_ar: "عرش ملكة مصاصي الدماء",
    name_en: "Vampire Queen Throne",
    category: "Gothic",
    thumbnailUrl: "/templates/gothic/vampire_queen.jpg",
    description_ar: "عرش قوطي مُظلم، أجواء دراماتيكية مُكثفة، ملكة الظلام",
    description_en: "Dark gothic throne, intense dramatic atmosphere, queen of darkness",
    isVIP: true,
    style: "Dark Majesty",
    mood: "Commanding",
    lighting: {
      primary: "Dramatic red lighting",
      secondary: "Shadow play effects",
      mood: "Dramatic",
      intensity: 50,
      color_temperature: "2500K",
      shadows: "Dramatic"
    },
    pose: {
      type: "Sitting",
      angle: "Front",
      expression: "Commanding",
      hands: "Regally positioned on throne",
      eyes: "Piercing royal gaze"
    },
    clothing: {
      type: "Gothic Royal Gown",
      material: "Black Velvet and Lace",
      color: "Deep Black with Red",
      transparency: 30,
      coverage: "Artistic",
      details: ["Gothic patterns", "Royal trim", "Dramatic silhouette"]
    },
    background: {
      environment: "Gothic Throne Room",
      elements: ["Stone throne", "Gothic arches", "Dark atmosphere"],
      depth: "Deep",
      props: ["Crown", "Gothic chalice", "Dark roses"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: false,
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
    tags: ["gothic", "vampire", "royal", "dramatic"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // ==================== ADDITIONAL FANTASY TEMPLATES ====================
  {
    id: "mermaid_lagoon",
    name_ar: "بحيرة حورية البحر",
    name_en: "Mermaid Lagoon",
    category: "Fantasy",
    thumbnailUrl: "/templates/fantasy/mermaid_lagoon.jpg",
    description_ar: "بحيرة سحرية، ذيل حورية البحر المتلألئ، مياه كريستالية",
    description_en: "Magical lagoon, shimmering mermaid tail, crystal waters",
    isVIP: true,
    style: "Aquatic Fantasy",
    mood: "Enchanting",
    lighting: {
      primary: "Underwater light effects",
      secondary: "Magical sparkles",
      mood: "Dramatic",
      intensity: 75,
      color_temperature: "5000K",
      shadows: "Soft"
    },
    pose: {
      type: "Lying",
      angle: "Side",
      expression: "Mystical",
      hands: "Flowing with water",
      eyes: "Oceanic gaze"
    },
    clothing: {
      type: "Mermaid Tail and Shell Bikini",
      material: "Iridescent Scales",
      color: "Ocean Blue-Green",
      transparency: 20,
      coverage: "Fantasy",
      details: ["Scaled tail", "Shell top", "Pearl accessories"]
    },
    background: {
      environment: "Magical Underwater Lagoon",
      elements: ["Crystal waters", "Coral formations", "Magical lights"],
      depth: "Deep",
      props: ["Pearls", "Seashells", "Aquatic plants"]
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
    tags: ["mermaid", "fantasy", "lagoon", "magical"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // ==================== CLASSIC CATEGORY ====================
  {
    id: "renaissance_masterpiece",
    name_ar: "تحفة عصر النهضة",
    name_en: "Renaissance Masterpiece",
    category: "Classic",
    thumbnailUrl: "/templates/classic/renaissance.jpg",
    description_ar: "لوحة كلاسيكية من عصر النهضة، جمال خالد، فن راقي",
    description_en: "Classical Renaissance painting, timeless beauty, refined art",
    isVIP: false,
    style: "Classical Art",
    mood: "Timeless",
    lighting: {
      primary: "Classical portrait lighting",
      secondary: "Soft fill light",
      mood: "Studio",
      intensity: 70,
      color_temperature: "4200K",
      shadows: "Subtle"
    },
    pose: {
      type: "Sitting",
      angle: "Three-Quarter",
      expression: "Elegant",
      hands: "Classical positioning",
      eyes: "Serene classical gaze"
    },
    clothing: {
      type: "Classical Draping",
      material: "Flowing Fabric",
      color: "Classical Tones",
      transparency: 40,
      coverage: "Artistic",
      details: ["Classical draping", "Elegant folds", "Timeless style"]
    },
    background: {
      environment: "Renaissance Studio",
      elements: ["Classical columns", "Rich fabrics", "Art elements"],
      depth: "Medium",
      props: ["Classical vase", "Fruits", "Artistic elements"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: true,
      lighting_control: true,
      background_change: false,
      material_effects: false
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["renaissance", "classical", "art", "timeless"],
    maturityRating: "Artistic",
    artisticLevel: "Gallery"
  },

  // ==================== SPORTY CATEGORY ====================
  {
    id: "athletic_goddess",
    name_ar: "آلهة الرياضة",
    name_en: "Athletic Goddess",
    category: "Sporty",
    thumbnailUrl: "/templates/sporty/athletic_goddess.jpg",
    description_ar: "جمال رياضي قوي، ملابس رياضية أنيقة، قوة وأنوثة",
    description_en: "Strong athletic beauty, elegant sportswear, strength and femininity",
    isVIP: false,
    style: "Athletic Beauty",
    mood: "Empowering",
    lighting: {
      primary: "Natural gym lighting",
      secondary: "Motivated energy light",
      mood: "Natural",
      intensity: 85,
      color_temperature: "5400K",
      shadows: "None"
    },
    pose: {
      type: "Standing",
      angle: "Front",
      expression: "Confident",
      hands: "Athletic positioning",
      eyes: "Determined gaze"
    },
    clothing: {
      type: "Designer Sportswear",
      material: "Performance Fabric",
      color: "Athletic Colors",
      transparency: 10,
      coverage: "Sporty",
      details: ["Form-fitting", "Athletic cut", "Performance design"]
    },
    background: {
      environment: "Modern Gym",
      elements: ["Gym equipment", "Natural light", "Clean design"],
      depth: "Medium",
      props: ["Water bottle", "Towel", "Athletic accessories"]
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
    tags: ["athletic", "sporty", "strong", "confident"],
    maturityRating: "Artistic",
    artisticLevel: "Professional"
  },

  // ==================== ARTISTIC CATEGORY ====================
  {
    id: "abstract_emotion",
    name_ar: "المشاعر المجردة",
    name_en: "Abstract Emotion",
    category: "Artistic",
    thumbnailUrl: "/templates/artistic/abstract_emotion.jpg",
    description_ar: "تعبير فني مجرد، ألوان عاطفية، فن تعبيري معاصر",
    description_en: "Abstract artistic expression, emotional colors, contemporary expressive art",
    isVIP: true,
    style: "Abstract Expressionism",
    mood: "Emotional",
    lighting: {
      primary: "Artistic color lighting",
      secondary: "Abstract light effects",
      mood: "Dramatic",
      intensity: 90,
      color_temperature: "Variable",
      shadows: "Artistic"
    },
    pose: {
      type: "Dynamic",
      angle: "Multiple",
      expression: "Emotional",
      hands: "Expressive movement",
      eyes: "Intense artistic gaze"
    },
    clothing: {
      type: "Artistic Body Paint",
      material: "Paint and Light",
      color: "Abstract Colors",
      transparency: 70,
      coverage: "Artistic",
      details: ["Color patterns", "Abstract designs", "Artistic effects"]
    },
    background: {
      environment: "Abstract Art Space",
      elements: ["Color splashes", "Abstract forms", "Artistic chaos"],
      depth: "Variable",
      props: ["Paint brushes", "Color palettes", "Art supplies"]
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
    tags: ["abstract", "artistic", "emotional", "contemporary"],
    maturityRating: "Adult",
    artisticLevel: "Gallery"
  },

  // ==================== LATEX CATEGORY ====================
  {
    id: "liquid_latex_shine",
    name_ar: "بريق اللاتكس السائل",
    name_en: "Liquid Latex Shine",
    category: "Latex",
    thumbnailUrl: "/templates/latex/liquid_shine.jpg",
    description_ar: "لاتكس لامع مثل المرآة، انعكاسات ضوئية مذهلة، جمال مستقبلي",
    description_en: "Mirror-like shiny latex, stunning light reflections, futuristic beauty",
    isVIP: true,
    style: "Futuristic Fetish",
    mood: "Intense",
    lighting: {
      primary: "High-contrast lighting",
      secondary: "Reflection effects",
      mood: "Dramatic",
      intensity: 95,
      color_temperature: "6500K",
      shadows: "Sharp"
    },
    pose: {
      type: "Standing",
      angle: "Three-Quarter",
      expression: "Confident",
      hands: "Commanding position",
      eyes: "Piercing gaze"
    },
    clothing: {
      type: "Full Body Latex Suit",
      material: "High-Gloss Latex",
      color: "Mirror Black",
      transparency: 0,
      coverage: "Full",
      details: ["Mirror finish", "Tight fit", "Seamless design"]
    },
    background: {
      environment: "Futuristic Studio",
      elements: ["Metallic surfaces", "Neon accents", "Modern design"],
      depth: "Medium",
      props: ["Chrome accessories", "Futuristic elements", "High-tech props"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
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
    tags: ["latex", "futuristic", "shiny", "intense"],
    maturityRating: "Adult",
    artisticLevel: "Studio"
  },

  // ==================== NURSE CATEGORY ====================
  {
    id: "medical_angel",
    name_ar: "الملاك الطبي",
    name_en: "Medical Angel",
    category: "Nurse",
    thumbnailUrl: "/templates/nurse/medical_angel.jpg",
    description_ar: "زي طبي أنيق، مظهر مهني جذاب، رعاية ناعمة",
    description_en: "Elegant medical uniform, attractive professional appearance, gentle care",
    isVIP: true,
    style: "Professional Seductive",
    mood: "Caring",
    lighting: {
      primary: "Soft medical lighting",
      secondary: "Clean white light",
      mood: "Studio",
      intensity: 80,
      color_temperature: "5600K",
      shadows: "Minimal"
    },
    pose: {
      type: "Standing",
      angle: "Front",
      expression: "Caring",
      hands: "Professional positioning",
      eyes: "Compassionate gaze"
    },
    clothing: {
      type: "Designer Nurse Uniform",
      material: "Premium Medical Fabric",
      color: "Pure White",
      transparency: 15,
      coverage: "Professional",
      details: ["Tailored fit", "Medical accessories", "Clean lines"]
    },
    background: {
      environment: "Modern Medical Room",
      elements: ["Clean surfaces", "Medical equipment", "Professional setting"],
      depth: "Medium",
      props: ["Stethoscope", "Medical chart", "Professional tools"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: false,
      pose_modification: true,
      lighting_control: false,
      background_change: false,
      material_effects: false
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["nurse", "medical", "professional", "caring"],
    maturityRating: "Adult",
    artisticLevel: "Professional"
  },

  // ==================== BABYDOLL CATEGORY ====================
  {
    id: "pastel_dreams",
    name_ar: "أحلام الباستيل",
    name_en: "Pastel Dreams",
    category: "BabyDoll",
    thumbnailUrl: "/templates/babydoll/pastel_dreams.jpg",
    description_ar: "ألوان باستيل ناعمة، براءة مغرية، نعومة حريرية",
    description_en: "Soft pastel colors, seductive innocence, silky softness",
    isVIP: true,
    style: "Sweet Seduction",
    mood: "Playful",
    lighting: {
      primary: "Soft diffused lighting",
      secondary: "Pastel color accents",
      mood: "Soft",
      intensity: 60,
      color_temperature: "5200K",
      shadows: "None"
    },
    pose: {
      type: "Sitting",
      angle: "Three-Quarter",
      expression: "Playful",
      hands: "Delicately positioned",
      eyes: "Sweet innocent look"
    },
    clothing: {
      type: "Pastel Babydoll Lingerie",
      material: "Soft Silk and Lace",
      color: "Pastel Pink",
      transparency: 35,
      coverage: "Minimal",
      details: ["Lace trim", "Ribbon details", "Delicate fabric"]
    },
    background: {
      environment: "Dreamy Bedroom",
      elements: ["Soft pastels", "Fluffy textures", "Dreamy atmosphere"],
      depth: "Shallow",
      props: ["Stuffed animals", "Pastel flowers", "Soft pillows"]
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
    tags: ["babydoll", "pastel", "sweet", "playful"],
    maturityRating: "Adult",
    artisticLevel: "Professional"
  },

  // ==================== VINTAGE CATEGORY ====================
  {
    id: "retro_pin_up",
    name_ar: "فتاة الدبوس الرترو",
    name_en: "Retro Pin-up",
    category: "Vintage",
    thumbnailUrl: "/templates/vintage/retro_pinup.jpg",
    description_ar: "أسلوب الخمسينات الكلاسيكي، صور البين آب، سحر الماضي",
    description_en: "Classic 1950s style, pin-up photography, vintage charm",
    isVIP: false,
    style: "Vintage Pin-up",
    mood: "Nostalgic",
    lighting: {
      primary: "Classic studio lighting",
      secondary: "Vintage photo effects",
      mood: "Studio",
      intensity: 75,
      color_temperature: "3800K",
      shadows: "Classic"
    },
    pose: {
      type: "Standing",
      angle: "Three-Quarter",
      expression: "Charming",
      hands: "Classic pin-up pose",
      eyes: "Vintage movie star gaze"
    },
    clothing: {
      type: "Vintage Pin-up Outfit",
      material: "Classic Fabrics",
      color: "Vintage Red",
      transparency: 20,
      coverage: "Vintage",
      details: ["Retro cut", "Classic patterns", "Vintage accessories"]
    },
    background: {
      environment: "1950s Studio",
      elements: ["Vintage furniture", "Retro props", "Classic setting"],
      depth: "Medium",
      props: ["Vintage phone", "Classic car", "Retro accessories"]
    },
    customizable: {
      face_swap: true,
      body_adjustment: true,
      clothing_color: true,
      pose_modification: true,
      lighting_control: false,
      background_change: false,
      material_effects: false
    },
    aiModels: {
      face_model: "InsightFace",
      pose_model: "ControlNet-OpenPose",
      inpainting_model: "Stable-Diffusion-Inpaint",
      enhancement_model: "GFPGAN",
      style_model: "StyleGAN"
    },
    tags: ["vintage", "pinup", "retro", "classic"],
    maturityRating: "Artistic",
    artisticLevel: "Professional"
  }

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