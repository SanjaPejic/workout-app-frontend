import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import AppLoader from "@/components/shared/AppLoader";
import { AlertTriangle, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { getExercises } from "@/api/client-service";
import type { Exercise } from "@/types/Exercise";
import ExerciseCard from "@/components/createWorkoutPage/ExerciseCard";
import Toast from "@/components/shared/Toast";
import FilterPopover from "@/components/shared/FilterPopover";
import FilterButton from "@/components/shared/FilterButton";
import type { Muscle } from "@/types/Muscle";
import ExerciseModal from "@/components/createWorkoutPage/ExerciseModal";
import WorkoutModal from "@/components/modal/WorkoutModal";
import { QueryKeys } from "@/api/constants/query-keys";
import { useUserStore } from "@/constants/UserStore";
import { getUserInjuries, updateUserInjuries } from "@/api/client-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function CreateWorkoutPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isInjuriesOpen, setIsInjuriesOpen] = useState(false);
  const [tempExercises, setTempExercises] = useState<Exercise[]>([]);
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });
  const [appliedTargetMuscles, setAppliedTargetMuscles] = useState<Muscle[]>(
    []
  );
  const [tempTargetMuscles, setTempTargetMuscles] = useState<Muscle[]>([]);
  const [appliedInjuredMuscles, setAppliedInjuredMuscles] = useState<Muscle[]>(
    []
  );
  const [tempInjuredMuscles, setTempInjuredMuscles] = useState<Muscle[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const userId = useUserStore((state) => state.id);

  const { data: exercisesData, isLoading: isExercisesDataLoading } = useQuery<
    Exercise[]
  >({
    queryKey: [QueryKeys.EXERCISES],
    queryFn: getExercises,
  });

  const { data: injuriesData } = useQuery<
    { id: number; muscle: Muscle; user: { id: number; username: string } }[]
  >({
    queryKey: [QueryKeys.INJURIES, userId],
    queryFn: () => getUserInjuries(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (injuriesData) {
      setAppliedInjuredMuscles(injuriesData.map((injury) => injury.muscle));
    }
  }, [injuriesData]);

  const queryClient = useQueryClient();

  const updateInjuriesMutation = useMutation({
    mutationFn: (injuries: Muscle[]) =>
      updateUserInjuries(
        userId!,
        injuries.map((muscle) => ({ muscle }))
      ),
    onSuccess: (response) => {
      setAppliedInjuredMuscles(response.map((injury: any) => injury.muscle));
      queryClient.invalidateQueries({ queryKey: [QueryKeys.INJURIES, userId] });
      setToast({ visible: true, message: "Applyed injuries" });
    },
    onError: (error: any) => {
      setToast({
        visible: true,
        message: error?.response?.data || "Failed to apply injuries",
      });
    },
  });

  const filteredExercises = exercisesData?.filter((exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const hasTargetMuscle =
      appliedTargetMuscles.length === 0 ||
      appliedTargetMuscles.some((appliedMuscle) =>
        exercise.targetMuscles.some(
          (targetMuscle) => targetMuscle.muscle.id === appliedMuscle.id
        )
      );

    return matchesSearch && hasTargetMuscle;
  });

  //Remove or Add an Exercise
  const handleToggleExercise = (exercise: Exercise) => {
    const isAlreadyAdded = tempExercises.some((ex) => ex.id === exercise.id);
    if (isAlreadyAdded) {
      setTempExercises((prev) => prev.filter((ex) => ex.id !== exercise.id));
      setToast({
        visible: true,
        message: `REMOVED ${exercise.name}`,
      });
    } else {
      setTempExercises((prev) => [...prev, exercise]);
      setToast({
        visible: true,
        message: `ADDED ${exercise.name}`,
      });
    }

    // Hide toast after 2 seconds
    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 2000);
  };

  //Clear temp workout
  const handleClearTempExercises = () => {
    if (tempExercises.length > 0) {
      setTempExercises([]);
    }
    setToast({
      visible: true,
      message: "Workout cleared",
    });

    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 2000);
  };

  // Filter handlers (target muscles)
  const handleFilterOpen = (open: boolean) => {
    if (open) {
      setTempTargetMuscles(appliedTargetMuscles);
    }
    setIsFilterOpen(open);
  };

  const applyTargetFilters = () => {
    setAppliedTargetMuscles(tempTargetMuscles);
    setIsFilterOpen(false);
  };

  const clearTargetFilters = () => {
    setTempTargetMuscles([]);
  };

  //Injuries handlers
  const handleInjuriesOpen = (open: boolean) => {
    if (open) {
      setTempInjuredMuscles(appliedInjuredMuscles);
    }
    setIsInjuriesOpen(open);
  };

  const applyInjuries = () => {
    setAppliedInjuredMuscles(tempInjuredMuscles);
    setIsInjuriesOpen(false);
    updateInjuriesMutation.mutate(tempInjuredMuscles);
  };

  const clearInjuries = () => {
    setTempInjuredMuscles([]);
  };

  return (
    <div>
      {/*Base of the page*/}
      <div className="bg-gray-50 mx-auto px-6 py-8 min-h-screen">
        {/*Upper part*/}
        <h2 className="mb-8 font-bold text-slate-900 text-3xl text-center">
          Create Your Perfect Workout
        </h2>
        {/*Controls*/}
        <div className="flex justify-between items-center mb-8">
          {/*Left side: search + filter button + injuries button*/}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2 transform" />
              <Input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="shadow-sm py-3 pr-4 pl-10 border-2 border-gray-200 focus:border-cyan-400 rounded-xl focus:ring-0 w-80 font-medium"
              />
            </div>

            {/*Filter Button*/}
            <Popover open={isFilterOpen} onOpenChange={handleFilterOpen}>
              <PopoverTrigger asChild>
                <div>
                  <FilterButton
                    icon={SlidersHorizontal}
                    label="Filter"
                    count={appliedTargetMuscles.length}
                    onClick={() => {}}
                  />
                </div>
              </PopoverTrigger>
              <FilterPopover
                title="Select Target Muscles"
                subtitle="Mark muscles to target"
                selectedItems={tempTargetMuscles}
                onItemsChange={setTempTargetMuscles}
                onApply={applyTargetFilters}
                onClear={clearTargetFilters}
              />
            </Popover>

            {/*Injuries Button*/}
            <Popover open={isInjuriesOpen} onOpenChange={handleInjuriesOpen}>
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
            </Popover>
          </div>

          {/*Right side: clear + view*/}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleClearTempExercises}
              variant="outline"
              className="bg-white hover:bg-gray-100 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700"
            >
              <Trash2 className="mr-0.5 w-4 h-4" />
              Clear
            </Button>
            <Button
              onClick={() => setShowWorkoutModal(true)}
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 border-2 border-cyan-800 rounded-lg font-semibold text-white"
            >
              View Workout ({tempExercises.length})
            </Button>
          </div>
        </div>

        {/*Exercises grid*/}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {isExercisesDataLoading ? (
            <AppLoader />
          ) : (
            filteredExercises?.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onToggle={() => handleToggleExercise(exercise)}
                isAdded={
                  tempExercises.some((ex) => ex.id === exercise.id) ?? false
                }
                injuredMuscles={appliedInjuredMuscles}
                onExerciseClick={() => setSelectedExercise(exercise)}
              />
            ))
          )}
        </div>
      </div>

      {/*Toast Notification*/}
      <Toast
        visible={toast.visible}
        message={toast.message}
        onClose={() => setToast({ visible: false, message: "" })}
      />
      {/*Exercise Modal*/}
      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {showWorkoutModal && (
        <WorkoutModal
          exercises={tempExercises}
          onClose={() => setShowWorkoutModal(false)}
          onRemoveExercise={(exercise: Exercise) =>
            handleToggleExercise(exercise)
          }
          injuredMuscles={appliedInjuredMuscles}
        />
      )}
    </div>
  );
}

export default CreateWorkoutPage;
