import type { SiteConfiguration, CMSProject } from './types';

const commonProjects: CMSProject[] = [
  { id: 'nam-thien-long', name: 'NAM THIÊN LONG', logo: '/logo1.png' },
  { id: 'apec-bci', name: 'APEC BCI', logo: '/logo2.png' },
  { id: 'lifecare', name: 'LIFECare', logo: '/logo3.png' },
  { id: 'superapp', name: 'SUPERAPP', logo: '/logo1.png' },
  { id: 'guardcam', name: 'GUARDCAM', logo: '/logo2.png' },
  { id: 'ecoop', name: 'ECOOP', logo: '/logo3.png' },
];

// Helper to generate module details for all projects
const generateDetails = (projects: CMSProject[], data: any) => {
  const details: Record<string, any> = {};
  projects.forEach((p) => {
    details[p.name] = data[p.id] || data['default'];
  });
  return details;
};

export const cmsData: SiteConfiguration = {
  projects: commonProjects,
  company: {
    name: 'APEC GLOBAL',
    logo: '/favi.png',
    logoAlt: 'APEC GLOBAL Logo',
    slogan: 'KIẾN TẠO GIÁ TRỊ - LÀM CHỦ TƯƠNG LAI',
    shortName: 'APEC',
    brandName: 'GLOBAL',
  },
  header: {
    sticky: true,
    bgColor: '#ffffff',
  },
  overviewSection: {
    title: 'TỔNG QUAN TẬP ĐOÀN',
    description: 'KHÁM PHÁ NHỮNG THÔNG TIN CƠ BẢN VỀ TẬP ĐOÀN',
    blocks: [
      { id: '1', title: 'NHÂN VIÊN', value: '5,000+', description: 'NHÂN SỰ TÀI NĂNG TRÊN TOÀN THẾ GIỚI', icon: 'Users', order: 1, isVisible: true },
      { id: '2', title: 'DOANH THU', value: '$500M+', description: 'TĂNG TRƯỞNG HÀNG NĂM ỔN ĐỊNH', icon: 'TrendingUp', order: 2, isVisible: true },
      { id: '3', title: 'DỰ ÁN', value: '100+', description: 'CÁC DỰ ÁN TRIỂN KHAI THÀNH CÔNG', icon: 'Briefcase', order: 3, isVisible: true },
      { id: '4', title: 'NĂM THÀNH LẬP', value: '2010', description: 'HƠN MỘT THẬP KỶ PHỤC VỤ KHÁCH HÀNG', icon: 'Calendar', order: 4, isVisible: true },
    ],
  },
  moduleNavigation: {
    title: 'TRUNG TÂM THÔNG TIN',
    description: 'CHỌN MỘT DỊCH VỤ ĐỂ XEM CHI TIẾT',
    modules: [
      {
        id: 'company-info',
        title: 'THÔNG TIN\nTẬP ĐOÀN',
        description: 'LỊCH SỬ, SỨ MỆNH VÀ TẦM NHÌN',
        icon: 'Building2',
        order: 1,
        isVisible: true,
        textColor: '#1e40af', // Deep blue
        textColorHover: '#2563eb',
        route: '/company-info',
        backgroundImage: '/cards/corporate-info.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            summary: 'NAM THIÊN LONG là đơn vị tiên phong trong lĩnh vực gia công phần mềm và giải pháp chuyển đổi số tại Việt Nam, với đội ngũ kỹ sư giàu kinh nghiệm.',
            webLink: 'https://namthienlong.vn',
            corporateInfo: { 'Email': 'contact@namthienlong.vn', 'Số điện thoại': '028 1234 5678', 'Ngày thành lập': '20/05/2012', 'Người đại diện': 'Nguyễn Văn A', 'Địa chỉ': '72 Lê Thánh Tôn, Quận 1, TP.HCM', 'Hotline': '1900 1234' },
            legalInfo: { 'Mã số thuế': '0102030405', 'Ngày cấp': '15/06/2012', 'Nơi cấp': 'Sở KH&ĐT TP.HCM', 'Loại hình': 'Công ty Cổ phần' }
          },
          'apec-bci': {
            summary: 'APEC BCI tập trung vào các giải pháp tài chính số và đầu tư mạo hiểm, kết nối các startup tiềm năng với nguồn vốn quốc tế.',
            webLink: 'https://apecbci.vn',
            corporateInfo: { 'Email': 'info@apecbci.vn', 'Số điện thoại': '028 8888 9999', 'Ngày thành lập': '10/10/2015', 'Người đại diện': 'Trần Thị B', 'Địa chỉ': 'VP APEC, Quận 7, TP.HCM', 'Hotline': '1800 5555' },
            legalInfo: { 'Mã số thuế': '0908070605', 'Ngày cấp': '12/11/2015', 'Nơi cấp': 'Sở KH&ĐT TP.HCM', 'Loại hình': 'Công ty TNHH MTV' }
          },
          'lifecare': {
            summary: 'LIFECARE mang đến hệ sinh thái chăm sóc sức khỏe toàn diện dựa trên nền tảng công nghệ sinh học và dữ liệu lớn.',
            webLink: 'https://lifecare.vn',
            corporateInfo: { 'Email': 'care@lifecare.vn', 'Số điện thoại': '028 7777 6666', 'Ngày thành lập': '01/01/2018', 'Người đại diện': 'Phạm Văn C', 'Địa chỉ': 'Tòa nhà Healthcare, Q.3, TP.HCM', 'Hotline': '1900 8888' },
            legalInfo: { 'Mã số thuế': '1122334455', 'Ngày cấp': '05/01/2018', 'Nơi cấp': 'Sở Y Tế TP.HCM', 'Loại hình': 'Công ty Cổ phần Dịch vụ' }
          },
          'superapp': {
            "Tóm tắt": "SUPERAPP là nền tảng đa dịch vụ phục vụ mọi nhu cầu hàng ngày của người dùng Việt, từ thanh toán đến thương mại điện tử.",
            "Liên kết website": "https://superapp.vn",
            "Thông tin pháp lý": {
              "Ngày cấp": "15/03/2020",
              "Cơ quan cấp": "Sở KH&ĐT TP.HCM",
              "Mã số thuế": "2233445566",
              "Loại hình doanh nghiệp": "Công ty Công nghệ"
            },
            "Thông tin doanh nghiệp": {
              "Email": "dev@superapp.vn",
              "Hotline": "1900 2020",
              "Địa chỉ": "Digital Hub, Quận 2, TP.HCM",
              "Ngày thành lập": "15/03/2020",
              "Số điện thoại": "028 2222 3333",
              "Giám đốc điều hành": "Lê Văn D"
            }
          },
          'guardcam': {
            summary: 'GUARDCAM dẫn đầu thị trường camera AI và các giải pháp an ninh thông minh cho đô thị và hộ gia đình.',
            webLink: 'https://guardcam.vn',
            corporateInfo: { 'Email': 'security@guardcam.vn', 'Số điện thoại': '028 4444 5555', 'Ngày thành lập': '20/08/2019', 'Người đại diện': 'Hoàng Văn E', 'Địa chỉ': 'Security Center, Q.Tân Bình, TP.HCM', 'Hotline': '1900 9999' },
            legalInfo: { 'Mã số thuế': '3344556677', 'Ngày cấp': '20/08/2019', 'Nơi cấp': 'Sở KH&ĐT TP.HCM', 'Loại hình': 'Công ty Dịch vụ An ninh' }
          },
          'ecoop': {
            summary: 'ECOOP kết nối trực tiếp nông dân với người tiêu dùng thông qua nền tảng thương mại điện tử và chuỗi cung ứng thông minh.',
            webLink: 'https://ecoop.vn',
            corporateInfo: { 'Email': 'agri@ecoop.vn', 'Số điện thoại': '028 5555 6666', 'Ngày thành lập': '12/12/2021', 'Người đại diện': 'Đặng Thị F', 'Địa chỉ': 'AgriTech Park, Củ Chi, TP.HCM', 'Hotline': '1800 6666' },
            legalInfo: { 'Mã số thuế': '4455667788', 'Ngày cấp': '12/12/2021', 'Nơi cấp': 'Sở NN&PTNT TP.HCM', 'Loại hình': 'Hợp tác xã Công nghệ cao' }
          },
          'default': {
            summary: 'APEC GLOBAL là tập đoàn đa ngành hàng đầu, tiên phong trong việc kiến tạo các giải pháp công nghệ và dịch vụ sáng tạo.',
            webLink: 'https://apecglobal.com',
            corporateInfo: { 'Email': 'info@apecglobal.com', 'Số điện thoại': '028 0000 1111', 'Ngày thành lập': '2010', 'Người đại diện': 'Ban điều hành', 'Địa chỉ': 'Trụ sở chính APEC Global', 'Hotline': '1800 1000' },
            legalInfo: { 'Mã số thuế': '1234567890', 'Ngày cấp': '01/01/2010', 'Nơi cấp': 'Sở KH&ĐT TP.HCM', 'Loại hình': 'Thành viên Tập đoàn' }
          }
        })
      },
      {
        id: 'capabilities',
        title: 'HỒ SƠ\nNĂNG LỰC',
        description: 'CÁC NĂNG LỰC CỐT LÕI CỦ TẬP ĐOÀN',
        icon: 'Briefcase',
        order: 2,
        isVisible: true,
        textColor: '#b45309', // Amber/Gold
        textColorHover: '#d97706',
        route: '/capabilities',
        backgroundImage: '/cards/capabilities.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            capabilityItems: [
              { name: 'Phát triển phần mềm doanh nghiệp', description: 'Giải pháp ERP và quản trị doanh nghiệp toàn diện', webUrl: 'https://namthienlong.vn/services/software', fileUrl: '/docs/capabilities/nam-thien-long/software-dev.pdf', downloadUrl: '/docs/capabilities/nam-thien-long/software-dev.pdf' },
              { name: 'Tư vấn chuyển đổi số', description: 'Lộ trình chuyển đổi số tối ưu cho doanh nghiệp vừa và nhỏ', webUrl: 'https://namthienlong.vn/consulting', fileUrl: '/docs/capabilities/nam-thien-long/digital-transformation.pdf', downloadUrl: '/docs/capabilities/nam-thien-long/digital-transformation.pdf' },
              { name: 'Triển khai hệ thống ERP', description: 'Đối tác chiến lược của SAP và Oracle tại Việt Nam', webUrl: 'https://namthienlong.vn/erp', fileUrl: '/docs/capabilities/nam-thien-long/erp-deployment.pdf', downloadUrl: '/docs/capabilities/nam-thien-long/erp-deployment.pdf' },
              { name: 'An ninh mạng & Bảo mật', description: 'Bảo vệ dữ liệu doanh nghiệp trước các cuộc tấn công hiện đại', webUrl: 'https://namthienlong.vn/security', fileUrl: '/docs/capabilities/nam-thien-long/security.pdf', downloadUrl: '/docs/capabilities/nam-thien-long/security.pdf' }
            ],
            achievements: ['Giải thưởng Sao Khuê 2023', 'Top 10 doanh nghiệp CNTT Việt Nam', 'Chứng chỉ ISO 27001'],
            experience: 'Hơn 10 năm kinh nghiệm trong ngành công nghệ',
            profileUrl: '/docs/profile-namthienlong.pdf'
          },
          'apec-bci': {
            capabilityItems: [
              { name: 'Tư vấn đầu tư tài chính', description: 'Phân tích và tối ưu hóa danh mục đầu tư', webUrl: 'https://apecbci.vn/investment' },
              { name: 'Quản lý tài sản số', description: 'Nền tảng quản lý tài sản trên Blockchain', webUrl: 'https://apecbci.vn/digital-assets' },
              { name: 'Phân tích thị trường', description: 'Báo cáo chuyên sâu về thị trường tài chính Đông Nam Á' },
              { name: 'Bất động sản công nghiệp', description: 'Phát triển các khu công nghiệp thông minh' }
            ],
            achievements: ['Dự án tiêu biểu 2022', 'Đối tác chiến lược toàn cầu', 'Chứng chỉ quản lý chất lượng'],
            experience: 'Đội ngũ chuyên gia hàng đầu từ các tập đoàn đa quốc gia',
            profileUrl: '/docs/profile-apecbci.pdf'
          },
          'lifecare': {
            capabilityItems: [
              { name: 'Chăm sóc sức khỏe chủ động', description: 'Hệ thống phòng khám và chăm sóc từ xa', webUrl: 'https://lifecare.vn/healthcare' },
              { name: 'Phân phối dược phẩm', description: 'Chuỗi cung ứng dược phẩm đạt chuẩn GSP' },
              { name: 'Quản lý bệnh viện số', description: 'Giải pháp HIS/LIS cho các bệnh viện hiện đại' },
              { name: 'Thiết bị y tế cao cấp', description: 'Nhập khẩu và bảo trì trang thiết bị y tế' }
            ],
            achievements: ['Huân chương lao động hạng nhì', 'Top 10 thương hiệu vì sức khỏe cộng đồng', 'Đối tác WHO tại VN'],
            experience: 'Tiên phong trong lĩnh vực y tế dự phòng và công nghệ sinh học',
            profileUrl: '/docs/profile-lifecare.pdf'
          },
          'superapp': {
            capabilityItems: [
              { name: 'Phát triển ứng dụng Mobile siêu đa năng', description: 'Nền tảng tích hợp hơn 50 dịch vụ thiết yếu' },
              { name: 'Nền tảng thanh toán điện tử', description: 'Hệ thống thanh toán bảo mật PCI DSS Level 1' },
              { name: 'Hệ sinh thái Mini-app', description: 'Môi trường phát triển cho các đối tác thứ ba' },
              { name: 'Xử lý dữ liệu lớn (Big Data)', description: 'Phân tích hành vi người dùng bằng AI' }
            ],
            achievements: ['Top 1 Ứng dụng tải nhiều nhất 2023', 'Chứng chỉ bảo mật PCI DSS', '10 triệu người dùng hoạt động'],
            experience: 'Dẫn đầu xu hướng nền tảng tất cả trong một',
            profileUrl: '/docs/profile-superapp.pdf'
          },
          'guardcam': {
            capabilityItems: [
              { name: 'Camera AI nhận diện khuôn mặt', description: 'Độ chính xác 99.9% trong điều kiện thiếu sáng' },
              { name: 'Hệ thống báo động thông minh', description: 'Tích hợp cảm biến và thông báo tức thì' },
              { name: 'Giải pháp giám sát đô thị', description: 'Hệ thống quản lý giao thông thông minh' },
              { name: 'Lưu trữ đám mây bảo mật cao', description: 'Mã hóa dữ liệu đầu cuối' }
            ],
            achievements: ['Giải pháp an ninh xuất sắc 2022', 'Triển khai Smart City tại 5 thành phố', 'Bằng sáng chế thuật toán AI'],
            experience: 'Kỹ sư chuyên gia từ các viện nghiên cứu an ninh',
            profileUrl: '/docs/profile-guardcam.pdf'
          },
          'ecoop': {
            capabilityItems: [
              { name: 'Sàn thương mại điện tử nông sản', description: 'Kết nối trực tiếp nông hộ và người tiêu dùng' },
              { name: 'Truy xuất nguồn gốc Blockchain', description: 'Minh bạch quy trình sản xuất và vận chuyển' },
              { name: 'Logistics thông minh cho nông nghiệp', description: 'Tối ưu hóa chuỗi cung ứng lạnh' },
              { name: 'Tư vấn nông nghiệp công nghệ cao', description: 'Chuyển giao công nghệ canh tác hiện đại' }
            ],
            achievements: ['Sáng kiến nông nghiệp xanh 2023', 'Kết nối hơn 1000 hợp tác xã', 'Chứng nhận hữu cơ quốc tế'],
            experience: 'Kết hợp tri thức nông nghiệp và công nghệ hiện đại',
            profileUrl: '/docs/profile-ecoop.pdf'
          }
        })
      },
      {
        id: 'policies',
        title: 'CHÍNH SÁCH',
        description: 'CÁC CHÍNH SÁCH NỘI BỘ VÀ QUY ĐỊNH',
        icon: 'FileText',
        order: 3,
        isVisible: true,
        textColor: '#047857', // Emerald
        textColorHover: '#059669',
        route: '/policies',
        backgroundImage: '/cards/policy.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            policyItems: [
              { name: 'Nội quy lao động 2024', description: 'Quy định về thời gian làm việc, kỷ luật và phúc lợi', date: '01/01/2024', type: 'PDF', webUrl: 'https://namthienlong.vn/policies/noi-quy-lao-dong-2024', fileUrl: '/docs/policies/nam-thien-long/noi-quy-lao-dong-2024.pdf', downloadUrl: '/docs/policies/nam-thien-long/noi-quy-lao-dong-2024.pdf' },
              { name: 'Chính sách bảo mật dữ liệu', description: 'Quy trình xử lý và bảo vệ thông tin khách hàng', date: '15/03/2023', type: 'DOCX', webUrl: 'https://namthienlong.vn/policies/chinh-sach-bao-mat-du-lieu', fileUrl: '/docs/policies/nam-thien-long/chinh-sach-bao-mat-du-lieu.docx', downloadUrl: '/docs/policies/nam-thien-long/chinh-sach-bao-mat-du-lieu.docx' },
              { name: 'Quy trình thanh toán nội bộ', description: 'Hướng dẫn thanh toán chi phí và tạm ứng', date: '10/12/2023', type: 'PDF', webUrl: 'https://namthienlong.vn/policies/quy-trinh-thanh-toan-noi-bo', fileUrl: '/docs/policies/nam-thien-long/quy-trinh-thanh-toan-noi-bo.pdf', downloadUrl: '/docs/policies/nam-thien-long/quy-trinh-thanh-toan-noi-bo.pdf' }
            ],
            experience: 'Các chính sách được áp dụng cho toàn bộ nhân viên Nam Thiên Long'
          },
          'apec-bci': {
            policyItems: [
              { name: 'Quy trình thẩm định đầu tư', description: 'Các bước đánh giá dự án và startup', date: '05/02/2024', type: 'PDF', webUrl: 'https://apecbci.vn/policies/quy-trinh-tham-dinh-dau-tu', fileUrl: '/docs/policies/apec-bci/quy-trinh-tham-dinh-dau-tu.pdf', downloadUrl: '/docs/policies/apec-bci/quy-trinh-tham-dinh-dau-tu.pdf' },
              { name: 'Chính sách quản lý rủi ro', description: 'Khung quản trị rủi ro trong đầu tư mạo hiểm', date: '12/01/2024', type: 'PDF', webUrl: 'https://apecbci.vn/policies/chinh-sach-quan-ly-rui-ro', fileUrl: '/docs/policies/apec-bci/chinh-sach-quan-ly-rui-ro.pdf', downloadUrl: '/docs/policies/apec-bci/chinh-sach-quan-ly-rui-ro.pdf' },
              { name: 'Hướng dẫn giao dịch tài sản số', description: 'Quy định về mua bán và lưu trữ crypto', date: '20/03/2024', type: 'DOCX', webUrl: 'https://apecbci.vn/policies/huong-dan-giao-dich-tai-san-so', fileUrl: '/docs/policies/apec-bci/huong-dan-giao-dich-tai-san-so.docx', downloadUrl: '/docs/policies/apec-bci/huong-dan-giao-dich-tai-san-so.docx' }
            ]
          },
          'lifecare': {
            policyItems: [
              { name: 'Tiêu chuẩn an toàn dược phẩm', description: 'Quy định về bảo quản và phân phối thuốc', date: '01/01/2024', type: 'PDF', webUrl: 'https://lifecare.vn/policies/tieu-chuan-an-toan-duoc-pham', fileUrl: '/docs/policies/lifecare/tieu-chuan-an-toan-duoc-pham.pdf', downloadUrl: '/docs/policies/lifecare/tieu-chuan-an-toan-duoc-pham.pdf' },
              { name: 'Quy tắc ứng xử với bệnh nhân', description: 'Tiêu chuẩn giao tiếp và phục vụ khách hàng', date: '15/02/2024', type: 'PDF', webUrl: 'https://lifecare.vn/policies/quy-tac-ung-xu-voi-benh-nhan', fileUrl: '/docs/policies/lifecare/quy-tac-ung-xu-voi-benh-nhan.pdf', downloadUrl: '/docs/policies/lifecare/quy-tac-ung-xu-voi-benh-nhan.pdf' },
              { name: 'Quy trình kiểm soát chất lượng', description: 'Quy trình QA/QC trong sản xuất sinh học', date: '10/03/2024', type: 'PDF', webUrl: 'https://lifecare.vn/policies/quy-trinh-kiem-soat-chat-luong', fileUrl: '/docs/policies/lifecare/quy-trinh-kiem-soat-chat-luong.pdf', downloadUrl: '/docs/policies/lifecare/quy-trinh-kiem-soat-chat-luong.pdf' }
            ]
          },
          'superapp': {
            policyItems: [
              { name: 'Chính sách quyền riêng tư người dùng', description: 'Cam kết bảo mật thông tin người dùng cuối', date: '01/01/2024', type: 'PDF', webUrl: 'https://superapp.vn/policies/chinh-sach-quyen-rieng-tu', fileUrl: '/docs/policies/superapp/chinh-sach-quyen-rieng-tu.pdf', downloadUrl: '/docs/policies/superapp/chinh-sach-quyen-rieng-tu.pdf' },
              { name: 'Quy định phát triển Mini-app', description: 'Bộ quy tắc cho các đối tác tích hợp', date: '15/01/2024', type: 'PDF', webUrl: 'https://superapp.vn/policies/quy-dinh-phat-trien-mini-app', fileUrl: '/docs/policies/superapp/quy-dinh-phat-trien-mini-app.pdf', downloadUrl: '/docs/policies/superapp/quy-dinh-phat-trien-mini-app.pdf' },
              { name: 'Tiêu chuẩn bảo mật API', description: 'Yêu cầu kỹ thuật cho việc kết nối hệ thống', date: '20/02/2024', type: 'DOCX', webUrl: 'https://superapp.vn/policies/tieu-chuan-bao-mat-api', fileUrl: '/docs/policies/superapp/tieu-chuan-bao-mat-api.docx', downloadUrl: '/docs/policies/superapp/tieu-chuan-bao-mat-api.docx' }
            ]
          },
          'guardcam': {
            policyItems: [
              { name: 'Quy định sử dụng dữ liệu Camera', description: 'Quy trình trích xuất và lưu trữ dữ liệu hình ảnh', date: '10/01/2024', type: 'PDF', webUrl: 'https://guardcam.vn/policies/quy-dinh-su-dung-du-lieu-camera', fileUrl: '/docs/policies/guardcam/quy-dinh-su-dung-du-lieu-camera.pdf', downloadUrl: '/docs/policies/guardcam/quy-dinh-su-dung-du-lieu-camera.pdf' },
              { name: 'Quy trình xử lý sự cố an ninh', description: 'Các bước ứng phó khi có báo động xâm nhập', date: '15/02/2024', type: 'PDF', webUrl: 'https://guardcam.vn/policies/quy-trinh-xu-ly-su-co-an-ninh', fileUrl: '/docs/policies/guardcam/quy-trinh-xu-ly-su-co-an-ninh.pdf', downloadUrl: '/docs/policies/guardcam/quy-trinh-xu-ly-su-co-an-ninh.pdf' },
              { name: 'Tiêu chuẩn lắp đặt thiết bị', description: 'Quy chuẩn kỹ thuật cho đội ngũ thi công', date: '01/03/2024', type: 'PDF', webUrl: 'https://guardcam.vn/policies/tieu-chuan-lap-dat-thiet-bi', fileUrl: '/docs/policies/guardcam/tieu-chuan-lap-dat-thiet-bi.pdf', downloadUrl: '/docs/policies/guardcam/tieu-chuan-lap-dat-thiet-bi.pdf' }
            ]
          },
          'ecoop': {
            policyItems: [
              { name: 'Tiêu chuẩn kiểm soát nông sản', description: 'Quy trình kiểm tra dư lượng thuốc BVTV', date: '01/01/2024', type: 'PDF', webUrl: 'https://ecoop.vn/policies/tieu-chuan-kiem-soat-nong-san', fileUrl: '/docs/policies/ecoop/tieu-chuan-kiem-soat-nong-san.pdf', downloadUrl: '/docs/policies/ecoop/tieu-chuan-kiem-soat-nong-san.pdf' },
              { name: 'Chính sách hỗ trợ xã viên', description: 'Các gói hỗ trợ vốn và kỹ thuật cho nông dân', date: '15/01/2024', type: 'PDF', webUrl: 'https://ecoop.vn/policies/chinh-sach-ho-tro-xa-vien', fileUrl: '/docs/policies/ecoop/chinh-sach-ho-tro-xa-vien.pdf', downloadUrl: '/docs/policies/ecoop/chinh-sach-ho-tro-xa-vien.pdf' },
              { name: 'Quy trình thanh toán nông hộ', description: 'Thanh toán trực tiếp sau khi thu mua', date: '10/02/2024', type: 'PDF', webUrl: 'https://ecoop.vn/policies/quy-trinh-thanh-toan-nong-ho', fileUrl: '/docs/policies/ecoop/quy-trinh-thanh-toan-nong-ho.pdf', downloadUrl: '/docs/policies/ecoop/quy-trinh-thanh-toan-nong-ho.pdf' }
            ]
          },
          'default': {
            policyItems: [
              { name: 'Quy tắc ứng xử Tập đoàn', description: 'Tiêu chuẩn đạo đức và hành vi tại nơi làm việc', date: '01/01/2024', type: 'PDF', webUrl: 'https://apecglobal.com/policies/quy-tac-ung-xu-tap-doan', fileUrl: '/docs/policies/default/quy-tac-ung-xu-tap-doan.pdf', downloadUrl: '/docs/policies/default/quy-tac-ung-xu-tap-doan.pdf' },
              { name: 'Chính sách phúc lợi nhân viên', description: 'Chế độ bảo hiểm, nghỉ phép và thưởng', date: '01/01/2024', type: 'PDF', webUrl: 'https://apecglobal.com/policies/chinh-sach-phuc-loi-nhan-vien', fileUrl: '/docs/policies/default/chinh-sach-phuc-loi-nhan-vien.pdf', downloadUrl: '/docs/policies/default/chinh-sach-phuc-loi-nhan-vien.pdf' },
              { name: 'Quy định bảo mật thông tin', description: 'Bảo vệ bí mật kinh doanh và dữ liệu tập đoàn', date: '15/01/2024', type: 'PDF', webUrl: 'https://apecglobal.com/policies/quy-dinh-bao-mat-thong-tin', fileUrl: '/docs/policies/default/quy-dinh-bao-mat-thong-tin.pdf', downloadUrl: '/docs/policies/default/quy-dinh-bao-mat-thong-tin.pdf' }
            ],
            experience: 'Văn bản hướng dẫn chung cho toàn Tập đoàn APEC GLOBAL'
          }
        })
      },
      {
        id: 'career-path',
        title: 'LỘ TRÌNH\nTHĂNG TIẾN',
        description: 'CƠ HỘI PHÁT TRIỂN SỰ NGHIỆP',
        icon: 'TrendingUp',
        order: 4,
        isVisible: true,
        textColor: '#0ea5e9', // Cyan/Sky
        textColorHover: '#0284c7',
        route: '/career-path',
        backgroundImage: '/cards/career.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            items: [
              { title: 'Junior Developer', period: '0-2 năm', skills: 'Kỹ năng lập trình cơ bản' },
              { title: 'Senior Developer', period: '3-5 năm', skills: 'Làm chủ hệ thống, Mentor Junior' },
              { title: 'Technical Lead', period: '5-8 năm', skills: 'Quản lý đội ngũ, Kiến trúc hệ thống' }
            ]
          },
          'superapp': {
            items: [
              { title: 'Product Trainee', period: '0-1 năm', skills: 'Tư duy sản phẩm, Phân tích nghiệp vụ' },
              { title: 'Product Owner', period: '2-4 năm', skills: 'Quản lý roadmap, Tối ưu trải nghiệm' },
              { title: 'Product Director', period: '5-10 năm', skills: 'Chiến lược hệ sinh thái số' }
            ]
          },
          'guardcam': {
            items: [
              { title: 'AI Research Engineer', period: '0-3 năm', skills: 'Thuật toán Computer Vision' },
              { title: 'Senior AI Engineer', period: '4-7 năm', skills: 'Tối ưu hóa mô hình thực tế' },
              { title: 'Chief Technology Officer', period: '10+ năm', skills: 'Định hướng công nghệ an ninh' }
            ]
          },
          'ecoop': {
            items: [
              { title: 'Supply Chain Specialist', period: '0-2 năm', skills: 'Điều phối nông sản, Logistics' },
              { title: 'Supply Chain Manager', period: '3-6 năm', skills: 'Quản trị chuỗi cung ứng nông sản' },
              { title: 'Regional Director', period: '7+ năm', skills: 'Phát triển thị trường vùng miền' }
            ]
          },
          'default': {
            items: [
              { title: 'Nhân viên (Staff)', period: '0-2 năm', skills: 'Kỹ năng chuyên môn nền tảng' },
              { title: 'Chuyên viên (Specialist)', period: '2-5 năm', skills: 'Giải quyết vấn đề phức tạp' },
              { title: 'Quản lý (Manager)', period: '5-10 năm', skills: 'Quản trị nhân sự và mục tiêu' },
              { title: 'Giám đốc (Director)', period: '10+ năm', skills: 'Tư duy chiến lược và điều hành' }
            ]
          }
        })
      },
      {
        id: 'events',
        title: 'SỰ KIỆN',
        description: 'CÁC SỰ KIỆN SẮP TỚI',
        icon: 'Calendar',
        order: 5,
        isVisible: true,
        textColor: '#ea580c', // Orange
        textColorHover: '#f97316',
        route: '/events',
        backgroundImage: '/cards/events.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            items: [
              { title: 'Teambuilding Hè 2024', date: '15/07/2024', location: 'Phan Thiết', status: 'Sắp diễn ra' },
              { title: 'Workshop AI & Future', date: '20/06/2024', location: 'Hội trường A', status: 'Đang đăng ký' }
            ]
          },
          'superapp': {
            items: [
              { title: 'Hackathon: Future App', date: '10/08/2024', location: 'SuperApp Hub', status: 'Sắp diễn ra' },
              { title: 'Ra mắt phiên bản 3.0', date: '01/06/2024', location: 'Sự kiện trực tuyến', status: 'Hoàn tất' }
            ]
          },
          'guardcam': {
            items: [
              { title: 'Triển lãm An ninh quốc tế', date: '15/09/2024', location: 'SECC Q.7', status: 'Chuẩn bị' },
              { title: 'Hội thảo Smart Home', date: '05/07/2024', location: 'Showroom GuardCam', status: 'Đang đăng ký' }
            ]
          },
          'ecoop': {
            items: [
              { title: 'Ngày hội Nông sản Việt', date: '20/10/2024', location: 'Công viên 23/9', status: 'Lên kế hoạch' },
              { title: 'Ký kết đối tác xuất khẩu', date: '12/06/2024', location: 'Văn phòng Ecoop', status: 'Đang diễn ra' }
            ]
          },
          'default': {
            items: [
              { title: 'Tiệc Tất niên Tập đoàn', date: '20/01/2025', location: 'Trung tâm Hội nghị Q.1', status: 'Lên kế hoạch' },
              { title: 'Ngày hội Văn hóa APEC', date: '15/10/2024', location: 'Trụ sở chính', status: 'Chuẩn bị' },
              { title: 'Giải chạy APEC Marathon', date: '01/09/2024', location: 'Công viên Sala', status: 'Đang đăng ký' }
            ]
          }
        })
      },
      {
        id: 'news',
        title: 'TIN TỨC',
        description: 'TIN TỨC MỚI NHẤT CỦA TẬP ĐOÀN',
        icon: 'Megaphone',
        order: 6,
        isVisible: true,
        textColor: '#475569', // Slate/Blue-Gray
        textColorHover: '#334155',
        route: '/news',
        backgroundImage: '/cards/news.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            items: [
              { title: 'Khai trương văn phòng mới tại Hà Nội', date: '10/05/2024', category: 'Tin doanh nghiệp' },
              { title: 'Chứng nhận bảo mật cấp độ 4', date: '05/05/2024', category: 'Công nghệ' }
            ]
          },
          'superapp': {
            items: [
              { title: 'Đạt mốc 500,000 giao dịch/ngày', date: '20/05/2024', category: 'Tăng trưởng' },
              { title: 'Hợp tác chiến lược với ngân hàng lớn', date: '15/05/2024', category: 'Kinh doanh' }
            ]
          },
          'guardcam': {
            items: [
              { title: 'Ra mắt Camera AI thế hệ mới', date: '10/05/2024', category: 'Sản phẩm' },
              { title: 'Bảo vệ an ninh cho sự kiện cấp quốc gia', date: '02/05/2024', category: 'Dự án' }
            ]
          },
          'ecoop': {
            items: [
              { title: 'Xây dựng vùng nguyên liệu 100ha', date: '18/05/2024', category: 'Dự án' },
              { title: 'Nông sản Ecoop lên kệ siêu thị Nhật', date: '12/05/2024', category: 'Thị trường' }
            ]
          },
          'default': {
            items: [
              { title: 'APEC Global công bố báo cáo tài chính Quý 1', date: '30/04/2024', category: 'Tài chính' },
              { title: 'Mở rộng thị trường sang khu vực Đông Nam Á', date: '20/04/2024', category: 'Chiến lược' },
              { title: 'Ra mắt ứng dụng quản trị nhân sự thế hệ mới', date: '15/04/2024', category: 'Sản phẩm' }
            ]
          }
        })
      },
      {
        id: 'initiatives',
        title: 'SÁNG KIẾN',
        description: 'CÁC SÁNG KIẾN VÀ DỰ ÁN ĐẶC BIỆT',
        icon: 'Lightbulb',
        order: 7,
        isVisible: true,
        textColor: '#7c3aed', // Violet
        textColorHover: '#8b5cf6',
        route: '/initiatives',
        backgroundImage: '/cards/innovation.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            items: [
              { title: 'Sáng kiến "Văn phòng xanh"', date: '01/01/2024', category: 'Môi trường' },
              { title: 'Hệ thống tự động hóa quản lý văn phòng', date: '15/02/2024', category: 'Năng suất' }
            ]
          },
          'superapp': {
            items: [
              { title: 'Dự án "Ví không tiền mặt"', date: '01/03/2024', category: 'Tài chính số' },
              { title: 'Hệ thống gợi ý AI cho người dùng', date: '10/04/2024', category: 'Trải nghiệm' }
            ]
          },
          'guardcam': {
            items: [
              { title: 'Sáng kiến "Mắt thần đô thị"', date: '15/01/2024', category: 'Xã hội' },
              { title: 'Thuật toán nén video chuẩn 8K', date: '20/03/2024', category: 'Kỹ thuật' }
            ]
          },
          'ecoop': {
            items: [
              { title: 'Mô hình "Nông nghiệp tuần hoàn"', date: '01/02/2024', category: 'Bền vững' },
              { title: 'Ứng dụng IoT trong tưới tiêu tự động', date: '10/05/2024', category: 'Công nghệ' }
            ]
          },
          'default': {
            items: [
              { title: 'Dự án "Chuyển đổi số toàn diện 2024"', date: '01/01/2024', category: 'Công nghệ' },
              { title: 'Quỹ khởi nghiệp sáng tạo APEC', date: '10/02/2024', category: 'Đầu tư' },
              { title: 'Chương trình "Giờ vàng sáng tạo"', date: '01/03/2024', category: 'Văn hóa' }
            ]
          }
        })
      },
      {
        id: 'recognition',
        title: 'VINH DANH',
        description: 'GIẢI THƯỞNG VÀ CÔNG NHẬN',
        icon: 'Trophy',
        order: 8,
        isVisible: true,
        textColor: '#be123c', // Rose
        textColorHover: '#e11d48',
        route: '/recognition',
        backgroundImage: '/cards/awards.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            items: [
              { title: 'Nhân viên xuất sắc Quý 1/2024', date: '31/03/2024', category: 'Vinh danh cá nhân' },
              { title: 'Đội ngũ phát triển tiềm năng', date: '15/04/2024', category: 'Đội ngũ' }
            ]
          },
          'superapp': {
            items: [
              { title: 'Giải thưởng App của năm 2023', date: '20/12/2023', category: 'Thị trường' },
              { title: 'Kỹ sư hệ thống tiêu biểu', date: '10/05/2024', category: 'Cá nhân' }
            ]
          },
          'guardcam': {
            items: [
              { title: 'Top 10 giải pháp an ninh khu vực', date: '05/04/2024', category: 'Giải thưởng' },
              { title: 'Dự án an ninh xuất sắc Quý 1', date: '15/04/2024', category: 'Tập thể' }
            ]
          },
          'ecoop': {
            items: [
              { title: 'Sản phẩm OCOP 5 sao', date: '25/03/2024', category: 'Chất lượng' },
              { title: 'Hợp tác xã tiêu biểu toàn quốc', date: '10/05/2024', category: 'Danh hiệu' }
            ]
          },
          'default': {
            items: [
              { title: 'Top 100 nơi làm việc tốt nhất Việt Nam', date: '10/04/2024', category: 'Giải thưởng' },
              { title: 'Bằng khen của Bộ Công Thương', date: '25/03/2024', category: 'Công nhận' },
              { title: 'Giải thưởng Doanh nghiệp vì cộng đồng', date: '15/02/2024', category: 'CSR' }
            ]
          }
        })
      },
      {
        id: 'guidelines',
        title: 'HƯỚNG DẪN',
        description: 'HƯỚNG DẪN SỬ DỤNG VÀ TÀI LIỆU',
        icon: 'HelpCircle',
        order: 9,
        isVisible: true,
        textColor: '#0369a1', // Sky
        textColorHover: '#0284c7',
        route: '/guidelines',
        backgroundImage: '/cards/guidelines.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            items: [
              { title: 'Hướng dẫn sử dụng CRM mới', date: '01/05/2024', category: 'Hệ thống' },
              { title: 'Quy trình đăng ký nghỉ phép trực tuyến', date: '10/05/2024', category: 'Nhân sự' }
            ]
          },
          'superapp': {
            items: [
              { title: 'Cẩm nang phát triển API cho đối tác', date: '15/04/2024', category: 'Kỹ thuật' },
              { title: 'Quy trình vận hành ví điện tử', date: '01/05/2024', category: 'Vận hành' }
            ]
          },
          'guardcam': {
            items: [
              { title: 'Sổ tay lắp đặt Camera AI', date: '20/04/2024', category: 'Kỹ thuật' },
              { title: 'Hướng dẫn cấu hình bảo mật 2 lớp', date: '05/05/2024', category: 'An toàn' }
            ]
          },
          'ecoop': {
            items: [
              { title: 'Hướng dẫn canh tác theo chuẩn VietGAP', date: '01/04/2024', category: 'Nghiệp vụ' },
              { title: 'Quy trình đóng gói nông sản xuất khẩu', date: '15/05/2024', category: 'Sản xuất' }
            ]
          },
          'default': {
            items: [
              { title: 'Sổ tay nhân viên điện tử', date: '01/01/2024', category: 'Văn hóa' },
              { title: 'Hướng dẫn an toàn thông tin', date: '05/01/2024', category: 'Bảo mật' },
              { title: 'Quy trình vận hành chuẩn (SOP)', date: '10/01/2024', category: 'Vận hành' }
            ]
          }
        })
      },
      {
        id: 'feedback',
        title: 'FEEDBACK\n& HỖ TRỢ',
        description: 'GỬI PHẢN HỒI VÀ YÊU CẦU HỖ TRỢ',
        icon: 'MessagesSquare',
        order: 10,
        isVisible: true,
        textColor: '#db2777', // Pink/Magenta
        textColorHover: '#ec4899',
        route: '/feedback',
        backgroundImage: '/cards/feedback.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'default': {
            summary: 'CHÚNG TÔI LUÔN LẮNG NGHE Ý KIẾN ĐÓNG GÓP CỦA BẠN ĐỂ CẢI THIỆN DỊCH VỤ.',
            contact: { 'Hotline': '1900 1000', 'Email': 'support@apecglobal.com' },
            faq: [
              { q: 'Làm thế nào để gửi phản hồi?', a: 'Bạn có thể gửi qua form trực tuyến hoặc gọi hotline.' },
              { q: 'Thời gian phản hồi là bao lâu?', a: 'Thông thường trong vòng 24h làm việc.' }
            ]
          }
        })
      },
    ],
  },
  footer: {
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'GIỚI THIỆU VỀ TẬP ĐOÀN APEC',
    copyright: '© 2024 TẬP ĐOÀN APEC. ALL RIGHTS RESERVED.',
  },
};
