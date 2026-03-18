# GrowthFlow SEO Engine

An interactive, high-performance React component designed to visualize B2B SEO strategies and Demand Generation workflows. This project demonstrates complex UI animations, particle systems, and real-time state management using **React**, **Framer Motion**, and **Tailwind CSS**.

## 🚀 Features

*   **Live Search Simulation:** A typewriter-effect search bar that cycles through high-value B2B keywords.
*   **Dynamic SERP Rankings:** Animated list items that simulate ranking fluctuations and layout shifts (`AnimatePresence`, `layout` prop).
*   **Traffic Particle System:** A generated particle flow visualizing lead acquisition, optimized for performance using React state pools.
*   **Real-time Metrics:** "Jitter" algorithms applied to stats (CTR, Organic Reach) to simulate live dashboard data.
*   **Modern UI:** Glassmorphism aesthetics, gradient text, and responsive layouts using Tailwind CSS.

## 🛠️ Tech Stack

*   **Framework:** React 19 (TypeScript)
*   **Styling:** Tailwind CSS (via CDN for portability, compatible with standard CLI)
*   **Animation:** Framer Motion (Orchestration, Layout Animations, Particles)
*   **Icons:** Lucide React
*   **Fonts:** Spline Sans (Google Fonts)

## 📂 Project Structure

*   `index.html`: Entry point, includes Tailwind CDN and Import Maps.
*   `index.tsx`: React root mounting.
*   `App.tsx`: Main application wrapper.
*   `components/SEOAnimation.tsx`: The core logic containing the typing engine, particle system, and UI rendering.

## 🎨 Customization

To modify the target keywords, edit the `KEYWORDS` array in `SEOAnimation.tsx`:

```typescript
const KEYWORDS = [
  "B2B Demand Generation",
  "SaaS Growth Marketing",
  ...
];
```

To adjust the animation speed or particle density, tweak the `setInterval` timing in the particle effect hook within the component.

## 📦 Usage

This component is designed to be dropped into any modern React application. Ensure `framer-motion` and `lucide-react` are installed in your `package.json` if moving to a CLI-based build.