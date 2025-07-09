import React from 'react';
import { KnouxLogo } from './KnouxLogo';

const services = [
  {
    id: 'magic-transform',
    nameAr: 'التحويل السحري',
    nameEn: 'Magic Transform',
    icon: '✨',
    description: 'تحويل وتعديل الصور بطرق سحرية مذهلة',
    category: 'transform',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'remove-replace',
    nameAr: 'إزالة واستبدال',
    nameEn: 'Remove & Replace',
    icon: '🔄',
    description: 'إزالة الكائنات واستبدالها بأخرى جديدة',
    category: 'edit',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'style-transfer',
    nameAr: 'نقل الأسلوب',
    nameEn: 'Style Transfer',
    icon: '🎨',
    description: 'تطبيق أساليب فنية مختلفة على الصور',
    category: 'artistic',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'text-image-add',
    nameAr: 'إضافة نص للصورة',
    nameEn: 'Text2Image Add',
    icon: '📝',
    description: 'إضافة عناصر جديدة للصورة بالنص',
    category: 'generate',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'background-replace',
    nameAr: 'استبدال الخلفية',
    nameEn: 'Background Replace',
    icon: '🌆',
    description: 'تغيير خلفيات الصور بطريقة احترافية',
    category: 'background',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'object-recolor',
    nameAr: 'إعادة تلوين الكائنات',
    nameEn: 'Object Recolor',
    icon: '🎭',
    description: 'تغيير ألوان الكائنات في الصور',
    category: 'color',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'ai-enhance',
    nameAr: 'التحسين بالذكاء الاصطناعي',
    nameEn: 'AI Enhance',
    icon: '⚡',
    description: 'تحسين جودة ووضوح الصور تلقائياً',
    category: 'enhance',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'vip-magic-morph',
    nameAr: 'التحويل السحري المتقدم',
    nameEn: 'VIP Magic Morph',
    icon: '💎',
    description: 'تحويلات متقدمة وحصرية للمشتركين VIP',
    category: 'vip',
    color: 'from-yellow-400 to-yellow-600'
  }
];

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
          منصة الذكاء الاصطناعي المتقدمة لتحويل وتعديل الصور بطرق إبداعية لا محدودة
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onServiceSelect(service.id)}
              className={`
                group cursor-pointer relative overflow-hidden rounded-2xl
                transition-all duration-300 hover:scale-105 hover:z-10
                ${selectedService === service.id ? 'ring-2 ring-yellow-400 scale-105' : ''}
              `}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20" />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative p-6 h-48 flex flex-col justify-between">
                {/* Icon and Category */}
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{service.icon}</div>
                  {service.category === 'vip' && (
                    <div className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                      VIP
                    </div>
                  )}
                </div>
                
                {/* Service Name */}
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-yellow-300 transition-colors">
                    {service.nameAr}
                  </h3>
                  <p className="text-white/70 text-sm font-medium">
                    {service.nameEn}
                  </p>
                </div>
                
                {/* Description */}
                <p className="text-white/60 text-sm text-center leading-relaxed">
                  {service.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Selection Indicator */}
              {selectedService === service.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-black rounded-full" />
                </div>
              )}
              
              {/* Sparkle Effect on Hover */}
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-yellow-300">
                  <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-white/80 text-sm">
              ⚡ جميع الخدمات متاحة مجاناً • 💎 خدمات VIP للمشتركين المميزين
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}