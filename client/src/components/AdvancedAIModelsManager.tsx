import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/useLanguage";
import { useLocalModels } from "@/hooks/useLocalModels";
import { 
  Download, 
  Play, 
  Settings, 
  Info, 
  Star, 
  Clock, 
  Cpu, 
  HardDrive,
  Eye,
  Image,
  MessageSquare,
  Trash2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export function AdvancedAIModelsManager() {
  const { currentLanguage } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [testingModel, setTestingModel] = useState<string>("");
  const [testPrompt, setTestPrompt] = useState<string>("");
  const [testImage, setTestImage] = useState<File | null>(null);

  const {
    availableModels,
    installedModels,
    isLoadingModels,
    downloadModel,
    isDownloading,
    generateText,
    isGeneratingText,
    textResult,
    generateImage,
    isGeneratingImage,
    imageResult,
    analyzeVision,
    isAnalyzingVision,
    visionResult,
    getModelsByType,
    isModelInstalled
  } = useLocalModels();

  const modelTypes = [
    { id: "all", name: "جميع النماذج", nameEn: "All Models", icon: "🤖", color: "text-cyan-400" },
    { id: "text", name: "توليد النصوص", nameEn: "Text Generation", icon: "📝", color: "text-green-400" },
    { id: "image", name: "توليد الصور", nameEn: "Image Generation", icon: "🎨", color: "text-purple-400" },
    { id: "vision", name: "تحليل الصور", nameEn: "Vision Analysis", icon: "👁️", color: "text-blue-400" },
    { id: "audio", name: "معالجة الصوت", nameEn: "Audio Processing", icon: "🎵", color: "text-orange-400" }
  ];

  const filteredModels = availableModels.filter(model => {
    const matchesType = selectedType === "all" || model.type === selectedType;
    const matchesSearch = !searchQuery || 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.nameAr.includes(searchQuery);
    return matchesType && matchesSearch;
  });

  const handleTestModel = async (modelId: string, type: string) => {
    if (!testPrompt) return;

    setTestingModel(modelId);
    
    try {
      switch (type) {
        case 'text':
          generateText({ modelId, prompt: testPrompt });
          break;
        case 'image':
          generateImage({ modelId, prompt: testPrompt });
          break;
        case 'vision':
          if (testImage) {
            analyzeVision({ modelId, imageFile: testImage, question: testPrompt });
          }
          break;
      }
    } catch (error) {
      console.error('Error testing model:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <MessageSquare className="h-5 w-5" />;
      case 'image': return <Image className="h-5 w-5" />;
      case 'vision': return <Eye className="h-5 w-5" />;
      case 'audio': return <span className="text-lg">🎵</span>;
      default: return <span className="text-lg">🤖</span>;
    }
  };

  const getPerformanceColor = (level: string) => {
    switch (level) {
      case 'fast': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'slow': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (isLoadingModels) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white/70">جاري تحميل النماذج...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          {currentLanguage === "ar" ? "إدارة نماذج الذكاء الاصطناعي" : "AI Models Manager"}
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          {currentLanguage === "ar" 
            ? "إدارة وتشغيل نماذج الذكاء الاصطناعي المحلية المجانية والقوية"
            : "Manage and run powerful free local AI models"
          }
        </p>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center text-green-400">
            <CheckCircle className="h-4 w-4 mr-1" />
            {installedModels.length} نماذج مثبتة
          </div>
          <div className="flex items-center text-cyan-400">
            <Download className="h-4 w-4 mr-1" />
            {availableModels.length} نماذج متاحة
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <Input
              placeholder={currentLanguage === "ar" ? "البحث في النماذج..." : "Search models..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/20 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="text-white/70 text-sm flex items-center justify-end">
            <span className="mr-2">{filteredModels.length} نموذج متاح</span>
            <Star className="h-4 w-4 text-yellow-400" />
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {modelTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type.id)}
              className={`
                transition-all duration-300 
                ${selectedType === type.id 
                  ? `bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-400` 
                  : `bg-black/20 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30`
                }
              `}
            >
              <span className="mr-2">{type.icon}</span>
              {currentLanguage === "ar" ? type.name : type.nameEn}
            </Button>
          ))}
        </div>
      </div>

      {/* Test Interface */}
      {testingModel && (
        <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-cyan-400/30 p-6">
          <h3 className="text-white font-bold mb-4">🧪 اختبار النموذج</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="أدخل النص للاختبار..."
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                className="bg-black/20 border-white/20 text-white mb-4"
              />
              {selectedType === 'vision' && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setTestImage(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
                />
              )}
            </div>
            <div className="bg-black/20 rounded-lg p-4 min-h-[100px]">
              {isGeneratingText || isGeneratingImage || isAnalyzingVision ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
                  <span className="ml-2 text-white/70">جاري المعالجة...</span>
                </div>
              ) : (
                <div className="text-white/70 text-sm">
                  {textResult && <p>{textResult}</p>}
                  {imageResult && <img src={imageResult} alt="Generated" className="max-w-full rounded" />}
                  {visionResult && <p>{visionResult}</p>}
                  {!textResult && !imageResult && !visionResult && "النتيجة ستظهر هنا..."}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Models Grid */}
      <div className="grid xl:grid-cols-2 gap-6">
        {filteredModels.map((model) => {
          const installed = isModelInstalled(model.id);
          
          return (
            <Card 
              key={model.id}
              className={`
                group relative overflow-hidden transition-all duration-500
                bg-black/20 backdrop-blur-sm border hover:bg-black/30
                ${installed 
                  ? 'border-green-400/60 shadow-lg shadow-green-400/20' 
                  : 'border-white/20 hover:border-white/40'
                }
              `}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                {installed ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-400/50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    مثبت
                  </Badge>
                ) : (
                  <Badge className="bg-gray-500/20 text-gray-400 border-gray-400/50">
                    غير مثبت
                  </Badge>
                )}
              </div>

              <div className="p-6">
                {/* Model Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {getTypeIcon(model.type)}
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {model.name}
                      </h3>
                    </div>
                    <p className="text-white/60 text-sm">{model.nameAr}</p>
                  </div>
                  <div className="text-2xl">
                    {modelTypes.find(t => t.id === model.type)?.icon || "🤖"}
                  </div>
                </div>

                {/* Model Specs */}
                <div className="bg-black/30 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-white/60">
                      <HardDrive className="h-4 w-4 mr-2" />
                      حجم النموذج: {model.size}
                    </div>
                    <div className="flex items-center text-white/60">
                      <Cpu className="h-4 w-4 mr-2" />
                      الذاكرة: {model.performance.memory}
                    </div>
                    <div className={`flex items-center ${getPerformanceColor(model.performance.speed)}`}>
                      <Clock className="h-4 w-4 mr-2" />
                      السرعة: {model.performance.speed === 'fast' ? 'سريع' : model.performance.speed === 'medium' ? 'متوسط' : 'بطيء'}
                    </div>
                    <div className="flex items-center text-white/60">
                      <Star className="h-4 w-4 mr-2" />
                      الجودة: {model.performance.quality === 'excellent' ? 'ممتازة' : model.performance.quality === 'good' ? 'جيدة' : 'احترافية'}
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mb-4">
                  <div className="text-white/80 text-sm font-medium mb-2">
                    ⚡ القدرات:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {model.capabilities.slice(0, 4).map((capability, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-xs bg-white/5 border-white/20 text-white/70"
                      >
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {installed ? (
                    <>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        onClick={() => setTestingModel(model.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        اختبار النموذج
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-black/20 border-white/20 text-white hover:bg-white/10"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                      onClick={() => downloadModel(model.id)}
                      disabled={isDownloading}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isDownloading ? "جاري التحميل..." : `تحميل (${model.size})`}
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-black/20 border-white/20 text-white hover:bg-white/10"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>

                {/* Download Progress */}
                {isDownloading && (
                  <div className="mt-4">
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between text-xs text-white/60 mt-1">
                      <span>جاري تحميل النموذج...</span>
                      <span>45%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredModels.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-xl font-bold text-white mb-2">
            لا توجد نماذج مطابقة
          </h3>
          <p className="text-white/60">
            جرب تغيير نوع النموذج أو معايير البحث
          </p>
        </div>
      )}
    </div>
  );
}