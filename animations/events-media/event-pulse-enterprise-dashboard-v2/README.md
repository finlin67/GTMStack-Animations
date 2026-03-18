# EventPulse Enterprise Dashboard

A high-fidelity marketing analytics dashboard featuring a complex, animated SVG visualization for the "Event Impact" pipeline.

## Description

This project showcases a production-ready conversion of a Tailwind/HTML prototype into a React application. The centerpiece is the `EventPulse`, a 600x600px standalone component that visualizes a marketing funnel. It features orbiting elements, pulsating glowing nodes, and floating avatars using advanced SVG manipulation and layout techniques.

## Tech Stack

-   **React 18+** (TypeScript)
-   **Tailwind CSS** (Styling)
-   **Framer Motion** (Complex animations & SVG path drawing)
-   **Lucide React** (Iconography)

## Usage

1.  Ensure you have Node.js installed.
2.  Install dependencies:
    ```bash
    npm install react react-dom framer-motion lucide-react clsx tailwind-merge
    ```
3.  Run the development server (e.g., via Vite or Create React App):
    ```bash
    npm run dev
    ```
4.  The app will render the dashboard with the animated EventPulse in the hero section.

## Component Details

**`<EventPulse />`**
-   Located in `components/EventPulse.tsx`.
-   Completely self-contained (imports its own icons and animation libraries).
-   Responsive within its 600x600 aspect ratio container.
-   Uses Framer Motion for indefinite loops on gradients, shadows, and floating elements.