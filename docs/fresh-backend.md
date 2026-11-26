# Backend mới — PostgreSQL tại Ubuntu

Yêu cầu ngày 09/10/2026: xây mới, không giữ dữ liệu Supabase. Chưa triển khai lên Ubuntu ở thời điểm đóng gói.

Đã chuyển mã frontend sang API cùng tên miền: `/api/content/*`, `/api/auth/*`, `/api/admin`, `/api/contact`. Không còn sử dụng Supabase SDK. Các trang quản trị tin tức, dự án, sản phẩm vẫn hoạt động qua API mới; bổ sung `/admin/lien-he` để xem biểu mẫu đã lưu. Các danh sách database bắt đầu trống.

Backend Node.js + PostgreSQL. Dữ liệu nội dung Việt/Anh lưu JSONB, có kiểm tra tên bảng, trường và kiểu dữ liệu; truy vấn SQL dùng tham số. Tài khoản admin tạo bằng CLI qua stdin, mật khẩu băm scrypt. Cookie phiên HttpOnly/Secure/SameSite=Strict, thời hạn 8 giờ, đăng xuất thu hồi trong database. Các thao tác ghi yêu cầu Origin cho phép. Biểu mẫu có kiểm tra đồng ý, honeypot và giới hạn gửi. Lịch sử thao tác nội dung được lưu trong cùng transaction.

Kiểm thử local: 10 tình huống tích hợp HTTP trên engine PostgreSQL PGlite; Node test báo 11 tests tính cả test cha. Bao gồm database trống, auth, phân quyền, dữ liệu Việt/Anh, CRUD, slug trùng, audit, lưu biểu mẫu, throttling, đăng xuất. Không tạo dữ liệu mẫu trên database chính. Kiểm thử PostgreSQL thực được tích hợp vào `setup.sh` để chạy trên Ubuntu trong schema tạm và tự xóa sau kiểm thử.

TypeScript và ESLint được kiểm tra. Kiểm tra npm audit dependency frontend chạy production không có cảnh báo tại thời điểm kiểm tra; dependency dev có cảnh báo chưa xử lý trong phạm vi chuyển backend.

Database, API và website chạy trong Compose riêng: `/srv/phucthanhholding/fresh-stack`. Chạy thử localhost:3004, chuyển sang 192.168.1.238:3000 sau khi kiểm tra. Compose cũ trong `/srv/phucthanhholding/app` và Tunnel hiện tại không được thay đổi trong gói này. Không sử dụng database WordPress hoặc Mailcow.

Giới hạn: chưa kiểm thử Docker/PostgreSQL thực hoặc GUI sau triển khai Ubuntu; chưa có tài khoản admin production trước khi chạy create-admin.sh. Biểu mẫu chỉ lưu database, chưa gửi email. Đơn hàng mới bắt đầu trống, chưa có checkout hoặc tích hợp thanh toán. Chưa nhập nội dung kinh doanh; các trang giới thiệu tĩnh có sẵn vẫn giữ nguyên và không chứng minh sản phẩm đã vận hành.
