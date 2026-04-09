# KPI Spotlight Mosaic

An animated KPI mosaic built to highlight core metrics, trend shifts, and status indicators in one executive-ready view.

## Features

- **Real-Time Data Streaming**: Implements a robust **Server-Sent Events (SSE)** architecture (mocked client-side for demonstration) to push live updates to the UI, replacing legacy polling mechanisms.
- **Dynamic & Interactive Visualizations**: 
  - **AI Forecast**: Real-time area chart with gradient fill, predictive confidence indicators, and interactive data points.
  - **Conversion Rate**: Sparkline visualization with interactive historical data points.
  - **Referral Network**: Radial progress ring tracking conversion against target goals.
  - **Status Indicators**: Pulsing, rotating, and color-shifting animations for system status (Optimized, Syncing, Processing).
- **Interactive Tooltips**: Hover over tiles or specific chart points to reveal granular data and trends.
- **Responsive Design**: Scales seamlessly from mobile to desktop while maintaining aspect ratio (`w-full`, `max-w-[600px]`, `aspect-square`).
- **Production Ready**: Fully typed TypeScript, clean component architecture, single-file distribution, and 'use client' directive for Next.js app router compatibility.

## Tech Stack

- **React 19**
- **Framer Motion**: For complex entrance, hover, and SVG path animations.
- **Lucide React**: For consistent, high-quality vector icons.
- **Tailwind CSS**: For utility-first styling.

## Usage

Simply import the component and drop it into any page. It will automatically center itself and take up the available space up to 600x600px.

```tsx
import Dashboard from './App';

export default function Page() {
  return (
    <div className="h-screen w-screen bg-neutral-100">
      <Dashboard />
    </div>
  );
}
```