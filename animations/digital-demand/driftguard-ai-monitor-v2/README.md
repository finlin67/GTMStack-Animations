# DriftGuard AI Monitor

A DriftGuard monitoring tile that surfaces drift risk, model performance stability, and operational alert signals in real time.

## 🚀 Features

- **Real-Time Data Simulation**: Live-updating metrics for "Current Traffic" and "Total Sales" with organic jitter to simulate active server monitoring.
- **Seasonal Spike Mode**: Interactive toggle that simulates holiday traffic surges, instantly impacting data visualization and growth rates.
- **Cybernetic UI**: heavily stylized interface using deep navy backgrounds (`#020617`), electric blue (`#0ea5e9`) and deep purple (`#a855f7`) accents, complete with glassmorphism and neon glow effects.
- **Animated Visualizations**:
  - **Conversion Funnel**: Animated bar charts demonstrating user flow.
  - **Entrance Animations**: Staggered fade-ins and slide-ups using Framer Motion.
  - **Hover Effects**: Interactive states for feature grids and buttons.

## 🛠 Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS (Utility-first CSS)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📂 Project Structure

- **App.tsx**: The main application logic containing the dashboard layout, state management for the simulated data, and animation definitions.
- **index.html**: Entry point including Tailwind CDN and font links.
- **index.tsx**: React root mounting.

## 🎨 Customization

The application uses constant variables for its primary color scheme, making it easy to rebrand:

```typescript
// App.tsx
const PRIMARY_COLOR = "#0ea5e9"; // Electric Blue
const SECONDARY_COLOR = "#a855f7"; // Deep Purple
```

Modify these values or the `tailwind-like` utility strings (`GLOW_PRIMARY`, `GLASS_PANEL`) to adjust the visual theme.
