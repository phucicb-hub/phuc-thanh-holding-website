Gói gộp 2026-10-11
- Yêu cầu đăng ký/đăng nhập trước khi vào dashboard và công cụ.
- Backend bắt buộc phiên của tài khoản đã xác minh; khách gọi run nhận 401.
- Xác minh email: thông báo thành công rõ ràng, lỗi và nút đăng nhập.
- Giữ nguyên email.mjs đã sửa SMTP, .env, .env.runtime, Compose và database.
- Sao lưu html và server/app.mjs trước khi cài; tự khôi phục nếu kiểm tra triển khai lỗi.
- DNS SPF DKIM DMARC đã sửa trực tiếp, không nằm trong gói này; PTR và kiểm thử thư thật còn chờ.
