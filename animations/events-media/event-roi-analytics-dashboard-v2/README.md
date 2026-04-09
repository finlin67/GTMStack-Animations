# Event ROI Analytics Dashboard

An event analytics dashboard focused on funnel performance, ROI movement, and campaign efficiency across channels.

## Tech Stack
*   **React 18+**
*   **TypeScript**
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Animation)
*   **Lucide React** (Icons)

## Usage

1.  Import the component:
    ```tsx
    import EventMarketingTile from './components/EventMarketingTile';
    ```

2.  Place it within any container (it is optimized for a fixed 600x600 layout):
    ```tsx
    <div className="flex justify-center p-10">
      <EventMarketingTile />
    </div>
    ```

## Features
*   **Animated Funnel**: Staggered slide-in effects for funnel stages (Impressions, Page Visits, Registrations).
*   **SVG Chart Animation**: Drawing effect for the line chart path and pop-in animations for data points.
*   **Responsive Design**: Strictly optimized for a 600x600px grid tile.
*   **Dark Mode Support**: Built-in Tailwind dark mode classes that respond to the parent `dark` class.