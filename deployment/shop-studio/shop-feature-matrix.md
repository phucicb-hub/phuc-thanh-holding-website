# Phúc Thành AI Shop — backend Ubuntu

Bản này dùng React + Node.js + PostgreSQL + FFmpeg. Tất cả xử lý audio/thumbnail đã chuyển sang backend. Website công ty và database cũ không bị thay đổi. Shop chạy Compose riêng tên phucthanh-ai-shop, cổng 127.0.0.1:3015.

## Chức năng

- Backend: Google OAuth, đăng ký/mật khẩu, session, đăng xuất, yêu thích, lịch sử, biểu mẫu, kênh cá nhân.
- YouTube: 8 công cụ PtIQ dùng dữ liệu công khai; keyword không trả lượng tìm kiếm/competition; Outliers so sánh với trung vị tối đa 20 video, chưa điều chỉnh tuổi; VPH cần hai lần đo cách ít nhất một phút.
- Gemini 3.6 Flash: Viral Prompts, Topic Research, Launch New Channel, YT Meta Generator, Optimisation. Adapter chép/dịch audio đã nối nhưng chưa kiểm thử live audio.
- FFmpeg backend: ghép audio, cắt khoảng lặng, cân bằng âm lượng và thumbnail PNG 1280×720. Tổng upload 10 MB, tối đa 6 file, audio mono 44.1 kHz, đầu vào và đầu ra tối đa 10 phút. Hai yêu cầu media đồng thời. File tạm được xóa sau xử lý; không lưu file gốc.
- TTS/Voice Design và tạo ảnh: cần model tương ứng, chưa cấu hình/kiểm thử live. Voice Design chỉ dùng giọng có sẵn, không tạo giọng tùy chỉnh. Dubbing hiện chỉ dịch ra văn bản; chưa đồng bộ giọng/video.
- SFX, nhạc, đổi giọng, tách giọng, watermark và tạo video chưa có dịch vụ; không trả kết quả giả. Thanh toán chưa bật.

## Windows preview

Từ D:\phucthanhholding, chạy npm run shop:dev. Backend chạy node shop/server/index.mjs với SHOP_PREVIEW=true, COOKIE_SECURE=false, ALLOWED_ORIGINS=http://127.0.0.1:3010,http://localhost:3010. Máy cần FFmpeg trong PATH; có thể đặt FFMPEG_PATH và FFMPEG_FONT.

Các tệp riêng trong shop/: google-oauth.local.json, youtube-api.local.txt, gemini-api.local.txt, gemini-model.local.txt. Backend tự đọc; chúng không nằm trong Git/HTML/archive. Model đã xác nhận là gemini-3.6-flash. Không gửi secret vào chat.

## Ubuntu

1. Giải nén gói vào thư mục mới /srv/phucthanhholding/ai-shop sau khi xác nhận chưa tồn tại. Chưa chạy lệnh xóa hoặc ghi đè stack khác.
2. Chạy bash configure.sh. Nhập các khóa từ terminal. Mật khẩu PostgreSQL được sinh ngẫu nhiên. .env chmod 600; file cũ được sao lưu khi cấu hình lại.
3. .env dùng GEMINI_TEXT_MODEL=gemini-3.6-flash. Đặt ENABLE_YOUTUBE_REQUESTS=true và ENABLE_GEMINI_REQUESTS=true để bật hai dịch vụ, giữ ENABLE_PROVIDER_REQUESTS=false nếu chưa cấu hình TTS/ảnh.
4. Google OAuth phải có GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET và GOOGLE_REDIRECT_URI=https://shop.phucthanhholding.com/api/shop/google/callback. URI này phải đăng ký trong Google Cloud. Test bằng Chrome/Edge thông thường; Google có thể chặn browser nhúng.
5. docker compose config --quiet rồi docker compose up -d --build. Dockerfile cài FFmpeg và font tiếng Việt, API chạy user node, database không mở cổng ra ngoài.
6. curl --fail http://127.0.0.1:3015/api/shop/health và curl --fail http://127.0.0.1:3015/api/shop/tools. Muốn thử HTTP nội bộ trước khi có HTTPS, cấu hình ALLOWED_ORIGINS/GOOGLE_REDIRECT_URI/COOKIE_SECURE tương ứng và dùng SSH tunnel; sau đó trả về cấu hình HTTPS production.
7. Chưa thay đổi Cloudflare/DNS. Mở public chỉ sau khi kiểm tra origin, Google login và quyền API. Giữ quota nhà cung cấp phù hợp ngân sách; giới hạn ứng dụng là lượt gọi, không phải trần tiền.

Cập nhật: sao lưu thư mục và pg_dump database shop trước khi build, giữ image cũ để quay lại. Không docker compose down -v. Schema tự thêm bảng/cột, giữ nguyên dữ liệu; quay lại code cũ có thể cần giữ schema tương thích. Gói không mang database preview hay khóa.

## Kiểm chứng

TypeScript/build đạt; 12/12 test backend đạt. Kiểm thử FFmpeg thực tế tạo WAV từ hai file tổng hợp, cắt khoảng lặng, xử lý âm lượng và thumbnail tiếng Việt. YouTube đã truy vấn live keyword/trends/outliers/so sánh kênh và hiển thị kết quả qua browser. Bốn công cụ text PtIQ đã trả nội dung live bằng Gemini 3.6 Flash. Docker trên Ubuntu chưa được chạy trong lượt này.

Chưa triển khai email verification/reset, bảng quản trị, billing/credits và OAuth YouTube Analytics. Google login chỉ yêu cầu openid/email/profile, không tự cấp quyền quản lý kênh. API /tools là nguồn trạng thái thống nhất cho đủ 27 công cụ.
