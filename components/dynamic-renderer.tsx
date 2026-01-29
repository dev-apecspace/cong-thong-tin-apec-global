'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, Calendar, MapPin, User, Award, Briefcase, FileText, Download, ChevronRight, GraduationCap, Clock, Megaphone, Lightbulb, Trophy, HelpCircle, ExternalLink, Globe, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FieldConfig {
  key: string;
  label?: string;
  type: 'text' | 'object' | 'array' | 'image' | 'link' | 'list';
  icon?: string;
  render?: 'default' | 'highlighted' | 'card' | 'item' | 'evidence';
  fields?: FieldConfig[];
}

interface SchemaConfig {
  fields: FieldConfig[];
  layout?: 'single' | 'grid' | 'tabs';
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Mail, Phone, Calendar, MapPin, User, Award, Briefcase, FileText, Download, ChevronRight, GraduationCap, Clock, Megaphone, Lightbulb, Trophy, HelpCircle, ExternalLink, Globe
};

export function DynamicRenderer({ 
  data, 
  schema 
}: { 
  data: any; 
  schema: SchemaConfig | null;
}) {
  if (!schema) {
    return <GenericRenderer data={data} />;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {schema.fields.map((field) => (
        <RenderField key={field.key} field={field} value={data[field.key]} />
      ))}
    </div>
  );
}

