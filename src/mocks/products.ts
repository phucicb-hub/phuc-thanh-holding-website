import type { Localized } from '@/lib/lang';

export interface ProductCategory {
  id: string;
  label: string;
}

export const productCategories: Localized<ProductCategory[]> = {
  vi: [
    { id: 'all', label: 'Tất cả sản phẩm' },
    { id: 'software', label: 'Giải pháp phần mềm' },
    { id: 'digital', label: 'Chuyển đổi số doanh nghiệp' },
    { id: 'data', label: 'Quản trị và phân tích dữ liệu' },
    { id: 'elearning', label: 'Đào tạo trực tuyến' },
    { id: 'media', label: 'Truyền thông và nội dung số' },
    { id: 'care', label: 'Giải pháp chăm sóc khách hàng' },
    { id: 'health', label: 'Sản phẩm chăm sóc sức khỏe' },
    { id: 'custom', label: 'Giải pháp theo yêu cầu' },
  ],
  en: [
    { id: 'all', label: 'All products' },
    { id: 'software', label: 'Software solutions' },
    { id: 'digital', label: 'Enterprise digital transformation' },
    { id: 'data', label: 'Data management and analytics' },
    { id: 'elearning', label: 'Online training' },
    { id: 'media', label: 'Media and digital content' },
    { id: 'care', label: 'Customer care solutions' },
    { id: 'health', label: 'Healthcare products' },
    { id: 'custom', label: 'Custom solutions' },
  ],
};