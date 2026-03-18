
# Executive Logistics Dashboard Hero Tile

A highly visual, interactive dashboard widget simulating a real-time global supply chain overview. It features a dynamically updating map with moving route packets, pulsing hub nodes, and fluctuating statistics.

## Features

*   **Responsive Hero Tile Design**:
    *   Designed to scale perfectly within a square aspect ratio.
    *   Outer container fills available space (`w-full h-full`), while content is constrained to a maximum of `600px x 600px` to maintain design integrity.
    *   Responsive font sizing and layout adjustments (flex/grid) ensure readability on both mobile and desktop.
*   **Real-time Simulation**:
    *   Uses `useEffect` and `setInterval` to create organic "jitter" in statistics (Global Nodes, Efficiency, Revenue, Carbon).
    *   Map nodes randomly update their status (Active, Warning, Idle) and throughput volume.
*   **Interactive Map**:
    *   **Hover**: Tooltips reveal detailed node metrics.
    *   **Click**: Selecting a node highlights its specific connections and dims the rest of the network, opening a persistent detail panel.
    *   **Animation**: SVG paths draw themselves in, and packets traverse routes endlessly.
*   **Visual Fidelity**:
    *   Glassmorphism effects using `backdrop-blur`.
    *   Custom Tailwind color palette (Cyan, Indigo, Slate).
    *   Framer Motion animations for smooth state transitions and entrance effects.

## Usage

This component is self-contained. Simply import and drop it into any full-screen or tile-based layout container.

```tsx
import ExecutiveLogisticsDashboard from './ExecutiveLogisticsDashboard';

export default function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
      <ExecutiveLogisticsDashboard />
    </div>
  );
}
```
