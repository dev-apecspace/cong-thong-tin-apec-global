import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { CMSModule } from '@/lib/types';
import { FileText } from 'lucide-react';
import { DynamicRenderer } from '@/components/dynamic-renderer';
import { MODULE_SCHEMAS } from '@/lib/module-schemas';

interface ModuleDetailModalProps {
  module: CMSModule | null;
  isOpen: boolean;
  onClose: () => void;
}

const renderModuleContent = (module: CMSModule, company: string) => {
  const companyData = module.details?.[company];

  if (!companyData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-white/5 rounded-3xl p-8 sm:p-12 text-center max-w-md">
          <FileText className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 opacity-30" />
          <p className="text-lg sm:text-xl font-semibold text-slate-300 mb-2">Chưa có dữ liệu</p>
          <p className="text-sm text-slate-500">
            Dữ liệu cho <span className="font-medium text-cyan-400">{company}</span> chưa được cập nhật trong hệ thống CMS
          </p>
        </div>
      </div>
    );
  }

  // ✨ Dynamic rendering system
  const schema = MODULE_SCHEMAS[module.id];
  return <DynamicRenderer data={companyData} schema={schema} />;
};

export function ModuleDetailModal({
  module,
  isOpen,
  onClose,
}: ModuleDetailModalProps) {
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (module?.projects?.length) {
      setActiveTab(module.projects[0].name);
    }
  }, [module]);

  if (!module) return null;

  const companies = module.projects || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[95vw] w-full h-[85vh] p-0 overflow-hidden bg-[#0b1224] border-cyan-500/20 text-white flex flex-col shadow-[0_0_60px_rgba(6,182,212,0.2)] rounded-3xl">
        {/* Header */}
        <div className="px-6 sm:px-8 pt-5 pb-3 border-b border-white/5 shrink-0 bg-gradient-to-r from-[#0b1224] to-[#1a2442]">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white mb-0.5">
            {module.title.replace('\n', ' ')}
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-tight">Chọn công ty để xem chi tiết</p>
        </div>

        {/* Main Content Area - Full scrollable container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="flex flex-col md:flex-row min-h-full"
          >
            {/* Mobile Navigation - Select Dropdown */}
            <div className="md:hidden sticky top-0 z-30 px-4 pt-2 pb-3 bg-[#020617]/95 backdrop-blur-md border-b border-white/5">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full bg-[#0b1224] border-white/10 text-white h-11 rounded-xl focus:ring-cyan-500/50">
                  <SelectValue placeholder="Chọn công ty" />
                </SelectTrigger>
                <SelectContent className="bg-[#0b1224] border-white/10 text-white">
                  {companies.map((project) => (
                    <SelectItem 
                      key={project.id} 
                      value={project.name}
                      className="focus:bg-cyan-500 focus:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                          <Image
                            src={project.logo}
                            alt={project.name}
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium">{project.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Sidebar - Companies List */}
            <TabsList className="hidden md:flex flex-col justify-start gap-1.5 w-full md:w-[260px] bg-[#020617] border-b md:border-b-0 md:border-r border-white/5 px-4 md:px-6 pt-2 pb-6 rounded-none md:shrink-0 h-auto items-stretch overflow-visible sticky top-0 self-start">
              {companies.map((project) => (
                <TabsTrigger
                  key={project.id}
                  value={project.name}
                  className="justify-start gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 h-auto min-h-[44px] md:min-h-[48px] w-full data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(6,182,212,0.3)] text-slate-400 hover:text-white hover:bg-white/5 transition-all rounded-lg text-left border border-transparent data-[state=active]:border-cyan-400/30 shadow-none flex-none font-semibold text-sm sm:text-base"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-700 flex items-center justify-center shrink-0 overflow-hidden border border-white/10">
                    <Image
                      src={project.logo}
                      alt={project.name}
                      width={28}
                      height={28}
                      className="object-contain p-0.5"
                    />
                  </div>
                  <span>{project.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Content Area */}
            <div className="flex-1 bg-[#020617]">
              <div className="px-4 sm:px-6 md:px-8 py-4 md:py-6">
                {companies.map((project) => (
                  <TabsContent key={project.id} value={project.name} className="m-0 focus-visible:ring-0">
                    {renderModuleContent(module, project.name)}
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
