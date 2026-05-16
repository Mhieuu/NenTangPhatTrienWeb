# PBT 02 — Answers

## PHẦN A — ĐÁP ÁN

### A1 — 10 input types (ngắn gọn)
1. type="email" → Ô nhập text, trình duyệt kiểm tra định dạng email (có @) → Dùng cho form đăng ký/đăng nhập
2. type="tel" → Ô nhập số/chuỗi điện thoại, không bắt buộc kiểm tra; dùng pattern để kiểm tra → Dùng cho SĐT khách hàng
3. type="number" → Ô nhập số với mũi tên tăng/giảm, có min/max → Dùng cho số lượng sản phẩm
4. type="date" → Trình chọn ngày, kiểm tra định dạng → Ngày giao hàng/Ngày sinh
5. type="password" → Ô nhập mật khẩu (ẩn ký tự) → Mật khẩu tài khoản
6. type="checkbox" → Hộp chọn, có checked → Đồng ý điều khoản, chọn tuỳ chọn
7. type="radio" → Chọn 1 trong nhiều lựa chọn → Chọn phương thức thanh toán
8. type="url" → Kiểm tra định dạng URL → Link hình ảnh bổ sung
9. type="search" → Ô tìm kiếm với giao diện tối ưu → Thanh tìm sản phẩm
10. type="file" → Upload file, hỗ trợ accept → Upload ảnh sản phẩm

### A2 — Validation: Dự đoán (mô tả ngắn)
- Trường hợp 1: `required` + value="" → Submit bị chặn, trình duyệt báo "Please fill out this field" (hoặc tương đương).
- Trường hợp 2: `type="email"` value="abc" → Submit bị chặn, báo lỗi định dạng email.
- Trường hợp 3: `type="number" min="1" max="10" value="15"` → Submit bị chặn nếu value ngoài range; trình duyệt coi là invalid.
- Trường hợp 4: `pattern="[0-9]{10}"` value="abc123" → Submit bị chặn, vì không khớp pattern (yêu cầu 10 chữ số).
- Trường hợp 5: `minlength="8"` value="123" → Submit bị chặn, báo yêu cầu độ dài tối thiểu.

> Thực tế validation có thể khác về thông báo tùy trình duyệt — file `validation_test.html` đã đính kèm để kiểm chứng.

### A3 — Accessibility
1. `<label for="email">` giúp screen reader liên kết nhãn với input, khi đọc sẽ nói "Email, edit text"; cũng mở rộng vùng click để focus input.
2. Dùng `<fieldset>` + `<legend>` khi nhóm các input liên quan (ví dụ nhóm phương thức thanh toán hoặc thông tin địa chỉ). `legend` mô tả nhóm cho screen reader.
3. `aria-label` dùng khi không thể đặt visible `<label>` (ví dụ icon-only buttons). Không nên dùng nếu đã có `<label>` vì `label` là chuẩn HTML và được ưu tiên cho accessibility.

### A4 — Media
1. `loading="lazy"` trì hoãn tải ảnh cho đến khi gần viewport, giảm băng thông và tăng tốc tải trang; không nên dùng cho ảnh hero hoặc ảnh quan trọng cần hiển thị ngay.
2. Nhiều `<source>` cho `<video>` để trình duyệt chọn format hỗ trợ. Format phổ biến: `mp4` (H.264), `webm` (VP9/VP8), `ogg` (Theora).
3. `alt` cung cấp mô tả thay cho ảnh và cho screen reader; ví dụ:
   - iPhone 16: "iPhone 16 Pro Max 256GB Titan, mặt trước màu đen"
   - Ảnh trang trí: "" (để screen reader bỏ qua)
   - Biểu đồ doanh thu Q1/2026: "Biểu đồ cột doanh thu Q1/2026: Tháng 1=1.2M, Tháng 2=1.5M, Tháng 3=1.8M"

### A5 — `<figure>` vs `<img>`
- Dùng `<img>` đơn lẻ khi ảnh chỉ trang trí hoặc không cần chú thích (ví dụ logo nhỏ, icon). Ví dụ: avatar nhỏ, icon cart.
- Dùng `<figure>` khi cần caption hoặc mô tả (ví dụ ảnh sản phẩm kèm giá, ảnh minh hoạ bài blog kèm chú thích). Ví dụ: gallery sản phẩm, ảnh minh hoạ bài viết với chú thích.

## PHẦN C — Câu C1 & C2 (ngắn gọn)

### C1 — Debug Form (liệt kê lỗi & sửa)
Lỗi 1: Input "Tên" không có `<label for>` → Sửa: `<label for="name">Tên:</label> <input id="name" name="name" type="text" required>`
Lỗi 2: `<input type="email" placeholder="Email của bạn">` thiếu `id`+`label`+`name`+`required` → Sửa: `<label for="email">Email:</label><input id="email" name="email" type="email" placeholder="Email của bạn" required>`
Lỗi 3: 2 ô password không có `id`/`label`/`name` và không có `minlength` → Sửa: thêm labels, `minlength="8"` và tên trường, giải thích confirm password cần JS để so sánh.
Lỗi 4: Phone dùng `type="text"` + value sẵn, thiếu label và pattern → Sửa: `<label for="phone">Phone:</label><input id="phone" name="phone" type="tel" pattern="[0-9]{10}">`
Lỗi 5: `<select>` không có `id`/`label` → Sửa: thêm label/option value.
Lỗi 6: `<label> Tôi đồng ý điều khoản </label>` thiếu `for` và input checkbox liên kết → Sửa: `<input type="checkbox" id="agree" name="agree" required><label for="agree">Tôi đồng ý điều khoản</label>`
Lỗi 7: Form thiếu `action`/`method` rõ ràng → Sửa: `<form action="#" method="POST">`
Lỗi 8: Submit input không có accessible name via button/aria-label nếu cần → Sửa: dùng `<button type="submit">Gửi</button>`

### C2 — Validation ngân hàng
1. Pattern:
   - CMND/CCCD (12 chữ số): `pattern="^[0-9]{12}$"`
   - Số tài khoản (10-15 chữ số): `pattern="^[0-9]{10,15}$"`
2. HTML5 validation không đủ cho ngân hàng: nó chỉ giúp UX/kiểm tra client-side; không thể thay thế kiểm tra server-side vì có thể bị bypassed.
3. Ba loại validation HTML5 không làm được: kiểm tra tồn tại tài khoản trong DB, kiểm tra số dư, kiểm tra hành vi gian lận hoặc cross-field logic phức tạp (ví dụ tính hợp lệ theo nhiều trường).
4. Hai rủi ro khi chỉ validate frontend: attacker bỏ qua validation và gửi dữ liệu độc hại; lợi dụng để inject SQL/logic nếu backend không kiểm tra.

---
Ghi chú: Các file HTML thực hành đã được thêm vào thư mục để kiểm tra thực tế và chụp screenshot kết quả validation.
