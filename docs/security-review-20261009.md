# Rà soát bảo mật ngày 09/10/2026

## Phạm vi và kết luận

Đã đọc backend công ty `server/`, backend shop `shop/server/`, frontend `src/` và `shop/src/`, cấu hình Compose/Nginx, schema, cấu hình đóng gói; kiểm tra dependency qua npm audit, các header HTTPS và một số GET API công khai. Không đăng nhập vào Ubuntu, không đọc log production hoặc kiểm tra hệ điều hành, firewall, image Docker đang chạy, Cloudflare account hay Google Console. Không sửa production trong lượt rà soát.

Chưa phát hiện bằng chứng xâm nhập trong phạm vi trên. Đây không phải chứng nhận hệ thống không bị xâm nhập hay kiểm thử xâm nhập toàn diện. Có các điểm cần gia cố sau.

## Phát hiện theo ưu tiên

| Ưu tiên | Phát hiện và bằng chứng | Tác động / xử lý |
|---|---|---|
| P1 | Cả Nginx công ty và shop đặt `X-Real-IP $remote_addr`; backend dùng giá trị này cho rate limit. Khi cloudflared kết nối origin, địa chỉ này thường là địa chỉ nội bộ/proxy, không phải người truy cập. | Người dùng có thể bị chung hạn mức, một người làm khóa đăng nhập/biểu mẫu của người khác. Xác minh IP từ log đã che dữ liệu, rồi cấu hình real-IP chỉ tin đường đi cloudflared đã xác minh; không tin tùy ý CF-Connecting-IP/X-Forwarded-For từ origin LAN hoặc Internet. |
| P1 | Shop chỉ giới hạn đăng nhập/đăng ký theo IP (`auth:`), chưa theo email. Đăng ký bằng mật khẩu chưa xác minh quyền sở hữu email; OAuth từ chối liên kết khi email đã tồn tại. | Tấn công phân tán thử mật khẩu; có thể đăng ký trước email người khác để cản đăng nhập Google. Chưa thấy đường chiếm phiên Google qua trường hợp này. Thêm giới hạn theo email và xác minh email; trước khi có xác minh có thể chỉ mở Google OAuth cho đăng ký mới. Không tự liên kết tài khoản chỉ dựa email. |
| P1 | Compose shop chưa đặt memory/CPU/PID limit. API đọc JSON tới 15 MB trước kiểm tra phiên/rate; FFmpeg giới hạn 2 job và 45 giây mỗi tiến trình nhưng chưa cách ly tài nguyên ở mức container. | Có thể làm cạn RAM/CPU bằng tải đồng thời hoặc file nén phức tạp. Bổ sung giới hạn container và request concurrency/body theo endpoint, kiểm tra phiên trước upload lớn, tách worker media nếu tải tăng. Không thực hiện thử tải phá hoại trên production. |
| P2 | HTML công ty `/en/` thực tế không có CSP, X-Frame-Options, nosniff hoặc Referrer-Policy. Nginx có add_header ở server nhưng location lại đặt add_header riêng làm mất kế thừa. | Thiếu phòng vệ trước framing và một số dạng injection/sniffing. Đặt bộ header nhất quán ở các location hoặc dùng snippet dùng chung, kiểm tra CSP không làm hỏng frontend. Shop HTML hiện có CSP frame-ancestors none, nosniff và Referrer-Policy. |
| P2 | Hai schema dùng tài khoản POSTGRES_USER khởi tạo để ứng dụng kết nối; với image Postgres chính thức đây là tài khoản quản trị khởi tạo. | Khi backend bị khai thác, quyền DB lớn hơn cần thiết. Tách tài khoản migration và tài khoản runtime quyền tối thiểu; xác minh vai trò đang chạy trước khi thay. |
| P2 | Root npm audit: 10 package bị báo, gồm 8 high và 2 moderate, không có critical; chủ yếu chuỗi build/lint/CSS. Có fix yêu cầu nâng major Tailwind. | Rủi ro của pipeline build, không đồng nghĩa 8 lỗ hổng từ xa trên backend production. Nâng có chọn lọc, kiểm tra build và giao diện; không chạy audit fix --force trực tiếp. Backend công ty và shop audit --omit=dev đều 0 cảnh báo ở thời điểm kiểm tra. |
| P2 | Shop chưa dọn `shop_rates` và không có thời hạn lưu history/measurements/interests; chỉ xóa session hết hạn định kỳ, OAuth state dọn khi bắt đầu OAuth. | Tích tụ dữ liệu cá nhân và dung lượng DB. Thiết lập retention minh bạch, cleanup rate/state hết hạn; không xóa lịch sử người dùng trước khi xác định chính sách. |
| P2 | Nginx shop thiếu header HSTS trên phản hồi đã kiểm tra; công ty cũng vậy. Compose shop không có logging rotation cho website/database. | Bổ sung HSTS sau xác minh HTTPS; không bật includeSubDomains/preload khi chưa kiểm chứng các subdomain. Bổ sung rotation và giám sát dung lượng. |
| P3 | CSP shop chỉ cho img-src self/blob/data, nên chặn thumbnail YouTube nếu UI dùng URL ngoài. | Lỗi tương thích, không phải lỗ hổng. Chỉ mở các hostname thumbnail thực sự cần, không mở wildcard toàn Internet. |

