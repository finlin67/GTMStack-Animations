# Content Marketing KPI Dashboard

A content marketing KPI dashboard tile designed to show stage-by-stage workflow performance and measurable growth outcomes.

## Description
The SaaS Growth Visualizer is an interactive, animated dashboard component designed to showcase a content marketing workflow and its impact on growth metrics. It features a dark-themed UI with glowing neon accents, representing stages like Ideation, Writing, Design, and Publishing connected by animated data paths. The dashboard includes real-time simulated data updates for key performance indicators such as Visitor Growth and Lead Generation, which pulse and animate to draw attention to positive trends. It serves as a high-fidelity visual prototype for SaaS analytics or marketing platforms.

## Tech Stack
*   **Framework:** React 19
*   **Styling:** Tailwind CSS (via CDN with custom config)
*   **Animation:** Framer Motion (v12)
*   **Icons:** Lucide React
*   **Bundling/Environment:** ES Modules (via `esm.sh` importmap)

## Usage
1.  Ensure you have a modern web browser that supports ES Modules and Import Maps.
2.  Open the `index.html` file using a local development server (e.g., Live Server in VS Code, `npx serve`, or `python -m http.server`).
    *   *Note: Opening the file directly via `file://` protocol may cause CORS issues with the ES module imports.*
3.  The dashboard will automatically render, animating the workflow paths and simulating live metric updates every few seconds.
