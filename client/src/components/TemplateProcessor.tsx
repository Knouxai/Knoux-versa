import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvancedImageCanvas } from "./AdvancedImageCanvas";
import { ArtisticTemplate } from "@/data/artisticTemplates";
import { useLanguage } from "@/hooks/useLanguage";
import { Upload, Cpu, Image, Download, Share2, ArrowLeft, Settings } from "lucide-react";

interface TemplateProcessorProps {
  selectedTemplate: ArtisticTemplate;
  onBack: () => void;
  userImage?: string;
}

interface ProcessingStage {
  id: string;
  name_ar: string;
  name_en: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  estimatedTime: number;
}

export function TemplateProcessor({ selectedTemplate, onBack, userImage }: TemplateProcessorProps) {
  const { t, currentLanguage } = useLanguage();
  const [uploadedImage, setUploadedImage] = useState<string | null>(userImage || null);
  const [selectionData, setSelectionData] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStages, setProcessingStages] = useState<ProcessingStage[]>([]);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initializeProcessingStages = (): ProcessingStage[] => [
    {
      id: 'face_analysis',
      name_ar: 'تحليل الوجه والملامح',
      name_en: 'Face Analysis & Features',
      progress: 0,
      status: 'pending',
      estimatedTime: 3
    },
    {
      id: 'pose_detection',
      name_ar: 'كشف الوضعية والهيكل',
      name_en: 'Pose Detection & Structure',
      progress: 0,
      status: 'pending',
      estimatedTime: 5
    },
    {
      id: 'style_transfer',
      name_ar: 'نقل النمط الفني',
      name_en: 'Artistic Style Transfer',
      progress: 0,
      status: 'pending',
      estimatedTime: 8
    },
    {
      id: 'clothing_integration',
      name_ar: 'دمج الملابس والتفاصيل',
      name_en: 'Clothing & Details Integration',
      progress: 0,
      status: 'pending',
      estimatedTime: 6
    },
    {
      id: 'lighting_effects',
      name_ar: 'تطبيق تأثيرات الإضاءة',
      name_en: 'Lighting Effects Application',
      progress: 0,
      status: 'pending',
      estimatedTime: 4
    },
    {
      id: 'final_enhancement',
      name_ar: 'التحسين النهائي والجودة',
      name_en: 'Final Enhancement & Quality',
      progress: 0,
      status: 'pending',
      estimatedTime: 7
    }
  ];

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setResultImage(null);
    setActiveTab('preview');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        handleImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const startProcessing = async () => {
    if (!uploadedImage) {
      alert('يرجى تحميل صورة أولاً');
      return;
    }

    setIsProcessing(true);
    setActiveTab('processing');
    const stages = initializeProcessingStages();
    setProcessingStages(stages);

    try {
      for (let i = 0; i < stages.length; i++) {
        const stage = stages[i];
        
        // Update stage status to processing
        setProcessingStages(prev => prev.map(s => 
          s.id === stage.id ? { ...s, status: 'processing' } : s
        ));

        // Simulate AI processing with realistic progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, stage.estimatedTime * 10));
          setProcessingStages(prev => prev.map(s => 
            s.id === stage.id ? { ...s, progress } : s
          ));
        }

        // Mark stage as completed
        setProcessingStages(prev => prev.map(s => 
          s.id === stage.id ? { ...s, status: 'completed', progress: 100 } : s
        ));

        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Simulate final result
      await processWithAI();
      setActiveTab('result');

    } catch (error) {
      console.error('Processing error:', error);
      setProcessingStages(prev => prev.map(s => 
        s.status === 'processing' ? { ...s, status: 'error' } : s
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const processWithAI = async () => {
    const response = await fetch('/api/ai/template-process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId: selectedTemplate.id,
        userImage: uploadedImage,
        selectionData,
        settings: {
          faceSwap: selectedTemplate.customizable.face_swap,
          bodyAdjustment: selectedTemplate.customizable.body_adjustment,
          clothingColor: selectedTemplate.customizable.clothing_color,
          lightingControl: selectedTemplate.customizable.lighting_control
        }
      })
    });

    if (!response.ok) {
      throw new Error('فشل في معالجة التمبلت');
    }

    const result = await response.json();
    setResultImage(result.processedImage);
  };

  const downloadResult = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `knoux-elysian-${selectedTemplate.id}-${Date.now()}.png`;
    link.click();
  };

  const shareResult = async () => {
    if (!resultImage) return;
    
    try {
      const blob = await fetch(resultImage).then(r => r.blob());
      const file = new File([blob], 'knoux-elysian-art.png', { type: 'image/png' });
      
      if (navigator.share) {
        await navigator.share({
          title: 'My Elysian Canvas Creation',
          text: 'Check out my artistic creation from KNOUX VERSA',
          files: [file]
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        alert('تم نسخ الصورة للحافظة');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      alert('فشل في مشاركة الصورة');
    }
  };

  const ProcessingStageCard = ({ stage }: { stage: ProcessingStage }) => (
    <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-medium text-sm">
          {currentLanguage === 'ar' ? stage.name_ar : stage.name_en}
        </h4>
        <Badge 
          variant={stage.status === 'completed' ? 'default' : 'secondary'}
          className={`text-xs ${
            stage.status === 'completed' ? 'bg-green-500/20 text-green-400' :
            stage.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
            stage.status === 'error' ? 'bg-red-500/20 text-red-400' :
            'bg-gray-500/20 text-gray-400'
          }`}
        >
          {stage.status === 'completed' ? '✓' :
           stage.status === 'processing' ? '⟳' :
           stage.status === 'error' ? '✗' : '○'}
        </Badge>
      </div>
      
      <Progress 
        value={stage.progress} 
        className="h-2 mb-2"
      />
      
      <div className="flex justify-between text-xs text-white/60">
        <span>{stage.progress}%</span>
        <span>{stage.estimatedTime}s</span>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            العودة
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {currentLanguage === 'ar' ? selectedTemplate.name_ar : selectedTemplate.name_en}
            </h1>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {selectedTemplate.category}
              </Badge>
              <Badge variant="outline" className="text-white border-white/20">
                {selectedTemplate.artisticLevel}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Settings className="w-4 h-4 mr-2" />
            إعدادات
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-black/20 backdrop-blur-sm border border-white/20 p-1 rounded-xl">
          <TabsTrigger value="upload" className="text-white data-[state=active]:bg-cyan-500/20">
            📤 تحميل الصورة
          </TabsTrigger>
          <TabsTrigger value="preview" className="text-white data-[state=active]:bg-cyan-500/20">
            👁️ معاينة
          </TabsTrigger>
          <TabsTrigger value="processing" className="text-white data-[state=active]:bg-cyan-500/20">
            ⚙️ المعالجة
          </TabsTrigger>
          <TabsTrigger value="result" className="text-white data-[state=active]:bg-cyan-500/20">
            🎨 النتيجة
          </TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10 border-dashed">
              <div className="text-center space-y-4">
                <Upload className="w-16 h-16 mx-auto text-white/40" />
                <h3 className="text-xl font-bold text-white">تحميل صورتك الشخصية</h3>
                <p className="text-white/70">
                  قم بتحميل صورة واضحة لوجهك لدمجها مع التمبلت الفني
                </p>
                
                <div className="space-y-4">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    اختيار صورة من الجهاز
                  </Button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  <div className="text-xs text-white/50">
                    الصيغ المدعومة: JPEG, PNG, WebP | الحد الأقصى: 10MB
                  </div>
                </div>
              </div>
            </Card>

            {/* Template Preview */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-white font-semibold mb-4">معاينة التمبلت</h3>
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center text-white/60">
                  <Image className="w-16 h-16" />
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 rounded-lg p-3 space-y-2">
                    <div className="text-white font-medium text-sm">تفاصيل التمبلت</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-white/70">النمط: </span>
                        <span className="text-white">{selectedTemplate.style}</span>
                      </div>
                      <div>
                        <span className="text-white/70">المزاج: </span>
                        <span className="text-white">{selectedTemplate.mood}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
                <h3 className="text-white font-semibold mb-4">صورتك المحملة</h3>
                <AdvancedImageCanvas
                  onImageUpload={handleImageUpload}
                  onSelectionChange={setSelectionData}
                  uploadedImage={uploadedImage}
                />
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
                <h3 className="text-white font-semibold mb-4">إعدادات المعالجة</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/70">نموذج الوجه: </span>
                      <span className="text-cyan-400">{selectedTemplate.aiModels.face_model}</span>
                    </div>
                    <div>
                      <span className="text-white/70">نموذج الوضعية: </span>
                      <span className="text-cyan-400">{selectedTemplate.aiModels.pose_model}</span>
                    </div>
                    <div>
                      <span className="text-white/70">التحسين: </span>
                      <span className="text-cyan-400">{selectedTemplate.aiModels.enhancement_model}</span>
                    </div>
                    <div>
                      <span className="text-white/70">النمط: </span>
                      <span className="text-cyan-400">{selectedTemplate.aiModels.style_model}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Button
                onClick={startProcessing}
                disabled={!uploadedImage || isProcessing}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white text-lg py-6"
              >
                <Cpu className="w-5 h-5 mr-2" />
                بدء المعالجة بالذكاء الاصطناعي
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Processing Tab */}
        <TabsContent value="processing" className="mt-6">
          <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                <Cpu className="w-8 h-8 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">جاري المعالجة بالذكاء الاصطناعي</h2>
              <p className="text-white/70">يتم دمج صورتك مع التمبلت الفني باستخدام نماذج AI متقدمة</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {processingStages.map((stage) => (
                <ProcessingStageCard key={stage.id} stage={stage} />
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Result Tab */}
        <TabsContent value="result" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Original Image */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-white font-semibold mb-4">الصورة الأصلية</h3>
              <div className="aspect-square bg-black/20 rounded-lg overflow-hidden">
                {uploadedImage && (
                  <img 
                    src={uploadedImage} 
                    alt="Original" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Card>

            {/* Result Image */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-white font-semibold mb-4">النتيجة الفنية</h3>
              <div className="aspect-square bg-black/20 rounded-lg overflow-hidden">
                {resultImage && (
                  <img 
                    src={resultImage} 
                    alt="Result" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              onClick={downloadResult}
              disabled={!resultImage}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              تحميل النتيجة
            </Button>
            <Button
              onClick={shareResult}
              disabled={!resultImage}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Share2 className="w-4 h-4 mr-2" />
              مشاركة
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}