# PBT 03 — Answers

## PHẦN A

### A1 — 3 cách nhúng CSS
- Inline:
  - Ví dụ: `<p style="color: red">Hello</p>`
  - Ưu: nhanh, override dễ
  - Nhược: không tái sử dụng, khó maintain
  - Dùng khi cần override nhanh cho 1 element duy nhất

- Internal (internal stylesheet):
  - Ví dụ: `<style>p{color:red}</style>` trong `<head>`
  - Ưu: dễ thử nghiệm, scope page
  - Nhược: không tái sử dụng across pages
  - Dùng cho trang đơn lẻ hoặc demo

- External:
  - Ví dụ: `<link rel="stylesheet" href="style.css">`
  - Ưu: tái sử dụng, cache, tách concerns
  - Nhược: thêm request, cần quản lý đường dẫn
  - Dùng cho dự án thực tế

Nếu 1 element có cả 3, thứ tự ưu tiên: inline > internal/external theo specificity và source order; cụ thể inline có specificity cao hơn, còn giữa internal/external thì sau cùng trong source order thắng.

### A2 — Selectors (dự đoán)
HTML như mẫu trong bài.
1. `h1` → Chọn: `ShopTLU`
2. `.price` → Chọn: `25.990.000đ` (hai phần tử `.price`)
3. `#app header` → Chọn: phần tử `header` chứa `ShopTLU` và `nav`
4. `nav a:first-child` → Chọn: text `Home`
5. `.product.featured h2` → Chọn: `MacBook Pro`
6. `article > p` → Chọn: các đoạn `p` là con trực tiếp của `article` (bao gồm `.price` và mô tả)
7. `a[href="/"]` → Chọn: `Home`
8. `.top-bar.dark h1` → Chọn: `ShopTLU`

### A3 — Box Model tính toán
- Trường hợp 1 (content-box):
  - width property = 400px là width của content
  - padding hai bên = 20 + 20 = 40px
  - border hai bên = 5 + 5 = 10px
  - Chiều rộng hiển thị = content + padding + border = 400 + 40 + 10 = 450px
  - Không gian chiếm trên trang (bao gồm margin) = 450 + 10 + 10 (margins) = 470px

- Trường hợp 2 (border-box):
  - width = 400px bao gồm content+padding+border
  - Chiều rộng hiển thị = 400px
  - Kích thước content thực tế = 400 - padding(40) - border(10) = 350px
  - Không gian chiếm trên trang = 400 + margin 10 + 10 = 420px

- Trường hợp 3 (margin collapse):
  - `.box-a` margin-bottom:25px, `.box-b` margin-top:40px
  - Khoảng cách giữa hai box = max(25,40) = 40px (không cộng), vì margin collapse

Nâng cao: nếu `.box-a` margin-bottom:-10px và `.box-b` margin-top:40px thì khoảng cách = 40 + (-10)? Kết quả = 30px? Thực tế collapse chọn giá trị lớn nhất về chiều dương; negative margins có thể làm khoảng cách = 30px (tùy cây DOM).

### A4 — Specificity
Rules:
- A `p` → specificity (0,0,0,1)
- B `.price` → (0,0,1,0)
- C `#main-price` → (0,1,0,0)
- D `p.price` → (0,0,1,1)

Element có màu theo rule C (`#main-price`) → đỏ, vì id specificity cao nhất.
Nếu thêm `style="color: orange;"` inline -> inline style thắng -> màu orange.
Nếu Rule A thêm `!important`, và không có rule khác `!important`, thì rule A sẽ thắng (màu black) vì `!important` nâng priority; nhưng `style` with `!important` or inline `!important` would override.

## PHẦN C (tóm tắt yêu cầu kiểm chứng)
Tôi đã tạo các file kiểm chứng tương ứng trong thư mục: selectors_test.html, profile.html + style.css, boxmodel_lab.html + boxmodel.css, specificity.html + specificity.css, debug_layout.html + debug_layout.css.
