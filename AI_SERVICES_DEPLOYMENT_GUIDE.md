# KNOUX VERSA - دليل تشغيل خدمات الذكاء الاصطناعي الشامل

## نظرة عامة

هذا الدليل يوضح كيفية تشغيل وإدارة جميع خدمات الذكاء الاصطناعي في نظام KNOUX VERSA المتكامل.

## 🔥 الخدمات المتاحة (30+ خدمة)

### 🎭 خدمات تعديل الوجه (Face Processing)

- **Face Swap**: تبديل الوجوه المتقدم باستخدام DeepFaceLab
- **Beauty Filter**: فلتر الجمال الذكي مع Phi3-Vision
- **Expression Changer**: تغيير تعبيرات الوجه
- **Age Transform**: تحويل العمر واقعياً
- **Gender Swap**: تحويل الجنس (VIP)
- **Makeup Artist**: فنان المك��اج الرقمي
- **Hair Transformer**: تحويل الشعر والتسريحات
- **Eye Enhancer**: تحسين العيون وتغيير الألوان

### 💪 خدمات تعديل الجسم (Body Modification)

- **Body Sculptor**: نحت الجسم الذكي (VIP)
- **Clothing Swap**: تغيير الملابس الافتراضي (VIP)
- **Tattoo Studio**: استوديو الوشم الرقمي
- **Muscle Enhancer**: تحسين العضلات
- **Pose Master**: تعديل وضعيات الجسم
- **Virtual Wardrobe**: خزانة الملابس الافتراضية

### 🌟 خدمات الخلفية والبيئة (Background & Environment)

- **Background Remover**: إزالة الخلفية السحرية
- **Background Replacer**: استبدال الخلفيات
- **Lighting Master**: سيد الإضاءة
- **World Changer**: تغيير العوالم
- **Weather Master**: تأثيرات الطقس
- **Scene Compositor**: تركيب المشاهد

### 🎨 خدمات التحويل الفني (Artistic Transformation)

- **Style Transfer**: تحويل الأساليب الفنية
- **Cartoon Transformer**: محول الكرتون
- **Photo Colorizer**: تلوين الصور القديمة
- **Abstract Art Creator**: منشئ الفن المجرد

### 🔧 خدمات التحسين التقني (Technical Enhancement)

- **Super Resolution**: تحسين الدقة 4K/8K
- **Face Restorer**: إصلاح الوجوه التالفة
- **Noise Remover**: إزالة الضوضاء المتقدمة
- **Smart Cropper**: القص الذكي
- **Red Eye Fixer**: مصحح العيون الحمراء

### 🎯 خدمات معالجة العناصر (Object Manipulation)

- **Object Eraser**: ممحاة العناصر الذكية
- **Color Wizard**: ساحر الألوان
- **Object Creator**: منشئ العناصر بالنص

### 🎪 خدمات إبداعية (Creative & Advanced)

- **Photo Blender**: مزج الصور الذكي
- **3D Depth Creator**: منشئ العمق ثلاثي الأبعاد
- **Interactive Filters**: الفلاتر التفاعلية

### 👑 خدمات VIP الحصرية

- **VIP Magic Morph**: التحويل السحري اللامحدود
- **Uncensored Suite**: مجموعة بلا قيود كاملة
- **Sadek Signature Exclusive**: الحصري لصادق الجزار

## 🚀 متطلبات النظام

### الحد الأدنى

- **المعالج**: Intel i7-8700K أو AMD Ryzen 7 2700X
- **الذاكرة**: 16GB RAM
- **كرت الرسومات**: NVIDIA GTX 1080 (8GB VRAM)
- **التخزين**: 100GB مساحة فارغة
- **نظام التشغي��**: Ubuntu 20.04+ أو Windows 10/11 مع WSL2

### الموصى به للـ VIP

- **المعالج**: Intel i9-12900K أو AMD Ryzen 9 5900X
- **الذاكرة**: 32GB RAM
- **كرت الرسومات**: NVIDIA RTX 4090 (24GB VRAM)
- **التخزين**: 500GB NVMe SSD
- **شبكة**: 1Gbps للتحميل المتقدم

### للاستخدام الاحترافي (صادق الجزار)