function RenderField({ field, value }: { field: FieldConfig; value: any }) {
  if (!value) return null;

  const Icon = field.icon ? iconMap[field.icon] : null;
  const [webModalOpen, setWebModalOpen] = useState(false);
  const [webModalUrl, setWebModalUrl] = useState('');

  // ✨ Special handler for capabilityItems with 3 evidence options
  if (field.key === 'capabilityItems' && Array.isArray(value)) {
    return (
      <>
        <div className="space-y-2">
          {field.label && (
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-4">
              {field.label}
            </h3>
          )}
          <div className="space-y-4">
            {value.map((item: any, i: number) => (
              <Card key={i} className="bg-[#0b1224] border-white/5 hover:border-white/10 hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-white">{item.name}</CardTitle>
                  {item.description && (
                    <CardDescription className="text-slate-300 text-sm mt-2">{item.description}</CardDescription>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {/* Button View Web - mở modal thay vì navigate */}
                    {item.webUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setWebModalUrl(item.webUrl);
                          setWebModalOpen(true);
                        }}
                        className="gap-2 bg-white/5 hover:bg-white/10 border-white/10 text-slate-200"
                      >
                        <Globe className="w-4 h-4" />
                        <span className="hidden sm:inline">View Web</span>
                        <span className="sm:hidden">Web</span>
                      </Button>
                    )}

                    {/* Button View File */}
                    {item.fileUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(item.fileUrl, '_blank', 'noopener,noreferrer')}
                        className="gap-2 bg-white/5 hover:bg-white/10 border-white/10 text-slate-200"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="hidden sm:inline">View File</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                    )}

                    {/* Button Download */}
                    {item.downloadUrl && (
                      <Button
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = item.downloadUrl;
                          link.download = item.name || 'download';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="gap-2 bg-cyan-600 hover:bg-cyan-500 text-white"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                        <span className="sm:hidden">DL</span>
                      </Button>
                    )}

                    {/* Fallback if no links */}
                    {!item.webUrl && !item.fileUrl && !item.downloadUrl && (
                      <p className="text-xs text-slate-500 italic">No evidence links available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modal để view web */}
        <Dialog open={webModalOpen} onOpenChange={setWebModalOpen}>
          <DialogContent className="max-w-4xl h-[80vh] bg-[#0b1224] border-white/5">
            <DialogHeader>
              <DialogTitle className="text-white">Web Preview</DialogTitle>
            </DialogHeader>
            <iframe 
              src={webModalUrl}
              className="w-full h-full rounded-lg border border-white/10"
              title="Web Preview"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  switch (field.type) {
    case 'text':
      if (field.render === 'highlighted') {
        return (
          <div className="bg-gradient-to-br from-[#1a2f4a] to-[#0b1224] border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500 opacity-60" />
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-3">
              {field.label || field.key}
            </h3>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg italic">"{value}"</p>
          </div>
        );
      }
      return (
        <div className="bg-[#0b1224] border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/5 transition-all">
          {field.label && (
            <label className="text-xs sm:text-sm text-slate-500 uppercase font-bold tracking-wider block mb-2">
              {field.label}
            </label>
          )}
          <p className="font-medium text-slate-200 text-sm sm:text-base leading-relaxed">{value}</p>
        </div>
      );

    case 'image':
      return (
        <div className="flex justify-center py-2">
          <Image
            src={value}
            alt={field.label || 'image'}
            width={300}
            height={300}
            className="max-w-xs sm:max-w-md h-auto object-contain rounded-2xl sm:rounded-3xl shadow-2xl border border-white/5"
          />
        </div>
      );

    case 'link':
      return (
        <a 
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl sm:rounded-2xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] uppercase tracking-wider text-sm sm:text-base"
        >
          {field.label || 'Truy cập'}
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      );

    case 'array':
      if (Array.isArray(value)) {
        return (
          <div className={`${field.render === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4' : 'space-y-3 sm:space-y-4'}`}>
            {field.label && field.render !== 'card' && (
              <h3 className="col-span-full text-lg sm:text-xl font-bold text-white mb-2">{field.label}</h3>
            )}
            {value.map((item, i) => (
              <div key={i} className="bg-[#0b1224] border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 hover:bg-white/5 transition-all group">
                {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 shrink-0" />}
                <span className="font-medium text-slate-200 text-sm sm:text-base break-words">{typeof item === 'string' ? item : JSON.stringify(item)}</span>
              </div>
            ))}
          </div>
        );
      }
      return null;

    case 'object':
      if (typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div className="bg-gradient-to-br from-[#1a2f4a] to-[#0b1224] border border-cyan-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 sm:space-y-6 shadow-[0_0_20px_rgba(6,182,212,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-40" />
            <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
              {field.label || field.key}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(value).map(([key, val]) => (
                <div key={key} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl border border-white/5">
                  {Icon && (
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest block mb-1">{key}</span>
                    <span className="text-slate-200 font-medium text-sm sm:text-base break-words">{typeof val === 'string' ? val : JSON.stringify(val)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return null;

    case 'list':
      if (Array.isArray(value)) {
        return (
          <div className="space-y-3 sm:space-y-4">
            {field.label && (
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">{field.label}</h3>
            )}
            {value.map((item, i) => (
              <div key={i} className="bg-[#0b1224] border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/5 hover:border-white/10 transition-all group cursor-pointer">
                <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors break-words">
                  {item.title || item.name || `Item ${i + 1}`}
                </h4>
                {(item.date || item.category) && (
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                    {item.date && (
                      <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>{item.date}</span>
                      </div>
                    )}
                    {item.category && (
                      <Badge variant="outline" className="text-[10px] sm:text-xs bg-cyan-500/5 text-cyan-400 border-cyan-500/20 px-2 py-0.5">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      return null;

    default:
      return null;
  }
}

// Fallback: Generic renderer khi không có schema
function GenericRenderer({ data }: { data: any }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {Object.entries(data).map(([key, value]) => {
        if (key.startsWith('_')) return null;

        return (
          <div key={key} className="bg-[#0b1224] border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/5 transition-all">
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 uppercase tracking-tight">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
            <div className="text-slate-300 text-sm sm:text-base">
              {typeof value === 'string' ? (
                <p className="leading-relaxed">{value}</p>
              ) : Array.isArray(value) ? (
                <ul className="space-y-2">
                  {value.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-cyan-400 mt-0.5 flex-shrink-0">•</span>
                      <span className="break-words">{typeof item === 'string' ? item : JSON.stringify(item)}</span>
                    </li>
                  ))}
                </ul>
              ) : typeof value === 'object' ? (
                <div className="space-y-2 sm:space-y-3">
                  {Object.entries(value).map(([k, v]) => (
                    <div key={k} className="p-2 sm:p-3 bg-white/5 rounded-lg">
                      <span className="text-slate-500 text-xs sm:text-sm font-medium block mb-1">{k}</span>
                      <p className="font-medium text-slate-200 break-words">{String(v)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="leading-relaxed">{String(value)}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
