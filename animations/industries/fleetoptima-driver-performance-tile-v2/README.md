# FleetOptima Driver Performance Tile

A standalone, high-performance React component extracted from the FleetOptima dashboard system. This component visualizes driver metrics, weekly aggregates, and recent activity log in a rigid 600x600px dark-themed card.

## Tech Stack
- **React 18+**: Functional components with hooks.
- **Tailwind CSS**: Utility-first styling with custom arbitrary values for glows and grid backgrounds.
- **Framer Motion**: Smooth entrance animations for progress bars and list items.
- **Lucide React**: Modern, consistent iconography replacing Google Material Symbols.

## Usage
The component is self-contained in `components/FleetTile.tsx`. It relies on Tailwind CSS classes.

```tsx
import FleetTile from './components/FleetTile';

function Dashboard() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-950">
      <FleetTile />
    </div>
  );
}
```

## Features
- **Responsive Animations**: Progress bars fill up on mount; list items cascade in.
- **Visual Effects**: Custom CSS-in-Tailwind implementation for grid backgrounds and glow effects (box-shadow).
- **Interactive States**: Hover states on buttons, list items, and icons.
- **Strict Dimensions**: Maintains a 1:1 aspect ratio (600px square) as per design specifications.
