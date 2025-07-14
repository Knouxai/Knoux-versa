import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  SlidersHorizontal,
  Crown,
  Star,
  Palette,
  Clock,
  TrendingUp,
  X,
  ChevronDown,
  Sparkles,
  Zap,
  Eye,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  ELYSIAN_CATEGORIES,
  ElysianTemplate,
} from "../data/elysianCanvasTemplates";

export interface FilterOptions {
  category: string;
  isVIP: boolean | null;
  featured: boolean | null;
  qualityLevel: string[];
  mood: string[];
  lightingStyle: string[];
  difficulty: string[];
  artisticValue: [number, number];
  technicalComplexity: [number, number];
  popularity: [number, number];
  sortBy:
    | "popularity"
    | "artisticValue"
    | "technicalComplexity"
    | "featured"
    | "newest";
  sortOrder: "asc" | "desc";
}

interface ElysianCanvasFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  totalResults: number;
  isVIPUser?: boolean;
}

const QUALITY_LEVELS = [
  { value: "ultra", label: "فائق", color: "from-purple-500 to-pink-500" },
  { value: "premium", label: "مميز", color: "from-blue-500 to-indigo-500" },
  { value: "high", label: "عالي", color: "from-green-500 to-teal-500" },
];

const MOOD_OPTIONS = [
  { value: "seductive", label: "مغري", emoji: "💋" },
  { value: "elegant", label: "أنيق", emoji: "👑" },
  { value: "mysterious", label: "غامض", emoji: "🌙" },
  { value: "romantic", label: "رومانسي", emoji: "💕" },
  { value: "powerful", label: "قوي", emoji: "⚡" },
  { value: "intimate", label: "حميمي", emoji: "💖" },
  { value: "artistic", label: "فني", emoji: "🎨" },
  { value: "fantasy", label: "خيالي", emoji: "✨" },
];

const LIGHTING_STYLES = [
  { value: "soft", label: "ناعم", icon: "☀️" },
  { value: "dramatic", label: "دراماتيكي", icon: "🎭" },
  { value: "natural", label: "طبيعي", icon: "🌿" },
  { value: "neon", label: "نيون", icon: "💡" },
  { value: "candlelight", label: "ضوء الشموع", icon: "🕯️" },
  { value: "moonlight", label: "ضوء القمر", icon: "🌙" },
  { value: "golden", label: "ذهبي", icon: "✨" },
  { value: "ambient", label: "محيطي", icon: "🌈" },
];

const DIFFICULTY_LEVELS = [
  { value: "easy", label: "سهل", color: "text-green-400" },
  { value: "medium", label: "متوسط", color: "text-yellow-400" },
  { value: "advanced", label: "متقدم", color: "text-red-400" },
];

const SORT_OPTIONS = [
  { value: "popularity", label: "الشعبية", icon: TrendingUp },
  { value: "artisticValue", label: "القيمة الفنية", icon: Palette },
  {
    value: "technicalComplexity",
    label: "التعقيد التقني",
    icon: SlidersHorizontal,
  },
  { value: "featured", label: "المميز", icon: Star },
  { value: "newest", label: "الأحدث", icon: Clock },
];

