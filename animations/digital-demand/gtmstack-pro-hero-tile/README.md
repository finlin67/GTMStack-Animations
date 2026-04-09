# GTMStack Pro Hero Tile

A premium GTMStack hero tile that visualizes the transition from disconnected processes to a unified go-to-market operating model.

## 🧠 Context & Creative Strategy
This project features a high-fidelity, animated 600x600 hero tile designed for GTMStack, a consulting brand. The animation visualizes a three-phase journey: "Chaos" (scattered elements), "Routes" (connecting pathways representing integration), and "Stack" (an organized, vertically aligned technology stack). It serves as a visual metaphor for turning operational complexity into clarity and alignment.

## 🎯 Purpose & Value Proposition
The primary goal of this component is to communicate GTMStack's core value proposition: bringing order to the typically fragmented world of go-to-market animations/animations\operations. By using motion, we demonstrate the transition from individual tool silos to a unified, high-performance architecture.

## 🚀 Ideal Use Cases
- **B2B Consulting Hero Sections**: Perfectly sized for square landing page slots.
- **Strategy Pitch Decks**: Can be used as a looping background for "Our Process" slides.
- **RevOps Dashboards**: Serves as an aesthetic onboarding or status visualization.

## 👤 Target Audience
- **RevOps Professionals**: Those looking for streamlined tool integration.
- **B2B Founders**: Seeking to align their sales, marketing, and success stacks.
- **Consultants**: Professional services firms needing high-end visual assets for their GTM methodology.

## 🎨 Design Philosophy
The design follows a "Premium Dark" aesthetic, utilizing a `slate-950` foundation to allow the vibrant module gradients to pop. The use of glassmorphism (glossy overlays) and thin stroke lines creates a technical, precise feel characteristic of high-end data platforms.

## 🛠️ Tech Stack
- **React 19**: Core UI library.
- **TypeScript**: For type safety and structured data interfaces.
- **Framer Motion**: Handles complex SVG paths, layout transitions (Magic Motion), and sequence timing.
- **Tailwind CSS**: Utility-first styling for rapid UI development and consistent design tokens.
- **Lucide React**: Vector icons used for the distinct technology modules.

## ⚙️ Usage
1. **Installation**: Clone the repository and install dependencies using `npm install` or `yarn`.
2. **Running**: Start the development server (e.g., `npm run dev`).
3. **Integration**: Import `<GTMStackHero />` into any React container with at least 600px of space.

## 🌈 Color Palette

### Core Theme
| Usage | Hex Code | Tailwind Name |
| :--- | :--- | :--- |
| **Main Background** | `#020617` | `slate-950` |
| **Container/Borders** | `#1e293b` | `slate-800` |
| **Grid Lines** | `#334155` | `slate-700` |
| **Primary Text** | `#ffffff` | `white` |
| **Secondary Text** | `#64748b` | `slate-500` |
| **Primary Accent** | `#22d3ee` | `cyan-400` |

### Module Gradients
| Module | Start Color | End Color |
| :--- | :--- | :--- |
| **Data Layer** | `#3b82f6` (Blue 500) | `#1d4ed8` (Blue 700) |
| **Global Network** | `#8b5cf6` (Violet 500) | `#6d28d9` (Violet 700) |
| **Integration** | `#10b981` (Emerald 500) | `#047857` (Emerald 700) |
| **Automation** | `#f59e0b` (Amber 500) | `#ea580c` (Orange 600) |
| **Orchestration** | `#06b6d4` (Cyan 500) | `#0e7490` (Cyan 700) |
| **Audience** | `#f43f5e` (Rose 500) | `#be123c` (Rose 700) |
| **Analytics** | `#a855f7` (Purple 500) | `#4338ca` (Indigo 700) |

## ✨ Key Features
- **Dynamic 3-Phase Animation**: Cycles automatically between Chaos, Mapping, and Stack.
- **Spring-Based Physics**: Smooth, interruptible transitions between layout states.
- **SVG Route Mapping**: Real-time generation of Bezier curves to represent networking.
- **Glossy UI Elements**: Modules feature internal gradients and gloss for a premium "Apple-like" feel.
- **Responsive Square Aspect**: Designed strictly for 600x600 high-density displays.

## 📂 Project Structure
- `index.tsx`: Main entry point and mounting logic.
- `App.tsx`: Root application layout.
- `components/GTMStackHero.tsx`: The primary state-driven animation engine.
- `components/BackgroundGrid.tsx`: SVG-based decorative grid and contour background.
- `types.ts`: Shared data structures for phases and module data.
- `styles.css`: Base typography and global reset styles.