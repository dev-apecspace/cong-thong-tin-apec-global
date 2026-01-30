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

  // 🔗 If externalUrl exists, redirect immediately (priority over content)
  if (data.externalUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Globe className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600" />
        <p className="text-lg sm:text-xl font-semibold text-slate-900">Đang chuyển hướng...</p>
        <p className="text-sm text-slate-500">Bạn sẽ được chuyển sang: {data.externalUrl}</p>
        {typeof window !== 'undefined' && (
          <script>{`window.location.href = "${data.externalUrl}";`}</script>
        )}
        <a
          href={data.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl sm:rounded-2xl transition-all shadow-md uppercase tracking-wider text-sm sm:text-base mt-4"
        >
          <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
          Nhấn đây nếu không được chuyển hướng
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Render fields defined in schema first */}
      {schema.fields.map((field) => {
        // Skip externalUrl field in render
        if (field.key === 'externalUrl') return null;
        return <RenderField key={field.key} field={field} value={data[field.key]} />;
      })}

      {/* 2. Auto-render extra fields NOT in schema (Full Dynamic) */}
      {Object.entries(data).map(([key, value]) => {
        // Skip if field already rendered by schema or is a system field
        if (
          schema.fields.some((f) => f.key === key) || 
          ['externalUrl', 'id', 'projects', 'details'].includes(key) ||
          key.startsWith('_')
        ) {
          return null;
        }

        // Auto-detect type for best rendering
        let autoType: 'text' | 'link' | 'object' | 'array' | 'list' = 'text';
        if (typeof value === 'object' && value !== null) {
          autoType = Array.isArray(value) ? 'array' : 'object';
        } else if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
          autoType = 'link';
        }

        return (
          <RenderField 
            key={key} 
            field={{ 
              key, 
              label: key, // Use key as label directly
              type: autoType 
            }} 
            value={value} 
          />
        );
      })}
    </div>
  );
}

