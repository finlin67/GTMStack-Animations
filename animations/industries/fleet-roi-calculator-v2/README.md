
# Fleet ROI Calculator

A responsive "Hero Tile" React component that simulates a fleet management ROI calculator. This component is designed to be a self-contained, high-fidelity UI element suitable for dashboards or landing pages.

## Features

- **Interactive Inputs**:
  - **Fleet Size Slider**: A custom styled range input with a spring-animated thumb and track.
  - **Numeric Inputs**: Fields for Fuel Cost and Monthly Maintenance with real-time state updates.
- **Dynamic Calculation**: The "Projected Results" savings figure automatically updates based on input values.
- **Animations**:
  - **Number Counting**: The total savings amount counts up/down smoothly using Framer Motion's `animate` function.
  - **Chart Bars**: Visual bar chart elements animate in with a staggered spring effect on mount.
  - **Progress Bars**: Efficiency and Uptime indicators fill up smoothly.
- **Responsive Design**: The component scales to fit a square container, optimizing its layout for both mobile (stacked) and desktop (side-by-side) views within a 600x600px maximum constraint.

## Usage

This is a self-contained component. Simply import and drop it into any React application.

```tsx
import FleetROICalculator from './FleetROICalculator';

export default function Page() {
  return (
    <div className="w-full h-screen">
      <FleetROICalculator />
    </div>
  );
}
```

## Dependencies

- `react`
- `framer-motion`
- `lucide-react`
- `tailwindcss` (for styling)
