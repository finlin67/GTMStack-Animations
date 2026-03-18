# EdTech Compact ROI Funnel

A dark-themed, glassmorphic ROI funnel dashboard designed for EdTech marketing agencies.

## Features

- **Interactive Funnel**: Animated progress bars and hover effects for different funnel stages (Awareness, Interest, Application, Enrolled).
- **Data Visualization**: Key metrics (ROI, Growth, CPE, LTV) with trend indicators.
- **Contextual Tooltips**: Hover over funnel stages for detailed insights and conversion rates.
- **Academic Alignment**: Visual bar chart alignment with academic calendars (Peak Intake highlighting).
- **Responsive Design**: Scales comfortably within a hero tile layout (max 600px).
- **Tech Stack**: React, Tailwind CSS, Framer Motion, Lucide React.

## Components

### `EdTechROIFunnel`
The main dashboard component. It is self-contained and handles all animations and state.

## Usage

This project is set up to run in a standard React environment (Next.js/Vite).

```tsx
import EdTechROIFunnel from './components/EdTech-ROI-Funnel';

function Page() {
  return <EdTechROIFunnel />;
}
```
