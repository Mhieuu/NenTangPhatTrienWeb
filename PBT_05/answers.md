# PBT 05 - Answers

## A1 - Viewport & Mobile-First

1. Thẻ chuẩn:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- `width=device-width`: đặt chiều rộng layout viewport bằng chiều rộng thiết bị.
- `initial-scale=1.0`: đặt mức zoom ban đầu là 100%.

2. Nếu thiếu thẻ này, iPhone thường render trang như một trang desktop rồi thu nhỏ lại để vừa màn hình, nên chữ và layout trông rất nhỏ.

3. Mobile-First là viết CSS mặc định cho mobile, rồi dùng `@media (min-width: ...)` để mở rộng cho màn hình lớn hơn. Desktop-First là viết mặc định cho desktop, rồi dùng `max-width` để thu nhỏ dần.

Ví dụ:

```css
/* Mobile-first */
.grid { grid-template-columns: 1fr; }
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop-first */
.grid { grid-template-columns: repeat(2, 1fr); }
@media (max-width: 767px) {
  .grid { grid-template-columns: 1fr; }
}
```

Mobile-First dễ mở rộng, tối ưu hiệu năng và hợp với cách CSS cascade hoạt động.

## A2 - Breakpoints

- `576px`: small devices, điện thoại lớn / landscape, thường 1-2 cột.
- `768px`: tablet, thường 2 cột.
- `992px`: laptop nhỏ, thường 3 cột.
- `1200px`: desktop lớn, thường 4 cột.
- `1400px`: desktop rất rộng, giữ 4-6 cột hoặc giới hạn container.

## A3 - Media Queries

| Chiều rộng màn hình | `.container` width |
|---|---:|
| 375px | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

## A4 - SCSS Basics

1. Variables: giúp tái sử dụng giá trị.

```scss
$primary-color: #2563eb;
.btn { background: $primary-color; }
```

2. Nesting: viết CSS lồng nhau theo cấu trúc DOM.

```scss
.card {
  .title { font-weight: 600; }
  &:hover { transform: translateY(-4px); }
}
```

3. Mixins: đóng gói logic CSS dùng lại được.

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

4. `@extend`: chia sẻ kiểu từ selector khác.

```scss
.btn-primary { padding: 12px 16px; }
.btn-secondary { @extend .btn-primary; }
```

Trình duyệt không đọc `.scss` vì SCSS là ngôn ngữ tiền xử lý. Cần biên dịch SCSS sang CSS bằng Sass compiler.

## B1 - Responsive Product Page

Trang dùng mobile-first, base là 1 cột, tablet có filter bar và 2 cột, desktop có sidebar + ads bar + 4 cột product grid.

## B2 - Transitions & Animations

Đã triển khai các hiệu ứng hover, zoom ảnh, spinner và fade-in bằng CSS keyframes.

## B3 - SCSS Refactor

Lệnh compile:

```bash
npx sass scss/style.scss scss/style.css
```

Hoặc:

```bash
sass scss/style.scss scss/style.css
```

## C1 - Responsive Strategy

Mobile: header gọn, hero, grid món ăn 1 cột, form đặt bàn ở dưới nội dung chính, map có thể ẩn bớt thông tin phụ.

Tablet: grid món ăn 2 cột, form và map xếp theo block riêng, header vẫn gọn.

Desktop: layout 2-3 cột, hero lớn, grid 3 cột, form và map đặt song song.

## C2 - Video Notes

Video cần demo Mobile-First: 1 cột → 2 cột → 4 cột, dùng `min-width` và `meta viewport`.
