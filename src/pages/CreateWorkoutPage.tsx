import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { AlertTriangle, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

import type { Exercise } from "@/types/Exercise";
import ExerciseCard from "@/components/createWorkoutPage/ExerciseCard";

import Toast from "@/components/shared/Toast";
import FilterPopup from "@/components/shared/FilterPopup";
import FilterButton from "@/components/shared/FilterButton";
import type { Muscle } from "@/types/Muscle";
import ExerciseModal from "@/components/createWorkoutPage/ExerciseModal";
import WorkoutModal from "@/components/shared/WorkoutModal";

function CreateWorkoutPage() {
  //Dummy data
  const dummyExercises: Exercise[] = [
    {
      id: 1,
      name: "PUSH UPS",
      imageURL: "/public/exercisesImg/pushUps.jpg",
      targetMuscles: [
        { id: 1, muscle: { id: 1, name: "chest" }, percentage: 60 },
        { id: 2, muscle: { id: 2, name: "triceps" }, percentage: 25 },
        { id: 3, muscle: { id: 3, name: "shoulders" }, percentage: 15 },
      ],
      description:
        "A classic bodyweight exercise that targets the chest, triceps, and shoulders. Great for building upper body strength and endurance.",
      howTosteps: [
        "Start in a plank position with hands slightly wider than shoulder-width apart",
        "Lower your body until your chest nearly touches the floor",
        "Push back up to the starting position, keeping your core engaged",
      ],
      videoURL:
        "https://v.ftcdn.net/02/35/30/23/700_F_235302356_yqm9LMxWwVHZjdDRbqVVHa8czTIhQa5F_ST.mp4",
    },
    {
      id: 2,
      name: "SQUATS",
      imageURL: "/public/exercisesImg/squats.jpg",
      targetMuscles: [
        { id: 4, muscle: { id: 4, name: "quads" }, percentage: 45 },
        { id: 5, muscle: { id: 5, name: "glutes" }, percentage: 35 },
        { id: 6, muscle: { id: 6, name: "hamstrings" }, percentage: 20 },
      ],
      description:
        "A fundamental lower body exercise that builds strength in the legs and glutes while improving mobility.",
      howTosteps: [
        "Stand with feet shoulder-width apart, toes slightly turned out",
        "Lower your body by bending at the hips and knees",
        "Push through your heels to return to the starting position",
      ],
      videoURL:
        "https://media.istockphoto.com/id/2161109939/video/focused-athlete-performing-heavy-squats-in-modern-gym-setting.mp4?s=mp4-640x640-is&k=20&c=UcG1tfu4lKpt0fuKOWhIiZOWjHFgztw1OHIITcYttV0=",
    },
    {
      id: 3,
      name: "PULL UPS",
      imageURL: "/public/exercisesImg/pullUps.jpg",
      targetMuscles: [
        { id: 7, muscle: { id: 7, name: "lats" }, percentage: 50 },
        { id: 8, muscle: { id: 8, name: "biceps" }, percentage: 30 },
        { id: 9, muscle: { id: 9, name: "rhomboids" }, percentage: 20 },
        { id: 10, muscle: { id: 13, name: "trapezius" }, percentage: 20 },
      ],
      description:
        "An excellent upper body pulling exercise that develops back strength and improves grip strength.",
      howTosteps: [
        "Hang from a pull-up bar with hands slightly wider than shoulder-width",
        "Pull your body up until your chin clears the bar",
        "Lower yourself back down with control",
      ],
      videoURL:
        "https://media.istockphoto.com/id/615680136/video/young-muscular-athlete-doing-pull-up-exercises.mp4?s=mp4-640x640-is&k=20&c=ceMa7-A3Fe5R8CmJ6g9kRTMWh43-YQDXL_eONcBocnU=",
    },
    {
      id: 4,
      name: "LUNGES",
      imageURL: "/public/exercisesImg/lunges.jpg",
      targetMuscles: [
        { id: 11, muscle: { id: 4, name: "quads" }, percentage: 40 },
        { id: 5, muscle: { id: 5, name: "glutes" }, percentage: 35 },
        { id: 12, muscle: { id: 10, name: "calves" }, percentage: 25 },
      ],
      description:
        "A unilateral leg exercise that improves balance, coordination, and lower body strength.",
      howTosteps: [
        "Step forward with one leg, lowering your hips until both knees are bent at 90 degrees",
        "Make sure your front knee is directly above your ankle",
        "Push back to the starting position and repeat with the other leg",
      ],
      videoURL:
        "https://media.istockphoto.com/id/1327346084/video/focused-athlete-uses-kettlebells-during-workout.mp4?s=mp4-640x640-is&k=20&c=sYOFEfNFs-PAh8lE4niCi7b2VZWJXa-GVTZYjWRhLQY=",
    },
    {
      id: 5,
      name: "PLANKS",
      imageURL: "/public/exercisesImg/planks.jpg",
      targetMuscles: [
        { id: 13, muscle: { id: 11, name: "core" }, percentage: 60 },
        { id: 14, muscle: { id: 3, name: "shoulders" }, percentage: 25 },
        { id: 15, muscle: { id: 5, name: "glutes" }, percentage: 15 },
      ],
      description:
        "An isometric core exercise that builds stability and endurance in the entire core region.",
      howTosteps: [
        "Start in a push-up position but rest on your forearms",
        "Keep your body in a straight line from head to heels",
        "Hold this position while breathing normally",
      ],
      videoURL:
        "https://media.istockphoto.com/id/1126180425/video/girl-doing-exercise-plank-stands-on-the-mat-in-the-middle-of-the-fitness-room-4k-slow-mo.mp4?s=mp4-640x640-is&k=20&c=0kW11-5SuyZ5wDT8V9_T344xDvxS4YmS3eKGlXZFhjs=",
    },
  ];

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
              <FilterPopup
                title="Filter Exercises"
                subtitle="Select muscles to target"
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
              <FilterPopup
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
          {dummyExercises.map((exercise) => (
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
          ))}
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
