# EduHero Analytics Dashboard

An EduHero analytics tile that visualizes learner funnel progress, campaign outcomes, and growth trends for education teams.

## Description
This project demonstrates the extraction and modernization of a complex UI section into a standalone React component (`HigherEDMarketingTile`). It features a 600x600px aspect-ratio dashboard tile containing animated funnel charts and SVGs graphs. The component uses Framer Motion for smooth entry animations on the bars and stroke drawing effects on the line chart, replacing static CSS keyframes with JavaScript-controlled physics.

## Tech Stack
*   **React 18+**: Functional components with hooks.
*   **Tailwind CSS**: Utility-first styling (no external CSS files).
*   **Framer Motion**: Complex animation sequences for charts and UI elements.
*   **Lucide React**: Modern, consistent SVG iconography.

## Usage
1.  Clone the repository.
2.  Install dependencies: `npm install react react-dom framer-motion lucide-react`.
3.  Run the development server: `npm start` (or your preferred bundler command).
4.  The `HigherEDMarketingTile` component is located in `components/HigherEDMarketingTile.tsx` and can be reused in any dashboard layout.