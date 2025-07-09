import React, { useState } from 'react';
import { Enhanced3DBackground } from '../components/Enhanced3DBackground';
import { EnhancedServiceGrid } from '../components/EnhancedServiceGrid';
import { AdvancedImageCanvas } from '../components/AdvancedImageCanvas';
import { PromptNexus } from '../components/PromptNexus';
import { ProcessingModal } from '../components/ProcessingModal';
import { AdvancedLocalAITools } from '../components/AdvancedLocalAITools';
import { AdvancedAIModelsManager } from '../components/AdvancedAIModelsManager';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
interface TransformRequest {
  serviceId: string;
  imageUrl: string;
  prompt: string;
  selectionData?: string;
  quality: string;
}

export default function EnhancedHome() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectionData, setSelectionData] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('services');
  const [selectedTool, setSelectedTool] = useState<string>('');

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowResults(false);
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setResultImage(null);
    setShowResults(false);
  };

  const handleSelectionChange = (selection: string) => {
    setSelectionData(selection);
  };

  const handleTransform = async (prompt: string, quality: string) => {
    if (!selectedService || !uploadedImage) {
      alert('الرجاء اختيار خدمة ورفع صورة أولاً');
      return;
    }

    setIsProcessing(true);
    setProcessingMessage('جاري تحضير الطلب...');
    setProcessingProgress(10);

    try {
      const transformRequest: TransformRequest = {
        serviceId: selectedService,
        imageUrl: uploadedImage,
        prompt,
        selectionData: selectionData || undefined,
        quality
      };

      setProcessingMessage('جاري معالجة الصورة بالذكاء الاصطناعي...');
      setProcessingProgress(30);

      const response = await fetch('/api/ai-transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformRequest),
      });

      setProcessingProgress(70);
      
      if (!response.ok) {
        throw new Error('فشل في معالجة الصورة');
      }

      const result = await response.json();
      
      setProcessingMessage('جاري تحضير النتيجة...');
      setProcessingProgress(90);
      
      // Simulate final processing
      setTimeout(() => {
        setResultImage(result.imageUrl);
        setProcessingProgress(100);
        setProcessingMessage('اكتملت المعالجة بنجاح!');
        
        setTimeout(() => {
          setIsProcessing(false);
          setShowResults(true);
        }, 1000);
      }, 1000);

    } catch (error) {
      console.error('Transform error:', error);
      setIsProcessing(false);
      alert('حدث خطأ في معالجة الصورة. الرجاء المحاولة مرة أخرى.');
    }
  };

  const resetWorkspace = () => {
    setSelectedService('');
    setUploadedImage(null);
    setSelectionData('');
    setResultImage(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen relative">
      <Enhanced3DBackground />
      
      <div className="relative z-10">
        {!selectedService && !showResults && (
          <div className="container mx-auto px-6 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-black/20 backdrop-blur-sm border border-white/20 p-1 rounded-xl">
                  <TabsTrigger 
                    value="services" 
                    className="text-white data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 px-6 py-3 rounded-lg transition-all"
                  >
                    🌐 خدمات الذكاء الاصطناعي
                  </TabsTrigger>
                  <TabsTrigger 
                    value="local-tools" 
                    className="text-white data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 px-6 py-3 rounded-lg transition-all"
                  >
                    🔧 الأدوات المحلية (30 أداة)
                  </TabsTrigger>
                  <TabsTrigger 
                    value="models" 
                    className="text-white data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 px-6 py-3 rounded-lg transition-all"
                  >
                    🤖 إدارة النماذج
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="services" className="mt-0">
                <EnhancedServiceGrid 
                  onServiceSelect={handleServiceSelect}
                  selectedService={selectedService}
                />
              </TabsContent>

              <TabsContent value="local-tools" className="mt-0">
                <AdvancedLocalAITools 
                  selectedTool={selectedTool}
                  onToolSelect={(tool) => setSelectedTool(tool.id)}
                />
              </TabsContent>

              <TabsContent value="models" className="mt-0">
                <AdvancedAIModelsManager />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Service Processing Interface */}
        {selectedService && !showResults && (
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <Button
                onClick={() => {
                  resetWorkspace();
                  setActiveTab('services');
                }}
                variant="outline"
                className="mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                ← العودة للخدمات
              </Button>
              <h1 className="text-3xl font-bold text-white mb-2">
                {selectedService === 'magic-transform' && 'التحويل السحري'}
                {selectedService === 'remove-replace' && 'إزالة واستبدال'}
                {selectedService === 'style-transfer' && 'نقل الأسلوب'}
                {selectedService === 'text-image-add' && 'إضافة نص للصورة'}
                {selectedService === 'background-replace' && 'استبدال الخلفية'}
                {selectedService === 'object-recolor' && 'إعادة تلوين الكائنات'}
                {selectedService === 'ai-enhance' && 'التحسين بالذكاء الاصطناعي'}
                {selectedService === 'vip-magic-morph' && 'التحويل السحري المتقدم'}
              </h1>
              <p className="text-white/70">
                قم برفع صورة وإدخال الأوامر للحصول على نتائج مذهلة
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Canvas */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h3 className="text-white font-semibold mb-4">رفع وتحديد الصورة</h3>
                  <AdvancedImageCanvas
                    onImageUpload={handleImageUpload}
                    onSelectionChange={handleSelectionChange}
                    uploadedImage={uploadedImage}
                  />
                </div>
              </div>

              {/* Prompt Interface */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h3 className="text-white font-semibold mb-4">كيف تريد تحويل صورتك؟</h3>
                  <PromptNexus
                    selectedService={selectedService}
                    onTransform={handleTransform}
                    disabled={!uploadedImage}
                  />
                </div>

                {/* Service Info */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                  <h4 className="text-white/90 font-medium mb-3">معلومات الخدمة</h4>
                  <div className="space-y-2 text-sm text-white/70">
                    <div>⏱️ وقت المعالجة: 10-30 ثانية</div>
                    <div>🎯 دقة النتائج: عالية جداً</div>
                    <div>💾 حفظ النتائج: متاح</div>
                    <div>🔄 التعديل: غير محدود</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showResults && (
          <div className="container mx-auto px-6 py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">النتيجة النهائية</h2>
              <p className="text-white/70">مقارنة الصورة الأصلية مع النتيجة</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Original Image */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                <h3 className="text-white font-semibold mb-4">الصورة الأصلية</h3>
                <div className="aspect-square bg-black/20 rounded-xl overflow-hidden">
                  {uploadedImage && (
                    <img 
                      src={uploadedImage} 
                      alt="Original" 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Result Image */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                <h3 className="text-white font-semibold mb-4">النتيجة المحولة</h3>
                <div className="aspect-square bg-black/20 rounded-xl overflow-hidden">
                  {resultImage && (
                    <img 
                      src={resultImage} 
                      alt="Result" 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={resetWorkspace}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                تحويل صورة جديدة
              </Button>
              {resultImage && (
                <Button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = resultImage;
                    link.download = 'knoux-result.jpg';
                    link.click();
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  تحميل النتيجة
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <ProcessingModal
        isOpen={isProcessing}
        progress={processingProgress}
        message={processingMessage}
      />
    </div>
  );
}