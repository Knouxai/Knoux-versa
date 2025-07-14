import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Cpu,
  HardDrive,
  Clock,
  Wifi,
  WifiOff,
  Server,
  MonitorSpeaker,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface PerformanceMetrics {
  system: {
    uptime: number;
    memory: {
      rss: number;
      heapUsed: number;
      heapTotal: number;
      external: number;
    };
    timestamp: string;
  };
  requests: {
    total: number;
    active: number;
    success: number;
    errors: number;
    successRate: string;
  };
  services: {
    total: number;
    queueLength: number;
    totalActive: number;
  };
  cache: {
    keys: number;
    hits: number;
    misses: number;
    ksize: number;
    vsize: number;
  };
}

interface ServiceStatus {
  available: boolean;
  localCount: number;
  cloudCount: number;
  totalServices: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(
    null,
  );
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const [metricsResponse, servicesResponse] = await Promise.all([
        fetch("/api/ai/metrics"),
        fetch("/api/ai/services"),
      ]);

      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json();
        if (metricsData.success) {
          setMetrics(metricsData.metrics);
        }
      }

      if (servicesResponse.ok) {
        const servicesData = await servicesResponse.json();
        if (servicesData.success) {
          const localCount = servicesData.services.filter(
            (s: any) => s.available,
          ).length;
          const cloudCount = servicesData.services.filter(
            (s: any) => !s.available,
          ).length;

          setServiceStatus({
            available: true,
            localCount,
            cloudCount,
            totalServices: servicesData.totalServices,
          });
        }
      }

      setLastUpdate(new Date());
    } catch (error) {
      console.error("خطأ في جلب المقاييس:", error);
      // في حالة عدم توفر الخادم، اعرض بيانات محلية
      setServiceStatus({
        available: false,
        localCount: 25, // عدد الأدوات المحلية
        cloudCount: 0,
        totalServices: 25,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // تحديث كل 30 ثانية

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}ساعة ${minutes}دقيقة`;
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusColor = (value: number, max: number, reverse = false) => {
    const percentage = (value / max) * 100;
    if (reverse) {
      if (percentage < 50) return "text-green-400";
      if (percentage < 80) return "text-yellow-400";
      return "text-red-400";
    } else {
      if (percentage > 80) return "text-green-400";
      if (percentage > 50) return "text-yellow-400";
      return "text-red-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Activity className="h-6 w-6 mr-2 text-cyan-400" />
          مراقب الأداء
        </h2>
        <div className="flex items-center space-x-4">
          <Badge
            className={`${isOnline ? "bg-green-500/20 text-green-400 border-green-400/50" : "bg-red-500/20 text-red-400 border-red-400/50"}`}
          >
            {isOnline ? (
              <Wifi className="h-3 w-3 mr-1" />
            ) : (
              <WifiOff className="h-3 w-3 mr-1" />
            )}
            {isOnline ? "متصل" : "غير متصل"}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={fetchMetrics}
            disabled={isLoading}
            className="bg-black/20 border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            تحديث
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Connection Status */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">حالة الاتصال</p>
              <p
                className={`text-lg font-bold ${isOnline ? "text-green-400" : "text-red-400"}`}
              >
                {isOnline ? "نشط" : "منقطع"}
              </p>
            </div>
            {isOnline ? (
              <CheckCircle className="h-8 w-8 text-green-400" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-red-400" />
            )}
          </div>
        </Card>

        {/* Services Status */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">الخدمات المتاحة</p>
              <p className="text-lg font-bold text-cyan-400">
                {serviceStatus?.localCount || 0} /{" "}
                {serviceStatus?.totalServices || 0}
              </p>
            </div>
            <Server className="h-8 w-8 text-cyan-400" />
          </div>
        </Card>

        {/* Active Requests */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">الطلبات النشطة</p>
              <p className="text-lg font-bold text-purple-400">
                {metrics?.requests.active || 0}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-400" />
          </div>
        </Card>

        {/* Success Rate */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">معدل النجاح</p>
              <p className="text-lg font-bold text-green-400">
                {metrics?.requests.successRate || "0%"}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Metrics */}
        {metrics && (
          <Card className="bg-black/20 backdrop-blur-sm border-white/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Cpu className="h-5 w-5 mr-2 text-cyan-400" />
              مقاييس النظام
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">وقت التشغيل</span>
                  <span className="text-cyan-400">
                    {formatUptime(metrics.system.uptime)}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">استخدام الذاكرة</span>
                  <span className="text-white/90">
                    {formatBytes(metrics.system.memory.heapUsed)} /{" "}
                    {formatBytes(metrics.system.memory.heapTotal)}
                  </span>
                </div>
                <Progress
                  value={
                    (metrics.system.memory.heapUsed /
                      metrics.system.memory.heapTotal) *
                    100
                  }
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">الذاكرة الخارجية</span>
                  <span className="text-purple-400">
                    {formatBytes(metrics.system.memory.external)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Request Metrics */}
        {metrics && (
          <Card className="bg-black/20 backdrop-blur-sm border-white/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <MonitorSpeaker className="h-5 w-5 mr-2 text-green-400" />
              إحصائيات الطلبات
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">المجموع</p>
                  <p className="text-xl font-bold text-white">
                    {metrics.requests.total}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">ناجحة</p>
                  <p className="text-xl font-bold text-green-400">
                    {metrics.requests.success}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">نشطة</p>
                  <p className="text-xl font-bold text-yellow-400">
                    {metrics.requests.active}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">أخطاء</p>
                  <p className="text-xl font-bold text-red-400">
                    {metrics.requests.errors}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">معدل النجاح</span>
                  <span className="text-green-400">
                    {metrics.requests.successRate}
                  </span>
                </div>
                <Progress
                  value={parseFloat(
                    metrics.requests.successRate.replace("%", ""),
                  )}
                  className="h-2"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Services Overview */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/20 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Server className="h-5 w-5 mr-2 text-purple-400" />
            نظرة عامة على الخدمات
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70">الخدمات المحلية</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-400/50">
                {serviceStatus?.localCount || 0} متاحة
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/70">الخدمات السحابية</span>
              <Badge
                className={`${isOnline ? "bg-blue-500/20 text-blue-400 border-blue-400/50" : "bg-gray-500/20 text-gray-400 border-gray-400/50"}`}
              >
                {isOnline
                  ? `${serviceStatus?.cloudCount || 0} متاحة`
                  : "غير متصل"}
              </Badge>
            </div>

            {metrics && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">طوابير الانتظار</span>
                  <span className="text-yellow-400">
                    {metrics.services.queueLength}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/70">معالجة نشطة</span>
                  <span className="text-orange-400">
                    {metrics.services.totalActive}
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Cache Statistics */}
        {metrics && (
          <Card className="bg-black/20 backdrop-blur-sm border-white/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <HardDrive className="h-5 w-5 mr-2 text-orange-400" />
              إحصائيات الكاش
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">المفاتيح</p>
                  <p className="text-xl font-bold text-white">
                    {metrics.cache.keys}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">النجاحات</p>
                  <p className="text-xl font-bold text-green-400">
                    {metrics.cache.hits}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">معدل النجاح</span>
                  <span className="text-green-400">
                    {metrics.cache.hits + metrics.cache.misses > 0
                      ? (
                          (metrics.cache.hits /
                            (metrics.cache.hits + metrics.cache.misses)) *
                          100
                        ).toFixed(1) + "%"
                      : "0%"}
                  </span>
                </div>
                <Progress
                  value={
                    metrics.cache.hits + metrics.cache.misses > 0
                      ? (metrics.cache.hits /
                          (metrics.cache.hits + metrics.cache.misses)) *
                        100
                      : 0
                  }
                  className="h-2"
                />
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Last Update */}
      {lastUpdate && (
        <div className="text-center text-white/50 text-sm">
          آخر تحديث: {lastUpdate.toLocaleString("ar-SA")}
        </div>
      )}
    </div>
  );
}
