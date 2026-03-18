# ABM Network Dashboard v2

## Description
A real-time account-based marketing network topology and engagement dashboard featuring interactive data visualization. This application visualizes complex marketing data in a high-fidelity, compact interface.

## Features
- **Interactive Network Topology**: Visual graph of marketing touchpoints with clickable nodes and animated connections.
- **Real-time Metrics**: Live counter animations for key performance indicators (Total Accounts, Engaged, Pipeline).
- **Engagement Flow**: Visual breakdown of marketing channels (Email, Ads, SDR) with progress bars.
- **High-Fidelity UI**: Glassmorphism design with Framer Motion animations and responsive layouts.
- **Compact Widget Mode**: Optimized for a 600x600px container view.

## Technologies Used
- **React 18**: Component-based UI architecture.
- **TypeScript**: Type-safe development.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **Framer Motion**: Production-ready animation library for complex gestures and transitions.
- **Lucide React**: Modern, consistent icon set.

## Setup & Installation
1. Clone the repository.
2. Install dependencies (standard React environment).
3. Run the development server.

*Note: This project is configured to run in a browser-based environment or standard Vite/CRA setup.*

## File Structure
- `index.html`: Entry HTML with Tailwind script and font imports.
- `App.tsx`: Main application controller and layout.
- `components/`:
  - `NetworkTopology.tsx`: The interactive graph visualization.
  - `StatCard.tsx`: Reusable metric component (legacy support).
  - `TouchpointRow.tsx`: Reusable list row component (legacy support).
- `types.ts`: TypeScript definitions for props and data models.
