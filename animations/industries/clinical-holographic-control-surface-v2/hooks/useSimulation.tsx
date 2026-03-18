import { useState, useEffect, useMemo } from 'react';

export function useSimulation() {
  const [stats, setStats] = useState({
    latency: 12,
    marketScore: 92,
    completion: 85,
    harvesting: 42,
    endpoints: 18
  });

  const historyData = useMemo(() => ({
    completion: [62, 65, 63, 70, 75, 72, 80, 82, stats.completion],
    harvesting: [25, 28, 22, 30, 35, 32, 38, 40, stats.harvesting]
  }), [stats.completion, stats.harvesting]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        latency: Math.max(8, Math.min(24, prev.latency + (Math.random() > 0.5 ? 1 : -1))),
        marketScore: Math.max(88, Math.min(98, prev.marketScore + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        harvesting: Math.min(100, Math.max(40, prev.harvesting + (Math.random() > 0.6 ? 1.5 : -0.5))),
        completion: Math.min(100, Math.max(80, prev.completion + (Math.random() > 0.7 ? 0.5 : -0.2)))
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return { stats, historyData };
}