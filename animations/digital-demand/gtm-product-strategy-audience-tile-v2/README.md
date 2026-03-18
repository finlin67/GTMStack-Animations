# GTM Strategy Audience Tile

A standalone, high-performance React component visualizing a "Product Marketing Strategy Hub" framework. This component was extracted from a static HTML prototype and converted into a dynamic, interactive React component with smooth animations.

## Description

The `ProductGTMTile` is a 600x600 pixel interactive card designed for dashboards or landing pages. It features a central "Core Product" node surrounded by floating satellites representing Audience, Landscape, Messaging, and Narrative. It utilizes a deep radial gradient background, glassmorphism effects, and continuous floating animations to create a modern, high-tech aesthetic.

## Tech Stack

*   **React 18+**: Core UI library.
*   **TypeScript**: Type-safe development.
*   **Tailwind CSS**: Utility-first styling for layout, typography, and visual effects (gradients, blurs).
*   **Framer Motion**: Handles the continuous floating animations of the satellite cards.
*   **Lucide React**: Provides the vector icons (Gem, Users, Radar, MessageSquare, BookOpen).

## Usage

1.  Import the component:
    ```tsx
    import ProductGTMTile from './components/ProductGTMTile';
    ```

2.  Place it in your layout. The component is responsive, designed to fit a square container up to a maximum size of `600px` by `600px`.
    ```tsx
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <ProductGTMTile />
    </div>
    ```

## App Name

Strategy Hub Tile