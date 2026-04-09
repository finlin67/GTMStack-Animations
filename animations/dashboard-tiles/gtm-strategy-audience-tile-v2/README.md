# GTM Strategy Audience Tile

A strategy-focused GTM tile that visualizes audience definition, market context, and messaging structure for launch planning.

## Description

The `GTMAudienceTile` is a 600x600 pixel interactive card designed for dashboards or landing pages. It features a central "Core Product" node surrounded by floating satellites representing Audience, Landscape, Messaging, and Narrative. It utilizes a deep radial gradient background, glassmorphism effects, and continuous floating animations to create a modern, high-tech aesthetic.

## Tech Stack

*   **React 18+**: Core UI library.
*   **TypeScript**: Type-safe development.
*   **Tailwind CSS**: Utility-first styling for layout, typography, and visual effects (gradients, blurs).
*   **Framer Motion**: Handles the continuous floating animations of the satellite cards.
*   **Lucide React**: Provides the vector icons (Gem, Users, Radar, MessageSquare, BookOpen).

## Usage

1.  Import the component:
    ```tsx
    import GTMAudienceTile from './components/GTMAudienceTile';
    ```

2.  Place it in your layout. The component has a fixed size of `600px` by `600px`. Ensure the parent container allows for this size or apply scaling if necessary.
    ```tsx
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <GTMAudienceTile />
    </div>
    ```

## App Name

Strategy Hub Tile