# Fintech Growth Animated Sales Tile

This project contains a high-fidelity recreation of a fintech landing page featuring a complex, interactive data visualization component (`FinServTile`).

## Description
The core focus is the `FinServTile` component: a self-contained, 600x600 responsive React component. It features orbiting rings, floating data cards with organic motion, and SVG chart animations. The component uses Framer Motion for high-performance animations (including draggability) and Tailwind CSS for precise styling, perfectly mimicking the provided design spec.

## Tech Stack
*   **React 18+**
*   **TypeScript**
*   **Tailwind CSS** (via CDN for portability)
*   **Framer Motion** (Animation & Drag physics)
*   **Lucide React** (Icons)

## Design System & Styling

The application uses a "Cyber-Fintech" aesthetic characterized by rich navy blues, neon data accents, and glassmorphism.

### Color Palette

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Navy Blue** | `#0f172a` | **Main application background** (Slate 900). |
| **Slate 800** | `#1e293b` | **Glass Card Backgrounds** (with opacity). |
| **Growth Teal** | `#0b8aad` | **Primary Brand Color**. Used for buttons, hubs, and primary highlights. |
| **Emerald** | `#10b981` | **Success/Data**. Used for positive trends, charts, and verification ticks. |
| **Soft Blue** | `#60a5fa` | **Secondary Accent**. Used for gradients, icons, and information nodes. |
| **Slate Borders** | `slate-700` | Subtle borders for glass cards. |

### Visual Effects

1.  **Glassmorphism**:
    *   Class: `bg-slate-800/60 backdrop-blur-xl border border-slate-700/50`
    *   Used on: Floating data cards to ensure readability against the Navy Blue background while maintaining depth.

2.  **Gradients**:
    *   **Text Gradient**: `from-[#10b981] to-[#60a5fa]` (Emerald to Soft Blue) for high-impact headers.
    *   **Hub Glow**: Radial gradients used behind the central hub to create depth.
    *   **Chart Line**: Linear gradient from Emerald to Primary Teal for the SVG path.

3.  **Background Texture**:
    *   A subtle radial grid pattern (`radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`) is applied to the main background to reduce visual flatness without creating noise.

### Typography
*   **Font Family**: `Inter` (Google Fonts)
*   **Weights Used**:
    *   300/400: Body text
    *   500/600: UI Labels
    *   700/900: Headings and Data Numbers

## Usage
1.  Navigate to `App.tsx` to see the full landing page context.
2.  The isolated component is located at `components/FinServTile.tsx`.
3.  The tile is fully responsive but optimized for a square aspect ratio. It fits into any container but works best when given a max-width of around 600px.
4.  Try dragging the floating cards in the visualization!

## App Name
Fintech Growth Studio