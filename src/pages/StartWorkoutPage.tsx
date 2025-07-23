import Stopwatch from "@/components/startWorkoutPage/Stopwatch";
import { Button } from "@/components/ui/button";
import type { WorkoutExercise } from "@/types/WorkoutExercise";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";

interface DataForStartWorkout {
  name?: string;
  workoutExercises: WorkoutExercise[];
}

function StartWorkoutPage() {
  const location = useLocation();
  const workoutToStart = location.state?.workoutToStart as
    | DataForStartWorkout
    | undefined;

  // Handle the case if no workout details are passed
  if (!workoutToStart || !workoutToStart.workoutExercises)
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="bg-red-100 shadow p-6 border border-red-300 rounded-lg max-w-md text-red-800 text-center">
          <h2 className="mb-2 font-bold text-lg">Cannot load workout</h2>
          <p>
            Sorry, there was an error loading the workout.
            <br />
            Please try starting a workout again from your workouts or create a
            new one.
          </p>
        </div>
      </div>
    );

  return (
    <div>
      {/*Base of the page*/}
      <div className="bg-gray-50 mx-auto px-6 py-8 min-h-screen">
        {/*Title and Exit Button*/}
        <div>
          <Button
            // onClick={() => setShowExitConfirm(true)}
            variant="outline"
            size="icon"
            className="right-6 absolute border-2 border-gray-300 rounded-lg"
          >
            <X className="w-4 h-4" />
          </Button>
          <h2 className="mb-2 font-bold text-slate-900 text-3xl text-center">
            Live Workout Session ({workoutToStart.workoutExercises.length})
          </h2>
          {workoutToStart.name && (
            <div className="mb-1 text-center">
              <span className="text-gray-600 text-base">
                {workoutToStart.name}
              </span>
            </div>
          )}
        </div>

        {/*Workout Content*/}
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/*Left Column: Timer and Exercises (2/3 width)*/}
          <div className="space-y-6 lg:col-span-2">
            {/*Stopwatch*/}
            <div className="flex items-center gap-4">
              <Stopwatch />
            </div>
            {/*Exercise List*/}
            <div className="space-y-3">Exercise List</div>
          </div>

          {/*Right Column: Exercise Card (1/3 width)*/}
          <div className="lg:col-span-1 lg:mt-[72px]">
            <div className="top-8 sticky">
              Expanded Exercise Image or an Exercise Card
            </div>
          </div>
        </div>

        {/* <ul className="space-y-2 mt-6">
          {workoutToStart.workoutExercises.map((wEx) => (
            <li key={wEx.id} className="bg-slate-100 px-4 py-2 rounded">
              {wEx.exercise.name}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}

export default StartWorkoutPage;
