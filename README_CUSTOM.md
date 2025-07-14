# 🚀 KNOUX VERSA - المنصة النهائية للصور بالذكاء الاصطناعي

![KNOUX VERSA](https://img.shields.io/badge/KNOUX-VERSA-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-production%20ready-success?style=for-the-badge)

**KNOUX VERSA** هو تطبيق متطور لمعالجة الصور بالذكاء الاصطناعي، يوفر 22+ خدمة ذكاء اصطناعي متقدمة مع دعم كامل للغة العربية ونظام VIP للمحتوى المتقدم.

## ✨ الميزات الرئيسية

### 🤖 خدمات الذكاء الاصطناعي المتقدمة

- **22+ خدمة AI** شاملة ومتنوعة
- **معالجة فورية** للصور عالية الجودة
- **نماذج AI متعددة**: HuggingFace, OpenAI, Anthropic, Google AI
- **تحويلات متقدمة**: تبديل الوجه، تغيير الخلفية، نقل الأنماط
- **تحسين الصور**: ترقية الدقة، إزالة التشويش، تحسين الألوان

### 🎨 واجهة مستخدم متطورة

- **تصميم عصري** ومتجاوب
- **دعم كامل للعربية** والإنجليزية
- **واجهة بديهية** وسهلة الاستخدام
- **معاينة مباشرة** للنتائج
- **تحميل وتصدير** سريع

### 💎 نظام VIP متقدم

- **3 مستويات VIP**: Gold, Platinum, Diamond
- **محتوى غير مقيد** للمشتركين المميزين
- **أولوية معالجة** وسرعة فائقة
- **ميزات حصرية** ونماذج متقدمة
- **أمان تام** ونظام تشفير متطور

### 🔒 أمان وخصوصية

- **تشفير شامل** للبيانات
- **معالجة محلية** آمنة
- **لا تخزين دائم** للصور الحساسة
- **نظام VIP آمن** مع JWT tokens
- **حماية CORS** متقدمة

## 🛠️ التثبيت السريع

### 1. المتطلبات الأساسية

```bash
# Node.js 18+ مطلوب
node --version  # v18.0.0 أو أحدث

# npm أو yarn
npm --version
```

### 2. استنساخ المشروع

```bash
git clone https://github.com/your-username/knoux-versa.git
cd knoux-versa
```

### 3. تثبيت المتطلبات

```bash
npm install
```

### 4. إعداد متغيرات البيئة

```bash
# نسخ ملف المثال
cp .env.example .env

# تحرير الإعدادات
nano .env
```

### 5. إعداد قاعدة البيانات

```bash
# تشغيل سكريبت الإعداد التفاعلي
npm run setup

# أو يدوياً
npm run db:push
```

### 6. التحقق من الإعدادات

```bash
# فحص شامل للإعدادات
npm run setup-check
```

### 7. تشغيل التطبيق

```bash
# بيئة التطوير
npm run dev

# بيئة الإنتاج
npm run build
npm start
```

## ⚙️ التخصيص الكامل

### 🎨 تخصيص الهوية التجارية

```typescript
// server/config/app-config.ts
export const APP_CONFIG = {
  name: "اسم تطبيقك",
  nameAr: "اسم تطبيقك بالعربية",
  website: "https://موقعك.com",
  branding: {
    primaryColor: "#your-color",
    logo: "/assets/your-logo.png",
  },
};
```

### 🔑 إعداد مفاتيح API

```env
# خدمات الذكاء ��لاصطناعي (اختيارية)
HUGGINGFACE_API_KEY="hf_your_key"      # مجاني
OPENAI_API_KEY="sk-your_key"           # مدفوع
ANTHROPIC_API_KEY="sk-ant-your_key"    # مدفوع
GOOGLE_API_KEY="your_google_key"       # مجاني/مدفوع

# قاعدة البيانات (مطلوب)
DATABASE_URL="postgresql://user:pass@host/db"

# نظام VIP (مطلوب للميزات المتقدمة)
VIP_MASTER_KEY="your_secure_master_key"
VIP_JWT_SECRET="your_jwt_secret"
```

### 💎 تخصيص نظام VIP

```bash
# إنشاء مفتاح VIP آمن
echo "YOUR_CUSTOM_VIP_KEY_2025" > vip.key

# تخصيص مستويات VIP في:
# server/ai/middleware/vipAuth.ts
```

## 📖 أدلة التخصيص

| الدليل                                             | الوصف                |
| -------------------------------------------------- | -------------------- |
| [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) | دليل التخصيص الشامل  |
| [AI_DEPLOYMENT_GUIDE.md](./AI_DEPLOYMENT_GUIDE.md) | نشر خدمات AI         |
| [DATABASE_SETUP.md](./DATABASE_SETUP.md)           | إعداد قاعدة البيانات |

## 🚀 النشر

### 📡 نشر سريع على خادم

```bash
# بناء التطبيق
npm run build

# تشغيل في الإنتاج
NODE_ENV=production npm start
```

### 🐳 نشر باستخدام Docker

```bash
# بناء الصورة
docker build -t knoux-versa .

# تشغيل الحاوية
docker run -p 5000:5000 --env-file .env knoux-versa
```

### ☁️ النشر السحابي

- **Vercel**: مثالي للفرونت إند
- **Railway**: للتطبيق الكامل
- **DigitalOcean**: للخوادم المخصصة
- **AWS/GCP**: للمشاريع الكبيرة

## 🔧 سكريبتات مفيدة

```bash
npm run dev          # تشغيل التطوير
npm run build        # بناء الإنتاج
npm run start        # تشغيل الإنتاج
npm run setup        # إعداد تفاعلي
npm run setup-check  # فحص الإعدادات
npm run customize    # عرض دليل التخصيص
npm run db:push      # تحديث قاعدة البيانات
npm run check        # فحص TypeScript
```

## 🤖 خدمات الذكاء الاصطناعي المدعومة

### 🔄 تحويل الصور

- **Magic Morph**: تحويل سحري متقدم
- **Style Transfer**: نقل الأنماط الفنية
- **Face Swap**: تبديل الوجوه بدقة عالية
- **Age Transform**: آلة الزمن العمرية
- **Gender Swap**: تحويل الجنس (VIP)

### 🎨 تحرير الصور

- **Remove & Replace**: إزالة واستبدال ذكي
- **Background Replace**: استبدال الخلفية
- **Object Recolor**: إعادة تلوين الأشياء
- **Object Remover**: إزالة العناصر بدقة
- **Tattoo Artist**: إضافة الوشم الرقمي

### ✨ تحسين الصور

- **AI Enhance**: تحسين بالذكاء الاصطناعي
- **Super Resolution**: ترقية الدقة
- **Denoiser**: إزالة التشويش
- **Sharpener**: تحسين الحدة
- **Colorizer**: تلوين الصور القديمة

### 🎭 التأثيرات الفنية

- **Cartoonizer**: تحويل لعالم الكرتون
- **Beauty Filter**: فلتر الجمال الذكي
- **Makeup Artist**: فنان المكياج الرقمي
- **Lighting Master**: سيد الإضاءة

## 📊 إحصائيات الأداء

| المتريك        | القيمة         |
| -------------- | -------------- |
| خدمات AI       | 22+ خدمة       |
| سرعة المعالجة  | 5-45 ثانية     |
| دقة النتائج    | 95%+           |
| تنسيقات مدعومة | PNG, JPG, WEBP |
| حد حجم الملف   | 10MB           |
| معالجة متزامنة | 20 طلب         |

## 🔒 الأمان والخصوصية

### 🛡️ حماية البيانات

- تشفير AES-256 للبيانات الحساسة
- HTTPS إجباري في الإنتاج
- عدم تخزين الصور بشكل دائم
- جلسات آمنة مع انتهاء صلاحية

### 🔐 نظام VIP آمن

- JWT tokens مع تشفير قوي
- مفاتيح VIP مخصصة
- صلاحيات متدرجة
- تسجيل شامل للعمليات

## 🌐 دعم اللغات

- **العربية**: دعم كامل مع RTL
- **الإنجليزية**: واجهة باللغة الإنجليزية
- **ثنائي اللغة**: تبديل سلس بين اللغات

## 🆘 الدعم والمساعدة

### 📚 الموارد

- [دليل التخصيص الشامل](./CUSTOMIZATION_GUIDE.md)
- [أسئلة شائعة](./FAQ.md)
- [استكشاف الأخطاء](./TROUBLESHOOTING.md)

### 💬 التواصل

- **البريد الإلكتروني**: support@knoux-versa.com
- **Discord**: [خادم المطورين](https://discord.gg/knoux)
- **GitHub Issues**: [المشاكل والطلبات](https://github.com/your-repo/issues)

## 🤝 المساهمة

نرحب بالمساهمات! راجع [دليل المساهمة](./CONTRIBUTING.md) للبدء.

### 🚀 طرق المساهمة

- تطوير ميزات جديدة
- إصلاح الأخطاء
- تحسين الأداء
- كتابة الوثائق
- ترجمة لغات جديدة

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](./LICENSE) للتفاصيل.

## 🏆 الاعتمادات

### 🛠️ التقنيات المستخدمة

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (Neon)
- **AI Services**: HuggingFace, OpenAI, Anthropic
- **Authentication**: JWT, bcrypt
- **Deployment**: Docker, Vite

### 👥 الفريق

- **التطوير**: KNOUX Technologies
- **التصميم**: فريق UX/UI المتخصص
- **الذكاء الاصطناعي**: خبراء ML/AI

---

<div align="center">

**صُنع بـ ❤️ في العالم العربي**

[الموقع الرسمي](https://knoux-versa.com) • [التوثيق](./docs/) • [الدعم](mailto:support@knoux-versa.com)

![Footer](https://img.shields.io/badge/KNOUX-VERSA%202025-blue?style=for-the-badge&logo=react)

</div>
