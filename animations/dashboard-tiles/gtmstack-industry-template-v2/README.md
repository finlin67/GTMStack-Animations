# GTMStack Industry Template

A dynamic, high-performance landing page template designed for GTM (Go-To-Market) strategy consulting. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Design System & Color Palette

The project uses a sophisticated dark-mode theme defined in the Tailwind configuration within `index.html`.

### Color Palette

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Navy** | | **Primary Backgrounds** |
| `navy-900` | `#0A0F2D` | Main body background, deep contrast areas |
| `navy-800` | `#11183f` | Card backgrounds, secondary sections |
| `navy-700` | `#1a2255` | Borders, scrollbar thumbs, subtle separators |
| **Teal** | | **Primary Brand & Actions** |
| `teal` (DEFAULT) | `#00A8A8` | Primary buttons, icons, brand highlights |
| `teal-400` | `#2ccdc9` | Hover states, bright text gradients |
| `teal-900` | `#004d4d` | Deep glowing effects, subtle backgrounds |
| **Gold** | | **Secondary Accents** |
| `gold` (DEFAULT) | `#FFD700` | CTAs, success metrics, high-priority icons |
| `gold-400` | `#ffe033` | Gold hover states |

### Typography

*   **Font Family:** `Inter`, sans-serif
*   **Source:** Google Fonts (`https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap`)

### Global CSS Overrides

The application applies specific global styles for the document body and scrollbars to ensure a cohesive dark-mode experience.

*   **Body Background:** `#0A0F2D`
*   **Default Text Color:** `#ffffff`
*   **Custom Scrollbar:**
    *   **Width:** `8px`
    *   **Track:** `#0A0F2D` (Matches body bg)
    *   **Thumb:** `#1a2255` (Rounded 4px)
    *   **Thumb Hover:** `#00A8A8` (Teal highlight)

## 🛠 Tech Stack

*   **Framework:** React 19
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (configured via script in `index.html`)
*   **Animations:** Framer Motion
*   **Icons:** Lucide React

## 📂 Project Structure

*   `App.tsx`: Main entry point managing industry state.
*   `data.ts`: Contains the content for Manufacturing, SaaS, and Fintech animations/animations\industries.
*   `components/`: Reusable UI components (Hero, Navbar, Services, etc.).
*   `index.html`: Contains the Tailwind configuration and global styles.
