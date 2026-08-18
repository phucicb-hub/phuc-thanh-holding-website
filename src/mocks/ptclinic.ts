import type { Localized } from '@/lib/lang';

/* ---------- Shared image ---------- */
export const ptClinicHeroImage =
  'https://readdy.ai/api/search-image?query=Modern%20healthcare%20clinic%20management%20software%20concept%2C%20abstract%20digital%20medical%20dashboard%20with%20connected%20patient%20records%20and%20appointment%20scheduling%20interface%2C%20soft%20emerald%20green%20gradient%20background%20with%20warm%20golden%20accent%20lighting%2C%20professional%20corporate%20healthcare%20technology%20atmosphere%2C%20clean%20minimal%20composition%2C%20cinematic%20soft%20lighting%2C%20high%20detail%20editorial%20style&width=1600&height=600&seq=ptclinic-hero-1&orientation=landscape';

/* ---------- Hero ---------- */
export interface PtClinicHero {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export const ptClinicHero: Localized<PtClinicHero> = {
  vi: {
    badge: 'Phần mềm quản lý phòng khám',
    title: 'PT-Clinic',
    subtitle: 'Kết nối vận hành, dữ liệu và chất lượng phục vụ trên một nền tảng',
    description:
      'Hoạt động của một phòng khám không chỉ diễn ra trong thời gian bác sĩ thăm khám. Đó là một hành trình gồm đặt lịch, tiếp đón, xác minh thông tin, khám chuyên môn, chỉ định dịch vụ, kê đơn, thanh toán, chăm sóc sau khám và quản lý hồ sơ. PT-Clinic kết nối toàn bộ hành trình đó trên một hệ thống thống nhất.',
    primaryCta: 'Yêu cầu trình diễn PT-Clinic',
    secondaryCta: 'Đăng ký tư vấn triển khai',
  },
  en: {
    badge: 'Clinic management software',
    title: 'PT-Clinic',
    subtitle: 'Connecting operations, data and service quality on one platform',
    description:
      'Clinic operations are not limited to the time a doctor examines a patient. They form a journey of scheduling, reception, verification, examination, service orders, prescriptions, payment, follow-up care and record management. PT-Clinic connects that entire journey on one unified system.',
    primaryCta: 'Request a PT-Clinic demo',
    secondaryCta: 'Register for implementation consulting',
  },
};

/* ---------- Journey section ---------- */
export interface PtClinicSectionText {
  title: string;
  description: string;
}

export const ptClinicJourney: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Một hành trình khám, một luồng dữ liệu xuyên suốt',
    description:
      'Mỗi bộ phận chỉ tiếp cận những thông tin cần thiết cho nhiệm vụ của mình. Dữ liệu được cập nhật xuyên suốt, hạn chế nhập lại và giảm nguy cơ sai lệch khi bàn giao.',
  },
  en: {
    title: 'One care journey, one continuous data flow',
    description:
      'Each department accesses only the information it needs. Data is updated continuously, reducing re-entry and the risk of errors during handover.',
  },
};

export const ptClinicJourneySteps: Localized<string[]> = {
  vi: [
    'Đặt lịch',
    'Tiếp đón',
    'Xác minh thông tin',
    'Khám chuyên môn',
    'Chỉ định dịch vụ',
    'Thực hiện dịch vụ',
    'Kê đơn',
    'Thanh toán',
    'Hẹn tái khám',
    'Chăm sóc sau khám',
  ],
  en: [
    'Scheduling',
    'Reception',
    'Verification',
    'Examination',
    'Service orders',
    'Service delivery',
    'Prescription',
    'Payment',
    'Follow-up booking',
    'Post-care',
  ],
};

/* ---------- Features (core functional groups) ---------- */
export const ptClinicFeaturesTitle: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Các nhóm chức năng chính',
    description:
      'PT-Clinic được tổ chức thành các nhóm chức năng xuyên suốt, phục vụ toàn bộ hành trình khám chữa bệnh và vận hành phòng khám.',
  },
  en: {
    title: 'Core functional groups',
    description:
      'PT-Clinic is organized into functional groups spanning the entire care and clinic operations journey.',
  },
};

export interface PtClinicFeatureGroup {
  id: number;
  icon: string;
  title: string;
  items: string[];
}

