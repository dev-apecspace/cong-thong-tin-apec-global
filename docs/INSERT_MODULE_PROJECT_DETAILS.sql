-- SQL Script: Insert Module Project Details for 6 Companies and 9 Modules
-- APEC Global CMS Data
-- Date: 2024-01-29

-- ============================================
-- MODULE 1: company-info
-- ============================================

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('company-info', 'nam-thien-long', '{
  "summary": "NAM THIÊN LONG là đơn vị tiên phong trong lĩnh vực gia công phần mềm và giải pháp chuyển đổi số tại Việt Nam, với đội ngũ kỹ sư giàu kinh nghiệm.",
  "webLink": "https://namthienlong.vn",
  "corporateInfo": {
    "email": "contact@namthienlong.vn",
    "phone": "028 1234 5678",
    "founded": "20/05/2012",
    "ceo": "Nguyễn Văn A",
    "address": "72 Lê Thánh Tôn, Quận 1, TP.HCM",
    "hotline": "1900 1234"
  },
  "legalInfo": {
    "taxCode": "0102030405",
    "issuedDate": "15/06/2012",
    "issuedBy": "Sở KH&ĐT TP.HCM",
    "type": "Công ty Cổ phần"
  }
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('company-info', 'apec-bci', '{
  "summary": "APEC BCI tập trung vào các giải pháp tài chính số và đầu tư mạo hiểm, kết nối các startup tiềm năng với nguồn vốn quốc tế.",
  "webLink": "https://apecbci.vn",
  "corporateInfo": {
    "email": "info@apecbci.vn",
    "phone": "028 8888 9999",
    "founded": "10/10/2015",
    "ceo": "Trần Thị B",
    "address": "VP APEC, Quận 7, TP.HCM",
    "hotline": "1800 5555"
  },
  "legalInfo": {
    "taxCode": "0908070605",
    "issuedDate": "12/11/2015",
    "issuedBy": "Sở KH&ĐT TP.HCM",
    "type": "Công ty TNHH MTV"
  }
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('company-info', 'lifecare', '{
  "summary": "LIFECARE mang đến hệ sinh thái chăm sóc sức khỏe toàn diện dựa trên nền tảng công nghệ sinh học và dữ liệu lớn.",
  "webLink": "https://lifecare.vn",
  "corporateInfo": {
    "email": "care@lifecare.vn",
    "phone": "028 7777 6666",
    "founded": "01/01/2018",
    "ceo": "Phạm Văn C",
    "address": "Tòa nhà Healthcare, Q.3, TP.HCM",
    "hotline": "1900 8888"
  },
  "legalInfo": {
    "taxCode": "1122334455",
    "issuedDate": "05/01/2018",
    "issuedBy": "Sở Y Tế TP.HCM",
    "type": "Công ty Cổ phần Dịch vụ"
  }
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('company-info', 'superapp', '{
  "summary": "SUPERAPP là nền tảng đa dịch vụ phục vụ mọi nhu cầu hàng ngày của người dùng Việt, từ thanh toán đến thương mại điện tử.",
  "webLink": "https://superapp.vn",
  "corporateInfo": {
    "email": "dev@superapp.vn",
    "phone": "028 2222 3333",
    "founded": "15/03/2020",
    "ceo": "Lê Văn D",
    "address": "Digital Hub, Quận 2, TP.HCM",
    "hotline": "1900 2020"
  },
  "legalInfo": {
    "taxCode": "2233445566",
    "issuedDate": "15/03/2020",
    "issuedBy": "Sở KH&ĐT TP.HCM",
    "type": "Công ty Công nghệ"
  }
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('company-info', 'guardcam', '{
  "summary": "GUARDCAM dẫn đầu thị trường camera AI và các giải pháp an ninh thông minh cho đô thị và hộ gia đình.",
  "webLink": "https://guardcam.vn",
  "corporateInfo": {
    "email": "security@guardcam.vn",
    "phone": "028 4444 5555",
    "founded": "20/08/2019",
    "ceo": "Hoàng Văn E",
    "address": "Security Center, Q.Tân Bình, TP.HCM",
    "hotline": "1900 9999"
  },
  "legalInfo": {
    "taxCode": "3344556677",
    "issuedDate": "20/08/2019",
    "issuedBy": "Sở KH&ĐT TP.HCM",
    "type": "Công ty Dịch vụ An ninh"
  }
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('company-info', 'ecoop', '{
  "summary": "ECOOP kết nối trực tiếp nông dân với người tiêu dùng thông qua nền tảng thương mại điện tử và chuỗi cung ứng thông minh.",
  "webLink": "https://ecoop.vn",
  "corporateInfo": {
    "email": "agri@ecoop.vn",
    "phone": "028 5555 6666",
    "founded": "12/12/2021",
    "ceo": "Đặng Thị F",
    "address": "AgriTech Park, Củ Chi, TP.HCM",
    "hotline": "1800 6666"
  },
  "legalInfo": {
    "taxCode": "4455667788",
    "issuedDate": "12/12/2021",
    "issuedBy": "Sở NN&PTNT TP.HCM",
    "type": "Hợp tác xã Công nghệ cao"
  }
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- MODULE 2: capabilities
-- ============================================

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('capabilities', 'nam-thien-long', '{
  "capabilities": ["Phát triển phần mềm doanh nghiệp", "Tư vấn chuyển đổi số", "Triển khai hệ thống ERP", "An ninh mạng & Bảo mật"],
  "achievements": ["Giải thưởng Sao Khuê 2023", "Top 10 doanh nghiệp CNTT Việt Nam", "Chứng chỉ ISO 27001"],
  "experience": "Hơn 10 năm kinh nghiệm trong ngành công nghệ",
  "profileUrl": "/docs/profile-namthienlong.pdf"
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('capabilities', 'apec-bci', '{
  "capabilities": ["Tư vấn đầu tư tài chính", "Quản lý tài sản số", "Phân tích thị trường", "Bất động sản công nghiệp"],
  "achievements": ["Dự án tiêu biểu 2022", "Đối tác chiến lược toàn cầu", "Chứng chỉ quản lý chất lượng"],
  "experience": "Đội ngũ chuyên gia hàng đầu từ các tập đoàn đa quốc gia",
  "profileUrl": "/docs/profile-apecbci.pdf"
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('capabilities', 'lifecare', '{
  "capabilities": ["Chăm sóc sức khỏe chủ động", "Phân phối dược phẩm", "Quản lý bệnh viện số", "Thiết bị y tế cao cấp"],
  "achievements": ["Huân chương lao động hạng nhì", "Top 10 thương hiệu vì sức khỏe cộng đồng", "Đối tác WHO tại VN"],
  "experience": "Tiên phong trong lĩnh vực y tế dự phòng và công nghệ sinh học",
  "profileUrl": "/docs/profile-lifecare.pdf"
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('capabilities', 'superapp', '{
  "capabilities": ["Phát triển ứng dụng Mobile siêu đa năng", "Nền tảng thanh toán điện tử", "Hệ sinh thái Mini-app", "Xử lý dữ liệu lớn (Big Data)"],
  "achievements": ["Top 1 Ứng dụng tải nhiều nhất 2023", "Chứng chỉ bảo mật PCI DSS", "10 triệu người dùng hoạt động"],
  "experience": "Dẫn đầu xu hướng nền tảng tất cả trong một",
  "profileUrl": "/docs/profile-superapp.pdf"
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('capabilities', 'guardcam', '{
  "capabilities": ["Camera AI nhận diện khuôn mặt", "Hệ thống báo động thông minh", "Giải pháp giám sát đô thị", "Lưu trữ đám mây bảo mật cao"],
  "achievements": ["Giải pháp an ninh xuất sắc 2022", "Triển khai Smart City tại 5 thành phố", "Bằng sáng chế thuật toán AI"],
  "experience": "Kỹ sư chuyên gia từ các viện nghiên cứu an ninh",
  "profileUrl": "/docs/profile-guardcam.pdf"
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('capabilities', 'ecoop', '{
  "capabilities": ["Sàn thương mại điện tử nông sản", "Truy xuất nguồn gốc Blockchain", "Logistics thông minh cho nông nghiệp", "Tư vấn nông nghiệp công nghệ cao"],
  "achievements": ["Sáng kiến nông nghiệp xanh 2023", "Kết nối hơn 1000 hợp tác xã", "Chứng nhận hữu cơ quốc tế"],
  "experience": "Kết hợp tri thức nông nghiệp và công nghệ hiện đại",
  "profileUrl": "/docs/profile-ecoop.pdf"
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- MODULE 3: policies
-- ============================================

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('policies', 'nam-thien-long', '{
  "policies": [
    {"title": "Nội quy lao động 2024", "date": "01/01/2024", "type": "PDF"},
    {"title": "Chính sách bảo mật dữ liệu", "date": "15/03/2023", "type": "DOCX"},
    {"title": "Quy trình thanh toán nội bộ", "date": "10/12/2023", "type": "PDF"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('policies', 'apec-bci', '{
  "policies": [
    {"title": "Quy trình thẩm định đầu tư", "date": "05/02/2024", "type": "PDF"},
    {"title": "Chính sách quản lý rủi ro", "date": "12/01/2024", "type": "PDF"},
    {"title": "Hướng dẫn giao dịch tài sản số", "date": "20/03/2024", "type": "DOCX"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('policies', 'lifecare', '{
  "policies": [
    {"title": "Tiêu chuẩn an toàn dược phẩm", "date": "01/01/2024", "type": "PDF"},
    {"title": "Quy tắc ứng xử với bệnh nhân", "date": "15/02/2024", "type": "PDF"},
    {"title": "Quy trình kiểm soát chất lượng", "date": "10/03/2024", "type": "PDF"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('policies', 'superapp', '{
  "policies": [
    {"title": "Chính sách quyền riêng tư người dùng", "date": "01/01/2024", "type": "PDF"},
    {"title": "Quy định phát triển Mini-app", "date": "15/01/2024", "type": "PDF"},
    {"title": "Tiêu chuẩn bảo mật API", "date": "20/02/2024", "type": "DOCX"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('policies', 'guardcam', '{
  "policies": [
    {"title": "Quy định sử dụng dữ liệu Camera", "date": "10/01/2024", "type": "PDF"},
    {"title": "Quy trình xử lý sự cố an ninh", "date": "15/02/2024", "type": "PDF"},
    {"title": "Tiêu chuẩn lắp đặt thiết bị", "date": "01/03/2024", "type": "PDF"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('policies', 'ecoop', '{
  "policies": [
    {"title": "Tiêu chuẩn kiểm soát nông sản", "date": "01/01/2024", "type": "PDF"},
    {"title": "Chính sách hỗ trợ xã viên", "date": "15/01/2024", "type": "PDF"},
    {"title": "Quy trình thanh toán nông hộ", "date": "10/02/2024", "type": "PDF"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- MODULE 4: career-path
-- ============================================

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('career-path', 'nam-thien-long', '{
  "careerLevels": [
    {"title": "Junior Developer", "period": "0-2 năm", "skills": "Kỹ năng lập trình cơ bản"},
    {"title": "Senior Developer", "period": "3-5 năm", "skills": "Làm chủ hệ thống, Mentor Junior"},
    {"title": "Technical Lead", "period": "5-8 năm", "skills": "Quản lý đội ngũ, Kiến trúc hệ thống"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('career-path', 'apec-bci', '{
  "careerLevels": [
    {"title": "Investment Analyst", "period": "0-2 năm", "skills": "Phân tích tài chính cơ bản"},
    {"title": "Senior Analyst", "period": "3-5 năm", "skills": "Quản lý danh mục, Định giá"},
    {"title": "Investment Manager", "period": "5-8 năm", "skills": "Chiến lược đầu tư, Quản lý đội"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('career-path', 'lifecare', '{
  "careerLevels": [
    {"title": "Health Officer", "period": "0-2 năm", "skills": "Kiến thức y tế cơ bản"},
    {"title": "Senior Health Officer", "period": "3-5 năm", "skills": "Quản lý dự án sức khỏe"},
    {"title": "Health Director", "period": "5-8 năm", "skills": "Chiến lược y tế, Quản lý bệnh viện"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('career-path', 'superapp', '{
  "careerLevels": [
    {"title": "Product Trainee", "period": "0-1 năm", "skills": "Tư duy sản phẩm, Phân tích nghiệp vụ"},
    {"title": "Product Owner", "period": "2-4 năm", "skills": "Quản lý roadmap, Tối ưu trải nghiệm"},
    {"title": "Product Director", "period": "5-10 năm", "skills": "Chiến lược hệ sinh thái số"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('career-path', 'guardcam', '{
  "careerLevels": [
    {"title": "AI Research Engineer", "period": "0-3 năm", "skills": "Thuật toán Computer Vision"},
    {"title": "Senior AI Engineer", "period": "4-7 năm", "skills": "Tối ưu hóa mô hình thực tế"},
    {"title": "Chief Technology Officer", "period": "10+ năm", "skills": "Định hướng công nghệ an ninh"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('career-path', 'ecoop', '{
  "careerLevels": [
    {"title": "Supply Chain Specialist", "period": "0-2 năm", "skills": "Điều phối nông sản, Logistics"},
    {"title": "Supply Chain Manager", "period": "3-6 năm", "skills": "Quản trị chuỗi cung ứng nông sản"},
    {"title": "Regional Director", "period": "7+ năm", "skills": "Phát triển thị trường vùng miền"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- MODULE 5: events
-- ============================================

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('events', 'nam-thien-long', '{
  "items": [
    {"title": "Teambuilding Hè 2024", "date": "15/07/2024", "location": "Phan Thiết", "status": "Sắp diễn ra"},
    {"title": "Workshop AI & Future", "date": "20/06/2024", "location": "Hội trường A", "status": "Đang đăng ký"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('events', 'apec-bci', '{
  "items": [
    {"title": "Forum Đầu tư Tài chính số", "date": "25/06/2024", "location": "Hội trường Saigon", "status": "Sắp diễn ra"},
    {"title": "Roadshow Startup Financing", "date": "10/07/2024", "location": "Các thành phố lớn", "status": "Đang đăng ký"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('events', 'lifecare', '{
  "items": [
    {"title": "Hội thảo Sức khỏe toàn diện", "date": "18/06/2024", "location": "Bệnh viện Chợ Rẫy", "status": "Đang đăng ký"},
    {"title": "Ngày hội Khám sức khỏe miễn phí", "date": "05/07/2024", "location": "Công viên 23/9", "status": "Chuẩn bị"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('events', 'superapp', '{
  "items": [
    {"title": "Hackathon: Future App", "date": "10/08/2024", "location": "SuperApp Hub", "status": "Sắp diễn ra"},
    {"title": "Ra mắt phiên bản 3.0", "date": "01/06/2024", "location": "Sự kiện trực tuyến", "status": "Hoàn tất"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('events', 'guardcam', '{
  "items": [
    {"title": "Triển lãm An ninh quốc tế", "date": "15/09/2024", "location": "SECC Q.7", "status": "Chuẩn bị"},
    {"title": "Hội thảo Smart Home", "date": "05/07/2024", "location": "Showroom GuardCam", "status": "Đang đăng ký"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('events', 'ecoop', '{
  "items": [
    {"title": "Ngày hội Nông sản Việt", "date": "20/10/2024", "location": "Công viên 23/9", "status": "Lên kế hoạch"},
    {"title": "Ký kết đối tác xuất khẩu", "date": "12/06/2024", "location": "Văn phòng Ecoop", "status": "Đang diễn ra"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- MODULE 6: news
-- ============================================

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('news', 'nam-thien-long', '{
  "items": [
    {"title": "Khai trương văn phòng mới tại Hà Nội", "date": "10/05/2024", "category": "Tin doanh nghiệp"},
    {"title": "Chứng nhận bảo mật cấp độ 4", "date": "05/05/2024", "category": "Công nghệ"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('news', 'apec-bci', '{
  "items": [
    {"title": "Huy động vốn Series A $50M", "date": "20/05/2024", "category": "Tài chính"},
    {"title": "Bổ nhiệm CEO mới từ Silicon Valley", "date": "15/05/2024", "category": "Nhân sự"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('news', 'lifecare', '{
  "items": [
    {"title": "Hợp tác với Bộ Y tế phát triển dự án sức khỏe", "date": "12/05/2024", "category": "Hợp tác"},
    {"title": "Triển khai 50 phòng khám tại các huyện", "date": "08/05/2024", "category": "Mở rộng"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('news', 'superapp', '{
  "items": [
    {"title": "Đạt mốc 500,000 giao dịch/ngày", "date": "20/05/2024", "category": "Tăng trưởng"},
    {"title": "Hợp tác chiến lược với ngân hàng lớn", "date": "15/05/2024", "category": "Kinh doanh"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('news', 'guardcam', '{
  "items": [
    {"title": "Ra mắt Camera AI thế hệ mới", "date": "10/05/2024", "category": "Sản phẩm"},
    {"title": "Bảo vệ an ninh cho sự kiện cấp quốc gia", "date": "02/05/2024", "category": "Dự án"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('news', 'ecoop', '{
  "items": [
    {"title": "Xây dựng vùng nguyên liệu 100ha", "date": "18/05/2024", "category": "Dự án"},
    {"title": "Nông sản Ecoop lên kệ siêu thị Nhật", "date": "12/05/2024", "category": "Thị trường"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- MODULE 7: initiatives
-- ============================================

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('initiatives', 'nam-thien-long', '{
  "items": [
    {"title": "Sáng kiến \"Văn phòng xanh\"", "date": "01/01/2024", "category": "Môi trường"},
    {"title": "Hệ thống tự động hóa quản lý văn phòng", "date": "15/02/2024", "category": "Năng suất"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('initiatives', 'apec-bci', '{
  "items": [
    {"title": "Quỹ đầu tư xanh cho startup green-tech", "date": "05/01/2024", "category": "Bền vững"},
    {"title": "Accelerator chuyên về FinTech", "date": "20/02/2024", "category": "Hỗ trợ"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('initiatives', 'lifecare', '{
  "items": [
    {"title": "Sáng kiến \"Sức khỏe cho mọi người\"", "date": "10/01/2024", "category": "Xã hội"},
    {"title": "Chương trình chủng ngừa miễn phí", "date": "15/03/2024", "category": "Y tế"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('initiatives', 'superapp', '{
  "items": [
    {"title": "Dự án \"Ví không tiền mặt\"", "date": "01/03/2024", "category": "Tài chính số"},
    {"title": "Hệ thống gợi ý AI cho người dùng", "date": "10/04/2024", "category": "Trải nghiệm"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('initiatives', 'guardcam', '{
  "items": [
    {"title": "Sáng kiến \"Mắt thần đô thị\"", "date": "15/01/2024", "category": "Xã hội"},
    {"title": "Thuật toán nén video chuẩn 8K", "date": "20/03/2024", "category": "Kỹ thuật"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('initiatives', 'ecoop', '{
  "items": [
    {"title": "Mô hình \"Nông nghiệp tuần hoàn\"", "date": "01/02/2024", "category": "Bền vững"},
    {"title": "Ứng dụng IoT trong tưới tiêu tự động", "date": "10/05/2024", "category": "Công nghệ"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- MODULE 8: recognition
-- ============================================

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('recognition', 'nam-thien-long', '{
  "items": [
    {"title": "Nhân viên xuất sắc Quý 1/2024", "date": "31/03/2024", "category": "Vinh danh cá nhân"},
    {"title": "Đội ngũ phát triển tiềm năng", "date": "15/04/2024", "category": "Đội ngũ"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('recognition', 'apec-bci', '{
  "items": [
    {"title": "Giải thưởng Startup xuất sắc 2024", "date": "25/04/2024", "category": "Kinh doanh"},
    {"title": "Đội ngũ tài chính giỏi nhất khu vực", "date": "10/05/2024", "category": "Đội ngũ"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('recognition', 'lifecare', '{
  "items": [
    {"title": "Giải thưởng Y tế xuất sắc 2024", "date": "20/04/2024", "category": "Sức khỏe"},
    {"title": "Bác sĩ triển vọng năm 2024", "date": "15/05/2024", "category": "Cá nhân"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('recognition', 'superapp', '{
  "items": [
    {"title": "Giải thưởng App của năm 2023", "date": "20/12/2023", "category": "Thị trường"},
    {"title": "Kỹ sư hệ thống tiêu biểu", "date": "10/05/2024", "category": "Cá nhân"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('recognition', 'guardcam', '{
  "items": [
    {"title": "Top 10 giải pháp an ninh khu vực", "date": "05/04/2024", "category": "Giải thưởng"},
    {"title": "Dự án an ninh xuất sắc Quý 1", "date": "15/04/2024", "category": "Tập thể"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('recognition', 'ecoop', '{
  "items": [
    {"title": "Sản phẩm OCOP 5 sao", "date": "25/03/2024", "category": "Chất lượng"},
    {"title": "Hợp tác xã tiêu biểu toàn quốc", "date": "10/05/2024", "category": "Danh hiệu"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- MODULE 9: guidelines
-- ============================================

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('guidelines', 'nam-thien-long', '{
  "items": [
    {"title": "Hướng dẫn sử dụng CRM mới", "date": "01/05/2024", "category": "Hệ thống"},
    {"title": "Quy trình đăng ký nghỉ phép trực tuyến", "date": "10/05/2024", "category": "Nhân sự"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('guidelines', 'apec-bci', '{
  "items": [
    {"title": "Hướng dẫn quy trình phê duyệt đầu tư", "date": "15/04/2024", "category": "Quy trình"},
    {"title": "Cẩm nang phân tích tài chính", "date": "01/05/2024", "category": "Kỹ thuật"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('guidelines', 'lifecare', '{
  "items": [
    {"title": "Hướng dẫn chẩn đoán bệnh cấp cứu", "date": "10/04/2024", "category": "Y tế"},
    {"title": "Quy trình bảo mật dữ liệu bệnh nhân", "date": "20/05/2024", "category": "An toàn"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('guidelines', 'superapp', '{
  "items": [
    {"title": "Cẩm nang phát triển API cho đối tác", "date": "15/04/2024", "category": "Kỹ thuật"},
    {"title": "Quy trình vận hành ví điện tử", "date": "01/05/2024", "category": "Vận hành"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('guidelines', 'guardcam', '{
  "items": [
    {"title": "Sổ tay lắp đặt Camera AI", "date": "20/04/2024", "category": "Kỹ thuật"},
    {"title": "Hướng dẫn cấu hình bảo mật 2 lớp", "date": "05/05/2024", "category": "An toàn"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

INSERT INTO module_project_details (module_id, project_id, content) VALUES
('guidelines', 'ecoop', '{
  "items": [
    {"title": "Hướng dẫn canh tác theo chuẩn VietGAP", "date": "01/04/2024", "category": "Nghiệp vụ"},
    {"title": "Quy trình đóng gói nông sản xuất khẩu", "date": "15/05/2024", "category": "Sản xuất"}
  ]
}') ON CONFLICT (module_id, project_id) DO UPDATE SET content = EXCLUDED.content;

-- ============================================
-- Summary
-- ============================================
-- Total: 54 records inserted/updated (9 modules × 6 companies)
-- Modules: company-info, capabilities, policies, career-path, events, news, initiatives, recognition, guidelines
-- Companies: nam-thien-long, apec-bci, lifecare, superapp, guardcam, ecoop
