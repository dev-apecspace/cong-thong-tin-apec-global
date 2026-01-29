-- SQL Script: Update Capabilities Module with Evidence Links
-- Mỗi hồ sơ năng lực có 3 cách chứng minh: Web Link, View File, Download File
-- Date: 2026-01-29

-- ============================================
-- UPDATE CAPABILITIES FOR NAM THIÊN LONG
-- ============================================

UPDATE module_project_details 
SET content = '{
  "capabilityItems": [
    {
      "name": "Giải pháp ERP - Dự án TSDB 2023",
      "description": "Triển khai hệ thống ERP toàn diện cho công ty dệt may hàng đầu, tăng 35% hiệu suất sản xuất",
      "webUrl": "https://case-study.namthienlong.vn/erp-tsdb-2023",
      "fileUrl": "https://storage.namthienlong.vn/case-studies/ERP-TSDB-2023.pdf",
      "downloadUrl": "https://storage.namthienlong.vn/case-studies/ERP-TSDB-2023-full.pdf"
    },
    {
      "name": "Chứng chỉ ISO 27001 - Bảo mật Thông tin",
      "description": "Chứng chỉ quốc tế về quản lý bảo mật thông tin, đạt năm 2022",
      "webUrl": "https://namthienlong.vn/certifications/iso-27001",
      "fileUrl": "https://storage.namthienlong.vn/certificates/ISO-27001-2022.pdf",
      "downloadUrl": "https://storage.namthienlong.vn/certificates/ISO-27001-2022-full.pdf"
    },
    {
      "name": "Giải thưởng Sao Khuê 2023",
      "description": "Giải thưởng doanh nghiệp CNTT xuất sắc 2023, công ty là top 10 Việt Nam",
      "webUrl": "https://namthienlong.vn/awards/sao-khuae-2023",
      "fileUrl": "https://storage.namthienlong.vn/awards/Sao-Khuae-2023-Certificate.pdf",
      "downloadUrl": "https://storage.namthienlong.vn/awards/Sao-Khuae-2023-Detailed.pdf"
    },
    {
      "name": "Hồ sơ năng lực 2024",
      "description": "Tờ rơi tổng hợp năng lực, đơi với khách hàng",
      "webUrl": "https://namthienlong.vn/profile",
      "fileUrl": "https://storage.namthienlong.vn/documents/Profie-2024.pdf",
      "downloadUrl": "https://storage.namthienlong.vn/documents/Profile-2024-full-version.pdf"
    }
  ],
  "achievements": ["Giải thưởng Sao Khuê 2023", "Top 10 doanh nghiệp CNTT Việt Nam", "Chứng chỉ ISO 27001"],
  "experience": "Hơn 10 năm kinh nghiệm trong ngành công nghệ"
}'
WHERE module_id = 'capabilities' AND project_id = 'nam-thien-long';

-- ============================================
-- UPDATE CAPABILITIES FOR APEC BCI
-- ============================================

