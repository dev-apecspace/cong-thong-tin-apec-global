'use client';

import React, { useState } from "react"
import Image from 'next/image';
import {
  Building2,
  Star,
  FileText,
  Zap,
  Calendar,
  Newspaper,
  Lightbulb,
  Award,
  HelpCircle,
  Briefcase,
  Target,
  Users,
  Megaphone,
  TrendingUp,
  Trophy,
  MessageSquare,
  MessageCircle,
  MessagesSquare,
  MessageSquareWarning,
  Shield,
  Box,
  Layout,
  Settings,
  Bell,
  Search,
  Globe,
  Lock,
  Eye,
  Heart,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  FileSearch,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { CMSModule } from '@/lib/types';
import { ModuleDetailModal } from './module-detail-modal';

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Star,
  FileText,
  Zap,
  Calendar,
  Newspaper,
  Lightbulb,
  Award,
  HelpCircle,
  Briefcase,
  Target,
  Users,
  Megaphone,
  TrendingUp,
  Trophy,
  MessageSquare,
  MessageCircle,
  MessagesSquare,
  MessageSquareWarning,
  // Aliases for common typos or simpler names
  Message: MessageSquare, 
  Feedback: MessageSquare,
  'message-square-warning': MessageSquareWarning,
  Shield,
  Box,
  Layout,
  Settings,
  Bell,
  Search,
  Globe,
  Lock,
  Eye,
  Heart,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  FileSearch,
  BookOpen,
};

interface ModuleNavigationProps {
  title: string;
  description?: string;
  modules: CMSModule[];
  company: {
    logo: string;
    logoAlt: string;
    shortName?: string;
    brandName?: string;
    slogan?: string;
  };
}

