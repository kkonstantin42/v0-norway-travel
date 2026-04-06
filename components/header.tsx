'use client';

import { Mountain, Compass } from 'lucide-react';

export function Header() {
  return (
    <header className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Aurora effect layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-1/2 -left-1/4 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #7dd3a8 0%, transparent 70%)' }}
        />
        <div 
          className="absolute -top-1/3 right-0 w-[500px] h-[350px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #5fb8d9 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-0 left-1/3 w-[400px] h-[300px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #a8e6cf 0%, transparent 70%)' }}
        />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                <Mountain className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium tracking-widest uppercase text-primary-foreground/70">
                Travel Guide
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 tracking-tight">
              Discover Norway
            </h1>
            <p className="text-primary-foreground/75 text-sm md:text-base max-w-lg leading-relaxed">
              Explore breathtaking fjords, dramatic mountains, and natural wonders. 
              Your Norwegian adventure starts here.
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-primary-foreground/60 text-sm mt-2">
            <Compass className="w-4 h-4" />
            <span>From Bergen</span>
          </div>
        </div>
      </div>
      
      {/* Bottom accent line with aurora gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]">
        <div 
          className="h-full w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(125, 211, 168, 0.6) 20%, rgba(95, 184, 217, 0.6) 50%, rgba(168, 230, 207, 0.6) 80%, transparent 100%)' }}
        />
      </div>
    </header>
  );
}
