# PBT 10 - Answers

## A1 - Sync vs Async

Thứ tự output:

1. `1 - Start`
2. `4 - End`
3. `3 - Promise`
4. `6 - Promise 2`
5. `2 - Timeout 0ms`
6. `7 - Nested timeout`
7. `5 - Timeout 100ms`

Microtask queue (Promise) được xử lý trước macrotask queue (setTimeout).

## A2 - Fetch API

- `await fetch(...)`: `fetch` trả về Promise, cần await để nhận `Response`.
- `response.ok`: false khi HTTP status ngoài 200-299, ví dụ 404, 500, 429.
- `response.json()`: trả Promise vì phải parse body bất đồng bộ.
- `try...catch`: bắt lỗi mạng, lỗi parse JSON, và lỗi do `throw new Error(...)`.

## A3 - Promise States

Promise có 3 trạng thái: Pending → Fulfilled hoặc Pending → Rejected.

Callback hell là chuỗi callback lồng nhau nhiều tầng, khó đọc và khó bắt lỗi. Async/await giúp code tuyến tính hơn.

## C1 - Error Handling Strategy

- Network errors: hiển thị retry, giữ dữ liệu cũ, log lỗi, thử lại có kiểm soát.
- API 500: thông báo server lỗi, cho phép retry.
- API 404: báo tài nguyên không tồn tại.
- API 429: tạm khóa nút, backoff trước khi thử lại.
- Timeout: dùng `AbortController`.
- Retry: chỉ retry với lỗi mạng hoặc timeout.

## C2 - Promise Methods

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|---|---|---|---|
| `.all()` | Khi tất cả fulfilled | Khi 1 promise reject | Cần toàn bộ dữ liệu |
| `.allSettled()` | Khi tất cả settled | Không reject | Dashboard nhiều widget |
| `.race()` | Khi promise đầu tiên settled | Khi promise đầu tiên reject | Timeout / chọn nguồn nhanh nhất |
| `.any()` | Khi promise đầu tiên fulfilled | Khi tất cả reject | Fallback nhiều nguồn |
