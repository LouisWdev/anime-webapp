# ⚔️ ZetsuNami — Anime & Manga Portfolio

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-✓-FF0055?style=flat-square&logo=framer&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-✓-orange?style=flat-square)

A **visually stunning anime & manga portfolio showcase** built as a software engineering portfolio project. Features a cyberpunk/neon aesthetic with dark themes, glowing effects, and Japanese typography accents.

---

## ✨ Features

- **25 curated entries** — spanning iconic anime & manga from 1989–2022
- **Full-text search** — searches titles, Japanese titles, synopsis, and tags
- **Multi-filter panel** — filter by type, genre, status, year, and minimum rating
- **Sort options** — by rating, year, title (ascending/descending)
- **Favorites system** — persistent via `localStorage` (survives page refresh)
- **Detail pages** — full synopsis, stats, genre badges, related recommendations
- **Responsive grid** — 2 → 6 columns adapting to screen size
- **Cyberpunk UI** — neon pink/blue/purple palette on near-black backgrounds
- **Smooth animations** — Framer Motion page transitions, hover glows, stagger reveals
- **Glassmorphism navbar** — sticky with backdrop blur
- **Custom neon scrollbar** & text selection highlight

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 3 + custom neon palette |
| Animation | Framer Motion |
| Routing | React Router v6 |
| State | Zustand (with `persist` for favorites) |
| UI Primitives | Radix UI Slot + custom components |
| Icons | Lucide React |
| Fonts | Inter · JetBrains Mono · Noto Sans JP |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/          # Button, Badge, Input
│   ├── layout/      # Navbar, Footer, Layout
│   ├── anime/       # AnimeCard, AnimeGrid, RatingStars, FavoriteButton
│   └── search/      # SearchBar, FilterPanel
├── pages/
│   ├── HomePage.tsx      # Hero + featured grid + stats
│   ├── BrowsePage.tsx    # Full searchable/filterable collection
│   ├── DetailPage.tsx    # Entry detail view with related picks
│   └── FavoritesPage.tsx # Saved favorites (localStorage)
├── data/
│   └── anime.json    # 25 curated entries
├── store/
│   ├── useFavoritesStore.ts  # Zustand + localStorage persist
│   └── useFilterStore.ts     # Search/filter state
├── types/index.ts    # All TypeScript interfaces & unions
├── hooks/
│   └── useSearch.ts  # Filter/sort pipeline hook
└── lib/utils.ts      # cn(), getGenreColor(), formatRating()
```

---

## 🎨 Color Palette

| Name | Hex | Usage |
|---|---|---|
| `neon-pink` | `#ff0080` | Primary accent, CTAs, favorites |
| `neon-blue` | `#00d4ff` | Anime type badge, focus rings |
| `neon-purple` | `#bf5af2` | Manga type badge, gradients |
| `neon-green` | `#39ff14` | Positive indicators |
| `void` | `#050508` | Page background |
| `dark-card` | `#111122` | Card backgrounds |

---

## 📊 Data

25 entries across anime and manga, including:

**Anime** — Attack on Titan, FMA Brotherhood, Death Note, Demon Slayer, Steins;Gate, Evangelion, Hunter x Hunter, Code Geass, Vinland Saga, Jujutsu Kaisen, Re:Zero, One Punch Man, Violet Evergarden, Your Lie in April, Chainsaw Man, My Hero Academia, Mob Psycho 100

**Manga** — Berserk, Vagabond, Monster, Oyasumi Punpun, Slam Dunk, Tokyo Ghoul, Nana, Claymore

Each entry includes: title, Japanese title, type, genres, year, rating (1–10), synopsis, cover image, episode/chapter counts, status, studio/author, and searchable tags.

---

## 🤝 Credits

Built by the **ZetsuNami Squad** — a multi-agent engineering team:
- **Team Lead** — Architecture & coordination
- **UX/UI Designer** — Components, neon theme, animations
- **Frontend Engineer** — Pages, routing, state hooks
- **Data Engineer** — Content curation, types, stores
- **QA & Optimizer** — TypeScript audit, fixes, build verification

---

*ポートフォリオ · Portfolio Showcase · Built with React + Vite + Tailwind*
