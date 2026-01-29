import React from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Globe, FileText, Download } from 'lucide-react';

interface CapabilityItem {
  name: string;
  description?: string;
  webUrl?: string;
  fileUrl?: string;
  downloadUrl?: string;
}

interface CapabilityEvidenceProps {
  items: CapabilityItem[];
  className?: string;
}

/**
 * Component hiển thị Hồ sơ năng lực với 3 cách chứng minh:
 * 1. View Web - Mở liên kết web
 * 2. View File - Xem file trong browser
 * 3. Download - Tải file về máy
 */
export function CapabilityEvidence({ items, className = '' }: CapabilityEvidenceProps) {
  const handleOpenWeb = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleViewFile = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownloadFile = (url?: string, filename?: string) => {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || url.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Chưa có hồ sơ năng lực nào</p>
        </div>
      ) : (
        items.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
              {item.description && (
                <CardDescription className="text-sm mt-1">{item.description}</CardDescription>
              )}
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {/* Button View Web */}
                {item.webUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenWeb(item.webUrl)}
                    className="gap-2"
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
                    onClick={() => handleViewFile(item.fileUrl)}
                    className="gap-2"
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
                    variant="default"
                    onClick={() => handleDownloadFile(item.downloadUrl, item.name)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                    <span className="sm:hidden">DL</span>
                  </Button>
                )}

                {/* Fallback message if no links available */}
                {!item.webUrl && !item.fileUrl && !item.downloadUrl && (
                  <p className="text-xs text-gray-500 italic">Chưa có liên kết chứng minh</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default CapabilityEvidence;