export const ptClinicFeatures: Localized<PtClinicFeatureGroup[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-calendar-check-line',
      title: 'Quản lý lịch hẹn',
      items: [
        'Đặt lịch tại quầy, qua điện thoại và website',
        'Chọn cơ sở, chuyên khoa và người hành nghề',
        'Thiết lập thời lượng và khung giờ',
        'Kiểm tra lịch trống, ngăn đặt trùng',
        'Xác nhận và nhắc lịch',
        'Đổi, hủy lịch và quản lý danh sách chờ',
        'Theo dõi trạng thái đến khám',
        'Ghi nhận lý do không đến',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-received-line',
      title: 'Tiếp đón và quản lý hàng chờ',
      items: [
        'Tìm kiếm người bệnh, tạo hồ sơ mới',
        'Kiểm tra lịch hẹn và ghi nhận lý do đến khám',
        'Xác nhận thông tin liên hệ',
        'Phân luồng và cấp số thứ tự',
        'Theo dõi hàng chờ và chuyển phòng',
        'Cập nhật trạng thái, in phiếu khi cần',
      ],
    },
    {
      id: 3,
      icon: 'ri-folder-user-line',
      title: 'Hồ sơ người bệnh',
      items: [
        'Mã người bệnh và thông tin định danh',
        'Tiền sử phù hợp và dị ứng',
        'Thuốc đang sử dụng',
        'Lịch sử đến khám và kết quả dịch vụ',
        'Đơn thuốc và tài liệu liên quan',
        'Đồng ý xử lý dữ liệu',
      ],
    },
    {
      id: 4,
      icon: 'ri-stethoscope-line',
      title: 'Khám và ghi nhận chuyên môn',
      items: [
        'Lý do đến khám và triệu chứng',
        'Dấu hiệu sinh tồn và kết quả thăm khám',
        'Chẩn đoán và chỉ định',
        'Kế hoạch xử trí và lời dặn',
        'Hẹn tái khám và tài liệu đính kèm',
        'Ký hoặc xác nhận theo quyền hạn',
      ],
    },
    {
      id: 5,
      icon: 'ri-clipboard-line',
      title: 'Quản lý chỉ định và dịch vụ',
      items: [
        'Danh mục và giá dịch vụ',
        'Chỉ định và chuyển bộ phận thực hiện',
        'Theo dõi trạng thái và ghi nhận kết quả',
        'Đính kèm tài liệu',
        'Xác nhận người thực hiện và trả kết quả',
        'Liên kết kết quả với lần khám',
      ],
    },
    {
      id: 6,
      icon: 'ri-capsule-line',
      title: 'Quản lý đơn thuốc',
      items: [
        'Danh mục thuốc, hoạt chất và hàm lượng',
        'Đường dùng, liều dùng và số lượng',
        'Hướng dẫn sử dụng',
        'Cảnh báo dị ứng dựa trên dữ liệu',
        'Kiểm tra trường thông tin bắt buộc',
        'Lưu lịch sử đơn và kiểm soát quyền sửa',
      ],
    },
    {
      id: 7,
      icon: 'ri-medicine-bottle-line',
      title: 'Quản lý thuốc và vật tư',
      items: [
        'Danh mục, nhà cung cấp và chứng từ nhập',
        'Số lô và hạn sử dụng',
        'Nhập, xuất và điều chỉnh kho',
        'Tồn theo cơ sở và mức tồn tối thiểu',
        'Cảnh báo sắp hết hạn và sắp hết hàng',
        'Kiểm kê, truy xuất và báo cáo chênh lệch',
      ],
    },
    {
      id: 8,
      icon: 'ri-wallet-3-line',
      title: 'Thu ngân và thanh toán',
      items: [
        'Bảng kê dịch vụ, thuốc và vật tư',
        'Tạm tính và giảm giá theo quyền hạn',
        'Thanh toán tiền mặt, chuyển khoản',
        'Ghi nhận công nợ khi được phép',
        'Phiếu thu, hoàn tiền và lịch sử giao dịch',
        'Đối soát theo ca và báo cáo doanh thu',
      ],
    },
    {
      id: 9,
      icon: 'ri-heart-2-line',
      title: 'Chăm sóc sau khám',
      items: [
        'Nhắc lịch tái khám',
        'Gửi hướng dẫn đã được phê duyệt',
        'Theo dõi yêu cầu hỗ trợ',
        'Khảo sát mức độ hài lòng',
        'Chuyển câu hỏi chuyên môn',
        'Ghi nhận khiếu nại và theo dõi giải quyết',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-calendar-check-line',
      title: 'Appointment management',
      items: [
        'Book at the counter, by phone and website',
        'Choose facility, specialty and practitioner',
        'Set duration and time slots',
        'Check availability and prevent double-booking',
        'Confirm and send reminders',
        'Reschedule, cancel and manage waitlists',
        'Track visit status',
        'Record no-show reasons',
      ],
    },
    {
      id: 2,
      icon: 'ri-user-received-line',
      title: 'Reception and queue management',
      items: [
        'Search patients and create new records',
        'Check appointments and record visit reasons',
        'Verify contact information',
        'Route and assign queue numbers',
        'Track the queue and transfer rooms',
        'Update status and print slips when needed',
      ],
    },
    {
      id: 3,
      icon: 'ri-folder-user-line',
      title: 'Patient records',
      items: [
        'Patient code and identity information',
        'Relevant history and allergies',
        'Current medications',
        'Visit history and service results',
        'Prescriptions and related documents',
        'Data processing consent',
      ],
    },
    {
      id: 4,
      icon: 'ri-stethoscope-line',
      title: 'Examination and clinical records',
      items: [
        'Visit reason and symptoms',
        'Vital signs and examination findings',
        'Diagnosis and orders',
        'Treatment plan and instructions',
        'Follow-up booking and attachments',
        'Sign or confirm by authority',
      ],
    },
    {
      id: 5,
      icon: 'ri-clipboard-line',
      title: 'Orders and services management',
      items: [
        'Service catalog and pricing',
        'Order and transfer to service units',
        'Track status and record results',
        'Attach documents',
        'Confirm performer and return results',
        'Link results to the visit',
      ],
    },
    {
      id: 6,
      icon: 'ri-capsule-line',
      title: 'Prescription management',
      items: [
        'Drug catalog, active ingredients and strength',
        'Route, dosage and quantity',
        'Usage instructions',
        'Allergy alerts based on recorded data',
        'Required field validation',
        'Prescription history and edit control',
      ],
    },
    {
      id: 7,
      icon: 'ri-medicine-bottle-line',
      title: 'Drug and supplies management',
      items: [
        'Catalog, suppliers and import documents',
        'Batch number and expiry date',
        'Stock in, out and adjustments',
        'Stock by facility and minimum levels',
        'Near-expiry and low-stock alerts',
        'Inventory, traceability and discrepancy reports',
      ],
    },
    {
      id: 8,
      icon: 'ri-wallet-3-line',
      title: 'Cashier and payment',
      items: [
        'Service, drug and supplies statements',
        'Provisional totals and authorized discounts',
        'Cash and bank transfer payments',
        'Record debts when permitted',
        'Receipts, refunds and transaction history',
        'Shift reconciliation and revenue reports',
      ],
    },
    {
      id: 9,
      icon: 'ri-heart-2-line',
      title: 'Post-care',
      items: [
        'Follow-up appointment reminders',
        'Send approved instructions',
        'Track support requests',
        'Satisfaction surveys',
        'Forward professional questions',
        'Record complaints and track resolution',
      ],
    },
  ],
};

