# Validation & W3 instructions for PBT_04

Serve the folder and open pages to test layout and take screenshots (DevTools if needed).

PowerShell:
```powershell
cd d:\GitHub\PBT\PBT_04
python -m http.server 8002
```

Pages to check:
- `http://localhost:8002/positioning.html` — test fixed header, sticky sidebar, badge
- `http://localhost:8002/flexbox_layout.html` — test navbar + product cards
- `http://localhost:8002/grid_layout.html` — test grid layout and responsiveness

Save screenshots into `PBT_04/screenshots/`.
