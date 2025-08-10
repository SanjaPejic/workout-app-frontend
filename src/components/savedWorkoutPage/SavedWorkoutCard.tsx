import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import type { Workout } from "@/types/Workout";

type SavedWoCardProps = {
  workout: Workout;
  onDelete: (id: number) => void;
  onOpen: (workout: Workout) => void;
};

function SavedWorkoutCard({ workout, onDelete, onOpen }: SavedWoCardProps) {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return "-";
    return dateObj.toLocaleDateString("en-GB");
  };

  return (
    <div className="bg-white shadow-md border-2 border-gray-300 hover:border-cyan-400 rounded-lg overflow-hidden transition-all duration-200">
      {/*Content*/}
      <div className="p-6">
        {/*Name, Injury Alert and Remove Button*/}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-xl truncate">
              {workout.name}
            </h3>
            {/* Missing --> small red injury alert */}
          </div>
          <Button
            onClick={() => onDelete(workout.id)}
            variant="ghost"
            size="icon"
            className="flex-shrink-0 w-8 h-8 text-gray-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/*Number of Exercises*/}
        <div className="space-y-2 mb-4">
          <p className="text-gray-600 text-sm">
            <span className="font-medium">
              {workout.workoutExercises.length}
            </span>
            exercises
          </p>
        </div>

        {/*Targeted Muscles Percentages*/}
        <div className="mb-4">
          <h4 className="mb-3 font-bold text-gray-900 text-sm">
            Muscles targeted
          </h4>
          <div className="space-y-2">
            {/* Missing --> list of targeted muscles */}
          </div>
        </div>

        {/*Date of Creation*/}
        <p className="mb-4 text-gray-400 text-xs">
          Created: {formatDate(workout.date)}
        </p>

        {/*Open Workout Button*/}
        <Button
          onClick={() => onOpen(workout)}
          className="bg-cyan-600 hover:bg-cyan-700 py-2 rounded-lg w-full font-semibold text-white"
        >
          OPEN WORKOUT
        </Button>
      </div>
    </div>
  );
}

export default SavedWorkoutCard;
