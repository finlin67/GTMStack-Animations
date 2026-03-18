# Sales Enablement Hero Animated Tile

## Description

This project showcases an animated, interactive tile component extracted from a modern SaaS sales enablement platform's landing page. The component is designed to be a high-fidelity, standalone visual element that displays key performance indicators like "Win Rate Boost" and "Sales Cycle" reduction. It's built to be fully responsive and self-contained, using dynamic animations with Framer Motion to create an engaging user experience. The tile is a perfect example of how to isolate complex UI sections from a static design into reusable, production-ready React components.

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (for icons)

## Usage

This project is set up to run in a standard React environment (like Vite or Next.js).

1.  Place the `SalesEnablementTile.tsx` component inside your `components` directory.
2.  Import the component into any page or another component: `import SalesEnablementTile from './components/SalesEnablementTile';`
3.  Render the component within a container to control its size:
    ```jsx
    <div className="w-full max-w-[600px]">
      <SalesEnablementTile />
    </div>
    ```
The component is designed to be responsive and will adapt to its parent container's width while maintaining a square aspect ratio.
