# Industrial ROI Dashboard

A premium, production-ready ROI dashboard designed for industrial manufacturing environments. This application provides high-fidelity visualizations of key performance indicators (KPIs) with a focus on aesthetics, real-time feedback, and executive-level reporting.

## 🚀 Key Features

- **Real-time KPI Tracking**: Dynamic updates for Efficiency Gain, OEE (Overall Equipment Effectiveness), Downtime Reduction, and ROI Payback periods.
- **Phase Monitoring**: Visual progress tracking through "Proof of Concept," "Pilot Phase," and "Global Rollout" stages with status indicators.
- **Validation Matrix**: A centralized hub for tracking stakeholder verifications across Finance, IT, Engineering, and Operations.
- **Industrial-Grade UI**: Built with a "dark-mode first" aesthetic using slate-based color palettes and primary blue accents.
- **Premium Animations**: Powered by Framer Motion, featuring slide-up entries, glowing pulse effects, and dynamic shimmer (glint) overlays on critical achievement markers.
- **Responsive Design**: Fluid layout optimized for dashboard displays and industrial control room monitors.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: TypeScript

## 📂 Project Structure

- `index.html`: Entry point with Tailwind configuration and custom CSS for global glint effects.
- `index.tsx`: React 19 mounting logic.
- `App.tsx`: Main layout container.
- `components/IndustrialDashboard.tsx`: The core dashboard component containing state management for live stats and all UI sections.
- `metadata.json`: Project configuration and permission requirements.

## 📈 Performance Indicators

The dashboard simulates a live environment with organic jitter in the data to demonstrate real-time synchronization capabilities:
- **Efficiency Gain**: Tracks production throughput improvements.
- **OEE**: Real-time equipment effectiveness measurement.
- **Downtime**: Negative percentage tracking for reduced maintenance intervals.
- **Payback**: Amortization schedule in months.

## 🎨 Design System

- **Primary Color**: `#308ce8` (Industrial Blue)
- **Background**: `#020617` (Deep Space Slate)
- **Panels**: `#1e293b` (Slate 800) with subtle borders
- **Typography**: Inter (Sans-serif) for maximum legibility in high-stress environments.

---

*Developed with a focus on high-stakes industrial data visualization.*