---

# PHẦN B4 — PHÂN TÍCH TRANG WEB THẬT (shopee.vn)

## 1. Thẻ semantic HTML5 sử dụng
- `<header>`: Bao quanh phần đầu trang, chứa logo và menu chính (xem ảnh: screenshots/shopee_header.png)
- `<nav>`: Thanh điều hướng chính (xem ảnh: screenshots/shopee_nav.png)
- `<footer>`: Chân trang, chứa thông tin liên hệ, bản quyền (xem ảnh: screenshots/shopee_footer.png)

## 2. Thẻ không dùng đúng semantic
- `<div>` dùng cho cả phần nội dung chính thay vì `<main>` (xem ảnh: screenshots/shopee_div_main.png)
- `<span>` dùng để bọc tiêu đề lớn thay vì dùng `<h1>` hoặc `<h2>` (xem ảnh: screenshots/shopee_span_title.png)

## 3. Table trên trang
- Ảnh chụp: screenshots/shopee_table.png
- Nội dung: Bảng hiển thị thông tin so sánh giá vận chuyển giữa các đơn vị giao hàng.
- Có dùng `<thead>`, `<tbody>`: Có, bảng có phần thead cho tiêu đề cột và tbody cho dữ liệu.

## 4. Form trên trang
- Ảnh chụp: screenshots/shopee_form.png
- Form tìm kiếm sản phẩm ở đầu trang.
- Action: `/search`
- Method: `GET`
- Input types: `text` (ô nhập từ khóa), `submit` (nút tìm kiếm)

---

> Lưu ý: Bạn hãy chụp các ảnh màn hình đúng vị trí, lưu vào thư mục screenshots/ với tên như trên để hoàn thiện bài!
---

# PHẦN B3 — LIỆT KÊ LỖI VÀ CÁCH SỬA (debug.html)

Lỗi 1: Dòng 1 — Thiếu khai báo đúng chuẩn DOCTYPE
	- Mô tả: `<!DOCTYPE>` không đúng, phải là `<!DOCTYPE html>`
	- Cách sửa: Đổi thành `<!DOCTYPE html>`

Lỗi 2: Dòng 2 — Thiếu thuộc tính lang cho thẻ html
	- Mô tả: `<html>` thiếu `lang="vi"`
	- Cách sửa: Thêm `lang="vi"` vào thẻ html

Lỗi 3: Dòng 4-6 — Thẻ title không đóng đúng, meta charset sai chuẩn
	- Mô tả: `<title>` không đóng, meta charset phải là `UTF-8`
	- Cách sửa: Đóng thẻ title đúng, meta charset="UTF-8"

Lỗi 4: Dòng 8 — Thẻ h1 không đóng đúng
	- Mô tả: `<h1>Welcome to ShopTLU<h1>` thiếu dấu `/` đóng
	- Cách sửa: Đổi thành `<h1>Welcome to ShopTLU</h1>`

Lỗi 5: Dòng 11-13 — Thẻ a không đóng đúng
	- Mô tả: `<a href="home">Trang chủ<a>` thiếu `</a>`
	- Cách sửa: Đổi thành `<a href="home">Trang chủ</a>`

Lỗi 6: Dòng 25 — Thuộc tính src của img thiếu dấu ngoặc kép, thiếu alt
	- Mô tả: `<img src=iphone.jpg>` thiếu dấu " và alt
	- Cách sửa: `<img src="iphone.jpg" alt="iPhone 16 Pro">`

Lỗi 7: Dòng 27 — Thẻ b không đóng đúng, lồng sai vị trí
	- Mô tả: `<p>Giá: <b>25.990.000đ</p></b>`
	- Cách sửa: `<p>Giá: <b>25.990.000đ</b></p>`

Lỗi 8: Dòng 34-41 — Table thiếu thead, tbody, th
	- Mô tả: Table chỉ dùng td, không có thead, tbody, th
	- Cách sửa: Thêm thead, tbody, dùng th cho tiêu đề

Lỗi 9: Dòng 44-46 — Dùng 2 thẻ main, sai semantic
	- Mô tả: Có 2 thẻ <main> trong 1 trang, không hợp lệ
	- Cách sửa: Chuyển phần sidebar thành <aside>

Lỗi 10: Dòng 50-53 — Thẻ p và footer không đóng đúng, thiếu ký tự đặc biệt bản quyền
	- Mô tả: `<p>Copyright 2026` không đóng, nên dùng &copy;
	- Cách sửa: `<p>&copy; 2026 ShopTLU</p>`

Lỗi 11: Dòng cuối — Thiếu thẻ đóng </html>
	- Mô tả: Không có `</html>` kết thúc file
	- Cách sửa: Thêm `</html>` cuối file
# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 (5đ) — HTTP & Browser

1. Khi bạn gõ `https://shopee.vn` vào trình duyệt và nhấn Enter, các bước chính:
   - **Bước 1:** Trình duyệt kiểm tra cache DNS, nếu không có sẽ gửi truy vấn DNS để lấy địa chỉ IP của shopee.vn (DNS lookup).
   - **Bước 2:** Trình duyệt thiết lập kết nối TCP tới server (qua IP vừa nhận được).
   - **Bước 3:** Thiết lập kết nối bảo mật TLS/SSL (vì là https).
   - **Bước 4:** Trình duyệt gửi HTTP request (GET) tới server.
   - **Bước 5:** Server trả về HTTP response (chứa HTML, CSS, JS, ảnh...)
   - **Bước 6:** Trình duyệt phân tích HTML, tải thêm các tài nguyên phụ (CSS, JS, ảnh...), xây dựng DOM tree, CSSOM, render ra màn hình.
   
   > **Nguồn:** 01_introduction_html_universe.md — phần "Trình duyệt hoạt động như thế nào?"

