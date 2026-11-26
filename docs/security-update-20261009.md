# Bản cập nhật bảo mật 09/10/2026

## Thay đổi đã thực hiện trong mã nguồn

- Shop giới hạn đăng nhập/đăng ký theo cả IP và email đã chuẩn hóa: 12 lượt/IP/15 phút và 10 lượt/email/15 phút. Thư xác minh tối đa 3/email/giờ, tổng 100/giờ.
- Đăng ký mật khẩu lưu yêu cầu chờ xác minh, không chiếm email trong bảng tài khoản trước khi xác minh. Chỉ digest token lưu DB. Token 30 phút, dùng một lần, hoàn tất bằng POST sau khi người dùng bấm xác nhận; fragment không vào access log hay Referer.
- Google vẫn xác minh qua chữ ký ID token và email_verified. Không tự liên kết tài khoản mật khẩu đã tồn tại chỉ dựa email. Tài khoản mật khẩu cũ cần xác minh khi đăng nhập; phiên cũ của tài khoản chưa xác minh không được dùng API.
- SMTP Mailcow dùng 465/TLS hoặc 587/STARTTLS bắt buộc, kiểm tra chứng chỉ; không tắt xác minh TLS. Thiếu SMTP thì đăng ký email đóng an toàn, Google vẫn hoạt động. `smtp-check.mjs` chỉ kiểm tra TLS/auth, không gửi thư; gửi và nhận thư thực tế cần thử sau cấu hình.
- Header công ty được khai báo ở từng location để tránh lỗi kế thừa Nginx: nosniff, DENY, Referrer-Policy, Permissions-Policy, CSP. Giữ nguồn CSS/font hiện có và ảnh HTTPS để tránh làm hỏng nội dung; chưa thu hẹp mọi nguồn ảnh theo hostname.
- PostgreSQL tách `shop_runtime` và `website_runtime` khỏi tài khoản owner. Runtime không có SUPERUSER/CREATEDB/CREATEROLE/BYPASSRLS/CREATE schema; bảng cấp quyền theo nhu cầu, sequence chỉ USAGE. App không chạy migration lúc khởi động trong production.
- Shop `.env.runtime` bỏ mật khẩu owner khỏi container API. `.env` chính dùng cho DB/migration, giữ quyền 600 trên host. Company API chỉ nhận credential runtime qua Compose.
- Tạo admin công ty chuyển sang container quản trị ngắn hạn; API phục vụ web không giữ mật khẩu owner, không được INSERT admin_users.
- Dọn dữ liệu mỗi giờ: session/rate/OAuth/token hết hạn; history >90 ngày, measurement >30 ngày, interest >180 ngày. Không xóa tài khoản hoặc favorites. Theo lựa chọn trực tiếp của chủ dự án. Trước triển khai có pg_dump để phục hồi dữ liệu.
- Log shop website/API/database xoay 10 MB × 3 file mỗi container. Company đã có log rotation.
- Dependency build được nâng có chọn lọc, Tailwind chuyển 4.3.3 cùng plugin PostCSS và giữ cấu hình theme cũ. Yêu cầu browser hiện đại (Safari 16.4+, Chrome 111+, Firefox 128+ theo tài liệu Tailwind). Không dùng `npm audit fix --force`.

## Kiểm chứng

- Shop: 15/15 test (xác minh, replay/expiry, hạn mức email qua nhiều IP, SMTP thiếu, retention, OAuth, ownership).
- Company: 13/13 test bao gồm hai kiểm thử quyền runtime company/shop trên PostgreSQL engine PGlite.
- Build công ty và shop; TypeScript cả hai.
- npm audit root và dependency production hai backend: không có cảnh báo tại thời điểm kiểm tra.
- Kiểm tra browser bản build công ty sau nâng CSS, trang chủ và Company Verification. Preview tĩnh không nối API công ty; lỗi phần dữ liệu ở preview không phải kiểm chứng API production.
- Kiểm tra cú pháp bash/Node/Python. Chưa chạy Docker migration trên Ubuntu trong lượt sửa; script sẽ xác nhận runtime role thực tế trước khi dùng.

## Triển khai hiện hữu

Gói `deployment/security-hardening-20261009.tar.gz` không mang `.env`, khóa hoặc DB preview. Phạm vi cố định hai stack `/srv/phucthanhholding/ai-shop` và `/srv/phucthanhholding/fresh-stack`; giữ shop port 3001 và công ty port 3000. Không sửa Mailcow/Cloudflare hay xóa volume.

1. SCP gói lên `/home/phuclv/`, xác minh SHA256 rồi giải nén vào release mới.
2. Chạy `sudo bash <release>/install.sh`. Script sao lưu files, pg_dump cả hai DB, giữ image cũ, migration bằng owner trong container ngắn hạn, kiểm tra role runtime, rebuild và kiểm tra health. Mỗi Compose exec trong khối shell đều dùng stdin /dev/null.
3. Chạy `sudo python3 /srv/phucthanhholding/ai-shop/configure-smtp.py` để nhập hộp thư/mật khẩu Mailcow tại terminal, không gửi chat. Script tạo .env.runtime lọc owner secrets. Có backup .env trước đổi.
4. `sudo docker compose -f /srv/phucthanhholding/ai-shop/compose.yaml --env-file /srv/phucthanhholding/ai-shop/.env up -d --no-deps api` để nạp SMTP.
5. Chạy `smtp-check.mjs` trong API, rồi dùng hộp thư do bạn sở hữu để đăng ký, nhận thư, bấm xác nhận, đăng nhập và thử Google/YouTube/Gemini. Kiểm tra header HTTPS công ty và dữ liệu admin.

Rollback script trong backup phục hồi files và image, giữ dữ liệu database mới. Schema bổ sung và role runtime còn tồn tại nhưng code cũ dùng owner như trước. Không tự import dump vì có thể làm mất dữ liệu phát sinh sau backup. Khi cần khôi phục dữ liệu đã dọn, dùng dump có phạm vi và thời điểm rõ ràng; không thực hiện tự động.

## Ngoài các mục bạn chọn

Chưa sửa real-IP Cloudflare, giới hạn tài nguyên upload/FFmpeg, MFA/admin recovery, firewall/OS, pin image hay giám sát intrusion. Không coi bản này là hoàn tất mọi phát hiện trong báo cáo rà soát.

Nguồn kỹ thuật: https://nginx.org/en/docs/http/ngx_http_headers_module.html ; https://nodemailer.com/smtp ; https://tailwindcss.com/docs/upgrade-guide
