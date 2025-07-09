import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface LocalModel {
  id: string;
  name: string;
  nameAr: string;
  type: 'text' | 'image' | 'vision' | 'audio';
  size: string;
  downloadUrl: string;
  isInstalled: boolean;
  capabilities: string[];
  performance: {
    speed: 'fast' | 'medium' | 'slow';
    quality: 'good' | 'excellent' | 'professional';
    memory: string;
  };
}

export function useLocalModels() {
  const queryClient = useQueryClient();

  // Fetch all available models
  const {
    data: availableModels,
    isLoading: loadingModels,
    error: modelsError
  } = useQuery({
    queryKey: ['/api/local-models'],
    queryFn: async () => {
      const response = await fetch('/api/local-models');
      if (!response.ok) throw new Error('فشل في تحميل قائمة النماذج');
      const data = await response.json();
      return data.models as LocalModel[];
    }
  });

  // Fetch installed models
  const {
    data: installedModels,
    isLoading: loadingInstalled
  } = useQuery({
    queryKey: ['/api/local-models/installed'],
    queryFn: async () => {
      const response = await fetch('/api/local-models/installed');
      if (!response.ok) throw new Error('فشل في تحميل النماذج المثبتة');
      const data = await response.json();
      return data.models as LocalModel[];
    }
  });

  // Download model mutation
  const downloadModelMutation = useMutation({
    mutationFn: async (modelId: string) => {
      const response = await fetch(`/api/local-models/${modelId}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('فشل في تحميل النموذج');
      return response.json();
    },
    onSuccess: () => {
      // Refresh the models list
      queryClient.invalidateQueries({ queryKey: ['/api/local-models'] });
      queryClient.invalidateQueries({ queryKey: ['/api/local-models/installed'] });
    }
  });

  // Text generation mutation
  const generateTextMutation = useMutation({
    mutationFn: async ({ modelId, prompt }: { modelId: string; prompt: string }) => {
      const response = await fetch('/api/local-models/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId, prompt })
      });
      if (!response.ok) throw new Error('فشل في توليد النص');
      const data = await response.json();
      return data.result;
    }
  });

  // Image generation mutation
  const generateImageMutation = useMutation({
    mutationFn: async ({ modelId, prompt }: { modelId: string; prompt: string }) => {
      const response = await fetch('/api/local-models/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId, prompt })
      });
      if (!response.ok) throw new Error('فشل في توليد الصورة');
      const data = await response.json();
      return data.imageData;
    }
  });

  // Vision analysis mutation
  const analyzeVisionMutation = useMutation({
    mutationFn: async ({ modelId, imageFile, question }: { 
      modelId: string; 
      imageFile: File; 
      question: string 
    }) => {
      const formData = new FormData();
      formData.append('modelId', modelId);
      formData.append('question', question);
      formData.append('image', imageFile);

      const response = await fetch('/api/local-models/analyze-vision', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('فشل في تحليل الصورة');
      const data = await response.json();
      return data.result;
    }
  });

  return {
    // Data
    availableModels: availableModels || [],
    installedModels: installedModels || [],
    
    // Loading states
    isLoadingModels: loadingModels,
    isLoadingInstalled: loadingInstalled,
    
    // Mutations
    downloadModel: downloadModelMutation.mutate,
    isDownloading: downloadModelMutation.isPending,
    downloadError: downloadModelMutation.error,
    
    generateText: generateTextMutation.mutate,
    isGeneratingText: generateTextMutation.isPending,
    textResult: generateTextMutation.data,
    textError: generateTextMutation.error,
    
    generateImage: generateImageMutation.mutate,
    isGeneratingImage: generateImageMutation.isPending,
    imageResult: generateImageMutation.data,
    imageError: generateImageMutation.error,
    
    analyzeVision: analyzeVisionMutation.mutate,
    isAnalyzingVision: analyzeVisionMutation.isPending,
    visionResult: analyzeVisionMutation.data,
    visionError: analyzeVisionMutation.error,
    
    // Utility functions
    getModelsByType: (type: LocalModel['type']) => 
      availableModels?.filter(model => model.type === type) || [],
    
    isModelInstalled: (modelId: string) => 
      installedModels?.some(model => model.id === modelId) || false,
      
    getInstalledModelsByType: (type: LocalModel['type']) =>
      installedModels?.filter(model => model.type === type) || []
  };
}