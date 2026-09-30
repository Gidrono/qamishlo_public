# Qamishlo

Public landing page for **Qamishlo** — a hands-free audio learning app.

Type a topic, get a short multi-chapter AI-narrated audio course, and listen on the train, in the car, or on a walk. Pause anytime and ask questions by voice. Age bands for families (5–9, 10–14) and adults (15+), family sharing, offline downloads, and a lock-screen player.

Visual design tracks the product app (sage/mint, Fraunces, wheel+book mark, desert vista). Fonts are self-hosted under `fonts/` (SIL OFL).

Hosted on **GitHub Pages**. Pushes to `main` publish automatically.

- Site: [https://qamishlo.org](https://qamishlo.org)
- Also: [https://www.qamishlo.org](https://www.qamishlo.org)

## DNS (Azure DNS)

The zone `qamishlo.org` is in resource group `rg-qamishlo-web` (ImprovMX MX/SPF preserved).

- Apex `A` / `AAAA` → GitHub Pages
- `www` `CNAME` → `Gidrono.github.io`
- Mail via ImprovMX (unchanged)

Open `index.html` in a browser, or serve the repo root with any static host.
