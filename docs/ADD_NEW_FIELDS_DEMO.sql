-- Demo: Thêm Chứng chỉ vào Capabilities của NAM THIÊN LONG
-- Chỉ cần chạy query này, sau đó update schema trong code là xong!

-- Cách 1: Thêm trường certifications vào capabilities của NAM THIÊN LONG
UPDATE module_project_details 
SET content = jsonb_set(
  content, 
  '{certifications}', 
  '["ISO 27001 - Bảo mật thông tin", "ISO 9001 - Quản lý chất lượng", "CMM Level 3 - Phát triển phần mềm"]'::jsonb
)
WHERE module_id = 'capabilities' 
  AND project_id = 'nam-thien-long';

-- Verify
SELECT content FROM module_project_details 
WHERE module_id = 'capabilities' AND project_id = 'nam-thien-long';

-- =========================================
-- Demo: Thêm Address vào company-info
-- =========================================

-- Cách 2: Thêm địa chỉ vào corporateInfo
UPDATE module_project_details 
SET content = jsonb_set(
  content, 
  '{corporateInfo,address}', 
  '"72 Lê Thánh Tôn, Quận 1, TP.HCM"'::jsonb
)
WHERE module_id = 'company-info' 
  AND project_id = 'nam-thien-long';

-- =========================================
-- Demo: Thêm Văn phòng chi nhánh
-- =========================================

-- Cách 3: Thêm danh sách văn phòng (complex object)
UPDATE module_project_details 
SET content = jsonb_set(
  content, 
  '{offices}', 
  '[
    {
      "location": "TP.HCM",
      "address": "72 Lê Thánh Tôn, Quận 1",
      "employees": 200,
      "status": "Chính"
    },
    {
      "location": "Hà Nội",
      "address": "123 Láng Hạ, Quận Đống Đa",
      "employees": 150,
      "status": "Chi nhánh"
    },
    {
      "location": "Đà Nẵng",
      "address": "456 Ngô Quyền, Quận Hải Châu",
      "employees": 100,
      "status": "Chi nhánh"
    }
  ]'::jsonb
)
WHERE module_id = 'company-info' 
  AND project_id = 'nam-thien-long';

-- =========================================
-- Demo: Thêm Training Programs
-- =========================================

UPDATE module_project_details 
SET content = jsonb_set(
  content, 
  '{training}', 
  '{
    "programs": [
      "Java Core & Advanced",
      "Cloud Architecture (AWS, Azure)",
      "Leadership & Management",
      "Agile & Scrum Methodology"
    ],
    "partnered": ["Coursera", "Udacity", "LinkedIn Learning"]
  }'::jsonb
)
WHERE module_id = 'capabilities' 
  AND project_id = 'nam-thien-long';

-- =========================================
-- Demo: Thêm Social Media vào company-info
-- =========================================

UPDATE module_project_details 
SET content = jsonb_set(
  content, 
  '{socialMedia}', 
  '{
    "facebook": "https://facebook.com/namthienlong",
    "linkedin": "https://linkedin.com/company/namthienlong",
    "twitter": "https://twitter.com/namthienlong",
    "youtube": "https://youtube.com/@namthienlong"
  }'::jsonb
)
WHERE module_id = 'company-info' 
  AND project_id = 'nam-thien-long';

-- =========================================
-- Verify toàn bộ data mới
-- =========================================

SELECT 
  module_id,
  project_id,
  content
FROM module_project_details 
WHERE project_id = 'nam-thien-long'
ORDER BY module_id;

-- =========================================
-- Cách xóa một trường (nếu cần)
-- =========================================

-- Xóa certifications
-- UPDATE module_project_details 
-- SET content = content - 'certifications'
-- WHERE module_id = 'capabilities' AND project_id = 'nam-thien-long';

-- =========================================
-- Cách lấy một trường cụ thể
-- =========================================

-- Lấy chỉ certifications
-- SELECT content->'certifications' as certifications
-- FROM module_project_details 
-- WHERE module_id = 'capabilities' AND project_id = 'nam-thien-long';
