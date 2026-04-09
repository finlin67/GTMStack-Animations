# Social Media Marketing Hero Tile

A social media marketing hero tile designed to spotlight viral momentum, engagement depth, and campaign amplification.

## Description
This project exports a high-performance, standalone React component (`SocialMediaTile`) that visualizes "viral" data metrics with a futuristic, cyberpunk/glassmorphism aesthetic. It features complex layered animations including expanding ripples, floating 3D elements, SVG path tracing, and interactive hovering states on data widgets. The design is strictly 600x600px to serve as a dashboard hero element or marketing feature.

## Tech Stack
*   **React 18+**: Component architecture.
*   **TypeScript**: Type safety.
*   **Tailwind CSS**: Utility-first styling (no external CSS files required).
*   **Framer Motion**: Complex animation orchestration (ripples, floating, pulses).
*   **Lucide React**: Modern, lightweight SVG icons.

## Usage
1.  Ensure you have Tailwind CSS configured in your project.
2.  Install dependencies:
    ```bash
    npm install framer-motion lucide-react
    ```
3.  Import and drop the component into any layout:
    ```tsx
    import SocialMediaTile from './components/SocialMediaTile';

    function Dashboard() {
      return (
        <div className="flex justify-center items-center h-screen bg-slate-950">
           <SocialMediaTile />
        </div>
      )
    }
    ```
    
*Note: The component expects the font `Spline Sans` to be available for exact visual matching, though it defaults to sans-serif.*

## App Name
**Lunar Frost Analytics**