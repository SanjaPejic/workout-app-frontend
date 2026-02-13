# Workout App - Frontend

A modern React-based workout application that helps users create, save, manage, and track their strength workout routines. Built with TypeScript, Tailwind CSS, and a component-based architecture.

## Live Application

Workout Blocks was deployed on Vercel (frontend) and AWS (backend and database). The AWS free trial period has expired, so the live deployment is no longer available. A demo video is provided to showcase the application in operation: https://youtu.be/3DXnyEJHyLc

## Frontend Source Code

The repository is available on GitHub at: https://github.com/SanjaPejic/workout-app-frontend

# Technology Stack

## Core Technologies

- **React** `19.1.0`: Latest version
- **TypeScript** `5.8.3`: Static type checking for enhanced code quality
- **Vite** `6.3.5`: Fast build tool and development server

## State Management & Data Fetching

- **Zustand** `5.0.6`: Lightweight state management for user data
- **TanStack Query** `5.81.5`: Powerful data fetching and caching solution
- **Axios** `1.10.0`: HTTP client for API communication

## UI Components & Styling

- **Shadcn/UI Components**: Custom UI components built on top of Radix UI primitives with Tailwind CSS styling
- **Tailwind CSS** `4.1.10`: Utility-first CSS framework
- **Radix UI**: Accessible, unstyled UI primitives
- **Framer Motion** `12.23.11`: Smooth animations and transitions
- **Lucide React** `0.515.0`: Universally understood icons

## Routing & Navigation

- **React Router DOM** `7.6.2`: Client-side routing with protected routes

## Development Tools

- **ESLint** `9.25.0`: Code linting and quality enforcement
- **Prettier** `3.5.3`: Code formatting
- **TypeScript ESLint** `8.30.1`: TypeScript-specific linting rules

## Deployment

- **Vercel**

## Local Setup

### Prerequisites

- _Node.js_ (version 18 or higher)
- _npm_ package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SanjaPejic/workout-app-frontend
cd workout-app-frontend
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
└── logo.png                        # Workout Blocks logo picture

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

# License

This project was developed as part of my Master’s dissertation and is not licensed for public use.

---
