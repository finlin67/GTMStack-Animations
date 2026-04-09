# Scalability Telemetry Radar

A scalability telemetry radar tile that highlights latency behavior, system growth, and live performance movement.

## Features

- **Responsive Hero Tile**: The component automatically centers itself and maintains a 1:1 aspect ratio, scaling down for mobile devices while capping at 600px on desktop.
- **Accessibility Enhanced**: High-contrast color palette (slate-100 text on slate-900 background), distinct borders, and brighter accent colors ensure readability for all users.
- **Live Telemetry Simulation**: React `useEffect` hooks simulate real-time data jitter for latency, asset count, and performance scores.
- **Animated Radar**: Features a continuous conic gradient sweep and pulsating blips powered by `framer-motion`.
- **Interactive ROI**: Hover over the bar chart to reveal precise monetary values with smooth tooltip animations.

## Technical Details

- **Framework**: React 19+
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Architecture**: Single-file component with no external local dependencies.
