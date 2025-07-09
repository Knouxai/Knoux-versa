import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Download, 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  Settings,
  Sparkles,
  Heart,
  Star,
  ArrowLeft,
  Camera,
  Palette,
  Zap
} from 'lucide-react';
import { ArtisticTemplate } from '../data/artisticTemplates';

interface TemplateProcessorProps {
  selectedTemplate: ArtisticTemplate;
  onBack: () => void;
  userImage?: string | null;
}

interface ProcessingStage {
  id: number;
  name: string;
  nameAr: string;
  estimatedTime: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

interface CustomizationSettings {
  faceBlend: number;
  bodyAlignment: number;
  clothingColor: string;
  lightingIntensity: number;
  styleStrength: number;
  qualityLevel: 'standard' | 'high' | 'ultra';
}

export function TemplateProcessor({ selectedTemplate, onBack, userImage }: TemplateProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(userImage || null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processingStages, setProcessingStages] = useState<ProcessingStage[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [customizations, setCustomizations] = useState<CustomizationSettings>({
    faceBlend: 80,
    bodyAlignment: 70,
    clothingColor: '#FF69B4',
    lightingIntensity: 60,
    styleStrength: 85,
    qualityLevel: 'ultra'
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessTemplate = async () => {
    if (!uploadedImage) {
      alert('يرجى رفع صورة أولاً');
      return;
    }

    setIsProcessing(true);
    setResultImage(null);
    setOverallProgress(0);
    
    try {
      // Initialize stages
      const stages: ProcessingStage[] = [
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
      
      setProcessingStages(stages);

      // Create FormData for file upload
      const formData = new FormData();
      
      // Convert base64 to blob for upload
      const response = await fetch(uploadedImage);
      const blob = await response.blob();
      formData.append('image', blob, 'user-image.jpg');
      formData.append('templateId', selectedTemplate.id);
      formData.append('customizations', JSON.stringify(customizations));

      // Process each stage with simulated progress
      for (let stageIndex = 0; stageIndex < stages.length; stageIndex++) {
        setCurrentStage(stageIndex);
        const stage = stages[stageIndex];
        stage.status = 'processing';
        setProcessingStages([...stages]);

        // Simulate stage processing
        const stepTime = stage.estimatedTime / 20;
        for (let progress = 0; progress <= 100; progress += 5) {
          stage.progress = progress;
          setProcessingStages([...stages]);
          setOverallProgress(((stageIndex * 100 + progress) / stages.length));
          await new Promise(resolve => setTimeout(resolve, stepTime));
        }

        stage.status = 'completed';
        setProcessingStages([...stages]);
      }

      // Send to backend for final processing
      const apiResponse = await fetch('/api/process-template', {
        method: 'POST',
        body: formData
      });

      const result = await apiResponse.json();
      
      if (result.success) {
        setResultImage(result.resultImageUrl);
        console.log('✅ تم إنجاز معالجة التمبلت بنجاح');
      } else {
        throw new Error(result.error || 'Template processing failed');
      }

    } catch (error) {
      console.error('❌ خطأ في معالجة التمبلت:', error);
      alert('حدث خطأ في معالجة التمبلت. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
      setOverallProgress(100);
    }
  };

  const resetProcessor = () => {
    setUploadedImage(null);
    setResultImage(null);
    setProcessingStages([]);
    setCurrentStage(0);
    setOverallProgress(0);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            العودة للتمبلتس
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              معالج التمبلت الفني
            </h1>
            <p className="text-purple-200">
              {selectedTemplate.nameAr} - {selectedTemplate.category}
            </p>
          </div>
          
          <Button
            onClick={resetProcessor}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-5 h-5 ml-2" />
            إعادة تعيين
          </Button>
        </div>

        {/* Template Info Card */}
        <Card className="bg-black/40 border-purple-500/20 mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={selectedTemplate.previewImage} 
                  alt={selectedTemplate.nameAr}
                  className="w-24 h-32 object-cover rounded-lg"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 bg-red-500/20 text-red-300"
                >
                  +18
                </Badge>
              </div>
              
              <div className="flex-1">
                <CardTitle className="text-2xl text-white mb-2">
                  {selectedTemplate.nameAr}
                </CardTitle>
                <p className="text-purple-200 mb-3">
                  {selectedTemplate.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {selectedTemplate.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    {selectedTemplate.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    زمن المعالجة: ~75 ثانية
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Upload & Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-black/40 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  رفع الصورة
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-purple-500/50 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
                >
                  {uploadedImage ? (
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 text-purple-400 mx-auto" />
                      <p className="text-purple-200">
                        اضغط لرفع صورتك
                      </p>
                      <p className="text-sm text-gray-400">
                        JPEG, PNG, WebP - حتى 10MB
                      </p>
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                {uploadedImage && (
                  <Button
                    onClick={() => setUploadedImage(null)}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    إزالة الصورة
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Customization Controls */}
          <div className="lg:col-span-1">
            <Card className="bg-black/40 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  إعدادات التخصيص
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Face Blend */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-white">قوة دمج الوجه</Label>
                    <span className="text-purple-300">{customizations.faceBlend}%</span>
                  </div>
                  <Slider
                    value={[customizations.faceBlend]}
                    onValueChange={(value) => setCustomizations(prev => ({ ...prev, faceBlend: value[0] }))}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Body Alignment */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-white">محاذاة الجسم</Label>
                    <span className="text-purple-300">{customizations.bodyAlignment}%</span>
                  </div>
                  <Slider
                    value={[customizations.bodyAlignment]}
                    onValueChange={(value) => setCustomizations(prev => ({ ...prev, bodyAlignment: value[0] }))}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Clothing Color */}
                <div className="space-y-2">
                  <Label className="text-white">لون الملابس</Label>
                  <Input
                    type="color"
                    value={customizations.clothingColor}
                    onChange={(e) => setCustomizations(prev => ({ ...prev, clothingColor: e.target.value }))}
                    className="w-full h-12 bg-black/20 border-white/20"
                  />
                </div>

                {/* Lighting Intensity */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-white">قوة الإضاءة</Label>
                    <span className="text-purple-300">{customizations.lightingIntensity}%</span>
                  </div>
                  <Slider
                    value={[customizations.lightingIntensity]}
                    onValueChange={(value) => setCustomizations(prev => ({ ...prev, lightingIntensity: value[0] }))}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Style Strength */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-white">قوة الأسلوب</Label>
                    <span className="text-purple-300">{customizations.styleStrength}%</span>
                  </div>
                  <Slider
                    value={[customizations.styleStrength]}
                    onValueChange={(value) => setCustomizations(prev => ({ ...prev, styleStrength: value[0] }))}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Quality Level */}
                <div className="space-y-2">
                  <Label className="text-white">مستوى الجودة</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['standard', 'high', 'ultra'].map((quality) => (
                      <Button
                        key={quality}
                        onClick={() => setCustomizations(prev => ({ ...prev, qualityLevel: quality as any }))}
                        variant={customizations.qualityLevel === quality ? "default" : "outline"}
                        size="sm"
                        className={`
                          ${customizations.qualityLevel === quality 
                            ? 'bg-purple-500 text-white' 
                            : 'border-white/20 text-white hover:bg-white/10'
                          }
                        `}
                      >
                        {quality === 'standard' ? 'عادي' : quality === 'high' ? 'عالي' : 'فائق'}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Process Button */}
                <Button
                  onClick={handleProcessTemplate}
                  disabled={!uploadedImage || isProcessing}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                      جاري المعالجة...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      بدء المعالجة
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results & Progress */}
          <div className="lg:col-span-1">
            <Card className="bg-black/40 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  النتائج والتقدم
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Overall Progress */}
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white">التقدم الإجمالي</span>
                      <span className="text-purple-300">{Math.round(overallProgress)}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-3" />
                  </div>
                )}

                {/* Processing Stages */}
                {processingStages.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">مراحل المعالجة:</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {processingStages.map((stage, index) => (
                        <div 
                          key={stage.id}
                          className={`p-3 rounded-lg border ${
                            stage.status === 'completed' ? 'bg-green-500/10 border-green-500/30' :
                            stage.status === 'processing' ? 'bg-blue-500/10 border-blue-500/30' :
                            stage.status === 'error' ? 'bg-red-500/10 border-red-500/30' :
                            'bg-gray-500/10 border-gray-500/30'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white text-sm font-medium">
                              {stage.nameAr}
                            </span>
                            <span className={`text-xs ${
                              stage.status === 'completed' ? 'text-green-300' :
                              stage.status === 'processing' ? 'text-blue-300' :
                              stage.status === 'error' ? 'text-red-300' :
                              'text-gray-300'
                            }`}>
                              {stage.status === 'completed' ? '✅ مكتمل' :
                               stage.status === 'processing' ? '⚙️ جاري...' :
                               stage.status === 'error' ? '❌ خطأ' :
                               '⏸️ في الانتظار'}
                            </span>
                          </div>
                          {stage.status === 'processing' && (
                            <Progress value={stage.progress} className="h-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Result Image */}
                {resultImage && (
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">النتيجة النهائية:</h4>
                    <div className="relative">
                      <img 
                        src={resultImage} 
                        alt="Result"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500/20 text-green-300">
                          ✅ مكتمل
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = resultImage;
                        link.download = `template_result_${selectedTemplate.id}.png`;
                        link.click();
                      }}
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <Download className="w-5 h-5 ml-2" />
                      تحميل النتيجة
                    </Button>
                  </div>
                )}

                {/* Template Info */}
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="text-purple-300 font-medium mb-2">معلومات التمبلت:</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p>• الدقة: {selectedTemplate.resolution}</p>
                    <p>• النماذج المستخدمة: 6 نماذج متقدمة</p>
                    <p>• الجودة: {customizations.qualityLevel === 'ultra' ? 'فائقة الجودة' : customizations.qualityLevel === 'high' ? 'عالية' : 'عادية'}</p>
                    <p>• الحجم المتوقع: ~8-12 MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}