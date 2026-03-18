# Marketing Automation Live Feed

A high-fidelity, production-ready React component that visualizes a marketing automation pipeline in real-time. Designed as a dashboard widget (600x600px), it features a live conveyor belt animation, dynamic data processing stages, and simulated streaming logs.

## Features

- **Real-time Pipeline Visualization**: Animated conveyor belt showing items moving through Ingest, Enrich, Score, and Route stages.
- **Live Statistics**: Dynamic counters for Queue, Enriched, and Routed items with simulated data jitter.
- **Activity Log**: A scrolling log of recent automation events (Ingest, Enrich, Score, Route).
- **Interactive UI**: Glassmorphism aesthetic with Tailwind CSS, hover effects, and Framer Motion animations.
- **Production Ready**: Single-file architecture with no external CSS dependencies (uses Tailwind CDN or config).

## Technologies

- **React 18+**
- **TypeScript**
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

## Usage

This component is designed to be dropped into a Next.js or Vite project.

```tsx
import MarketingAutomationLiveFeed from './Marketing-Automation-Live-Feed';

export default function Dashboard() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <MarketingAutomationLiveFeed />
    </div>
  );
}
```

## File Structure

- `Marketing-Automation-Live-Feed.tsx`: The core component containing all logic, styles, and sub-components.
- `index.tsx`: Application entry point.
- `index.html`: HTML template with Tailwind CDN and font imports.

## Customization

The component is self-contained. To modify colors or styles, edit the Tailwind classes within `Marketing-Automation-Live-Feed.tsx`. The `stats` state in the main component controls the simulated data values.