# Waste Management AI Hero Component

A waste management AI hero tile that presents system flow, optimization performance, and operational efficiency signals.

## Tech Stack
- **React 18+**: Core framework.
- **Tailwind CSS**: For all styling, including gradients, glassmorphism, and responsive layouts.
- **Framer Motion**: For complex SVG path animations, entry transitions, and continuous breathing effects.
- **Lucide React**: For consistent, high-quality SVG iconography.

## Usage
1. Copy `components/WasteMan.tsx` into your project.
2. Ensure you have `framer-motion` and `lucide-react` installed:
   ```bash
   npm install framer-motion lucide-react
   ```
3. Import and use the component in any page:
   ```tsx
   import WasteMan from './components/WasteMan';

   export default function Page() {
     return (
       <div className="h-screen flex items-center justify-center bg-black">
         <WasteMan />
       </div>
     );
   }
   ```

## Animation Details
The component uses SVG `<motion.path>` elements to draw connecting lines, while `<motion.animateMotion>` moves particles along these Bezier curves to simulate data ingress and egress. The central efficiency metric counts up from 0 to 27% using a custom Javascript interval hook for smooth performance.