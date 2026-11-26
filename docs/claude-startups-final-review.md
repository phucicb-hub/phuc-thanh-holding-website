# Rà soát cuối hồ sơ Claude Startups

Ngày rà soát: 09/10/2026. Chưa gửi email hoặc nộp hồ sơ. Báo cáo này không bảo đảm được duyệt.

## Kết luận

Định vị phù hợp: doanh nghiệp Việt Nam có ngành chính xuất bản phần mềm, đang xây dựng cửa hàng trực tuyến và dự kiến tích hợp trợ lý Claude API dựa trên danh mục/chính sách. Không gọi trợ lý là MVP đang hoạt động khi chưa triển khai API. Mục tiêu nộp lại là làm rõ pháp nhân và dự án thực tế, không tuyên bố quyền lợi được bảo đảm.

Trang chương trình hiện thông báo đã vượt khả năng cung cấp ưu đãi một năm Claude Team và $1.000 API credits, đang điều chỉnh chương trình và sẽ rà soát lại hồ sơ. Vì vậy, thông tin ưu đãi trong kế hoạch dựa trên thông báo 06/10 không đủ để khẳng định quyền lợi còn được cấp tại lúc nộp. Xem điều kiện thực tế trong Console. Không coi ưu đãi đối tác là tiền mặt hoặc ngân sách được cấp cho công ty.

Nguồn hiện hành: https://claude.com/programs/startups

## Đối chiếu

| Hạng mục | Dữ kiện và tình trạng | Việc còn lại |
|---|---|---|
| Pháp nhân | Nguồn công khai khớp tên quốc tế, MST 2500716846, ngày cấp 04/04/2024, đại diện LÊ VĂN PHÚC, ngành 5820 | Đối chiếu giấy đăng ký gốc; ngày cấp chưa thay thế chứng cứ về đăng ký lần đầu |
| Tuổi doanh nghiệp | Ngày 04/04/2024 nằm trong cửa sổ 5 năm nêu ở email từ chối | Chỉ đáp ứng yếu tố thời gian theo nguồn hiện có; chưa xác nhận mọi điều kiện startup |
| Website xác minh | /en/, /en/company-verification/, /en/ai-products/ trả HTTP 200; HTML thô có thông tin pháp lý hoặc trạng thái API chưa triển khai | Giữ thông tin nhất quán trong form; cung cấp giấy đăng ký khi được yêu cầu |
| Email | info@phucthanhholding.com là email hồ sơ; info@phucthanhholding.com là email chung. Chủ doanh nghiệp xác nhận cả hai nhận thư | Dùng cùng email trong Console và phản hồi |
| Database | API health trả {"ok":true}; API sản phẩm trả HTTP 200 với [] | Danh mục trống không phải lỗi tải dữ liệu; chưa có sản phẩm thật được công bố trong database mới |
| Mô tả sản phẩm | Shop đang xây dựng; trợ lý giải đáp theo danh mục và chính sách là kế hoạch | Chuẩn bị danh mục/chính sách thật và demo khi đã triển khai; không tạo dữ liệu giả |
| Claude Team | Nhu cầu sử dụng nội bộ khác quyền lợi API | Chưa xác minh lịch sử sử dụng Team và điều kiện ưu đãi của tổ chức |
| Lý do từ chối | Email chỉ nêu các nguyên nhân thường gặp | Không khẳng định lỗi domain hoặc website cũ là nguyên nhân đã xác nhận |

Thông tin 13 sản phẩm và lỗi “Unable to load data” trong kế hoạch không nên tiếp tục dùng làm đánh giá hiện tại. Database mới trả danh sách rỗng. Kiểm tra API này chưa thay thế kiểm tra giao diện sản phẩm trên trình duyệt. Các trang mô tả giải pháp tĩnh còn tồn tại không phải chứng cứ sản phẩm đã phát hành.

Nguồn pháp nhân: https://thuvienphapluat.vn/ma-so-thue/cong-ty-co-phan-dau-tu-va-cong-nghe-phuc-thanh-holding-mst-2500716846.html

## Cấu trúc trang thực tế

| Đường dẫn đề xuất | Tình trạng trong mã nguồn |
|---|---|
| /en | Có; đã kiểm tra công khai |
| /en/about | Chưa có route này; route hiện tại là /en/about/overview |
| /en/ai-products | Có; đã kiểm tra công khai |
| /en/technology | Chưa có route riêng; workflow Claude dự kiến nằm ở trang AI Products |
| /en/company-verification | Có; đã kiểm tra công khai |
| /en/contact | Có route |

Không có bằng chứng chương trình bắt buộc đủ sáu trang theo cấu trúc đề xuất. Không dùng HTTP 200 đơn lẻ để xác nhận route tồn tại vì website có SPA fallback.

## Kế hoạch theo ưu tiên

1. Đối chiếu bản giấy đăng ký: tên Anh, mã số, người đại diện, ngày đăng ký lần đầu và địa chỉ hiện hành. Nếu giấy dùng địa chỉ trước sáp nhập, giải thích khác biệt bằng tài liệu phù hợp, không sửa tùy ý.
2. Dùng hồ sơ thống nhất: tên pháp lý đầy đủ; https://phucthanhholding.com; info@phucthanhholding.com; ngày 2024-04-04 sau khi xác nhận giấy gốc. Kiểm tra tên miền cũ phucthanhhoding.com có thực sự được nhập hay chỉ là lỗi gõ trong chat.
3. Nộp mô tả một dự án: shop đang phát triển, Claude API chưa tích hợp, chức năng dự kiến trả lời dựa trên danh mục/chính sách và chuyển tiếp cho người phụ trách. Không khai có MVP AI, doanh thu, khách hàng hoặc funding khi chưa có bằng chứng.
4. Nếu Console cho phép nộp lại, rà soát điều kiện và quyền lợi đang hiển thị rồi nộp một hồ sơ nhất quán. Nếu không cho nộp lại, dùng kênh hỗ trợ chính thức hoặc trả lời email nếu Reply-To nhận phản hồi. Không mặc định địa chỉ gửi thư được giám sát.
5. Gửi bản phản hồi trong claude-startups-reconsideration-email.md từ email công ty, kèm giấy đăng ký đã che dữ liệu không cần thiết nếu có. Bản nháp hiện không tuyên bố đã đính kèm giấy.
6. Bổ sung demo thực tế khi đã xây dựng: danh mục/chính sách thật, câu hỏi và nguồn trả lời, xử lý câu hỏi ngoài phạm vi, chuyển tiếp cho con người. Đây là đề xuất tăng chứng cứ về dự án, không phải điều kiện bắt buộc đã được Anthropic xác nhận.

Điều khoản xét duyệt: https://www.anthropic.com/startup-program-official-terms
