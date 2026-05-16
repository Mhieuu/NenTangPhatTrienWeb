# Validation & Screenshot Instructions

1) Serve files locally (recommended) so validator resources load correctly.

Windows / PowerShell:
```powershell
cd d:\GitHub\PBT\PBT_02
python -m http.server 8000
```

2) Open pages in browser:
- `http://localhost:8000/validation_test.html` — test 5 cases
- `http://localhost:8000/register.html`, `media.html`, `checkout.html` — kiểm tra

3) Chụp màn hình kết quả validation (Windows):
- Dùng Snipping Tool (Win+Shift+S) hoặc PrintScreen rồi dán vào Paint
- Lưu ảnh vào `PBT_02/screenshots/` với tên rõ ràng (ví dụ `validation_case2_email.png`)

4) Kiểm tra HTML qua validator.w3.org:
- Mở https://validator.w3.org/ và chọn tab "Validate by URL" → nhập `http://localhost:8000/register.html`
- Hoặc upload file trực tiếp tab "Validate by File Upload"

5) Tự động (tuỳ chọn) — sử dụng vnu.jar (Tidy/Validator) nếu muốn chạy offline.

Ghi chú: Một vài validation warnings có thể do dùng external resources (CDN). Đọc kỹ thông báo và sửa tương ứng.
