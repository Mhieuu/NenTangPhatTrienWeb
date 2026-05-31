function createCart() {
  let items = [];
  let discountValue = 0;

  function getSubtotal() {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function formatMoney(value) {
    return value.toLocaleString("vi-VN");
  }

  return {
    addItem(product, quantity = 1) {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
        return;
      }
      items.push({ ...product, quantity });
    },

    removeItem(productId) {
      items = items.filter((item) => item.id !== productId);
    },

    updateQuantity(productId, newQuantity) {
      items = items
        .map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
        .filter((item) => item.quantity > 0);
    },

    getTotal() {
      const subtotal = getSubtotal();
      return Math.max(0, subtotal - discountValue);
    },

    applyDiscount(code) {
      const subtotal = getSubtotal();
      if (code === "SALE10") discountValue = subtotal * 0.1;
      else if (code === "SALE20") discountValue = subtotal * 0.2;
      else if (code === "FREESHIP") discountValue = 30000;
      else discountValue = 0;
      return this.getTotal();
    },

    printCart() {
      const subtotal = getSubtotal();
      console.log("┌──────────────────────────────────────────────┐");
      console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
      console.log("├──────────────────────────────────────────────┤");

      items.forEach((item, index) => {
        const lineTotal = item.price * item.quantity;
        console.log(
          `│ ${String(index + 1).padEnd(1)} │ ${item.name.padEnd(13)} │ ${String(item.quantity).padStart(2)} │ ${formatMoney(item.price).padStart(10)} │ ${formatMoney(lineTotal).padStart(11)} │`,
        );
      });

      console.log("├──────────────────────────────────────────────┤");
      console.log(`│ Tổng cộng:${formatMoney(this.getTotal()).padStart(29)}đ │`);
      console.log("└──────────────────────────────────────────────┘");
      return { subtotal, discountValue, total: this.getTotal() };
    },

    getItemCount() {
      return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    clearCart() {
      items = [];
      discountValue = 0;
    },
  };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();
cart.applyDiscount("SALE10");
cart.printCart();
console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());
