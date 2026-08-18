import { useEffect, useState, type FormEvent } from 'react';

export interface NewsRecord {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image: string;
  content: string[];
  tags: string[];
  title_en: string | null;
  category_en: string | null;
  excerpt_en: string | null;
  content_en: string[] | null;
  tags_en: string[] | null;
}

export interface NewsFormValues {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image: string;
  content: string;
  tags: string;
  title_en: string;
  category_en: string;
  excerpt_en: string;
  content_en: string;
  tags_en: string;
}

const CATEGORIES = ['Tin công ty', 'Công nghệ', 'Thị trường', 'Sự kiện'];

function toLines(arr: string[] | null | undefined): string {
  return (arr ?? []).join('\n');
}

function toComma(arr: string[] | null | undefined): string {
  return (arr ?? []).join(', ');
}

interface Props {
  initial: NewsRecord | null;
  saving: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: NewsFormValues) => void;
}

const inputClass =
  'w-full px-3 py-2 text-sm rounded-md border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-shadow';

const labelClass = 'block text-sm font-medium text-foreground-800 mb-1.5';

export default function NewsFormModal({ initial, saving, error, onClose, onSubmit }: Props) {
  const [values, setValues] = useState<NewsFormValues>({
    title: '',
    category: CATEGORIES[0],
    excerpt: '',
    date: new Date().toISOString().slice(0, 10),
    image: '',
    content: '',
    tags: '',
    title_en: '',
    category_en: '',
    excerpt_en: '',
    content_en: '',
    tags_en: '',
  });

  useEffect(() => {
    if (initial) {
      setValues({
        title: initial.title,
        category: initial.category,
        excerpt: initial.excerpt,
        date: initial.date,
        image: initial.image,
        content: toLines(initial.content),
        tags: toComma(initial.tags),
        title_en: initial.title_en ?? '',
        category_en: initial.category_en ?? '',
        excerpt_en: initial.excerpt_en ?? '',
        content_en: toLines(initial.content_en),
        tags_en: toComma(initial.tags_en),
      });
    } else {
      setValues({
        title: '',
        category: CATEGORIES[0],
        excerpt: '',
        date: new Date().toISOString().slice(0, 10),
        image: '',
        content: '',
        tags: '',
        title_en: '',
        category_en: '',
        excerpt_en: '',
        content_en: '',
        tags_en: '',
      });
    }
  }, [initial]);

  function set<K extends keyof NewsFormValues>(key: K, value: NewsFormValues[K]) {
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
              {initial ? 'Sửa bài viết' : 'Thêm bài viết'}
            </h2>
            <p className="text-xs text-foreground-500 mt-0.5">
              {initial ? `Cập nhật nội dung bài viết #${initial.id}` : 'Điền thông tin để tạo bài viết mới'}
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
                <label htmlFor="news-title" className={labelClass}>
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  id="news-title"
                  type="text"
                  required
                  value={values.title}
                  onChange={(e) => set('title', e.target.value)}
                  className={inputClass}
                  placeholder="Tiêu đề bài viết"
                />
              </div>

              <div>
                <label htmlFor="news-category" className={labelClass}>
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  id="news-category"
                  value={values.category}
                  onChange={(e) => set('category', e.target.value)}
                  className={inputClass}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="news-date" className={labelClass}>
                  Ngày đăng <span className="text-red-500">*</span>
                </label>
                <input
                  id="news-date"
                  type="date"
                  required
                  value={values.date}
                  onChange={(e) => set('date', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="news-image" className={labelClass}>
                  Ảnh đại diện (URL) <span className="text-red-500">*</span>
                </label>
                <input
                  id="news-image"
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

              <div className="sm:col-span-2">
                <label htmlFor="news-excerpt" className={labelClass}>
                  Tóm tắt <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="news-excerpt"
                  required
                  value={values.excerpt}
                  onChange={(e) => set('excerpt', e.target.value)}
                  rows={2}
                  className={`${inputClass} resize-y`}
                  placeholder="Mô tả ngắn hiển thị ở danh sách"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="news-content" className={labelClass}>
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="news-content"
                  required
                  value={values.content}
                  onChange={(e) => set('content', e.target.value)}
                  rows={8}
                  className={`${inputClass} resize-y`}
                  placeholder={'Mỗi dòng là một đoạn văn.\n\nVí dụ:\nĐoạn mở đầu...\nĐoạn nội dung...'}
                />
                <p className="text-xs text-foreground-500 mt-1.5">Mỗi dòng sẽ thành một đoạn văn riêng.</p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="news-tags" className={labelClass}>
                  Thẻ (tags)
                </label>
                <input
                  id="news-tags"
                  type="text"
                  value={values.tags}
                  onChange={(e) => set('tags', e.target.value)}
                  className={inputClass}
                  placeholder="Công nghệ, AI, Chuyển đổi số"
                />
                <p className="text-xs text-foreground-500 mt-1.5">Các thẻ cách nhau bằng dấu phẩy.</p>
              </div>
            </div>

            <div className="border-t border-background-200 pt-5">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-global-line w-4 h-4 flex items-center justify-center text-foreground-500" />
                <h3 className="text-sm font-semibold text-foreground-800">Nội dung tiếng Anh (tùy chọn)</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="news-title-en" className={labelClass}>
                    Tiêu đề (EN)
                  </label>
                  <input
                    id="news-title-en"
                    type="text"
                    value={values.title_en}
                    onChange={(e) => set('title_en', e.target.value)}
                    className={inputClass}
                    placeholder="English title"
                  />
                </div>

                <div>
                  <label htmlFor="news-category-en" className={labelClass}>
                    Danh mục (EN)
                  </label>
                  <input
                    id="news-category-en"
                    type="text"
                    value={values.category_en}
                    onChange={(e) => set('category_en', e.target.value)}
                    className={inputClass}
                    placeholder="Company News"
                  />
                </div>

                <div>
                  <label htmlFor="news-tags-en" className={labelClass}>
                    Thẻ (EN)
                  </label>
                  <input
                    id="news-tags-en"
                    type="text"
                    value={values.tags_en}
                    onChange={(e) => set('tags_en', e.target.value)}
                    className={inputClass}
                    placeholder="Technology, AI"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="news-excerpt-en" className={labelClass}>
                    Tóm tắt (EN)
                  </label>
                  <textarea
                    id="news-excerpt-en"
                    value={values.excerpt_en}
                    onChange={(e) => set('excerpt_en', e.target.value)}
                    rows={2}
                    className={`${inputClass} resize-y`}
                    placeholder="Short summary in English"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="news-content-en" className={labelClass}>
                    Nội dung (EN)
                  </label>
                  <textarea
                    id="news-content-en"
                    value={values.content_en}
                    onChange={(e) => set('content_en', e.target.value)}
                    rows={6}
                    className={`${inputClass} resize-y`}
                    placeholder={'Each line is a paragraph.'}
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
              {initial ? 'Lưu thay đổi' : 'Tạo bài viết'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}