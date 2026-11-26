# PtIQ — trạng thái API ngày 09/10/2026

- YouTube: Views per hour (hai lần đo cách ít nhất một phút), Keyword Research, Outliers (tỷ lệ/trung vị tối đa 20 video, chưa điều chỉnh tuổi), Trends, Spy Video, Spy Channel, Spy Competitors (tối đa 5 kênh), Your channel (lưu theo tài khoản) đã nối backend.
- Live đạt: tìm kiếm 12 video có thống kê, Trends VN 12 video, Outliers 20 video, so sánh 2 kênh; trình duyệt hiển thị kết quả thật của Google for Developers.
- Thumbnail Generator: chạy tại trình duyệt, xuất PNG 1280×720.
- Topic Research, Launch New Channel, YT Meta Generator, Optimisation: đã nối Gemini, Model đã chuyển sang gemini-3.6-flash theo chấp thuận của người dùng; Gemini 3.8 Flash trước đó trả 503. Đã kiểm thử live thành công cả Topic Research, Launch New Channel, YT Meta Generator và Optimisation; đều trả nội dung không rỗng từ Gemini 3.6 Flash.
- TypeScript/build đạt. 11/11 test backend đạt, gồm cách ly kênh đã lưu, OAuth, dữ liệu thống kê và baseline.
- Khóa cục bộ được loại khỏi Git và archive. Ubuntu chưa triển khai bản này. Production cần cấu hình GOOGLE_*, YOUTUBE_API_KEY, GEMINI_API_KEY, GEMINI_TEXT_MODEL cùng cờ ENABLE_YOUTUBE_REQUESTS/ENABLE_GEMINI_REQUESTS hoặc ENABLE_PROVIDER_REQUESTS.