/* ---------- Dashboard section ---------- */
export const ptClinicDashboard: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Dashboard quản trị phòng khám',
    description:
      'Dashboard giúp lãnh đạo nhìn thấy tình trạng vận hành mà không truy cập quá mức vào hồ sơ chuyên môn. Dữ liệu chuyên môn, tài chính và nhân sự phải được tách quyền truy cập.',
  },
  en: {
    title: 'Clinic management dashboard',
    description:
      'The dashboard helps leaders see operational status without over-accessing clinical records. Clinical, financial and HR data must have separated access rights.',
  },
};

export const ptClinicDashboardMetrics: Localized<string[]> = {
  vi: [
    'Số lịch hẹn và số người đã đến',
    'Số lượt đang chờ và đã hoàn tất',
    'Tỷ lệ hủy hoặc không đến',
    'Thời gian chờ',
    'Công suất theo khung giờ',
    'Khối lượng theo phòng',
    'Cơ cấu dịch vụ',
    'Doanh thu đã đối soát',
    'Công nợ',
    'Tình trạng kho',
    'Thuốc và vật tư sắp hết hạn',
    'Lịch tái khám',
    'Phản hồi khách hàng',
    'Sự cố vận hành',
  ],
  en: [
    'Appointments and arrivals',
    'Waiting and completed visits',
    'Cancellation and no-show rate',
    'Wait times',
    'Capacity by time slot',
    'Volume by room',
    'Service mix',
    'Reconciled revenue',
    'Outstanding debts',
    'Inventory status',
    'Near-expiry drugs and supplies',
    'Follow-up bookings',
    'Customer feedback',
    'Operational incidents',
  ],
};

/* ---------- Operations (multi-facility, HR, forms) ---------- */
export interface PtClinicOperationBlock {
  id: number;
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export const ptClinicOperationsTitle: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Vận hành đa cơ sở, nhân sự và biểu mẫu',
    description:
      'PT-Clinic hướng tới hỗ trợ tổ chức có nhiều địa điểm, đội ngũ đông và nhu cầu chuẩn hóa tài liệu.',
  },
  en: {
    title: 'Multi-facility, staffing and forms operations',
    description:
      'PT-Clinic supports organizations with multiple locations, large teams and a need to standardize documentation.',
  },
};

