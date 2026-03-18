
export interface FinancialStats {
  aum: number;
  growth: number;
  pipeline: number;
  activeUsers: number;
  marketTrend: 'up' | 'down' | 'neutral';
}

export interface FloatingCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
}
