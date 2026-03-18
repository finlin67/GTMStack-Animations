# RevOps Neural Dashboard

A futuristic, high-fidelity Revenue Operations dashboard built with **React 19**, **Framer Motion**, and **Tailwind CSS**. This project demonstrates advanced UI/UX techniques including "Modern Deep" glassmorphism, real-time data visualization, and fluid animations.

## ✨ Key Features

- **High-Fidelity Surface Design**: Implements a "Modern Deep" theme with multi-layered glassmorphism, ambient lighting effects, and backdrop blurs.
- **Real-time Data Simulation**: Built-in "jitter" logic simulates live revenue and win-rate updates every 2.5 seconds.
- **Live Intelligence Stream**: An event-driven activity feed with human-readable timestamps and status indicators (Success, Warning, Neutral).
- **Interactive KPI Grid**: Responsive metric cards featuring trend indicators and micro-interactions.
- **Animated Revenue Hero**: A custom SVG sparkline with gradient fills and Framer Motion path animations.
- **Floating Dock Navigation**: A persistent, glassmorphic navigation bar with active state indicators and AI-integrated UI cues.

## 🛠 Tech Stack

- **Framework**: React 19 (Standalone ESM build)
- **Animation**: Framer Motion 11
- **Icons**: Lucide React
- **Styling**: Tailwind CSS (JIT CDN)
- **Typography**: Plus Jakarta Sans (Google Fonts)

## 🏗 Architecture

The application is structured as a **Monolithic Single-File Component** (`RevOpsDash.tsx`) to ensure maximum portability and zero-configuration deployment. 

- **State Management**: Uses React Hooks (`useState`, `useEffect`) for managing metric updates and activity streams.
- **Animations**: Orchestrated via Framer Motion `AnimatePresence` for dynamic list transitions and `layoutId` for shared element transitions in the navigation dock.
- **Styling**: Utilizes Tailwind's arbitrary value support and glassmorphic utility classes for consistent aesthetic quality.

## 🚀 Getting Started

Simply open `index.html` in a modern web browser. The project uses an `importmap` to fetch all dependencies directly from `esm.sh`, requiring no local build step or node_modules.

---

*Designed & Engineered for High-Performance Revenue Teams.*