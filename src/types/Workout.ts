import type { WorkoutExercise } from "./WorkoutExercise";

export interface Workout {
  id: number;
  name: string;
  date: string;
  workoutExercises: WorkoutExercise[];
  userId: number;
}
