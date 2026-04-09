# ABM Flow Premium Tile

A premium ABM visualization tile designed to show account flow, stage velocity, and pipeline health in a compact executive-friendly layout.

## 🧠 Context & Creative Strategy
The ABM Flow Premium Tile is designed to provide a high-impact, real-time visualization of Account-Based Marketing (ABM) funnels. It bridges the gap between raw data and executive-level storytelling by using a particle-based "flow" that represents accounts moving through the pipeline.

## 🎯 Purpose & Value Proposition
- **Real-time Visibility**: Instantly see the health of your ABM efforts.
- **Engagement Tracking**: Visualize how many accounts are transitioning from targeting to active engagement.
- **Pipeline Velocity**: Get a sense of how quickly opportunities are being created.

## 🚀 Ideal Use Cases
- SaaS Marketing Dashboards
- Sales Operations Command Centers
- Executive Reporting Tools
- ABM Platform Interfaces

## 👤 Target Audience
- Marketing Managers
- Sales Leaders
- Demand Generation Specialists
- Revenue Operations (RevOps) Teams

## 🎨 Design Philosophy
- **Industrial/Technical**: Uses a dot grid background and sharp, asymmetric card shapes to convey precision and technical sophistication.
- **High Contrast**: A clean white background with bold black borders and vibrant accent colors for clear hierarchy.
- **Dynamic Feedback**: Particle animations and hover states provide immediate interactive feedback.

## 🛠️ Tech Stack
- **React 19**: Modern functional components and hooks.
- **Framer Motion**: For complex, stage-aware particle animations and layout transitions.
- **Tailwind CSS**: Utility-first styling for rapid, consistent design.
- **Lucide React**: Crisp, consistent iconography.

## ⚙️ Usage
The tile is a standalone component that can be dropped into any dashboard. It manages its own internal simulation of account flow, which can be easily hooked up to real-time API data.

## 🌈 Color Palette
- **Target (Phase 01)**: `#F2805A` (Descriptive Orange)
- **Engaged (Phase 02)**: `#F7B92D` (Diagnostic Yellow)
- **Opportunity (Phase 03)**: `#48C0A4` (Predictive Teal)
- **Neutral/UI**: Black, White, and subtle Grays.

## ✨ Key Features
- **Particle Funnel**: Real-time animation of accounts moving through stages.
- **Expandable Stage Cards**: Deep-dive into specific metrics for each funnel phase.
- **Live System Indicator**: Pulse animation to signal active data processing.
- **Summary Stats**: Bottom-line metrics for total units, pipeline, and efficiency.

## 📂 Project Structure
- `/src/App.tsx`: Main application container.
- `/src/components/ABMFlowTile.tsx`: The core dashboard component.
- `/src/index.css`: Global styles and Tailwind configuration.
- `/metadata.json`: Applet metadata and permissions.
