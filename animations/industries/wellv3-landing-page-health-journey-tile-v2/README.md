# WellV3 Landing Page & Health Journey Tile

A modern, high-fidelity conversion of a medical SaaS landing page, featuring a dedicated, interactive "Health Journey" visualization component.

## Description
This project demonstrates the extraction of a complex UI widget from a static HTML/Tailwind design into a fully functional React component. The `HealthCareTile` features smooth Framer Motion animations, interactive step selection, and simulated real-time data updates (heart rate). The main application wraps this tile in a responsive, production-ready landing page layout.

## Tech Stack
*   **React 18**: Component-based UI architecture.
*   **TypeScript**: Type-safe development.
*   **Tailwind CSS**: Utility-first styling (using arbitrary values to match specific design tokens).
*   **Framer Motion**: Complex animations (spring physics, layout transitions).
*   **Lucide React**: Modern, consistent iconography.

## Usage
1.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
2.  Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```
3.  The app will load at `http://localhost:3000` (or similar port). Hover over the timeline steps in the right-hand tile to see interaction effects.

## Component Details
The `HealthCareTile.tsx` is a self-contained module. It does not rely on global CSS files (other than the Tailwind preflight injected via CDN in this demo environment) and handles its own state for active steps and heart rate simulation.