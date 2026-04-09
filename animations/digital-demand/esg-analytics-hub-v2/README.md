
# ESG Analytics Hub

An ESG analytics hub tile built to present environmental, social, and governance performance in a concise executive format.

## Features

- **Responsive Hero Tile Design**: 
  - Strictly constrained to a `max-w-[600px]` and `max-h-[600px]` square.
  - Scales gracefully to mobile devices while maintaining layout integrity.
- **Real-Time Data Simulation**: 
  - Organic data jitter simulation using React hooks (`useCallback`, `useEffect`).
  - No external data fetching required; self-contained logic.
- **Advanced Animations**:
  - **Framer Motion Integration**: Smooth entry staggering, hover states, and continuous background breathing effects.
  - **Physics-Based Needles**: The ROI gauge needle uses spring physics for realistic movement.
  - **Morphing SVGs**: The mini-chart seamlessly morphs between paths to simulate live data flow.
- **Zero Dependencies**: 
  - All sub-components (`MetricCard`, `QuickStat`, etc.) are flattened into the single file.
  - Styles are handled via Tailwind CSS and inline font injection.

## Usage

This component is "drop-in" ready. It requires:
1.  **Tailwind CSS** configuration for colors (or standard utility classes).
2.  **Framer Motion** installed (`npm install framer-motion`).
3.  **Lucide React** installed (`npm install lucide-react`).

The component creates its own layout context (`w-full h-full`) and centers itself, making it ideal for iframe embeds or dashboard grids.
