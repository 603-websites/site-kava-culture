# The Spot Nashua — Client Website

## What This Is

Static HTML/CSS/JS website for **The Spot** — a kava bar and live music venue at 217 Main Street, Nashua, NH. Client site for Mike (The Spot owner).

- **Live URL:** https://thespotnashua.com
- **Client of:** [Website Upgraders](https://www.websiteupgraderpro.com) (603 Websites / Sader & Carter Web Design)
- **GitHub Org:** [603-websites](https://github.com/603-websites)

## Architecture — READ THIS FIRST

This site is one piece of a larger system:

### Two Systems

1. **SaaS Dashboard (portfolio-showcase repo)** — manages clients, billing, analytics, content editing, newsletter, bookings. Deployed on **Railway** (Dockerized Next.js). URL: `https://www.websiteupgraderpro.com`
2. **Client Sites (like this repo)** — individual static websites per client. Deployed on **Vercel** (free tier, CDN). Separate repos.

### Infrastructure

| Layer | Technology | Location |
|-------|-----------|----------|
| Client sites | Static HTML/CSS/JS | **Vercel** |
| SaaS dashboard | Next.js 15 + Prisma | **Railway** |
| Database | PostgreSQL | **Railway** |
| Email | Resend | Via dashboard API |
| Analytics | Custom (dashboard API) | **Railway** |

**We do NOT use Supabase.** The entire backend (database, API, auth) runs on Railway via the portfolio-showcase repo.

### How This Site Connects to the Backend

- **Client ID:** `d7a73501-80d7-4708-a92d-02a3aedc9836`
- **API Base:** `https://websiteupgraderpro.com`
- `js/analytics.js` sends page views, newsletter signups, and form submissions to the dashboard API
- Newsletter signups POST to `/api/newsletter/subscribe`
- Booking requests POST to `/api/booking/request`
- All data is scoped by `clientId` in the shared PostgreSQL database

## Tech Stack (This Site)

- **Pure HTML/CSS/JS** — no framework, no build tools, no npm
- **Fonts:** Norwester (display), Roboto Condensed (body), Arizonia (script accents)
- **Design tokens:** `--teal-primary: #89E3EB`, `--teal-link: #42AFB9`, `--teal-deep: #0F272E`
- **No real images** — all visuals are inline SVG illustrations and CSS gradients (placeholders)

## Project Structure

```
index.html              # Homepage (hero slider, mission, elixirs, gallery, map, Instagram)
css/styles.css          # All site styles
js/main.js              # Nav, slider, typewriter, scroll animations, form handlers
js/analytics.js         # Analytics + newsletter tracking (posts to websiteupgraderpro.com)
pages/
  about.html            # About Us
  blog.html             # Blog (placeholder posts)
  book-a-spot.html      # Band booking request form
  contact.html          # Contact form + info
  events.html           # Upcoming events (hardcoded)
  franchising.html      # Legacy page (still has old Kava Culture branding)
  locations.html        # Location detail
  menu.html             # Drink/food menu
```

## Pages

Each page copy-pastes the full header/nav/footer (no shared template). When updating nav links or footer content, **update ALL HTML files**.

## Commands

No build step. Just open `index.html` in a browser or serve with any static server:
```bash
npx serve .              # Quick local server
python3 -m http.server   # Alternative
```

## Rules

- Never commit API keys or client secrets
- When adding/modifying nav links, update ALL HTML files (header + nav are duplicated)
- Match the existing design language: teal theme, wave dividers, scroll animations
- All form submissions should POST to `websiteupgraderpro.com/api/...` with the correct `clientId`
- This site has NO backend of its own — all dynamic functionality goes through the SaaS dashboard API
- The `franchising.html` page is a leftover from the Kava Culture rebrand and needs cleanup

## Team

- **Louis Sader** (`louissader`) — developer
- **Logan Carter** (`Logan566C`) — developer
- **Mike** — client / venue owner
