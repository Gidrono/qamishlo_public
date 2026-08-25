# Qamishlo

Public landing page for **Qamishlo** — a hands-free audio learning app for commuters.

Visual design tracks the product app (sage/mint, Fraunces, wheel+book mark, desert vista).

Hosted on **Azure Static Web Apps** (Free). Pushes to `main` deploy automatically.

- Azure default (live now): [https://delightful-field-0a3556c0f.7.azurestaticapps.net](https://delightful-field-0a3556c0f.7.azurestaticapps.net)
- Production hostname: [https://qamishlo.org](https://qamishlo.org) after DNS nameservers point at Azure

## DNS (GoDaddy → Azure DNS)

The zone `qamishlo.org` is in resource group `rg-qamishlo-web` (ImprovMX MX/SPF preserved, apex alias + `www` CNAME to the Static Web App).

In GoDaddy, set the domain nameservers to:

- `ns1-06.azure-dns.com`
- `ns2-06.azure-dns.net`
- `ns3-06.azure-dns.org`
- `ns4-06.azure-dns.info`

Leave GitHub Pages on until `https://qamishlo.org` serves the Azure site, then make this repo private and disable Pages.

Open `index.html` in a browser, or serve the repo root with any static host.
