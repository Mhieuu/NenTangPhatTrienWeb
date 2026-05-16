# Validation & W3C instructions for PBT_03

Serve folder `d:/GitHub/PBT/PBT_03` locally and open pages:

PowerShell:
```powershell
cd d:\GitHub\PBT\PBT_03
python -m http.server 8001
```

Pages to check:
- `http://localhost:8001/selectors_test.html`
- `http://localhost:8001/profile.html`
- `http://localhost:8001/boxmodel_lab.html`
- `http://localhost:8001/specificity.html`
- `http://localhost:8001/debug_layout.html`

Take screenshots (DevTools Computed tab for box model) and save under `screenshots/`.

Validate HTML via https://validator.w3.org/ (upload files or validate by URL).
