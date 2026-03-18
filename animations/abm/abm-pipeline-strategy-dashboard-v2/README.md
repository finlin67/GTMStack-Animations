# ABM Pipeline Strategy Dashboard

A high-fidelity, interactive React component visualizing an Account-Based Marketing (ABM) strategy pipeline. This project demonstrates complex UI animations, real-time data simulation, and a "SaaS Premium" dark-mode aesthetic using Tailwind CSS and Framer Motion.

## 🚀 Key Features

*   **Real-time Data Simulation**: The dashboard simulates live metrics (Targeting, Engagement) using `setInterval` hooks inside `useEffect`, creating a dynamic sense of activity.
*   **Advanced Animations**:
    *   **SVG Path Drawing**: Graphs and trend lines animate in using `motion.path` with easing functions.
    *   **Shimmer Effects**: The "Launch Campaign" button features a continuous skewed gradient overlay (`animate={{ x: ["-100%", "200%"] }}`).
    *   **Layout Transitions**: The "Monthly/Quarterly" toggle uses a spring-based layout transition (`layoutId` concept simulated via absolute positioning) for the active state background.
    *   **Hover Micro-interactions**: Cards lift and glow (colored `box-shadow`) on interaction.
*   **High-Fidelity Design**:
    *   **Glassmorphism**: Usage of semi-transparent backgrounds (`bg-opacity`) with backdrops.
    *   **Neon Aesthetics**: Specialized color palette (`#00d2ff`, `#f59f0a`) against deep navy backgrounds (`#0a192f`, `#112240`).
*   **Scaling Architecture**: The app uses a CSS transform scaling strategy to fit a 1280px wide dashboard design into a fixed 600x600px container for thumbnail preview purposes.

## 🛠 Tech Stack

*   **React 19**: Component architecture and state management.
*   **Tailwind CSS**: Utility-first styling for rapid UI development.
*   **Framer Motion**: Complex animation sequences and gesture handling.
*   **Lucide React**: Consistent, lightweight iconography mapped from original SVGs.

## 📦 Component Structure

### `App.tsx`
The entry point wrapper. It handles the **Scaling Strategy**:
*   **Outer Container**: 600x600px (Fixed).
*   **Inner Content**: 1280x720px (Design resolution).
*   **Transform**: `scale(0.46875)` ensures the HD design fits perfectly within the thumbnail viewport without altering internal layout logic.

### `Dashboard.tsx`
The main view controller containing:
1.  **Header**: Navigation, status indicators, and profile settings.
2.  **Funnel Section**: Three `FunnelCard` components visualizing the conversion pipeline (Targeting -> Engagement -> Opportunity).
3.  **Growth Insights**: An SVG-based chart visualizing growth trends over a custom drawn grid.
4.  **Footer**: Key Performance Indicators (KPIs) and action buttons.

### Subcomponents
*   `FunnelCard`: A reusable card for pipeline stages with integrated mini-charts and motion effects.
*   `StatBox`: A footer component for displaying high-level metrics (ROI, Pipeline Value).
*   `TargetItem`: A row item for the "Priority Targets" list showing account tiers and status.

## 🎨 Customization

To modify the color theme, update the `COLORS` constant in `Dashboard.tsx`. The app relies heavily on Tailwind's arbitrary value syntax (e.g., `bg-[#0a192f]`) to achieve its specific "Deep Navy" look used in modern SaaS interfaces.