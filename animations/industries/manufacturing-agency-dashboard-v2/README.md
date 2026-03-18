# Manufacturing Agency Dashboard

A high-fidelity, interactive precision manufacturing lifecycle dashboard. This application provides real-time visualization of production performance and simulates the "Marketing Impact" on operational metrics.

## 🚀 Overview

The **Mfg Agency Dashboard** is designed for discrete manufacturing firms to showcase their operational efficiency to clients. It bridges the gap between raw engineering data and marketing-ready insights through an interactive, animated interface.

## ✨ Key Features

- **Adaptive 600x600 UI**: Custom-engineered layout strictly constrained to a square aspect ratio, perfect for dashboard embeds and standard previews.
- **Interactive Lifecycle Loop**: Visualizes the production chain from Design to Delivery with animated progress indicators.
- **Marketing Impact Toggle**: A "what-if" analysis switch that dynamically updates operational metrics (Defect Rate, Yield, Throughput) using Framer Motion transitions.
- **Live Data Simulation**: A real-time performance hub with "jittered" data to mimic a live production environment, featuring weekly history charts.
- **Modern Aesthetics**: Built with a dark-themed "Space Grotesk" aesthetic, utilizing backdrop blurs, animated gradient blobs, and glassmorphism.

## 🛠 Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typeface**: Space Grotesk & Noto Sans

## 📁 Project Structure

- `App.tsx`: The root container that centers and hosts the dashboard.
- `components/MfgLifecycleDashboard.tsx`: The core logic and UI of the application, including state management for live data and impact toggles.
- `index.html`: Main entry point with Tailwind configuration and font imports.
- `metadata.json`: Project metadata and permissions configuration.

## ⚙️ Development Notes

- **Single-File Component**: The main dashboard is designed as a standalone component for easy portability.
- **Adaptive Scaling**: Uses specific Tailwind utility classes to ensure all complex data visualizations fit within the 600px boundary without losing readability.
- **Performance**: Leverages React's `useCallback` and `useEffect` to manage simulated data streams efficiently without unnecessary re-renders.
