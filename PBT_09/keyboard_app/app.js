const images = [
  "https://placehold.co/800x800/1d4ed8/ffffff?text=1",
  "https://placehold.co/800x800/0f766e/ffffff?text=2",
  "https://placehold.co/800x800/7c3aed/ffffff?text=3",
  "https://placehold.co/800x800/b91c1c/ffffff?text=4",
  "https://placehold.co/800x800/ea580c/ffffff?text=5",
  "https://placehold.co/800x800/15803d/ffffff?text=6",
  "https://placehold.co/800x800/334155/ffffff?text=7",
  "https://placehold.co/800x800/0f172a/ffffff?text=8",
  "https://placehold.co/800x800/4b5563/ffffff?text=9",
];

const commands = [
  { label: "Open first image", action: () => openLightbox(0) },
  { label: "Start slideshow", action: () => startSlideshow() },
  { label: "Stop slideshow", action: () => stopSlideshow() },
  { label: "Go to previous image", action: () => showImage(currentIndex - 1) },
  { label: "Go to next image", action: () => showImage(currentIndex + 1) },
];

const gallery = document.querySelector("#gallery");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");
const closeLightbox = document.querySelector("#closeLightbox");
const paletteButton = document.querySelector("#paletteButton");
const paletteOverlay = document.querySelector("#paletteOverlay");
const paletteInput = document.querySelector("#paletteInput");
const paletteList = document.querySelector("#paletteList");

let currentIndex = 0;
let slideTimer = null;
let isPlaying = false;
let commandIndex = 0;

function renderGallery() {
  const fragment = document.createDocumentFragment();
  images.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Open image ${index + 1}`);
    button.dataset.index = String(index);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Image ${index + 1}`;

    button.appendChild(img);
    button.addEventListener("click", () => openLightbox(index));
    fragment.appendChild(button);
  });
  gallery.appendChild(fragment);
}

function showImage(index) {
  currentIndex = (index + images.length) % images.length;
  openLightbox(currentIndex);
}

function openLightbox(index) {
  currentIndex = (index + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
  lightbox.classList.remove("hidden");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightboxModal() {
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
}

function startSlideshow() {
  if (isPlaying) return;
  isPlaying = true;
  slideTimer = setInterval(() => showImage(currentIndex + 1), 1500);
}

function stopSlideshow() {
  isPlaying = false;
  clearInterval(slideTimer);
  slideTimer = null;
}

function toggleSlideshow() {
  if (isPlaying) stopSlideshow();
  else startSlideshow();
}

function renderCommands(filter = "") {
  paletteList.textContent = "";
  const visible = commands.filter((command) => command.label.toLowerCase().includes(filter.toLowerCase()));

  visible.forEach((command, index) => {
    const item = document.createElement("li");
    item.tabIndex = 0;
    item.textContent = command.label;
    item.classList.toggle("active", index === commandIndex);
    item.addEventListener("click", () => {
      command.action();
      closePalette();
    });
    paletteList.appendChild(item);
  });
}

function openPalette() {
  paletteOverlay.classList.remove("hidden");
  paletteOverlay.setAttribute("aria-hidden", "false");
  paletteInput.value = "";
  commandIndex = 0;
  renderCommands("");
  paletteInput.focus();
}

function closePalette() {
  paletteOverlay.classList.add("hidden");
  paletteOverlay.setAttribute("aria-hidden", "true");
}

paletteButton.addEventListener("click", openPalette);
closeLightbox.addEventListener("click", closeLightboxModal);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightboxModal();
});

paletteInput.addEventListener("input", () => renderCommands(paletteInput.value));
paletteInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePalette();
  if (event.key === "Enter") {
    const visible = commands.filter((command) => command.label.toLowerCase().includes(paletteInput.value.toLowerCase()));
    if (visible[commandIndex]) visible[commandIndex].action();
    closePalette();
  }
  if (event.key === "ArrowDown") {
    commandIndex = Math.min(commandIndex + 1, paletteList.children.length - 1);
    renderCommands(paletteInput.value);
  }
  if (event.key === "ArrowUp") {
    commandIndex = Math.max(commandIndex - 1, 0);
    renderCommands(paletteInput.value);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openPalette();
    return;
  }

  if (event.key === "ArrowRight") showImage(currentIndex + 1);
  if (event.key === "ArrowLeft") showImage(currentIndex - 1);
  if (event.key >= "1" && event.key <= "9") showImage(Number(event.key) - 1);
  if (event.key === " ") {
    event.preventDefault();
    toggleSlideshow();
  }
  if (event.key === "Escape") {
    closeLightboxModal();
    closePalette();
    stopSlideshow();
  }
});

renderGallery();
renderCommands("");
