# Automotive Hero Dashboard Component

## Description
This project features a high-fidelity, animated sales enablement tile designed for automotive analytics dashboards. It visualizes the customer journey curve from awareness to purchase, highlighting key metrics like incremental revenue and conversion rates. The component is fully isolated and responsive within its aspect ratio, replacing legacy SVG implementations with performant React code.

## Tech Stack
- **React 18+**: Component architecture and state management.
- **Tailwind CSS**: Utility-first styling with custom color mapping (`amber-500`, `orange-500`).
- **Framer Motion**: Complex path drawing, spring physics, and staggered entrance animations.
- **Lucide React**: Modern, consistent iconography replacing Google Material Symbols.

## Usage
1. Ensure dependencies are installed: `npm install framer-motion lucide-react`.
2. Import the component: `import AutoTile from './components/AutoTile';`.
3. Place `<AutoTile />` inside a flex container or grid. It defaults to a max-width of 600px and maintains a 1:1 aspect ratio.

## App Name
AutomotiveHero Dashboard