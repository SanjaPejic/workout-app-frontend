import AvatarBack from "@/assets/svgs/AvatarBack";
import AvatarFront from "@/assets/svgs/AvatarFront";
import type { TargetMuscle } from "@/types/TargetMuscle";

interface AvatarBodiesProps {
  targetMuscles: TargetMuscle[];
}

function AvatarBodies({ targetMuscles }: AvatarBodiesProps) {
  const targetMuscNames = targetMuscles.map((tm) => tm.muscle.name);

  return (
    <div className="flex flex-row items-center space-x-6">
      <AvatarFront targetMuscNames={targetMuscNames} />
      <AvatarBack targetMuscNames={targetMuscNames} />
    </div>
  );
}

export default AvatarBodies;