export function ModuleNavigation({
  title,
  description,
  modules,
  company,
}: ModuleNavigationProps) {
  const [selectedModule, setSelectedModule] = useState<CMSModule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);
  
  const visibleModules = modules
    .filter((module) => module.isVisible)
    .sort((a, b) => a.order - b.order);

  const handleCardClick = (module: CMSModule, e: React.MouseEvent) => {
    e.preventDefault();

    // Debug: expose module details so we can inspect where externalUrl is stored
    // (open browser console to see this when clicking a module)
    // eslint-disable-next-line no-console
    console.debug('Module clicked:', module.id, module.title, module.details);

    // Prefer the first project's detail (same behavior as modal default tab)
    const firstProjectName = module.projects?.[0]?.name;
    const firstDetail = firstProjectName ? module.details?.[firstProjectName] : null;
    if (firstDetail?.externalUrl) {
      window.open(firstDetail.externalUrl, '_blank');
      return;
    }

    // Fallback: if any project's detail contains an externalUrl, use the first found
    if (module.details) {
      for (const key of Object.keys(module.details)) {
        const d = module.details[key];
        if (d?.externalUrl) {
          window.open(d.externalUrl, '_blank');
          return;
        }
      }
    }

    // No externalUrl found: open the modal
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  return (
    <section className="w-full py-2 md:py-8 lg:py-16 relative min-h-screen flex flex-col items-center overflow-hidden bg-[#020617]">
      {/* Futuristic Digital Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617] to-slate-900" />
        
        {/* Digital Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />
        
        {/* Moving Neon Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
        
        {/* Animated Scanlines Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center">
        {/* Futuristic Device Container (Phone Shape) */}
        <div className="w-full relative bg-[#0b1224] rounded-[40px] border-2 border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.15)] overflow-hidden">
          {/* Internal Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan-500/5 blur-[120px] pointer-events-none" />
          
          {/* Top Section (Logo & Slogan) */}
          <div className="p-4 pb-4 relative z-10">
            {/* HUD Elements */}
            <div className="absolute top-8 left-8 w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
            <div className="absolute top-8 right-8 text-[8px] font-mono text-cyan-400/50 tracking-widest">HỆ_THỐNG_v2.0_ĐÃ_ĐỒNG_BỘ</div>
            
            <div className="flex flex-col items-center gap-3 pt-6 relative z-10">
              <div className="flex items-center gap-2">
                <Image
                  src={company.logo}
                  alt={company.logoAlt}
                  width={50}
                  height={50}
                  className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black italic tracking-tighter text-white uppercase">{company.shortName}</span>
                    <span className="text-2xl font-light tracking-widest text-cyan-400">{company.brandName}</span>
                  </div>
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                </div>
              </div>
              {company.slogan && (
                <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-cyan-100/60 flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                  {company.slogan}
                  <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                </p>
              )}
            </div>
            
            {/* Digital Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-950 rounded-b-3xl border-x border-b border-cyan-500/20 flex items-center justify-center">
              <div className="w-12 h-1 bg-cyan-500/20 rounded-full" />
            </div>
          </div>

          {/* Bottom Section (Module Content) */}
          <div className="px-4 relative z-10">
            <div className="flex justify-center items-center mb-4 sm:mb-8 px-2 mt-2 relative z-10 text-center">
              <div className="flex flex-col items-center max-w-full">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-2 sm:mb-3 uppercase leading-tight break-words px-4">
                  {title}
                </h2>
                <div className="h-1 w-12 sm:w-24 bg-cyan-500 rounded-full" />
              </div>
            </div>

            {/* Modules Grid - Futuristic 3x3 layout */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {visibleModules.map((module) => {
              const iconKey = module.icon;
              const Icon = iconMap[iconKey] || 
                          iconMap[Object.keys(iconMap).find(k => k.toLowerCase() === iconKey.toLowerCase()) || ''] || 
                          Building2;
              const customColor = module.color; // e.g. "#ef4444" (red)
              
              return (
                <div key={module.id} className="relative group perspective-1000">
                  <Card 
                    className="relative overflow-hidden cursor-pointer border bg-[#0f172a] hover:bg-slate-800/80 transition-all duration-700 rounded-[32px] h-[160px] sm:h-[140px] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:-translate-y-2 group-hover:rotate-x-2"
                    style={{ 
                      borderColor: customColor ? `${customColor}33` : 'rgba(30, 41, 59, 0.5)',
                    }}
                    onClick={(e) => handleCardClick(module, e)}
                    onMouseEnter={(e) => {
                      setHoveredModuleId(module.id);
                      if (customColor) {
                        e.currentTarget.style.borderColor = customColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      setHoveredModuleId(null);
                      if (customColor) {
                        e.currentTarget.style.borderColor = `${customColor}33`;
                      }
                    }}
                  >
                    {/* Multi-layered Tech Gradient */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div 
                        className="absolute inset-0" 
                        style={{ 
                          background: customColor 
                            ? `linear-gradient(to bottom right, ${customColor}1a, transparent, #a855f71a)` 
                            : 'linear-gradient(to bottom right, #06b6d41a, transparent, #a855f71a)' 
                        }} 
                      />
                    </div>
                    
                    {/* Content Container */}
                    <div className="relative z-10 flex items-center justify-between h-full px-6 sm:px-8 py-4">
                      {/* Left Side: Text */}
                      <div className="flex-1 transition-transform duration-500 group-hover:translate-x-1">
                        <h3 
                          className="text-base sm:text-lg lg:text-xl font-black leading-tight whitespace-pre-line transition-all duration-300 drop-shadow-sm uppercase tracking-tight"
                          style={{ 
                            color: hoveredModuleId === module.id && module.textColorHover 
                              ? module.textColorHover 
                              : (module.textColor || '#ffffff'),
                          }}
                        >
                          {module.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-3">
                          <div 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ 
                              backgroundColor: customColor ? customColor : '#06b6d4',
                              opacity: 0.6
                            }}
                          />
                          <span 
                            className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]"
                          >
                            NODE_0{module.order}
                          </span>
                        </div>
                      </div>

                      {/* Right Side: Icon Container */}
                      <div className="flex-shrink-0 relative transition-all duration-700 group-hover:scale-110">
                        <div 
                          className="relative z-10 p-4 sm:p-5 rounded-[24px] bg-slate-900/50 border border-white/5 shadow-inner transition-all duration-500 group-hover:bg-white/5"
                          style={{ 
                            borderColor: customColor ? `${customColor}33` : 'rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <Icon 
                            className="w-8 h-8 sm:w-10 sm:h-10 transition-all duration-500 animate-pulse" 
                            style={{ 
                                color: customColor ? customColor : '#22d3ee',
                                filter: customColor ? `drop-shadow(0 0 8px ${customColor}80)` : 'drop-shadow(0 0 8px rgba(34,211,238,0.5))'
                            }}
                            strokeWidth={1.5} 
                            aria-hidden="true" 
                          />
                        </div>
                        
                        {/* Digital corner brackets (Only visible on hover) */}
                        <div 
                          className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:translate-x-1 group-hover:-translate-y-1"
                          style={{ borderTopColor: customColor ? customColor : '#06b6d4', borderRightColor: customColor ? customColor : '#06b6d4' }}
                        />
                        <div 
                          className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:-translate-x-1 group-hover:translate-y-1"
                          style={{ borderBottomColor: customColor ? customColor : '#06b6d4', borderLeftColor: customColor ? customColor : '#06b6d4' }}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
          
          {/* Panel Footer HUD */}
          <div className="mt-6 md:mt-12 flex justify-center opacity-30">
            <div className="flex items-center gap-4 text-[10px] font-mono text-cyan-500">
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-cyan-500 rounded-full" /> ĐÃ MÃ HÓA</span>
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-cyan-500 rounded-full" /> SẴN SÀNG LƯỢNG TỬ</span>
              <span className="flex items-center gap-1"><span className="w-1 h-1 bg-cyan-500 rounded-full" /> V3.0.4</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      <ModuleDetailModal 
        module={selectedModule}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
