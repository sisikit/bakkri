# Birthday CTF | Off-Grid Dev Runtime

A cinematic single-page birthday gift and puzzle journey built with **React** and **Vite**, featuring interactive CTF challenges and immersive UI.

> **Originally bootstrapped with Next.js, now converted to Vite + React** for a lighter, faster dev experience while maintaining all UI and game logic.

## Getting Started

### Prerequisites
- Node.js 16+
- npm (or yarn/pnpm)

### Installation & Development

```bash
npm install
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) with your browser to see the app. The page auto-updates as you edit files.

You can start editing components in `src/components/` or the root `App` in `src/App.tsx`.

### Available Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
npm run test     # Run Vitest
npm run check    # Type-check with tsc + lint
```

## Tech Stack

- **React 19** — UI framework
- **Vite 5** — Build tool & dev server
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Zustand** — State management
- **Vitest** — Testing
- **Lucide React** — Icons

## Project Structure

```
src/
├── components/game/        # Game UI components & stages
├── hooks/                  # Custom React hooks
├── store/                  # Zustand store (state management)
├── utils/                  # Helpers & validators
├── App.tsx                 # Root component
├── main.tsx                # React entry point
└── globals.css             # Global styles
index.html                  # HTML entry point
vite.config.ts              # Vite configuration
```

## Features

- **Interactive CTF Challenges** — 7-stage puzzle journey
- **Responsive Design** — Tailored for desktop & mobile
- **Audio Rewards** — Easter eggs unlocked by solving puzzles
- **Game State Persistence** — Progress saved in browser
- **Themed Visuals** — Dynamic theme switching per stage

## Learn More

- [Vite Documentation](https://vitejs.dev/) — Build tool & dev server
- [React Documentation](https://react.dev/) — UI library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Zustand](https://github.com/pmndrs/zustand) — State management

## Deployment

Build the project for production:

```bash
npm run build
```

The `dist/` folder is production-ready and can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

Example Vercel deployment:

```bash
vercel deploy
```

Refer to [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html) for platform-specific instructions.
