const usersWidget = document.querySelector("#usersWidget .body");
const weatherWidget = document.querySelector("#weatherWidget .body");
const countryWidget = document.querySelector("#countryWidget .body");
const timeInfo = document.querySelector("#timeInfo");
const refreshBtn = document.querySelector("#refreshBtn");

function renderLoading(widget) {
  widget.textContent = "";
  for (let index = 0; index < 3; index++) {
    const line = document.createElement("div");
    line.className = "skeleton";
    widget.appendChild(line);
  }
}

function renderWidget(widget, content) {
  widget.textContent = "";
  content.forEach((line) => {
    const p = document.createElement("div");
    p.className = "status";
    p.textContent = line;
    widget.appendChild(p);
  });
}

function renderWidgetError(widget, message) {
  widget.textContent = "";
  const p = document.createElement("div");
  p.className = "status error";
  p.textContent = message;
  widget.appendChild(p);
}

async function loadDashboard() {
  const startTime = Date.now();
  timeInfo.textContent = "Loading...";

  [usersWidget, weatherWidget, countryWidget].forEach(renderLoading);

  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/users").then((response) => response.json()),
    fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true").then((response) => response.json()),
    fetch("https://restcountries.com/v3.1/name/vietnam").then((response) => response.json()),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      if (index === 0) {
        renderWidget(usersWidget, result.value.slice(0, 4).map((user) => `${user.name} - ${user.email}`));
      } else if (index === 1) {
        renderWidget(weatherWidget, [`Temp: ${result.value.current_weather.temperature}°C`, `Wind: ${result.value.current_weather.windspeed} km/h`]);
      } else {
        const country = result.value[0];
        renderWidget(countryWidget, [`Country: ${country.name.common}`, `Capital: ${country.capital?.[0] || "N/A"}`, `Population: ${country.population.toLocaleString("vi-VN")}`]);
      }
    } else {
      const message = result.reason?.message || "Unknown error";
      if (index === 0) renderWidgetError(usersWidget, message);
      if (index === 1) renderWidgetError(weatherWidget, message);
      if (index === 2) renderWidgetError(countryWidget, message);
    }
  });

  timeInfo.textContent = `Data loaded in ${Date.now() - startTime} ms`;
}

refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
