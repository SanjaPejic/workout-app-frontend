import type { Exercise } from "@/types/Exercise";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface ExerciseModalProps {
  exercise: Exercise;
  onClose: () => void;
}

function ExerciseModal({ exercise, onClose }: ExerciseModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className=" [&>button]:hidden p-0 !max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="relative bg-white rounded-lg">
          {/*Close Button*/}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="top-4 right-4 z-10 absolute bg-white/90 hover:bg-white rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
          {/*Title*/}
          <div className="p-6 pb-4">
            <h2 className="font-bold text-gray-900 text-2xl text-center">
              {exercise.name}
            </h2>
          </div>
          {/*Exercise Details*/}
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 p-6 pt-0">
            {/*Left Side: video + text-description*/}
            <div className="space-y-4">
              {/*Video*/}
              <div className="relative border-2 border-gray-300 rounded-lg aspect-video overflow-hidden">
                <video controls className="w-full h-full object-cover">
                  <source src={exercise.videoURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/*Description*/}
              <div className="p-4 border-2 border-gray-300 rounded-lg">
                <h3 className="mb-1.5 font-semibold text-gray-900 text-center">
                  EXERCISE DESCRIPTION
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {exercise.description}
                </p>
              </div>
              {/*How to do it*/}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">
                  How to do it
                </h3>
                <div className="space-y-2">
                  {exercise.howTosteps.map((howToStep, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex flex-shrink-0 justify-center items-center bg-cyan-600 mt-0.5 rounded-full w-6 h-6 font-semibold text-white text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {howToStep}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/*Right side: body avatars + target muscle percentages*/}
            <div className="space-y-4">
              <div className="flex justify-center gap-8">
                {/* Front Body */}
                <div className="text-center">Avatar body front</div>
                {/* Back Body */}
                <div className="text-center">Avatar body back</div>
              </div>
              {/* Muscle Percentages */}
              <div className="space-y-3">
                {exercise.targetMuscles.map((targetMuscle) => (
                  <div key={targetMuscle.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900 text-sm uppercase">
                        {targetMuscle.muscle.name}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {targetMuscle.percentage}%
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full w-full h-2">
                      <div
                        className="bg-gray-600 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${targetMuscle.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ExerciseModal;