function RenderField({ field, value }: { field: FieldConfig; value: any }) {
  if (!value) return null;

  const Icon = field.icon ? iconMap[field.icon] : null;
  const [webModalOpen, setWebModalOpen] = useState(false);
  const [webModalUrl, setWebModalUrl] = useState('');

  // ✨ Special handler for capability-like lists with 3 evidence options
  if ((field.key === 'capabilityItems' || field.key === 'policies' || field.key === 'policyItems') && Array.isArray(value)) {
    return (
      <>
        <div className="space-y-2">
          {field.label && (
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">
              {field.label}
            </h3>
          )}
          <div className="space-y-4">
            {value.map((rawItem: any, i: number) => {
              const item = typeof rawItem === 'string' ? { title: rawItem } : rawItem || {};
              const title = item.title || item.name || item.Tiêu_đề || item.Tên || `Item ${i + 1}`;
              const description = item.description || item.desc || item.Mô_tả || '';
              const webUrl = item.webUrl || item.webLink || item.url || item.Liên_kết_Web;
              const fileUrl = item.fileUrl || item.file || item.Liên_kết_File || null;
              const downloadUrl = item.downloadUrl || item.download || item.Tải_về || null;

              return (
                <Card key={i} className="bg-white border-slate-100 hover:border-blue-200 hover:shadow-md transition-all rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-slate-900">{title}</CardTitle>
                    {description && (
                      <CardDescription className="text-slate-600 text-sm mt-2">{description}</CardDescription>
                    )}
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {webUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setWebModalUrl(webUrl);
                            setWebModalOpen(true);
                          }}
                          className="gap-2 bg-white hover:bg-slate-100 border-slate-200 text-slate-700 rounded-lg"
                        >
                          <Globe className="w-4 h-4" />
                          <span className="hidden sm:inline">Xem Web</span>
                          <span className="sm:hidden">Web</span>
                        </Button>
                      )}

                      {fileUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(fileUrl, '_blank', 'noopener,noreferrer')}
                          className="gap-2 bg-white hover:bg-slate-100 border-slate-200 text-slate-700 rounded-lg"
                        >
                          <FileText className="w-4 h-4" />
                          <span className="hidden sm:inline">Xem File</span>
                          <span className="sm:hidden">Xem</span>
                        </Button>
                      )}

                      {downloadUrl && (
                        <Button
                          size="sm"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = downloadUrl;
                            link.download = item.name || item.title || 'download';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">Tải về</span>
                          <span className="sm:hidden">Tải</span>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Dialog open={webModalOpen} onOpenChange={setWebModalOpen}>
          <DialogContent className="max-w-4xl h-[80vh] bg-white border-slate-200 p-0 overflow-hidden">
            <DialogHeader className="p-4 border-b border-slate-100">
              <DialogTitle className="text-slate-900">Xem trước Trang web</DialogTitle>
            </DialogHeader>
            <iframe 
              src={webModalUrl}
              className="w-full h-full border-none"
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
          <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-60" />
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
              {field.label || field.key}
            </h3>
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg italic">"{value}"</p>
          </div>
        );
      }
      return (
        <div className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-sm transition-all">
          {field.label && (
            <label className="text-xs sm:text-sm text-slate-500 uppercase font-bold tracking-wider block mb-2">
              {field.label}
            </label>
          )}
          <p className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">{value}</p>
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
            className="max-w-xs sm:max-w-md h-auto object-contain rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100"
          />
        </div>
      );

    case 'link':
      return (
        <a 
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl sm:rounded-2xl transition-all shadow-md uppercase tracking-wider text-sm sm:text-base"
        >
          {field.label || 'Truy cập'}
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      );

    case 'array':
      if (Array.isArray(value)) {
        const looksLikeEvidence = value.some((it: any) => {
          const item = typeof it === 'string' ? { title: it } : it || {};
          return Boolean(item.webUrl || item.webLink || item.url || item.fileUrl || item.file || item.downloadUrl || item.download);
        });

        if (looksLikeEvidence) {
          return (
            <>
              {field.label && (
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">{field.label}</h3>
              )}
              <div className="space-y-4">
                {value.map((rawItem: any, i: number) => {
                  const item = typeof rawItem === 'string' ? { title: rawItem } : rawItem || {};
                  const title = item.title || item.name || `Item ${i + 1}`;
                  const description = item.description || item.desc || '';
                  const webUrl = item.webUrl || item.webLink || item.url;
                  const fileUrl = item.fileUrl || item.file || null;
                  const downloadUrl = item.downloadUrl || item.download || null;

                  return (
                    <Card key={i} className="bg-white border-slate-100 hover:border-blue-200 hover:shadow-md transition-all rounded-2xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold text-slate-900">{title}</CardTitle>
                        {description && (
                          <CardDescription className="text-slate-600 text-sm mt-2">{description}</CardDescription>
                        )}
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {webUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(webUrl, '_blank', 'noopener,noreferrer')}
                              className="gap-2 bg-white hover:bg-slate-100 border-slate-200 text-slate-700 rounded-lg"
                            >
                              <Globe className="w-4 h-4" />
                              <span>Xem Web</span>
                            </Button>
                          )}

                          {fileUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(fileUrl, '_blank', 'noopener,noreferrer')}
                              className="gap-2 bg-white hover:bg-slate-100 border-slate-200 text-slate-700 rounded-lg"
                            >
                              <FileText className="w-4 h-4" />
                              <span>Xem File</span>
                            </Button>
                          )}

                          {downloadUrl && (
                            <Button
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = downloadUrl;
                                link.download = title;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                            >
                              <Download className="w-4 h-4" />
                              <span>Tải về</span>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          );
        }

        return (
          <div className="space-y-4">
            {field.label && (
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">{field.label}</h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {value.map((item: any, i: number) => (
                <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 sm:p-5 hover:bg-white transition-all shadow-sm">
                  {typeof item === 'object' ? (
                    <div className="space-y-2">
                      {Object.entries(item).map(([k, v]) => (
                        <div key={k} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">{k}</span>
                          <span className="text-sm font-semibold text-slate-800">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                      <span className="text-sm sm:text-base font-bold text-slate-900">{String(item)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }
      return null;

    case 'object':
      return (
        <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-7 shadow-sm">
          {field.label && (
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-full" />
              {field.label}
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {Object.entries(value).map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{k}</span>
                <span className="text-sm sm:text-base font-bold text-slate-900 leading-tight">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

function GenericRenderer({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(data).map(([key, value]) => {
          if (['id', 'projects', 'details', 'externalUrl'].includes(key)) return null;
          
          if (typeof value === 'object' && value !== null) {
            return (
              <div key={key} className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm">
                <h4 className="text-xs sm:text-sm font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  {key}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(value).map(([subK, subV]) => (
                    <div key={subK} className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                      <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-tight">{subK}</span>
                      <span className="text-sm sm:text-base font-bold text-slate-900">{String(subV)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (typeof value === 'string' && (value.startsWith('http') || value.includes('.jpg') || value.includes('.png'))) {
            if (value.includes('.jpg') || value.includes('.png')) {
              return (
                <div key={key} className="flex justify-center py-4">
                  <Image src={value} alt={key} width={400} height={300} className="rounded-2xl shadow-lg border border-slate-100" />
                </div>
              );
            }
            return (
              <a 
                key={key} 
                href={value} 
                target="_blank" 
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline py-2"
              >
                <Globe className="w-4 h-4" />
                {key}: {value}
              </a>
            );
          }

          return (
            <div key={key} className="bg-white border border-slate-100 rounded-xl p-4 sm:p-5 hover:bg-white transition-all shadow-sm">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">{key}</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">{String(value)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
