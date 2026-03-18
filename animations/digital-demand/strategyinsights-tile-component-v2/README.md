# StrategyInsights Tile Component

This project features a high-fidelity recreation of the StrategyInsights landing page hero section, focusing on the standalone `StrategyInsightsTile` component. The component visualizes a central intelligence hub with floating metrics cards and connectivity graphs using smooth animations.

## Tech Stack
- **React 18+** (TypeScript)
- **Tailwind CSS** (Styling via CDN)
- **Framer Motion** (Orchestrated animations)
- **Lucide React** (Vector iconography)

## Usage
1. Clone the repository.
2. Install dependencies: `npm install framer-motion lucide-react`.
3. Run the development server (e.g., `npm start` or `vite`).
4. The `StrategyInsightsTile` component is located in `components/StrategyInsightsTile.tsx` and can be dropped into any Tailwind-configured React project. It is designed to be responsive within a max-width container of 600px.

## Component Details
The `StrategyInsightsTile` is an isolated component that encapsulates:
- A radial grid background.
- A pulsing central node with expanding rings.
- Three floating "glassmorphism" cards with independent floating animations.
- SVG connecting lines that draw themselves on mount.
