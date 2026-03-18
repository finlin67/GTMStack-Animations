# Dynamic Wealth Dashboard Tile

A high-performance, standalone React component that visualizes financial stability and growth metrics. It features a complex grid background with data stream animations, a central pulsing shield hub, interconnected avatar nodes, and a live SVG revenue projection chart.

## Tech Stack
- **Framework:** React 18+ (TypeScript)
- **Styling:** Tailwind CSS (No external CSS files)
- **Animation:** Framer Motion (Replacements for CSS keyframes)
- **Icons:** Lucide React

## Usage

1. **Import the component:**
   ```tsx
   import WealthManageTile from './components/WealthManageTile';
   ```

2. **Render it in your layout:**
   The component has a fixed internal aspect ratio logic but is set to `w-[600px] h-[600px]` by default. Ensure the parent container can accommodate this or scale it using CSS transforms.
   ```tsx
   <div className="flex justify-center items-center min-h-screen bg-slate-900">
     <WealthManageTile />
   </div>
   ```

3. **Dependencies:**
   Ensure you have the following installed:
   - `framer-motion`
   - `lucide-react`
   - `clsx` / `tailwind-merge` (optional, but good practice)

## Features
- **Self-Contained:** All styles and logic live within `WealthManageTile.tsx`.
- **Performance:** Animations use hardware-accelerated transforms via Framer Motion.
- **Visuals:** 1:1 replica of the original "Wealth Expansion" design including gradients, glows, and specific motion timings.
