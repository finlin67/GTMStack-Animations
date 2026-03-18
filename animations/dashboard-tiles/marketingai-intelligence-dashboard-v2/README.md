# MarketingAI Intelligence Dashboard
<h1 align="center">MarketingAI Intelligence Dashboard</h1>


A high-fidelity dashboard interface featuring a standalone, animated neural network visualization tile using React, Tailwind CSS, and Framer Motion.

## Component: MarketingAITile

The `MarketingAITile` is a self-contained React component that visualizes a central intelligence node with data ingestion and decision output flows. It features simulated live data updates and complex SVG path animations.

### Tech Stack
- **React 19**: Component structure and state management.
- **Tailwind CSS**: Utility-first styling including arbitrary values for gradients and glow effects.
- **Framer Motion**: Complex animation sequences for SVG paths and element transitions.
- **Lucide React**: Modern, consistent iconography.

### Usage

To use the tile in your project, simply import it and drop it into a container. It is responsive and will fill its parent container.

```tsx
import MarketingAITile from './components/MarketingAITile';

function MyPage() {
  return (
    <div className="w-full h-[600px]">
      <MarketingAITile />
    </div>
  );
}
```

### Installation Dependencies

Ensure you have the following installed in your `package.json` or Import Map:

- `react`
- `react-dom`
- `framer-motion`
- `lucide-react`
- `tailwindcss` (configured)
