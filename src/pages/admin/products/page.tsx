import { useCallback, useEffect, useMemo, useState } from 'react';
import { adminCreate, adminList, adminRemove, adminUpdate } from '@/lib/adminApi';
import ProductFormModal, {
  categoryLabel,
  PRODUCT_CATEGORIES,
  type ProductFormValues,
  type ProductRecord,
} from './components/ProductFormModal';
import AdminLoadingState from '@/pages/admin/components/AdminLoadingState';
import AdminEmptyState from '@/pages/admin/components/AdminEmptyState';
import AdminErrorState from '@/pages/admin/components/AdminErrorState';

const CATEGORY_FILTERS = ['Tất cả', ...PRODUCT_CATEGORIES.map((c) => c.label)];

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function splitLines(text: string): string[] {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminProducts() {
  const [items, setItems] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(CATEGORY_FILTERS[0]);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProductRecord | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [deleting, setDeleting] = useState<ProductRecord | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await adminList<ProductRecord>('content_products');
      setItems(data.sort((a,b) => b.id-a.id));
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Không thể tải danh sách sản phẩm.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchCategory =
        category === CATEGORY_FILTERS[0] || categoryLabel(item.category_id) === category;
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [items, search, category]);

  function openCreate() {
    setEditing(null);
    setSaveError('');
    setFormOpen(true);
  }

  function openEdit(item: ProductRecord) {
    setEditing(item);
    setSaveError('');
    setFormOpen(true);
  }

  async function handleSave(values: ProductFormValues) {
    setSaving(true);
    setSaveError('');
    try {
      const payload = {
        title: values.title,
        category_id: values.category_id,
        description: values.description,
        image: values.image,
        featured: values.featured,
        date: values.date,
        features: splitLines(values.features),
        slug: values.slug.trim() || null,
        title_en: values.title_en.trim() || null,
        description_en: values.description_en.trim() || null,
        features_en: values.features_en.trim() ? splitLines(values.features_en) : null,
      };

      if (editing) {
        await adminUpdate('content_products', editing.id, payload);
      } else {
        await adminCreate('content_products', payload);
      }

      setFormOpen(false);
      setEditing(null);
      await load();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Lưu thất bại, vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setDeleteBusy(true);
    setDeleteError('');
    try {
      await adminRemove('content_products', deleting.id);
      setDeleting(null);
      await load();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Xóa thất bại, vui lòng thử lại.');
    } finally {
      setDeleteBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground-900 mb-1">Sản phẩm</h1>
          <p className="text-sm text-foreground-600">Quản lý các sản phẩm / giải pháp trên website.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
        >
          <i className="ri-add-line w-4 h-4 flex items-center justify-center" />
          Thêm sản phẩm
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <i className="ri-search-line w-4 h-4 flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tiêu đề hoặc mô tả..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-background-300 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                category === cat
                  ? 'bg-primary-500 text-background-50'
                  : 'bg-background-100 text-foreground-700 hover:bg-background-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
        {loadError ? (
          <AdminErrorState message={loadError} onRetry={load} />
        ) : loading ? (
          <AdminLoadingState />
        ) : filtered.length === 0 ? (
          <AdminEmptyState
            icon="ri-box-3-line"
            description={
              items.length === 0
                ? 'Chưa có sản phẩm nào. Bấm "Thêm sản phẩm" để tạo sản phẩm đầu tiên.'
                : 'Không tìm thấy sản phẩm phù hợp.'
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200 text-left text-xs uppercase tracking-wide text-foreground-500">
                  <th className="px-5 py-3 font-semibold">Sản phẩm</th>
                  <th className="px-5 py-3 font-semibold">Danh mục</th>
                  <th className="px-5 py-3 font-semibold">Ngày</th>
                  <th className="px-5 py-3 font-semibold">Nổi bật</th>
                  <th className="px-5 py-3 font-semibold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-background-100 last:border-b-0 hover:bg-background-100/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-16 h-11 rounded-md overflow-hidden border border-background-200 bg-background-100 shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-foreground-900 truncate max-w-md">
                            {item.title}
                          </div>
                          <div className="text-xs text-foreground-500 truncate max-w-md">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-900 rounded-sm">
                        {categoryLabel(item.category_id)}
                      </span>
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-foreground-600">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      {item.featured ? (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold bg-accent-500 text-foreground-950 rounded-sm">
                          Nổi bật
                        </span>
                      ) : (
                        <span className="text-xs text-foreground-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-foreground-700 hover:bg-background-200 rounded-md transition-colors whitespace-nowrap"
                          title="Sửa"
                        >
                          <i className="ri-edit-line w-4 h-4 flex items-center justify-center" />
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteError('');
                            setDeleting(item);
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors whitespace-nowrap"
                          title="Xóa"
                        >
                          <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center" />
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-foreground-500 mt-4">
        Tổng cộng {items.length} sản phẩm{filtered.length !== items.length ? ` · đang hiển thị ${filtered.length}` : ''}.
      </p>

      {formOpen && (
        <ProductFormModal
          initial={editing}
          saving={saving}
          error={saveError}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSave}
        />
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-background-50 rounded-xl">
            <div className="px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 shrink-0">
                  <i className="ri-alert-line w-5 h-5 flex items-center justify-center" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground-900">Xóa sản phẩm?</h2>
                  <p className="text-sm text-foreground-600 mt-1 leading-relaxed">
                    Bạn sắp xóa sản phẩm{' '}
                    <span className="font-semibold text-foreground-900">{deleting.title}</span>. Hành động này
                    không thể hoàn tác.
                  </p>
                </div>
              </div>

              {deleteError && (
                <div className="mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-md px-3 py-2.5">
                  <i className="ri-error-warning-line w-4 h-4 flex items-center justify-center mt-0.5 shrink-0" />
                  <span>{deleteError}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-background-200 bg-background-100/60 rounded-b-xl">
              <button
                type="button"
                onClick={() => setDeleting(null)}
                disabled={deleteBusy}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-200 rounded-md transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteBusy}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {deleteBusy && (
                  <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin" />
                )}
                Xóa sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
