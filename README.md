# Workout App

A modern React-based workout application that helps users create, save, manage, and track their strength workout routines. Built with TypeScript, Tailwind CSS, and a component-based architecture.

## Tech Stack

- **Frontend**: React 19.1 with TypeScript
- **Styling**: Tailwind CSS 4.1 with custom components
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query (React Query) for server state
- **Routing**: React Router DOM
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## Local Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SanjaPejic/workout-app-frontend
cd workout-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
public/
└── logo.png                        # Workout Block logo picture

src/
├── api/                            # API client and service
│   ├── constants/                  # API endpoints and query keys constants
│   ├── api-client.ts               # Base API client configuration
│   └── client-service.ts           # API service functions
├── assets/                         # Local images, fonts, and non-component static files
│   └── svgs/                       # SVGs (e.g. avatar body illustrations)
├── components/                     # Reusable UI components
│   ├── ui/                         # ShadCN base UI primitives (buttons, inputs, dialog etc.)
│   ├── shared/                     # Shared components
│   ├── layout/                     # Layout components (header and authentication wrapper)
│   ├── modal/                      # Modal components
│   :
│   └── [page-modal-specific]/      # Components specific to individual pages and modals
├── constants/                      # Application constants
├── pages/                          # Application pages (Login, Create, Generate, Saved, Start, and Not Found)
├── types/                          # Shared TypeScript interfaces
├── util/                           # Utility functions
├── App.css                         # Application level styles (not used in this project)
├── App.tsx                         # Root application component
├── index.css                       # Global styles
├── main.tsx                        # Application entry point
└── vite-env.d.ts                   # Vite-TypeScript type declarations
```

## License

This project was developed as part of my Master’s dissertation and is not licensed for public use.

---
