import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SaveWorkoutModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (workoutName: string) => void;
  onCancel?: () => void;
}

function SaveWorkoutModal({
  isOpen,
  onOpenChange,
  onSave,
  onCancel,
}: SaveWorkoutModalProps) {
  const [workoutName, setWorkoutName] = useState("");

  const handleSave = () => {
    if (!workoutName.trim()) return;
    onSave(workoutName.trim());
    setWorkoutName("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setWorkoutName("");
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white shadow-2xl px-8 py-8 border border-gray-200 rounded-2xl max-w-md"
        style={{ minWidth: 400 }}
      >
        <DialogHeader>
          <DialogTitle className="mb-6 font-bold text-2xl text-center">
            SAVE WORKOUT
          </DialogTitle>
        </DialogHeader>
        <Input
          autoFocus
          placeholder="Enter the name of the workout..."
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="bg-gray-50 mb-8 py-6 text-lg text-center"
        />
        <DialogFooter className="flex justify-center gap-4">
          <Button
            onClick={handleSave}
            disabled={!workoutName.trim()}
            className="bg-white hover:bg-gray-200 active:bg-gray-300 px-8 py-2 border border-gray-300 hover:border-gray-400 font-semibold text-gray-900 text-lg transition-colors"
          >
            YES
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="hover:bg-gray-200 active:bg-gray-300 px-8 py-2 font-semibold text-lg"
            >
              NO
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SaveWorkoutModal;
