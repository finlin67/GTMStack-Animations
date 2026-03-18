# GrowthCore Component Extraction

## Description
This project is a faithful React + Tailwind migration of the GrowthCore SaaS landing page, featuring a complex extracted component: `CustomerMarketingTile`. The `CustomerMarketingTile` is a 600x600 animated data visualization module that demonstrates net retention, user avatars, and growth metrics with entrance animations. It simulates a "production-ready" dashboard element found in modern enterprise SaaS applications.

## Tech Stack
- **React 18+** (via Vite/CRA structure)
- **Tailwind CSS** (Styling engine)
- **Framer Motion** (Animation library for entrance effects and floating elements)
- **Lucide React** (Iconography)

## Migration to Cursor / Next.js / Vite
To bring this project into a local editor like Cursor:

1. **Initialize Project:**
   ```bash
   npx create-next-app@latest growth-core --typescript --tailwind --eslint
   # OR
   npm create vite@latest growth-core -- --template react-ts
   ```

2. **Copy Files:**
   - Move `components/` folder to `src/components/`.
   - Copy `globals.css` to `src/app/globals.css` (Next.js) or `src/index.css` (Vite).
   - Copy `tailwind.config.js` content to your local configuration.

3. **Install Dependencies:**
   ```bash
   npm install framer-motion lucide-react clsx tailwind-merge
   ```

## Design System & CSS Palette

The application utilizes a dark-mode-first aesthetic built on the Tailwind CSS Slate scale, accented with vibrant Purples and Blues.

### Color Palette

| Usage | Tailwind Class | Hex Code (Approx) |
| :--- | :--- | :--- |
| **Backgrounds** | | |
| Main Page | `bg-slate-950` | `#020617` |
| Cards / Panels | `bg-slate-900` | `#0f172a` |
| Glass Layers | `bg-white/5`, `bg-white/10` | `rgba(255,255,255, 0.05-0.1)` |
| **Primary Accents** | | |
| Brand Primary | `purple-500` | `#a855f7` |
| Brand Secondary | `blue-500` | `#3b82f6` |
| Success / Up Trend | `emerald-500` | `#10b981` |
| Alt Accent | `pink-500` | `#ec4899` |
| **Typography** | | |
| Headings | `text-white` | `#ffffff` |
| Body Text | `text-slate-300` | `#cbd5e1` |
| Muted Labels | `text-slate-500` | `#64748b` |

### Gradients
- **Text Gradient:** `from-purple-500 via-purple-400 to-blue-500`
- **Orb/Orbital:** `from-purple-500 via-purple-500 to-blue-500`
- **Glass Panel:** `from-white/10 to-white/5`

### Effects
- **Glassmorphism:** Heavily relies on `backdrop-blur-sm` through `backdrop-blur-xl` combined with transparent white borders (`border-white/10`).
- **Glows:** Uses colored shadows (e.g., `shadow-purple-500/20`) and absolute positioned blur divs (`blur-[100px]`) to create atmospheric lighting.

### Typography
- **Font Family:** Inter (`font-sans`)
- **Weights:** Heavy use of `font-bold` (700) and `font-black` (900) for headers and metrics.

## Usage
1. Ensure dependencies are installed: `npm install framer-motion lucide-react clsx tailwind-merge`
2. Run the development server.
3. Observe the entrance animations on the hero section tile upon page load.

## App Name
GrowthCore Visualization Engine