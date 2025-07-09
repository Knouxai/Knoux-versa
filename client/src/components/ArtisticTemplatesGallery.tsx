import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  ARTISTIC_TEMPLATES, 
  TEMPLATE_CATEGORIES, 
  ArtisticTemplate,
  TemplateCategory,
  getTemplatesByCategory,
  getVIPTemplates,
  getFreeTemplates 
} from "@/data/artisticTemplates";
import { Crown, Lock, Palette, Zap, Eye, Download, Settings } from "lucide-react";

interface ArtisticTemplatesGalleryProps {
  onTemplateSelect: (template: ArtisticTemplate) => void;
  userHasVIP: boolean;
}

export function ArtisticTemplatesGallery({ onTemplateSelect, userHasVIP }: ArtisticTemplatesGalleryProps) {
  const { t, currentLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'All'>('All');
  const [selectedTemplate, setSelectedTemplate] = useState<ArtisticTemplate | null>(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customizationSettings, setCustomizationSettings] = useState({
    faceSwap: true,
    bodyAdjustment: false,
    clothingColor: true,
    lightingControl: false,
    backgroundChange: false
  });

  const filteredTemplates = selectedCategory === 'All' 
    ? ARTISTIC_TEMPLATES 
    : getTemplatesByCategory(selectedCategory);

  const handleTemplateClick = (template: ArtisticTemplate) => {
    if (template.isVIP && !userHasVIP) {
      alert('هذا التمبلت يتطلب عضوية VIP');
      return;
    }
    setSelectedTemplate(template);
    setShowCustomization(true);
  };

  const handleStartCreation = () => {
    if (selectedTemplate) {
      onTemplateSelect(selectedTemplate);
      setShowCustomization(false);
    }
  };

  const TemplateCard = ({ template }: { template: ArtisticTemplate }) => (
    <Card 
      className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
        template.isVIP && !userHasVIP ? 'opacity-60' : ''
      }`}
      onClick={() => handleTemplateClick(template)}
    >
      {/* Template Image */}
      <div className="aspect-[3/4] bg-gradient-to-br from-purple-900/20 to-pink-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
        
        {/* Placeholder for actual image */}
        <div className="w-full h-full flex items-center justify-center text-white/60">
          <Palette className="w-16 h-16" />
        </div>

        {/* VIP Badge */}
        {template.isVIP && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
            <Crown className="w-3 h-3 mr-1" />
            VIP
          </Badge>
        )}

        {/* Lock Overlay for non-VIP users */}
        {template.isVIP && !userHasVIP && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">VIP Required</div>
            </div>
          </div>
        )}

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <h3 className="text-white font-semibold text-sm mb-1">
            {currentLanguage === 'ar' ? template.name_ar : template.name_en}
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="secondary" className="text-xs bg-white/20 text-white">
              {template.category}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-white/20 text-white">
              {template.artisticLevel}
            </Badge>
          </div>
          <p className="text-white/80 text-xs line-clamp-2">
            {currentLanguage === 'ar' ? template.description_ar : template.description_en}
          </p>
        </div>
      </div>
    </Card>
  );

  const CustomizationPanel = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black/20 backdrop-blur-md border-cyan-500/20">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedTemplate && (currentLanguage === 'ar' ? selectedTemplate.name_ar : selectedTemplate.name_en)}
              </h2>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {selectedTemplate?.category}
                </Badge>
                <Badge variant="outline" className="text-white border-white/20">
                  {selectedTemplate?.artisticLevel}
                </Badge>
                {selectedTemplate?.isVIP && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
                    <Crown className="w-3 h-3 mr-1" />
                    VIP
                  </Badge>
                )}
              </div>
            </div>
            <Button
              onClick={() => setShowCustomization(false)}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              ✕
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Preview Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-4">معاينة التمبلت</h3>
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg overflow-hidden relative">
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <Palette className="w-20 h-20" />
                  </div>
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white">
                        <Eye className="w-4 h-4 mr-2" />
                        معاينة
                      </Button>
                      <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white">
                        <Zap className="w-4 h-4 mr-2" />
                        تطبيق
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Details */}
              <div className="bg-white/5 rounded-lg p-4 space-y-3">
                <h4 className="text-white font-medium">تفاصيل التمبلت</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/70">الإضاءة</div>
                    <div className="text-white">{selectedTemplate?.lighting.mood}</div>
                  </div>
                  <div>
                    <div className="text-white/70">الوضعية</div>
                    <div className="text-white">{selectedTemplate?.pose.type}</div>
                  </div>
                  <div>
                    <div className="text-white/70">النمط</div>
                    <div className="text-white">{selectedTemplate?.style}</div>
                  </div>
                  <div>
                    <div className="text-white/70">المزاج</div>
                    <div className="text-white">{selectedTemplate?.mood}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-6">
              <h3 className="text-white font-semibold">خيارات التخصيص</h3>
              
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="bg-black/20 border border-white/20">
                  <TabsTrigger value="basic" className="text-white data-[state=active]:bg-cyan-500/20">
                    أساسي
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="text-white data-[state=active]:bg-cyan-500/20">
                    متقدم
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="text-white data-[state=active]:bg-cyan-500/20">
                    ذكاء اصطناعي
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    {selectedTemplate?.customizable.face_swap && (
                      <div className="flex items-center justify-between">
                        <label className="text-white text-sm">استبدال الوجه</label>
                        <Switch
                          checked={customizationSettings.faceSwap}
                          onCheckedChange={(checked) => 
                            setCustomizationSettings(prev => ({...prev, faceSwap: checked}))
                          }
                        />
                      </div>
                    )}

                    {selectedTemplate?.customizable.body_adjustment && (
                      <div className="flex items-center justify-between">
                        <label className="text-white text-sm">تعديل الجسم</label>
                        <Switch
                          checked={customizationSettings.bodyAdjustment}
                          onCheckedChange={(checked) => 
                            setCustomizationSettings(prev => ({...prev, bodyAdjustment: checked}))
                          }
                        />
                      </div>
                    )}

                    {selectedTemplate?.customizable.clothing_color && (
                      <div className="flex items-center justify-between">
                        <label className="text-white text-sm">تغيير لون الملابس</label>
                        <Switch
                          checked={customizationSettings.clothingColor}
                          onCheckedChange={(checked) => 
                            setCustomizationSettings(prev => ({...prev, clothingColor: checked}))
                          }
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    {selectedTemplate?.customizable.lighting_control && (
                      <div>
                        <label className="text-white text-sm mb-2 block">التحكم في الإضاءة</label>
                        <Slider
                          defaultValue={[selectedTemplate.lighting.intensity]}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-white text-sm mb-2 block">جودة الإخراج</label>
                      <Select defaultValue="high">
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">عادية (1080p)</SelectItem>
                          <SelectItem value="high">عالية (2K)</SelectItem>
                          <SelectItem value="ultra">فائقة (4K)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ai" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-3">نماذج الذكاء الاصطناعي المستخدمة</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">الوجه:</span>
                          <span className="text-cyan-400">{selectedTemplate?.aiModels.face_model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">الوضعية:</span>
                          <span className="text-cyan-400">{selectedTemplate?.aiModels.pose_model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">التحسين:</span>
                          <span className="text-cyan-400">{selectedTemplate?.aiModels.enhancement_model}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  onClick={handleStartCreation}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  بدء الإنشاء
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  حفظ الإعدادات
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          🎨 Elysian Canvas - معرض الفن للبالغين
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          أكثر من 50 تمبلت فني احترافي عالي الجودة مع إمكانيات تخصيص لا محدودة
        </p>
        
        {/* Stats */}
        <div className="flex justify-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{ARTISTIC_TEMPLATES.length}</div>
            <div className="text-white/60 text-sm">تمبلت متاح</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{getVIPTemplates().length}</div>
            <div className="text-white/60 text-sm">تمبلت VIP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">{Object.keys(TEMPLATE_CATEGORIES).length}</div>
            <div className="text-white/60 text-sm">فئة فنية</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center">
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as TemplateCategory | 'All')}>
          <TabsList className="bg-black/20 backdrop-blur-sm border border-white/20 p-1 rounded-xl flex-wrap max-w-4xl">
            <TabsTrigger value="All" className="text-white data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              الكل ({ARTISTIC_TEMPLATES.length})
            </TabsTrigger>
            {Object.entries(TEMPLATE_CATEGORIES).map(([category, info]) => (
              <TabsTrigger 
                key={category}
                value={category}
                className="text-white data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 relative"
              >
                {category} ({info.count})
                {info.isVIP && <Crown className="w-3 h-3 ml-1 text-yellow-400" />}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {/* VIP Notice */}
      {!userHasVIP && (
        <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/20 p-6 text-center">
          <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
          <h3 className="text-xl font-bold text-white mb-2">احصل على VIP للوصول الكامل</h3>
          <p className="text-white/70 mb-4">
            الوصول إلى {getVIPTemplates().length} تمبلت VIP حصري مع ميزات تخصيص متقدمة
          </p>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
            ترقية إلى VIP
          </Button>
        </Card>
      )}

      {/* Customization Modal */}
      {showCustomization && selectedTemplate && <CustomizationPanel />}
    </div>
  );
}