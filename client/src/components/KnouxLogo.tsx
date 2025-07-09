import React from 'react';

interface KnouxLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function KnouxLogo({ size = 'medium', className = '' }: KnouxLogoProps) {
  const sizeClasses = {
    small: 'w-32 h-16',
    medium: 'w-48 h-24',
    large: 'w-64 h-32'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Logo Background Glass Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl" />
      </div>
      
      {/* Logo Text */}
      <div className="relative flex items-center justify-center h-full px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-white font-bold text-2xl tracking-wider">KNOUX</span>
            <div className="relative">
              <span className="text-yellow-400 font-bold text-2xl tracking-wider">VERSE</span>
              {/* +18 Badge */}
              <div className="absolute -top-2 -right-6 bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                +18
              </div>
            </div>
          </div>
          
          {/* Sparkle Effects */}
          <div className="absolute -top-1 left-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-yellow-300">
              <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="absolute -bottom-1 right-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-purple-300">
              <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="absolute top-2 right-2">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-blue-300">
              <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}