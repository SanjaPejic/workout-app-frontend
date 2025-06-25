import type { TargetMuscle } from "./TargetMuscle";

export interface Exercise {
  id: number;
  name: string;
  imageURL: string;
  targetMuscles: TargetMuscle[];
  description: string;
  howTosteps: string[];
  videoURL: string;
}
