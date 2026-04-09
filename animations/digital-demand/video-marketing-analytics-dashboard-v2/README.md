# Video Marketing Analytics Dashboard

A video marketing analytics tile built to visualize engagement quality, retention behavior, and campaign performance trends.

## Features

- **Interactive Video Player UI**: A simulated video player with play/pause functionality, animated progress bars, and hover effects.
- **Real-time Analytics Simulation**:
  - Dynamic counters for Views, Click-Through Rate (CTR), and Retention.
  - Organic "jitter" effects to simulate live data updates.
  - Interactive tooltips providing deep-dive insights on hover.
- **Social Proof Integration**: Mockup of active user base and platform reach.
- **Modern UI/UX**:
  - Glassmorphism effects (frosted glass backgrounds).
  - Gradient borders and text.
  - Smooth entrance animations using Framer Motion.
  - Responsive layout within a fixed 600x600 container.

## Tech Stack

- **React 19**: Core component architecture.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **Framer Motion**: Complex layout animations and micro-interactions.
- **Lucide React**: Vector icons.

## Getting Started

This project is designed to run in a modern browser environment supporting ES modules.

1. **Installation**: No build step is strictly required if using the provided `index.html` with CDN links, but for local development, a standard Vite/Next.js setup is recommended.
2. **Development**:
   - The entry point is `index.tsx`.
   - Styles are handled via Tailwind CSS (configured in `index.html`).

## Component Details

### `VideoMarketingAnalyticsTile` (`Video-Marketing-Analytics-Tile.tsx`)
The main container managing the state for:
- `stats`: An object holding current metrics (views, ctr, retention).
- `videoProgress`: Controls the playback bar animation.
- `hoveredStat`: Manages tooltip visibility state.

## Customization

To modify the color scheme, update the `tailwind.config` object in `index.html`:
```javascript
colors: {
  "primary": "#f20da6", // Pink/Magenta accent
  "background-light": "#0f172a",
  "background-dark": "#020617",
  "ui-dark": "#1e293b"
}
```