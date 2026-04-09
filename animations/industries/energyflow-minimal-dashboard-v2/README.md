# EnergyFlow Minimal Dashboard

An EnergyFlow dashboard tile that highlights asset status, workflow progression, and efficiency signals in a minimal layout.

## Features

*   **Interactive Asset Map:** A new geographical distribution view showing key operational sites (Permian Hub, Pacific Grid, etc.). Includes status indicators (Optimal, Warning, Maintenance) and detailed asset popups.
*   **High-Fidelity Surface UI:** Refactored using "High-Fidelity Surfaces" with a randomized Professional Light (Warm Vanilla/Soft Gray) or Modern Deep (Navy/Slate/Indigo) theme.
*   **View Toggle:** A seamless transition between 'Integrity Analysis' (metrics) and 'Global Asset Distribution' (map) within the central widget.
*   **Glassmorphism & Elevation:** Dark mode utilizes backdrop-blur glass effects, while light mode uses elevated white cards with soft shadows.
*   **Operational Sequence Filter:** Allows users to filter project phases by 'Active' status or view 'All' phases with animated reordering.
*   **Live Data Simulation:** Simulated real-time jitter for compliance scores and status indicators.
*   **Interactive Expansion:** Accordion-style phase tiles reveal detailed engineering KPIs.

## Key Components

*   `StageItem`: Expandable lifecycle phase tile with tailored theme logic.
*   `SimulatedMap`: An SVG-based stylized map providing interactive geographical insights.
*   `StatSummary`: Compact, responsive metric cards.

## State Management

*   `viewMode`: Toggles between the metrics dashboard and the interactive map.
*   `selectedAsset`: Tracks the currently inspected site on the map.
*   `stats`: Real-time lifecycle and environmental metrics.
*   `isDarkMode`: Randomized theme persistent throughout the session.
