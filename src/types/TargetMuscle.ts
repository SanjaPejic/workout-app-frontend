import type { Muscle } from "./Muscle";

export interface TargetMuscle {
  id: number;
  muscle: Muscle;
  percentage: number;
}
