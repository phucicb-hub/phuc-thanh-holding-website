import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/admin/lien-he', label: 'Yêu cầu liên hệ', icon: 'ri-mail-line', end: false },
  { to: '/admin', label: 'Tổng quan', icon: 'ri-dashboard-line', end: true },
  { to: '/admin/tin-tuc', label: 'Tin tức', icon: 'ri-newspaper-line', end: false },
  { to: '/admin/du-an', label: 'Dự án', icon: 'ri-briefcase-line', end: false },
  { to: '/admin/san-pham', label: 'Sản phẩm', icon: 'ri-box-3-line', end: false },
  { to: '/admin/don-hang', label: 'Đơn hàng', icon: 'ri-shopping-cart-line', end: false },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 shrink-0 bg-primary-950 text-background-100 flex flex-col min-h-screen sticky top-0">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-background-50/10">
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent-500 text-primary-950">
          <i className="ri-shield-keyhole-line w-5 h-5 flex items-center justify-center" />
        </div>
        <div>
          <div className="text-sm font-bold text-white whitespace-nowrap">Phúc Thành</div>
          <div className="text-[11px] text-background-300 whitespace-nowrap">Quản trị hệ thống</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-primary-500 text-background-50'
                  : 'text-background-200 hover:bg-background-50/10 hover:text-white'
              }`
            }
          >
            <i className={`${item.icon} w-5 h-5 flex items-center justify-center`} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-background-50/10">
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-background-200 hover:bg-background-50/10 hover:text-white transition-colors whitespace-nowrap"
        >
          <i className="ri-external-link-line w-5 h-5 flex items-center justify-center" />
          <span>Xem website</span>
        </a>
      </div>
    </aside>
  );
}
