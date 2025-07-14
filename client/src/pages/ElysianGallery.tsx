import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Palette,
  Sparkles,
  Crown,
  Star,
  Eye,
  Download,
  Share2,
  Heart,
  Settings,
  Filter,
  Grid,
  List,
  Search,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import ElysianCanvas from "../components/ElysianCanvas";
import ElysianCanvasFilters, {
  FilterOptions,
} from "../components/ElysianCanvasFilters";
import ElysianVIPManager from "../components/ElysianVIPManager";
import {
  ELYSIAN_TEMPLATES,
  getElysianTemplatesByCategory,
  searchElysianTemplates,
  getFeaturedElysianTemplates,
  getVIPElysianTemplates,
  getFreeElysianTemplates,
  getElysianStatistics,
  ElysianTemplate,
} from "../data/elysianCanvasTemplates";

interface VIPStatus {
  isVIP: boolean;
  tier: "gold" | "platinum" | "diamond" | null;
  expiresAt: Date | null;
  dailyUsage: number;
  dailyLimit: number;
  concurrentLimit: number;
  features: string[];
  sessionKey?: string;
}

const ElysianGallery: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<ElysianTemplate | null>(null);
  const [vipStatus, setVipStatus] = useState<VIPStatus>({
    isVIP: false,
    tier: null,
    expiresAt: null,
    dailyUsage: 0,
    dailyLimit: 10,
    concurrentLimit: 1,
    features: [],
  });
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    category: "all",
    isVIP: null,
    featured: null,
    qualityLevel: [],
    mood: [],
    lightingStyle: [],
    difficulty: [],
    artisticValue: [0, 10],
    technicalComplexity: [0, 10],
    popularity: [0, 100],
    sortBy: "popularity",
    sortOrder: "desc",
  });
  const [activeTab, setActiveTab] = useState("gallery");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const statistics = useMemo(() => getElysianStatistics(), []);

  // فلترة وترتيب القوالب
  const filteredAndSortedTemplates = useMemo(() => {
    let templates = [...ELYSIAN_TEMPLATES];

    // تطبيق الفلاتر
    if (currentFilters.category !== "all") {
      templates = templates.filter(
        (t) => t.category === currentFilters.category,
      );
    }

    if (currentFilters.isVIP !== null) {
      templates = templates.filter((t) => t.isVIP === currentFilters.isVIP);
    }

    if (currentFilters.featured !== null) {
      templates = templates.filter(
        (t) => t.featured === currentFilters.featured,
      );
    }

    if (currentFilters.qualityLevel.length > 0) {
      templates = templates.filter((t) =>
        currentFilters.qualityLevel.includes(t.qualityLevel),
      );
    }

    if (currentFilters.mood.length > 0) {
      templates = templates.filter((t) => currentFilters.mood.includes(t.mood));
    }

    if (currentFilters.lightingStyle.length > 0) {
      templates = templates.filter((t) =>
        currentFilters.lightingStyle.includes(t.lightingStyle),
      );
    }

    if (currentFilters.difficulty.length > 0) {
      templates = templates.filter((t) =>
        currentFilters.difficulty.includes(t.difficulty),
      );
    }

    // فلترة حسب المدى
    templates = templates.filter(
      (t) =>
        t.artisticValue >= currentFilters.artisticValue[0] &&
        t.artisticValue <= currentFilters.artisticValue[1] &&
        t.technicalComplexity >= currentFilters.technicalComplexity[0] &&
        t.technicalComplexity <= currentFilters.technicalComplexity[1] &&
        t.popularity >= currentFilters.popularity[0] &&
        t.popularity <= currentFilters.popularity[1],
    );

    // الترتيب
    templates.sort((a, b) => {
      let aValue: number, bValue: number;

      switch (currentFilters.sortBy) {
        case "artisticValue":
          aValue = a.artisticValue;
          bValue = b.artisticValue;
          break;
        case "technicalComplexity":
          aValue = a.technicalComplexity;
          bValue = b.technicalComplexity;
          break;
        case "featured":
          aValue = a.featured ? 1 : 0;
          bValue = b.featured ? 1 : 0;
          break;
        case "newest":
          // محاكاة تاريخ الإنشاء
          aValue = ELYSIAN_TEMPLATES.indexOf(a);
          bValue = ELYSIAN_TEMPLATES.indexOf(b);
          break;
        case "popularity":
        default:
          aValue = a.popularity;
          bValue = b.popularity;
          break;
      }

      return currentFilters.sortOrder === "asc"
        ? aValue - bValue
        : bValue - aValue;
    });

    return templates;
  }, [currentFilters]);

  const handleTemplateSelect = (template: ElysianTemplate) => {
    if (template.isVIP && !vipStatus.isVIP) {
      return; // سيتم التعامل معه في المكون
    }
    setSelectedTemplate(template);
    setActiveTab("editor");
  };

  const handleImageProcess = async (imageFile: File) => {
    if (!selectedTemplate) return;

    setIsProcessing(true);
    try {
      // محاكاة معالجة الصورة
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // هنا يتم استدعاء API الحقيقي لمعالجة الصورة
      console.log("Processing image with template:", selectedTemplate.id);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getTierBadge = (tier: string | null) => {
    switch (tier) {
      case "gold":
        return (
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
            🥇 ذهبي
          </Badge>
        );
      case "platinum":
        return (
          <Badge className="bg-gradient-to-r from-gray-400 to-gray-600 text-white">
            🥈 بلاتيني
          </Badge>
        );
      case "diamond":
        return (
          <Badge className="bg-gradient-to-r from-blue-400 to-purple-600 text-white">
            💎 ماسي
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة
              </Button>

              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-purple-400" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Elysian Canvas
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getTierBadge(vipStatus.tier)}
              <Badge
                variant="outline"
                className="border-gray-400 text-gray-300"
              >
                {filteredAndSortedTemplates.length} قالب
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8 bg-white/10">
            <TabsTrigger
              value="gallery"
              className="data-[state=active]:bg-purple-500"
            >
              <Grid className="h-4 w-4 mr-2" />
              المعرض
            </TabsTrigger>
            <TabsTrigger
              value="vip"
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              <Crown className="h-4 w-4 mr-2" />
              VIP
            </TabsTrigger>
            <TabsTrigger
              value="editor"
              className="data-[state=active]:bg-blue-500"
            >
              <Settings className="h-4 w-4 mr-2" />
              المحرر
            </TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-8">
            {/* Statistics Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {statistics.total}
                  </div>
                  <div className="text-sm text-gray-300">إجمالي القوالب</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {statistics.vipCount}
                  </div>
                  <div className="text-sm text-gray-300">قوالب VIP</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {statistics.featuredCount}
                  </div>
                  <div className="text-sm text-gray-300">قوالب مميزة</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {statistics.averageArtisticValue.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-300">متوسط الجودة</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Filters */}
            <ElysianCanvasFilters
              onFiltersChange={setCurrentFilters}
              totalResults={filteredAndSortedTemplates.length}
              isVIPUser={vipStatus.isVIP}
            />

            {/* Templates Gallery */}
            <ElysianCanvas
              onTemplateSelect={handleTemplateSelect}
              isVIPUser={vipStatus.isVIP}
              language="ar"
            />
          </TabsContent>

          {/* VIP Tab */}
          <TabsContent value="vip" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ElysianVIPManager
                onVIPStatusChange={setVipStatus}
                currentTemplate={selectedTemplate}
              />
            </motion.div>

            {/* VIP Templates Quick Access */}
            {vipStatus.isVIP && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-400" />
                      قوالب VIP الحصرية
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getVIPElysianTemplates()
                        .slice(0, 6)
                        .map((template) => (
                          <motion.div
                            key={template.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleTemplateSelect(template)}
                            className="bg-white/5 rounded-lg p-4 cursor-pointer border border-white/10 hover:border-purple-500/50 transition-all"
                          >
                            <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                              <div className="text-3xl">🎨</div>
                              <Badge className="absolute top-2 right-2 bg-yellow-500 text-black text-xs">
                                VIP
                              </Badge>
                            </div>
                            <h4 className="font-medium text-white mb-1">
                              {template.nameAr}
                            </h4>
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {template.descriptionAr}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="h-3 w-3 fill-current" />
                                <span className="text-xs">
                                  {template.popularity}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* Editor Tab */}
          <TabsContent value="editor" className="space-y-8">
            {selectedTemplate ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Template Info */}
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="aspect-square w-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-4xl">🎨</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-2xl font-bold text-white">
                            {selectedTemplate.nameAr}
                          </h2>
                          {selectedTemplate.isVIP && (
                            <Badge className="bg-yellow-500 text-black">
                              <Crown className="h-3 w-3 mr-1" />
                              VIP
                            </Badge>
                          )}
                          {selectedTemplate.featured && (
                            <Badge className="bg-purple-500">
                              <Star className="h-3 w-3 mr-1" />
                              مميز
                            </Badge>
                          )}
                        </div>

                        <p className="text-gray-300 mb-4">
                          {selectedTemplate.descriptionAr}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">الفئة:</span>
                            <div className="text-white font-medium">
                              {selectedTemplate.categoryAr}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400">المزاج:</span>
                            <div className="text-white font-medium">
                              {selectedTemplate.moodAr}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400">الجودة:</span>
                            <div className="text-white font-medium">
                              {selectedTemplate.qualityLevel}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400">
                              الوقت المتوقع:
                            </span>
                            <div className="text-white font-medium">
                              {selectedTemplate.estimatedTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Image Upload and Processing */}
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      تحميل ومعالجة الصورة
                    </h3>

                    {!selectedImage ? (
                      <div className="border-2 border-dashed border-white/30 rounded-lg p-12 text-center">
                        <div className="text-6xl mb-4">📸</div>
                        <h4 className="text-lg font-medium text-white mb-2">
                          اختر صورة للمعالجة
                        </h4>
                        <p className="text-gray-400 mb-6">
                          اسحب وأفلت الصورة هنا أو انقر للاختيار
                        </p>
                        <Button className="bg-purple-500 hover:bg-purple-600">
                          <Eye className="h-4 w-4 mr-2" />
                          اختيار صورة
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-4xl">🖼️</span>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={() =>
                              handleImageProcess(new File([], "test.jpg"))
                            }
                            disabled={isProcessing}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            {isProcessing ? (
                              <>
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                                جاري المعالجة...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4 mr-2" />
                                بدء المعالجة
                              </>
                            )}
                          </Button>

                          <Button variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            إعدادات متقدمة
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  اختر قالباً للبدء
                </h3>
                <p className="text-gray-400 mb-6">
                  انتقل إلى المعرض واختر قالباً للبدء في المعالجة
                </p>
                <Button
                  onClick={() => setActiveTab("gallery")}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Grid className="h-4 w-4 mr-2" />
                  تصفح المعرض
                </Button>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ElysianGallery;
