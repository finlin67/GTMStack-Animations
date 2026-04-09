# ABM Success Visualizer

An ABM success visualizer tile that presents account outcomes, campaign impact, and growth signal movement.

## Tech Stack
- **React 18+**: Component architecture.
- **Tailwind CSS**: Styling (colors, spacing, typography).
- **Framer Motion**: Complex entrance and value animations.
- **Lucide React**: Modern SVG iconography.

## Usage

1.  Ensure you have dependencies installed:
    ```bash
    npm install framer-motion lucide-react clsx tailwind-merge
    ```
2.  Import and drop the component into any container. It is designed to fit a 600x600 space but is flex-responsive.
    ```tsx
    import ABMPipeTrackerTile from './components/ABMPipeTrackerTile';

    function Dashboard() {
      return (
        <div className="flex justify-center items-center h-screen bg-slate-950">
          <ABMPipeTrackerTile />
        </div>
      )
    }
    ```

## App Name
**Royal Blue & Gold ABM Success Viz**