import type { Exercise } from "@/types/Exercise";
import { useState } from "react";
import { Button } from "../ui/button";
import { AlertTriangle, Check, Plus } from "lucide-react";
import type { Muscle } from "@/types/Muscle";

interface ExerciseCardProps {
  exercise: Exercise;
  onToggle?: () => void;
  isAdded?: boolean;
  injuredMuscles: Muscle[];
  onExerciseClick?: () => void;
  isStartWorkout?: boolean;
}

function ExerciseCard({
  exercise,
  onToggle,
  isAdded,
  injuredMuscles,
  onExerciseClick,
  isStartWorkout = false,
}: ExerciseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  //Check for injured muscles
  const hasInjuredMuscle = exercise.targetMuscles.some((tm) =>
    injuredMuscles.some((injuredMuscle) => injuredMuscle.id === tm.muscle.id)
  );

  return (
    <div
      className={`group relative shadow-lg hover:shadow-xl rounded-2xl w-full h-64 overflow-hidden transition-all duration-300 ${isStartWorkout ? "" : "cursor-pointer"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onExerciseClick}
    >
      {/*Card Image*/}
      <div className="relative h-full">
        <img
          src={exercise.imageURL}
          alt={exercise.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isHovered ? "blur-sm brightness-50 scale-105" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      </div>
      {/*Exercise name*/}
      <div className="right-0 bottom-0 left-0 absolute p-4 text-center">
        <h3 className="font-bold text-white text-lg tracking-wide">
          {exercise.name}
        </h3>
      </div>
      {/*Muscle tags*/}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {hasInjuredMuscle ? (
          <>
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-2">
                {exercise.targetMuscles.map((targetMuscle, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium shadow-md transform transition-all duration-300 ${
                      injuredMuscles!.some(
                        (injured) => injured.id === targetMuscle.muscle.id
                      )
                        ? "bg-cyan-500 text-white outline-solid outline-yellow-200"
                        : "bg-cyan-500 text-white"
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      transform: isHovered
                        ? "translateY(0) scale(1)"
                        : "translateY(10px) scale(0.8)",
                    }}
                  >
                    {targetMuscle.muscle.name}
                  </span>
                ))}
              </div>
              {/*Yellow Injury Alert*/}
              <div
                className="flex items-center gap-1 bg-yellow-300 mt-3 px-3 py-1 rounded font-bold text-black transition-all duration-300 transform"
                style={{
                  transitionDelay: "300ms",
                  transform: isHovered
                    ? "translateY(0) scale(1)"
                    : "translateY(10px) scale(0.8)",
                }}
              >
                <AlertTriangle className="w-4 h-4" />
                Injury Warning
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            {exercise.targetMuscles.map((targetMuscles, index) => (
              <span
                key={index}
                className="bg-cyan-500 shadow-md px-3 py-1 rounded-full font-medium text-white text-sm transition-all duration-300 transform"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isHovered
                    ? "translateY(0) scale(1)"
                    : "translateY(10px) scale(0.8)",
                }}
              >
                {targetMuscles.muscle.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/*Add/Remove Button*/}
      {!isStartWorkout && onToggle && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border-2 z-10 ${
            isAdded
              ? "bg-green-500 hover:bg-green-600 text-white border-green-400"
              : "bg-white/90 hover:bg-white text-gray-900 border-white/50"
          }`}
        >
          {isAdded ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
}

export default ExerciseCard;
