// Module Schema Definitions
// Admin có thể thêm trường mới ở đây mà không cần sửa React component

export const MODULE_SCHEMAS: Record<string, any> = {
  'company-info': {
    fields: [
      {
        key: 'summary',
        label: 'Giới thiệu tổng quan',
        type: 'text',
        render: 'highlighted',
      },
      {
        key: 'logo',
        label: 'Logo công ty',
        type: 'image',
      },
      {
        key: 'webLink',
        label: 'Website',
        type: 'link',
      },
      {
        key: 'heroImage',
        label: 'Ảnh bìa',
        type: 'image',
      },
      {
        key: 'corporateInfo',
        label: 'Thông tin cơ bản',
        type: 'object',
        icon: 'Mail',
      },
      {
        key: 'legalInfo',
        label: 'Thông tin pháp lý',
        type: 'object',
        icon: 'FileText',
      },
    ],
  },
  'capabilities': {
    fields: [
      {
        key: 'capabilityItems',
        label: 'Hồ sơ năng lực',
        type: 'array',
        render: 'evidence',
        icon: 'FileText',
        description: 'Mỗi item có thể view web, view file, hoặc download file',
        itemFields: [
          {
            key: 'name',
            label: 'Tên hồ sơ/Thành tích',
            type: 'text',
            required: true,
          },
          {
            key: 'description',
            label: 'Mô tả chi tiết',
            type: 'text',
          },
          {
            key: 'webUrl',
            label: '🌐 Liên kết Web',
            type: 'link',
            placeholder: 'https://...',
          },
          {
            key: 'fileUrl',
            label: '📄 Link file (để xem trực tiếp)',
            type: 'link',
            placeholder: 'https://... hoặc path tới file',
          },
          {
            key: 'downloadUrl',
            label: '⬇️ Link tải file',
            type: 'link',
            placeholder: 'https://... hoặc path tới file',
          },
        ],
      },
      {
        key: 'achievements',
        label: 'Thành tựu tiêu biểu',
        type: 'array',
        icon: 'Award',
      },
      {
        key: 'experience',
        label: 'Kinh nghiệm ngành',
        type: 'text',
        render: 'highlighted',
      },
    ],
  },
  'policies': {
    fields: [
      {
        key: 'policies',
        label: 'Chính sách & Quy định',
        type: 'list',
      },
    ],
  },
  'career-path': {
    fields: [
      {
        key: 'careerLevels',
        label: 'Lộ trình sự nghiệp',
        type: 'list',
      },
    ],
  },
  'news': {
    fields: [
      {
        key: 'items',
        label: 'Tin tức',
        type: 'list',
      },
    ],
  },
  'events': {
    fields: [
      {
        key: 'items',
        label: 'Sự kiện',
        type: 'list',
      },
    ],
  },
  'initiatives': {
    fields: [
      {
        key: 'items',
        label: 'Sáng kiến & Dự án',
        type: 'list',
      },
    ],
  },
  'recognition': {
    fields: [
      {
        key: 'items',
        label: 'Vinh danh & Giải thưởng',
        type: 'list',
      },
    ],
  },
  'guidelines': {
    fields: [
      {
        key: 'items',
        label: 'Hướng dẫn & Quy trình',
        type: 'list',
      },
    ],
  },
};
