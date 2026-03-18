# UtilitiesHero Command Center Tile

A high-fidelity, data-dense React component representing an energy grid monitoring system. It features a rigid 600x600 layout, emerald-themed dark UI, and simulated real-time data fluctuations.

## Tech Stack
*   **React 18+**
*   **TypeScript**
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Animations: background rings, status pulse, bar charts)
*   **Lucide React** (Vector icons)

## Usage

1.  Ensure you have Tailwind CSS configured in your project.
2.  Install dependencies:
    ```bash
    npm install framer-motion lucide-react clsx tailwind-merge
    ```
3.  Import the component:
    ```tsx
    import EnergyGridTile from './components/EnergyGridTile';
    
    function Dashboard() {
      return (
        <div className="flex justify-center items-center min-h-screen bg-slate-950">
          <EnergyGridTile />
        </div>
      );
    }
    ```

## Customization
The component is fully self-contained in `EnergyGridTile.tsx`. 
- **Icons:** Uses `lucide-react` mapped from original Material Symbols.
- **Fonts:** Designed for 'Space Grotesk' (Google Fonts), falls back to sans-serif.
- **Data:** Initial state values in `useState` can be replaced with props for real data integration.
