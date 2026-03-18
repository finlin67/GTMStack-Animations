# Lifecycle Engine Dashboard

A high-density, futuristic React dashboard designed to visualize user lifecycle metrics, system performance, and live engagement feeds. This project demonstrates complex UI composition, real-time data simulation ("organic jitter"), and smooth animations using Framer Motion.

## 🚀 Features

- **Lifecycle Flywheel:** Visualizes the user journey (Awareness → Engagement → Retention → Loyalty) with connecting animations.
- **Real-time Data Simulation:** Metrics naturally fluctuate to simulate a live environment without needing a backend.
- **Retention Heatmap:** A color-coded cohort analysis table for visualizing user retention rates over time.
- **Live Event Feed:** A streaming feed of user actions and system alerts with add/remove animations and a "Clear Feed" utility.
- **System Performance:** Monitoring widgets for CPU, Memory, and Network usage with animated bar graphs and gauges.
- **Responsive Design:** Centered, constrained layout ensuring optimal viewing on various screen sizes while maintaining a "dashboard" feel.

## 🛠️ Tech Stack

- **Framework:** React 19 (via ESM imports)
- **Styling:** Tailwind CSS (via CDN)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## 📂 Project Structure

- **`index.tsx`**: Entry point. Mounts the application to the DOM.
- **`Lifecycle-Engine-Dashboard.tsx`**: The main component containing all dashboard logic, state management, and UI rendering.
- **`index.html`**: HTML shell containing Tailwind CDN and Import Maps for dependencies.

## 🎨 Customization

### Modifying Data
The dashboard uses constant objects for initial state. You can modify these in `Lifecycle-Engine-Dashboard.tsx`:

- `INITIAL_STATS`: Adjust baseline user metrics.
- `INITIAL_PERF`: Adjust starting system performance values.
- `FEED_ITEMS`: Change the initial items in the live stream.

### Adjusting Animations
Animations are handled via `useEffect` hooks for data updates and `Framer Motion` props for visuals.
- Look for `// -- Organic Jitter Logic --` comments to tune update frequency and variance.
- Adjust `transition` props on `<motion.div>` elements to change animation speeds.
