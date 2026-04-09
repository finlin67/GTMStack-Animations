# Student Lifecycle Analytics Dashboard

A student lifecycle analytics tile that maps application flow, enrollment progression, and retention growth signals.

## Tech Stack
*   **React 18+**
*   **TypeScript**
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Animation)
*   **Lucide React** (Icons)

## Usage

1.  Import the component:
    ```tsx
    import EDUMarketingTile from './components/EDUMarketingTile';
    ```

2.  Place it within any container (it will fill width up to `max-w-4xl`):
    ```tsx
    <div className="flex justify-center p-10">
      <EDUMarketingTile />
    </div>
    ```

## Features
*   **Animated Funnel**: Staggered slide-in effects for funnel stages (Applied, Admitted, Enrolled).
*   **SVG Chart Animation**: Drawing effect for the line chart path and pop-in animations for data points.
*   **Responsive Design**: Fully responsive layout adapting from mobile stacked views to desktop grid layouts.
*   **Dark Mode Support**: Built-in Tailwind dark mode classes that respond to the parent `dark` class.