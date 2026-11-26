/* eslint-disable react-refresh/only-export-components -- shared form types belong with this component */
import { useEffect, useState, type FormEvent } from 'react';

export interface ProductRecord {
  id: number;
  category_id: string;
  title: string;
  description: string;
  image: string;
  featured: boolean;
  date: string;
  features: string[];
  slug: string | null;
  title_en: string | null;
  description_en: string | null;
  features_en: string[] | null;
}

export interface ProductFormValues {
  title: string;
  category_id: string;
  description: string;
  image: string;
  featured: boolean;
  date: string;
  features: string;
  slug: string;
  title_en: string;
  description_en: string;
  features_en: string;
}

export const PRODUCT_CATEGORIES: { id: string; label: string }[] = [
  { id: 'software', label: 'Giải pháp phần mềm' },
  { id: 'digital', label: 'Chuyển đổi số doanh nghiệp' },
  { id: 'data', label: 'Quản trị và phân tích dữ liệu' },
  { id: 'elearning', label: 'Đào tạo trực tuyến' },
  { id: 'media', label: 'Truyền thông và nội dung số' },
  { id: 'care', label: 'Giải pháp chăm sóc khách hàng' },
  { id: 'health', label: 'Sản phẩm chăm sóc sức khỏe' },
  { id: 'custom', label: 'Giải pháp theo yêu cầu' },
];

