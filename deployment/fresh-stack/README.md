# Website với PostgreSQL riêng

Triển khai vào `/srv/phucthanhholding/fresh-stack`; chưa sử dụng Compose Next.js cũ tại `/srv/phucthanhholding/app`. Cloudflare Tunnel hiện tại giữ nguyên.

1. `sudo bash setup.sh`: tạo mật khẩu database trên máy chủ, build API, chạy trên `127.0.0.1:3004`, kiểm thử PostgreSQL thực trong schema tạm rồi xóa schema kiểm thử. Không tạo nội dung mẫu trong database chính.
2. `sudo bash create-admin.sh`: nhập mật khẩu ẩn trực tiếp, không lưu mật khẩu rõ; tài khoản mặc định phuclv@phucthanhholding.com. Không ghi đè tài khoản có sẵn.
3. SSH forward cổng 3004 rồi kiểm tra `/admin/dang-nhap`, quản trị nội dung và biểu mẫu. Cookie Secure dành cho HTTPS hoặc trình duyệt hỗ trợ localhost là secure context.
4. `sudo bash activate.sh`: sao lưu database/config, chuyển sang cổng 3000, giữ container bản trước đã dừng. Tự khôi phục khi kiểm tra HTTP thất bại. Kiểm tra công khai và đăng nhập lại sau chuyển đổi.
5. Vận hành bằng `sudo docker compose` trong thư mục này. Không chạy Compose cũ để khởi động website Next.js.

Database không publish cổng ra LAN. API chỉ truy cập trong mạng Compose. Cookie đăng nhập có HttpOnly, Secure và SameSite=Strict; mật khẩu băm scrypt, phiên tồn tại 8 giờ. POST yêu cầu Origin trong danh sách cho phép. Giới hạn gửi biểu mẫu 5 lần/giờ/IP; đăng nhập 10 lần/15 phút/email và 20 lần/15 phút/IP. Với Tunnel dùng chung IP, giới hạn IP có thể gộp nhiều khách truy cập; cần cấu hình trusted proxy riêng trước khi dùng IP khách do Cloudflare gửi.

Tin tức, sản phẩm, dự án, đơn hàng và liên hệ bắt đầu trống. Các trang giới thiệu tĩnh hiện có được giữ; không phải chứng cứ có khách hàng hay sản phẩm đã vận hành. Biểu mẫu lưu vào database, không gửi email tự động. Không có thanh toán hoặc chức năng tạo đơn hàng công khai trong phạm vi này.

Sao lưu: `sudo bash backup.sh`. Thư mục sao lưu chứa cấu hình bí mật và password hash, chỉ root được đọc. Khôi phục cần dừng API, nạp dump vào database sạch bằng pg_restore rồi khởi động lại; không khôi phục đè database hiện có nếu chưa sao lưu.

Sau khi kích hoạt, muốn quay lại bản trước: dừng service website trong Compose mới, chuyển `.env` về bind 3004, khởi động lại service website; sau đó bật restart unless-stopped và start container `phucthanhholding-website`. Database mới không bị xóa. Không chạy `docker compose down -v`.
