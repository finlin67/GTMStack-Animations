# Pipeline Command Center

A high-fidelity, real-time pipeline monitoring dashboard component designed as a responsive "Hero Tile". This React component visualizes data throughput, lead generation metrics, and system pressure with smooth animations and a modern dark-mode aesthetic.

## Features

- **Live Pressure Gauge**: Animated SVG gauge with physics-based needle movement (spring animations via Framer Motion).
- **Real-time Data Simulation**: Simulates live metrics for leads, warm prospects, MQLs, conversion rates, and throughput.
- **Responsive "Hero Tile" Design**: Built to scale seamlessly within a container up to 600x600px, perfect for bento grids or dashboard widgets.
- **Interactive Elements**:
    - "Release Pressure" button with active states.
    - Toast notifications for live events (e.g., New Leads).
    - Hover effects on metric cards.
- **Modern UI**: Glassmorphism effects (backdrop blur), gradients, and Tailwind CSS styling.

## Tech Stack

- **React 19**: Component architecture and state management.
- **Framer Motion**: Complex animations for the needle, progress bars, and toast notifications.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **Lucide React**: Vector icons.

## Usage

The main component is located in `components/PipelineDashboard.tsx`. It is designed to be a self-contained widget.

```tsx
import PipelineDashboard from './components/PipelineDashboard';

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      {/* The component fills its parent but respects max-w-[600px] */}
      <PipelineDashboard />
    </div>
  );
}
```

## Project Structure

- `index.html`: Entry HTML with Tailwind CDN and Import Maps.
- `index.tsx`: React entry point.
- `App.tsx`: Main application wrapper.
- `components/PipelineDashboard.tsx`: The core dashboard logic and UI.
- `metadata.json`: Project metadata.
