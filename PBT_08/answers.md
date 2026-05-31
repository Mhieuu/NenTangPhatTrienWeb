# PBT 08 - Answers

## A1 - Function Declaration vs Expression vs Arrow

Ba cách viết cùng hàm `tinhThueBaoHiem(luong)`:

```javascript
function tinhThueBaoHiemDecl(luong) { /* ... */ }

const tinhThueBaoHiemExpr = function (luong) { /* ... */ };

const tinhThueBaoHiemArrow = (luong) => { /* ... */ };
```

Hoisting:
- Function declaration được hoist đầy đủ, có thể gọi trước khi khai báo.
- Function expression và arrow function gán vào biến, biến có hoisting nhưng không khởi tạo giá trị hàm trước dòng khai báo.

## A2 - Scope & Closure

Đoạn 1:

- `1`
- `2`
- `3`
- `2`
- `2`

Đoạn 2:

- `var:` in ra `3` ba lần
- `let:` in ra `0`, `1`, `2`

Lý do: `var` dùng chung một binding trong toàn bộ function scope, còn `let` tạo binding riêng cho mỗi vòng lặp.

## A3 - Array Methods

1. `nums.filter(n => n % 2 === 0)`
2. `nums.map(n => n * 3)`
3. `nums.reduce((sum, n) => sum + n, 0)`
4. `nums.find(n => n > 7)`
5. `nums.some(n => n > 10)`
6. `nums.every(n => n > 0)`
7. `nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`)`
8. `[...nums].reverse()`

## A4 - Object Destructuring & Spread

- `console.log(name, price, ram, color);` → `iPhone 16 25990000 8 Titan`
- `console.log(specs);` → `ReferenceError` vì không có biến `specs` được tạo.
- `updated.price` → `23990000`
- `updated.sale` → `true`
- `product.price` → `25990000`
- `product.specs.ram` → `16`

`{ ...product }` là shallow copy nên object lồng bên trong vẫn dùng chung reference.

## C1 - Refactor Code

Đã refactor bằng `filter`, `map`, `sort`, destructuring và arrow functions trong file `higher_order.js` / có thể áp dụng cùng style cho processing functions.

## C2 - miniArray API

Đã thiết kế file `miniArray` theo API tự viết, tương thích với `map`, `filter`, `reduce`.
