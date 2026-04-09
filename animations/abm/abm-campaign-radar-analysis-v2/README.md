
# ABM Campaign Radar Analysis

A compact ABM dashboard tile that visualizes campaign reach, engagement signals, and account momentum through a radar-style interface.

## Overview

This component provides a futuristic, dark-mode dashboard interface for tracking project timelines, compliance gates (HIPAA), and stakeholder approvals. It uses a glassmorphism aesthetic with high-contrast cyan accents (`#00f2ff`).

## Technical Specs

-   **Framework**: React 19+
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Constraints**:
    -   Outer Container: `w-full h-full`
    -   Inner Content: `max-w-[600px] max-h-[600px]`
    -   Responsive: Scales down for mobile, stays centered and bounded on desktop.

## Features

1.  **Glassmorphism Cards**:
    -   Semi-transparent backgrounds (`rgba(15, 30, 45, 0.4)`).
    -   Backdrop blur (`16px`) for depth.
    -   Hover effects with border brightening.

2.  **Animations**:
    -   **Entry**: Elements stagger in with opacity and slide-up transforms.
    -   **Progress**: The "Overall Progress" bar fills smoothly on load.
    -   **Live Indicators**: Pulsing dots for real-time status simulation.

3.  **Responsive Layout**:
    -   Uses a vertical stack layout optimized for the 1:1 aspect ratio.
    -   Internal scrolling (`overflow-y-auto`) with a custom-styled scrollbar ensures content fits within the fixed height without breaking the tile boundaries.

## Usage

This component is self-contained in `index.tsx`. It automatically mounts to `#root` if present, but the default export `ExecutiveDashboard` can be imported and used in any other React application.

```tsx
import ExecutiveDashboard from './index';

export default function Page() {
  return (
    <div className="h-screen w-full bg-gray-900">
      <ExecutiveDashboard />
    </div>
  );
}
```
