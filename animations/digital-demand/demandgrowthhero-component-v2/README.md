# DemandGrowthHero Component

A demand growth hero component that combines funnel visualization, live metrics, and campaign flow in a single animated tile.

## Tech Stack
*   **React 18+**
*   **TypeScript**
*   **Tailwind CSS** (for styling, including glassmorphism and gradients)
*   **Framer Motion** (for floating animations, particle flow, and SVG path drawing)
*   **Lucide React** (for modern, lightweight SVG icons)

## Usage

1.  **Installation**: Ensure `framer-motion` and `lucide-react` are installed:
    ```bash
    npm install framer-motion lucide-react
    ```
2.  **Import**:
    ```tsx
    import DemandGrowthTile from './components/DemandGrowthTile';
    ```
3.  **Render**:
    ```tsx
    <div className="w-full flex justify-center">
      <DemandGrowthTile />
    </div>
    ```

The component is self-contained and does not require external CSS files, making it easy to drop into any Tailwind-configured project.
