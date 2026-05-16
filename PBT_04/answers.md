# PBT 04 — Answers

## PHẦN A

### A1 — 5 Loại Positioning
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| static   | Có (mặc định)             | Normal flow       | Có               | Text, default layout |
| relative | Có (vẫn giữ vị trí)       | Offset so với chính nó; tham chiếu là vị trí ban đầu | Có | Dịch chuyển nhẹ element mà không làm mất flow |
| absolute | Không (taken out of flow) | nearest positioned ancestor (closest ancestor với position != static); nếu không có thì tham chiếu tới initial containing block (body) | Không cuộn theo ancestor; vị trí cố định theo khung chứa | Tooltip, badge trong card |
| fixed    | Không                      | viewport (luôn cố định) | Không (luôn visible) | Header/Back-to-top button cố định |
| sticky   | Có (cho tới khi dính)      | nearest scroll container; hoạt động khi vượt threshold | Giống flow cho đến khi dính → dính ở viewport | Sticky header/sidebar nhỏ khi scroll |

**Nearest positioned ancestor**: là tổ tiên gần nhất có `position` khác `static` (relative/absolute/fixed/sticky). `absolute` tham chiếu parent khi parent có position != static; nếu không, tham chiếu `body`/viewport.

### A2 — Flexbox vs Grid (dự đoán)
- Trường hợp 1: `display:flex; .item{flex:1}` với 4 items → 1 hàng, 4 cột đều nhau (mỗi item chia đều không gian).
- Trường hợp 2: `flex-wrap:wrap; .item{width:45%; margin:2.5%}` với 6 items → mỗi row có 2 items (vì 45%+2.5%*2 ~100%), tổng 3 hàng.
- Trường hợp 3: `justify-content:space-between; align-items:center;` với 3 items → 1 hàng, items phân bố: item1 trái, item2 giữa, item3 phải; tất cả căn giữa theo chiều dọc.
- Trường hợp 4: `grid-template-columns:200px 1fr 200px; gap:20px;` với 3 items → chúng đặt lần lượt vào 3 cột tương ứng: cột 1 (200px), cột 2 (flex), cột 3 (200px).
- Trường hợp 5: `grid-template-columns:repeat(3,1fr);` với 7 items → sẽ có 3 cột; hàng đầu 3 items, hàng 2 3 items, hàng 3 có 1 item ở cột 1.

## PHẦN C (gợi ý trả lời)
- Tham khảo trong file `positioning.html`, `flexbox_layout.html`, `grid_layout.html` để kiểm chứng.
