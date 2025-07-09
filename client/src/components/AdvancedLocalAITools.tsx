import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/useLanguage";
import { AI_TOOLS_DATABASE, ToolsDatabase } from "@/data/aiToolsDatabase";
import { AiTool, AiToolUtils, TOOL_CATEGORIES } from "@/types/aiTools";
import { Download, Play, Settings, Info, Star, Clock, Cpu, HardDrive } from "lucide-react";

interface AdvancedLocalAIToolsProps {
  selectedTool?: string;
  onToolSelect: (tool: AiTool) => void;
}

export function AdvancedLocalAITools({
  selectedTool,
  onToolSelect,
}: AdvancedLocalAIToolsProps) {
  const { t, currentLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [downloadingTools, setDownloadingTools] = useState<Set<string>>(new Set());
  const [installedTools, setInstalledTools] = useState<Set<string>>(new Set(["face_swap", "beauty_filter", "hd_boost"]));

  const tools = AI_TOOLS_DATABASE;

  const filteredTools = useMemo(() => {
    let filtered = tools;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((tool) => 
        AiToolUtils.getName(tool, currentLanguage).toLowerCase().includes(query) ||
        AiToolUtils.getDescription(tool, currentLanguage).toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tools, selectedCategory, searchQuery, currentLanguage]);

  const categories = [
    { id: "all", name: "جميع الأدوات", nameEn: "All Tools", color: "text-cyan-400", icon: "🌟" },
    { id: "Face", name: "أدوات الوجه", nameEn: "Face Tools", color: "text-pink-400", icon: "👤" },
    { id: "Body", name: "أدوات الجسم", nameEn: "Body Tools", color: "text-purple-400", icon: "🏃‍♂️" },
    { id: "Background", name: "الخلفيات", nameEn: "Background", color: "text-green-400", icon: "🌄" },
    { id: "Artistic", name: "أدوات فنية", nameEn: "Artistic", color: "text-orange-400", icon: "🎨" },
    { id: "Technical Enhancement", name: "تحسين تقني", nameEn: "Technical", color: "text-blue-400", icon: "⚙️" },
    { id: "Creative", name: "إبداعية", nameEn: "Creative", color: "text-yellow-400", icon: "✨" }
  ];

  const handleDownload = async (tool: AiTool) => {
    setDownloadingTools(prev => new Set([...prev, tool.id]));
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setDownloadingTools(prev => {
      const newSet = new Set(prev);
      newSet.delete(tool.id);
      return newSet;
    });
    
    setInstalledTools(prev => new Set([...prev, tool.id]));
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return currentLanguage === "ar" ? category?.name || categoryId : category?.nameEn || categoryId;
  };

  const getComplexityColor = (complexity: string | undefined) => {
    switch (complexity) {
      case "low": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-red-400";
      default: return "text-cyan-400";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          {currentLanguage === "ar" ? "الأدوات المحلية المتقدمة" : "Advanced Local AI Tools"}
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          {currentLanguage === "ar" 
            ? "مجموعة شاملة من أدوات الذكاء الاصطناعي المحلية للمعالجة الفورية والآمنة"
            : "Comprehensive collection of local AI tools for instant and secure processing"
          }
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <Input
              placeholder={currentLanguage === "ar" ? "البحث في الأدوات..." : "Search tools..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/20 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="text-white/70 text-sm flex items-center justify-end">
            <span className="mr-2">{filteredTools.length} أداة متاحة</span>
            <Star className="h-4 w-4 text-yellow-400" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`
                transition-all duration-300 
                ${selectedCategory === category.id 
                  ? `bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-400` 
                  : `bg-black/20 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30`
                }
              `}
            >
              <span className="mr-2">{category.icon}</span>
              {currentLanguage === "ar" ? category.name : category.nameEn}
            </Button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
        {filteredTools.map((tool) => {
          const isDownloading = downloadingTools.has(tool.id);
          const isInstalled = installedTools.has(tool.id);
          
          return (
            <Card 
              key={tool.id}
              className={`
                group relative overflow-hidden transition-all duration-500 cursor-pointer
                bg-black/20 backdrop-blur-sm border hover:bg-black/30
                ${selectedTool === tool.id 
                  ? 'border-cyan-400/60 shadow-lg shadow-cyan-400/20' 
                  : 'border-white/20 hover:border-white/40'
                }
              `}
              onClick={() => onToolSelect(tool)}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                {isInstalled ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-400/50">
                    <Download className="h-3 w-3 mr-1" />
                    مثبت
                  </Badge>
                ) : isDownloading ? (
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/50">
                    <Download className="h-3 w-3 mr-1 animate-bounce" />
                    جاري التحميل
                  </Badge>
                ) : (
                  <Badge className="bg-gray-500/20 text-gray-400 border-gray-400/50">
                    غير مثبت
                  </Badge>
                )}
              </div>

              {/* Sensitive Content Warning */}
              {tool.is_sensitive && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-red-500/20 text-red-400 border-red-400/50">
                    🔞 محتوى حساس
                  </Badge>
                </div>
              )}

              <div className="p-6">
                {/* Tool Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {AiToolUtils.getName(tool, currentLanguage)}
                    </h3>
                    <div className="text-2xl">
                      {categories.find(cat => cat.id === tool.category)?.icon || "🔧"}
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                    {getCategoryName(tool.category)}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {AiToolUtils.getDescription(tool, currentLanguage)}
                </p>

                {/* Model Information */}
                <div className="bg-black/30 rounded-lg p-3 mb-4">
                  <div className="text-white/90 font-medium text-sm mb-2">
                    📊 {tool.model_info.name}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center text-white/60">
                      <HardDrive className="h-3 w-3 mr-1" />
                      {tool.model_info.size_gb}GB
                    </div>
                    <div className="flex items-center text-white/60">
                      <Clock className="h-3 w-3 mr-1" />
                      {tool.model_info.processing_time_secs}ث
                    </div>
                  </div>
                  {tool.model_info.gpu_required && (
                    <div className="flex items-center text-purple-400 text-xs mt-1">
                      <Cpu className="h-3 w-3 mr-1" />
                      يتطلب GPU ({tool.model_info.min_vram_gb}GB VRAM)
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="text-white/80 text-sm font-medium mb-2">
                    ✨ المميزات:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {AiToolUtils.getFeatures(tool, currentLanguage).slice(0, 3).map((feature, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="text-xs bg-white/5 border-white/20 text-white/70"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Download Progress */}
                {isDownloading && (
                  <div className="mb-4">
                    <Progress value={66} className="h-2" />
                    <div className="text-xs text-white/60 mt-1">جاري تحميل النموذج...</div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {isInstalled ? (
                    <>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToolSelect(tool);
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        تشغيل
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-black/20 border-white/20 text-white hover:bg-white/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(tool);
                      }}
                      disabled={isDownloading}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isDownloading ? "جاري التحميل..." : "تحميل"}
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-black/20 border-white/20 text-white hover:bg-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">
            {currentLanguage === "ar" ? "لا توجد أدوات مطابقة" : "No matching tools"}
          </h3>
          <p className="text-white/60">
            {currentLanguage === "ar" 
              ? "جرب تغيير معايير البحث أو الفلتر"
              : "Try changing your search criteria or filters"
            }
          </p>
        </div>
      )}
    </div>
  );
}