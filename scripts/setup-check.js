#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");

console.log("🔍 KNOUX VERSA - فحص الإعدادات والتخصيص\n");

// فحص متغيرات البيئة
function checkEnvironmentVariables() {
  console.log("📋 فحص متغيرات البيئة...");

  const envPath = path.join(projectRoot, ".env");
  const envExamplePath = path.join(projectRoot, ".env.example");

  if (!fs.existsSync(envPath)) {
    console.log("⚠️  ملف .env غير موجود!");
    if (fs.existsSync(envExamplePath)) {
      console.log("💡 نصيحة: انسخ .env.example إلى .env وقم بتعديل القيم");
      console.log("   cp .env.example .env");
    }
    return false;
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const requiredVars = ["DATABASE_URL", "VIP_MASTER_KEY", "VIP_JWT_SECRET"];

  const optionalVars = [
    "HUGGINGFACE_API_KEY",
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GOOGLE_API_KEY",
  ];

  let missingRequired = [];
  let missingOptional = [];

  for (const varName of requiredVars) {
    if (
      !envContent.includes(`${varName}=`) ||
      envContent.includes(`${varName}=""`)
    ) {
      missingRequired.push(varName);
    }
  }

  for (const varName of optionalVars) {
    if (
      !envContent.includes(`${varName}=`) ||
      envContent.includes(`${varName}=""`)
    ) {
      missingOptional.push(varName);
    }
  }

  if (missingRequired.length > 0) {
    console.log(`❌ متغيرات مطلوبة مفقودة: ${missingRequired.join(", ")}`);
    return false;
  }

  console.log("✅ جميع المتغيرات المطلوبة موجودة");

  if (missingOptional.length > 0) {
    console.log(`⚠️  متغيرات اختيارية مفقودة: ${missingOptional.join(", ")}`);
    console.log("   (بعض خدمات الذكاء الاصطناعي قد لا تعمل)");
  } else {
    console.log("✅ جميع مفاتيح API موجودة");
  }

  return true;
}

// فحص قاعدة البيانات
function checkDatabase() {
  console.log("\n💾 فحص إعدادات قاعدة البيانات...");

  const envPath = path.join(projectRoot, ".env");
  if (!fs.existsSync(envPath)) {
    console.log("❌ لا يمكن فحص قاعدة البيانات - ملف .env مفقود");
    return false;
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const dbUrlMatch = envContent.match(/DATABASE_URL="(.+)"/);

  if (!dbUrlMatch) {
    console.log("❌ DATABASE_URL غير مُعرف");
    return false;
  }

  const dbUrl = dbUrlMatch[1];

  if (dbUrl.includes("placeholder") || dbUrl.includes("example")) {
    console.log("❌ DATABASE_URL يحتوي على قيم placeholder");
    console.log("💡 احصل على رابط قاعدة البيانات من: https://neon.tech");
    return false;
  }

  if (!dbUrl.startsWith("postgresql://")) {
    console.log("❌ DATABASE_URL غير صحيح - يجب أن يبدأ بـ postgresql://");
    return false;
  }

  console.log("✅ إعدادات قاعدة البيانات تبدو صحيحة");
  return true;
}

// فحص مفاتيح VIP
function checkVIPKeys() {
  console.log("\n💎 فحص إعدادات VIP...");

  const vipKeyPath = path.join(projectRoot, "vip.key");

  if (!fs.existsSync(vipKeyPath)) {
    console.log("⚠️  ملف vip.key غير موجود");
    console.log("💡 سيتم استخدام VIP_MASTER_KEY من .env");
  } else {
    const vipKey = fs.readFileSync(vipKeyPath, "utf8").trim();
    if (vipKey === "SADEK_ELGAZAR_VIP_2025") {
      console.log("⚠️  يتم استخدام مفتاح VIP افتراضي!");
      console.log("🔒 نصيحة: قم بتغيير مفتاح VIP لمفتاح مخصص وآمن");
    } else {
      console.log("✅ مفتاح VIP مخصص");
    }
  }

  // فحص JWT Secret
  const envPath = path.join(projectRoot, ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    if (envContent.includes('VIP_JWT_SECRET="knoux_vip_ultra_secret_2025"')) {
      console.log("⚠️  يتم استخدام JWT Secret افتراضي!");
      console.log("🔒 نصيحة: قم بتغيير VIP_JWT_SECRET لقيمة آمنة");
    } else {
      console.log("✅ JWT Secret مخصص");
    }
  }

  return true;
}

// فحص الملفات المخصصة
function checkCustomization() {
  console.log("\n🎨 فحص ملفات التخصيص...");

  const customFiles = [
    "server/config/security.ts",
    "server/config/app-config.ts",
    "client/src/config/ui-config.ts",
    "client/src/config/custom-templates.ts",
  ];

  let allPresent = true;

  for (const file of customFiles) {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} مفقود`);
      allPresent = false;
    }
  }

  if (allPresent) {
    console.log("✅ جميع ملفات التخصيص موجودة");
  }

  return allPresent;
}

// فحص Build files
function checkBuildFiles() {
  console.log("\n🏗️  فحص ملفات البناء...");

  const distPath = path.join(projectRoot, "dist");
  const packagePath = path.join(projectRoot, "package.json");

  if (!fs.existsSync(packagePath)) {
    console.log("❌ ملف package.json مفقود");
    return false;
  }

  if (!fs.existsSync(distPath)) {
    console.log("⚠️  مجلد dist غير موجود");
    console.log("💡 تشغيل: npm run build");
    return false;
  }

  const indexPath = path.join(distPath, "index.js");
  if (!fs.existsSync(indexPath)) {
    console.log("❌ ملف dist/index.js مفقود");
    console.log("💡 ت��غيل: npm run build");
    return false;
  }

  console.log("✅ ملفات البناء موجودة");
  return true;
}

// عرض ملخص النصائح
function showRecommendations() {
  console.log("\n💡 نصائح للتخصيص الأمثل:");
  console.log("");
  console.log("1. 🔒 الأمان:");
  console.log("   • استخدم مفاتيح VIP فريدة ومعقدة");
  console.log("   • لا تشارك مفاتيح API مع أحد");
  console.log("   • فعل HTTPS في بيئة الإنتاج");
  console.log("");
  console.log("2. 🎨 التخصيص:");
  console.log("   • غير الألوان في client/src/config/ui-config.ts");
  console.log("   • أضف شعارك في assets/");
  console.log("   • خصص الرسائل والترجمات");
  console.log("");
  console.log("3. 🤖 خدمات AI:");
  console.log("   • HuggingFace: مجاني وسهل");
  console.log("   • OpenAI: جودة عالية (مدفوع)");
  console.log("   • يمكن العمل بدون جميع المفاتيح");
  console.log("");
  console.log("4. 📊 قاعدة البيانات:");
  console.log("   • استخدم Neon للحصول على قاعدة بيانات مجانية");
  console.log("   • احتفظ بنسخ احتياطية منتظمة");
  console.log("");
  console.log("📖 راجع CUSTOMIZATION_GUIDE.md للتفاصيل الكاملة");
}

// عرض خطوات النشر
function showDeploymentSteps() {
  console.log("\n🚀 خطوات النشر:");
  console.log("");
  console.log("1. تأكد من جميع الإعدادات:");
  console.log("   npm run setup-check");
  console.log("");
  console.log("2. اختبار التطبيق محلياً:");
  console.log("   npm run dev");
  console.log("");
  console.log("3. بناء للإنتاج:");
  console.log("   npm run build");
  console.log("");
  console.log("4. تشغيل في بيئة الإنتاج:");
  console.log("   NODE_ENV=production npm start");
  console.log("");
}

// التشغيل الرئيسي
async function main() {
  let allChecksPass = true;

  try {
    // فحص جميع الجوانب
    allChecksPass &= checkEnvironmentVariables();
    allChecksPass &= checkDatabase();
    allChecksPass &= checkVIPKeys();
    allChecksPass &= checkCustomization();
    allChecksPass &= checkBuildFiles();

    console.log("\n" + "=".repeat(50));

    if (allChecksPass) {
      console.log("🎉 تهانينا! جميع الفحوصات تمت بنجاح");
      console.log("✅ التطبيق جاهز للاستخدام والنشر");
      showDeploymentSteps();
    } else {
      console.log("⚠️  بعض الإعدادات تحتاج مراجعة");
      console.log("💡 راجع الرسائل أعلاه لإصلاح المشاكل");
    }

    showRecommendations();
  } catch (error) {
    console.error("❌ خطأ في فحص الإعدادات:", error.message);
    process.exit(1);
  }
}

// تشغيل السكريبت
main();
