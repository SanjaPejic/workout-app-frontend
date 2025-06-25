import type { Exercise } from "./Exercise";

export interface WorkoutExercise {
  id: number;
  exercise: Exercise;
  sets: number;
  reps: number;
  kilos: number;
}
