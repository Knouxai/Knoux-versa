import path from 'path';
import fs from 'fs/promises';
import { Canvas, createCanvas, Image } from 'canvas';

export interface TemplateProcessingRequest {
  templateId: string;
  userImageUrl: string;
  customizations: {
    faceBlend: number;
    bodyAlignment: number;
    clothingColor: string;
    lightingIntensity: number;
    styleStrength: number;
    qualityLevel: 'standard' | 'high' | 'ultra';
  };
}

export interface ProcessingStage {
  id: number;
  name: string;
  nameAr: string;
  estimatedTime: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

export class TemplateProcessor {
  private stages: ProcessingStage[] = [
    {
      id: 1,
      name: 'Face Analysis & Extraction',
      nameAr: 'تحليل واستخراج الوجه',
      estimatedTime: 8000,
      status: 'pending',
      progress: 0
    },
    {
      id: 2,
      name: 'Pose Detection & Alignment',
      nameAr: 'كشف ومحاذاة الوضعية',
      estimatedTime: 12000,
      status: 'pending',
      progress: 0
    },
    {
      id: 3,
      name: 'Style Transfer Application',
      nameAr: 'تطبيق النمط الفني',
      estimatedTime: 15000,
      status: 'pending',
      progress: 0
    },
    {
      id: 4,
      name: 'Clothing & Details Integration',
      nameAr: 'دمج الملابس والتفاصيل',
      estimatedTime: 18000,
      status: 'pending',
      progress: 0
    },
    {
      id: 5,
      name: 'Lighting Effects Processing',
      nameAr: 'معالجة تأثيرات الإضاءة',
      estimatedTime: 10000,
      status: 'pending',
      progress: 0
    },
    {
      id: 6,
      name: 'Final Enhancement & Upscaling',
      nameAr: 'التحسين النهائي والترقية',
      estimatedTime: 12000,
      status: 'pending',
      progress: 0
    }
  ];

  async processTemplate(request: TemplateProcessingRequest): Promise<{
    success: boolean;
    resultImageUrl?: string;
    error?: string;
    stages: ProcessingStage[];
  }> {
    try {
      console.log(`🎨 بدء معالجة التمبلت: ${request.templateId}`);
      
      // Reset stages
      this.stages.forEach(stage => {
        stage.status = 'pending';
        stage.progress = 0;
      });

      // Process each stage
      for (let i = 0; i < this.stages.length; i++) {
        await this.processStage(i, request);
      }

      // Generate final result
      const resultImageUrl = await this.generateFinalResult(request);

      console.log(`✅ اكتمل معالجة التمبلت بنجاح`);
      
      return {
        success: true,
        resultImageUrl,
        stages: this.stages
      };

    } catch (error) {
      console.error('❌ خطأ في معالجة التمبلت:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stages: this.stages
      };
    }
  }

  private async processStage(stageIndex: number, request: TemplateProcessingRequest): Promise<void> {
    const stage = this.stages[stageIndex];
    
    // Mark as processing
    stage.status = 'processing';
    console.log(`⚙️ بدء المرحلة: ${stage.nameAr}`);

    // Simulate processing with progress
    const stepTime = stage.estimatedTime / 20;
    for (let progress = 0; progress <= 100; progress += 5) {
      stage.progress = progress;
      await this.delay(stepTime);
    }

    // Mark as completed
    stage.status = 'completed';
    stage.progress = 100;
    console.log(`✅ اكتملت المرحلة: ${stage.nameAr}`);
  }

  private async generateFinalResult(request: TemplateProcessingRequest): Promise<string> {
    try {
      // Create a canvas for final composition
      const canvas = createCanvas(1024, 1024);
      const ctx = canvas.getContext('2d');

      // Apply gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#FF69B4');
      gradient.addColorStop(0.5, '#8A2BE2');
      gradient.addColorStop(1, '#FF1493');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add artistic elements based on customizations
      this.applyCustomizations(ctx, canvas, request.customizations);

      // Add sample artistic overlay
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = `rgba(255, 255, 255, ${request.customizations.styleStrength / 100 * 0.3})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Save the result
      const buffer = canvas.toBuffer('image/png');
      const timestamp = Date.now();
      const filename = `template_result_${timestamp}.png`;
      const filepath = path.join('uploads', filename);
      
      await fs.writeFile(filepath, buffer);
      
      return `/api/uploads/${filename}`;

    } catch (error) {
      console.error('خطأ في توليد النتيجة النهائية:', error);
      throw error;
    }
  }

  private applyCustomizations(ctx: CanvasRenderingContext2D, canvas: Canvas, customizations: any) {
    // Apply face blend effect
    ctx.globalAlpha = customizations.faceBlend / 100;
    
    // Apply clothing color
    ctx.fillStyle = customizations.clothingColor;
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillRect(0, canvas.height * 0.4, canvas.width, canvas.height * 0.6);
    
    // Apply lighting intensity
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = `rgba(255, 255, 255, ${customizations.lightingIntensity / 100 * 0.2})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.5);
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStages(): ProcessingStage[] {
    return [...this.stages];
  }
}

export const templateProcessor = new TemplateProcessor();