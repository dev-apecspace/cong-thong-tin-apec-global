'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { SiteConfiguration } from '@/lib/types';

interface FooterProps {
  config: SiteConfiguration;
}

interface Partner {
  id: string;
  name: string;
  logo: string;
  display_order: number;
}

const projectLogos = [
  '/projects/project-1.jpg',
  '/projects/project-2.jpg',
  '/projects/project-3.jpg',
  '/projects/project-1.jpg',
  '/projects/project-2.jpg',
  '/projects/project-3.jpg',
  '/projects/project-1.jpg',
  '/projects/project-2.jpg',
  '/projects/project-3.jpg',
  '/projects/project-1.jpg',
];

export function Footer({ config }: FooterProps) {
  const projectScrollRef = useRef<HTMLDivElement>(null);
  const partnerScrollRef = useRef<HTMLDivElement>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch partners from API
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/admin/partners');
        if (response.ok) {
          const data = await response.json();
          setPartners(Array.isArray(data) ? data : data.partners || []);
        }
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    const scrollProject = projectScrollRef.current;
    const scrollPartner = partnerScrollRef.current;
    
    let projectAnimationId: number;
    let partnerAnimationId: number;

    const animateProject = () => {
      if (scrollProject) {
        scrollProject.scrollLeft += 0.5;
        if (scrollProject.scrollLeft >= scrollProject.scrollWidth / 2) {
          scrollProject.scrollLeft = 0;
        }
      }
      projectAnimationId = requestAnimationFrame(animateProject);
    };

    const animatePartner = () => {
      if (scrollPartner) {
        scrollPartner.scrollLeft += 0.5;
        if (scrollPartner.scrollLeft >= scrollPartner.scrollWidth / 2) {
          scrollPartner.scrollLeft = 0;
        }
      }
      partnerAnimationId = requestAnimationFrame(animatePartner);
    };

    projectAnimationId = requestAnimationFrame(animateProject);
    partnerAnimationId = requestAnimationFrame(animatePartner);

    return () => {
      cancelAnimationFrame(projectAnimationId);
      cancelAnimationFrame(partnerAnimationId);
    };
  }, []);

  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-8 md:pt-16 pb-4 md:pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Projects Slider - Futurized */}
        <div className="mb-8 md:mb-16">
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-l from-slate-200 to-transparent" />
            <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">
              THÀNH_VIÊN_TẬP_ĐOÀN
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
          </div>
          <div 
            ref={projectScrollRef}
            className="overflow-hidden whitespace-nowrap"
          >
            <div className="inline-flex gap-4 md:gap-6 py-2 md:py-4">
              {[...config.projects, ...config.projects].map((project, index) => (
                <div 
                  key={`project-${index}`}
                  className="bg-white rounded-2xl p-2 md:p-[10px] border border-slate-100 hover:border-blue-500/50 shadow-sm transition-all duration-300 flex-shrink-0 group flex items-center justify-center cursor-pointer hover:scale-105"
                >
                  <Image 
                    src={project.logo || "/placeholder.svg"}
                    alt={project.name}
                    width={240}
                    height={160}
                    className="h-20 md:h-32 w-auto object-contain transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Slider - Futurized */}
        <div className="mb-10 md:mb-20">
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-l from-slate-200 to-transparent" />
            <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">
              ĐỐI_TÁC_CHIẾN_LƯỢC
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
          </div>
          <div 
            ref={partnerScrollRef}
            className="overflow-hidden whitespace-nowrap"
          >
            <div className="inline-flex gap-4 md:gap-6 py-2 md:py-4">
              {loading ? (
                // Loading skeleton
                [...Array(6)].map((_, index) => (
                  <div 
                    key={`skeleton-${index}`}
                    className="bg-white rounded-2xl p-2 md:p-[10px] border border-slate-100 shadow-sm flex-shrink-0 flex items-center justify-center w-32 md:w-48 h-20 md:h-32 animate-pulse"
                  />
                ))
              ) : partners.length > 0 ? (
                // Render partners from API
                [...partners, ...partners].map((partner, index) => (
                  <div 
                    key={`partner-${index}`}
                    className="bg-white rounded-2xl p-2 md:p-[10px] border border-slate-100 hover:border-blue-500/50 shadow-sm transition-all duration-300 flex-shrink-0 group flex items-center justify-center cursor-pointer hover:scale-105"
                  >
                    <Image 
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      width={240}
                      height={160}
                      className="h-20 md:h-32 w-auto object-contain transition-all duration-500"
                    />
                  </div>
                ))
              ) : (
                // Fallback message
                <div className="text-slate-400 text-sm">Không có dữ liệu đối tác</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-200 pt-8 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-16">
            {/* Company Info */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="relative">
                  <Image
                    src={config.company.logo}
                    alt={config.company.logoAlt}
                    width={40}
                    height={40}
                    className="w-12 h-12 object-contain transition-all duration-500 relative z-10"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black italic tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors leading-none">
                      {config.company.shortName}
                    </span>
                    <span className="text-xl font-light tracking-widest text-blue-600 leading-none uppercase">
                      {config.company.brandName}
                    </span>
                  </div>
                  {config.company.slogan && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[6px] font-bold tracking-[0.2em] text-slate-400 group-hover:text-blue-600 uppercase whitespace-nowrap transition-colors">
                        {config.company.slogan}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                HẠ TẦNG TOÀN CẦU VÀ HỆ SINH THÁI SỐ CHO THẾ HỆ KINH DOANH VÀ CÔNG NGHỆ TIẾP THEO.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">
                ĐIỀU HƯỚNG
              </h3>
              <ul className="space-y-4">
                {['CHỈ THỊ', 'HẠ TẦNG', 'TRÍ TUỆ', 'GIAO THỨC'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-slate-200 group-hover:bg-blue-600 rounded-full transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">
                KẾT NỐI
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-mono">
                    THƯ
                  </div>
                  <span className="text-sm text-slate-500">uplink@apec.global</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-mono">
                    ĐT
                  </div>
                  <span className="text-sm text-slate-500">+84 24 335 1292</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              {config.footer.copyright}
            </p>
            <div className="flex gap-6 text-[10px] font-mono text-slate-300 uppercase">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">ĐIỀU_KHOẢN_DỊCH_VỤ</span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">GIAO_THỨC_BẢO_MẬT</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
