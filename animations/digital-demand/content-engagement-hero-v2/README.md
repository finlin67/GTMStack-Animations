# Content Engagement Hero

## Description
The Content Engagement Hero is a highly interactive, standalone React component designed to visualize complex content marketing workflows. It features a striking glassmorphism aesthetic with neon accents, simulating a futuristic command center for managing content distribution across multiple channels like Blog, Social, Email, and Video. The component showcases advanced animation techniques using Framer Motion, including sequential staggered reveals, floating metric cards with organic vertical oscillation, and smooth number counting effects. It serves as a polished "hero" element for SaaS landing pages, demonstrating the potential for rich, data-driven UI experiences in modern web applications.

## Tech Stack
*   **React 19:** Utilizing functional components and modern hooks (`useState`, `useEffect`) for state management and animation timing.
*   **Tailwind CSS:** For rapid, utility-first styling, ensuring responsive design and consistent theming (colors, spacing, typography).
*   **Framer Motion:** Powering the complex entrance animations, spring physics, and continuous floating effects of the UI elements.
*   **Lucide React:** Providing clean, consistent SVG iconography that matches the minimal aesthetic.

## Usage

### Installation
Ensure you have Node.js installed, then run:

```bash
npm install
```

### Running the App
To start the development server and view the landing page:

```bash
npm run dev
```

### Using the Component
You can import the isolated tile component into any part of your application. It is self-contained and maintains a rigid 600x600 dimension (responsive via scaling).

```tsx
import ContentEngagementTile from './components/ContentEngagementTile';

function MyPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-950">
      <ContentEngagementTile />
    </div>
  );
}
```