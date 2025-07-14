import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Crown,
  Lock,
  Star,
  Eye,
  Heart,
  Download,
  Zap,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ELYSIAN_TEMPLATES,
  ELYSIAN_CATEGORIES,
  getElysianTemplatesByCategory,
  getVIPElysianTemplates,
  getFreeElysianTemplates,
  getFeaturedElysianTemplates,
  searchElysianTemplates,
  getElysianStatistics,
  ElysianTemplate,
} from "../data/elysianCanvasTemplates";

interface ElysianCanvasProps {
  onTemplateSelect?: (template: ElysianTemplate) => void;
  isVIPUser?: boolean;
  language?: "ar" | "en";
}

const ElysianCanvas: React.FC<ElysianCanvasProps> = ({
  onTemplateSelect,
  isVIPUser = false,
  language = "ar",
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] =
    useState<ElysianTemplate | null>(null);
  const [showVIPModal, setShowVIPModal] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const statistics = useMemo(() => getElysianStatistics(), []);

  // فلترة القوالب بناءً على الفئة والبحث
  const filteredTemplates = useMemo(() => {
    let templates = searchQuery
      ? searchElysianTemplates(searchQuery, language)
      : getElysianTemplatesByCategory(selectedCategory);

    return templates.sort((a, b) => {
      // ترتيب حسب: featured أولاً، ثم popularity، ثم VIP
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (a.popularity !== b.popularity) return b.popularity - a.popularity;
      if (a.isVIP && !b.isVIP) return -1;
      if (!a.isVIP && b.isVIP) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, language]);

  const handleTemplateClick = (template: ElysianTemplate) => {
    if (template.isVIP && !isVIPUser) {
      setShowVIPModal(true);
      return;
    }
    setSelectedTemplate(template);
    onTemplateSelect?.(template);
  };

  const getQualityBadgeColor = (quality: string) => {
    switch (quality) {
      case "ultra":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "premium":
        return "bg-gradient-to-r from-blue-500 to-indigo-500";
      case "high":
        return "bg-gradient-to-r from-green-500 to-teal-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "seductive":
        return "💋";
      case "elegant":
        return "👑";
      case "mysterious":
        return "🌙";
      case "romantic":
        return "💕";
      case "powerful":
        return "⚡";
      case "intimate":
        return "💖";
      case "artistic":
        return "🎨";
      case "fantasy":
        return "✨";
      default:
        return "💫";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="relative container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🎨 Elysian Canvas
              </h1>
              <Sparkles className="h-8 w-8 text-purple-400 ml-3" />
            </div>
            <p className="text-xl text-gray-300 mb-8">
              معرض الفن للبالغين - أكثر من 50 تمبلت فني احترافي عالي الجودة
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-2xl font-bold text-purple-400">
                  {statistics.total}
                </div>
                <div className="text-sm text-gray-300">تمبلت متاح</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-2xl font-bold text-pink-400">
                  {statistics.vipCount}
                </div>
                <div className="text-sm text-gray-300">تمبلت VIP</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-2xl font-bold text-blue-400">
                  {ELYSIAN_CATEGORIES.length - 1}
                </div>
                <div className="text-sm text-gray-300">فئة فنية</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-2xl font-bold text-green-400">
                  {statistics.featuredCount}
                </div>
                <div className="text-sm text-gray-300">تمبلت مميز</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث في القوالب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              شبكة
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              قائمة
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {ELYSIAN_CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          <AnimatePresence>
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
                onHoverStart={() => setHoveredTemplate(template.id)}
                onHoverEnd={() => setHoveredTemplate(null)}
                className="cursor-pointer"
                onClick={() => handleTemplateClick(template)}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden group relative">
                  {/* Template Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={template.thumbnail}
                      alt={template.nameAr}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/api/placeholder/400/300";
                      }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* VIP Badge */}
                    {template.isVIP && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
                          <Crown className="h-3 w-3 mr-1" />
                          VIP
                        </Badge>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {template.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                          <Star className="h-3 w-3 mr-1" />
                          مميز
                        </Badge>
                      </div>
                    )}

                    {/* Quality Badge */}
                    <div className="absolute bottom-3 right-3">
                      <Badge
                        className={`${getQualityBadgeColor(template.qualityLevel)} text-white`}
                      >
                        {template.qualityLevel}
                      </Badge>
                    </div>

                    {/* Hover Actions */}
                    <AnimatePresence>
                      {hoveredTemplate === template.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="absolute bottom-3 left-3 flex gap-2"
                        >
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm"
                          >
                            <Heart className="h-3 w-3" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Template Info */}
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1 line-clamp-1">
                          {template.nameAr}
                        </h3>
                        <p className="text-sm text-gray-300 line-clamp-2">
                          {template.descriptionAr}
                        </p>
                      </div>
                      <div className="ml-2 text-2xl">
                        {getMoodEmoji(template.mood)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-purple-400 text-purple-300"
                        >
                          {
                            ELYSIAN_CATEGORIES.find(
                              (c) => c.id === template.category,
                            )?.name
                          }
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs border-blue-400 text-blue-300"
                        >
                          {template.typeAr}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs">{template.popularity}</span>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">القيمة الفنية</span>
                        <span className="text-purple-300">
                          {template.artisticValue}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${template.artisticValue * 10}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">التعقيد التقني</span>
                        <span className="text-blue-300">
                          {template.technicalComplexity}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-full transition-all duration-500"
                          style={{
                            width: `${template.technicalComplexity * 10}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Lock Indicator for VIP */}
                    {template.isVIP && !isVIPUser && (
                      <div className="mt-3 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                          <Lock className="h-3 w-3" />
                          <span className="text-xs font-medium">VIP مطلوب</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              لم يتم العثور على قوالب
            </h3>
            <p className="text-gray-400">
              جرب البحث بكلمات مختلفة أو اختر فئة أخرى
            </p>
          </motion.div>
        )}
      </div>

      {/* VIP Upgrade Modal */}
      <AnimatePresence>
        {showVIPModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowVIPModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl p-8 max-w-md w-full border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">👑</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  احصل على VIP للوصول الكامل
                </h3>
                <p className="text-gray-300 mb-6">
                  الوصول إلى {statistics.vipCount} تمبلت VIP حصري مع ميزات تخصيص
                  متقدمة
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-purple-300">
                    <Zap className="h-4 w-4" />
                    <span>قوالب حصرية عالية الجودة</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-300">
                    <Star className="h-4 w-4" />
                    <span>معالجة أولوية سريعة</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-300">
                    <Crown className="h-4 w-4" />
                    <span>ميزات تخصيص متقدمة</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
                  onClick={() => setShowVIPModal(false)}
                >
                  ترقية إلى VIP
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElysianCanvas;
