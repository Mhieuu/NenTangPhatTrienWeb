function formatMoney(value) {
  return value.toLocaleString("vi-VN") + "đ";
}

function calculateRestaurantBill(items, weekday = "Wednesday", tipPercent = 5) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discountRate = 0;

  if (subtotal > 1_000_000) {
    discountRate = 0.15;
  } else if (subtotal > 500_000) {
    discountRate = 0.1;
  }

  if (weekday === "Wednesday") {
    discountRate += 0.05;
  }

  const discount = subtotal * discountRate;
  const afterDiscount = subtotal - discount;
  const vat = afterDiscount * 0.08;
  const tip = tipPercent > 0 ? afterDiscount * (tipPercent / 100) : 0;
  const total = afterDiscount + vat + tip;

  console.log("╔══════════════════════════════════════╗");
  console.log("║        HÓA ĐƠN NHÀ HÀNG             ║");
  console.log("╠══════════════════════════════════════╣");

  items.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    console.log(`║ ${String(index + 1).padEnd(2)} ${item.name.padEnd(12)} x${String(item.quantity).padEnd(2)} @${formatMoney(item.price).padEnd(10)} = ${formatMoney(lineTotal).padEnd(10)} ║`);
  });

  console.log("╠══════════════════════════════════════╣");
  console.log(`║ Tổng cộng: ${formatMoney(subtotal).padStart(24)} ║`);
  console.log(`║ Giảm giá (${Math.round(discountRate * 100)}%): ${formatMoney(discount).padStart(20)} ║`);
  console.log(`║ VAT (8%): ${formatMoney(vat).padStart(24)} ║`);
  console.log(`║ Tip (${tipPercent}%): ${formatMoney(tip).padStart(22)} ║`);
  console.log("╠══════════════════════════════════════╣");
  console.log(`║ THANH TOÁN: ${formatMoney(total).padStart(22)} ║`);
  console.log("╚══════════════════════════════════════╝");
}

calculateRestaurantBill([
  { name: "Phở bò", price: 65000, quantity: 2 },
  { name: "Trà đá", price: 5000, quantity: 3 },
  { name: "Bún chả", price: 55000, quantity: 1 },
]);
