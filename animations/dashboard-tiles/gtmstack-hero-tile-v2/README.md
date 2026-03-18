# GTMStack Hero Tile

## Description
This project features a high-fidelity, animated 600x600 hero tile designed for GTMStack, a consulting brand. The animation visualizes a three-phase journey: "Chaos" (scattered elements), "Routes" (connecting pathways representing integration), and "Stack" (an organized, vertically aligned technology stack). It serves as a visual metaphor for turning operational complexity into clarity and alignment.

## Tech Stack
- **React 19**: Core UI library.
- **TypeScript**: For type safety and structured data interfaces.
- **Framer Motion**: Handles complex SVG paths, layout transitions (Magic Motion), and sequence timing.
- **Tailwind CSS**: Utility-first styling for rapid UI development and consistent design tokens.
- **Lucide React**: Vector icons used for the distinct technology modules.

## Usage
1. **Installation**: Clone the repository and install dependencies using `npm install` or `yarn`.
2. **Running**: Start the development server (e.g., `npm run dev` in a Next.js environment).
3. **Behavior**: The component automatically cycles through three states:
   - **Chaos**: Icons float randomly with organic rotation.
   - **Routes**: Bezier curves draw connections between nodes to simulate networking.
   - **Stack**: Elements snap into a clean, vertical list with labels revealing themselves.