export const ptClinicOperations: Localized<PtClinicOperationBlock[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-building-2-line',
      title: 'Quản lý nhiều cơ sở',
      description:
        'Với hệ thống phòng khám có nhiều địa điểm, PT-Clinic hỗ trợ quản lý và phân quyền theo từng cơ sở.',
      items: [
        'Danh mục cơ sở, phòng khám và khu vực',
        'Nhân sự và lịch làm việc theo cơ sở',
        'Giá dịch vụ theo phạm vi được phép',
        'Kho theo địa điểm',
        'Báo cáo từng cơ sở và tổng hợp',
        'Phân quyền khu vực và luân chuyển phù hợp',
        'Đồng bộ hồ sơ theo quy định',
      ],
    },
    {
      id: 2,
      icon: 'ri-team-line',
      title: 'Quản lý nhân sự và lịch làm việc',
      description:
        'Quản lý đội ngũ, phạm vi chuyên môn và lịch làm việc để vận hành thông suốt.',
      items: [
        'Hồ sơ nhân sự và vai trò',
        'Phạm vi chuyên môn và cơ sở làm việc',
        'Lịch làm việc, ca trực và nghỉ phép',
        'Phòng phụ trách và trạng thái hoạt động',
        'Thời hạn giấy tờ cần theo dõi',
        'Nhật ký truy cập',
      ],
    },
    {
      id: 3,
      icon: 'ri-file-copy-2-line',
      title: 'Kho biểu mẫu và tài liệu',
      description:
        'Chuẩn hóa các loại phiếu và tài liệu với phiên bản và phạm vi sử dụng rõ ràng.',
      items: [
        'Phiếu tiếp đón, phiếu khám và chỉ định',
        'Phiếu kết quả và đơn thuốc',
        'Phiếu thu và phiếu đồng ý',
        'Hướng dẫn sau khám',
        'Biểu mẫu chuyên môn',
        'Chính sách, quy trình và tài liệu đào tạo',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-building-2-line',
      title: 'Multi-facility management',
      description:
        'For clinic chains with multiple locations, PT-Clinic supports management and access control per facility.',
      items: [
        'Facilities, rooms and areas catalog',
        'Staff and schedules by facility',
        'Service pricing within permitted scope',
        'Location-based inventory',
        'Per-facility and consolidated reports',
        'Area permissions and appropriate transfers',
        'Record synchronization per regulation',
      ],
    },
    {
      id: 2,
      icon: 'ri-team-line',
      title: 'Staff and schedule management',
      description:
        'Manage the team, professional scope and schedules for smooth operations.',
      items: [
        'Staff profiles and roles',
        'Professional scope and work facility',
        'Schedules, shifts and leave',
        'Assigned rooms and active status',
        'Document expiry tracking',
        'Access logs',
      ],
    },
    {
      id: 3,
      icon: 'ri-file-copy-2-line',
      title: 'Forms and documents library',
      description:
        'Standardize forms and documents with clear versions and usage scope.',
      items: [
        'Reception, examination and order forms',
        'Result forms and prescriptions',
        'Receipt and consent forms',
        'Post-care instructions',
        'Clinical forms',
        'Policies, processes and training documents',
      ],
    },
  ],
};

/* ---------- AI section ---------- */
export const ptClinicAi: Localized<PtClinicSectionText> = {
  vi: {
    title: 'AI trong PT-Clinic',
    description:
      'AI được xem xét để hỗ trợ công việc hành chính, không thay thế chuyên môn. Mọi nội dung do AI tạo cần được nhận diện rõ và được người có thẩm quyền kiểm tra trước khi sử dụng.',
  },
  en: {
    title: 'AI in PT-Clinic',
    description:
      'AI is considered to support administrative work, not replace clinical expertise. All AI-generated content must be clearly identified and reviewed by authorized personnel before use.',
  },
};

export const ptClinicAiCapabilities: Localized<string[]> = {
  vi: [
    'Chuyển giọng nói thành bản nháp văn bản',
    'Tóm tắt thông tin đã có',
    'Phân loại yêu cầu hành chính',
    'Tìm kiếm tài liệu nội bộ',
    'Gợi ý trường thông tin còn thiếu',
    'Chuẩn hóa dữ liệu sau khi được kiểm tra',
    'Phân tích xu hướng vận hành',
    'Dự báo tải lịch hẹn',
    'Hỗ trợ xây dựng báo cáo',
  ],
  en: [
    'Convert voice to text drafts',
    'Summarize existing information',
    'Classify administrative requests',
    'Search internal documents',
    'Suggest missing fields',
    'Standardize data after review',
    'Analyze operational trends',
    'Forecast appointment load',
    'Assist report building',
  ],
};

export const ptClinicAiLimits: Localized<string[]> = {
  vi: [
    'Chẩn đoán',
    'Kê đơn',
    'Thay đổi hồ sơ',
    'Hủy chỉ định',
    'Ra quyết định điều trị',
    'Từ chối tiếp nhận người bệnh',
    'Gửi thông tin chuyên môn chưa được phê duyệt',
  ],
  en: [
    'Diagnosis',
    'Prescribing',
    'Modifying records',
    'Canceling orders',
    'Treatment decisions',
    'Refusing patients',
    'Sending unapproved clinical information',
  ],
};

/* ---------- Security section ---------- */
export const ptClinicSecurity: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Bảo mật dữ liệu sức khỏe',
    description:
      'Dữ liệu sức khỏe thuộc nhóm thông tin đặc biệt nhạy cảm. PT-Clinic áp dụng nguyên tắc bảo vệ dữ liệu ngay từ thiết kế.',
  },
  en: {
    title: 'Health data security',
    description:
      'Health data is particularly sensitive information. PT-Clinic applies the principle of data protection by design.',
  },
};