const ElysianCanvasFilters: React.FC<ElysianCanvasFiltersProps> = ({
  onFiltersChange,
  totalResults,
  isVIPUser = false,
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
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

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const updateFilters = useCallback(
    (newFilters: Partial<FilterOptions>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      onFiltersChange(updatedFilters);

      // حساب عدد الفلاتر المفعلة
      let count = 0;
      if (updatedFilters.category !== "all") count++;
      if (updatedFilters.isVIP !== null) count++;
      if (updatedFilters.featured !== null) count++;
      if (updatedFilters.qualityLevel.length > 0) count++;
      if (updatedFilters.mood.length > 0) count++;
      if (updatedFilters.lightingStyle.length > 0) count++;
      if (updatedFilters.difficulty.length > 0) count++;
      if (
        updatedFilters.artisticValue[0] > 0 ||
        updatedFilters.artisticValue[1] < 10
      )
        count++;
      if (
        updatedFilters.technicalComplexity[0] > 0 ||
        updatedFilters.technicalComplexity[1] < 10
      )
        count++;
      if (
        updatedFilters.popularity[0] > 0 ||
        updatedFilters.popularity[1] < 100
      )
        count++;

      setActiveFilterCount(count);
    },
    [filters, onFiltersChange],
  );

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
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
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
    setActiveFilterCount(0);
  };

  const toggleArrayFilter = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter((item) => item !== value)
      : [...array, value];
  };

  return (
    <div className="mb-8">
      {/* Quick Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Categories Quick Access */}
        <div className="flex flex-wrap gap-2">
          {ELYSIAN_CATEGORIES.slice(0, 6).map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateFilters({ category: category.id })}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filters.category === category.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category.name} ({category.count})
            </motion.button>
          ))}
        </div>

        {/* VIP Filter */}
        <Button
          variant={filters.isVIP === true ? "default" : "outline"}
          size="sm"
          onClick={() =>
            updateFilters({ isVIP: filters.isVIP === true ? null : true })
          }
          className={
            filters.isVIP === true
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : ""
          }
        >
          <Crown className="h-3 w-3 mr-1" />
          VIP فقط
        </Button>

        {/* Featured Filter */}
        <Button
          variant={filters.featured === true ? "default" : "outline"}
          size="sm"
          onClick={() =>
            updateFilters({ featured: filters.featured === true ? null : true })
          }
          className={
            filters.featured === true ? "bg-purple-500 hover:bg-purple-600" : ""
          }
        >
          <Star className="h-3 w-3 mr-1" />
          مميز
        </Button>
      </div>

      {/* Advanced Filters and Sort */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Advanced Filters Button */}
        <div className="flex items-center gap-3">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                فلاتر متقدمة
                {activeFilterCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-purple-500 text-xs px-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-96 bg-slate-900 border-slate-700"
              align="start"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    فلاتر متقدمة
                  </h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quality Levels */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    مستوى الجودة
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {QUALITY_LEVELS.map((quality) => (
                      <motion.button
                        key={quality.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          updateFilters({
                            qualityLevel: toggleArrayFilter(
                              filters.qualityLevel,
                              quality.value,
                            ),
                          })
                        }
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          filters.qualityLevel.includes(quality.value)
                            ? `bg-gradient-to-r ${quality.color} text-white`
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        {quality.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    المزاج
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {MOOD_OPTIONS.map((mood) => (
                      <motion.button
                        key={mood.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          updateFilters({
                            mood: toggleArrayFilter(filters.mood, mood.value),
                          })
                        }
                        className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                          filters.mood.includes(mood.value)
                            ? "bg-purple-500 text-white"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        <span>{mood.emoji}</span>
                        <span>{mood.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Lighting Style */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    نمط الإضاءة
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {LIGHTING_STYLES.map((lighting) => (
                      <motion.button
                        key={lighting.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          updateFilters({
                            lightingStyle: toggleArrayFilter(
                              filters.lightingStyle,
                              lighting.value,
                            ),
                          })
                        }
                        className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                          filters.lightingStyle.includes(lighting.value)
                            ? "bg-blue-500 text-white"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        <span>{lighting.icon}</span>
                        <span>{lighting.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    مستوى الصعوبة
                  </label>
                  <div className="flex gap-2">
                    {DIFFICULTY_LEVELS.map((difficulty) => (
                      <motion.button
                        key={difficulty.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          updateFilters({
                            difficulty: toggleArrayFilter(
                              filters.difficulty,
                              difficulty.value,
                            ),
                          })
                        }
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          filters.difficulty.includes(difficulty.value)
                            ? "bg-white text-black"
                            : `bg-white/10 ${difficulty.color} hover:bg-white/20`
                        }`}
                      >
                        {difficulty.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Range Sliders */}
                <div className="space-y-4">
                  {/* Artistic Value */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      القيمة الفنية: {filters.artisticValue[0]} -{" "}
                      {filters.artisticValue[1]}
                    </label>
                    <Slider
                      value={filters.artisticValue}
                      onValueChange={(value) =>
                        updateFilters({
                          artisticValue: value as [number, number],
                        })
                      }
                      max={10}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Technical Complexity */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      التعقيد التقني: {filters.technicalComplexity[0]} -{" "}
                      {filters.technicalComplexity[1]}
                    </label>
                    <Slider
                      value={filters.technicalComplexity}
                      onValueChange={(value) =>
                        updateFilters({
                          technicalComplexity: value as [number, number],
                        })
                      }
                      max={10}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Popularity */}
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      الشعبية: {filters.popularity[0]} - {filters.popularity[1]}
                    </label>
                    <Slider
                      value={filters.popularity}
                      onValueChange={(value) =>
                        updateFilters({ popularity: value as [number, number] })
                      }
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Results Count */}
          <div className="text-sm text-gray-400">
            <Eye className="h-4 w-4 inline mr-1" />
            {totalResults} نتيجة
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">ترتيب حسب:</span>
          <Select
            value={filters.sortBy}
            onValueChange={(value: any) => updateFilters({ sortBy: value })}
          >
            <SelectTrigger className="w-40 bg-white/10 border-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-white"
                >
                  <div className="flex items-center gap-2">
                    <option.icon className="h-4 w-4" />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updateFilters({
                sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
              })
            }
            className="px-3"
          >
            {filters.sortOrder === "asc" ? "↑" : "↓"}
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            <span className="text-sm text-gray-400">الفلاتر المفعلة:</span>

            {filters.category !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {
                  ELYSIAN_CATEGORIES.find((c) => c.id === filters.category)
                    ?.name
                }
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilters({ category: "all" })}
                />
              </Badge>
            )}

            {filters.isVIP === true && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-yellow-500 text-black"
              >
                <Crown className="h-3 w-3" />
                VIP
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilters({ isVIP: null })}
                />
              </Badge>
            )}

            {filters.featured === true && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-purple-500"
              >
                <Star className="h-3 w-3" />
                مميز
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilters({ featured: null })}
                />
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs"
            >
              مسح الكل
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElysianCanvasFilters;
