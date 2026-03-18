# DemandGen Pipeline Hero

## Description
SaaS Pipeline Hero is a high-performance landing page designed to demonstrate modern frontend capabilities using React and Tailwind CSS. The centerpiece of the application is an animated, isometric funnel visualization that dynamically represents the customer journey from awareness to action. It features real-time metric simulation, such as a live lead counter and floating source icons, providing an engaging user experience. The design utilizes a dark mode aesthetic with neon cyan and emerald accents to convey a futuristic, data-driven enterprise feel. The component architecture is modular, allowing for easy integration of the complex visualization into broader marketing sites.

## Tech Stack
*   **React 19**: Utilizing the latest concurrent features and hooks.
*   **Tailwind CSS**: For utility-first, responsive, and dark-mode styling.
*   **Framer Motion**: Powering complex SVG path animations, spring transitions, and staggering effects.
*   **Lucide React**: For consistent, lightweight SVG iconography.

## Usage
1.  The project uses standard ES Modules.
2.  The entry point is `index.html`, which loads the React application via `index.tsx`.
3.  The primary animated component is located in `components/DemandGenTile.tsx`.
4.  To modify the lead count simulation or animation speeds, adjust the `useEffect` hooks and `transition` props within the `DemandGenTile` component.