export const ptClinicSecurityMeasures: Localized<string[]> = {
  vi: [
    'Phân quyền theo vai trò',
    'Giới hạn theo cơ sở và phạm vi công việc',
    'Xác thực nhiều lớp cho tài khoản quan trọng',
    'Mã hóa kết nối và dữ liệu phù hợp',
    'Nhật ký truy cập và chỉnh sửa',
    'Quản lý phiên đăng nhập',
    'Cảnh báo truy cập bất thường',
    'Sao lưu định kỳ và kiểm tra phục hồi',
    'Giới hạn xuất dữ liệu',
    'Kiểm soát tệp tải lên',
    'Che thông tin nhạy cảm',
    'Chính sách thời hạn lưu trữ',
    'Quy trình xử lý sự cố',
    'Cơ chế thực hiện quyền của chủ thể dữ liệu',
  ],
  en: [
    'Role-based access control',
    'Limits by facility and work scope',
    'Multi-factor authentication for key accounts',
    'Appropriate connection and data encryption',
    'Access and edit logs',
    'Session management',
    'Abnormal access alerts',
    'Periodic backups and recovery tests',
    'Restricted data export',
    'Uploaded file control',
    'Sensitive data masking',
    'Retention period policy',
    'Incident response process',
    'Data subject rights mechanism',
  ],
};

export const ptClinicLegal: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Bệnh án điện tử và giá trị pháp lý',
    description:
      'Để được sử dụng như hệ thống hồ sơ bệnh án điện tử thay cho hồ sơ giấy, sản phẩm và cơ sở triển khai phải đáp ứng đầy đủ yêu cầu hiện hành.',
  },
  en: {
    title: 'Electronic medical records and legal value',
    description:
      'To be used as an electronic medical record system replacing paper, the product and the implementing facility must fully meet current requirements.',
  },
};

export const ptClinicLegalItems: Localized<string[]> = {
  vi: [
    'Nội dung hồ sơ',
    'Cập nhật và hiển thị',
    'Chữ ký điện tử hoặc chữ ký số',
    'Xác thực người thực hiện',
    'Lưu trữ và khả năng truy xuất',
    'An toàn thông tin',
    'Sao lưu',
    'Kết nối và chia sẻ dữ liệu',
    'Quy trình công bố hoặc thẩm định',
  ],
  en: [
    'Record content',
    'Updates and display',
    'Electronic or digital signatures',
    'Performer authentication',
    'Storage and traceability',
    'Information security',
    'Backups',
    'Data connection and sharing',
    'Publication or appraisal process',
  ],
};

/* ---------- Roles ---------- */
export const ptClinicRolesTitle: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Vai trò người dùng',
    description:
      'Mỗi vai trò có một giao diện và bộ công cụ được tối ưu cho công việc của họ.',
  },
  en: {
    title: 'User roles',
    description: 'Each role gets an interface and toolset optimized for their work.',
  },
};

export interface PtClinicRole {
  id: number;
  icon: string;
  title: string;
  items: string[];
}

export const ptClinicRoles: Localized<PtClinicRole[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-customer-service-2-line',
      title: 'Lễ tân',
      items: [
        'Quản lý lịch hẹn',
        'Tiếp đón',
        'Cập nhật thông tin hành chính',
        'Quản lý hàng chờ',
        'Chuyển phòng',
      ],
    },
    {
      id: 2,
      icon: 'ri-stethoscope-line',
      title: 'Người hành nghề',
      items: [
        'Xem hồ sơ trong phạm vi được phép',
        'Ghi nhận thông tin chuyên môn',
        'Chỉ định',
        'Kê đơn',
        'Hẹn tái khám',
        'Xác nhận hồ sơ',
      ],
    },
    {
      id: 3,
      icon: 'ri-microscope-line',
      title: 'Kỹ thuật viên và bộ phận dịch vụ',
      items: [
        'Tiếp nhận chỉ định',
        'Ghi nhận thực hiện',
        'Cập nhật kết quả',
        'Chuyển kết quả cho người phụ trách',
      ],
    },
    {
      id: 4,
      icon: 'ri-medicine-bottle-line',
      title: 'Dược và kho',
      items: [
        'Quản lý danh mục',
        'Nhập, xuất và tồn',
        'Kiểm tra lô và hạn dùng',
        'Cấp phát theo quyền hạn',
        'Kiểm kê',
      ],
    },
    {
      id: 5,
      icon: 'ri-cash-line',
      title: 'Thu ngân',
      items: [
        'Lập bảng kê',
        'Nhận thanh toán',
        'In chứng từ',
        'Đối soát',
        'Ghi nhận hoàn tiền theo quyền',
      ],
    },
    {
      id: 6,
      icon: 'ri-line-chart-line',
      title: 'Quản lý',
      items: [
        'Theo dõi vận hành',
        'Phân tích dữ liệu',
        'Quản lý cấu hình',
        'Phê duyệt quy trình',
        'Kiểm soát chất lượng',
      ],
    },
    {
      id: 7,
      icon: 'ri-settings-3-line',
      title: 'Quản trị hệ thống',
      items: [
        'Quản lý tài khoản',
        'Phân quyền',
        'Sao lưu',
        'Theo dõi nhật ký',
        'Quản lý tích hợp',
        'Hỗ trợ vận hành',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-customer-service-2-line',
      title: 'Receptionist',
      items: [
        'Manage appointments',
        'Reception',
        'Update administrative info',
        'Manage the queue',
        'Transfer rooms',
      ],
    },
    {
      id: 2,
      icon: 'ri-stethoscope-line',
      title: 'Practitioner',
      items: [
        'View records within permitted scope',
        'Record clinical information',
        'Order services',
        'Prescribe',
        'Book follow-ups',
        'Confirm records',
      ],
    },
    {
      id: 3,
      icon: 'ri-microscope-line',
      title: 'Technician and service units',
      items: [
        'Receive orders',
        'Record execution',
        'Update results',
        'Forward results to the owner',
      ],
    },
    {
      id: 4,
      icon: 'ri-medicine-bottle-line',
      title: 'Pharmacy and warehouse',
      items: [
        'Manage the catalog',
        'Inbound, outbound and stock',
        'Check batches and expiry',
        'Dispense by authority',
        'Inventory count',
      ],
    },
    {
      id: 5,
      icon: 'ri-cash-line',
      title: 'Cashier',
      items: [
        'Prepare statements',
        'Receive payment',
        'Print documents',
        'Reconcile',
        'Record refunds by authority',
      ],
    },
    {
      id: 6,
      icon: 'ri-line-chart-line',
      title: 'Manager',
      items: [
        'Monitor operations',
        'Analyze data',
        'Manage configuration',
        'Approve processes',
        'Control quality',
      ],
    },
    {
      id: 7,
      icon: 'ri-settings-3-line',
      title: 'System administrator',
      items: [
        'Manage accounts',
        'Set permissions',
        'Backups',
        'Monitor logs',
        'Manage integrations',
        'Operational support',
      ],
    },
  ],
};

