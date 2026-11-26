# TÀI LIỆU NGỮ CẢNH DỰ ÁN (CONTEXT.MD)
## CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ CÔNG NGHỆ PHÚC THÀNH HOLDING

> **Tên miền chính thức:** [https://phucthanhholding.com](https://phucthanhholding.com)  
> **Chủ quản:** Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding  
> **Mã số thuế:** 2500716846 | **Đại diện pháp luật:** Lê Văn Phúc  
> **Hộp thư định danh doanh nghiệp:** [info@phucthanhholding.com](mailto:info@phucthanhholding.com)  
> **Phiên bản kiến trúc:** 3.0 Enterprise (Apple Design Standard & ScrollCraft Engine)  
> **Ngày phê duyệt tài liệu:** Tháng 11/2026

---

## 1. BỐI CẢNH VÀ HIỆN TRẠNG DỰ ÁN (PROBLEM STATEMENT & RETROSPECTIVE)

### 1.1. Hiện trạng phiên bản cũ
- **Bố cục phân mảnh & rối:** Giao diện trước đây sử dụng nền tối đen nặng nề, độ tương phản kém (`contrast ratio < 3.2:1`), gây mỏi mắt cho người dùng doanh nghiệp và các đối tác tài chính cấp cao.
- **Liên kết điều hướng chưa hoàn thiện:** Các anchor link (`href="#"` hoặc liên kết gãy) phân tán rải rác, gây trải nghiệm cụt dòng thông tin khi đối tác muốn tra cứu hồ sơ pháp lý, danh mục hệ sinh thái và giải pháp công nghệ.
- **Trải nghiệm di động (Mobile UX) hạn chế:** Chưa tối ưu hóa cho màn hình cảm ứng điện thoại, font chữ hiển thị nhỏ trên thiết bị di động, menu điều hướng phức tạp, thiếu không gian thở (whitespace).
- **Hạ tầng phân mảnh:** Hệ thống cơ sở dữ liệu và mã nguồn chưa được đóng gói đồng bộ, chưa có cơ chế phê duyệt phiên bản nội dung (Content Versioning) và hệ thống kiểm soát truy cập phân quyền chặt chẽ (RBAC).

### 1.2. Mục tiêu tái cấu trúc toàn diện (The Strategic Goal)
Xây dựng lại website **Phúc Thành Holding** thành một **Landing Page thế hệ mới** tiêu chuẩn quốc tế:
1. **Thiết kế Mobile-First đỉnh cao:** Trực quan, sắc nét, lướt siêu mượt trên điện thoại thông minh (iPhone, Android) với các vùng chạm tối thiểu `48x48px`, ngăn ngừa tràn layout ngang (`overflow-x: hidden`).
2. **Phong cách Apple.com Enterprise:** Ngôn ngữ thẩm mỹ tối giản, sạch sẽ (Clean Light), độ hoàn thiện vi mô (Micro-interactions), bảng màu gốm sứ sang trọng kết hợp màu xanh lục bảo thương hiệu (`#046842`) và vàng hoàng gia (`#d97706`).
3. **Cá nhân hóa hiệu ứng theo kỹ năng Scroll Craft:** Áp dụng tư duy *“Cuộn trang là thước phim trải nghiệm (Scroll as Timeline)”*, phân tầng thị sai không gian 3 chiều (Dimensional Layering), bento grid thông minh, bộ đếm số liệu động học và spotlight cursor.
4. **Kiến trúc bảo mật cấp doanh nghiệp (Enterprise Zero-Trust):** Triển khai mô hình phòng thủ theo chiều sâu (Defense-in-Depth) với Cloudflare Zero Trust tunnel, HTTP Strict Headers (CSP, HSTS, X-Frame-Options), Rate Limiting và RBAC.
5. **Cơ sở dữ liệu đồng bộ (PostgreSQL 17):** Tích hợp sâu cơ sở dữ liệu tại `D:\UpWork` và máy chủ production Ubuntu (`192.168.1.238`), hỗ trợ kênh tiếp nhận liên hệ tức thì và hệ thống quản trị tin tức chuẩn SEO.

---

## 2. NGÔN NGỮ THIẾT KẾ ĐẲNG CẤP APPLE (APPLE DESIGN SYSTEM SPECIFICATIONS)

Lấy cảm hứng từ hệ thống thiết kế phần cứng và website danh tiếng của Apple (Apple Design Language):

```
+-----------------------------------------------------------------------------------+
|                           CANVAS: Ceramic White (#FBFBFD)                         |
|                                                                                   |
|  [ BRAND ACCENT: Imperial Emerald (#046842) ]  [ ACCENT 2: Royal Gold (#D97706) ]  |
|                                                                                   |
|   Typography Primary: Apple Slate (#1D1D1F) | Secondary: Neutral Slate (#4B5563)   |
|   Cards: Apple Translucent Glass (rgba(255,255,255,0.85) + backdrop-blur-xl)       |
|   Border System: Apple Hairline Ultra-Thin (rgba(0,0,0,0.06) / rgba(0,0,0,0.08))  |
+-----------------------------------------------------------------------------------+
```

### 2.1. Bảng mã màu chuẩn nhận diện (Color Tokens)
- **Nền tổng thể (Main Canvas):** `#FBFBFD` (Ceramic White / Trắng gốm Apple) – mang lại cảm giác tĩnh lặng, cao cấp, thanh lịch và tập trung tuyệt đối vào nội dung.
- **Nền phụ phân cấp (Sub Canvas):** `#F5F5F7` (Apple Light Grey) – sử dụng cho các khối Bento Grid, thanh trạng thái và vùng chân trang.
- **Văn bản chính (Heading & Body Text):** `#1D1D1F` (Apple Jet Slate) – độ tương phản hoàn hảo đạt chuẩn WCAG AAA (> 14:1) trên nền sáng.
- **Văn bản phụ (Muted / Metadata):** `#4B5563` và `#86868B` – phân cấp thông tin rõ ràng, tinh tế.
- **Màu sắc thương hiệu chính (Primary Brand Emerald):** `#046842` – đại diện cho sự phát triển bền vững, hệ sinh thái tài chính và công nghệ vững vàng của Phúc Thành Holding.
- **Màu điểm xuyết tài chính (Accent Gold):** `#D97706` / `#F59E0B` – biểu tượng của thịnh vượng, chứng thực pháp lý và giá trị gia tăng của doanh nghiệp.
- **Đường viền tinh tế (Hairline Border):** `rgba(0, 0, 0, 0.06)` đến `rgba(0, 0, 0, 0.08)` – tái lập đường viền vát cạnh chuẩn mực của các sản phẩm phần cứng Apple.

### 2.2. Hệ thống kiểu chữ (Typography)
- **Bộ font gia tộc:** SF Pro Display, SF Pro Text, Inter, hệ thống Sans-serif quốc tế chuẩn hóa cho tiếng Việt.
- **Tỷ lệ thị giác chuẩn:**
  - **Display Hero:** `clamp(2.5rem, 6vw, 4.5rem)` với `font-weight: 800`, `letter-spacing: -0.035em`, tạo độ căng thị giác quyền lực.
  - **Section Headings:** `clamp(1.8rem, 4vw, 2.75rem)` với `font-weight: 700`, `letter-spacing: -0.025em`.
  - **Bento Card Titles:** `1.25rem` đến `1.5rem` với `font-weight: 600`.
  - **Body Text:** `1rem` (16px) với `line-height: 1.6`, căn chỉnh ngắt dòng khoa học chống mỏi mắt.

---

## 3. CÁ NHÂN HÓA NGHỆ THUẬT CUỘN TRANG (SCROLL CRAFT SKILL INTEGRATION)

Dự án áp dụng triệt để bộ quy chuẩn kỹ nghệ từ skill **Scroll Craft** (`C:\Users\Administrator\.agents\skills\scroll-craft\SKILL.md`):

```
                        TRỤC KHÔNG GIAN THỊ SAI (DIMENSIONAL LAYERING)
 [Lớp 1: Ambient Backdrop]    Lưới đồ thị Vector + Khối màu động học Blur 120px
          |
 [Lớp 2: Subject Canvas]     Thẻ bài Bento Glassmorphism nghiêng 3D Perspective 1000px
          |
 [Lớp 3: Interactive Plane]  Hiệu ứng Spotlight bám dính con trỏ chuột (Mouse-Tracking)
          |
 [Lớp 4: Atmospheric HUD]    Thanh điều hướng nổi Dynamic Island (Blur 24px + Border Hairline)
```

### 3.1. Phân tầng thị sai không gian 3 chiều (Dimensional Layering)
Mỗi màn hình không phải là một mặt phẳng 2D phẳng lì mà được tổ chức thành 4 lớp không gian:
1. **Lớp sâu nhất (Ambient Plane):** Các vệt tán sắc ánh sáng (Light Blooms) xanh emerald (`#046842`/8%) và vàng gold (`#d97706`/6%) hòa tan vào nền gốm `#FBFBFD` tạo độ ấm thị giác.
2. **Lớp nội dung trọng tâm (Subject Canvas):** Các module bento card phản xạ ánh sáng môi trường, vát góc bo tròn mềm mại chuẩn Apple `rounded-3xl` (24px - 32px).
3. **Lớp tương tác vi mô (Interactive Plane):**
   - **Spotlight Cursor:** Ánh sáng rọi tâm di chuyển theo vị trí chuột `radial-gradient(400px circle at x y, rgba(4,104,66,0.06), transparent 80%)`.
   - **Tilt 3D:** Hiệu ứng nghiêng góc vật lý khi lia chuột, đem lại cảm xúc như chạm vào lớp kính Sapphire nguyên khối.
4. **Lớp không khí nổi (Atmospheric HUD):** Thanh điều hướng Navbar với hiệu ứng kính mờ `backdrop-blur-xl` kết hợp Mega Menu rủ xuống nhẹ nhàng kiểu Curtain Dropdown.

### 3.2. Cấu trúc ngữ pháp dòng cuộn (Scroll Grammar & Story Arc)
1. **Cảnh mở đầu (Hero Stage):** Huy hiệu nhận diện quốc tế, khẩu hiệu chiến lược song ngữ, nút điều hướng tác vụ nhanh (CTA Action Buttons) và thẻ số liệu thời gian thực (Live Ecosystem Counters).
2. **Cảnh giới thiệu cốt lõi (About & Mission):** Tuyên ngôn sứ mệnh với typography tương phản cao, triết lý đầu tư giá trị và phát triển công nghệ cao.
3. **Cảnh hệ sinh thái đa lĩnh vực (Ecosystem Matrix Bento):** Khối Bento 4 ô mô tả các trụ cột chiến lược:
   - *Đầu tư Bất động sản & Hạ tầng Khu công nghiệp*
   - *Phát triển Công nghệ, Trí tuệ Nhân tạo & Giải pháp Số hóa*
   - *Thương mại & Chuỗi cung ứng Xuất nhập khẩu Quốc tế*
   - *Năng lượng tái tạo & Tài chính Doanh nghiệp Bền vững*
4. **Cảnh chứng thực & năng lực (Performance & Milestones):** Bộ đếm số liệu động học tăng dần từ 0 lên giá trị đích khi lọt vào khung nhìn (Intersection Observer).
5. **Cảnh kiến trúc bảo mật & công nghệ (Enterprise Security Showcase):** Khối mô phỏng mô hình Zero-Trust, mã hóa TLS 1.3, đường truyền quang ngầm và chứng thực pháp chế.
6. **Cảnh hồ sơ dự án thực chiến (Proven Ventures):** Showcase các dự án trọng điểm, hình ảnh thực địa sắc nét, bộ lọc lĩnh vực nhạy bén.
7. **Cảnh pháp lý minh bạch (Legal Transparency):** Bảng tra cứu thông tin thuế, giấy phép kinh doanh, điều lệ công ty và cam kết tuân thủ.
8. **Cảnh tương tác chốt chặn (Contact & Investment Terminal):** Form liên hệ thiết kế như một Apple Terminal sang trọng, truyền tin an toàn về API PostgreSQL.

---

## 4. CHIẾN LƯỢC TRẢI NGHIỆM DI ĐỘNG (MOBILE-FIRST ART DIRECTION)

Website được xây dựng với cam kết mang lại trải nghiệm tối thượng trên điện thoại thông minh:

```
+---------------------------------------+
|  [Logo PT]                  [Menu ☰]  | <- Navbar kính mờ (Chiều cao chuẩn 64px)
+---------------------------------------+
|                                       |
|  CÔNG NGHỆ & ĐẦU TƯ                   | <- Typography co giãn tự động theo viewport
|  PHÚC THÀNH HOLDING                   |
|                                       |
|  [ Khám phá ngay ]  [ Liên hệ ]       | <- Touch Target >= 48px, bo góc 9999px
|                                       |
|  +---------------------------------+  |
|  | BENTO CARD: Bất Động Sản        |  | <- 1 cột liền mạch (Stack Column)
|  +---------------------------------+  |
|  | BENTO CARD: Công Nghệ AI        |  | <- Bo góc lớn, không gian thở rộng rãi
|  +---------------------------------+  |
|                                       |
|  +---------------------------------+  |
|  | ACCORDION MENU: Mở rộng chạm nhẹ|  | <- Thao tác một tay ngón cái tiện lợi
|  +---------------------------------+  |
+---------------------------------------+
```

### 4.1. Quy tắc giao diện chạm (Touch Ergonomics)
- **Khu vực bấm an toàn (Target Size):** Tất cả các nút bấm, liên kết và ô nhập liệu đều có chiều cao tối thiểu từ `48px` đến `54px`, hỗ trợ bấm ngón tay cái dễ dàng mà không bị chạm nhầm.
- **Loại bỏ hoàn toàn lỗi tràn khung (Zero Horizontal Scroll):** Áp dụng triệt để `max-w-full`, `overflow-x-hidden` trên toàn bộ container gốc.
- **Menu Accordion mượt mà:** Trên di động, hệ thống Mega Menu của máy tính được chuyển đổi tự động thành Accordion Drawer trượt mượt mà từ trên xuống, phân cấp thư mục rõ ràng.
- **Tốc độ phản hồi tức thì (Instant Feedback):** Áp dụng hiệu ứng `active:scale-95` khi chạm tay trên màn hình điện thoại, tạo phản hồi xúc giác như ứng dụng Native iOS.

---

## 5. KIẾN TRÚC KỸ THUẬT & AN TOÀN BẢO MẬT (ENTERPRISE SECURITY & INFRASTRUCTURE)

```
                            SƠ ĐỒ BẢO MẬT PHÒNG THỦ CHIỀU SÂU
 [Người dùng toàn cầu]
         │ (HTTPS / TLS 1.3 / HTTP/3)
         ▼
 [Cloudflare Edge Protection]
         │ ── Chống DDoS L3/L4/L7, WAF, Bot Fight Mode, SSL Termination
         │ ── Cloudflare Tunnel (Mã hóa đầu cuối không cần mở Port Router)
         ▼
 [Máy chủ Ubuntu Production: 192.168.1.238]
         │
         ├───► [Docker Container 1: Website Frontend (Port 3000)]
         │     ├── Next.js / Static Edge Serving
         │     ├── Header CSP (Content Security Policy) nghiêm ngặt
         │     └── Header HSTS, X-Content-Type-Options, X-Frame-Options
         │
         ├───► [Docker Container 2: Fresh API Core (Port 18083)]
         │     ├── REST API Endpoint Engine
         │     ├── Rate Limiting (Token Bucket ngăn ngừa spam)
         │     └── Role-Based Access Control (RBAC) & Audit Logs
         │
         └───► [Docker Container 3: PostgreSQL 17 Database]
               ├── Phân vùng lưu trữ bền vững (Docker Volumes)
               ├── Cơ chế mã hóa mật khẩu an toàn
               └── Đường ống tiếp nhận Contact & CMS nội dung
```

### 5.1. Mô hình không tin cậy (Zero-Trust Security Architecture)
- **Không mở cổng máy chủ trực tiếp:** Máy chủ nội bộ `192.168.1.238` không cần mở bất kỳ port nào ra ngoài Internet công cộng. Mọi lưu lượng truy cập từ domain `phucthanhholding.com` đều đi qua kết nối an toàn Cloudflare Tunnel (`cloudflared`).
- **Tiêu đề bảo mật HTTP (Security Headers):**
  ```http
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:;
  ```
- **Kiểm soát tốc độ yêu cầu (Rate Limiting):** Bảng `rate_limits` trong cơ sở dữ liệu lưu trữ vết IP của các yêu cầu gửi form, tự động phong tỏa các chuỗi request bất thường chống Spam và Brute-force.

### 5.2. Cấu trúc cơ sở dữ liệu sản xuất (PostgreSQL 17 Database Schema)
Cơ sở dữ liệu được rà soát và đồng bộ từ `D:\UpWork` sang cụm PostgreSQL 17 trên server Ubuntu:

| Bảng dữ liệu | Mục đích và chức năng |
| :--- | :--- |
| `contact_submissions` | Tiếp nhận và mã hóa thông tin liên hệ, nhu cầu hợp tác đầu tư từ khách hàng. |
| `records` | Quản lý bản ghi nghiệp vụ, hồ sơ năng lực với trường cờ kiểm duyệt `public_visible`. |
| `content_items` | Lưu trữ cấu trúc trang, các mục menu, danh mục dự án trong hệ sinh thái. |
| `content_versions` | Cơ chế lưu vết lịch sử chỉnh sửa (Draft/Approved/Published), cho phép rollback tức thì. |
| `approval_requests` | Quy trình phê duyệt bài đăng và thay đổi thông số tài chính nhiều bước. |
| `admin_users` | Danh sách người dùng quản trị với phân quyền chi tiết (RBAC). |
| `admin_sessions` | Quản lý phiên làm việc đã xác thực, tự động thu hồi khi hết hạn. |
| `admin_audit_log` | Ghi vết toàn bộ hành vi hệ thống (IP, Timestamp, User-Agent, Hành động). |

---

## 6. HỆ THỐNG ĐIỀU HƯỚNG & TIỆN ÍCH ĐẲNG CẤP (APPLE MEGA MENU & SEARCH)

### 6.1. Mega Menu đa tầng phong cách Apple
Thanh điều hướng được xây dựng tại `src/components/feature/Navbar.tsx`:
- **Giao diện thả màn (Curtain Dropdown):** Khi rê chuột vào các danh mục *"Hệ sinh thái"*, *"Về chúng tôi"*, *"Năng lực"* hoặc *"Quan hệ Cổ đông"*, một bảng điều khiển mờ `backdrop-blur-2xl` rủ xuống êm ái với thời gian phản hồi `250ms`, tích hợp cầu nối chuột (hover bridge) chống trượt chuột mất menu.
- **Cấu trúc trình bày:** Bên trái là các chuyên mục nghiệp vụ chi tiết kèm biểu tượng tinh gọn; bên phải là khung nổi bật (Featured Spotlight) giới thiệu thương vụ trọng tâm và báo cáo tăng trưởng mới nhất.

### 6.2. Hộp tìm kiếm thông minh phím tắt Apple Command (`⌘K` / `Ctrl+K`)
Xây dựng độc quyền tại `src/components/feature/AppleSearchModal.tsx`:
- Kích hoạt bằng tổ hợp phím tắt tiêu chuẩn toàn cầu `Cmd + K` (trên Mac) hoặc `Ctrl + K` (trên Windows), hoặc bấm vào biểu tượng kính lúp trên thanh điều hướng.
- Tìm kiếm tức thì theo từ khóa theo thời gian thực (Real-time Filtering) trên toàn bộ hệ thống trang: Bất động sản, Trí tuệ nhân tạo, Năng lượng, Pháp lý, Báo cáo tài chính, Kênh liên hệ ban điều hành.

---

## 7. QUY TRÌNH TRIỂN KHAI VÀ VẬN HÀNH (DEPLOYMENT & OPS PLAYBOOK)

### 7.1. Định vị môi trường
- **Mã nguồn phát triển (Windows Host):** `d:\phucthanhholding`
- **Kho lưu trữ cơ sở dữ liệu UpWork:** `D:\UpWork\phucthanh-website`
- **Kho lưu trữ GitHub chính thức:** `https://github.com/phucicb-hub/phuc-thanh-holding-website.git` (Nhánh `main`)
- **Máy chủ sản xuất (Ubuntu Server):** `phuclv@192.168.1.238`
- **Thư mục phục vụ trực tiếp trên Server:** `/srv/phucthanhholding/fresh-stack/html/`

### 7.2. Lệnh biên dịch và kiểm tra
```bash
# 1. Kiểm tra mã nguồn và biên dịch tĩnh tối ưu
npm run build

# 2. Đồng bộ tệp tĩnh lên máy chủ sản xuất
rsync -avz --delete dist/ phuclv@192.168.1.238:/srv/phucthanhholding/fresh-stack/html/

# 3. Khởi động lại dịch vụ nếu cần
ssh phuclv@192.168.1.238 "docker restart phucthanhholding-fresh-website-1"
```

### 7.3. Quy trình khôi phục sự cố (Rollback Strategy)
Mỗi bản build trên máy chủ được quản lý phiên bản qua Git commit SHA và thư mục sao lưu định kỳ `/srv/phucthanhholding/backups/`. Trong trường hợp cần khôi phục khẩn cấp:
1. Đảo ngược commit trên nhánh `main`: `git revert HEAD`
2. Đẩy lên máy chủ và kích hoạt kịch bản khôi phục Docker stack tự động.

---

## 8. KẾT LUẬN VÀ ĐỊNH HƯỚNG TƯƠNG LAI

Tài liệu này xác lập tiêu chuẩn kỹ thuật và nghệ thuật trải nghiệm xuyên suốt cho toàn bộ sự hiện diện số của **Phúc Thành Holding**. Mọi tính năng bổ sung, bài đăng blog, cập nhật giao diện trong tương lai bắt buộc phải tuân thủ nghiêm ngặt các nguyên tắc:
1. **Giữ vững tính thanh lịch và không gian thở của phong cách Apple Clean Light.**
2. **Không làm suy giảm trải nghiệm vuốt chạm mượt mà trên thiết bị di động.**
3. **Mọi hiệu ứng thị giác đều phải tuân theo triết lý Scroll Craft có ý nghĩa ngữ nghĩa, không lạm dụng chuyển động rác.**
4. **Bảo toàn tính toàn vẹn dữ liệu, kiểm soát nghiêm ngặt mã độc và phân quyền truy cập thông qua mô hình Zero-Trust.**
