# PBT 06 - Answers

## Track A - Bootstrap 5

## A1 - Grid System

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|---|---|---|---|
| Số cột | 1 | 2 | 4 |
| Box layout | Mỗi box chiếm 12 cột | Mỗi box chiếm 6 cột | Mỗi box chiếm 3 cột |

- `col-md-6` nghĩa là từ breakpoint `md` trở lên, phần tử chiếm 6/12 cột.
- Không cần `col-sm-12` vì Bootstrap mặc định mobile là full width. Khi không khai báo `col-sm-*`, lớp `col-12` hoặc hành vi mặc định đã đủ cho màn hình nhỏ.

## A2 - Utilities & Components

1. `d-none d-md-block`: ẩn ở mobile, hiện dạng block từ `md` trở lên.
2. Spacing utilities:
   - `mt-3`: margin-top.
   - `mb-4`: margin-bottom.
   - `px-4`: padding trái/phải.
   - `py-2`: padding trên/dưới.
   - `mx-auto`: margin trái/phải tự động.
3. `.container` có max-width theo breakpoint và căn giữa.
   `.container-fluid` luôn full width.
   `.container-md` full width cho tới `md`, sau đó mới giới hạn theo container.

## C1 - Tùy biến Bootstrap

Muốn đổi `$primary` sang `#E63946`, cần dùng Bootstrap source Sass, cài Sass compiler, tạo file SCSS riêng rồi override biến trước khi import Bootstrap:

```scss
$primary: #E63946;
@import "bootstrap/scss/bootstrap";
```

Sau đó compile ra CSS bằng `sass` hoặc `npx sass`.

Không nên override trực tiếp `.btn-primary { background: red; }` vì:
- Dễ bị specificity và cascade làm hỏng ở component khác.
- Không đồng bộ với các biến liên quan như hover, focus, border, alert, badge.
- SASS variables thay đổi ngay từ design token gốc, nhất quán hơn.

## C2 - So sánh

Bootstrap giảm đáng kể số dòng CSS, tăng tốc phát triển, nhưng nếu cần giao diện rất đặc thù thì CSS thuần linh hoạt hơn. Bootstrap phù hợp cho dashboard, admin, landing page nhanh; không nên lạm dụng khi cần design system riêng hoặc tối ưu bundle rất chặt.

## B1/B2 - Thực hành

Đã chọn Bootstrap track và triển khai landing page + dashboard bằng Bootstrap classes và components.
