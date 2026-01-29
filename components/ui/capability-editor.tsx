import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Trash2, Plus } from 'lucide-react';

interface CapabilityItem {
  name: string;
  description?: string;
  webUrl?: string;
  fileUrl?: string;
  downloadUrl?: string;
}

interface CapabilityEditorProps {
  items: CapabilityItem[];
  onChange: (items: CapabilityItem[]) => void;
  className?: string;
}

/**
 * Component quản lý (thêm, sửa, xóa) hồ sơ năng lực
 * Sử dụng cho admin panel
 */
export function CapabilityEditor({ items, onChange, className = '' }: CapabilityEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<CapabilityItem>({
    name: '',
    description: '',
    webUrl: '',
    fileUrl: '',
    downloadUrl: '',
  });

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      onChange([...items, newItem]);
      setNewItem({
        name: '',
        description: '',
        webUrl: '',
        fileUrl: '',
        downloadUrl: '',
      });
    }
  };

  const handleUpdateItem = (index: number, updatedItem: CapabilityItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    onChange(updatedItems);
    setEditingIndex(null);
  };

  const handleDeleteItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingIndex !== null) {
      const item = items[editingIndex];
      handleUpdateItem(editingIndex, { ...item, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
        <p className="font-semibold mb-2">💡 Mẹo: Mỗi hồ sơ năng lực nên có:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><strong>Tên:</strong> Tiêu đề rõ ràng (VD: "Chứng chỉ ISO 27001")</li>
          <li><strong>Mô tả:</strong> Giải thích chi tiết (VD: "Chứng chỉ bảo mật thông tin 2023")</li>
          <li><strong>🌐 Web Link:</strong> URL trang web giới thiệu (tùy chọn)</li>
          <li><strong>📄 File URL:</strong> Link file để xem trong trình duyệt (PDF, Word) (tùy chọn)</li>
          <li><strong>⬇️ Download URL:</strong> Link để tải file về máy (tùy chọn)</li>
        </ul>
      </div>

      {/* Danh sách các hồ sơ hiện tại */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">Danh sách hồ sơ năng lực</h3>
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Chưa có hồ sơ nào. Hãy thêm hồ sơ đầu tiên.</p>
        ) : (
          items.map((item, index) => (
            <Card key={index} className={editingIndex === index ? 'border-blue-400' : ''}>
              <CardHeader className="py-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-base">{item.name || '(chưa đặt tên)'}</CardTitle>
                    {item.description && (
                      <CardDescription className="text-xs mt-1">{item.description}</CardDescription>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteItem(index)}
                    className="ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {editingIndex === index && (
                <CardContent className="space-y-3 border-t pt-3">
                  <div>
                    <label className="text-xs font-semibold">Tên hồ sơ *</label>
                    <Input
                      name="name"
                      value={items[index].name}
                      onChange={handleInputChange}
                      placeholder="VD: Chứng chỉ ISO 27001"
                      className="mt-1 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold">Mô tả chi tiết</label>
                    <Textarea
                      name="description"
                      value={items[index].description || ''}
                      onChange={handleInputChange}
                      placeholder="VD: Chứng chỉ bảo mật thông tin quốc tế, đạt năm 2023"
                      rows={3}
                      className="mt-1 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="text-xs font-semibold">🌐 Liên kết Web</label>
                      <Input
                        name="webUrl"
                        type="url"
                        value={items[index].webUrl || ''}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="mt-1 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold">📄 Link File (xem trực tiếp)</label>
                      <Input
                        name="fileUrl"
                        type="url"
                        value={items[index].fileUrl || ''}
                        onChange={handleInputChange}
                        placeholder="https://... (PDF, Word, etc)"
                        className="mt-1 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold">⬇️ Link Tải File</label>
                      <Input
                        name="downloadUrl"
                        type="url"
                        value={items[index].downloadUrl || ''}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="mt-1 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => setEditingIndex(null)}
                    >
                      Lưu
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingIndex(null)}
                    >
                      Hủy
                    </Button>
                  </div>
                </CardContent>
              )}

              {editingIndex !== index && (
                <CardContent className="flex gap-2 text-xs">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingIndex(index)}
                    className="flex-1"
                  >
                    Sửa
                  </Button>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Form thêm hồ sơ mới */}
      {editingIndex === null && (
        <Card className="border-dashed border-2">
          <CardHeader className="py-3">
            <CardTitle className="text-base">Thêm hồ sơ năng lực mới</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-semibold">Tên hồ sơ *</label>
              <Input
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                placeholder="VD: Chứng chỉ ISO 27001"
                className="mt-1 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">Mô tả chi tiết</label>
              <Textarea
                name="description"
                value={newItem.description || ''}
                onChange={handleInputChange}
                placeholder="VD: Chứng chỉ bảo mật thông tin quốc tế, đạt năm 2023"
                rows={3}
                className="mt-1 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs font-semibold">🌐 Liên kết Web</label>
                <Input
                  name="webUrl"
                  type="url"
                  value={newItem.webUrl || ''}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">📄 Link File (xem trực tiếp)</label>
                <Input
                  name="fileUrl"
                  type="url"
                  value={newItem.fileUrl || ''}
                  onChange={handleInputChange}
                  placeholder="https://... (PDF, Word, etc)"
                  className="mt-1 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold">⬇️ Link Tải File</label>
                <Input
                  name="downloadUrl"
                  type="url"
                  value={newItem.downloadUrl || ''}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="mt-1 text-sm"
                />
              </div>
            </div>

            <Button
              onClick={handleAddItem}
              className="w-full gap-2"
              disabled={!newItem.name.trim()}
            >
              <Plus className="w-4 h-4" />
              Thêm hồ sơ
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CapabilityEditor;