/* ---------- Integration ---------- */
export const ptClinicIntegration: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Khả năng tích hợp',
    description:
      'Mỗi tích hợp phải được đánh giá về kỹ thuật, bảo mật, pháp lý và trách nhiệm vận hành.',
  },
  en: {
    title: 'Integration capabilities',
    description:
      'Each integration must be evaluated for technical, security, legal and operational responsibility.',
  },
};

export const ptClinicIntegrations: Localized<string[]> = {
  vi: [
    'Website đặt lịch',
    'PT-Care',
    'Tổng đài',
    'Email và SMS',
    'Hóa đơn điện tử',
    'Thanh toán',
    'Hệ thống xét nghiệm khi phù hợp',
    'Kho thuốc',
    'Công cụ báo cáo',
    'Chữ ký số',
    'Nền tảng định danh được phép',
    'Hệ thống y tế khác qua API',
    'Hệ thống bảo hiểm nếu đủ điều kiện',
  ],
  en: [
    'Appointment website',
    'PT-Care',
    'Call center',
    'Email and SMS',
    'E-invoicing',
    'Payments',
    'Testing systems when appropriate',
    'Drug warehouse',
    'Reporting tools',
    'Digital signatures',
    'Permitted identity platforms',
    'Other health systems via API',
    'Insurance systems when eligible',
  ],
};

/* ---------- Roadmap ---------- */
export const ptClinicRoadmapTitle: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Lộ trình triển khai PT-Clinic',
    description:
      'Một lộ trình rõ ràng giúp phòng khám triển khai bài bản và kiểm soát được rủi ro.',
  },
  en: {
    title: 'PT-Clinic implementation roadmap',
    description:
      'A clear roadmap helps clinics implement systematically and manage risk.',
  },
};

export interface PtClinicPhase {
  id: number;
  title: string;
  items: string[];
}

export const ptClinicRoadmap: Localized<PtClinicPhase[]> = {
  vi: [
    {
      id: 1,
      title: 'Khảo sát',
      items: [
        'Phạm vi giấy phép hoạt động',
        'Chuyên khoa và dịch vụ',
        'Quy trình hiện tại',
        'Cơ cấu nhân sự',
        'Biểu mẫu và dữ liệu cần chuyển đổi',
        'Hạ tầng và yêu cầu bảo mật',
      ],
    },
    {
      id: 2,
      title: 'Thiết kế',
      items: [
        'Luồng tiếp đón và luồng khám',
        'Danh mục dịch vụ',
        'Vai trò và phân quyền',
        'Biểu mẫu chuyên môn',
        'Kho và tài chính',
        'Báo cáo và tích hợp',
      ],
    },
    {
      id: 3,
      title: 'Cấu hình',
      items: [
        'Tạo cơ sở và phòng',
        'Tạo người dùng',
        'Thiết lập danh mục',
        'Nhập dữ liệu phù hợp',
        'Cấu hình lịch và biểu mẫu',
        'Kiểm tra phân quyền',
      ],
    },
    {
      id: 4,
      title: 'Thử nghiệm',
      items: [
        'Chạy với phạm vi giới hạn',
        'Kiểm tra tình huống thực tế',
        'Đối chiếu dữ liệu',
        'Kiểm tra bảo mật',
        'Ghi nhận phản hồi',
        'Điều chỉnh quy trình',
      ],
    },
    {
      id: 5,
      title: 'Vận hành',
      items: [
        'Đào tạo người dùng',
        'Triển khai chính thức',
        'Theo dõi hỗ trợ',
        'Kiểm soát dữ liệu',
        'Xử lý sự cố',
        'Đối soát kết quả',
      ],
    },
    {
      id: 6,
      title: 'Cải tiến',
      items: [
        'Phân tích dữ liệu',
        'Tối ưu thời gian chờ',
        'Cập nhật biểu mẫu',
        'Hoàn thiện báo cáo',
        'Bổ sung tích hợp',
        'Phát triển chức năng theo nhu cầu',
      ],
    },
  ],
  en: [
    {
      id: 1,
      title: 'Survey',
      items: [
        'Operating license scope',
        'Specialties and services',
        'Current processes',
        'Staff structure',
        'Forms and data to migrate',
        'Infrastructure and security requirements',
      ],
    },
    {
      id: 2,
      title: 'Design',
      items: [
        'Reception and examination flows',
        'Service catalog',
        'Roles and permissions',
        'Clinical forms',
        'Warehouse and finance',
        'Reports and integrations',
      ],
    },
    {
      id: 3,
      title: 'Configuration',
      items: [
        'Create facilities and rooms',
        'Create users',
        'Set up catalogs',
        'Import suitable data',
        'Configure schedules and forms',
        'Check permissions',
      ],
    },
    {
      id: 4,
      title: 'Testing',
      items: [
        'Run in limited scope',
        'Test real scenarios',
        'Cross-check data',
        'Test security',
        'Collect feedback',
        'Adjust processes',
      ],
    },
    {
      id: 5,
      title: 'Operation',
      items: [
        'Train users',
        'Official deployment',
        'Monitor support',
        'Control data',
        'Handle incidents',
        'Reconcile results',
      ],
    },
    {
      id: 6,
      title: 'Improvement',
      items: [
        'Analyze data',
        'Optimize wait times',
        'Update forms',
        'Refine reports',
        'Add integrations',
        'Develop features on demand',
      ],
    },
  ],
};

