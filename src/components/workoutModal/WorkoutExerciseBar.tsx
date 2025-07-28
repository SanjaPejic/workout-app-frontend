import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, GripVertical, Trash2 } from "lucide-react";

interface WorkoutExerciseBarProps {
  exerciseName: string;
  hasInjuredMuscle?: boolean;
  sets: number | undefined;
  reps: number | undefined;
  kilos: number | undefined;
  onSetsChange: (newSets: number) => void;
  onRepsChange: (newReps: number) => void;
  onKilosChange: (newKilos: number) => void;
  onRemove: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

function WorkoutExerciseBar({
  exerciseName,
  hasInjuredMuscle = false,
  sets,
  reps,
  kilos,
  onSetsChange,
  onKilosChange,
  onRepsChange,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
}: WorkoutExerciseBarProps) {
  return (
    <div className="flex-1">
      {/*Individual Exercise Warnings*/}
      {hasInjuredMuscle && (
        <div className="bg-red-50 p-2 border border-red-300 border-b-0 rounded-t-lg">
          <div className="flex items-center gap-2 font-medium text-red-600 text-sm">
            <AlertTriangle className="w-4 h-4" />
            Warning: Exercise will affect your injury
          </div>
        </div>
      )}
      {/*Exercise block content*/}
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`flex justify-between items-center gap-3 bg-white hover:bg-gray-50 p-3 border-2 ${hasInjuredMuscle ? "border-red-300 rounded-t-none rounded-lg" : "rounded-lg"}   cursor-move`}
      >
        {/*Left side: grip icon + name*/}
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-5 h-5 text-gray-400" />
          <span className="flex-1 font-semibold text-gray-900 truncate">
            {exerciseName}
          </span>
        </div>
        {/*Right side: exercise volume + remove button*/}
        <div className="flex items-center gap-2">
          {/*Exercise volume: sets, reps, kilos*/}
          <div className="flex items-center gap-1">
            <span className="text-gray-600 text-sm">sets:</span>
            <Input
              type="number"
              name="sets"
              className="w-16 h-8 text-center"
              value={sets}
              placeholder={"0"}
              min={0}
              onChange={(e) =>
                onSetsChange?.(e.target.value === "" ? 0 : +e.target.value)
              }
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600 text-sm">reps:</span>
            <Input
              type="number"
              name="reps"
              className="w-16 h-8 text-center"
              value={reps}
              placeholder={"0"}
              min={0}
              onChange={(e) =>
                onRepsChange?.(e.target.value === "" ? 0 : +e.target.value)
              }
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-600 text-sm">kg:</span>
            <Input
              type="number"
              name="kilos"
              className="w-16 h-8 text-center"
              value={kilos}
              placeholder={"0"}
              min={0}
              onChange={(e) =>
                onKilosChange?.(e.target.value === "" ? 0 : +e.target.value)
              }
            />
          </div>
          {/*Remove Button*/}
          <div className="flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-gray-500 hover:text-red-600"
              onClick={onRemove}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutExerciseBar;
