#!/usr/bin/env node

/**
 * KNOUX VERSA - Model Installation Script
 * تحميل وتثبيت جميع نماذج الذكاء الاصطناعي المطلوبة
 */

import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import fetch from 'node-fetch';

const MODELS_DIR = join(process.cwd(), 'models');

// قائمة النماذج المطلوبة مع روابط التحميل
const REQUIRED_MODELS = [
  {
    id: 'gfpgan',
    name: 'GFPGAN Face Enhancement',
    url: 'https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth',
    size: '348MB',
    essential: true
  },
  {
    id: 'codeformer', 
    name: 'CodeFormer Face Restoration',
    url: 'https://github.com/sczhou/CodeFormer/releases/download/v0.1.0/codeformer.pth',
    size: '512MB',
    essential: true
  },
  {
    id: 'real_esrgan',
    name: 'Real-ESRGAN Upscaler',
    url: 'https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth',
    size: '64MB',
    essential: true
  },
  {
    id: 'yolov5',
    name: 'YOLOv5 Object Detection',
    url: 'https://github.com/ultralytics/yolov5/releases/download/v7.0/yolov5s.pt',
    size: '86MB',
    essential: true
  },
  {
    id: 'u2net',
    name: 'U-2-Net Background Removal',
    url: 'https://github.com/xuebinqin/U-2-Net/raw/master/saved_models/u2net/u2net.pth',
    size: '176MB', 
    essential: true
  }
];

async function ensureModelsDirectory() {
  if (!existsSync(MODELS_DIR)) {
    mkdirSync(MODELS_DIR, { recursive: true });
    console.log('✅ تم إنشاء مجلد النماذج');
  }
}

async function downloadModel(model) {
  const modelPath = join(MODELS_DIR, `${model.id}.pth`);
  
  if (existsSync(modelPath)) {
    console.log(`⏭️  ${model.name} موجود بالفعل`);
    return true;
  }

  console.log(`📥 تحميل ${model.name} (${model.size})...`);
  
  try {
    const response = await fetch(model.url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    await pipeline(response.body, createWriteStream(modelPath));
    console.log(`✅ تم تحميل ${model.name} بنجاح`);
    return true;
  } catch (error) {
    console.error(`❌ فشل تحميل ${model.name}:`, error.message);
    return false;
  }
}

async function installAllModels() {
  console.log('🚀 بدء تحميل نماذج KNOUX VERSA AI...\n');
  
  await ensureModelsDirectory();
  
  const results = [];
  for (const model of REQUIRED_MODELS) {
    const success = await downloadModel(model);
    results.push({ ...model, success });
  }
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log(`\n📊 تم تحميل ${successful}/${total} نماذج بنجاح`);
  
  if (successful === total) {
    console.log('🎉 جميع النماذج الأساسية جاهزة! يمكن تشغيل النظام الآن');
  } else {
    console.log('⚠️  بعض النماذج لم يتم تحميلها. الرجاء التحقق من الاتصال بالإنترنت');
  }
}

// تشغيل السكريبت
if (import.meta.url === `file://${process.argv[1]}`) {
  installAllModels().catch(console.error);
}

export { installAllModels, REQUIRED_MODELS };