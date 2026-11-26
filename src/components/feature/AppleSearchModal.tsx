import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, detailHref } from '@/lib/routes';
import { searchContent, type SearchResult } from '@/lib/content';

interface AppleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppleSearchModal({ isOpen, onClose }: AppleSearchModalProps) {
  const { t } = useTranslation();
  const lang = useLang();
  const navigate = useNavigate();
  const isVi = lang === 'vi';

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live search debounced
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      searchContent(query.trim())
        .then((data) => {
          setResults(data.slice(0, 5));
        })
        .catch(() => {
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    navigate(`${getLocalizedPath('search', lang)}?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectResult = (res: SearchResult) => {
    onClose();
    navigate(detailHref(res.type, res.id, lang));
  };

  const quickLinks = [
    {
      title: isVi ? 'Xác minh doanh nghiệp (MST: 2500716846)' : 'Enterprise Verification (Tax: 2500716846)',
      href: getLocalizedPath('verification', lang),
      icon: 'ri-shield-check-line',
      tag: isVi ? 'Pháp lý' : 'Compliance',
    },
    {
      title: isVi ? 'PT Clinic Platform' : 'PT Clinic Platform',
      href: getLocalizedPath('pt-clinic', lang),
      icon: 'ri-heart-pulse-line',
      tag: isVi ? 'Y tế số' : 'HealthTech',
    },
    {
      title: isVi ? 'PT DataLake Engine' : 'PT DataLake Engine',
      href: getLocalizedPath('pt-datalake', lang),
      icon: 'ri-database-2-line',
      tag: isVi ? 'Dữ liệu lớn' : 'Big Data',
    },
    {
      title: isVi ? 'PT LMS Ecosystem' : 'PT LMS Ecosystem',
      href: getLocalizedPath('pt-lms', lang),
      icon: 'ri-graduation-cap-line',
      tag: isVi ? 'Đào tạo' : 'EdTech',
    },
    {
      title: isVi ? 'Hạ tầng An ninh mạng & Zero-Trust' : 'Security Architecture & Zero-Trust',
      href: getLocalizedPath('technology', lang),
      icon: 'ri-lock-password-line',
      tag: isVi ? 'Bảo mật' : 'Security',
    },
    {
      title: isVi ? 'Liên hệ Hợp tác Đầu tư' : 'Strategic Partnership Contact',
      href: getLocalizedPath('partnership', lang),
      icon: 'ri-handshake-line',
      tag: isVi ? 'Hợp tác' : 'Partner',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
      {/* Apple-grade glass backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Floating Search Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-200 overflow-hidden z-10 animate-fade-in">
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3.5 border-b border-gray-200">
          <i className="ri-search-line text-lg text-[#046842] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isVi ? 'Tìm kiếm giải pháp, sản phẩm, tin tức hoặc hồ sơ...' : 'Search solutions, products, articles or docs...'}
            className="flex-1 text-sm sm:text-base text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors mr-2"
              aria-label="Clear query"
            >
              <i className="ri-close-circle-fill text-lg" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-gray-400 bg-gray-100 rounded-md border border-gray-200">
            ESC
          </kbd>
        </form>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {/* Live Search Results */}
          {loading && (
            <div className="py-8 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
              <i className="ri-loader-4-line text-[#046842] text-xl animate-spin" />
              <span>{isVi ? 'Đang tìm kiếm...' : 'Searching...'}</span>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-2">
                {isVi ? 'Kết quả tìm thấy' : 'Matching Results'}
              </div>
              <div className="space-y-1">
                {results.map((res) => (
                  <button
                    key={`${res.type}-${res.id}`}
                    onClick={() => handleSelectResult(res)}
                    className="w-full text-left p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 flex items-start gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#046842]/10 text-[#046842] flex items-center justify-center shrink-0 mt-0.5">
                      <i className={res.type === 'news' ? 'ri-newspaper-line' : res.type === 'products' ? 'ri-box-3-line' : 'ri-folder-2-line'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-[#046842] transition-colors truncate">
                        {res.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-0.5">
                        {res.excerpt}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 shrink-0">
                      {res.type}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-center">
                <button
                  onClick={handleSubmit}
                  className="text-xs font-bold text-[#046842] hover:text-[#025938] transition-colors"
                >
                  {isVi ? `Xem tất cả kết quả cho "${query}" →` : `View all results for "${query}" →`}
                </button>
              </div>
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="py-6 text-center text-gray-500 text-sm">
              <i className="ri-search-eye-line text-3xl text-gray-300 block mb-2" />
              {isVi ? `Không tìm thấy kết quả phù hợp cho "${query}"` : `No direct matches for "${query}"`}
            </div>
          )}

          {/* Quick Links Suggestions (Apple Style) */}
          {(!query || results.length === 0) && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-2 flex items-center justify-between">
                <span>{isVi ? 'Truy cập nhanh' : 'Quick Access'}</span>
                <span className="text-[10px] font-normal text-gray-400 lowercase">
                  {isVi ? 'phổ biến' : 'trending'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => onClose()}
                    className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-[#f8fafc] border border-transparent hover:border-gray-200 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-[#046842]/10 group-hover:text-[#046842] flex items-center justify-center shrink-0 transition-colors">
                      <i className={`${item.icon} text-base`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#046842] transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {item.tag}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-600 font-sans">↵</kbd> {isVi ? 'chọn' : 'navigate'}</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-600 font-sans">esc</kbd> {isVi ? 'đóng' : 'close'}</span>
          </div>
          <a
            href={getLocalizedPath('search', lang)}
            onClick={() => onClose()}
            className="text-[#046842] font-semibold hover:underline"
          >
            {isVi ? 'Tìm kiếm nâng cao →' : 'Advanced Search →'}
          </a>
        </div>
      </div>
    </div>
  );
}
