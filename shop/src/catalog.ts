export type Tool = {id:string;name:string;description:string;icon:string;color:string;kind:'text'|'audio'|'media'|'youtube'|'local';status:string;accept?:string;hint:string};
const make=(id:string,name:string,description:string,icon:string,color:string,kind:Tool['kind'],hint:string,status='Cần kết nối API',accept?:string):Tool=>({id,name,description,icon,color,kind,hint,status,accept});
export const creation:Tool[]=[
make('transcribe','Transcribe','Chuyển bản ghi âm thành văn bản.','♧','#4789ff','media','Tải bản ghi âm bạn có quyền sử dụng. Chưa hỗ trợ video hoặc mốc thời gian chính xác.','Cần model Gemini nhận audio','audio/*'),
make('text-to-speech','Text to Speech','Biến kịch bản thành giọng đọc cho video.','◖','#a173ee','media','Nhập văn bản cần đọc và chọn ngôn ngữ.'),
make('voice-design','Voice Design','Thử phong cách đọc với giọng Gemini có sẵn.','✧','#a173ee','media','Nhập lời đọc và phong cách. Bản hiện tại không tạo hoặc lưu giọng tùy chỉnh.','Cần model Gemini TTS'),
make('sound-effects','Sound Effects','Tạo hiệu ứng âm thanh cho từng cảnh quay.','≋','#22bdd1','media','Mô tả âm thanh và thời lượng mong muốn.'),
make('music','Music','Phát triển nhạc nền theo không khí của video.','♫','#ed4e98','media','Mô tả thể loại, nhạc cụ và cảm xúc. Không mặc định có giấy phép thương mại.'),
make('viral-prompts','Viral Prompts','Soạn và lưu prompt theo mục tiêu nội dung.','♨','#ed4e71','text','Nêu chủ đề, khán giả, nền tảng và phong cách.'),
make('voice-changer','Voice Changer','Đổi giọng đọc, giữ nhịp điệu bản ghi.','◉','#fb9145','media','Chọn giọng đích; chỉ dùng giọng bạn được phép sử dụng.','Cần dịch vụ âm thanh','audio/*'),
make('dubbing','Dubbing','Dịch lời thoại; lồng tiếng đồng bộ đang phát triển.','文','#498cfa','media','Nêu ngôn ngữ đích. Bản hiện tại xuất văn bản dịch từ audio, chưa ghép giọng vào video.','Dịch bằng Gemini · chưa đồng bộ lồng tiếng','audio/*'),
make('image-video','Image & Video','Tạo ảnh từ mô tả; tạo video đang phát triển.','▣','#ec5aa7','media','Mô tả cảnh, bố cục, tỷ lệ và phong cách. Bản hiện tại chỉ kết nối model tạo ảnh.','Cần model Gemini tạo ảnh'),
make('watermark-remover','Watermark Remover','Làm sạch tài sản do bạn sở hữu và được phép chỉnh sửa.','◇','#f37279','media','Chỉ xử lý tài sản có quyền chỉnh sửa; không gỡ dấu bản quyền của bên khác.','Cần dịch vụ xử lý media','image/*,video/*'),
make('silence-remover','Silence Remover','Loại khoảng lặng khỏi bản ghi âm.','✂','#55c68a','audio','Tải âm thanh; đoạn dưới ngưỡng âm lượng sẽ được cắt.','Xử lý tại backend','audio/*'),
make('audio-enhancer','Audio Enhancer','Cân bằng âm lượng và giảm tiếng trầm không cần thiết.','≋','#55c68a','audio','Tải âm thanh để chuẩn hóa peak và lọc tần số thấp. Không phải khử nhiễu AI.','Xử lý tại backend','audio/*'),
make('merge-audio','Merge Audio','Ghép nhiều bản ghi thành một tệp WAV.','▤','#55c68a','audio','Chọn nhiều file; thứ tự lựa chọn là thứ tự ghép.','Xử lý tại backend','audio/*'),
make('voice-isolator','Voice Isolator','Tách giọng nói khỏi âm thanh nền.','◍','#f37279','media','Tải bản ghi cần tách giọng.','Cần dịch vụ tách giọng','audio/*')];
export const research:Tool[]=[
make('views-per-hour','Views per hour','Theo dõi tốc độ tăng lượt xem giữa các lần đo.','⌁','#f2a83d','youtube','Nhập URL hoặc ID video. Cần ít nhất hai lần đo để tính VPH.'),
make('keyword-research','Keyword Research','Tìm video liên quan và đối chiếu chủ đề.','⌕','#9b73ef','youtube','Nhập từ khóa. YouTube Data API không cung cấp lượng tìm kiếm hoặc điểm cạnh tranh.'),
make('topic-research','Topic research','Phát triển chủ đề, góc tiếp cận và kế hoạch video.','♧','#f26089','text','Nêu ngách, đối tượng và mục tiêu video.'),
make('outliers','Outliers','Đối chiếu hiệu suất video trong một tập dữ liệu.','♨','#ed994b','youtube','Nhập @handle, URL kênh hoặc ID UC…. Không suy diễn điểm breakout khi chưa đủ dữ liệu.'),
make('trends','Trends','Khám phá video phổ biến theo khu vực.','⌁','#47ba80','youtube','Nhập mã quốc gia, ví dụ VN hoặc US.'),
make('spy-video','Spy Video','Xem chỉ số công khai và thông tin video.','▣','#ee6b94','youtube','Nhập URL hoặc ID video.'),
make('spy-channel','Spy Channel','Đọc thông tin công khai của kênh YouTube.','♧','#26b5cd','youtube','Nhập @handle, URL kênh hoặc ID UC….'),
make('spy-competitors','Spy Competitors','Lưu kênh tham khảo và xem dữ liệu công khai.','♜','#eca64f','youtube','Nhập tối đa 5 @handle hoặc URL kênh, mỗi dòng một kênh. So sánh dữ liệu công khai.'),
make('launch-channel','Launch New Channel','Phác thảo định vị, tên kênh và chủ đề đầu tiên.','↗','#f16c8e','text','Mô tả ngách, khán giả và nguồn lực của bạn.'),
make('yt-metadata','YT Meta Generator','Soạn tiêu đề, mô tả và tags từ nội dung thực tế.','▤','#ee6b94','text','Dán nội dung hoặc tóm tắt video; tránh tiêu đề gây hiểu nhầm.'),
make('thumbnail-generator','Thumbnail Generator','Thiết kế thumbnail với bố cục và tiêu đề của bạn.','▣','#e679b6','local','Nhập chữ trên thumbnail; tải ảnh nền nếu có.','Xử lý tại backend','image/*'),
make('optimisation','Optimisation','Rà soát tiêu đề, mô tả và cấu trúc nội dung.','✣','#9b73ef','text','Dán tiêu đề, mô tả và kịch bản để nhận góp ý, không cam kết thứ hạng.'),
make('your-channel','Your channel','Lưu ID kênh và tra cứu dữ liệu công khai.','↔','#4d92eb','youtube','Nhập @handle, URL kênh hoặc ID UC…. Kết nối dữ liệu riêng tư cần OAuth và sẽ triển khai sau.')];
export const tools=[...creation,...research];
export const plans=[{name:'Free',credits:'Dùng công cụ backend',text:'Khám phá không gian sáng tạo',features:['Ghép âm thanh','Cắt khoảng lặng','Cân bằng âm lượng','Thiết kế thumbnail']},{name:'Creator',credits:'Hạn mức sẽ được công bố',text:'Dành cho nhà sáng tạo cá nhân',features:['Nhóm công cụ sáng tạo','Lưu lịch sử công việc','Prompt và kịch bản','Dự kiến kết nối AI']},{name:'Growth',credits:'Hạn mức sẽ được công bố',text:'Nghiên cứu và phát triển kênh',features:['Các tính năng Creator','Bộ PtIQ','Theo dõi kênh tham khảo','Dự kiến nghiên cứu YouTube']},{name:'Scale',credits:'Hạn mức sẽ được công bố',text:'Dành cho nhóm sáng tạo',features:['Các tính năng Growth','Không gian làm việc nhóm dự kiến','Quản lý nội dung','Trao đổi nhu cầu triển khai']},{name:'ScaleMax',credits:'Theo nhu cầu',text:'Dành cho studio và doanh nghiệp',features:['Trao đổi tích hợp riêng','Hạn mức phù hợp thực tế','Hỗ trợ triển khai','Chính sách sẽ được thỏa thuận']}];
