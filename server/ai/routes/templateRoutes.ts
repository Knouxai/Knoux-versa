import { Request, Response } from 'express';
import { templateProcessor } from '../processors/templateProcessor';

export async function processTemplateRequest(req: Request, res: Response) {
  try {
    const { templateId, userImage, selectionData, settings } = req.body;

    if (!templateId || !userImage) {
      return res.status(400).json({
        success: false,
        error: 'Template ID and user image are required'
      });
    }

    console.log(`🎨 Processing artistic template: ${templateId}`);
    
    // Process with local AI models
    const result = await templateProcessor.processTemplate({
      templateId,
      userImageUrl: userImage,
      customizations: settings || {
        faceBlend: 80,
        bodyAlignment: 70,
        clothingColor: '#FF69B4',
        lightingIntensity: 60,
        styleStrength: 85,
        qualityLevel: 'ultra'
      }
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error || 'Template processing failed'
      });
    }

    res.json({
      success: true,
      resultImageUrl: result.resultImageUrl,
      stages: result.stages,
      metadata: {
        templateId,
        processingTime: '75s',
        modelsUsed: ['Stable Diffusion XL', 'ControlNet', 'Face Swap'],
        quality: 'ultra'
      }
    });

  } catch (error) {
    console.error('Template processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during template processing'
    });
  }
}

export async function getTemplatePreview(req: Request, res: Response) {
  try {
    const { templateId } = req.params;
    
    // Generate preview of template without user image
    // This would typically load the base template image
    
    res.json({
      success: true,
      previewUrl: `/templates/previews/${templateId}.jpg`,
      metadata: {
        templateId,
        category: 'preview',
        dimensions: { width: 1024, height: 1536 }
      }
    });

  } catch (error) {
    console.error('Template preview error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate template preview'
    });
  }
}