UPDATE module_project_details 
SET content = '{
  "capabilityItems": [
    {
      "name": "Báo cáo Phân tích Thị trường Fintech 2024",
      "description": "Báo cáo chi tiết về xu hướng fintech trong khu vực Đông Nam Á",
      "webUrl": "https://apecbci.vn/market-report/fintech-2024",
      "fileUrl": "https://storage.apecbci.vn/reports/Fintech-Market-Report-2024.pdf",
      "downloadUrl": "https://storage.apecbci.vn/reports/Fintech-Market-Report-2024-extended.pdf"
    },
    {
      "name": "Chứng chỉ Quản lý Danh mục CFA Level 3",
      "description": "Đội ngũ quản lý tài sản đạt chứng chỉ CFA cao cấp",
      "webUrl": "https://apecbci.vn/credentials/cfa-certified",
      "fileUrl": "https://storage.apecbci.vn/credentials/CFA-Level3-Certificate.pdf",
      "downloadUrl": "https://storage.apecbci.vn/credentials/CFA-Level3-Complete.pdf"
    },
    {
      "name": "Danh sách Các dự án Đầu tư Thành công",
      "description": "Portfolio 15 dự án unicorn và startup triển vọng được APEC BCI đầu tư từ 2020-2024",
      "webUrl": "https://apecbci.vn/portfolio/success-stories",
      "fileUrl": "https://storage.apecbci.vn/portfolio/Investment-Portfolio-2020-2024.pdf",
      "downloadUrl": "https://storage.apecbci.vn/portfolio/Investment-Portfolio-Complete-2024.xlsx"
    },
    {
      "name": "Hồ sơ năng lực Tài chính & Đầu tư",
      "description": "Hồ sơ chi tiết về năng lực quản lý tài sản và tư vấn đầu tư",
      "webUrl": "https://apecbci.vn/company/profile",
      "fileUrl": "https://storage.apecbci.vn/documents/APEC-BCI-Profile-2024.pdf",
      "downloadUrl": "https://storage.apecbci.vn/documents/APEC-BCI-Profile-2024-full.pdf"
    }
  ],
  "achievements": ["Dự án tiêu biểu 2022", "Đối tác chiến lược toàn cầu", "Chứng chỉ quản lý chất lượng"],
  "experience": "Đội ngũ chuyên gia hàng đầu từ các tập đoàn đa quốc gia"
}'
WHERE module_id = 'capabilities' AND project_id = 'apec-bci';

-- ============================================
-- UPDATE CAPABILITIES FOR LIFECARE
-- ============================================

UPDATE module_project_details 
SET content = '{
  "capabilityItems": [
    {
      "name": "Báo cáo Y tế Dự phòng 2024",
      "description": "Báo cáo kết quả triển khai chăm sóc sức khỏe chủ động tại 50 khu vực",
      "webUrl": "https://lifecare.vn/research/preventive-medicine-2024",
      "fileUrl": "https://storage.lifecare.vn/reports/Preventive-Health-Report-2024.pdf",
      "downloadUrl": "https://storage.lifecare.vn/reports/Preventive-Health-Report-2024-full.pdf"
    },
    {
      "name": "Chứng chỉ WHO - Đối tác Y tế Toàn cầu",
      "description": "Chứng nhận là đối tác chính thức của WHO tại Việt Nam trong lĩnh vực sức khỏe cộng đồng",
      "webUrl": "https://lifecare.vn/credentials/who-partner",
      "fileUrl": "https://storage.lifecare.vn/certificates/WHO-Partner-Certificate.pdf",
      "downloadUrl": "https://storage.lifecare.vn/certificates/WHO-Partner-Certificate-full.pdf"
    },
    {
      "name": "Danh sách Các trang thiết bị Y tế",
      "description": "Bảng danh sách toàn bộ thiết bị y tế cao cấp được sử dụng tại các cơ sở LifeCare",
      "webUrl": "https://lifecare.vn/medical-equipment/catalog",
      "fileUrl": "https://storage.lifecare.vn/catalogs/Medical-Equipment-Catalog-2024.pdf",
      "downloadUrl": "https://storage.lifecare.vn/catalogs/Medical-Equipment-Catalog-2024.xlsx"
    },
    {
      "name": "Hồ sơ Khả năng Y tế & Chăm sóc",
      "description": "Tờ rơi chi tiết về các dịch vụ chăm sóc sức khỏe toàn diện",
      "webUrl": "https://lifecare.vn/company/capabilities",
      "fileUrl": "https://storage.lifecare.vn/documents/LifeCare-Profile-2024.pdf",
      "downloadUrl": "https://storage.lifecare.vn/documents/LifeCare-Profile-2024-extended.pdf"
    }
  ],
  "achievements": ["Huân chương lao động hạng nhì", "Top 10 thương hiệu vì sức khỏe cộng đồng", "Đối tác WHO tại VN"],
  "experience": "Tiên phong trong lĩnh vực y tế dự phòng và công nghệ sinh học"
}'
WHERE module_id = 'capabilities' AND project_id = 'lifecare';

