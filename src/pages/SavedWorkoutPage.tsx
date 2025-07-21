import { deleteWorkout, getWorkouts } from "@/api/client-service";
import { QueryKeys } from "@/api/constants/query-keys";
import ConformationModal from "@/components/modal/ConfirmationModal";
import EditSavedWoModal from "@/components/modal/EditSavedWoModal";
import SavedWorkoutCard from "@/components/savedWorkoutPage/SavedWorkoutCard";
import AppLoader from "@/components/shared/AppLoader";
import InjuryButton from "@/components/shared/InjuryButton";
import Toast from "@/components/shared/Toast";
import { useUserStore } from "@/constants/UserStore";
import type { Muscle } from "@/types/Muscle";
import type { Workout } from "@/types/Workout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function SavedWorkoutPage() {
  const [isInjuriesOpen, setIsInjuriesOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [workoutIdToDelete, setWorkoutIdToDelete] = useState<number>();
  const [isDeleteWoConfModalOpen, setIsDeleteWoConfModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.id);
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });

  const injuriesData = queryClient.getQueryData<
    { id: number; muscle: Muscle; user: { id: number; username: string } }[]
  >([QueryKeys.INJURIES, userId]);

  console.log(injuriesData);
  const { data: workoutsData, isLoading: isWorkoutsDataLoading } = useQuery<
    Workout[]
  >({
    queryKey: [QueryKeys.WORKOUTS, userId],
    queryFn: () => getWorkouts(userId!),
    //enabled: !!userId,
  });

  const handleOpenConformationModal = (workoutId: number) => {
    setWorkoutIdToDelete(workoutId);
    setIsDeleteWoConfModalOpen(true);
  };

  const deleteWorkoutMutation = useMutation({
    mutationFn: (id: number) => deleteWorkout(id),
    onSuccess: () => {
      // Invalidate the workouts query to refresh the list
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORKOUTS, userId],
      });
    },
    onError: (error: any) => {
      alert(error?.response?.data || "Failed to delete workout");
    },
  });

  const handleDeleteWorkout = (id?: number) => {
    if (typeof id !== "number") return; // ensure id is not undefined
    const toDelete = workoutsData?.find((wo) => wo.id === id);
    if (!toDelete) return;
    deleteWorkoutMutation.mutate(id);
  };

  const handleOnYes = () => {
    handleDeleteWorkout(workoutIdToDelete);
    setIsDeleteWoConfModalOpen(false);
  };

  const handleOnNo = () => {
    setIsDeleteWoConfModalOpen(false);
  };

  return (
    <div>
      {/*Base of the page*/}
      <div className="bg-gray-50 mx-auto px-6 py-8 min-h-screen">
        {/*Upper part*/}
        <h2 className="mb-8 font-bold text-slate-900 text-3xl text-center">
          Saved Workouts ({workoutsData?.length})
        </h2>
        {/*Controls*/}
        <div className="flex justify-between items-center mb-8">
          {/*Left side: search + filter button + injuries button*/}
          <div className="flex items-center gap-3">
            {/*Injuries Button*/}
            <InjuryButton
              isInjuriesOpen={isInjuriesOpen}
              setIsInjuriesOpen={setIsInjuriesOpen}
              setToast={setToast}
            />
          </div>
        </div>

        {/*Saved Workouts grid*/}
        <div className="">
          {workoutsData?.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-lg">No saved workouts yet.</p>
              <p className="mt-2 text-gray-400 text-sm">
                Create and save your first workout to see it here!
              </p>
            </div>
          ) : isWorkoutsDataLoading ? (
            <AppLoader />
          ) : (
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {workoutsData?.map((workout) => (
                <SavedWorkoutCard
                  key={workout.id}
                  workout={workout}
                  onDelete={(workoutId: number) =>
                    handleOpenConformationModal(workoutId)
                  }
                  onOpen={() => setSelectedWorkout(workout)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/*Delete Workout Alert Dialog */}
      {isDeleteWoConfModalOpen && (
        <ConformationModal
          isOpen={isDeleteWoConfModalOpen}
          onYes={handleOnYes}
          onNo={handleOnNo}
          title="DO YOU WANT TO DELETE THE WORKOUT?"
        />
      )}

      {/*Workout Modal for Editing (updating) a Saved Workout*/}
      {selectedWorkout && (
        <EditSavedWoModal
          workout={selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
          injuredMuscles={injuriesData?.map((injury) => injury.muscle) || []}
        />
      )}
      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={() => setToast({ visible: false, message: "" })}
      />
    </div>
  );
}

export default SavedWorkoutPage;
