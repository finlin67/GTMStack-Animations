# Strategist OS Dashboard

A high-fidelity, cyberpunk-styled content strategist dashboard built with React, Tailwind CSS, and Framer Motion. This application simulates a futuristic "Strategist Operating System" featuring real-time metrics, lifecycle pipelines, and engagement analytics, all wrapped in a sleek glassmorphism aesthetic.

## Features

- **Futuristic UI/UX:** Dark mode design with glassmorphism panels, glowing accents, and a precise monospace typography system.
- **Real-Time Simulation:**
  - Live GMT clock.
  - Jittering "velocity metrics" and performance stats (Live Views, Conversion Rate, etc.) to simulate active data streams.
- **Lifecycle Pipeline:** Visualizes the content creation process (Ideate, Create, Optimize, Publish) with animated progress bars.
- **Interactive Notification System:** Triggering the "Omni-Channel Sync" displays a smooth, animated toast notification indicating system activity.
- **Responsive Animations:** Uses Framer Motion for smooth state transitions and entrance effects.

## Tech Stack

- **Framework:** React 19
- **Styling:** Tailwind CSS (via CDN for rapid prototyping)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Fonts:** Spline Sans (Google Fonts)

## File Structure

- `index.html`: Entry point with Tailwind script and font imports.
- `index.tsx`: React root rendering.
- `App.tsx`: Main layout wrapper centering the dashboard.
- `components/ContentStrategistDashboard.tsx`: Core component containing all dashboard logic, UI, and simulation simulation effects.

## Usage

This project is designed to run in a modern browser environment supporting ES modules. It utilizes `esm.sh` for package imports in the `index.html` import map.

1. Open `index.html` in a browser or serve via a local static server.
2. The dashboard will initialize, displaying live "systems nominal" status.
3. Click "EXECUTE_FLIGHT" in the bottom right to trigger the sync notification.
