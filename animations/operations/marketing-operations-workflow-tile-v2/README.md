
# Marketing Operations Workflow Tile

A marketing operations workflow tile that highlights process handoffs, system alignment, and throughput performance.

A 600x600 animated tile visualizing marketing operations workflows, governance, and throughput KPIs.

## Description

This project is a standalone React component, `MarketingOperationsTile`, extracted from a larger SaaS landing page concept called "OpsFlow". The component is a 600x600 animated tile designed to visually represent a marketing animations/animations\operations command center. It highlights concepts like data governance, process optimization, and tech stack integration through a dynamic and engaging interface. The tile uses smooth animations and data visualizations to display key performance indicators such as data accuracy and throughput velocity, making it an eye-catching hero element for a marketing technology product.

## Tech Stack

- **React:** v18+ (using hooks)
- **TypeScript**
- **Tailwind CSS:** For all styling (JIT with arbitrary properties)
- **Framer Motion:** For declarative animations
- **Lucide React:** For icons

## Usage

To use this component, import it into your React application and place it within a container. It is designed to be responsive and will fill the width of its parent container while maintaining a 1:1 aspect ratio, up to a maximum width of 600px.

```jsx
import MarketingOperationsTile from './components/MarketingOperationsTile';

function YourPage() {
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center p-4">
      <MarketingOperationsTile />
    </div>
  );
}
```

Ensure your project is set up with React, TypeScript, and Tailwind CSS. Framer Motion and Lucide React are required dependencies.

```bash
npm install framer-motion lucide-react
```
