import type { TargetMuscle } from "./TargetMuscle";

export interface Exercise {
  id: number;
  name: string;
  imageURL: string;
  targetMuscles: TargetMuscle[];
  description: string;
  howToSteps: string[];
  videoURL: string;
}
