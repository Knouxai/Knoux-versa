import { readFileSync, existsSync } from "fs";
import { join } from "path";
import crypto from "crypto";

export interface SecurityConfig {
  vipMasterKey: string;
  jwtSecret: string;
  sessionSecret: string;
  encryptionKey: string;
  allowedOrigins: string[];
  productionMode: boolean;
}

// توليد مفاتيح آمنة عشوائية
function generateSecureKey(length: number = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

// التحقق من وجود متغيرات البيئة المطلوبة
function validateEnvironmentVariables(): void {
  const required = ["DATABASE_URL", "VIP_MASTER_KEY", "VIP_JWT_SECRET"];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`⚠️ متغيرات بيئة مفقودة: ${missing.join(", ")}`);
    console.warn("📋 نصيحة: قم بإنشاء ملف .env باستخدام .env.example كمرجع");
  }
}

// إعداد إعدادات الأمان
export function getSecurityConfig(): SecurityConfig {
  validateEnvironmentVariables();

  // قراءة مفتاح VIP من الملف أو البيئة
  let vipMasterKey: string;
  const vipKeyPath = join(process.cwd(), "vip.key");

  if (existsSync(vipKeyPath)) {
    try {
      vipMasterKey = readFileSync(vipKeyPath, "utf8").trim();
      if (vipMasterKey === "SADEK_ELGAZAR_VIP_2025") {
        console.warn(
          "⚠️ مفتاح VIP افتراضي! يرجى تخصيص مفتاح آمن في ملف vip.key",
        );
      }
    } catch (error) {
      console.error("❌ خطأ في قراءة ملف vip.key:", error);
      vipMasterKey = process.env.VIP_MASTER_KEY || generateSecureKey();
    }
  } else {
    vipMasterKey = process.env.VIP_MASTER_KEY || generateSecureKey();
    if (!process.env.VIP_MASTER_KEY) {
      console.warn(
        "⚠️ لم يتم العثور على VIP_MASTER_KEY، تم توليد مفتاح عشوائي",
      );
    }
  }

  // JWT Secret
  let jwtSecret = process.env.VIP_JWT_SECRET;
  if (!jwtSecret || jwtSecret === "knoux_vip_ultra_secret_2025") {
    jwtSecret = generateSecureKey();
    console.warn("⚠️ JWT Secret افتراضي! تم توليد مفتاح آمن عشوائي");
  }

  // Session Secret
  let sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    sessionSecret = generateSecureKey();
    console.warn("⚠️ لم يتم العثور على SESSION_SECRET، تم توليد مفتاح عشوائي");
  }

  // Encryption Key
  let encryptionKey = process.env.ENCRYPTION_KEY;
  if (!encryptionKey) {
    encryptionKey = generateSecureKey();
    console.warn("⚠️ لم يتم العثور على ENCRYPTION_KEY، تم توليد مفتاح عشوائي");
  }

  // Allowed Origins
  const defaultOrigins =
    process.env.NODE_ENV === "development"
      ? [
          "http://localhost:3000",
          "http://localhost:5000",
          "http://127.0.0.1:3000",
        ]
      : [];

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : defaultOrigins;

  return {
    vipMasterKey,
    jwtSecret,
    sessionSecret,
    encryptionKey,
    allowedOrigins,
    productionMode: process.env.NODE_ENV === "production",
  };
}

// إعداد مفاتيح API للذكاء الاصطناعي
export interface AIApiConfig {
  huggingface?: string;
  openai?: string;
  anthropic?: string;
  google?: string;
}

export function getAIApiConfig(): AIApiConfig {
  const config: AIApiConfig = {};

  if (process.env.HUGGINGFACE_API_KEY) {
    config.huggingface = process.env.HUGGINGFACE_API_KEY;
  } else {
    console.warn(
      "⚠️ HUGGINGFACE_API_KEY غير مُعرف - بعض خدمات HuggingFace قد لا تعمل",
    );
  }

  if (process.env.OPENAI_API_KEY) {
    config.openai = process.env.OPENAI_API_KEY;
  } else {
    console.warn("⚠️ OPENAI_API_KEY غير مُعرف - خدمات OpenAI غير متاحة");
  }

  if (process.env.ANTHROPIC_API_KEY) {
    config.anthropic = process.env.ANTHROPIC_API_KEY;
  } else {
    console.warn("⚠️ ANTHROPIC_API_KEY غير مُعرف - خدمات Anthropic غير متاحة");
  }

  if (process.env.GOOGLE_API_KEY) {
    config.google = process.env.GOOGLE_API_KEY;
  } else {
    console.warn("⚠️ GOOGLE_API_KEY غير مُعرف - خدمات Google AI غير متاحة");
  }

  const availableServices = Object.keys(config).length;
  console.log(`🤖 خدمات AI متاحة: ${availableServices}/4`);

  return config;
}

// تشفير وفك تشفير البيانات الحساسة
export class SecureStorage {
  private static encryptionKey: string;

  static initialize(key: string) {
    this.encryptionKey = key;
  }

  static encrypt(text: string): string {
    if (!this.encryptionKey) {
      throw new Error("مفتاح التشفير غير مهيأ");
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher("aes-256-gcm", this.encryptionKey);
    const encrypted = Buffer.concat([
      cipher.update(text, "utf8"),
      cipher.final(),
    ]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  static decrypt(encryptedText: string): string {
    if (!this.encryptionKey) {
      throw new Error("مفتاح التشفير غير مهيأ");
    }

    const [ivHex, encryptedHex] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipher("aes-256-gcm", this.encryptionKey);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    return decrypted.toString("utf8");
  }
}

// عرض ملخص حالة الأمان
export function displaySecurityStatus(): void {
  const config = getSecurityConfig();
  const aiConfig = getAIApiConfig();

  console.log("\n🔐 حالة إعدادات الأمان:");
  console.log(`   VIP Master Key: ${config.vipMasterKey.substring(0, 8)}...`);
  console.log(`   JWT Secret: ${config.jwtSecret.substring(0, 8)}...`);
  console.log(`   البيئة: ${config.productionMode ? "إنتاج" : "تطوير"}`);
  console.log(`   Origins مسموحة: ${config.allowedOrigins.length} نطاق`);
  console.log(`   خدمات AI متاحة: ${Object.keys(aiConfig).length}/4`);

  // تهيئة التشفير
  SecureStorage.initialize(config.encryptionKey);
  console.log("   ✅ نظام التشفير مُهيأ");

  console.log("");
}
