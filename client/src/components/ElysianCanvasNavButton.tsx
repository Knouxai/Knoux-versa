import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Crown, Star, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { useLocation } from "wouter";

interface ElysianCanvasNavButtonProps {
  className?: string;
  variant?: "full" | "compact" | "button";
}

const ElysianCanvasNavButton: React.FC<ElysianCanvasNavButtonProps> = ({
  className = "",
  variant = "full",
}) => {
  const [, setLocation] = useLocation();

  const handleNavigate = () => {
    setLocation("/elysian");
  };

  if (variant === "button") {
    return (
      <Button
        onClick={handleNavigate}
        className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white ${className}`}
      >
        <Sparkles className="h-4 w-4 mr-2" />
        Elysian Canvas
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleNavigate}
        className={`cursor-pointer ${className}`}
      >
        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:border-purple-400/50 transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎨</div>
                <div>
                  <h3 className="font-bold text-white">Elysian Canvas</h3>
                  <p className="text-sm text-gray-300">معرض الفن للبالغين</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-500 text-black text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP
                </Badge>
                <ArrowRight className="h-4 w-4 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Full variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleNavigate}
      className={`cursor-pointer ${className}`}
    >
      <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 hover:border-purple-400/50 transition-all relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-xl" />
        </div>

        <CardContent className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="text-4xl">🎨</div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </motion.div>
              </div>

              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Elysian Canvas
                </h2>
                <p className="text-gray-300">معرض الفن للبالغين المتقدم</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
                <Crown className="h-3 w-3 mr-1" />
                VIP متاح
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                <Star className="h-3 w-3 mr-1" />
                جديد
              </Badge>
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            أكثر من{" "}
            <span className="text-purple-400 font-bold">
              50 تمبلت فني احترافي
            </span>{" "}
            عالي الجودة مع إمكاني��ت تخصيص لا محدودة. استكشف عوالم فنية جديدة مع
            فلاتر متقدمة ونظام VIP حصري.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>15 فئة فنية متنوعة</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-pink-400 rounded-full" />
              <span>قوالب VIP حصرية</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>فلاتر ذكية متقدمة</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>جودة Ultra عالية</span>
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium group">
            <Sparkles className="h-4 w-4 mr-2" />
            استكشف المعرض الفني
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ElysianCanvasNavButton;
