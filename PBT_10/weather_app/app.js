const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const loading = document.querySelector("#loading");
const errorBox = document.querySelector("#error");
const result = document.querySelector("#weatherResult");
const historyEl = document.querySelector("#history");

let history = JSON.parse(localStorage.getItem("weatherHistory") || "[]");

function saveHistory(city) {
  history = [city, ...history.filter((item) => item.toLowerCase() !== city.toLowerCase())].slice(0, 5);
  localStorage.setItem("weatherHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyEl.textContent = "";
  history.forEach((city) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = city;
    button.addEventListener("click", () => {
      cityInput.value = city;
      loadWeather(city);
    });
    historyEl.appendChild(button);
  });
}

function setState({ isLoading = false, error = "", data = null } = {}) {
  loading.classList.toggle("hidden", !isLoading);
  errorBox.classList.toggle("hidden", !error);
  errorBox.textContent = error;
  result.classList.toggle("hidden", !data);
  if (data) {
    result.textContent = "";
    const title = document.createElement("h2");
    title.textContent = data.city;
    const icon = document.createElement("img");
    icon.src = data.icon;
    icon.alt = data.description;
    const temp = document.createElement("p");
    temp.textContent = `Nhiệt độ: ${data.temp}°C`;
    const humidity = document.createElement("p");
    humidity.textContent = `Độ ẩm: ${data.humidity}%`;
    const description = document.createElement("p");
    description.textContent = `Mô tả: ${data.description}`;
    result.append(title, icon, temp, humidity, description);
  }
}

async function loadWeather(city) {
  if (!city.trim()) return;
  setState({ isLoading: true });
  try {
    const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const current = data.current_condition?.[0];
    if (!current) throw new Error("Không có dữ liệu thời tiết");
    const payload = {
      city,
      temp: current.temp_C,
      humidity: current.humidity,
      description: current.weatherDesc?.[0]?.value || "Unknown",
      icon: current.weatherIconUrl?.[0]?.value || "https://placehold.co/72x72",
    };
    setState({ data: payload });
    saveHistory(city);
  } catch (error) {
    setState({ error: `Lỗi: ${error.message}` });
  }
}

searchBtn.addEventListener("click", () => loadWeather(cityInput.value));
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loadWeather(cityInput.value);
});

renderHistory();
loadWeather(cityInput.value || "Hanoi");
