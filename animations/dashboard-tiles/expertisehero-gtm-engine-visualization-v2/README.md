# ExpertiseHero GTM Engine Visualization

An ExpertiseHero GTM engine tile that maps strategic growth nodes, signal pathways, and execution momentum.

## Tech Stack
*   **Next.js / React 18+**
*   **TypeScript**
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Orchestration & Animation)
*   **Lucide React** (Icons)

## Components
1.  **GtmCoreTile.tsx**: The standalone, animated 600x600 (responsive) component. It features SVG path drawing, floating nodes with spring physics, and glowing pulse effects.
2.  **App.tsx**: The full landing page demonstrating the tile in its intended context.

## Usage
Import the component:
```tsx
import GtmCoreTile from './components/GtmCoreTile';

function MyPage() {
  return (
    <div className="w-[800px] h-[600px]">
      <GtmCoreTile />
    </div>
  );
}
```
The component is responsive but designed to look best in a container with an aspect ratio close to square (e.g., 600x600 or responsive grid columns).