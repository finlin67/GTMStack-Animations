# Growth.AI - Harmonic Quad-Tone

## Description
This project showcases a high-performance React landing page featuring the "Harmonic Quad-Tone" AI growth visualization. The centerpiece is a self-contained, 600x600 floating tile component (`AIGrowth.tsx`) that uses Framer Motion for organic, physics-based animations to simulate a live data dashboard. It demonstrates strict component isolation, modern TypeScript practices, and responsive Tailwind styling suitable for drop-in use within larger Next.js or Vite applications.

## Tech Stack
*   **React 19**: Utilizing strict mode and functional components.
*   **Tailwind CSS**: Utility-first styling for layout and typography.
*   **Framer Motion**: Advanced animation library for fluid, state-driven motion.
*   **Lucide React**: Lightweight, consistent SVG icons.
*   **TypeScript**: Strongly typed interfaces and event handling.

## Design System & CSS

### Color Palette
The application utilizes a dark, high-contrast theme based on the Slate scale, accented by vibrant "Quad-Tone" indicators designed to pop against the dark mode interface.

**Core Backgrounds**
*   **Main Canvas**: `bg-[#0f172a]` (Slate 950/900 mix)
*   **Component Surface**: `bg-[#1e293b]` (Slate 800)
*   **Card Background**: `bg-slate-900`

**Harmonic Accents**
*   **Intelligence Blue**: `text-blue-400` / `bg-blue-500` (#3b82f6)
*   **Growth Purple**: `text-purple-400` / `bg-purple-600` (#9333ea)
*   **Sentiment Green**: `text-green-400` / `bg-green-500` (#22c55e)
*   **Alert Red**: `text-red-400` / `bg-red-500` (#ef4444)

### Gradients & Effects
*   **Brand Gradient**: `linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)`
    *   *Usage*: Header and Footer borders.
*   **Headline Highlight**: `bg-gradient-to-br from-purple-400 to-pink-500`
    *   *Usage*: "AI Precision" text.
*   **Gold Standard**: `bg-gradient-to-br from-amber-300 to-amber-500`
    *   *Usage*: Primary metric display (+42%).
*   **Primary CTA**: `bg-gradient-to-r from-blue-600 to-purple-600`
*   **Conversion CTA**: `bg-gradient-to-r from-green-600 to-emerald-500`
*   **Roadmap CTA**: `bg-gradient-to-r from-blue-700 to-indigo-600`

### Typography
*   **Font Family**: `Space Grotesk` (via Google Fonts)
*   **Characteristics**: Sans-serif, geometric, high-legibility.
*   **Styling**: Heavily utilizes uppercase tracking (`tracking-widest`, `tracking-[0.2em]`) for labels and tight leading (`leading-none`, `tracking-tighter`) for display headings.

## Usage
1.  Clone the repository and install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open your browser to the local server address (usually `http://localhost:3000` or `http://localhost:5173`).
4.  To reuse the animated tile, simply copy `components/AIGrowth.tsx` into your project and import it. It requires no external CSS files.

## App Name
Growth.AI - Harmonic Quad-Tone