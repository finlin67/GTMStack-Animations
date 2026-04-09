# DevConsole Content Workflow

A DevConsole content workflow tile that visualizes production stages, live telemetry, and system optimization signals.

## 🚀 Overview

The **DevConsole** acts as a command center for marketing engineers. It tracks the progress of content through four key stages—Ideation, Creation, Optimization, and Publishing—while monitoring live system health and campaign performance telemetry.

## ✨ Key Features

- **Workflow Sequence Tracker**: Visualizes the current state of the content pipeline (Ideate → Create → Optimize → Publish) with real-time status indicators.
- **Telemetry Live**: Tracks critical campaign metrics including `Omni_Channel_Reach` and `Retention_Coefficient` with dynamic trend indicators.
- **System Metrics**: Real-time monitoring of `CPU_CORE_HEURISTICS` and `THROUGHPUT_EFFICIENCY` using animated progress bars.
- **AI Advisor**: Integrated with Google Gemini API to provide instant, technically-themed system status insights and optimization recommendations.
- **Interactive Terminal**: A persistent `console_log` that records system boot sequences, AI communications, and user actions.
- **CRT Visual Aesthetic**: A stylized UI featuring scanline overlays, radial gradients, glitch effects, and high-contrast typography optimized for a 600x600 view.

## 🛠 Technical Stack

- **Framework**: React 19 (ESM)
- **Animation**: Framer Motion (v12+) for smooth state transitions and layout animations.
- **Styling**: Tailwind CSS for high-speed utility-first UI construction.
- **Icons**: Lucide React for consistent technical iconography.
- **AI Engine**: Google Generative AI (Gemini 3 Flash) for generating contextual system logs.
- **Typography**: JetBrains Mono for that authentic "developer console" readability.

## 📐 Architecture & Constraints

- **Fixed Dimensions**: The application is strictly optimized for a **600px x 600px** container, ensuring a dense, data-rich dashboard experience without vertical scrolling.
- **Single-File Logic**: The core application logic resides in `App.tsx` for maximum portability and rapid deployment.
- **State Management**: Uses React hooks (`useState`, `useEffect`, `useMemo`, `useRef`) to handle complex periodic data updates and auto-scrolling terminal logs.

## 🤖 AI Integration Details

The `AI_ADVISOR` feature leverages the `gemini-3-flash-preview` model. It is configured with specific system instructions to return concise, 5-8 word technical status updates in all-caps, maintaining the "System Core" persona of the console.

---

*Developed by World-Class Frontend Engineers.*