-- ============================================
-- UPDATE CAPABILITIES FOR SUPERAPP
-- ============================================

UPDATE module_project_details 
SET content = '{
  "capabilityItems": [
    {
      "name": "Báo cáo Người dùng & Lượt tải xuống 2024",
      "description": "SUPERAPP đạt 10 triệu người dùng hoạt động hàng tháng, top 1 ứng dụng tải nhiều nhất",
      "webUrl": "https://superapp.vn/metrics/user-growth-2024",
      "fileUrl": "https://storage.superapp.vn/reports/User-Growth-Report-2024.pdf",
      "downloadUrl": "https://storage.superapp.vn/reports/User-Growth-Report-2024-detailed.pdf"
    },
    {
      "name": "Chứng chỉ Bảo mật PCI DSS Level 1",
      "description": "Xác nhận tiêu chuẩn bảo mật thanh toán quốc tế cao nhất",
      "webUrl": "https://superapp.vn/security/pci-dss",
      "fileUrl": "https://storage.superapp.vn/certificates/PCI-DSS-Level1-Certificate.pdf",
      "downloadUrl": "https://storage.superapp.vn/certificates/PCI-DSS-Level1-Full.pdf"
    },
    {
      "name": "Kiến trúc Big Data & AI",
      "description": "Tài liệu kỹ thuật về hệ thống xử lý dữ liệu lớn và machine learning của SUPERAPP",
      "webUrl": "https://superapp.vn/tech/architecture",
      "fileUrl": "https://storage.superapp.vn/documents/Big-Data-Architecture.pdf",
      "downloadUrl": "https://storage.superapp.vn/documents/Big-Data-Architecture-Technical.pdf"
    },
    {
      "name": "Danh sách Mini App & Ecosystem",
      "description": "Danh sách toàn bộ các mini app và dịch vụ được tích hợp trên nền tảng SUPERAPP",
      "webUrl": "https://superapp.vn/services/ecosystem",
      "fileUrl": "https://storage.superapp.vn/documents/Mini-Apps-Ecosystem-2024.pdf",
      "downloadUrl": "https://storage.superapp.vn/documents/Mini-Apps-Ecosystem-2024.xlsx"
    }
  ],
  "achievements": ["Top 1 Ứng dụng tải nhiều nhất 2023", "Chứng chỉ bảo mật PCI DSS", "10 triệu người dùng hoạt động"],
  "experience": "Dẫn đầu xu hướng nền tảng tất cả trong một"
}'
WHERE module_id = 'capabilities' AND project_id = 'superapp';

-- ============================================
-- UPDATE CAPABILITIES FOR GUARDCAM
-- ============================================

