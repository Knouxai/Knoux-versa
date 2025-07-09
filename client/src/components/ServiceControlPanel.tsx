import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Play, RotateCcw } from 'lucide-react';
import { getServiceById } from '../data/aiServicesDatabase';

interface ServiceControlPanelProps {
  serviceId: string;
  onProcess: (parameters: Record<string, any>) => void;
  isProcessing: boolean;
}

export function ServiceControlPanel({ serviceId, onProcess, isProcessing }: ServiceControlPanelProps) {
  const service = getServiceById(serviceId);
  const [parameters, setParameters] = useState<Record<string, any>>({});

  if (!service) {
    return null;
  }

  // Initialize parameters with default values
  React.useEffect(() => {
    const defaultParams: Record<string, any> = {};
    service.parameters.forEach(param => {
      defaultParams[param.name] = param.defaultValue;
    });
    setParameters(defaultParams);
  }, [service]);

  const updateParameter = (paramName: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const resetToDefaults = () => {
    const defaultParams: Record<string, any> = {};
    service.parameters.forEach(param => {
      defaultParams[param.name] = param.defaultValue;
    });
    setParameters(defaultParams);
  };

  const handleProcess = () => {
    onProcess(parameters);
  };

  const renderParameter = (param: any) => {
    const value = parameters[param.name] ?? param.defaultValue;

    switch (param.type) {
      case 'slider':
        return (
          <div key={param.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-white">{param.nameAr}</Label>
              <span className="text-sm text-gray-300">{value}%</span>
            </div>
            <Slider
              value={[value]}
              onValueChange={(newValue) => updateParameter(param.name, newValue[0])}
              min={param.min || 0}
              max={param.max || 100}
              step={param.step || 1}
              className="w-full"
            />
          </div>
        );

      case 'select':
        return (
          <div key={param.name} className="space-y-2">
            <Label className="text-white">{param.nameAr}</Label>
            <Select value={value} onValueChange={(newValue) => updateParameter(param.name, newValue)}>
              <SelectTrigger className="w-full bg-black/20 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {param.options?.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.labelAr || option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'toggle':
        return (
          <div key={param.name} className="flex items-center justify-between">
            <Label className="text-white">{param.nameAr}</Label>
            <Switch
              checked={value}
              onCheckedChange={(newValue) => updateParameter(param.name, newValue)}
            />
          </div>
        );

      case 'color':
        return (
          <div key={param.name} className="space-y-2">
            <Label className="text-white">{param.nameAr}</Label>
            <Input
              type="color"
              value={value}
              onChange={(e) => updateParameter(param.name, e.target.value)}
              className="w-full h-10 bg-black/20 border-gray-600"
            />
          </div>
        );

      case 'text':
        return (
          <div key={param.name} className="space-y-2">
            <Label className="text-white">{param.nameAr}</Label>
            <Input
              type="text"
              value={value}
              onChange={(e) => updateParameter(param.name, e.target.value)}
              className="w-full bg-black/20 border-gray-600 text-white"
              placeholder={param.nameAr}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="bg-black/40 border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          إعدادات {service.nameAr}
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
            {service.categoryAr}
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            {service.estimatedTime}
          </Badge>
          {service.isVIP && (
            <Badge variant="secondary" className="bg-red-500/20 text-red-300">
              VIP +18
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Service Description */}
        <div className="p-4 bg-black/20 rounded-lg border border-white/10">
          <p className="text-sm text-gray-300">{service.descriptionAr}</p>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-medium text-white mb-2">المميزات:</h4>
          <div className="flex flex-wrap gap-1">
            {service.featuresAr.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-green-500/10 border-green-500/30 text-green-300">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Parameters */}
        {service.parameters.length > 0 && (
          <>
            <Separator className="bg-gray-600" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-white">إعدادات التخصيص:</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetToDefaults}
                  className="text-gray-400 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4 ml-1" />
                  إعادة تعيين
                </Button>
              </div>
              
              {service.parameters.map(renderParameter)}
            </div>
          </>
        )}

        {/* Limitations */}
        {service.limitationsAr && service.limitationsAr.length > 0 && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-red-300 mb-2">قيود الاستخدام:</h4>
            <ul className="text-xs text-red-200 space-y-1">
              {service.limitationsAr.map((limitation, index) => (
                <li key={index}>• {limitation}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Process Button */}
        <Button
          onClick={handleProcess}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full ml-2" />
              جاري المعالجة...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 ml-2" />
              بدء المعالجة
            </>
          )}
        </Button>

        {/* Supported Formats */}
        <div className="text-center">
          <p className="text-xs text-gray-400">
            الصيغ المدعومة: {service.supportedFormats.join(', ')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}