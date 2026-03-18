# Copilot Instructions for ChiXue

## Project Overview

ChiXue is a mobile-first web application for booking Traditional Chinese Medicine (TCM) therapies. It features therapy browsing, professional profiles, appointment booking, and AI-powered symptom-to-therapy matching via the Google Gemini API. The UI language is Brazilian Portuguese (pt-BR).

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build tool**: Vite 7
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite` plugin) — all styles are applied as inline Tailwind utility classes, no separate CSS files per component
- **Icons**: Lucide React
- **Runtime**: Node.js with ES Modules (`"type": "module"`)

## Build and Development Commands

- `npm install` — install dependencies (always run before building)
- `npm run dev` — start the Vite development server
- `npm run build` — compile TypeScript (`tsc`) then build with Vite for production
- `npm run preview` — preview the production build locally

There is no test runner, linter, or formatter configured in this project.

## Project Structure

```
/
├── index.html              # HTML entry point (lang="pt-BR")
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config (strict: false, target: ES2020, jsx: react-jsx)
├── vite.config.ts          # Vite config with React and Tailwind CSS plugins
└── src/
    ├── main.tsx            # React entry point — mounts <App /> in StrictMode
    ├── index.css           # Global styles — only contains `@import "tailwindcss"`
    └── App.tsx             # Main application component (all UI logic in one file)
```

## Architecture

The app is a single-file architecture: `src/App.tsx` contains all views, components, mock data, and state management. Views are rendered via conditional logic based on a `view` state variable (e.g., `"home"`, `"profile"`, `"booking"`, `"success"`, `"discover"`, `"appointments"`, `"user-profile"`, `"ai-match"`).

Key patterns in `App.tsx`:
- **Mock data** constants at the top (`THERAPIES`, `PROFESSIONALS`, `DATES`, `TIMES`, `MOCK_APPOINTMENTS`)
- **Utility function** `fetchWithRetry` for API calls with exponential backoff
- **Render functions** (`renderHome`, `renderProfile`, `renderBooking`, etc.) for each view
- **State management** via React `useState` hooks
- **AI integration** via Google Gemini 2.5 Flash API in `analyzeSymptoms()`
- **Bottom navigation bar** with four tabs: Home, Discover, Appointments, Profile

## Coding Conventions

- Use **TypeScript** for all source files (`.tsx` / `.ts`)
- Use **Tailwind CSS utility classes** exclusively for styling — do not create separate CSS files
- Use **Lucide React** for icons
- Write UI text in **Brazilian Portuguese (pt-BR)**
- The app renders inside a mock phone frame (390px wide) on desktop and full-width on mobile
- Use `active:scale-[0.98]` for tap feedback on interactive elements
