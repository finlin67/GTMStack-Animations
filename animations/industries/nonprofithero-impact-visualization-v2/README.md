# NonProfitHero - Impact Visualization

This project features a high-fidelity recreation of the NonProfitHero landing page with a specialized, animated React component for the "Global Impact" data visualization.

## Description
The core focus is the `<NGOSDOTile />` component. This component visualizes the "Donor Journey" using a circular loop concept. It utilizes SVG for precision drawing and Framer Motion for organic animations (drawing path arcs, pulsing indicators, and floating cards). The tile is fully responsive and self-contained.

## Tech Stack
*   **Framework:** React 18+ (TypeScript)
*   **Styling:** Tailwind CSS (Arbitrary values used for color portability)
*   **Animation:** Framer Motion
*   **Icons:** Lucide React (replacing Google Material Symbols)

## Usage
1.  Ensure you have dependencies installed:
    ```bash
    npm install framer-motion lucide-react
    ```
2.  Import the tile into any layout:
    ```tsx
    import NGOSDOTile from './components/NGOSDOTile';

    export default function Dashboard() {
      return (
        <div className="w-[600px]">
           <NGOSDOTile />
        </div>
      )
    }
    ```
3.  The tile will automatically fit the width of its parent container while maintaining a 1:1 aspect ratio.

## Component Features
*   **Isolated Styles:** Does not rely on external `tailwind.config.js` theme extensions.
*   **SVG Animation:** The gradient arc draws itself on mount.
*   **Interactive Elements:** The bottom-right card has a subtle hover float effect.
