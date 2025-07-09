import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { storage } from "./storage";
import { insertTransformationSchema, insertVipSessionSchema } from "@shared/schema";
import { processImageTransformation } from "./ai/imageProcessor";
import { localModelsManager } from "./ai/localModels";
import { processTemplateRequest, getTemplatePreview } from "./ai/routes/templateRoutes";

// Configure multer for image uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Image upload endpoint
  app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      // Move file to permanent location
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const permanentPath = path.join('uploads', fileName);
      await fs.rename(req.file.path, permanentPath);

      res.json({ 
        imageUrl: `/uploads/${fileName}`,
        originalName: req.file.originalname,
        size: req.file.size
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  // AI transformation endpoint
  app.post('/api/transform', async (req, res) => {
    try {
      const transformationData = insertTransformationSchema.parse(req.body);
      
      // Validate required fields
      if (!transformationData.originalImageUrl || !transformationData.prompt || !transformationData.service) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Check VIP access for VIP services
      if (transformationData.isVIP) {
        const vipKey = req.headers['x-vip-key'] as string | undefined;
        if (!vipKey) {
          return res.status(401).json({ error: 'VIP key required for this service' });
        }

        const vipSession = await storage.getVipSession(vipKey);
        if (!vipSession || !vipSession.isActive) {
          return res.status(403).json({ error: 'Invalid or expired VIP key' });
        }
      }

      // Process the image transformation
      const transformedImageUrl = await processImageTransformation({
        originalImageUrl: transformationData.originalImageUrl,
        prompt: transformationData.prompt,
        service: transformationData.service,
        selectionData: transformationData.selectionData || undefined,
        quality: transformationData.quality || "standard",
        isVIP: transformationData.isVIP || false
      });

      // Save transformation to storage
      const transformation = await storage.createTransformation({
        ...transformationData,
        transformedImageUrl
      });

      res.json(transformation);
    } catch (error) {
      console.error('Transformation error:', error);
      res.status(500).json({ error: 'Failed to process transformation' });
    }
  });

  // VIP authentication endpoint
  app.post('/api/vip/authenticate', async (req, res) => {
    try {
      const { vipKey } = req.body;
      
      // Read the VIP key from the secure file
      const correctVipKey = process.env.VIP_KEY || 'SADEK_ELGAZAR_VIP_2025';
      
      if (vipKey !== correctVipKey) {
        return res.status(401).json({ error: 'Invalid VIP key' });
      }

      // Create VIP session
      const sessionKey = `vip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      const vipSession = await storage.createVipSession({
        sessionKey,
        isActive: true,
        expiresAt
      });

      res.json({ 
        success: true, 
        sessionKey: vipSession.sessionKey,
        message: 'VIP access granted. Welcome, Sadek Elgazar!'
      });
    } catch (error) {
      console.error('VIP auth error:', error);
      res.status(500).json({ error: 'VIP authentication failed' });
    }
  });

  // Get transformation history
  app.get('/api/transformations', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const transformations = await storage.getUserTransformations(userId);
      res.json(transformations);
    } catch (error) {
      console.error('Get transformations error:', error);
      res.status(500).json({ error: 'Failed to fetch transformations' });
    }
  });

  // Serve uploaded images
  app.use('/uploads', express.static('uploads'));

  // Local Models Management Endpoints
  
  // Get all available models
  app.get('/api/local-models', async (req, res) => {
    try {
      const models = localModelsManager.getAvailableModels();
      res.json({ models });
    } catch (error) {
      console.error('Error fetching models:', error);
      res.status(500).json({ error: 'Failed to fetch models' });
    }
  });

  // Get installed models
  app.get('/api/local-models/installed', async (req, res) => {
    try {
      const models = localModelsManager.getInstalledModels();
      res.json({ models });
    } catch (error) {
      console.error('Error fetching installed models:', error);
      res.status(500).json({ error: 'Failed to fetch installed models' });
    }
  });

  // Download a model
  app.post('/api/local-models/:modelId/download', async (req, res) => {
    try {
      const { modelId } = req.params;
      const result = await localModelsManager.downloadModel(modelId);
      
      if (result.success) {
        res.json({ success: true, message: 'تم تحميل النموذج بنجاح' });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error('Error downloading model:', error);
      res.status(500).json({ error: 'فشل في تحميل النموذج' });
    }
  });

  // Run text generation
  app.post('/api/local-models/generate-text', async (req, res) => {
    try {
      const { modelId, prompt } = req.body;
      
      if (!modelId || !prompt) {
        return res.status(400).json({ error: 'Model ID and prompt are required' });
      }

      const result = await localModelsManager.runTextGeneration(modelId, prompt);
      res.json({ result });
    } catch (error) {
      console.error('Error in text generation:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Run image generation
  app.post('/api/local-models/generate-image', async (req, res) => {
    try {
      const { modelId, prompt } = req.body;
      
      if (!modelId || !prompt) {
        return res.status(400).json({ error: 'Model ID and prompt are required' });
      }

      const imageData = await localModelsManager.runImageGeneration(modelId, prompt);
      res.json({ imageData });
    } catch (error) {
      console.error('Error in image generation:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Run vision analysis
  app.post('/api/local-models/analyze-vision', upload.single('image'), async (req, res) => {
    try {
      const { modelId, question } = req.body;
      const imageFile = req.file;
      
      if (!modelId || !question || !imageFile) {
        return res.status(400).json({ error: 'Model ID, question, and image are required' });
      }

      // Read image file
      const imageData = await fs.readFile(imageFile.path, 'base64');
      const result = await localModelsManager.runVisionAnalysis(modelId, imageData, question);
      
      // Clean up uploaded file
      await fs.unlink(imageFile.path);
      
      res.json({ result });
    } catch (error) {
      console.error('Error in vision analysis:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Artistic Template Processing Routes
  app.post('/api/ai/template-process', processTemplateRequest);
  app.get('/api/templates/:templateId/preview', getTemplatePreview);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'healthy', 
      service: 'KNOUX VERSA',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      localModels: localModelsManager.getInstalledModels().length
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
