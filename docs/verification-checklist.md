# Công việc xác minh và hồ sơ nộp lại

Cập nhật: 09/10/2026. Phạm vi: D:\phucthanhholding. Tích chọn chỉ phản ánh phạm vi được ghi rõ, không đồng nghĩa đã xuất bản lên Internet.

## P0 — Thông tin pháp lý và liên hệ

- [x] Đối chiếu tên Việt/Anh, mã số, ngày cấp, người đại diện, địa chỉ và ngành chính với nguồn Thư Viện Pháp Luật do chủ doanh nghiệp cung cấp.
- [ ] Đối chiếu bản giấy đăng ký doanh nghiệp; chưa nhận bản giấy. Không coi dữ liệu tra cứu là chứng nhận bản gốc.
- [x] Thống nhất email chính trong mã nguồn: info@phucthanhholding.com. Email chung: info@phucthanhholding.com. Chủ doanh nghiệp xác nhận cả hai nhận được thư; chưa kiểm thử gửi/nhận độc lập.
- [x] Kiểm tra các thông tin pháp lý Việt/Anh trong mã nguồn: ngày 04/04/2024, mã số 2500716846, đại diện LÊ VĂN PHÚC, địa chỉ Phường Vĩnh Phúc, Tỉnh Phú Thọ.
- [ ] Đồng bộ bản công khai và kiểm tra bên ngoài sau triển khai. Trang /en hiện khác mã nguồn: địa chỉ Khai Quang, 20+ dự án/công ty thành viên, 500+ nhân viên, bốn lĩnh vực chiến lược.

## P1 — Tuyên bố và tài liệu xác minh

- [x] Tạm ngừng hiển thị danh sách đối tác Viettel Solutions, FPT Software, VNPT IT, Microsoft Vietnam, AWS Vietnam, CMC Corporation trong dữ liệu trang chủ vì chưa có chứng cứ. Có thể phục hồi từ Git khi có tài liệu.
- [x] Sửa câu giới thiệu dự án “đã triển khai thành công” thành định hướng dự án trong cả hai ngôn ngữ.
- [ ] Rà soát từng bài viết/dự án/sản phẩm trong Supabase: nội dung được tải từ cơ sở dữ liệu, không nằm trong mã nguồn. Cần bằng chứng cho tên khách hàng, ngày ra mắt, số liệu, kết quả và trạng thái triển khai trước khi giữ các khẳng định đó.
- [ ] Gỡ hoặc chứng minh số liệu 20+/500+ trên bản công khai; chưa xác định môi trường phục vụ bản công khai.
- [x] Tạo trang Company Verification Việt/Anh, thông tin nguồn và tình trạng tài liệu rõ ràng.
- [ ] Bổ sung bản đăng ký đã che dữ liệu nhạy cảm nếu cần; không công bố giấy tờ cá nhân hoặc chữ ký không cần thiết.

## P2 — Sản phẩm và hồ sơ

- [x] Tạo trang AI Product / Claude Use Case Việt/Anh. Dữ kiện được xác nhận: shop.phucthanhholding.com đang xây dựng.
- [x] Xác nhận kế hoạch tích hợp Claude API vào shop, chưa thực hiện; phản ánh đúng trong trang sản phẩm và bản nháp hồ sơ.
- [ ] Xác định chức năng Claude cụ thể, người dùng mục tiêu, demo và chính sách xử lý dữ liệu. Không suy diễn shop đang xây dựng thành sản phẩm AI đã vận hành.
- [x] Chuẩn bị bản nháp hồ sơ nộp lại với cùng tên pháp lý, mã số, tên miền, email và tình trạng sản phẩm.
- [ ] Hoàn thiện phần Claude, đính kèm bằng chứng, kiểm tra các URL công khai rồi mới nộp lại.

## Nguồn

- https://thuvienphapluat.vn/ma-so-thue/cong-ty-co-phan-dau-tu-va-cong-nghe-phuc-thanh-holding-mst-2500716846.html
- https://phucthanhholding.com/en — bản công khai kiểm tra ngày 09/10/2026.
- https://phucthanhholding.com/en/about/overview — nguồn công khai đối chiếu; nội dung công cụ tìm kiếm có thể là bản đã lưu.
- Xác nhận trực tiếp của chủ doanh nghiệp trong chat ngày 09/10/2026: hai email nhận được thư; shop đang xây dựng.

## Khôi phục và triển khai

Kiểm tra kỹ thuật: TypeScript, ESLint và build Vite thành công. Build có cảnh báo kích thước bundle lớn hơn 500 kB; chưa thực hiện tối ưu vì ngoài phạm vi chỉnh thông tin. Chưa kiểm tra giao diện bằng trình duyệt hoặc khả năng truy cập các trang mới từ Internet.

Các thay đổi mã nguồn có thể xem và phục hồi từng phần bằng Git. Chưa sửa dữ liệu Supabase, DNS, dịch vụ hay môi trường triển khai. Tệp ZIP cũ là gói lưu trữ trước thay đổi, không dùng để triển khai bản mới. Bản build kiểm tra nằm trong thư mục riêng để giữ nguyên out hiện tại.
