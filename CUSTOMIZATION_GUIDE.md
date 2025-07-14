# 🎨 دليل تخصيص KNOUX VERSA

هذا الدليل يوضح كيفية تخصيص جميع جوانب تطبيق KNOUX VERSA لتناسب احتياجاتك الخاصة.

## 📋 المحتويات

1. [إعداد متغيرات البيئة](#إعداد-متغيرات-البيئة)
2. [تخصيص الهوية والعلامة التجارية](#تخصيص-الهوية-والعلامة-التجارية)
3. [إعداد قاعدة البيانات](#إعداد-قاعدة-البيانات)
4. [تكوين خدمات الذكاء الاصطناعي](#تكوين-خدمات-الذكاء-الاصطناعي)
5. [تخصيص نظام VIP](#تخصيص-نظام-vip)
6. [إعداد الواجهة والترجمة](#إعداد-الواجهة-والترجمة)
7. [تخصيص القوالب](#تخصيص-القوالب)
8. [إعدادات الأمان](#إعدادات-الأمان)

## 🔧 إعداد متغيرات البيئة

### 1. إنشاء ملف البيئة

```bash
# انسخ ملف المثال
cp .env.example .env

# ثم قم بتحرير الملف
nano .env
```

### 2. المتغيرات الأساسية المطلوبة

```env
# قاعدة البيانات (مطلوب)
DATABASE_URL="postgresql://username:password@host/database"

# مفاتيح الذكاء الاصطناعي (اختيارية حسب الخدمات المطلوبة)
HUGGINGFACE_API_KEY="hf_your_key_here"
OPENAI_API_KEY="sk-your_key_here"
ANTHROPIC_API_KEY="sk-ant-your_key_here"
GOOGLE_API_KEY="your_google_key_here"

# إعدادات VIP (مطلوبة لنظام VIP)
VIP_MASTER_KEY="your_custom_secure_master_key"
VIP_JWT_SECRET="your_jwt_secret_key"
SESSION_SECRET="your_session_secret"

# إعدادات الأمان
ENCRYPTION_KEY="your_32_character_encryption_key"
ALLOWED_ORIGINS="https://yourdomain.com,https://app.yourdomain.com"
```

## 🎨 تخصيص الهوية والعلامة التجارية

### 1. تحرير إعدادات التطبيق

قم بتحرير `server/config/app-config.ts`:

```typescript
export const APP_CONFIG: AppConfig = {
  name: "اسم تطبيقك", // غير هذا
  nameAr: "اسم تطبيقك بالعربية", // وهذا
  version: "1.0.0",
  description: "وصف تطبيقك",
  descriptionAr: "وصف تطبيقك بالعربية",
  author: "اسم الشركة",
  website: "https://موقعك.com",
  supportEmail: "support@موقعك.com",

  branding: {
    primaryColor: "#your-color", // لونك الأساسي
    secondaryColor: "#your-color", // لونك الثانوي
    accentColor: "#your-color", // لون التمييز
    logo: "/assets/your-logo.png", // شعارك
    favicon: "/assets/your-favicon.ico",
  },
};
```

### 2. تحديث إعدادات الواجهة

قم بتحرير `client/src/config/ui-config.ts`:

```typescript
export const UI_CONFIG: UIConfig = {
  branding: {
    appName: "اسم تطبيقك",
    appNameAr: "اسم تطبيقك بالعربية",
    tagline: "شعارك باللغة الإنجليزية",
    taglineAr: "شعارك باللغة العربية",
    // ... باقي الإعدادات
  },
};
```

## 💾 إعداد قاعدة البيانات

### 1. إنشاء قاعدة بيانات على Neon

1. اذهب إلى [neon.tech](https://neon.tech)
2. إنشاء حساب مجاني
3. إنشاء مشروع جديد
4. انسخ رابط الاتصال

### 2. تشغيل الإعداد

```bash
# تشغيل سكريبت الإعداد
npm run setup

# أو تشغيل الإعداد يدوياً
npm run db:push
```

## 🤖 تكوين خدمات الذكاء الاصطناعي

### 1. HuggingFace (مجاني)

1. اذهب إلى [huggingface.co](https://huggingface.co)
2. إنشاء حساب
3. اذهب إلى Settings > Access Tokens
4. إنشاء token جديد

### 2. OpenAI (مدفوع)

1. اذهب إلى [platform.openai.com](https://platform.openai.com)
2. إنشاء حساب
3. اذهب إلى API Keys
4. إنشاء مفتاح جديد

### 3. تخصيص الخدمات

قم بتحرير `server/config/app-config.ts`:

```typescript
export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  huggingface: {
    enabled: true, // فعل/عطل الخدمة
    timeout: 30000, // مهلة زمنية بالملي ثانية
    retries: 3, // عدد المحاولات
    rateLimit: {
      requests: 10, // عدد الطلبات
      window: 60000, // في كل دقيقة
    },
  },
};
```

## 💎 تخصيص نظام VIP

### 1. إنشاء مفاتيح VIP مخصصة

قم بتحرير `server/ai/middleware/vipAuth.ts`:

```typescript
const vipKeys: Record<string, keyof typeof VIP_TIERS> = {
  YOUR_GOLD_KEY_2025: "gold", // مفتاح الذهب
  YOUR_PLATINUM_KEY_2025: "platinum", // مفتاح البلاتين
  YOUR_DIAMOND_KEY_2025: "diamond", // مفتاح الماس
  YOUR_CUSTOM_KEY: "diamond", // مفتاح مخصص
};
```

### 2. تخصيص مستويات VIP

```typescript
const VIP_TIERS = {
  gold: {
    name: "اسم المستوى الذهبي",
    concurrentRequests: 5, // عدد الطلبات المتزامنة
    dailyLimit: 200, // الحد اليومي
    features: ["feature1", "feature2"], // الميزات المتاحة
  },
  // ... باقي المستويات
};
```

### 3. تحديث مفتاح VIP الرئيسي

```bash
# إنشاء مفتاح آمن جديد
echo "YOUR_SECURE_VIP_MASTER_KEY_2025" > vip.key
```

## 🌐 إعداد الواجهة والترجمة

### 1. إضافة رسائل جديدة

قم بتحرير `client/src/config/ui-config.ts`:

```typescript
messages: {
  customMessage: {
    en: "Your custom message in English",
    ar: "رسالتك المخصصة بالعربية"
  },
  // إضافة المزيد من الرسائل
}
```

### 2. استخدام النظام في المكونات

```tsx
import { Translation } from "../config/ui-config";

function MyComponent() {
  return (
    <div>
      <h1>{Translation.t("customMessage")}</h1>
      <p>{Translation.msg("welcome")}</p>
    </div>
  );
}
```

## 🎭 تخصيص القوالب

### 1. إضافة قوالب جديدة

قم بتحرير `client/src/config/custom-templates.ts`:

```typescript
{
  id: 'my_custom_template',
  name: 'My Custom Template',
  nameAr: 'قالبي المخصص',
  description: 'Description of what this template does',
  descriptionAr: 'وصف ما يفعله هذا القالب',
  category: 'artistic',
  // ... باقي الإعدادات
}
```

### 2. تخصيص فئات القوالب

```typescript
export const TEMPLATE_CATEGORIES = [
  { id: "my_category", name: "My Category", nameAr: "فئتي" },
  // إضافة فئات جديدة
];
```

## 🔒 إعدادات الأمان

### 1. تفعيل HTTPS في الإنتاج

```typescript
// في server/config/security.ts
export const SECURITY_CONFIG = {
  forceHttps: process.env.NODE_ENV === "production",
  sessionSecure: true,
  csrfProtection: true,
};
```

### 2. تخصيص CORS

```typescript
allowedOrigins: [
  "https://yourdomain.com",
  "https://app.yourdomain.com",
  // إضافة نطاقاتك
];
```

### 3. تشفير البيانات الحساسة

```typescript
import { SecureStorage } from "../config/security";

// تشفير
const encrypted = SecureStorage.encrypt("sensitive data");

// فك التشفير
const decrypted = SecureStorage.decrypt(encrypted);
```

## 🚀 نشر التطبيق

### 1. البناء للإنتاج

```bash
# بناء التطبيق
npm run build

# تشغيل في بيئة الإنتاج
npm start
```

### 2. متغيرات البيئة للإنتاج

```env
NODE_ENV=production
DATABASE_URL="your_production_database_url"
ALLOWED_ORIGINS="https://yourdomain.com"
# ... باقي المتغيرات
```

## 🎯 نصائح مهمة

### ✅ أفضل الممارسات

1. **لا تكشف المفاتيح السرية** - احتفظ بها في ملف .env
2. **استخدم HTTPS في الإنتاج** - لحماية البيانات
3. **راجع إعدادات CORS** - لتجنب مشاكل الأمان
4. **اختبر في بيئة التطوير أولاً** - قبل النشر
5. **احتفظ بنسخ احتياطية** - من قاعدة البيانات والملفات

### ⚠️ تحذيرات مهمة

- لا تضع المفاتيح السرية في الكود
- استخدم مفاتيح VIP آمنة ومعقدة
- راجع إعدادات الأمان قبل النشر
- اختبر جميع الخدمات قبل الإطلاق

## 🆘 الحصول على المساعدة

إذا واجهت مشاكل في التخصيص:

1. راجع ملفات الـ logs للأخطاء
2. تأكد من صحة متغيرات البيئة
3. اختبر الاتصال بقاعدة البيانات
4. تحقق من صحة مفاتيح API

---

**إستمتع بتخصيص KNOUX VERSA! 🎉**