UPDATE module_project_details 
SET content = '{
  "capabilityItems": [
    {
      "name": "Bằng sáng chế - Thuật toán Nhận diện Khuôn mặt AI",
      "description": "Bằng sáng chế được cấp cho thuật toán nhận diện khuôn mặt độ chính xác 99.8%",
      "webUrl": "https://guardcam.vn/patents/face-recognition-algorithm",
      "fileUrl": "https://storage.guardcam.vn/patents/Face-Recognition-Patent.pdf",
      "downloadUrl": "https://storage.guardcam.vn/patents/Face-Recognition-Patent-Full.pdf"
    },
    {
      "name": "Báo cáo Triển khai Smart City",
      "description": "Báo cáo chi tiết về triển khai giải pháp giám sát thông minh tại 5 thành phố lớn",
      "webUrl": "https://guardcam.vn/projects/smart-city",
      "fileUrl": "https://storage.guardcam.vn/reports/Smart-City-Implementation-Report.pdf",
      "downloadUrl": "https://storage.guardcam.vn/reports/Smart-City-Implementation-Report-Complete.pdf"
    },
    {
      "name": "Chứng chỉ An ninh Mạng ISO 27001",
      "description": "Chứng chỉ quản lý bảo mật thông tin quốc tế cho hệ thống lưu trữ đám mây",
      "webUrl": "https://guardcam.vn/certificates/iso-27001",
      "fileUrl": "https://storage.guardcam.vn/certificates/ISO-27001-Cloud-Storage.pdf",
      "downloadUrl": "https://storage.guardcam.vn/certificates/ISO-27001-Cloud-Storage-Full.pdf"
    },
    {
      "name": "Hồ sơ Năng lực Camera AI & An ninh",
      "description": "Hồ sơ chi tiết các giải pháp camera AI, hệ thống báo động, giám sát đô thị",
      "webUrl": "https://guardcam.vn/company/capabilities",
      "fileUrl": "https://storage.guardcam.vn/documents/GuardCAM-Profile-2024.pdf",
      "downloadUrl": "https://storage.guardcam.vn/documents/GuardCAM-Profile-2024-Extended.pdf"
    }
  ],
  "achievements": ["Giải pháp an ninh xuất sắc 2022", "Triển khai Smart City tại 5 thành phố", "Bằng sáng chế thuật toán AI"],
  "experience": "Kỹ sư chuyên gia từ các viện nghiên cứu an ninh"
}'
WHERE module_id = 'capabilities' AND project_id = 'guardcam';

-- ============================================
-- UPDATE CAPABILITIES FOR ECOOP
-- ============================================

UPDATE module_project_details 
SET content = '{
  "capabilityItems": [
    {
      "name": "Báo cáo Blockchain Truy xuất Nông sản",
      "description": "Báo cáo chi tiết về hệ thống blockchain truy xuất nguồn gốc nông sản từ nông dân đến nhà tiêu dùng",
      "webUrl": "https://ecoop.vn/blockchain/supply-chain",
      "fileUrl": "https://storage.ecoop.vn/reports/Blockchain-Supply-Chain-Report.pdf",
      "downloadUrl": "https://storage.ecoop.vn/reports/Blockchain-Supply-Chain-Report-Full.pdf"
    },
    {
      "name": "Chứng nhận Nông sản Hữu cơ Quốc tế",
      "description": "Chứng nhận hữu cơ từ tổ chức quốc tế cho các sản phẩm nông sản qua nền tảng ECOOP",
      "webUrl": "https://ecoop.vn/organic-certified",
      "fileUrl": "https://storage.ecoop.vn/certificates/Organic-Certification-International.pdf",
      "downloadUrl": "https://storage.ecoop.vn/certificates/Organic-Certification-International-Full.pdf"
    },
    {
      "name": "Danh sách Các Hợp tác xã Đối tác",
      "description": "Danh sách hơn 1000 hợp tác xã nông sản được kết nối thông qua nền tảng ECOOP",
      "webUrl": "https://ecoop.vn/partners/cooperative-list",
      "fileUrl": "https://storage.ecoop.vn/documents/Partner-Cooperative-Directory-2024.pdf",
      "downloadUrl": "https://storage.ecoop.vn/documents/Partner-Cooperative-Directory-2024.xlsx"
    },
    {
      "name": "Hồ sơ Nông nghiệp Công nghệ cao",
      "description": "Hồ sơ chi tiết về mô hình nông nghiệp công nghệ cao và logistics thông minh",
      "webUrl": "https://ecoop.vn/company/agritech-profile",
      "fileUrl": "https://storage.ecoop.vn/documents/ECOOP-AgriTech-Profile-2024.pdf",
      "downloadUrl": "https://storage.ecoop.vn/documents/ECOOP-AgriTech-Profile-2024-Full.pdf"
    }
  ],
  "achievements": ["Sáng kiến nông nghiệp xanh 2023", "Kết nối hơn 1000 hợp tác xã", "Chứng nhận hữu cơ quốc tế"],
  "experience": "Kết hợp tri thức nông nghiệp và công nghệ hiện đại"
}'
WHERE module_id = 'capabilities' AND project_id = 'ecoop';
