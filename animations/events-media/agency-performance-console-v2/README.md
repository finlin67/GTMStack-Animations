# Agency Performance Console

An agency performance console tile that surfaces campaign velocity, benchmark position, and operational system health.

## ✨ Key Features

- **Real-time Telemetry:** Statistics that feature an "organic jitter" effect to simulate live streaming data from high-traffic sources.
- **Content Velocity Grid:** A visual matrix representing content types (Video, Static, Data) currently active in the production pipeline.
- **Dynamic Growth Tracking:** Live monitoring of Reach, Engagement, and Viral Coefficients.
- **Global Benchmarks:** Side-by-side comparison of active campaigns and success rates against industry averages.
- **System Health:** Integrated latency and utilization tracking for backend processing services.
- **Optimized UI:** A fixed 600x600 console designed for precision monitoring, featuring smooth transitions via Framer Motion.

## 🛠️ Tech Stack

- **Core:** [React 19](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Runtime:** ESM-based browser imports (skips complex build steps for high portability)

## 📁 File Structure

- `index.html`: The shell of the application, including Tailwind configurations and the import map for dependencies.
- `App.tsx`: The layout engine that centers and constrains the console.
- `components/PerformanceConsole.tsx`: The "brain" of the app, containing telemetry logic, state updates, and the primary UI grid.
- `metadata.json`: Configuration for the application environment and permissions.

## 🚀 Performance Notes

The application uses a recursive `setTimeout` pattern with randomized intervals to provide a natural, non-linear update feel to the statistics. The UI is hardware-accelerated using Tailwind's transforms and Framer Motion's GPU-heavy layer optimization.

## 🎨 Design Guidelines

The dashboard follows a strict dark-mode aesthetic:
- **Primary Accent:** `#2b4bee` (Electric Blue)
- **Panel Depth:** Layered transparency with `bg-slate-900/40` and `backdrop-blur` effects.
- **Telemetry Indicators:** Color-coded status dots (Green for Optimized, Primary for Active).

---

*Built with precision for performance-focused creative agencies.*