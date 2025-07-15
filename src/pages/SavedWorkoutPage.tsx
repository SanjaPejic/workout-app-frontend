import { deleteWorkout, getWorkouts } from "@/api/client-service";
import { QueryKeys } from "@/api/constants/query-keys";
import ConformationModal from "@/components/modal/ConfirmationModal";
import SavedWorkoutCard from "@/components/savedWorkoutPage/SavedWorkoutCard";
import AppLoader from "@/components/shared/AppLoader";
import { useUserStore } from "@/constants/UserStore";
import type { Workout } from "@/types/Workout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function SavedWorkoutPage() {
  //injury button needs to be exactly the same as the one on the create workout page
  //     const applyInjuries = () => {
  //     setAppliedInjuredMuscles(tempInjuredMuscles);
  //     setIsInjuriesOpen(false);
  //     updateInjuriesMutation.mutate(tempInjuredMuscles);
  //   };

  const [workoutWoIdToDelete, setWorkoutWoIdToDelete] = useState<number>();
  const [isDeleteWoConfModalOpen, setIsDeleteWoConfModalOpen] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.id);

  const { data: workoutsData, isLoading: isWorkoutsDataLoading } = useQuery<
    Workout[]
  >({
    queryKey: [QueryKeys.WORKOUTS, userId],
    queryFn: () => getWorkouts(userId!),
    //enabled: !!userId,
  });

  const handleOpenConformationModal = (workoutId: number) => {
    setWorkoutWoIdToDelete(workoutId);
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
    handleDeleteWorkout(workoutWoIdToDelete);
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
            {/* <Popover open={isInjuriesOpen} onOpenChange={handleInjuriesOpen}>
              <PopoverTrigger asChild>
                <div>
                  <FilterButton
                    icon={AlertTriangle}
                    label="Injuries"
                    count={appliedInjuredMuscles.length}
                    onClick={() => {}}
                    variant="warning"
                  />
                </div>
              </PopoverTrigger>
              <FilterPopover
                title="Select Injuries"
                subtitle="Mark injured muscles"
                selectedItems={tempInjuredMuscles}
                onItemsChange={setTempInjuredMuscles}
                onApply={applyInjuries}
                onClear={clearInjuries}
                variant="warning"
              />
            </Popover> */}
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
                  onOpen={() => setShowWorkoutModal(true)}
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

      {/* {showWorkoutModal && <WorkoutModal />} */}
    </div>
  );
}

export default SavedWorkoutPage;
