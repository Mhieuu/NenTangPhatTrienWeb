# PBT 09 - Answers

## A1 - DOM Tree

DOM tree: `#app` → `header` → `h1` + `nav` → `a.active`, `a`, `a`; và `main` → `form#todoForm` + `ul#todoList` → `li.todo-item`, `li.todo-item.completed`.

Selectors:

```javascript
document.querySelector("h1");
document.querySelector("#todoForm input");
document.querySelectorAll(".todo-item");
document.querySelector("nav a.active");
document.querySelector("#todoList li:first-child");
document.querySelectorAll("nav a");
```

## A2 - innerHTML vs textContent

- `textContent` chỉ nhận text thuần, an toàn hơn cho dữ liệu user.
- `innerHTML` parse HTML, tiện khi cần render markup nhưng có rủi ro XSS nếu chèn input chưa lọc.

Ví dụ sửa XSS:

```javascript
document.querySelector("#result").textContent = userInput;
```

## A3 - Event Bubbling

Output khi click button: `BUTTON`, `INNER`, `OUTER`.

Nếu gọi `stopPropagation()` trong button handler, output chỉ còn `BUTTON`.

## C1 - Debug DOM Code

Các lỗi chính:

- Dùng `addEventListener("onclick", ...)` sai, phải là `"click"`.
- `countDisplay = count;` phải là `countDisplay.textContent = count;`.
- `historyList.innerHTML = null;` nên là `""`.
- `item.remove;` phải là `item.remove()`.
- `count = localStorage.getItem("count")` trả string, cần ép số.
- Nên dùng `textContent` cho count thay vì `innerHTML`.
- `deleteHistory(this)` có thể thay bằng `li.remove()` trực tiếp.

## C2 - Performance

Bind 1000 listener riêng lẻ làm tăng memory, khó quản lý và chậm khi update DOM. Event Delegation chỉ bind một listener ở cha, dựa vào bubbling để xử lý con.

`DocumentFragment` gom node vào bộ nhớ trước, sau đó append một lần nên chỉ gây một lần reflow/repaint lớn thay vì 1000 lần.
