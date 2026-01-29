'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { SiteConfiguration } from '@/lib/types';

interface HeaderProps {
  config: SiteConfiguration;
}

export function Header({ config }: HeaderProps) {
  return (
    <header className="w-full backdrop-blur-[12px] bg-slate-950/40 border-b border-cyan-500/10 sticky top-0 z-50 transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/5 before:to-transparent before:pointer-events-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Main Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-ring focus:outline-2 focus:outline-offset-2 rounded-lg animate-in fade-in slide-in-from-left-4 duration-1000"
            aria-label={`${config.company.name} - Home`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
              <Image
                src={config.company.logo}
                alt={config.company.logoAlt}
                width={50}
                height={50}
                className="w-14 h-14 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-500 relative z-10"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black italic tracking-tighter text-white group-hover:text-cyan-400 transition-colors leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{config.company.shortName}</span>
                <span className="text-2xl font-light tracking-widest text-cyan-400 leading-none drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">{config.company.brandName}</span>
              </div>
              {config.company.slogan && (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1 h-1 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-colors" />
                  <span className="text-[8px] font-bold tracking-[0.2em] text-cyan-400/70 group-hover:text-cyan-400 uppercase whitespace-nowrap transition-colors">
                    {config.company.slogan}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-colors" />
                </div>
              )}
            </div>
          </Link>

          {/* HUD Status Elements */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500/60 uppercase">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              KẾT_NỐI_BẢO_MẬT
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500/60 uppercase border-l border-white/10 pl-6">
              <span className="text-white/40">MÃ_SỐ:</span>
              <span className="text-cyan-400">AP_4492</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
