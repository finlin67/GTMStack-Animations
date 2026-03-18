# InfraCore DeepDive Dashboard

## Description
This project is a high-fidelity recreation of the "InfraCore DeepDive" infrastructure monitoring dashboard. It features a dark, glassmorphic UI with neon accents, real-time data visualization, and a responsive grid layout. The core highlight is the **MicroservicesHealthTile**, a self-contained, animated React component that visualizes the status of distributed services with dynamic pulse and hover effects.

## Tech Stack
- **React 18+**: Component-based UI architecture.
- **Tailwind CSS**: Utility-first styling for rapid development and glassmorphism effects.
- **Framer Motion**: Complex animations for the microservices grid and status indicators.
- **Lucide React**: Clean, consistent vector icons.

## Usage
1.  Clone the repository.
2.  Install dependencies: `npm install` (Ensure you have `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`).
3.  Run the development server: `npm run dev`.
4.  Navigate to `components/MicroservicesHealthTile.tsx` to view the isolated tile logic.
