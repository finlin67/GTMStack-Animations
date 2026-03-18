# Engineering Excellence Workflow Tile

A high-fidelity 36-month engineering workflow visualization designed for aerospace and manufacturing systems.

## Features
- **Responsive Hero Tile**: Fully responsive design that maintains aspect ratio and scales within a max 600x600px container.
- **Glassmorphism UI**: Uses Tailwind CSS backdrop utilities (`backdrop-blur-xl`) for a modern, frosted glass effect without external CSS.
- **Interactive Animations**:
  - **Entrance**: Staggered fade-ins for list items.
  - **Hover**: Icons rotate and scale on hover using Framer Motion.
  - **Live Data**: Simulated progress bar and "System Load" indicators that update in real-time.
- **Blueprint Aesthetic**: Custom inline SVG-style radial gradient background.

## Tech Stack
- **React 19**: Utilizing functional components and hooks (`useState`, `useEffect`).
- **Framer Motion**: For complex layout animations and micro-interactions.
- **Tailwind CSS**: For utility-first styling, including gradients, flexbox layouts, and glassmorphism.
- **Lucide React**: For consistent, high-quality vector iconography.

## Usage
This component is self-contained in `App.tsx`. To use it:
1. Ensure `framer-motion` and `lucide-react` are installed.
2. Import `EngineeringWorkflow` from `App.tsx`.
3. Place it within any parent container; it will center itself and maintain its square aspect ratio.
