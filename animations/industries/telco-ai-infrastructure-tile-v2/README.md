# Telco AI Infrastructure Tile

A telco AI infrastructure tile that visualizes network intelligence, service load, and predictive operations performance.

## Tech Stack

-   **React 18+**: Core component logic.
-   **Tailwind CSS**: Utility-first styling for layout, typography, and effects.
-   **Framer Motion**: Complex animations (pulsing nodes, data flow, marquee ticker).
-   **Lucide React**: Modern, lightweight SVG iconography.

## Usage

1.  Ensure Tailwind CSS is configured in your project.
2.  Install dependencies:
    ```bash
    npm install framer-motion lucide-react
    ```
3.  Import and drop the component into any container. It has fixed dimensions of 600x600px but can be scaled using CSS transforms if needed.

    ```tsx
    import TelcoAITile from './components/TelcoAITile';

    function Dashboard() {
      return (
        <div className="flex justify-center items-center h-screen bg-slate-950">
           <TelcoAITile />
        </div>
      );
    }
    ```

## Features

-   **Isolated Styling**: No external CSS files required (except standard Tailwind).
-   **Smooth Animations**: GPU-accelerated transitions for "breathing" neon effects and data tickers.
-   **Responsive Design**: Internal layout flexes perfectly within the 600x600 rigid frame.
