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
    logo: '/logo1.png',
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
        route: '/company-info',
        backgroundImage: '/cards/corporate-info.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            summary: 'NAM THIÊN LONG là đơn vị tiên phong trong lĩnh vực gia công phần mềm và giải pháp chuyển đổi số tại Việt Nam, với đội ngũ kỹ sư giàu kinh nghiệm.',
            webLink: 'https://namthienlong.vn',
            corporateInfo: { email: 'contact@namthienlong.vn', phone: '028 1234 5678', founded: '20/05/2012', ceo: 'Nguyễn Văn A', address: '72 Lê Thánh Tôn, Quận 1, TP.HCM', hotline: '1900 1234' },
            legalInfo: { taxCode: '0102030405', issuedDate: '15/06/2012', issuedBy: 'Sở KH&ĐT TP.HCM', type: 'Công ty Cổ phần' }
          },
          'apec-bci': {
            summary: 'APEC BCI tập trung vào các giải pháp tài chính số và đầu tư mạo hiểm, kết nối các startup tiềm năng với nguồn vốn quốc tế.',
            webLink: 'https://apecbci.vn',
            corporateInfo: { email: 'info@apecbci.vn', phone: '028 8888 9999', founded: '10/10/2015', ceo: 'Trần Thị B', address: 'VP APEC, Quận 7, TP.HCM', hotline: '1800 5555' },
            legalInfo: { taxCode: '0908070605', issuedDate: '12/11/2015', issuedBy: 'Sở KH&ĐT TP.HCM', type: 'Công ty TNHH MTV' }
          },
          'lifecare': {
            summary: 'LIFECARE mang đến hệ sinh thái chăm sóc sức khỏe toàn diện dựa trên nền tảng công nghệ sinh học và dữ liệu lớn.',
            webLink: 'https://lifecare.vn',
            corporateInfo: { email: 'care@lifecare.vn', phone: '028 7777 6666', founded: '01/01/2018', ceo: 'Phạm Văn C', address: 'Tòa nhà Healthcare, Q.3, TP.HCM', hotline: '1900 8888' },
            legalInfo: { taxCode: '1122334455', issuedDate: '05/01/2018', issuedBy: 'Sở Y Tế TP.HCM', type: 'Công ty Cổ phần Dịch vụ' }
          },
          'superapp': {
            summary: 'SUPERAPP là nền tảng đa dịch vụ phục vụ mọi nhu cầu hàng ngày của người dùng Việt, từ thanh toán đến thương mại điện tử.',
            webLink: 'https://superapp.vn',
            corporateInfo: { email: 'dev@superapp.vn', phone: '028 2222 3333', founded: '15/03/2020', ceo: 'Lê Văn D', address: 'Digital Hub, Quận 2, TP.HCM', hotline: '1900 2020' },
            legalInfo: { taxCode: '2233445566', issuedDate: '15/03/2020', issuedBy: 'Sở KH&ĐT TP.HCM', type: 'Công ty Công nghệ' }
          },
          'guardcam': {
            summary: 'GUARDCAM dẫn đầu thị trường camera AI và các giải pháp an ninh thông minh cho đô thị và hộ gia đình.',
            webLink: 'https://guardcam.vn',
            corporateInfo: { email: 'security@guardcam.vn', phone: '028 4444 5555', founded: '20/08/2019', ceo: 'Hoàng Văn E', address: 'Security Center, Q.Tân Bình, TP.HCM', hotline: '1900 9999' },
            legalInfo: { taxCode: '3344556677', issuedDate: '20/08/2019', issuedBy: 'Sở KH&ĐT TP.HCM', type: 'Công ty Dịch vụ An ninh' }
          },
          'ecoop': {
            summary: 'ECOOP kết nối trực tiếp nông dân với người tiêu dùng thông qua nền tảng thương mại điện tử và chuỗi cung ứng thông minh.',
            webLink: 'https://ecoop.vn',
            corporateInfo: { email: 'agri@ecoop.vn', phone: '028 5555 6666', founded: '12/12/2021', ceo: 'Đặng Thị F', address: 'AgriTech Park, Củ Chi, TP.HCM', hotline: '1800 6666' },
            legalInfo: { taxCode: '4455667788', issuedDate: '12/12/2021', issuedBy: 'Sở NN&PTNT TP.HCM', type: 'Hợp tác xã Công nghệ cao' }
          },
          'default': {
            summary: 'APEC GLOBAL là tập đoàn đa ngành hàng đầu, tiên phong trong việc kiến tạo các giải pháp công nghệ và dịch vụ sáng tạo.',
            webLink: 'https://apecglobal.com',
            corporateInfo: { email: 'info@apecglobal.com', phone: '028 0000 1111', founded: '2010', ceo: 'Ban điều hành', address: 'Trụ sở chính APEC Global', hotline: '1800 1000' },
            legalInfo: { taxCode: '1234567890', issuedDate: '01/01/2010', issuedBy: 'Sở KH&ĐT TP.HCM', type: 'Thành viên Tập đoàn' }
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
        route: '/capabilities',
        backgroundImage: '/cards/capabilities.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            capabilities: ['Phát triển phần mềm doanh nghiệp', 'Tư vấn chuyển đổi số', 'Triển khai hệ thống ERP', 'An ninh mạng & Bảo mật'],
            achievements: ['Giải thưởng Sao Khuê 2023', 'Top 10 doanh nghiệp CNTT Việt Nam', 'Chứng chỉ ISO 27001'],
            experience: 'Hơn 10 năm kinh nghiệm trong ngành công nghệ',
            profileUrl: '/docs/profile-namthienlong.pdf'
          },
          'apec-bci': {
            capabilities: ['Tư vấn đầu tư tài chính', 'Quản lý tài sản số', 'Phân tích thị trường', 'Bất động sản công nghiệp'],
            achievements: ['Dự án tiêu biểu 2022', 'Đối tác chiến lược toàn cầu', 'Chứng chỉ quản lý chất lượng'],
            experience: 'Đội ngũ chuyên gia hàng đầu từ các tập đoàn đa quốc gia',
            profileUrl: '/docs/profile-apecbci.pdf'
          },
          'lifecare': {
            capabilities: ['Chăm sóc sức khỏe chủ động', 'Phân phối dược phẩm', 'Quản lý bệnh viện số', 'Thiết bị y tế cao cấp'],
            achievements: ['Huân chương lao động hạng nhì', 'Top 10 thương hiệu vì sức khỏe cộng đồng', 'Đối tác WHO tại VN'],
            experience: 'Tiên phong trong lĩnh vực y tế dự phòng và công nghệ sinh học',
            profileUrl: '/docs/profile-lifecare.pdf'
          },
          'superapp': {
            capabilities: ['Phát triển ứng dụng Mobile siêu đa năng', 'Nền tảng thanh toán điện tử', 'Hệ sinh thái Mini-app', 'Xử lý dữ liệu lớn (Big Data)'],
            achievements: ['Top 1 Ứng dụng tải nhiều nhất 2023', 'Chứng chỉ bảo mật PCI DSS', '10 triệu người dùng hoạt động'],
            experience: 'Dẫn đầu xu hướng nền tảng tất cả trong một',
            profileUrl: '/docs/profile-superapp.pdf'
          },
          'guardcam': {
            capabilities: ['Camera AI nhận diện khuôn mặt', 'Hệ thống báo động thông minh', 'Giải pháp giám sát đô thị', 'Lưu trữ đám mây bảo mật cao'],
            achievements: ['Giải pháp an ninh xuất sắc 2022', 'Triển khai Smart City tại 5 thành phố', 'Bằng sáng chế thuật toán AI'],
            experience: 'Kỹ sư chuyên gia từ các viện nghiên cứu an ninh',
            profileUrl: '/docs/profile-guardcam.pdf'
          },
          'ecoop': {
            capabilities: ['Sàn thương mại điện tử nông sản', 'Truy xuất nguồn gốc Blockchain', 'Logistics thông minh cho nông nghiệp', 'Tư vấn nông nghiệp công nghệ cao'],
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
        route: '/policies',
        backgroundImage: '/cards/policy.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            policies: [
              { title: 'Nội quy lao động 2024', date: '01/01/2024', type: 'PDF' },
              { title: 'Chính sách bảo mật dữ liệu', date: '15/03/2023', type: 'DOCX' },
              { title: 'Quy trình thanh toán nội bộ', date: '10/12/2023', type: 'PDF' }
            ]
          },
          'apec-bci': {
            policies: [
              { title: 'Quy trình thẩm định đầu tư', date: '05/02/2024', type: 'PDF' },
              { title: 'Chính sách quản lý rủi ro', date: '12/01/2024', type: 'PDF' },
              { title: 'Hướng dẫn giao dịch tài sản số', date: '20/03/2024', type: 'DOCX' }
            ]
          },
          'lifecare': {
            policies: [
              { title: 'Tiêu chuẩn an toàn dược phẩm', date: '01/01/2024', type: 'PDF' },
              { title: 'Quy tắc ứng xử với bệnh nhân', date: '15/02/2024', type: 'PDF' },
              { title: 'Quy trình kiểm soát chất lượng', date: '10/03/2024', type: 'PDF' }
            ]
          },
          'superapp': {
            policies: [
              { title: 'Chính sách quyền riêng tư người dùng', date: '01/01/2024', type: 'PDF' },
              { title: 'Quy định phát triển Mini-app', date: '15/01/2024', type: 'PDF' },
              { title: 'Tiêu chuẩn bảo mật API', date: '20/02/2024', type: 'DOCX' }
            ]
          },
          'guardcam': {
            policies: [
              { title: 'Quy định sử dụng dữ liệu Camera', date: '10/01/2024', type: 'PDF' },
              { title: 'Quy trình xử lý sự cố an ninh', date: '15/02/2024', type: 'PDF' },
              { title: 'Tiêu chuẩn lắp đặt thiết bị', date: '01/03/2024', type: 'PDF' }
            ]
          },
          'ecoop': {
            policies: [
              { title: 'Tiêu chuẩn kiểm soát nông sản', date: '01/01/2024', type: 'PDF' },
              { title: 'Chính sách hỗ trợ xã viên', date: '15/01/2024', type: 'PDF' },
              { title: 'Quy trình thanh toán nông hộ', date: '10/02/2024', type: 'PDF' }
            ]
          },
          'default': {
            policies: [
              { title: 'Quy tắc ứng xử Tập đoàn', date: '01/01/2024', type: 'PDF' },
              { title: 'Chính sách phúc lợi nhân viên', date: '01/01/2024', type: 'PDF' },
              { title: 'Quy định bảo mật thông tin', date: '15/01/2024', type: 'PDF' }
            ]
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
        route: '/career-path',
        backgroundImage: '/cards/career.jpg',
        projects: commonProjects,
        details: generateDetails(commonProjects, {
          'nam-thien-long': {
            careerLevels: [
              { title: 'Junior Developer', period: '0-2 năm', skills: 'Kỹ năng lập trình cơ bản' },
              { title: 'Senior Developer', period: '3-5 năm', skills: 'Làm chủ hệ thống, Mentor Junior' },
              { title: 'Technical Lead', period: '5-8 năm', skills: 'Quản lý đội ngũ, Kiến trúc hệ thống' }
            ]
          },
          'superapp': {
            careerLevels: [
              { title: 'Product Trainee', period: '0-1 năm', skills: 'Tư duy sản phẩm, Phân tích nghiệp vụ' },
              { title: 'Product Owner', period: '2-4 năm', skills: 'Quản lý roadmap, Tối ưu trải nghiệm' },
              { title: 'Product Director', period: '5-10 năm', skills: 'Chiến lược hệ sinh thái số' }
            ]
          },
          'guardcam': {
            careerLevels: [
              { title: 'AI Research Engineer', period: '0-3 năm', skills: 'Thuật toán Computer Vision' },
              { title: 'Senior AI Engineer', period: '4-7 năm', skills: 'Tối ưu hóa mô hình thực tế' },
              { title: 'Chief Technology Officer', period: '10+ năm', skills: 'Định hướng công nghệ an ninh' }
            ]
          },
          'ecoop': {
            careerLevels: [
              { title: 'Supply Chain Specialist', period: '0-2 năm', skills: 'Điều phối nông sản, Logistics' },
              { title: 'Supply Chain Manager', period: '3-6 năm', skills: 'Quản trị chuỗi cung ứng nông sản' },
              { title: 'Regional Director', period: '7+ năm', skills: 'Phát triển thị trường vùng miền' }
            ]
          },
          'default': {
            careerLevels: [
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
    ],
  },
  footer: {
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'GIỚI THIỆU VỀ TẬP ĐOÀN APEC',
    copyright: '© 2024 TẬP ĐOÀN APEC. ALL RIGHTS RESERVED.',
  },
};
