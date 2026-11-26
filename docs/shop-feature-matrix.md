# Đối chiếu chức năng Phúc Thành AI Shop

Ngày: 09/10/2026. Bản phát triển, chưa triển khai công khai. Website công ty đang chạy trên Ubuntu chưa bị thay đổi. Domain thống nhất: shop.phucthanhholding.com.

## Bố cục từ ảnh

| Thành phần | Đã xây dựng | Khác biệt có chủ đích / giới hạn |
|---|---|---|
| Header, dropdown Tools, PtIQ, Viral Prompts, Pricing, Affiliate, Help | Có điều hướng, dropdown, dialog, menu mobile | Thương hiệu Phúc Thành; không sao chép FoziScribe |
| Hero trang chủ tím | Hai cột, tiêu đề, CTA, dashboard, dải lợi ích, nền tảng, thẻ tham gia, phân trang | Không dùng số người dùng/credits/thành tích của bên tham khảo |
| Hero PtIQ đỏ | Ô tìm chủ đề, sidebar, chỉ số, thẻ tham gia, phân trang | Chỉ số chưa đo hiển thị dấu —, không tạo score 72 hoặc 100 giả |
| Nhóm vấn đề, story, công cụ sáng tạo | Đủ nhóm bố cục | Story mở hướng dẫn từng bước; chưa có video thật của công ty |
| Banner PtIQ, bộ 13 công cụ | Có | Mỗi công cụ có trạng thái và workspace riêng |
| So sánh dữ liệu, 3 lộ trình, 6 bước workflow | Có | Phân biệt dữ liệu API và đề xuất nội dung |
| Chrome extension | Có mã và file ZIP prototype mở video hiện tại sang PtIQ | Chưa có overlay VPH hoặc bản Chrome Web Store |
| Gói Growth, 5 thẻ gói, tháng/năm | Có toggle và form đăng ký quan tâm | Không có giá/credits thương mại được duyệt, chưa bán hàng |
| FAQ, CTA cuối trang, footer, back-to-top | Có tương tác | FAQ/pháp lý phản ánh đúng tình trạng phát triển |
| Đăng ký, đăng nhập, đăng xuất | Có backend PostgreSQL, scrypt, cookie HttpOnly | Xác minh email và email reset chưa triển khai |
| Biểu mẫu liên hệ, Affiliate, quan tâm gói | Lưu database | Không tự gửi email, không tạo hoa hồng hoặc hợp đồng |
| Lịch sử, yêu thích, tìm công cụ | Lịch sử theo tài khoản; yêu thích tại trình duyệt | Không có cộng tác/team, billing hay dashboard quản trị yêu cầu |

## 27 công cụ

