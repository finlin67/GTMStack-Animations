# GTMStack.pro

## Description
GTMStack.pro is a high-performance B2B consulting portfolio designed to showcase expertise in Go-To-Market strategies for SaaS companies. The application features a sophisticated "Deep Space" aesthetic with interactive elements, including a filterable expertise matrix, animated statistics, and a chronological professional timeline. Users can explore services through a responsive grid layout that supports detailed expansion and smooth transitions, providing a premium browsing experience. The site serves as a dynamic digital hub for potential clients to review case studies, understand service offerings, and initiate engagement.

## Tech Stack
*   **Core Framework:** React 19 (TypeScript)
*   **Styling:** Tailwind CSS (via CDN with custom config)
*   **Animation:** Framer Motion (Layout animations, AnimatePresence, micro-interactions)
*   **Routing:** React Router DOM (HashRouter)
*   **Icons:** Lucide React
*   **Fonts:** Google Fonts (Inter & Outfit)

## Usage
1.  **Navigation:** Use the top navigation bar to move between "Home", "About Me", and "Expertise".
2.  **Home:** View high-level metrics and core competencies. Hover over feature cards for micro-interactions.
3.  **About Me:** Toggle between the "Timeline" and "Key Projects" tabs. Use the industry chips (SaaS, FinTech, etc.) to filter the experience timeline.
4.  **Expertise:** 
    *   Click the top-bar category buttons to filter services by domain (Content, Demand, Strategy, Systems).
    *   Click "Learn More" on any service card to smoothly expand the details section, revealing specific deliverables and case studies with staggered entrance animations.

## Colors & UI System

### Typography
*   **Display:** 'Outfit', sans-serif (Headings, specific numbers)
*   **Body:** 'Inter', sans-serif (Paragraphs, UI text)

### Color Palette

**Core Backgrounds**
*   `Navy`: #020410 (Deep Space Black/Blue)
*   `Midnight`: #0B1121 (Dark Slate)

**Primary Accents**
*   `Electric Blue`: #0088FF (Primary buttons, active states, highlights)
*   `Gold`: #FFD700 (Milestones)

**Functional Categories**
*   `Peach` (Content): #FDBA74
*   `Neon Mint` (Demand): #00E699 (High visibility for growth metrics)
*   `Deep Indigo` (Strategy): #1E1B4B (Backgrounds), #818CF8 (Text)
*   `Electric Cyan` (Systems): #22D3EE

**UI Elements**
*   `Glass Borders`: White/10% opacity
*   `Text Primary`: #FFFFFF
*   `Text Secondary`: #9CA3AF (Gray-400)
