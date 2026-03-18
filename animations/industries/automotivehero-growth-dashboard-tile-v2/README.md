# AutomotiveHero Growth Dashboard Tile

## Description
This project features a high-fidelity **1:1 Dashboard Tile** extracted from the AutomotiveHero interface. It uses a "Cockpit" layout strategy to present complex lead journey data in a 600x600px square frame.

Key features:
- **Vertical Hierarchy**: Header (Status) -> Main View (Map + Sidebar Metrics) -> Footer (Telemetry).
- **Interactive Map**: SVG Bezier curve with animated cars traversing the path.
- **Glassmorphism**: High-performance backdrop blurs for overlay elements.

## Tech Stack
- **React 18+**: Core framework.
- **TypeScript**: Type safety.
- **Tailwind CSS**: Utility-first styling (no external CSS files).
- **Framer Motion**: Advanced animations for SVG paths and floating elements.
- **Lucide React**: Modern, consistent iconography replacing Google Material Symbols.

## Usage
1. Ensure dependencies are installed:
   ```bash
   npm install framer-motion lucide-react clsx tailwind-merge
   ```
2. Import the component in your layout:
   ```tsx
   import CarAutoGrowthTile from './components/CarAutoGrowthTile';

   export default function Dashboard() {
     return (
       <div className="w-full flex justify-center p-10">
         <CarAutoGrowthTile />
       </div>
     );
   }
   ```
3. The component is self-contained in `components/CarAutoGrowthTile.tsx`.

## App Name
AutomotiveHero Dashboard