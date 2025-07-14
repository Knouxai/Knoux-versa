import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Lock,
  Unlock,
  Star,
  Zap,
  Shield,
  Users,
  Infinity,
  CheckCircle,
  X,
  Eye,
  Heart,
  Download,
  Settings,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  getVIPElysianTemplates,
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

interface ElysianVIPManagerProps {
  onVIPStatusChange?: (status: VIPStatus) => void;
  currentTemplate?: ElysianTemplate | null;
}

const VIP_TIERS = {
  gold: {
    name: "ذهبي",
    nameEn: "Gold",
    color: "from-yellow-400 to-orange-500",
    icon: "🥇",
    price: "$9.99",
    priceAr: "9.99$",
    dailyLimit: 100,
    concurrentLimit: 3,
    features: [
      "وصول لجميع القوالب المجانية",
      "معالجة أولوية",
      "جودة عالية",
      "دعم أولوي",
    ],
    featuresEn: [
      "Access to all free templates",
      "Priority processing",
      "High quality",
      "Priority support",
    ],
  },
  platinum: {
    name: "بلاتيني",
    nameEn: "Platinum",
    color: "from-gray-400 to-gray-600",
    icon: "🥈",
    price: "$19.99",
    priceAr: "19.99$",
    dailyLimit: 300,
    concurrentLimit: 5,
    features: [
      "جميع ميزات الذهبي",
      "70% من قوالب VIP",
      "معالجة فائقة السرعة",
      "تخصيص متقدم",
      "تصدير عالي الجودة",
    ],
    featuresEn: [
      "All Gold features",
      "70% of VIP templates",
      "Ultra-fast processing",
      "Advanced customization",
      "High quality export",
    ],
  },
  diamond: {
    name: "ماسي",
    nameEn: "Diamond",
    color: "from-blue-400 to-purple-600",
    icon: "💎",
    price: "$39.99",
    priceAr: "39.99$",
    dailyLimit: -1, // Unlimited
    concurrentLimit: 10,
    features: [
      "جميع ميزات البلاتيني",
      "وصول كامل لجميع قوالب VIP",
      "معالجة فورية",
      "قوالب حصرية",
      "API وصول",
      "دعم 24/7",
    ],
    featuresEn: [
      "All Platinum features",
      "Full access to all VIP templates",
      "Instant processing",
      "Exclusive templates",
      "API access",
      "24/7 support",
    ],
  },
};

