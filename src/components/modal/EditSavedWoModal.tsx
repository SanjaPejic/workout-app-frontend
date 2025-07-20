import type { Exercise } from "@/types/Exercise";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertTriangle, X } from "lucide-react";
import WorkoutExerciseBar from "@/components/workoutModal/WorkoutExerciseBar";
import { useState } from "react";
import type { WorkoutExercise } from "@/types/WorkoutExercise";
import type { Muscle } from "@/types/Muscle";
import ConformationModal from "./ConfirmationModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkout } from "@/api/client-service";
import { useUserStore } from "@/constants/UserStore";
import { QueryKeys } from "@/api/constants/query-keys";
import type { Workout } from "@/types/Workout";

interface EditSavedWoModalProps {
  workout: Workout;
  onClose: () => void;
  injuredMuscles: Muscle[];
}

function mapWorkoutForUpdate(
  workout: Workout,
  workoutExercises: WorkoutExercise[]
): Workout {
  return {
    id: workout.id,
    name: workout.name,
    userId: workout.userId,
    date: "", // dummy value
    workoutExercises: workoutExercises.map((we) => ({
      id: 0, // dummy value
      sets: we.sets,
      reps: we.reps,
      kilos: we.kilos,
      exercise: { id: we.exercise.id } as Exercise,
    })),
  };
}

