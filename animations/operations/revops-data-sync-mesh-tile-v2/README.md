# RevOps Data Sync Mesh Tile

A high-fidelity, animated React component visualizing a data synchronization mesh. Migrated from a raw HTML/Tailwind prototype into a standalone, reusable React module with Framer Motion animations.

## Tech Stack
- **React 18+**: Functional components with Hooks.
- **Tailwind CSS**: For all styling, including arbitrary values for gradients and precise sizing.
- **Framer Motion**: For orchestrating the heartbeat animations, orbiting elements, and background grid movements.
- **Lucide React**: For scalable, clean SVG iconography replacing the original Material Symbols.

## Usage
1. Ensure dependencies are installed:
   ```bash
   npm install lucide-react framer-motion clsx tailwind-merge
   ```
2. Import the component:
   ```tsx
   import RevOpsMeshTile from './components/RevOpsMeshTile';
   ```
3. Place it in your layout. Note that the component has a fixed internal dimension of `600px x 600px` as per the design requirements. To make it responsive, scale it using CSS transforms or a container query wrapper if needed, though it is designed as a rigid "dashboard tile".

## App Name
**RevOps Mesh Dashboard**