# 🔗 GTM Stack Data Sync Mesh

A high-fidelity, dark-mode dashboard designed for monitoring complex Revenue Operations (RevOps) data pipelines. This application visualizes real-time sync animations/animations\operations between major GTM systems (Salesforce, HubSpot, Stripe) and internal event buses.

## 🧠 Context & Creative Strategy
In high-growth SaaS environments, data silos between Salesforce, HubSpot, and billing systems are the primary cause of revenue leakage. The "Sync Mesh" was conceived as a "Command Center" for RevOps—moving away from boring logs into a living, breathing visualization of data health. The creative strategy employs a "Hub and Spoke" visual metaphor to represent central event orchestration.

## 🎯 Purpose & Value Proposition
*   **Observability:** Transform invisible API calls into a tangible data map.
*   **Proactive Alerting:** Identify latency spikes before they impact Sales or Finance.
*   **Confidence:** Provide GTM leaders with a "Green Light" view of their entire automated ecosystem.

## 🚀 Ideal Use Cases
*   **Scale-up SaaS:** Monitoring the sync between CRM and Product-Led Growth (PLG) data.
*   **Enterprise RevOps:** Tracking global lead routing and credit card processing events.
*   **Data Engineering:** Debugging schema mismatches in real-time during migration phases.

## 👤 Target Audience
*   **RevOps Managers:** Who need to ensure data integrity across the stack.
*   **Sales Operations:** Who rely on instant lead syncing for high-velocity outreach.
*   **Growth Engineers:** Building internal data products and needing a UI dashboard layer.

## 🎨 Design Philosophy
The UI follows a **Glassmorphic Cyber-Density** approach. By using a dark base (`#0f111a`) and high-contrast neon accents, the interface reduces cognitive load. "Data Jitter" is simulated through Framer Motion to give the dashboard a "living" quality, ensuring it feels like a real-time monitor rather than a static reporting tool.

## ✨ Key Features
*   **Real-time Metrics:** Live updates for Ingest rates, Data cleanliness, Routing throughput, and Signal processing.
*   **Visual Mesh Map:** An interactive, animated graph visualization showing data flow between satellite nodes and the central event bus.
*   **Pipeline Monitoring:** Detailed table view of active sync nodes with status indicators and latency tracking.
*   **Alert Center:** Configurable latency thresholds with real-time monitoring and acknowledgement workflows.
*   **Interactive Elements:** Hover tooltips on mesh nodes provide instant deep-dive statistics.
*   **Glassmorphism UI:** Modern, dark-themed aesthetic with backdrop blurs and subtle gradients.
*   **Responsive Animations:** Smooth transitions and data flow simulations using Framer Motion v12.

## 🛠️ Tech Stack
*   **Framework:** React 18+ (Next.js/Vite Compatible)
*   **Styling:** Tailwind CSS (Custom Utilities)
*   **Animations:** Framer Motion v12 (High Performance)
*   **Icons:** Lucide React
*   **Font:** Inter & JetBrains Mono

## ⚙️ Usage
This component is designed to be dropped into an existing React application.

1.  Ensure you have Tailwind CSS configured.
2.  Install dependencies:
    ```bash
    npm install framer-motion lucide-react
    ```
3.  Import and use the component:
    ```tsx
    import RevOpsDashboard from './components/RevOpsDashboard';

    function App() {
      return <RevOpsDashboard />;
    }
    ```

## 🌈 Color Palette
| Color Role | Hex Code | Tailwind Approx | Description |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | `#5a5cf2` | `primary` | Main interactive elements, mesh hub core |
| **App Background** | `#0f111a` | `background-dark` | Main canvas background (Deep Dark) |
| **Panel Background** | `#161822` | `slate-900` | Sidebar, table headers, sticky elements |
| **Healthy Status** | `#34d399` | `emerald-400` | "Clean" metrics, healthy sync nodes |
| **Active Process** | `#38bdf8` | `sky-400` | "Ingest" metrics, active processing data |
| **High Throughput** | `#e879f9` | `fuchsia-400` | "Signals" metrics, fuchsia accent nodes |
| **Critical Alert** | `#f43f5e` | `rose-500` | Triggered alerts, error levels, critical status |
| **Warning Status** | `#fbbf24` | `amber-400` | Latency warnings, rate limit notifications |
| **System UI** | `#6366f1` | `indigo-500` | Sidebar icons, configuration sliders |
| **Text Primary** | `#f1f5f9` | `slate-100` | Main headings, core values, high emphasis |
| **Text Secondary** | `#94a3b8` | `slate-400` | Labels, metadata, table headers, low emphasis |
| **Muted UI** | `#1e293b` | `slate-800` | Sliders, dividers, hover backgrounds |

## 📂 Project Structure
*   `components/RevOpsDashboard.tsx`: Main dashboard component containing state logic, alerting engine, and UI rendering.
*   `App.tsx`: Root wrapper centering the dashboard within the gallery frame.
*   `index.html`: Entry point with Tailwind configuration and font imports.
*   `styles.css`: Global Tailwind directives and custom utility classes.
