# Nexus Industrial Dashboard

A Nexus industrial dashboard tile that highlights process-stage telemetry, production health, and operations performance.

## Features

- **Real-time Telemetry**: Visualizes data streams for Cycle Time, Pressure, Vibration, and Torque with live trend lines using Recharts.
- **Process Stage Tracking**: Interactive sidebar to switch between Design, Proto, Prod, and Quality stages.
- **AI-Powered Insights**: Integrates with Google Gemini API to provide context-aware engineering optimization advice based on current telemetry data.
- **Responsive Design**: Built with a "Hero Tile" architecture, scaling perfectly from mobile to desktop within a fixed aspect ratio container.
- **Modern UI/UX**: sophisticated glassmorphism effects (`backdrop-blur`, `bg-white/5`), Framer Motion animations, and Lucide React icons.

## Tech Stack

- **React 19**: Core framework.
- **TypeScript**: Type safety for telemetry data and props.
- **Tailwind CSS**: Styling utility for rapid UI development.
- **Framer Motion**: Smooth animations for state transitions and SVGs.
- **Recharts**: Data visualization for trend lines.
- **Lucide React**: Vector icons.
- **Google GenAI SDK**: Connection to Gemini 3 Flash models.

## Usage

This component is self-contained in `Industrial-MFG-Tile.tsx`. To use it in your Next.js or Vite project:

1.  Ensure you have the required dependencies installed.
2.  Set your `API_KEY` in your environment variables for Gemini integration.
3.  Import and drop `<IndustrialMfgTile />` into your layout.

```tsx
import IndustrialMfgTile from './Industrial-MFG-Tile';

export default function Page() {
  return (
    <div className="w-screen h-screen">
      <IndustrialMfgTile />
    </div>
  );
}
```
