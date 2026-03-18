# Copilot Instructions for ChiXue

## Project Overview

ChiXue is a mobile-first web application for booking Traditional Chinese Medicine (TCM) therapies. It features therapy browsing, professional profiles, appointment booking, and AI-powered symptom-to-therapy matching via the Google Gemini API. The UI language is Brazilian Portuguese (pt-BR).

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build tool**: Vite 7
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite` plugin) — all styles are applied as inline Tailwind utility classes, no separate CSS files
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
├── index.html                  # HTML entry point (lang="pt-BR")
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript config (strict: false, target: ES2020, jsx: react-jsx)
├── vite.config.ts              # Vite config with React and Tailwind CSS plugins
└── src/
    ├── main.tsx                # React entry point — mounts <App /> in StrictMode
    ├── index.css               # Global styles — only contains `@import "tailwindcss"`
    ├── App.tsx                 # Root component — view routing, state management, layout shell
    ├── types.ts                # Shared TypeScript interfaces (Professional, Therapy, DateOption, Appointment, ViewType)
    ├── vite-env.d.ts           # Vite client type reference
    ├── utils/
    │   └── fetchWithRetry.ts   # API fetch helper with exponential backoff retry logic
    ├── mocks/
    │   ├── therapies.ts        # Therapy types with Lucide icons (Acupuntura, Ventosaterapia, etc.)
    │   ├── professionals.json  # Practitioner profiles (name, rating, price, therapies)
    │   ├── appointments.json   # Sample appointment data (upcoming and past)
    │   ├── dates.json          # Available calendar dates
    │   └── times.json          # Available time slots
    └── components/
        ├── AndroidStatusBar/AndroidStatusBar.tsx     # Mock Android status bar
        ├── BottomNavigation/BottomNavigation.tsx     # Tab bar (Home, Discover, Appointments, Profile)
        ├── HomeScreen/HomeScreen.tsx                 # Home view — therapy categories, professional cards, AI banner
        ├── DiscoverScreen/DiscoverScreen.tsx         # Browse all professionals with search
        ├── AppointmentsScreen/AppointmentsScreen.tsx # Upcoming and past appointments
        ├── UserProfileScreen/UserProfileScreen.tsx   # Account settings and preferences
        ├── AiMatchScreen/AiMatchScreen.tsx           # AI symptom-to-therapy matching (Gemini API)
        ├── ProfessionalProfileScreen/ProfessionalProfileScreen.tsx # Professional detail view
        ├── BookingScreen/BookingScreen.tsx           # Date and time selection for booking
        └── SuccessScreen/SuccessScreen.tsx           # Booking confirmation
```

## Architecture

The app uses a **component-based architecture** with view-level routing managed by React state in `src/App.tsx`.

### Root component (`App.tsx`)
- Manages global state (`view`, `selectedPro`, `selectedTherapy`, booking selections) via `useState` hooks
- Conditionally renders screen components based on the `view` state variable
- Wraps content in a mock phone frame (390px on desktop, full-width on mobile)
- Shows `BottomNavigation` on main tabs: `home`, `discover`, `appointments`, `user-profile`

### Component conventions
- Each component lives in `src/components/{Name}/{Name}.tsx` — one component per file, no co-located CSS files
- Screen-level components receive data and callbacks as props from `App.tsx`
- Shared TypeScript types are defined in `src/types.ts` (`Professional`, `Therapy`, `DateOption`, `Appointment`, `ViewType`)

### Data layer
- Mock data lives in `src/mocks/` as JSON files (or `.ts` when icons are needed)
- `src/utils/fetchWithRetry.ts` provides exponential backoff for API calls

### AI integration
- `AiMatchScreen` calls the Google Gemini 2.5 Flash API via `fetchWithRetry`
- API key is read from `import.meta.env.VITE_GEMINI_API_KEY`
- Returns a therapy + professional recommendation with explanation in Portuguese

### Navigation flow
- **Main tabs** (bottom nav): Home → Discover → Appointments → Profile
- **Booking flow**: Home → Profile → Book → Success
- **AI flow**: Home → AI Match

## Coding Conventions

- Use **TypeScript** for all source files (`.tsx` / `.ts`)
- Use **Tailwind CSS utility classes** exclusively for styling — do not create separate CSS files
- Use **Lucide React** for icons
- Write UI text in **Brazilian Portuguese (pt-BR)**
- Place new components in `src/components/{Name}/{Name}.tsx`
- Define shared types in `src/types.ts`
- The app renders inside a mock phone frame (390px wide) on desktop and full-width on mobile
- Use `active:scale-[0.98]` for tap feedback on interactive elements
