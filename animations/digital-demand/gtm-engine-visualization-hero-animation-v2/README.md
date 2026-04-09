# GTM Engine Visualization Hero Animation

A GTM hero animation tile that presents connected strategy nodes, growth signals, and performance pathways in one visual system.

## Tech Stack
*   **React 18+**
*   **TypeScript**
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Orchestration & Animation)
*   **Lucide React** (Icons)

## Components
1.  **GtmCoreTile.tsx**: The standalone, animated 600x600 (responsive) component. It features SVG path drawing, floating nodes with spring physics, and glowing pulse effects.
2.  **App.tsx**: The full landing page demonstrating the tile in its intended context.

## Usage
Import the component:
```tsx
import GtmCoreTile from './components/GtmCoreTile';

function MyPage() {
  return (
    <div className="w-[800px] h-[600px]">
      <GtmCoreTile />
    </div>
  );
}
```
The component is responsive but designed to look best in a container with an aspect ratio close to square (e.g., 600x600 or responsive grid columns).

## Color Palette
The application uses a specific high-contrast "Dark Mode" palette designed for data density and energy.

### Accents
*   `#00F0FF` : Electric Cyan (Primary Brand, Growth, Active States)
*   `#FF5E00` : Sunset Orange (Secondary Action, Alerts, Efficiency)
*   `#FFD700` : Signal Yellow (Highlights, ROI metrics)

### Backgrounds
*   `#020410` : Deepest Void (Global App Background)
*   `#040715` : Midnight Navy (Tile Background)
*   `#0F1528` : Card Surface (Inner containers)
*   `#141c36` : Card Hover State

### UI Elements
*   `#1E2745` : Borders & Separators
*   `#64748B` : Muted Text (Slate)
*   `#FFFFFF` : Primary Text & Grid Lines