- **المعالج**: Intel Xeon أو AMD Threadripper
- **الذاكرة**: 64GB+ RAM
- **كروت الرسومات**: 2x NVIDIA RTX 4090 أو A100
- **التخزين**: 1TB+ NVMe SSD
- **شبكة**: 10Gbps

## 📦 التثبيت والإعداد

### 1. تثبيت المتطلبات الأساسية

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose nvidia-docker2

# تفعيل Docker
sudo systemctl enable docker
sudo systemctl start docker

# إضافة المستخدم لمجموعة docker
sudo usermod -aG docker $USER
```

### 2. تحضير البيئة

```bash
# إنشاء مجلدات العمل
mkdir -p knoux-versa/{ai-models,temp,logs,nginx,database}
cd knoux-versa

# تحميل نماذج الذكاء الاصطناعي
# (سيتم تحميلها تلقائياً عند التشغيل الأول)
```

### 3. إعداد متغيرات البيئة

```bash
# إنشاء ملف .env
cat > .env << EOF
# KNOUX VERSA AI Services Configuration

# Database
POSTGRES_DB=knoux_versa
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password_here

# Redis
REDIS_URL=redis://redis:6379

# GPU Configuration
NVIDIA_VISIBLE_DEVICES=all
CUDA_VISIBLE_DEVICES=0,1

# VIP Configuration
VIP_PROCESSING_ENABLED=true
SADEK_EXCLUSIVE_MODE=true

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here

# Monitoring
HEALTH_CHECK_INTERVAL=30
LOG_LEVEL=info
EOF
```

### 4. تشغيل النظام

```bash
# تشغيل جميع الخدمات
docker-compose -f docker-compose.ai-services.yml up -d

# مراقبة حالة الخدمات
docker-compose -f docker-compose.ai-services.yml ps

# عرض سجلات الخدمات
docker-compose -f docker-compose.ai-services.yml logs -f
```

## 🔧 إدارة الخدمات

### مراقبة الحالة

```bash
# حالة جميع الخدمات
curl http://localhost/health/

# حالة خدمة محددة
curl http://localhost/health/face-swap-service

# إحصائيات الأداء
curl http://localhost/health/stats
```

### إدارة الـ VIP Keys

```bash
# إضافة مفتاح VIP جديد
docker exec knoux-postgres psql -U postgres -d knoux_versa -c \
"INSERT INTO vip_keys (key_value, vip_tier) VALUES ('YOUR_NEW_KEY', 'diamond');"

# فحص مفاتيح VIP
docker exec knoux-postgres psql -U postgres -d knoux_versa -c \
"SELECT * FROM vip_keys WHERE is_active = true;"
```

### تحديث النماذج

```bash
# تحديث نموذج محدد
docker-compose -f docker-compose.ai-services.yml pull face-swap-service
docker-compose -f docker-compose.ai-services.yml up -d face-swap-service

# تحديث جميع النماذج
docker-compose -f docker-compose.ai-services.yml pull
docker-compose -f docker-compose.ai-services.yml up -d
```

## 🎮 استخدام الخدمات

### 1. معالجة أساسية

```bash
# إزالة خلفية
curl -X POST "http://localhost/api/background/remove" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@your_image.jpg"

# تحسين الدقة
curl -X POST "http://localhost/api/enhance/super-resolution" \
  -H "Content-Type: multipart/form-data" \
  -F "image=@your_image.jpg" \
  -F "upscale_factor=4"
```

### 2. معالجة VIP

```bash
# تحويل متقدم بـ VIP
curl -X POST "http://localhost/api/vip/magic-morph" \
  -H "Content-Type: application/json" \
  -H "X-VIP-Key: KNOUX_VIP_DIAMOND_2025" \
  -d '{
    "image_base64": "...",
    "commands": [
      {
        "id": "cmd1",
        "command": "make her look like a goddess",
        "intensity": 80,
        "area": "face"
      }
    ],
    "settings": {
      "qualityMode": "ultra",
      "preserveIdentity": true,
      "creativeFreedom": true
    }
  }'
```

### 3. خدمة صادق الحصرية

```bash
# الوصول للميزات الحصرية
curl -X POST "http://localhost/api/vip/sadek-exclusive" \
  -H "Content-Type: application/json" \
  -H "X-VIP-Key: SADEK_ELGAZAR_MASTER_KEY" \
  -d '{
    "image_base64": "...",
    "service_type": "sadek_signature",
    "commands": [...],
    "advanced_settings": {
      "sadekSignature": true,
      "commercialUsage": true,
      "experimentalFeatures": true
    }
  }'
