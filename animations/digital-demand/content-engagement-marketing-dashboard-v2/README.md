# Content Engagement Marketing Dashboard

A high-fidelity React component that visualizes a modern content marketing workflow. Designed as a "tile" or "widget" for dashboards and landing pages, it features real-time simulated data, organic animations, and a futuristic glassmorphic UI.

## Features

- **Visual Workflow Pipeline**: Tracks content stages from Ideation to Publishing with animated connector lines.
- **Real-time Engagement Metrics**: Simulates live data for "Total Views", "Conversion Rates", and "Social Echo" using organic jitter algorithms.
- **Interactive UI**:
  - Glassmorphism effects (blur, transparency).
  - Framer Motion animations for smooth state transitions and pulsing effects.
  - Lucide React iconography.
- **Responsive & Self-Contained**: Built as a single file component (`Content-Engagement-Marketing.tsx`) for easy drag-and-drop integration into Next.js or Vite projects.

## Tech Stack

- **React 18**
- **Framer Motion** (Animation)
- **Lucide React** (Icons)
- **Tailwind CSS** (Styling)

## Integration

1. **Copy the Component**:
   Move `Content-Engagement-Marketing.tsx` into your components directory (e.g., `src/components/`).

2. **Install Dependencies**:
   Ensure you have the required libraries installed in your project:
   ```bash
   npm install framer-motion lucide-react
   ```

3. **Import and Use**:
   ```tsx
   import MarketingFlowDashboard from './components/Content-Engagement-Marketing';

   export default function Page() {
     return (
       <div className="flex justify-center items-center min-h-screen bg-black">
         <MarketingFlowDashboard />
       </div>
     );
   }
   ```

## Customization

- **Stats Logic**: Modify the `updateStats` useCallback to fetch real API data instead of the simulated jitter.
- **Theme**: The component uses Tailwind utility classes. Adjust colors (currently slate/cyan/indigo) to match your brand guide.
