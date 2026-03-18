# Oil & Gas Performance Tile Component

## Description
This project features a high-fidelity, animated React component (`OilGasTile.tsx`) extracted from an executive dashboard design. It visualizes key performance metrics (Efficiency Delta, Cost Alpha, Net Yield) using an orbiting node layout. The component utilizes Framer Motion to provide organic floating animations, pulsing effects, and SVG path drawing sequences, serving as a visually engaging centerpiece for data-heavy applications.

## Tech Stack
*   **Framework:** React 18+ (TypeScript)
*   **Styling:** Tailwind CSS (No external CSS files required)
*   **Animation:** Framer Motion (`framer-motion`)
*   **Icons:** Lucide React (`lucide-react`)

## Usage
1.  Ensure you have the dependencies installed:
    ```bash
    npm install framer-motion lucide-react clsx tailwind-merge
    ```
2.  Import the component into your layout:
    ```tsx
    import OilGasTile from './components/OilGasTile';

    function Dashboard() {
      return (
        <div className="w-full flex justify-center">
          <OilGasTile />
        </div>
      );
    }
    ```
3.  The component is self-contained and responsive. It works best inside a flex container or a grid cell that allows it to expand up to `650px` width.
