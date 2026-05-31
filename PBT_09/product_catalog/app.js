const products = [
  { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/400x400", rating: 4.5, inStock: true },
  { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/400x400", rating: 4.8, inStock: true },
  { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://placehold.co/400x400", rating: 4.3, inStock: true },
  { id: 4, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/400x400", rating: 4.6, inStock: false },
  { id: 5, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/400x400", rating: 4.4, inStock: true },
  { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/400x400", rating: 4.7, inStock: true },
  { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", image: "https://placehold.co/400x400", rating: 4.1, inStock: true },
  { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/400x400", rating: 4.2, inStock: true },
  { id: 9, name: "Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/400x400", rating: 4.6, inStock: true },
  { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", image: "https://placehold.co/400x400", rating: 4.5, inStock: true },
  { id: 11, name: "Magic Mouse", price: 2290000, category: "accessory", image: "https://placehold.co/400x400", rating: 4.0, inStock: true },
  { id: 12, name: "Galaxy Tab S9", price: 18990000, category: "tablet", image: "https://placehold.co/400x400", rating: 4.7, inStock: true },
];

const state = {
  search: "",
  category: "all",
  sort: "featured",
  cartCount: 0,
};

const grid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const categoryButtons = document.querySelector("#categoryButtons");
const sortSelect = document.querySelector("#sortSelect");
const cartCount = document.querySelector("#cartCount");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector("#closeModal");
const themeToggle = document.querySelector("#themeToggle");

const categories = ["all", ...new Set(products.map((product) => product.category))];

function createCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;

  const body = document.createElement("div");
  body.className = "body";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const info = document.createElement("p");
  info.textContent = `${product.category} • ⭐ ${product.rating}`;

  const row = document.createElement("div");
  row.className = "row";

  const price = document.createElement("strong");
  price.textContent = product.price.toLocaleString("vi-VN") + "đ";

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Thêm giỏ";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    state.cartCount += 1;
    cartCount.textContent = state.cartCount;
  });

  row.append(price, button);
  body.append(title, info, row);
  card.append(image, body);

  card.addEventListener("click", () => openModal(product));
  return card;
}

function openModal(product) {
  modalBody.textContent = "";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;

  const title = document.createElement("h2");
  title.textContent = product.name;

  const description = document.createElement("p");
  description.textContent = `Danh mục: ${product.category} | Đánh giá: ${product.rating} | Tình trạng: ${product.inStock ? "Còn hàng" : "Hết hàng"}`;

  modalBody.append(image, title, description);
  modal.classList.remove("hidden");
}

function getFilteredProducts() {
  let result = [...products];

  if (state.category !== "all") {
    result = result.filter((product) => product.category === state.category);
  }

  if (state.search) {
    const keyword = state.search.toLowerCase();
    result = result.filter((product) => product.name.toLowerCase().includes(keyword));
  }

  switch (state.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "rating-desc":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      result.sort((a, b) => Number(b.inStock) - Number(a.inStock));
  }

  return result;
}

function renderProducts() {
  grid.textContent = "";
  const fragment = document.createDocumentFragment();
  getFilteredProducts().forEach((product) => fragment.appendChild(createCard(product)));
  grid.appendChild(fragment);
}

function renderCategories() {
  categoryButtons.textContent = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.dataset.category = category;
    button.classList.toggle("active", category === state.category);
    button.addEventListener("click", () => {
      state.category = category;
      renderCategories();
      renderProducts();
    });
    categoryButtons.appendChild(button);
  });
}

searchInput.addEventListener("input", () => {
  state.search = searchInput.value.trim();
  renderProducts();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  renderProducts();
});

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.add("hidden");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

renderCategories();
renderProducts();
