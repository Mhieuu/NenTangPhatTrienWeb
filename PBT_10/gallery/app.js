const gallery = document.querySelector("#gallery");
const loadingMore = document.querySelector("#loadingMore");
const loadTrigger = document.querySelector("#loadTrigger");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeLightbox = document.querySelector("#closeLightbox");

let page = 1;
let isLoading = false;

function createCard(photo) {
  const card = document.createElement("article");
  card.className = "card";

  const img = document.createElement("img");
  img.alt = photo.title;
  img.dataset.src = photo.thumbnailUrl;
  img.dataset.full = photo.url;

  card.appendChild(img);
  card.addEventListener("click", () => {
    lightboxImage.src = photo.url;
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
  });
  return card;
}

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    img.src = img.dataset.src;
    observer.unobserve(img);
  });
}, { rootMargin: "120px" });

function observeImages() {
  document.querySelectorAll("img[data-src]").forEach((img) => imageObserver.observe(img));
}

async function loadMorePhotos() {
  if (isLoading) return;
  isLoading = true;
  loadingMore.classList.remove("hidden");
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const photos = await response.json();
    const fragment = document.createDocumentFragment();
    photos.forEach((photo) => fragment.appendChild(createCard(photo)));
    gallery.appendChild(fragment);
    observeImages();
    page += 1;
  } catch (error) {
    loadingMore.textContent = `Lỗi tải ảnh: ${error.message}`;
  } finally {
    isLoading = false;
    loadingMore.classList.add("hidden");
  }
}

const infiniteObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMorePhotos();
}, { rootMargin: "300px" });

closeLightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
});
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
  }
});

loadMorePhotos();
infiniteObserver.observe(loadTrigger);
