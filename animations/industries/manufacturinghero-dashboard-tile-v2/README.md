# ManufacturingHero Dashboard Tile

A high-performance, animated React component visualizing real-time factory metrics (OEE, Throughput, Savings). Extracted from a static design and enhanced with Framer Motion for smooth, data-driven interactions.

## Tech Stack
*   **React 18+**
*   **TypeScript**
*   **Tailwind CSS** (Utility-first styling)
*   **Framer Motion** (Complex sequences and SVG path animations)
*   **Lucide React** (Modern, consistent iconography)

## Usage

1.  Copy `components/ManufacturingHeroTile.tsx` into your project.
2.  Ensure you have the required dependencies installed:
    ```bash
    npm install framer-motion lucide-react
    ```
3.  Import and use the component:
    ```tsx
    import ManufacturingHeroTile from './components/ManufacturingHeroTile';

    export default function Dashboard() {
      return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
          <ManufacturingHeroTile />
        </div>
      )
    }
    ```

## Features
*   **Self-Contained Styling:** Uses Tailwind arbitrary values to ensure the component looks identical in any project without custom config files.
*   **SVG Data Visualization:** Animated bezier curves representing efficiency gains.
*   **Interactive Elements:** Hover states on process steps and rigid layout stability.
