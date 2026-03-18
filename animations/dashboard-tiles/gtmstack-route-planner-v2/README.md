# GTMStack Route Planner

A premium, high-fidelity React component visualizing a strategic Go-To-Market roadmap. This project demonstrates complex UI animations, organic data simulation, and glassmorphic design principles using React, Framer Motion, and Tailwind CSS.

## 🚀 Features

- **Organic Simulation**: Simulates a live "trip" through strategic waypoints (Discover → Optimize) with variable speeds and randomized data "drift".
- **High-End Visuals**: Features a "dark mode" aesthetic with glassmorphism, radial gradients, and subtle wash animations.
- **Complex Animations**:
  - Path traversal with simulated physics.
  - Magnetic compass needle that tracks the active waypoint.
  - Pulse effects and expanding rings.
- **Interactive Elements**: Hoverable waypoints with smooth, animated tooltips displaying stage status.
- **Real-time Metrics**: Live counters for Momentum, Pipeline Value, Engagements, and Win rates using tabular figures.

## 🛠️ Tech Stack

- **React 19**: Core UI library.
- **Framer Motion**: Handles all complex animations (orchestration, layout transitions, keyframes).
- **Tailwind CSS**: Utility-first styling for rapid, consistent design.
- **ES Modules**: Currently configured to run directly in the browser via `esm.sh` imports, but easily portable to Vite or Next.js.

## 📂 Project Structure

- `index.html`: Entry point. Sets up Tailwind CDN and Import Maps for React/Framer Motion.
- `index.tsx`: React entry point.
- `App.tsx`: Main application wrapper.
- `components/GTMStack.tsx`: The core component containing all logic, animation states, and SVG renders.
- `metadata.json`: Project metadata.

## 💻 Usage

### Running Locally
Since this project uses ES Modules via CDN, you can run it with any static file server.

1. **Python**: `python3 -m http.server`
2. **Node (http-server)**: `npx http-server .`
3. Open `http://localhost:8000` (or the port specified).

### Porting to Next.js / Vite
1. Copy `components/GTMStack.tsx` into your `src/components` folder.
2. Ensure `framer-motion` is installed:
   ```bash
   npm install framer-motion
   ```
3. Import and use `<GTMStack />` in your page.

## 🎨 Customization

You can modify the `W` (Waypoints) array in `GTMStack.tsx` to change the route stages:

```typescript
const W: Waypoint[] = [
  { x: 60, y: 262, name: "Phase 1", chip: "Start", color: "...", glow: "..." },
  // ...
];
```

*Note: The SVG path coordinates in `GTMStack.tsx` are hardcoded to match specific waypoint locations. If you move waypoints significantly, you will need to update the SVG path `d` attribute to align the visual route.*