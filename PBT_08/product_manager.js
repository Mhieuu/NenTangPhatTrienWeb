const products = [
  { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
  { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
  { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
  { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
  { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
  { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
  { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
  { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
  { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
  { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 },
];

const formatPrice = (value) => value.toLocaleString("vi-VN") + "đ";

function getInStock(list) {
  return list.filter((product) => product.stock > 0);
}

function filterProducts(list, category, minPrice, maxPrice) {
  return list.filter(
    (product) =>
      product.category === category &&
      product.price >= minPrice &&
      product.price <= maxPrice,
  );
}

function sortByPrice(list, order = "asc") {
  return [...list].sort((a, b) => (order === "asc" ? a.price - b.price : b.price - a.price));
}

function cheapestByCategory(list) {
  return list.reduce((result, product) => {
    const current = result[product.category];
    if (!current || product.price < current.price) {
      result[product.category] = product;
    }
    return result;
  }, {});
}

function totalInventoryValue(list) {
  return list.reduce((sum, product) => sum + product.price * product.stock, 0);
}

function formatProductList(list) {
  return list.map((product) => ({
    name: product.name,
    formattedPrice: formatPrice(product.price),
  }));
}

function averageRating(list) {
  return list.reduce((sum, product) => sum + product.rating, 0) / list.length;
}

function searchProducts(list, keyword) {
  const lowerKeyword = keyword.toLowerCase();
  return list.filter((product) => product.name.toLowerCase().includes(lowerKeyword));
}

console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString("vi-VN") + "đ");
