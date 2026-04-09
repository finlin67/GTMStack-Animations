# EventPulse Enterprise Dashboard

An EventPulse enterprise tile that highlights event engagement dynamics, performance visibility, and conversion flow.

## Tech Stack
*   **React 18+**
*   **TypeScript**
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Animations)
*   **Lucide React** (Icons)

## EventMarketing Component
The core of this extraction is `components/EventMarketing.tsx`. It is a standalone 600x600px visualization tile featuring:
*   Pulsing central node animation.
*   Floating user avatar elements.
*   SVG Path animations.
*   Data cards with entrance animations.
*   Self-contained styling (Standard Tailwind classes + Inline styles for specific gradients).

## Usage
1.  Install dependencies: `npm install framer-motion lucide-react`
2.  Import the component: `import EventMarketing from './components/EventMarketing';`
3.  Place `<EventMarketing />` inside any grid or flex container. It naturally fills width up to 600px and maintains a square aspect ratio.
