'use client';

import React from "react"

import {
  Users,
  TrendingUp,
  Briefcase,
  Calendar,
  type LucideIcon,
} from 'lucide-react';
import type { CompanyOverviewBlock } from '@/lib/types';

const iconMap: Record<string, LucideIcon> = {
  Users,
  TrendingUp,
  Briefcase,
  Calendar,
};

interface CompanyOverviewProps {
  title: string;
  description?: string;
  blocks: CompanyOverviewBlock[];
}

export function CompanyOverview({
  title,
  description,
  blocks,
}: CompanyOverviewProps) {
  const visibleBlocks = blocks
    .filter((block) => block.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="w-full py-10 md:py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3 md:mb-4 text-balance leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto text-balance leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Overview Blocks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleBlocks.map((block) => {
            const Icon = (block.icon && iconMap[block.icon]) || Users;
            return (
              <div
                key={block.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2 group"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
                    <Icon className="w-8 h-8 text-blue-600 animate-chop-nhe" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 leading-snug">
                      {block.title}
                    </h3>
                    {block.value && (
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 break-words">
                        {block.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
