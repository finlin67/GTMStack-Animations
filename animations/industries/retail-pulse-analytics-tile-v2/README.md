# Retail Pulse Analytics Tile
<h1 align="center">Retail Pulse Analytics Tile</h1>


This project features a high-fidelity recreation of the "RetailTile" from the RetailPulse landing page, extracted into a standalone, production-ready React component. The tile visualizes retail analytics data (Store Visits, Conversions, Revenue) with organic "live" jitter animations and floating elements.

## Tech Stack
- **React 18+**: Component architecture and state management.
- **Tailwind CSS**: Utility-first styling for rapid UI development and exact design matching.
- **Framer Motion**: Fluid animations for floating avatars, entering cards, and pulse effects.
- **Lucide React**: Modern SVG icons replacing the original Google Material Symbols within the component.

## Usage

1. **Installation**: Ensure `framer-motion` and `lucide-react` are installed in your project.
   ```bash
   npm install framer-motion lucide-react
   ```

2. **Integration**: Import the component and place it within a container. It is designed to be responsive but works best with a max-width of 600px.
   ```tsx
   import RetailTile from './components/RetailTile';

   function Dashboard() {
     return (
       <div className="p-10">
         <RetailTile />
       </div>
     )
   }
   ```

3. **Preview**: The `App.tsx` file provides a full landing page context to see the component in its intended design environment.
