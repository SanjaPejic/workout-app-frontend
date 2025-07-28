import type { Exercise } from "./Exercise";

export interface WorkoutExercise {
  id: number;
  exercise: Exercise;
  sets: number | undefined;
  reps: number | undefined;
  kilos: number | undefined;
}
