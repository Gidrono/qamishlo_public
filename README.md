# Qamishlo

Public landing page for **Qamishlo** - a hands-free audio learning app for commuters.

Visual design tracks the product app (sage/mint, Fraunces, wheel+book mark, desert vista).

Hosted on **GitHub Pages**. Pushes to `main` publish automatically.

- Site: [https://qamishlo.org](https://qamishlo.org)
- Also: [https://www.qamishlo.org](https://www.qamishlo.org)

## DNS (Azure DNS)

The zone `qamishlo.org` is in resource group `rg-qamishlo-web` (ImprovMX MX/SPF preserved).

- Apex `A` / `AAAA` → GitHub Pages
- `www` `CNAME` → `Gidrono.github.io`
- Mail via ImprovMX (unchanged)

Open `index.html` in a browser, or serve the repo root with any static host.
