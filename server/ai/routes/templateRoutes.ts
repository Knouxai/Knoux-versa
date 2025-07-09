import { Request, Response } from 'express';
import { processTemplateWithAI } from '../processors/templateProcessor';

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
    const result = await processTemplateWithAI({
      templateId,
      userImageBase64: userImage,
      selectionData: selectionData || '',
      customizationSettings: settings || {},
      outputQuality: 'high'
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error || 'Template processing failed'
      });
    }

    res.json({
      success: true,
      processedImage: result.processedImageBase64,
      metadata: {
        templateId,
        processingTime: result.processingTime,
        modelsUsed: result.modelsUsed,
        quality: result.quality
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