```

## 📊 مراقبة الأداء

### Dashboard الرئيسي

- **URL**: http://localhost:8080/dashboard
- **Username**: admin
- **Password**: (من متغيرات البيئة)

### المقاييس المتاحة

- استخدام الـ GPU لكل خدمة
- أوقات المعالجة
- طوابير الانتظار
- معدلات النجاح
- استخدام الذاكرة

### تنبيهات تلقائية

- تحذير عند استخدام GPU أكثر من 90%
- تحذير عند امتلا�� طوابير الانتظار
- تحذير عند فشل الخدمات

## 🔒 الأمان والخصوصية

### التشفير

- جميع البيانات مُشفرة أثناء النقل (HTTPS/TLS)
- تشفير الصور المُخزنة مؤقتاً
- مفاتيح VIP مُشفرة في قاعدة البيانات

### إدارة الوصول

- نظام مفاتيح VIP متدرج
- حدود زمنية للمعالجة
- تسجيل جميع العمليات

### حماية البيانات

- حذف تلقائي للملفات المؤقتة
- عدم تخزين بيانات المستخدمين
- امتثال لقوانين الخصوصية

## 🔨 استكشاف الأخطاء

### مشاكل شائعة

#### خدمة لا تستجيب

```bash
# فحص حالة الخدمة
docker logs knoux-face-swap

# إعادة تشغيل الخدمة
docker-compose -f docker-compose.ai-services.yml restart face-swap-service
```

#### نفاد ذاكرة GPU

```bash
# فحص استخدام GPU
nvidia-smi

# تقليل العمليات المتزامنة في docker-compose.yml
# environment:
#   - MAX_CONCURRENT_REQUESTS=1
```

#### بطء المعالجة

```bash
# فحص حمولة النظام
htop

# تحسين إعدادات Docker
# deploy:
#   resources:
#     limits:
#       memory: 8G
```

## 📈 التحسين والتوسع

### للأداء العالي

- استخدام عدة كروت رسومات
- تحسين إعدادات Docker
- استخدام SSD سريع

### للإنتاج

- Load Balancer متقدم
- قاعدة بيانات مُوزعة
- نسخ احتياطية تلقائية

### للمؤسسات

- Kubernetes deployment
- مراقبة متقدمة
- تكامل مع أنظمة التشغيل

## 🔄 النسخ الاحتياطي والاستعادة

### نسخ احتياطي يومي

```bash
# نسخ قاعدة البيانات
docker exec knoux-postgres pg_dump -U postgres knoux_versa > backup_$(date +%Y%m%d).sql

# نسخ ملفات النماذج
tar -czf models_backup_$(date +%Y%m%d).tar.gz ai-models/
```

### الاستعادة

```bash
# استعادة قاعدة البيانات
docker exec -i knoux-postgres psql -U postgres knoux_versa < backup_20250120.sql

# استعادة النماذج
tar -xzf models_backup_20250120.tar.gz
```

## 📞 الدعم التقني

### المستويات

- **Free**: دعم المجتمع
- **VIP Gold**: دعم بريد إلكتروني
- **VIP Platinum**: دعم هاتفي
- **VIP Diamond**: دعم مباشر
- **Sadek Exclusive**: دعم شخصي

### التواصل

- **Email**: support@knoux-versa.com
- **Discord**: https://discord.gg/knoux-versa
- **GitHub**: https://github.com/sadek-elgazar/knoux-versa

---

## 🎉 تم إكمال النظام بنجاح!

جميع خدمات الذكاء الاصطناعي جاهزة للاستخدام مع:

- ✅ 30+ أداة ذكاء اصطناعي متقدمة
- ✅ 50+ قالب فني احترافي
- ✅ نظام VIP متكامل مع 4 مستويات
- ✅ خدمات حصرية لصادق الجزار
- ✅ مراقبة وتحليلات شاملة
- ✅ أمان وخصوصية متقدمة
- ✅ تكوين Docker كامل
- ✅ قاعدة بيانات محسنة

**مرحباً بك في عالم KNOUX VERSA - حيث يلتقي الخيال بالذكاء الاصطناعي! 🔥**
