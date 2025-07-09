import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdvancedImageCanvas } from "./AdvancedImageCanvas";
import { ProcessingModal } from "./ProcessingModal";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";

interface ToolWindowProps {
  toolId: string;
  toolName: string;
  onClose: () => void;
}

export function ToolWindow({ toolId, toolName, onClose }: ToolWindowProps) {
  const { t } = useLanguage();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectionData, setSelectionData] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState({
    intensity: 50,
    quality: 'balanced',
    style: 'natural',
    preserveOriginal: true
  });
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setResultImage(null);
  };

  const handleSelectionChange = (selection: string) => {
    setSelectionData(selection);
  };

  const handleProcess = async () => {
    if (!uploadedImage) {
      alert('الرجاء تحميل صورة أولاً');
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/local-ai/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId,
          imageUrl: uploadedImage,
          selectionData,
          settings
        })
      });

      if (!response.ok) throw new Error('فشل في المعالجة');

      const result = await response.json();
      setResultImage(result.processedImage);
      
    } catch (error) {
      console.error('Processing error:', error);
      alert('حدث خطأ في المعالجة. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveResult = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `knoux-${toolId}-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-[90vw] h-[90vh] max-w-7xl bg-black/20 backdrop-blur-md border-cyan-500/20 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400">
              {toolId}
            </Badge>
            <h2 className="text-2xl font-bold text-white">{toolName}</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            ✕
          </Button>
        </div>

        <div className="flex h-full">
          {/* Main Canvas Area */}
          <div className="flex-1 p-6">
            <div className="grid md:grid-cols-2 gap-6 h-full">
              
              {/* Original Image */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">الصورة الأصلية</h3>
                <div className="h-[400px] bg-black/20 rounded-lg border border-white/10">
                  <AdvancedImageCanvas
                    onImageUpload={handleImageUpload}
                    onSelectionChange={handleSelectionChange}
                    uploadedImage={uploadedImage}
                  />
                </div>
                
                {/* File Browser */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    📁 تصفح الملفات
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    🌐 من الإنترنت
                  </Button>
                </div>
              </div>

              {/* Result Preview */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">معاينة النتيجة</h3>
                <div className="h-[400px] bg-black/20 rounded-lg border border-white/10 flex items-center justify-center">
                  {resultImage ? (
                    <img 
                      src={resultImage} 
                      alt="Result" 
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-white/50 text-center">
                      <div className="text-4xl mb-2">🎨</div>
                      <div>النتيجة ستظهر هنا</div>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={handleProcess}
                    disabled={!uploadedImage || isProcessing}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    {isProcessing ? '🔄 جاري المعالجة...' : '▶️ تشغيل الأداة'}
                  </Button>
                  <Button
                    onClick={handleSaveResult}
                    disabled={!resultImage}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    💾 حفظ
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="w-80 bg-black/30 backdrop-blur-sm border-l border-white/10 p-6">
            <h3 className="text-white font-semibold mb-6">إعدادات الأداة</h3>
            
            <div className="space-y-6">
              {/* Intensity */}
              <div>
                <label className="text-white/90 text-sm mb-2 block">
                  قوة التأثير: {settings.intensity}%
                </label>
                <Slider
                  value={[settings.intensity]}
                  onValueChange={(value) => setSettings({...settings, intensity: value[0]})}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Quality */}
              <div>
                <label className="text-white/90 text-sm mb-2 block">جودة المعالجة</label>
                <Select value={settings.quality} onValueChange={(value) => setSettings({...settings, quality: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fast">سريع</SelectItem>
                    <SelectItem value="balanced">متوازن</SelectItem>
                    <SelectItem value="quality">جودة عالية</SelectItem>
                    <SelectItem value="extreme">جودة قصوى</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Style */}
              <div>
                <label className="text-white/90 text-sm mb-2 block">نمط المعالجة</label>
                <Select value={settings.style} onValueChange={(value) => setSettings({...settings, style: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">طبيعي</SelectItem>
                    <SelectItem value="enhanced">محسن</SelectItem>
                    <SelectItem value="artistic">فني</SelectItem>
                    <SelectItem value="dramatic">درامي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tool Info */}
              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <div className="text-white/90 font-medium">معلومات الأداة</div>
                <div className="text-sm text-white/70 space-y-1">
                  <div>🧠 النموذج: GFPGAN</div>
                  <div>⏱️ الوقت: 3-8 ثواني</div>
                  <div>💾 الحجم: 512MB</div>
                  <div>🎯 الدقة: 95%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Processing Modal */}
      <ProcessingModal
        isOpen={isProcessing}
        message="جاري معالجة الصورة بالذكاء الاصطناعي..."
        progress={50}
      />
    </div>
  );
}