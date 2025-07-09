import React from 'react';

export function Enhanced3DBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main Purple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900" />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-600/20 to-blue-600/30 animate-pulse" />
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0">
        {/* Large 3D Pills */}
        <div className="absolute top-1/4 left-1/4 w-48 h-24 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-sm transform rotate-45 animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-32 h-16 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-full blur-sm transform -rotate-12 animate-float-medium" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-sm transform rotate-12 animate-float-fast" />
        
        {/* Medium 3D Elements */}
        <div className="absolute top-1/2 left-1/6 w-24 h-12 bg-gradient-to-r from-purple-400/40 to-blue-400/40 rounded-full blur-sm transform rotate-30 animate-float-medium" />
        <div className="absolute bottom-1/3 right-1/3 w-28 h-14 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full blur-sm transform -rotate-45 animate-float-slow" />
        
        {/* Small Floating Particles */}
        <div className="absolute top-1/5 right-1/5 w-12 h-6 bg-gradient-to-r from-yellow-400/50 to-orange-400/50 rounded-full blur-sm animate-float-fast" />
        <div className="absolute bottom-1/5 left-1/5 w-8 h-4 bg-gradient-to-r from-cyan-400/60 to-blue-400/60 rounded-full blur-sm animate-float-medium" />
        <div className="absolute top-2/3 left-2/3 w-10 h-5 bg-gradient-to-r from-green-400/40 to-teal-400/40 rounded-full blur-sm animate-float-slow" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/6 left-1/2 w-16 h-16 bg-purple-400/20 rounded-full blur-md animate-pulse" />
        <div className="absolute bottom-1/6 right-1/6 w-12 h-12 bg-blue-400/25 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/6 w-8 h-8 bg-pink-400/30 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Mesh Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Radial Gradient Spotlight */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-purple-900/50" />
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900 to-transparent" />
    </div>
  );
}