Bản cập nhật 2026-10-11
Thông báo đăng ký đã xác minh tới info và phuclv; kiểm tra hàng đợi mỗi 60 giây, tối đa 20 tài khoản mỗi lượt. Lỗi SMTP được thử lại; có thể gửi lặp nếu SMTP nhận thư nhưng database chưa ghi nhận thành công.
Checkbox nhận tin tùy chọn, mặc định tắt cho tài khoản mới/cũ. Nội dung, thời điểm và nguồn được lưu. Google và email đều hỗ trợ.
/dashboard?view=users chỉ dành tài khoản đã xác minh info@phucthanhholding.com hoặc info@phucthanhholding.com. Các tài khoản này cần đăng ký/đăng nhập shop theo cách thông thường; không tự tạo tài khoản/mật khẩu.
/dashboard?view=email-preferences cho phép người dùng hủy hoặc đồng ý nhận tin.
CSV chỉ xuất người đang đồng ý và đã xác minh, giới hạn 10.000; cần xuất lại trước chiến dịch để loại người đã hủy. Chưa triển khai hệ thống gửi chiến dịch hoặc liên kết hủy một lần từ email tiếp thị.
Cài bổ sung cột tương thích dữ liệu cũ; giữ SMTP email.mjs, .env, .env.runtime, Compose và dữ liệu. Sao lưu mã nguồn, html, database và giữ ảnh Docker trước cập nhật.
Khôi phục mã nguồn/ảnh; không tự phục hồi database vì có thể mất dữ liệu mới. Các cột bổ sung được giữ nguyên.
Kiểm thử bằng PGlite và SMTP giả lập; phải kiểm tra nhận thư thật sau triển khai.
