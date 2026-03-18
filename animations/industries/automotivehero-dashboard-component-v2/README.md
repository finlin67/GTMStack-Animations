# AutomotiveHero Dashboard Component

A high-performance, dark-mode analytics dashboard layout focused on automotive sales metrics. The centerpiece is the `AutomotiveTile`, a standalone 600x600px React component that visualizes revenue data with framer-motion animations.

## Tech Stack
*   **React 18+**
*   **TypeScript**
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Animation)
*   **Lucide React** (Icons)

## Usage

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Run the development server: `npm start` (or `npm run dev` depending on your setup).
4.  To reuse the tile component, import `AutomotiveTile` from `components/AutomotiveTile` and place it in any container. It is responsive but designed to look best at a 1:1 aspect ratio near 600px width.

## Component Details
The `AutomotiveTile` is completely self-contained, using inline styles for complex background patterns to avoid external CSS dependencies. It features pulse animations, floating elements, and a glass-morphism aesthetic.