# DemandGrowthHero Component

This project features a standalone, high-performance React component (`DemandGrowthTile`) extracted from a static B2B landing page. The component visualizes an isometric demand generation funnel with floating metrics, flowing data particles, and a glowing grid background. It is designed to be fully responsive while maintaining a strict 1:1 aspect ratio maxing at 600px.

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
