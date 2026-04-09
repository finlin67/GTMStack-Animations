# Aerospace Auto Engineering Workflow

An engineering workflow tile for aerospace and automotive programs that highlights lifecycle progress, qualification risk, and readiness signals.

A high-fidelity dashboard simulating aerospace and automotive engineering workflows with live KPI telemetry.

## Description

AeroAuto Engage is a high-fidelity dashboard designed to simulate and manage complex engineering workflows within the aerospace and automotive animations/animations\industries. It provides a clean, futuristic interface for visualizing a standard 36-month product qualification cycle. The dashboard displays key performance indicators (KPIs) like project duration, compliance scores, and optimization metrics with subtle, real-time animations to simulate an active system. The core feature is the "AI Engineering Analyst," which leverages the Google Gemini API to dynamically generate technical validation roadmaps and conceptual blueprint-style images for any user-specified component, offering instant, intelligent project insights.

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **AI Integration:** Google Gemini API (`@google/genai`)

## Usage

The application is designed for straightforward interaction:

1.  **View Dashboard:** Upon loading, the main dashboard displays the overall project status, including KPIs and a visual timeline of the engineering phases (Validation, Integration, Certification, Ready).
2.  **Interact with AI Analyst:**
    - Locate the "AI Engineering Analyst" section at the bottom of the dashboard.
    - In the input field, type the name of an engineering component you wish to analyze (e.g., "Titanium Fan Blade", "Carbon Fiber Monocoque", or "Lithium-ion Battery Pack").
    - Press the **Enter** key or click the **Zap (⚡️)** icon button.
3.  **Review Results:** The system will process the request, and the panel will update to display the AI-generated results, which include:
    - A conceptual image of the component.
    - The component's assessed risk factor (Low, Medium, or High).
    - A detailed, multi-phase validation roadmap for the component.