/* ---------- Audience ---------- */
export const ptClinicAudienceTitle: Localized<PtClinicSectionText> = {
  vi: {
    title: 'PT-Clinic phù hợp với ai?',
    description:
      'Phạm vi cấu hình phải phù hợp với giấy phép và hoạt động chuyên môn của từng cơ sở.',
  },
  en: {
    title: 'Who is PT-Clinic for?',
    description:
      'The configuration scope must match the license and clinical operations of each facility.',
  },
};

export const ptClinicAudience: Localized<string[]> = {
  vi: [
    'Phòng khám đa khoa',
    'Phòng khám chuyên khoa',
    'Phòng khám y học cổ truyền',
    'Cơ sở phục hồi chức năng',
    'Trung tâm chăm sóc sức khỏe có giấy phép phù hợp',
    'Chuỗi phòng khám',
    'Cơ sở có nhu cầu quản lý lịch hẹn',
    'Đơn vị cần số hóa quy trình vận hành',
    'Cơ sở cần quản lý thuốc và vật tư',
    'Tổ chức cần kết nối chăm sóc sau khám',
  ],
  en: [
    'General clinics',
    'Specialist clinics',
    'Traditional medicine clinics',
    'Rehabilitation facilities',
    'Licensed healthcare centers',
    'Clinic chains',
    'Facilities needing appointment management',
    'Units needing operational digitization',
    'Facilities needing drug and supplies management',
    'Organizations needing post-care connectivity',
  ],
};

/* ---------- Values ---------- */
export const ptClinicValuesTitle: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Giá trị PT-Clinic hướng tới',
    description: 'Giá trị được tạo ra cho từng nhóm tham gia trong hệ thống.',
  },
  en: {
    title: 'The value PT-Clinic delivers',
    description: 'Value created for each group participating in the system.',
  },
};

export interface PtClinicValueGroup {
  id: number;
  icon: string;
  title: string;
  items: string[];
}

export const ptClinicValues: Localized<PtClinicValueGroup[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-user-heart-line',
      title: 'Với người bệnh',
      items: [
        'Đặt lịch thuận tiện',
        'Giảm nhập lại thông tin',
        'Hành trình rõ ràng',
        'Được nhắc lịch',
        'Dễ tiếp nhận hướng dẫn',
        'Có kênh phản hồi sau khám',
      ],
    },
    {
      id: 2,
      icon: 'ri-stethoscope-line',
      title: 'Với người hành nghề',
      items: [
        'Tra cứu thông tin nhanh',
        'Biểu mẫu thống nhất',
        'Giảm công việc hành chính',
        'Theo dõi lịch sử thuận tiện',
        'Hỗ trợ phối hợp giữa các bộ phận',
      ],
    },
    {
      id: 3,
      icon: 'ri-team-line',
      title: 'Với nhân viên vận hành',
      items: [
        'Nắm rõ trạng thái',
        'Giảm thao tác trùng lặp',
        'Dễ bàn giao',
        'Theo dõi kho và thanh toán',
        'Có dữ liệu phục vụ đối soát',
      ],
    },
    {
      id: 4,
      icon: 'ri-pie-chart-line',
      title: 'Với người quản lý',
      items: [
        'Quan sát hoạt động theo thời gian',
        'Kiểm soát quy trình',
        'Theo dõi công suất',
        'Quản lý doanh thu và kho',
        'Phát hiện điểm nghẽn',
        'Ra quyết định dựa trên dữ liệu',
      ],
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-user-heart-line',
      title: 'For patients',
      items: [
        'Convenient booking',
        'Less re-entering information',
        'Clear journey',
        'Appointment reminders',
        'Easy to receive instructions',
        'Post-care feedback channel',
      ],
    },
    {
      id: 2,
      icon: 'ri-stethoscope-line',
      title: 'For practitioners',
      items: [
        'Fast information lookup',
        'Unified forms',
        'Less administrative work',
        'Convenient history tracking',
        'Cross-department coordination support',
      ],
    },
    {
      id: 3,
      icon: 'ri-team-line',
      title: 'For operational staff',
      items: [
        'Clear status awareness',
        'Less repetitive work',
        'Easy handover',
        'Inventory and payment tracking',
        'Data for reconciliation',
      ],
    },
    {
      id: 4,
      icon: 'ri-pie-chart-line',
      title: 'For managers',
      items: [
        'Observe activity over time',
        'Control processes',
        'Track capacity',
        'Manage revenue and inventory',
        'Spot bottlenecks',
        'Data-driven decisions',
      ],
    },
  ],
};