| Công cụ | Chức năng hiện có | Phần còn thiếu / phụ thuộc |
|---|---|---|
| Transcribe | Adapter Gemini nhận audio và xuất văn bản | Cần khóa/model và kiểm thử live; video và timecode chính xác chưa bảo đảm |
| Text to Speech | Adapter Gemini TTS, xuất WAV | Cần model hỗ trợ TTS; chưa kiểm thử live |
| Voice Design | Thử phong cách với giọng Gemini có sẵn | Chưa tạo/lưu voice persona tùy chỉnh |
| Sound Effects | Workspace và mô tả yêu cầu | Chưa có dịch vụ tạo SFX |
| Music | Workspace và mô tả yêu cầu | Chưa có dịch vụ tạo nhạc/thư viện có giấy phép |
| Viral Prompts | Gemini soạn prompt, lưu kết quả vào lịch sử | Chưa có marketplace, leaderboard hoặc credits cho submission |
| Voice Changer | Workspace nhận audio | Chưa có dịch vụ đổi giọng |
| Dubbing | Gemini dịch audio thành văn bản | Chưa tạo audio dịch hoặc đồng bộ video |
| Image & Video | Adapter Gemini tạo ảnh | Cần model ảnh; video/Veo chưa triển khai |
| Watermark Remover | Workspace nhận tài sản người dùng có quyền chỉnh sửa | Chưa có dịch vụ xử lý |
| Silence Remover | Cắt frame audio dưới ngưỡng RMS, xuất WAV | Tại trình duyệt; không phải phân tách giọng AI |
| Audio Enhancer | High-pass + chuẩn hóa peak, xuất WAV | Không khử nhiễu AI hoặc bảo đảm chất lượng studio |
| Merge Audio | Decode, ghép audio, xuất WAV mono 44.1 kHz | Đã kiểm tra ghép hai file 1 giây → 2 giây |
| Voice Isolator | Workspace nhận audio | Chưa có dịch vụ phân tách nguồn âm |
| Views per hour | Ghi các lần đo và tính delta views/time | Cần YouTube API, hai lần đo cách ít nhất 1 phút; là trung bình giữa lần đo |
| Keyword Research | YouTube search/list và thời điểm truy vấn | Không có search volume hoặc điểm cạnh tranh trực tiếp từ YouTube API |
| Topic research | Gemini đề xuất ý tưởng và kế hoạch | Không coi ý tưởng là xu hướng đã đo |
| Outliers | Đọc chỉ số 20 video gần đây từ playlist uploads | Chưa tính baseline theo tuổi video; không tạo điểm outlier |
| Trends | Video mostPopular theo quốc gia | Không phải dữ liệu Google Trends hoặc chuỗi biến động theo thời gian |
| Spy Video | Đọc thông tin/chỉ số công khai | Cần API; không có dữ liệu riêng tư, retention hoặc lịch sử sửa metadata |
| Spy Channel | Đọc thông tin/chỉ số công khai | Chưa có lịch sử tăng trưởng nhiều kỳ |
| Spy Competitors | Tra cứu kênh công khai | Chưa có watchlist nhiều kênh hoặc cảnh báo định kỳ |
| Launch New Channel | Gemini đề xuất định vị và nội dung | Không tự tạo kênh YouTube |
| YT Meta Generator | Gemini soạn metadata từ nội dung người dùng | Chưa tự xuất bản hoặc ghi metadata lên YouTube |
| Thumbnail Generator | Canvas tạo PNG 1280×720, ảnh nền tùy chọn | Đã kiểm tra tạo ảnh; chưa có Gemini trong công cụ này |
| Optimisation | Gemini góp ý nội dung người dùng cung cấp | Chưa audit kênh tự động, chưa có điểm SEO đã kiểm chứng |
| Your channel | Đọc dữ liệu công khai qua ID kênh | Chưa OAuth, chưa xác minh quyền sở hữu, chưa lưu profile kênh |

Các mục chưa triển khai có workspace để định nghĩa đầu vào và hiển thị trạng thái, không trả kết quả giả. **Chưa thể gọi toàn bộ 27 công cụ tương đương chức năng thương mại FoziScribe.**

## Kiểm thử đã thực hiện

- TypeScript shop: đạt.
- Build React và prerender hai landing pages: đạt.
- Backend 7/7 test: nguồn yêu cầu, mật khẩu, đăng ký, session, cách ly lịch sử, biểu mẫu, đăng xuất, thiếu provider.
- Trình duyệt: trang chủ, PtIQ, tìm kiếm → workspace, tạo thumbnail PNG, ghép hai audio xuất WAV 2 giây.
- Mobile 390 px: đã phát hiện và sửa tràn ngang thẻ công cụ; trang chủ sau sửa không tràn.
- Live Gemini/YouTube: chưa chạy vì khóa/model chưa cấu hình.
- Docker Ubuntu/public domain: chưa triển khai gói shop.

## Thứ tự hoàn thiện chạy thật

1. Cấu hình khóa/model tại Ubuntu; kiểm thử văn bản Gemini và dữ liệu YouTube bằng tài khoản thử nghiệm. Kiểm tra quota và chi phí trước bật cho nhiều người.
2. Kiểm thử TTS và ảnh với model được cấp quyền. Hoàn thiện luồng lưu kênh, watchlist, OAuth và phân tích nhiều lần đo.
3. Chọn dịch vụ bổ sung cho SFX, nhạc, đổi giọng, tách giọng, video và xử lý tài sản; đánh giá license/quyền sử dụng. Không giả định Gemini key đáp ứng mọi nhu cầu.
4. Bổ sung thư xác minh/reset, quản trị yêu cầu, chính sách hoàn chỉnh, lịch sử lỗi và quản trị quota.
5. Sau khi cổng thanh toán doanh nghiệp sẵn sàng: chốt giá/hạn mức, thanh toán, webhook, credit ledger và quyền sử dụng. Chưa kích hoạt bán hàng trong bản này.

Nguồn tham khảo giao diện: https://foziscribe.ai/ và https://foziscribe.ai/tool/foziq. Tài liệu API: https://ai.google.dev/api/generate-content và https://developers.google.com/youtube/v3/docs/ .
