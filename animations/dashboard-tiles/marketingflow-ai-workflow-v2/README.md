# MarketingFlow AI Workflow

Strategic Content Automation & Insight Engine. This high-fidelity dashboard visualizes a complete content marketing pipeline—from initial ideation to viral engagement optimization.
<center><img width="312" height="313" alt="image" src="https://github.com/user-attachments/assets/c4b3b174-a42e-4896-b28d-a49b8d16dde1" /></center><p></p>
## 🚀 Overview

MarketingFlow AI is a production-ready, 600x600px optimized React component designed to streamline the complex lifecycle of digital content. It combines real-time data visualization with generative AI capabilities to provide actionable marketing intelligence.

## ✨ Key Features

- **Interactive Campaign Pipeline**: Four distinct stages (Ideation, Creation, Distribution, Optimization) with real-time progress tracking.
- **Multi-Channel Distribution**: Integrated selector for targeting specific social platforms including X (Twitter), LinkedIn, Instagram, Facebook, and Threads.
- **AI-Powered Insights**: Seamless integration with the **Gemini 3 Flash** model to generate context-aware marketing optimizations based on selected distribution channels.
- **Live Performance Simulation**: Dynamic stat cards tracking Reach, ROI, and Lead Generation with animated growth metrics.
- **High-Fidelity UI**: Built with Framer Motion for fluid transitions and Tailwind CSS for a premium, glassmorphic aesthetic.


## 🛠️ Tech Stack

- **Framework**: React 19
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini API (@google/genai)
- **Typography**: Spline Sans

## 📦 Project Structure

- `App.tsx`: The core monolithic component containing all logic, sub-components, and styling.
- `index.html`: Main entry point with ESM import maps.
- `index.tsx`: React DOM initialization.
- `metadata.json`: Application configuration and permissions.

## 🚦 Getting Started

The application relies on the `process.env.API_KEY` for Gemini AI features. Ensure your environment is configured with a valid Google AI Studio API key to enable the "Generate Insight" functionality.

1. The app starts in the **Creation** phase by default.
2. Navigate to **Distribution** to select your target social media channels.
3. Click **Generate Insight** to receive a bespoke strategic recommendation from the Gemini AI engine.

---

*Built by Senior Frontend Engineering team for high-performance marketing visualization.*