## Các bảo vệ đã xác nhận

- SQL đọc/ghi dùng tham số; tài nguyên công ty được allowlist.
- Mật khẩu scrypt có salt; token phiên ngẫu nhiên 32 byte, chỉ lưu digest ở DB, cookie HttpOnly/SameSite và Secure khi production.
- OAuth có state gắn cookie, PKCE, nonce, kiểm tra chữ ký JWT/issuer/audience/thời hạn/email_verified; không tự liên kết tài khoản mật khẩu cùng email.
- POST kiểm tra Origin và JSON; dữ liệu history/favorites/channel ràng buộc user_id.
- Media dùng execFile không shell, tên file do server tạo, cleanup thư mục tạm; upload có giới hạn số file/kích thước, không nhận URL tải media tùy ý. Protocol file được cho phép: vẫn cần cách ly worker và thư viện decoder; chưa chứng minh đọc file nội bộ qua file đầu vào.
- Compose không publish port Postgres/API; shop website bind loopback, API chạy user node. Giới hạn này cần kiểm chứng bằng cấu hình thực tế Ubuntu.
- Quét mẫu secret trên tệp Git: không có match. So khớp các key/password hiện tại với 23 tệp build HTML/assets công ty/shop: không có match. Không phải quét toàn bộ lịch sử Git hoặc mọi archive/backup.
- Không tìm thấy dangerouslySetInnerHTML/innerHTML/eval trong frontend hiện tại; localStorage chỉ thấy lựa chọn ngôn ngữ trong phạm vi tìm kiếm.

## Kiểm chứng đã chạy

- `node --test shop/server/test.mjs`: 12/12 pass, database thử nghiệm riêng.
- `npm test` trong server: 11/11 pass, database thử nghiệm riêng.
- GET public shop history/favorites: 401; session shop/công ty: user null khi không có cookie.
- Header HTTPS shop dashboard và công ty /en/ đọc trực tiếp ngày 09/10/2026.
- npm audit root và hai backend ngày 09/10/2026. Advisory có thể thay đổi sau thời điểm này; không bao gồm CVE image OS/FFmpeg/Nginx/Postgres.

## Chưa thể kết luận về Ubuntu

Cần bước read-only: trạng thái firewall và listening ports, Docker port/mount/security settings, quyền .env/backup, phiên SSH gần đây, log lỗi/tần suất bất thường, cron/systemd service, disk/memory, chính sách cập nhật/backup. Không in docker inspect Env, compose config đã nội suy hoặc nội dung .env ra chat. Chưa kiểm chứng MFA/quyền Cloudflare/Google, API restrictions, ngân sách quota, bản sao lưu phục hồi và khả năng truy cập trực tiếp origin từ WAN.

## Thứ tự triển khai đề xuất

1. Thu thập trạng thái Ubuntu chỉ đọc và xác minh đường đi IP.
2. Sửa rate limit đăng nhập, đăng ký email và giới hạn upload/tài nguyên; kiểm thử riêng trước khi đóng gói.
3. Sửa header Nginx, logging/cleanup; backup cấu hình, nginx -t với stdin /dev/null, rồi kiểm tra public.
4. Nâng dependency build có kiểm thử; tách quyền DB bằng kế hoạch migration và rollback rõ ràng.