2. Tab **Network** trong DevTools cho biết:
   - Danh sách tất cả các request (HTML, CSS, JS, ảnh...)
   - Thời gian tải từng request, tổng thời gian load trang
   - Status code của từng request
   - Loại file, dung lượng, thứ tự tải...
   
   > **Nguồn:** 01_introduction_html_universe.md — phần "DevTools: Network tab"

## Câu A2 (5đ) — Semantic HTML

**Lý do SEO thấp:**
- Không dùng thẻ semantic (header, nav, main, footer...)
- Không có heading rõ ràng (h1, h2...)
- Menu không dùng nav
- Logo không dùng thẻ phù hợp

**Sửa lại:**
```html
<header>
	<div class="logo">ShopTLU</div>
	<nav>
		<a href="/">Trang chủ</a>
		<a href="/products">Sản phẩm</a>
	</nav>
</header>
<main>
	<article class="product">
		<h1>iPhone 16 Pro</h1>
		<div class="price">25.990.000đ</div>
		<figure class="image"><img src="iphone.jpg" alt="iPhone 16 Pro"></figure>
	</article>
</main>
<footer>© 2026 ShopTLU</footer>
```
> **Nguồn:** 04_semantic_html.md — phần "Semantic tags & SEO"

## Câu A3 (5đ) — Block vs Inline

**Kết quả hiển thị:**
```
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
```
- `<div>` là block: mỗi cái xuống dòng mới.
- `<span>`, `<strong>` là inline: nằm cùng dòng nếu không bị block ngắt.

> **Nguồn:** 01_introduction_html_universe.md — phần "Block vs Inline Elements"

## Câu A4 (5đ) — Table

- `<thead>`: Chứa hàng tiêu đề bảng (thường là `<th>`)
- `<tbody>`: Chứa nội dung chính của bảng
- `<tfoot>`: Chứa phần chân bảng (tổng kết, ghi chú...)

**Không nên dùng table cho layout vì:**
1. Không thân thiện với thiết bị di động (khó responsive)
2. Ảnh hưởng SEO, Google khó hiểu nội dung
3. Trợ năng (screen reader) khó đọc đúng thứ tự

> **Nguồn:** 05_tables_hyperlinks.md — phần "Table structure" & "Table vs Layout"

---

# PHẦN C — SUY LUẬN

## Câu C1 (10đ) — Thiết kế cấu trúc

```html
<header> <!-- header: phần đầu trang, chứa logo, nav -->
	<nav> <!-- nav: thanh điều hướng chính -->
		<!-- ... -->
	</nav>
</header>
<nav aria-label="breadcrumb"> <!-- nav: breadcrumb -->
	<ol>
		<li><a href="/">Trang chủ</a></li>
		<li><a href="/dien-thoai">Điện thoại</a></li>
		<li>iPhone 16</li>
	</ol>
</nav>
<main> <!-- main: nội dung chính -->
	<section> <!-- section: khu vực ảnh sản phẩm -->
		<figure> <!-- figure: từng ảnh -->
			<img src="#" alt="Ảnh 1">
		</figure>
		<!-- ... 4 figure nữa ... -->
	</section>
	<section> <!-- section: thông tin sản phẩm -->
		<h1>Tên sản phẩm</h1>
		<p>Giá</p>
		<div>Đánh giá sao</div> <!-- hoặc dùng ul/li cho sao -->
		<p>Mô tả</p>
	</section>
	<section> <!-- section: bảng thông số kỹ thuật -->
		<table>
			<!-- ... -->
		</table>
	</section>
	<section> <!-- section: đánh giá/bình luận -->
		<!-- ... -->
	</section>
	<aside> <!-- aside: sidebar sản phẩm tương tự -->
		<!-- ... -->
	</aside>
</main>
<footer> <!-- footer: chân trang -->
	<!-- ... -->
</footer>
```

## Câu C2 (10đ) — So sánh & Tranh luận

Việc chỉ dùng `<div>` cho mọi thứ và bỏ qua semantic HTML là một sai lầm lớn về mặt kỹ thuật. Thứ nhất, **SEO (Search Engine Optimization)**: Các công cụ tìm kiếm như Google ưu tiên các trang web sử dụng thẻ semantic (như `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) vì chúng giúp máy hiểu rõ cấu trúc nội dung, từ đó xếp hạng trang tốt hơn. Thứ hai, **Accessibility (trợ năng)**: Người dùng khiếm thị sử dụng screen reader sẽ dễ dàng điều hướng và hiểu nội dung hơn nếu trang web dùng semantic tag đúng cách, ví dụ screen reader sẽ "nhảy" nhanh tới `<nav>` hoặc `<main>` thay vì phải đọc qua hàng loạt `<div>` không có ý nghĩa.

Ví dụ: Một trang tin tức dùng `<article>` cho từng bài viết, `<aside>` cho tin liên quan, `<nav>` cho menu. Khi đó, Google và các thiết bị trợ năng đều "nhận diện" đúng từng phần, giúp tăng trải nghiệm người dùng và thứ hạng tìm kiếm.

Tuy nhiên, `<div>` vẫn phù hợp khi cần một vùng chứa không mang ý nghĩa nội dung (chỉ để layout, wrapper, hoặc nhóm các thành phần nhỏ không có semantic riêng). Nhưng lạm dụng `<div>` sẽ làm code khó bảo trì, giảm hiệu quả SEO và accessibility.

---
