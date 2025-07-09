import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KnouxLogo } from './KnouxLogo';
import { AI_SERVICES } from '../data/aiServicesDatabase';

interface EnhancedServiceGridProps {
  onServiceSelect: (serviceId: string) => void;
  selectedService?: string;
}

export function EnhancedServiceGrid({ onServiceSelect, selectedService }: EnhancedServiceGridProps) {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header with Logo */}
      <div className="flex flex-col items-center pt-8 pb-12">
        <KnouxLogo size="large" className="mb-6" />
        <p className="text-white/80 text-center max-w-2xl text-lg">
          منصة الذكاء الاصطناعي الأكثر تطوراً لتحويل وتحرير الصور بتقنيات متقدمة
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {AI_SERVICES.map((service) => (
          <Card
            key={service.id}
            onClick={() => onServiceSelect(service.id)}
            className={`
              group relative cursor-pointer transition-all duration-300 
              transform hover:scale-105 hover:shadow-2xl
              ${selectedService === service.id 
                ? 'ring-2 ring-white/50 shadow-2xl scale-105' 
                : 'hover:ring-1 hover:ring-white/30'
              }
              bg-gradient-to-br ${service.color} 
              backdrop-blur-md bg-opacity-20 border border-white/10 text-white
            `}
          >
            {/* VIP Badge */}
            {service.isVIP && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                VIP +18
              </div>
            )}
            
            <CardHeader className="text-center pb-2">
              <div className="text-4xl mb-2">
                {service.icon}
              </div>
              <CardTitle className="text-lg font-bold text-white group-hover:text-opacity-90">
                {service.nameAr}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors text-center mb-3">
                {service.descriptionAr}
              </p>
              
              <div className="flex flex-wrap gap-1 justify-center mb-3">
                <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                  {service.categoryAr}
                </Badge>
                <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                  {service.estimatedTime}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    service.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                    service.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}
                >
                  {service.difficulty === 'easy' ? 'سهل' : 
                   service.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                </Badge>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                اختر هذه الخدمة
              </Button>
            </CardContent>
            
            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <span className="text-white/80 text-sm">
            ⚡ {AI_SERVICES.filter(s => !s.isVIP).length} خدمة مجانية • 
            💎 {AI_SERVICES.filter(s => s.isVIP).length} خدمة VIP • 
            🎯 جميع الخدمات بدون قيود
          </span>
        </div>
      </div>
    </div>
  );
}