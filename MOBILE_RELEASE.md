# Phát hành ứng dụng iOS và Android

Dự án dùng Capacitor để đóng gói bản React/Vite thành ứng dụng native.

## Thông tin ứng dụng

- Tên: `Phúc Thành Holding`
- Bundle ID / Application ID: `com.phucthanhholding.app`
- Web build: `out/`
- Android project: `android/`
- iOS project: `ios/App/`

Bundle ID là định danh vĩnh viễn sau khi ứng dụng được phát hành. Nếu cần đổi, hãy đổi trước khi tạo ứng dụng trên App Store Connect hoặc Google Play Console.

## Chuẩn bị môi trường

- Node.js 22.12 trở lên và npm.
- Android Studio, Android SDK và JDK 21 để build Android.
- macOS, Xcode phiên bản hiện hành và tài khoản Apple Developer để build/ký iOS.
- Tài khoản Google Play Console để phát hành Android.
- File `.env` production với Supabase URL và public anon key. Không đưa service-role key hoặc secret vào ứng dụng.

## Đồng bộ mã web vào native

```powershell
npm install
npm run cap:sync
```

Chạy lại `npm run cap:sync` sau mỗi lần thay đổi mã frontend hoặc biến môi trường production.

## Android / Google Play

1. Chạy `npm run cap:android` để mở project trong Android Studio.
2. Kiểm tra `versionCode` và `versionName` trong `android/app/build.gradle` trước mỗi bản phát hành.
3. Trong Android Studio chọn **Build > Generate Signed Bundle / APK > Android App Bundle**.
4. Tạo hoặc chọn keystore riêng, lưu keystore và mật khẩu ở nơi an toàn, không commit vào Git.
5. Tải file `.aab` lên Play Console, hoàn thành Data safety, Content rating, App access, Privacy policy và Store listing.
6. Phát hành Internal testing trước, kiểm tra trên thiết bị thật rồi mới chuyển sang Production.

Google Play yêu cầu tăng `versionCode` ở mỗi lần tải bản mới.

## iOS / App Store

Project iOS đã được sinh sẵn nhưng chỉ có thể build và ký trên macOS.

1. Chép/clone dự án sang máy Mac, chạy `npm install` và `npm run cap:sync`.
2. Chạy `npm run cap:ios` để mở project trong Xcode.
3. Chọn target **App**, tab **Signing & Capabilities**, chọn Apple Developer Team.
4. Kiểm tra Bundle Identifier, Version và Build number.
5. Chọn **Product > Archive**, sau đó **Distribute App > App Store Connect**.
6. Hoàn thành Privacy Nutrition Labels, Age Rating, App Privacy, ảnh chụp màn hình, Support URL và Privacy Policy URL trong App Store Connect.
7. Phát hành qua TestFlight trước khi gửi App Review.

Apple có thể từ chối ứng dụng chỉ bọc lại website theo tiêu chí minimum functionality. Trước khi gửi duyệt, nên bổ sung giá trị native rõ ràng như thông báo đẩy, nội dung lưu ngoại tuyến, tài khoản người dùng hoặc tính năng dành riêng cho thiết bị nếu phù hợp với sản phẩm.

## Kiểm tra trước phát hành

```powershell
npm run lint
npm run type-check
npm run cap:sync
cd android
.\gradlew.bat bundleRelease
```

Ngoài kiểm tra tự động, cần thử trên thiết bị thật: điều hướng, nút Back Android, bàn phím/form liên hệ, đăng nhập quản trị, chuyển ngôn ngữ, liên kết ngoài, xoay màn hình, chế độ mất mạng và mọi luồng Supabase.

## Tài sản cửa hàng còn cần chuẩn bị

- Google Play: icon 512×512, feature graphic 1024×500, ảnh chụp điện thoại/máy tính bảng và nội dung mô tả.
- App Store: ảnh chụp theo kích thước thiết bị Apple đang yêu cầu và nội dung mô tả/keywords.
- URL chính sách bảo mật và URL hỗ trợ truy cập công khai.

Icon/splash native đã được tạo từ logo chính thức trong `resources/`. Có thể sinh lại bằng `npm run assets:generate` sau khi thay `resources/icon.png` hoặc `resources/splash.png`.