export function categoryLabel(id: string): string {
  return PRODUCT_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

function toLines(arr: string[] | null | undefined): string {
  return (arr ?? []).join('\n');
}

interface Props {
  initial: ProductRecord | null;
  saving: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
}

const inputClass =
  'w-full px-3 py-2 text-sm rounded-md border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-shadow';

const labelClass = 'block text-sm font-medium text-foreground-800 mb-1.5';

export default function ProductFormModal({ initial, saving, error, onClose, onSubmit }: Props) {
  const [values, setValues] = useState<ProductFormValues>({
    title: '',
    category_id: PRODUCT_CATEGORIES[0].id,
    description: '',
    image: '',
    featured: false,
    date: new Date().toISOString().slice(0, 10),
    features: '',
    slug: '',
    title_en: '',
    description_en: '',
    features_en: '',
  });

  useEffect(() => {
    if (initial) {
      setValues({
        title: initial.title,
        category_id: initial.category_id,
        description: initial.description,
        image: initial.image,
        featured: initial.featured,
        date: initial.date,
        features: toLines(initial.features),
        slug: initial.slug ?? '',
        title_en: initial.title_en ?? '',
        description_en: initial.description_en ?? '',
        features_en: toLines(initial.features_en),
      });
    } else {
      setValues({
        title: '',
        category_id: PRODUCT_CATEGORIES[0].id,
        description: '',
        image: '',
        featured: false,
        date: new Date().toISOString().slice(0, 10),
        features: '',
        slug: '',
        title_en: '',
        description_en: '',
        features_en: '',
      });
    }
  }, [initial]);

  function set<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 md:p-8">
      <div className="relative w-full max-w-3xl bg-background-50 rounded-xl my-4">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-background-200 bg-background-50 rounded-t-xl">
          <div>
            <h2 className="text-base font-bold text-foreground-900">
              {initial ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
            </h2>
            <p className="text-xs text-foreground-500 mt-0.5">
              {initial ? `Cập nhật nội dung sản phẩm #${initial.id}` : 'Điền thông tin để tạo sản phẩm mới'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md text-foreground-500 hover:bg-background-100 hover:text-foreground-900 transition-colors"
            aria-label="Đóng"
          >
            <i className="ri-close-line w-5 h-5 flex items-center justify-center" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="product-title" className={labelClass}>
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  id="product-title"
                  type="text"
                  required
                  value={values.title}
                  onChange={(e) => set('title', e.target.value)}
                  className={inputClass}
                  placeholder="Tên sản phẩm / giải pháp"
                />
              </div>

              <div>
                <label htmlFor="product-category" className={labelClass}>
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  id="product-category"
                  value={values.category_id}
                  onChange={(e) => set('category_id', e.target.value)}
                  className={inputClass}
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="product-date" className={labelClass}>
                  Ngày <span className="text-red-500">*</span>
                </label>
                <input
                  id="product-date"
                  type="date"
                  required
                  value={values.date}
                  onChange={(e) => set('date', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="product-image" className={labelClass}>
                  Ảnh đại diện (URL) <span className="text-red-500">*</span>
                </label>
                <input
                  id="product-image"
                  type="url"
                  required
                  value={values.image}
                  onChange={(e) => set('image', e.target.value)}
                  className={inputClass}
                  placeholder="https://..."
                />
                {values.image && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative w-28 h-[70px] rounded-md overflow-hidden border border-background-200 bg-background-100 shrink-0">
                      <img
                        src={values.image}
                        alt="Xem trước ảnh"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-xs text-foreground-500">Xem trước ảnh đại diện</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="product-slug" className={labelClass}>
                  Slug (URL tùy chọn)
                </label>
                <input
                  id="product-slug"
                  type="text"
                  value={values.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  className={inputClass}
                  placeholder="nen-tang-quan-tri-doanh-nghiep"
                />
                <p className="text-xs text-foreground-500 mt-1.5">
                  Đường dẫn thân thiện, ví dụ /san-pham/ten-san-pham.
                </p>
              </div>

              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={values.featured}
                    onChange={(e) => set('featured', e.target.checked)}
                    className="w-4 h-4 accent-primary-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-foreground-800">Nổi bật</span>
                </label>
                <p className="text-xs text-foreground-500 ml-3 pb-0.5">Hiển thị nhãn nổi bật và ưu tiên sắp xếp.</p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="product-description" className={labelClass}>
                  Mô tả <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="product-description"
                  required
                  value={values.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={3}
                  className={`${inputClass} resize-y`}
                  placeholder="Mô tả ngắn hiển thị ở danh sách sản phẩm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="product-features" className={labelClass}>
                  Tính năng nổi bật
                </label>
                <textarea
                  id="product-features"
                  value={values.features}
                  onChange={(e) => set('features', e.target.value)}
                  rows={5}
                  className={`${inputClass} resize-y`}
                  placeholder={'Mỗi dòng là một tính năng.\n\nVí dụ:\nQuản lý tài chính tập trung\nBáo cáo theo thời gian thực'}
                />
                <p className="text-xs text-foreground-500 mt-1.5">Mỗi dòng sẽ thành một tính năng riêng.</p>
              </div>
            </div>

            <div className="border-t border-background-200 pt-5">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-global-line w-4 h-4 flex items-center justify-center text-foreground-500" />
                <h3 className="text-sm font-semibold text-foreground-800">Nội dung tiếng Anh (tùy chọn)</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="product-title-en" className={labelClass}>
                    Tiêu đề (EN)
                  </label>
                  <input
                    id="product-title-en"
                    type="text"
                    value={values.title_en}
                    onChange={(e) => set('title_en', e.target.value)}
                    className={inputClass}
                    placeholder="English title"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="product-description-en" className={labelClass}>
                    Mô tả (EN)
                  </label>
                  <textarea
                    id="product-description-en"
                    value={values.description_en}
                    onChange={(e) => set('description_en', e.target.value)}
                    rows={3}
                    className={`${inputClass} resize-y`}
                    placeholder="Short summary in English"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="product-features-en" className={labelClass}>
                    Tính năng (EN)
                  </label>
                  <textarea
                    id="product-features-en"
                    value={values.features_en}
                    onChange={(e) => set('features_en', e.target.value)}
                    rows={4}
                    className={`${inputClass} resize-y`}
                    placeholder={'Each line is a feature.'}
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-6 mb-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-md px-3 py-2.5">
              <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-background-200 bg-background-100/60 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-200 rounded-md transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {saving && <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin" />}
              {initial ? 'Lưu thay đổi' : 'Tạo sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
