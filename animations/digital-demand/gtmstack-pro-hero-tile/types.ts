export interface ModuleData {
  id: string;
  label: string;
  chaosX: number;
  chaosY: number;
  chaosRotation: number;
  stackOrder: number;
  color: string;
}

export enum AnimationPhase {
  CHAOS = 'CHAOS',
  ROUTES = 'ROUTES',
  STACK = 'STACK',
}