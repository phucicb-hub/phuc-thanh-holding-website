# Phúc Thành Holding

Website doanh nghiệp song ngữ Việt–Anh của **Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding**. Dự án giới thiệu doanh nghiệp, lĩnh vực hoạt động, dịch vụ, sản phẩm, dự án và tin tức; đồng thời cung cấp trang quản trị nội dung kết nối với Supabase.

## Tính năng chính

- Giao diện responsive cho desktop và thiết bị di động.
- Nội dung song ngữ Việt/Anh với URL riêng theo ngôn ngữ (`/vi`, `/en`).
- Các trang giới thiệu, lĩnh vực hoạt động, dịch vụ, sản phẩm, dự án, tin tức, tuyển dụng và liên hệ.
- Trang chi tiết động cho sản phẩm, dự án và tin tức.
- Tìm kiếm, sitemap, trang pháp lý và metadata SEO có cấu trúc.
- Trang quản trị tại `/admin` dành cho tin tức, dự án, sản phẩm và đơn hàng.
- Supabase Auth, PostgreSQL, Row Level Security và Edge Functions cho các nghiệp vụ backend.

## Công nghệ sử dụng

- React 19, TypeScript
- Vite 8
- React Router 7
- Tailwind CSS 3
- i18next / react-i18next
- Supabase (Database, Auth, Edge Functions)
- ESLint 9

## Yêu cầu môi trường

- Node.js `20.19+` hoặc `22.12+`
- npm
- Một dự án Supabase nếu cần dữ liệu động và trang quản trị
- Supabase CLI nếu cần triển khai migration hoặc Edge Functions

## Cài đặt và chạy local

```bash
git clone <repository-url>
cd phucthanhholding
npm install
```

Sao chép file biến môi trường mẫu:

```bash
cp .env.example .env
```

Trên Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Cập nhật `.env` bằng thông tin của dự án Supabase:

```env
VITE_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
VITE_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
VITE_SITE_URL=https://phucthanhholding.com
```

Sau đó khởi động máy chủ phát triển:

```bash
npm run dev
```

Ứng dụng mặc định chạy tại [http://localhost:3000](http://localhost:3000).

> Chỉ sử dụng Supabase anon key ở frontend. Không đưa service-role key, thông tin quản trị hoặc secret của Edge Functions vào biến môi trường có tiền tố `VITE_`.

## Các lệnh thường dùng

| Lệnh | Mô tả |
| --- | --- |
| `npm run dev` | Chạy môi trường phát triển tại cổng 3000 |
| `npm run build` | Tạo bản production trong thư mục `out/` |
| `npm run preview` | Xem trước bản build production |
| `npm run lint` | Kiểm tra mã nguồn bằng ESLint |
| `npm run type-check` | Kiểm tra kiểu dữ liệu TypeScript |

Trước khi tạo bản phát hành, nên chạy:

```bash
npm run lint
npm run type-check
npm run build
```

## Cấu trúc thư mục

```text
.
├── public/                  # Tài nguyên tĩnh, robots, sitemap và HTTP headers
├── src/
│   ├── components/          # Component dùng chung và component theo tính năng
│   ├── hooks/               # React hooks dùng chung
│   ├── i18n/                # Cấu hình và nội dung dịch Việt/Anh
│   ├── lib/                 # Supabase client, route và tiện ích dữ liệu
│   ├── mocks/               # Dữ liệu dự phòng/tĩnh
│   ├── pages/               # Các trang public và trang quản trị
│   ├── router/              # Cấu hình định tuyến
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── functions/           # admin-api, contact-submit, bootstrap-admin
│   └── migrations/          # Schema, hardening bảo mật và data retention
├── .env.example
├── SECURITY.md              # Checklist bảo mật khi triển khai
├── vite.config.ts
└── package.json
```

## Supabase và trang quản trị

Trang quản trị sử dụng Supabase Auth và Edge Function `admin-api`. Để thiết lập một môi trường mới:

1. Tạo dự án Supabase và cấu hình URL/anon key trong `.env`.
2. Liên kết Supabase CLI với dự án.
3. Áp dụng toàn bộ migration trong `supabase/migrations/` theo thứ tự tên file.
4. Triển khai các Edge Functions `admin-api`, `contact-submit` và `bootstrap-admin`.
5. Thiết lập các secret phía server:
   - `ADMIN_USER_ID`: UUID cố định của tài khoản quản trị trong Supabase Auth.
   - `ALLOWED_ORIGINS`: danh sách origin được phép, phân tách bằng dấu phẩy.
   - `CONTACT_RATE_SALT`: chuỗi ngẫu nhiên bí mật có ít nhất 32 byte.
6. Tắt đăng ký người dùng công khai nếu hệ thống không sử dụng chức năng này.

Ví dụ lệnh triển khai sau khi đã cài đặt và đăng nhập Supabase CLI:

```bash
supabase link --project-ref <project-ref>
supabase db push
supabase functions deploy admin-api
supabase functions deploy contact-submit
supabase functions deploy bootstrap-admin
```

Tài khoản quản trị phải được tạo bằng Supabase Dashboard hoặc một phiên CLI tin cậy. Function `bootstrap-admin` được chủ động vô hiệu hóa và luôn trả về HTTP 410.

Xem đầy đủ các bước kiểm tra trước production tại [SECURITY.md](./SECURITY.md).

## Build và triển khai frontend

Tạo bản build production:

```bash
npm run build
```

Nội dung tĩnh được sinh vào `out/`. Có thể triển khai thư mục này lên dịch vụ static hosting hoặc CDN. Hosting cần:

- Chuyển mọi route ứng dụng về `index.html` để React Router xử lý client-side routing.
- Áp dụng các HTTP header trong `public/_headers`, hoặc cấu hình tương đương trên proxy/CDN.
- Khai báo đúng `VITE_SITE_URL`, Supabase URL và anon key tại thời điểm build.
- Thêm domain production vào `ALLOWED_ORIGINS` của Edge Functions.

Nếu website được phục vụ dưới một đường dẫn con, đặt biến `BASE_PATH` khi build:

```bash
BASE_PATH=/duong-dan/ npm run build
```

## Quy ước nội dung và định tuyến

- Nội dung dịch nằm trong `src/i18n/local/vi` và `src/i18n/local/en`.
- Các route Việt Nam dùng tiền tố `/vi`; route tiếng Anh dùng `/en`.
- Route cũ không có tiền tố ngôn ngữ được chuyển hướng sang route tương ứng.
- Nội dung tin tức, dự án và sản phẩm ưu tiên dữ liệu từ Supabase; dữ liệu mock trong `src/mocks/` đóng vai trò nội dung tĩnh hoặc dự phòng tùy trang.

## Bảo mật

- Không commit `.env`, service-role key, secret hoặc thông tin đăng nhập.
- Không truy cập Supabase service-role key từ trình duyệt.
- Duy trì Row Level Security và kiểm tra quyền truy cập sau mỗi thay đổi migration.
- Đổi mật khẩu quản trị, thu hồi phiên cũ và bật MFA trước khi đưa hệ thống lên production.
- Tuân thủ checklist trong [SECURITY.md](./SECURITY.md).

## Giấy phép

Dự án là mã nguồn riêng của Phúc Thành Holding. Không sao chép, phân phối hoặc sử dụng lại khi chưa có sự cho phép của chủ sở hữu.
