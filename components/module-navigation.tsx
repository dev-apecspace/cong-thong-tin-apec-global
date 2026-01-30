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

    // 1. Check all project details for an externalUrl
    // If we find any, we redirect. We prioritize the first one found or the first project.
    let redirectUrl = null;

    if (module.details) {
      // First, try the first project in the list (if it exists)
      const firstProjectName = module.projects?.[0]?.name;
      if (firstProjectName && module.details[firstProjectName]?.externalUrl) {
        redirectUrl = module.details[firstProjectName].externalUrl;
      } 
      
      // Fallback: If first project doesn't have it, check ANY project
      if (!redirectUrl) {
        for (const projectName of Object.keys(module.details)) {
          if (module.details[projectName]?.externalUrl) {
            redirectUrl = module.details[projectName].externalUrl;
            break;
          }
        }
      }
    }

    // 2. If we found a redirect URL, open it
    if (redirectUrl) {
      console.log('Redirecting to:', redirectUrl);
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // 3. No externalUrl found: open the modal
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  return (
    <section className="w-full py-2 md:py-8 lg:py-16 relative min-h-screen flex flex-col items-center overflow-hidden bg-white">
      {/* Futuristic Clean Background */}
      <div className="absolute inset-0 z-0">
        {/* Soft light gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-50/30" />
        
        {/* Digital Grid - Light Version */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
          }}
        />
        
        {/* Soft Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center">
        {/* Realistic Phone Frame Container - Silver Bezel Edition */}
        <div className="w-full relative bg-[#e2e8f0] rounded-[55px] p-[3px] shadow-[0_50px_100px_rgba(0,0,0,0.12),0_15px_35px_rgba(0,0,0,0.07),inset_0_-2px_6px_rgba(255,255,255,0.8),inset_0_2px_6px_rgba(0,0,0,0.1)] border border-slate-300/50">
          {/* Hardware Frame - Outer Ring */}
          <div className="w-full relative bg-[#f8fafc] rounded-[52px] p-2 shadow-sm border border-slate-200/50">
            {/* Side Buttons - Left (Volume) */}
            <div className="absolute left-[-4px] top-32 w-[4px] h-14 bg-gradient-to-r from-slate-400 to-slate-200 rounded-l-md border-y border-l border-slate-300/50 z-0" />
            <div className="absolute left-[-4px] top-52 w-[4px] h-14 bg-gradient-to-r from-slate-400 to-slate-200 rounded-l-md border-y border-l border-slate-300/50 z-0" />
            {/* Side Button - Right (Power) */}
            <div className="absolute right-[-4px] top-40 w-[4px] h-24 bg-gradient-to-l from-slate-400 to-slate-200 rounded-r-md border-y border-r border-slate-300/50 z-0" />

            {/* Inner Screen Container - Sharp Border */}
            <div className="w-full relative bg-white rounded-[44px] border-[10px] border-slate-900 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] overflow-hidden min-h-[700px]">
              {/* Screen Content Reflective Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30" />
              
              {/* Status Bar Area */}
              <div className="h-10 w-full flex items-center justify-between px-8 pt-2 relative z-20">
                <span className="text-[10px] font-bold text-slate-900">9:41</span>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-slate-900" />
                  <Zap className="w-3 h-3 text-slate-900" />
                  <div className="w-5 h-2.5 border border-slate-900 rounded-[2px] p-[1px] flex items-center">
                    <div className="h-full w-3 bg-slate-900 rounded-[1px]" />
                  </div>
                </div>
              </div>
              
              {/* Top Section (Logo & Slogan) */}
              <div className="p-4 pb-4 relative z-10 pt-6">
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <Image
                      src={company.logo}
                      alt={company.logoAlt}
                      width={50}
                      height={50}
                      className="w-12 h-12 object-contain filter drop-shadow-sm"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">{company.shortName}</span>
                        <span className="text-2xl font-light tracking-widest text-blue-600">{company.brandName}</span>
                      </div>
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    </div>
                  </div>
                  {company.slogan && (
                    <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-400 flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-600 rounded-full" />
                      {company.slogan}
                      <span className="w-1 h-1 bg-blue-600 rounded-full" />
                    </p>
                  )}
                </div>
                
                {/* Dynamic Notch - Hardware look */}
                <div className="absolute top-[-42px] left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-[18px] z-50 flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-800 rounded-full mr-2 shadow-inner" />
                  <div className="w-2 h-2 rounded-full bg-[#1a1a1a] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
                </div>
              </div>

              {/* Bottom Section (Module Content) */}
              <div className="px-6 pb-12 relative z-10">
                <div className="flex justify-center items-center mb-6 sm:mb-10 px-2 mt-4 relative z-10 text-center">
                  <div className="flex flex-col items-center max-w-full">
                    <h2 
                      className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-2 sm:mb-3 uppercase leading-tight break-words px-4 transition-all duration-500"
                      style={{ 
                        color: hoveredModuleId 
                          ? (visibleModules.find(m => m.id === hoveredModuleId)?.textColorHover || visibleModules.find(m => m.id === hoveredModuleId)?.textColor || '#2563eb') 
                          : '#0f172a',
                        textShadow: hoveredModuleId ? '0 0 20px rgba(37, 99, 235, 0.1)' : 'none'
                      }}
                    >
                      {title}
                    </h2>
                    <div 
                      className="h-1 w-12 sm:w-24 rounded-full shadow-sm transition-all duration-500" 
                      style={{ 
                        backgroundColor: hoveredModuleId 
                          ? (visibleModules.find(m => m.id === hoveredModuleId)?.textColorHover || visibleModules.find(m => m.id === hoveredModuleId)?.textColor || '#2563eb') 
                          : '#2563eb',
                        width: hoveredModuleId ? '80%' : '48px'
                      }}
                    />
                  </div>
                </div>

              {/* Modules Grid - Futuristic 3x3 layout */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {visibleModules.map((module) => {
                  const iconKey = module.icon;
                  const Icon = iconMap[iconKey] || 
                              iconMap[Object.keys(iconMap).find(k => k.toLowerCase() === iconKey.toLowerCase()) || ''] || 
                              Building2;
                  const customColor = module.color; 
                  const isHovered = hoveredModuleId === module.id;
                  
                  return (
                    <div key={module.id} className="relative group perspective-1000">
                      <Card 
                        className="relative overflow-hidden cursor-pointer border border-slate-100 bg-white transition-all duration-500 rounded-[28px] h-[150px] sm:h-[130px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 group"
                        style={{ 
                          borderColor: isHovered ? (module.textColorHover || module.textColor || customColor || '#e2e8f0') : '#f1f5f9',
                          backgroundColor: isHovered ? `${(module.textColorHover || module.textColor || customColor || '#f8fafc')}05` : '#ffffff',
                        }}
                        onClick={(e) => handleCardClick(module, e)}
                        onMouseEnter={() => setHoveredModuleId(module.id)}
                        onMouseLeave={() => setHoveredModuleId(null)}
                      >
                        {/* Interactive Glow */}
                        <div 
                          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                          style={{ 
                            background: (module.textColorHover || module.textColor || customColor)
                              ? `radial-gradient(circle at center, ${(module.textColorHover || module.textColor || customColor)}15, transparent 70%)` 
                              : 'radial-gradient(circle at center, #3b82f615, transparent 70%)' 
                          }}
                        />
                        
                        {/* Content Container */}
                        <div className="relative z-10 flex items-center justify-between h-full px-5 sm:px-6 py-4">
                          <div className="flex-1">
                            <h3 
                              className="text-sm sm:text-base font-black leading-tight uppercase tracking-tight transition-colors duration-300"
                              style={{ 
                                color: isHovered
                                  ? (module.textColorHover || module.textColor || '#1e293b')
                                  : (module.textColor && module.textColor !== '#ffffff' ? module.textColor : '#1e293b'),
                              }}
                            >
                              {module.title}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                                AP_SYS.0{module.order}
                              </span>
                            </div>
                          </div>

                          <div className="flex-shrink-0 relative">
                            {/* Corner Markers - Only visible on hover */}
                            <div 
                              className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 transition-all duration-300 z-20 pointer-events-none opacity-0 group-hover:opacity-100"
                              style={{ borderColor: module.textColorHover || module.textColor || customColor || '#3b82f6' }}
                            />
                            <div 
                              className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 transition-all duration-300 z-20 pointer-events-none opacity-0 group-hover:opacity-100"
                              style={{ borderColor: module.textColorHover || module.textColor || customColor || '#3b82f6' }}
                            />

                            <div 
                              className="p-3 rounded-2xl transition-all duration-300 border shadow-sm relative z-10"
                              style={{ 
                                backgroundColor: isHovered ? `${(module.textColorHover || module.textColor || customColor || '#3b82f6')}10` : '#f8fafc',
                                borderColor: isHovered ? `${(module.textColorHover || module.textColor || customColor || '#3b82f6')}20` : '#f1f5f9'
                              }}
                            >
                              <Icon 
                                className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110 animate-pulse" 
                                style={{ color: isHovered ? (module.textColorHover || module.textColor || customColor || '#3b82f6') : (customColor || '#3b82f6') }}
                                strokeWidth={2.5} 
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
              
              {/* Panel Footer HUD */}
              <div className="mt-10 flex justify-center opacity-40">
                <div className="flex items-center gap-6 text-[9px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5"><span className="w-1 h-1 bg-blue-600 rounded-full" /> V3.0.4_CORE</span>
                  <span className="flex items-center gap-1.5"><span className="w-1 h-1 bg-blue-600 rounded-full" /> APEC_GLOBAL_PORTAL</span>
                </div>
              </div>
            </div>
            
            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-200 rounded-full" />
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
