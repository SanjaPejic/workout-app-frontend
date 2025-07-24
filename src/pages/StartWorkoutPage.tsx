import ConformationModal from "@/components/modal/ConfirmationModal";
import Stopwatch from "@/components/startWorkoutPage/Stopwatch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { WorkoutExercise } from "@/types/WorkoutExercise";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());

  const isExerciseCompleted = (wEx: WorkoutExercise) => {
    if (wEx.sets === 0) return false;

    for (let i = 1; i <= wEx.sets; i++) {
      if (!completedSets.has(`${wEx.id}-${i}`)) {
        return false;
      }
    }
    return true;
  };

  const toggleExpanded = (exerciseId: number) => {
    if (expandedExercise === exerciseId) {
      setExpandedExercise(null);
    } else {
      setExpandedExercise(exerciseId);
    }
  };

  const toggleSetCompleted = (exerciseId: number, setNumber: number) => {
    const setKey = `${exerciseId}-${setNumber}`;
    const newCompleted = new Set(completedSets);
    if (newCompleted.has(setKey)) {
      newCompleted.delete(setKey);
    } else {
      newCompleted.add(setKey);
    }
    setCompletedSets(newCompleted);
  };

  const handleOnYesExit = () => {
    navigate("/create");
    setIsExitConfirmOpen(false);
  };

  const handleOnNoExit = () => {
    setIsExitConfirmOpen(false);
  };

  return (
    <div>
      {/*Base of the page*/}
      <div className="bg-gray-50 mx-auto px-6 py-8 min-h-screen">
        {/*Title and Exit Button*/}
        <div>
          <Button
            onClick={() => setIsExitConfirmOpen(true)}
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
            <div className="mb-4 text-center">
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
            <ol className="space-y-4 mt-6">
              {workoutToStart.workoutExercises.map((wEx, index) => {
                const isExpanded = expandedExercise === wEx.id;
                const isCompleted = isExerciseCompleted(wEx);
                return (
                  <li
                    key={wEx.id}
                    className={`overflow-hidden border-2 rounded-lg ${
                      isCompleted
                        ? "bg-green-100 border-green-400"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {/* Exercise Header */}
                    <div
                      className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                        isCompleted ? "bg-green-100" : ""
                      }`}
                      onClick={() => toggleExpanded(wEx.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-2 font-semibold text-gray-900">
                          {index + 1}. {wEx.exercise.name} ({wEx.sets} sets)
                        </span>
                        {isCompleted && (
                          <span className="bg-green-600 px-3 py-1 rounded-md font-semibold text-white text-sm">
                            COMPLETED
                          </span>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>

                    {/*Exercise Volume (exercise sets, reps, kilos)*/}
                    {isExpanded && wEx.sets > 0 && (
                      <div className="space-y-2 px-4 pb-4">
                        {/*Column Headers*/}
                        <div className="flex items-center px-3 py-2">
                          <span className="w-8 font-medium text-gray-700 text-center">
                            set
                          </span>
                          <span className="ml-8 w-16 font-medium text-gray-700 text-center">
                            reps
                          </span>
                          <span className="ml-8 w-16 font-medium text-gray-700 text-center">
                            kg
                          </span>
                        </div>
                        {/*Columns of sets, reps and kilos */}
                        {Array.from({ length: wEx.sets }, (_, i) => i + 1).map(
                          (setNumber) => {
                            const setKey = `${wEx.id}-${setNumber}`;
                            const isSetCompleted = completedSets.has(setKey);

                            return (
                              <div
                                key={setNumber}
                                className={`flex items-center justify-between p-3 rounded border ${
                                  isSetCompleted
                                    ? "bg-green-50 border-green-200"
                                    : "bg-gray-50 border-gray-200"
                                }`}
                              >
                                <div className="flex items-center">
                                  <span className="w-8 font-medium text-center">
                                    {setNumber}
                                  </span>
                                  <span className="ml-8 w-16 text-center">
                                    {wEx.reps}
                                  </span>
                                  <span className="ml-8 w-16 text-center">
                                    {wEx.kilos}
                                  </span>
                                </div>
                                <Checkbox
                                  checked={isSetCompleted}
                                  onCheckedChange={() =>
                                    toggleSetCompleted(wEx.id, setNumber)
                                  }
                                  className="w-6 h-6"
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/*Right Column: Exercise Card (1/3 width)*/}
          <div className="lg:col-span-1 lg:mt-[72px]">
            <div className="top-8 sticky">
              Expanded Exercise Image or an Exercise Card
            </div>
          </div>
        </div>
      </div>
      {/*Exit Conformation Dialog*/}
      {isExitConfirmOpen && (
        <ConformationModal
          isOpen={isExitConfirmOpen}
          onYes={handleOnYesExit}
          onNo={handleOnNoExit}
          title="DO YOU WANT TO EXIT THE LIVE WORKOUT SESSION?"
        />
      )}
    </div>
  );
}

export default StartWorkoutPage;