const ElysianVIPManager: React.FC<ElysianVIPManagerProps> = ({
  onVIPStatusChange,
  currentTemplate,
}) => {
  const [vipStatus, setVipStatus] = useState<VIPStatus>({
    isVIP: false,
    tier: null,
    expiresAt: null,
    dailyUsage: 0,
    dailyLimit: 10,
    concurrentLimit: 1,
    features: [],
  });

  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showVIPKeyDialog, setShowVIPKeyDialog] = useState(false);
  const [vipKey, setVipKey] = useState("");
  const [isValidatingKey, setIsValidatingKey] = useState(false);
  const [keyError, setKeyError] = useState("");

  const statistics = getElysianStatistics();
  const vipTemplates = getVIPElysianTemplates();

  useEffect(() => {
    // محاولة استرداد حالة VIP من localStorage
    const savedVIPStatus = localStorage.getItem("elysian_vip_status");
    if (savedVIPStatus) {
      try {
        const parsed = JSON.parse(savedVIPStatus);
        if (parsed.expiresAt && new Date(parsed.expiresAt) > new Date()) {
          setVipStatus(parsed);
          onVIPStatusChange?.(parsed);
        } else {
          // انتهت الصلاحية
          localStorage.removeItem("elysian_vip_status");
        }
      } catch (error) {
        console.error("Error parsing VIP status:", error);
      }
    }
  }, [onVIPStatusChange]);

  const validateVIPKey = async (key: string) => {
    setIsValidatingKey(true);
    setKeyError("");

    try {
      // محاكاة استدعاء API للتحقق من مفتاح VIP
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // مفاتيح VIP للاختبار
      const testKeys = {
        ELYSIAN_GOLD_2025: "gold",
        ELYSIAN_PLATINUM_2025: "platinum",
        ELYSIAN_DIAMOND_2025: "diamond",
        ELYSIAN_VIP_ULTIMATE: "diamond",
      };

      const tier = testKeys[key as keyof typeof testKeys];

      if (tier) {
        const newVIPStatus: VIPStatus = {
          isVIP: true,
          tier: tier as "gold" | "platinum" | "diamond",
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          dailyUsage: 0,
          dailyLimit: VIP_TIERS[tier as keyof typeof VIP_TIERS].dailyLimit,
          concurrentLimit:
            VIP_TIERS[tier as keyof typeof VIP_TIERS].concurrentLimit,
          features: VIP_TIERS[tier as keyof typeof VIP_TIERS].features,
          sessionKey: `elysian_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };

        setVipStatus(newVIPStatus);
        localStorage.setItem(
          "elysian_vip_status",
          JSON.stringify(newVIPStatus),
        );
        onVIPStatusChange?.(newVIPStatus);
        setShowVIPKeyDialog(false);
        setVipKey("");
      } else {
        setKeyError("مفتاح VIP غير صحيح. يرجى التحقق والمحاولة مرة أخرى.");
      }
    } catch (error) {
      setKeyError("حدث خطأ في التحقق من المفتاح. يرجى المحاولة لاحقاً.");
    } finally {
      setIsValidatingKey(false);
    }
  };

  const upgradeToPlan = (tier: "gold" | "platinum" | "diamond") => {
    // محاكاة عملية الترقية
    const newVIPStatus: VIPStatus = {
      isVIP: true,
      tier,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      dailyUsage: 0,
      dailyLimit: VIP_TIERS[tier].dailyLimit,
      concurrentLimit: VIP_TIERS[tier].concurrentLimit,
      features: VIP_TIERS[tier].features,
    };

    setVipStatus(newVIPStatus);
    localStorage.setItem("elysian_vip_status", JSON.stringify(newVIPStatus));
    onVIPStatusChange?.(newVIPStatus);
    setShowUpgradeDialog(false);
  };

  const getDaysRemaining = () => {
    if (!vipStatus.expiresAt) return 0;
    const now = new Date();
    const expires = new Date(vipStatus.expiresAt);
    const diffTime = expires.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getUsagePercentage = () => {
    if (vipStatus.dailyLimit === -1) return 0; // Unlimited
    return Math.min(100, (vipStatus.dailyUsage / vipStatus.dailyLimit) * 100);
  };

  if (!vipStatus.isVIP) {
    return (
      <div className="space-y-6">
        {/* VIP Access Required Banner */}
        {currentTemplate?.isVIP && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔒</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  يتطلب وصول VIP
                </h3>
                <p className="text-gray-300">
                  هذا القالب متاح لأعضاء VIP فقط. قم بالترقية للوصول إلى{" "}
                  {statistics.vipCount} قالب حصري.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowVIPKeyDialog(true)}
                  variant="outline"
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  لدي مفتاح VIP
                </Button>
                <Button
                  onClick={() => setShowUpgradeDialog(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  ترقية الآن
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIP Benefits Overview */}
        <Card className="bg-gradient-to-br from-slate-900 to-purple-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Crown className="h-5 w-5 text-yellow-400" />
              مزايا عضوية VIP
            </CardTitle>
            <CardDescription className="text-gray-300">
              اكتشف القوة الكاملة لـ Elysian Canvas مع الوصول المتميز
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl mb-2">🎨</div>
                <div className="text-2xl font-bold text-purple-400">
                  {statistics.vipCount}
                </div>
                <div className="text-sm text-gray-400">قالب VIP حصري</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-blue-400">3x</div>
                <div className="text-sm text-gray-400">سرعة معالجة أسرع</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-red-400">Ultra</div>
                <div className="text-sm text-gray-400">جودة فائقة</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-center">
              <Button
                onClick={() => setShowVIPKeyDialog(true)}
                variant="outline"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
              >
                <Crown className="h-4 w-4 mr-2" />
                لدي مفتاح VIP
              </Button>
              <Button
                onClick={() => setShowUpgradeDialog(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Zap className="h-4 w-4 mr-2" />
                عرض خطط VIP
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* VIP Key Dialog */}
        <Dialog open={showVIPKeyDialog} onOpenChange={setShowVIPKeyDialog}>
          <DialogContent className="bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white">
                <Crown className="h-5 w-5 text-yellow-400" />
                تفعيل مفتاح VIP
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                أدخل مفتاح VIP الخاص بك للوصول إلى القوالب المميزة
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="أدخل مفتاح VIP..."
                  value={vipKey}
                  onChange={(e) => setVipKey(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
                {keyError && (
                  <p className="text-red-400 text-sm mt-2">{keyError}</p>
                )}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-medium text-blue-300 mb-2">
                  مفاتيح للاختبار:
                </h4>
                <div className="space-y-1 text-sm text-gray-300">
                  <div>
                    <code className="bg-white/10 px-2 py-1 rounded">
                      ELYSIAN_GOLD_2025
                    </code>{" "}
                    - ذهبي
                  </div>
                  <div>
                    <code className="bg-white/10 px-2 py-1 rounded">
                      ELYSIAN_PLATINUM_2025
                    </code>{" "}
                    - بلاتيني
                  </div>
                  <div>
                    <code className="bg-white/10 px-2 py-1 rounded">
                      ELYSIAN_DIAMOND_2025
                    </code>{" "}
                    - ماسي
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setShowVIPKeyDialog(false)}
                  variant="outline"
                  className="flex-1"
                  disabled={isValidatingKey}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={() => validateVIPKey(vipKey)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  disabled={!vipKey.trim() || isValidatingKey}
                >
                  {isValidatingKey ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      جاري التحقق...
                    </div>
                  ) : (
                    <>
                      <Unlock className="h-4 w-4 mr-2" />
                      تفعيل
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Upgrade Plans Dialog */}
        <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
          <DialogContent className="max-w-4xl bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center text-white">
                اختر خطة VIP المناسبة لك
              </DialogTitle>
              <DialogDescription className="text-center text-gray-300">
                ارتق بتجربتك الفنية مع الوصول الحصري والمميزات المتقدمة
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {Object.entries(VIP_TIERS).map(([tierKey, tier]) => (
                <motion.div
                  key={tierKey}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-6 rounded-xl border-2 ${
                    tierKey === "diamond"
                      ? "border-purple-500 bg-gradient-to-br from-purple-900/30 to-pink-900/30"
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  {tierKey === "diamond" && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1">
                        الأكثر شعبية
                      </Badge>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="text-4xl mb-3">{tier.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {tier.name}
                    </h3>
                    <div className="text-3xl font-bold text-white mb-1">
                      {tier.priceAr}
                    </div>
                    <div className="text-sm text-gray-400 mb-6">شهرياً</div>

                    <ul className="space-y-3 text-sm text-gray-300 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() =>
                        upgradeToPlan(
                          tierKey as "gold" | "platinum" | "diamond",
                        )
                      }
                      className={`w-full ${
                        tierKey === "diamond"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      اختيار {tier.name}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // VIP User Dashboard
  const currentTier = vipStatus.tier ? VIP_TIERS[vipStatus.tier] : null;
  const daysRemaining = getDaysRemaining();
  const usagePercentage = getUsagePercentage();

  return (
    <div className="space-y-6">
      {/* VIP Status Card */}
      <Card
        className={`bg-gradient-to-br ${currentTier?.color} border-0 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{currentTier?.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  VIP {currentTier?.name}
                </h3>
                <p className="text-white/80 text-sm">
                  عضو مميز • ينتهي في {daysRemaining} يوم
                </p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white">نشط</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">
                {vipStatus.dailyLimit === -1
                  ? "∞"
                  : `${vipStatus.dailyUsage}/${vipStatus.dailyLimit}`}
              </div>
              <div className="text-white/80 text-sm">الاستخدام اليومي</div>
              {vipStatus.dailyLimit !== -1 && (
                <Progress value={usagePercentage} className="mt-2 h-2" />
              )}
            </div>

            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">
                {vipStatus.concurrentLimit}
              </div>
              <div className="text-white/80 text-sm">معالجة متزامنة</div>
            </div>

            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">
                {statistics.vipCount}
              </div>
              <div className="text-white/80 text-sm">قالب متاح</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access to VIP Templates */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Star className="h-5 w-5 text-yellow-400" />
            قوالب VIP المتاحة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vipTemplates.slice(0, 8).map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 rounded-lg p-3 cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="text-sm font-medium text-white truncate">
                  {template.nameAr}
                </h4>
                <p className="text-xs text-gray-400 truncate">
                  {template.category}
                </p>
              </motion.div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-4 border-purple-500 text-purple-300 hover:bg-purple-500/10"
          >
            عرض جميع قوالب VIP ({statistics.vipCount})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElysianVIPManager;
