'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { SiteConfiguration } from '@/lib/types';

interface HeaderProps {
  config: SiteConfiguration;
}

export function Header({ config }: HeaderProps) {
  return (
    <header className="w-full backdrop-blur-[12px] bg-white/80 border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Main Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-ring focus:outline-2 focus:outline-offset-2 rounded-lg animate-in fade-in slide-in-from-left-4 duration-1000"
            aria-label={`${config.company.name} - Home`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/10 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
              <Image
                src={config.company.logo}
                alt={config.company.logoAlt}
                width={50}
                height={50}
                className="w-14 h-14 object-contain transition-all duration-500 relative z-10"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black italic tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors leading-none">{config.company.shortName}</span>
                <span className="text-2xl font-light tracking-widest text-blue-600 leading-none">{config.company.brandName}</span>
              </div>
              {config.company.slogan && (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1 h-1 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.2)] transition-colors" />
                  <span className="text-[8px] font-bold tracking-[0.2em] text-slate-400 group-hover:text-blue-600 uppercase whitespace-nowrap transition-colors">
                    {config.company.slogan}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.2)] transition-colors" />
                </div>
              )}
            </div>
          </Link>

          {/* HUD Status Elements */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              HỆ_THỐNG_ỔN_ĐỊNH
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase border-l border-slate-200 pl-6">
              <span className="text-slate-300">ID:</span>
              <span className="text-blue-600">AP_4492</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
