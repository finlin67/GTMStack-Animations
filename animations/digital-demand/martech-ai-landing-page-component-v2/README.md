
# MarTech AI Landing Page Component

## Description

This project showcases a standalone, animated React component extracted from a larger MarTech AI landing page prototype. The primary component, `MarTechTile`, is a dynamic visualization of a marketing technology ecosystem. It features a central hub with connecting nodes representing different services like CRM and Automation, along with real-time metric cards that update with a subtle "jitter" effect to simulate live data. The component is built to be fully responsive and self-contained.

## Tech Stack

- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (for icons)

## Usage

To use the `MarTechTile` component, simply import it into your React application and place it within a container. It is designed to be responsive and will adapt to the width of its parent element while maintaining a consistent aspect ratio on smaller screens.

```jsx
import MarTechTile from './components/MarTechTile';

function MyPage() {
  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <MarTechTile />
    </div>
  );
}
```
To run the full landing page demo, start the development server. The `App.tsx` file renders the complete page with the `MarTechTile` component integrated into its hero section.
