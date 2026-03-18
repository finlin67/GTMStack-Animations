# SequenceFlow Dashboard

## 🧠 Context & Creative Strategy
The SequenceFlow Dashboard is designed as a high-fidelity visual tool for email marketers to track the performance of their automated sequences. The "Ladder" visualization provides a vertical narrative of a campaign's journey, from the initial "Sent" event down to the final "ROAS" calculation. The strategy focuses on using **glassmorphism** and **gradient kinetic energy** to transform dry statistics into a compelling visual story.

## 🎯 Purpose & Value Proposition
Standard analytics dashboards are often cluttered and overwhelming. SequenceFlow aims to provide:
- **Instant Clarity**: Users can see the health of a sequence in seconds.
- **Micro-animations**: Organic jitter in counters and smooth transitions maintain user engagement without distraction.
- **Premium Aesthetics**: High-end visuals that make reporting feel like a world-class experience.

## 🚀 Ideal Use Cases
- **Marketing Agencies**: Presenting campaign results to clients.
- **SaaS Platforms**: Built-in analytics tiles for marketing automation tools.
- **Internal Reporting**: Real-time monitoring of outreach performance.

## 👤 Target Audience
- **Growth Marketers**: Focused on CTR and conversion optimization.
- **E-commerce Owners**: Tracking the ROI of transactional and promotional flows.
- **Marketing Executives**: Needing high-level visual summaries of performance.

## 🎨 Design Philosophy
The UI follows a **modern dark-mode aesthetic** using deep slates (`#0f172a`) contrasted with vibrant, glowing gradients. The "Ladder" layout creates a logical flow, while the staggered entrance animations guide the eye from top to bottom. Glassmorphism (blur + opacity) is used to create depth and hierarchy.

## 🛠️ Tech Stack
- **React 18+**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion (v12+)**
- **Lucide React**

## ⚙️ Usage
Integrate the `EmailSeqTile` component into your dashboard container. It is optimized for a 600px square grid item.
```tsx
import EmailSeqTile from './EmailSeqTile';

export default function MyDashboard() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <EmailSeqTile />
    </div>
  );
}
```

## 🌈 Color Palette
| Name | Value | Usage |
| :--- | :--- | :--- |
| **Primary Orange** | `#f97415` | Action items, primary step |
| **Deep Slate** | `#0f172a` | Background context |
| **Blue Pulse** | `#3b82f6` | Secondary stage (Opened) |
| **Emerald Glow** | `#10b981` | Success stage (Clicked) |
| **Fuchsia Royal** | `#c026d3` | Premium metrics (ROAS) |

## ✨ Key Features
- **Dynamic Counters**: Smooth number rolling with organic jitter.
- **Gradient Connectors**: Animated lines that "grow" to connect the stages.
- **AnimatePresence**: Fluid transitions for sub-values (ROI/CTR) when updates occur.
- **Glassmorphic Cards**: Hover-reactive panels with backdrop-blur.
- **Live Atmosphere**: Subtle background glowing orbs to enhance depth.

## 📂 Project Structure
- `index.tsx`: Entry point for the React application.
- `App.tsx`: Main layout component containing the dashboard shell and navigation.
- `EmailSeqTile.tsx`: Core visualization component for the campaign performance "ladder".
- `EmailSeqTile.html`: Standalone, single-file distribution of the dashboard using esm.sh.
- `metadata.json`: App manifest and permissions configuration.
- `index.html`: Base HTML template for the development environment.