/* ---------- Philosophy ---------- */
export const ptClinicPhilosophyTitle: Localized<PtClinicSectionText> = {
  vi: {
    title: 'Công nghệ phục vụ con người và chuyên môn',
    description:
      'Một phần mềm tốt không thay thế người hành nghề, quy trình chuyên môn hoặc trách nhiệm của cơ sở khám chữa bệnh.',
  },
  en: {
    title: 'Technology serving people and expertise',
    description:
      'Good software does not replace practitioners, clinical processes or the responsibility of the healthcare facility.',
  },
};

export interface PtClinicPhilosophyItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const ptClinicPhilosophy: Localized<PtClinicPhilosophyItem[]> = {
  vi: [
    {
      id: 1,
      icon: 'ri-user-heart-line',
      title: 'Người bệnh',
      description: 'Được tiếp nhận thuận tiện và tôn trọng.',
    },
    {
      id: 2,
      icon: 'ri-stethoscope-line',
      title: 'Người hành nghề',
      description: 'Có thông tin và công cụ hỗ trợ phù hợp.',
    },
    {
      id: 3,
      icon: 'ri-git-branch-line',
      title: 'Đội ngũ vận hành',
      description: 'Có quy trình rõ ràng và dữ liệu thống nhất.',
    },
    {
      id: 4,
      icon: 'ri-dashboard-line',
      title: 'Người quản lý',
      description: 'Có khả năng quan sát, kiểm soát và cải tiến.',
    },
  ],
  en: [
    {
      id: 1,
      icon: 'ri-user-heart-line',
      title: 'Patients',
      description: 'Received conveniently and with respect.',
    },
    {
      id: 2,
      icon: 'ri-stethoscope-line',
      title: 'Practitioners',
      description: 'Have the right information and tools.',
    },
    {
      id: 3,
      icon: 'ri-git-branch-line',
      title: 'Operational team',
      description: 'Clear processes and unified data.',
    },
    {
      id: 4,
      icon: 'ri-dashboard-line',
      title: 'Managers',
      description: 'The ability to observe, control and improve.',
    },
  ],
};

/* ---------- CTA / contact ---------- */
export const ptClinicCta: Localized<{
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  tertiaryCta: string;
  contactTitle: string;
  company: string;
  phone: string;
  email: string;
  workingHours: string;
  address: string;
}> = {
  vi: {
    title: 'Cùng xây dựng mô hình phòng khám số phù hợp',
    description:
      'Mỗi phòng khám có phạm vi chuyên môn, quy trình, nhân sự và yêu cầu quản trị khác nhau. PT-Clinic được định hướng như một phần mềm có khả năng cấu hình theo hoạt động thực tế của từng cơ sở.',
    primaryCta: 'Yêu cầu trình diễn PT-Clinic',
    secondaryCta: 'Đăng ký tư vấn triển khai',
    tertiaryCta: 'Gửi đề xuất hợp tác',
    contactTitle: 'Thông tin liên hệ',
    company: 'Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding',
    phone: '0343 089 666',
    email: 'phucthanhholding@gmail.com',
    workingHours: '08:00–17:00, tất cả các ngày trong tuần',
    address: 'Số 424 Đường Mê Linh, Phường Vĩnh Phúc, Tỉnh Phú Thọ, Việt Nam',
  },
  en: {
    title: 'Build the right digital clinic model together',
    description:
      'Every clinic has different specialties, processes, staff and management requirements. PT-Clinic is positioned as configurable software that adapts to each facility actual operations.',
    primaryCta: 'Request a PT-Clinic demo',
    secondaryCta: 'Register for implementation consulting',
    tertiaryCta: 'Send a cooperation proposal',
    contactTitle: 'Contact information',
    company: 'Phuc Thanh Holding Investment and Technology Joint Stock Company',
    phone: '0343 089 666',
    email: 'phucthanhholding@gmail.com',
    workingHours: '08:00–17:00, every day of the week',
    address: '424 Me Linh Street, Vinh Phuc Ward, Phu Tho Province, Vietnam',
  },
};