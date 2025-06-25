import type { WorkoutExercise } from "./WorkoutExercise";

export interface Workout {
  id: number;
  name: string;
  date: Date;
  workoutExercises: WorkoutExercise[];
}
