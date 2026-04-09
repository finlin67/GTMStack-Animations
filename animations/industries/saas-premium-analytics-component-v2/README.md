# SaaS Premium Analytics Component

A premium SaaS analytics component that combines live metric visualization, data flow storytelling, and executive dashboard presentation.

## Tech Stack
- **React 18+**
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animation: SVG paths and entry transitions)
- **Lucide React** (Icons)

## Usage
1. Copy `PubSecTile.tsx` into your components folder.
2. Ensure you have `lucide-react` and `framer-motion` installed.
3. Import and drop it into any layout:
   ```tsx
   import PubSecTile from './components/PubSecTile';
   
   // ...
   <div className="flex justify-center">
      <PubSecTile />
   </div>
   ```

## Features
- **Isomorphic Design:** Uses Tailwind arbitrary values to ensure the look remains consistent regardless of global theme config.
- **Data Flow Animation:** Dashed SVG paths animate to simulate data moving from input sources (left) to the core (center) and out to deliverables (right).
- **Responsive-ready:** Fixed internal dimensions (600x600) to preserve complex absolute positioning, but can be scaled via CSS transforms if needed for smaller screens.
