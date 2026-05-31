# PBT 07 - Answers

## A1 - var / let / const

1. `console.log(x); var x = 5;` → `undefined`
2. `console.log(y); let y = 10;` → `ReferenceError`
3. `const z = 15; z = 20;` → `TypeError`
4. `const arr = [1, 2, 3]; arr.push(4);` → `[1, 2, 3, 4]`
5. Block scope:

```text
Trong block: 2
Ngoài block: 1
```

## A2 - Data Types & Coercion

- `typeof null` → `object`
- `typeof undefined` → `undefined`
- `typeof NaN` → `number`
- `"5" + 3` → `"53"`
- `"5" - 3` → `2`
- `"5" * "3"` → `15`
- `true + true` → `2`
- `[] + []` → `""`
- `[] + {}` → `"[object Object]"`
- `{}` + [] trong `console.log({} + [])` → `"[object Object]"`

`+` ưu tiên nối chuỗi khi có string, còn `-` luôn ép sang number.

## A3 - == vs ===

- `5 == "5"` → `true`
- `5 === "5"` → `false`
- `null == undefined` → `true`
- `null === undefined` → `false`
- `NaN == NaN` → `false`
- `0 == false` → `true`
- `0 === false` → `false`
- `"" == false` → `true`

Nên dùng `===` vì không ép kiểu ngầm, dễ đọc và ít bug hơn.

## A4 - Truthy & Falsy

Falsy values:

- `false`
- `0`
- `-0`
- `0n`
- `""`
- `null`
- `undefined`
- `NaN`

Kết quả:

- `"0"` → in `A`
- `""` → không in
- `[]` → in `C`
- `{}` → in `D`
- `null` → không in
- `0` → không in
- `-1` → in `G`
- `" "` → in `H`

## A5 - Template Literals

```javascript
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
const html = `<div class="card">
  <h2>${title}</h2>
  <p>${description}</p>
  <span>Giá: ${price}đ</span>
</div>`;
```

## C1 - Debug JavaScript

Lỗi chính:

- `if (giaSauGiam = 0)` dùng phép gán thay vì so sánh. Sửa thành `=== 0`.
- `giaBan` có thể là string, nên ép số và validate đầu vào.
- Dùng `var` trong vòng lặp `setTimeout` tạo bug closure, vì tất cả callback thấy cùng một biến `i` cuối cùng. Sửa bằng `let`.

## C2 - Bài toán thực tế

Đã triển khai file `restaurant_bill.js` để tính giảm giá theo tổng, thứ trong tuần, VAT và tip.
