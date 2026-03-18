
export type AppMode = 'OPERATIONAL' | 'MARKETING';

export type ProcessStage = 'DESIGN' | 'PROTO' | 'PROD' | 'QUALITY';

export interface TelemetryData {
  cycleTime: number;
  energy: number;
  uptime: number;
  temp: number;
  yield: number;
  defects: number;
}

export interface EngineStats {
  name: string;
  batchId: string;
  telemetry: TelemetryData;
  status: 'active' | 'maintenance' | 'offline';
}