function EditSavedWoModal({
  workout,
  onClose,
  injuredMuscles,
}: EditSavedWoModalProps) {
  const hasInjuredMuscle = (exercise: Exercise) => {
    return exercise.targetMuscles.some((targetMuscle) =>
      injuredMuscles.some(
        (injuredMuscle) => injuredMuscle.id === targetMuscle.muscle.id
      )
    );
  };

  // Initialise state - adding default sets/reps/kilos = 0 :
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    () =>
      workout.workoutExercises.map((wEx) => ({
        id: wEx.id,
        exercise: wEx.exercise,
        sets: wEx.sets,
        reps: wEx.reps,
        kilos: wEx.kilos,
      }))
  );

  const [isConfUpdateModalOpen, setIsConfUpdateModalOpen] = useState(false);

  const [workoutExIdToRemove, setWorkoutExIdToRemove] = useState<number>();

  const [isRemoveExConfModalOpen, setIsRemoveExConfModalOpen] = useState(false);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const handleOpenConformationModal = (workoutExerciseId: number) => {
    setWorkoutExIdToRemove(workoutExerciseId);
    setIsRemoveExConfModalOpen(true);
  };

  const handleOnYesRemove = () => {
    removeExercise(workoutExIdToRemove);
    setIsRemoveExConfModalOpen(false);
  };

  const handleOnNoRemove = () => {
    setIsRemoveExConfModalOpen(false);
  };

  const hasAnyInjury = workoutExercises.some((wx) =>
    hasInjuredMuscle(wx.exercise)
  );

  const updateExercise = (id: number, changes: Partial<WorkoutExercise>) => {
    setWorkoutExercises((exs) =>
      exs.map((ex) => (ex.id === id ? { ...ex, ...changes } : ex))
    );
  };

  const removeExercise = (id?: number) => {
    // remove the object from the local state
    setWorkoutExercises((exs) => exs.filter((ex) => ex.id !== id));
    return;
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newOrder = [...workoutExercises];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, draggedItem);

    setWorkoutExercises(newOrder);
    setDraggedIndex(null);
  };

  const handleOnNoUpdate = () => {
    setIsConfUpdateModalOpen(false);
  };

  const userId = useUserStore((state) => state.id);

  // Utility function: maps a Workout for backend update

  const updateWorkoutMutation = useMutation({
    mutationFn: ({ workout }: { workout: Workout }) => updateWorkout(workout),
    onSuccess: () => {
      // Invalidate the workouts query to refresh the list of saved workouts
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORKOUTS, userId],
      });
    },
    onError: (error: any) => {
      alert(error?.response?.data || "Failed to update workout");
    },
  });

  const handleOnYesUpdate = () => {
    if (!userId || !workout) return;

    console.log(workout);

    // Use the mapper function!
    const updatedWorkout = mapWorkoutForUpdate(workout, workoutExercises);

    console.log("Here is the sanitised workout:");
    console.log(updatedWorkout);

    updateWorkoutMutation.mutate({ workout: updatedWorkout });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="[&>button]:hidden p-0 !max-w-6xl !max-h-[90vh] overflow-y-auto">
        {/*Base Modal Content*/}
        <div className="relative bg-white rounded-lg">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="top-4 right-4 z-10 absolute bg-white/90 hover:bg-white border border-gray-300 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
          {/*Title + injury warning + start button*/}
          <div className="p-6 pb-4">
            <DialogTitle asChild>
              <h2 className="font-bold text-gray-900 text-2xl text-center">
                {workout.name}
              </h2>
            </DialogTitle>

            {/*Compact Injury Warning*/}
            {hasAnyInjury && (
              <div className="flex justify-center mt-2">
                <div className="inline-flex items-center bg-red-100 px-3 py-2 border border-red-300 rounded-lg text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-700" />
                  <span className="font-medium text-red-700">
                    Workout contains exercises affecting injured muscles
                  </span>
                </div>
              </div>
            )}
            {/*Start Workout Button */}
            <div className="flex justify-center mt-4">
              <Button
                className="bg-green-600 hover:bg-green-700 px-8 py-2 rounded-lg font-semibold text-white"
                /*onClick={onStartWorkout}*/
              >
                START WORKOUT
              </Button>
            </div>
          </div>

          {/*Main Content*/}
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 p-6 pt-0">
            {/*Left Side: exercise list */}
            <div className="space-y-3">
              {/*For each list element - wrokout exercise card*/}
              {workoutExercises.map((we, index) => (
                <WorkoutExerciseBar
                  key={we.id}
                  exerciseName={we.exercise.name}
                  hasInjuredMuscle={hasInjuredMuscle(we.exercise)}
                  sets={we.sets}
                  reps={we.reps}
                  kilos={we.kilos}
                  onSetsChange={(newSets) =>
                    updateExercise(we.id, { sets: newSets })
                  }
                  onRepsChange={(newReps) =>
                    updateExercise(we.id, { reps: newReps })
                  }
                  onKilosChange={(newKilos) =>
                    updateExercise(we.id, { kilos: newKilos })
                  }
                  onRemove={() => handleOpenConformationModal(we.id)}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                />
              ))}
            </div>
            {/*Right side: body avatar + perecentages + two buttons*/}
            <div className="space-y-4">
              {/*Avatar Body*/}
              <div className="flex justify-center gap-8">
                <div className="text-center">Front body</div>
                <div className="text-center">Back body</div>
              </div>
              {/*Combined Muscle Perecentages*/}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900 text-sm uppercase">
                      misic
                    </span>
                    <span className="text-gray-600 text-sm">
                      !!!!!!procenat% (need to fix)
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full w-full h-2">
                    <div
                      className="bg-slate-600 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${50}% (need to fix)` }}
                    />
                  </div>
                </div>
              </div>
              {/*Buttons: Download PDF + Save/Update*/}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 py-2 border-2 border-gray-300 rounded-lg"
                >
                  Download PDF
                </Button>

                <Button
                  onClick={() => setIsConfUpdateModalOpen(true)}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 py-2 rounded-lg text-white"
                >
                  UPDATE
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/*Remove exercise Alert Dialog */}
        {isRemoveExConfModalOpen && (
          <ConformationModal
            isOpen={isRemoveExConfModalOpen}
            onYes={handleOnYesRemove}
            onNo={handleOnNoRemove}
            title="DO YOU WANT TO REMOVE THE EXERCISE?"
          />
        )}

        {/*Update Workout Conformation Dialog*/}
        {isConfUpdateModalOpen && (
          <ConformationModal
            isOpen={isConfUpdateModalOpen}
            onYes={handleOnYesUpdate}
            onNo={handleOnNoUpdate}
            title="DO YOU WANT TO UPDATE THE WORKOUT?"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditSavedWoModal;
