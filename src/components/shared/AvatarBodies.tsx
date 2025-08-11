import AvatarBack from "@/assets/svgs/AvatarBack";
import AvatarFront from "@/assets/svgs/AvatarFront";
import type { TargetMuscle } from "@/types/TargetMuscle";

interface AvatarBodiesProps {
  targetMuscles: Partial<TargetMuscle>[];
  size?: "big" | "medium" | "small";
}

function AvatarBodies({ targetMuscles, size = "small" }: AvatarBodiesProps) {
  // Build a map of muscle name to percentage
  const percentageMap = Object.fromEntries(
    targetMuscles.map((tm) => [tm.muscle?.name, tm.percentage])
  );

  let width: number | undefined;
  let height: number | undefined;
  let spacingClass = "";

  if (size === "big") {
    width = 200;
    height = 340;
    spacingClass = "space-x-0";
  } else if (size === "medium") {
    width = 120;
    height = 280;
    spacingClass = "space-x-6";
  } else if (size === "small") {
    width = 79;
    height: 222;
    spacingClass = "space-x-6";
  }

  return (
    <div className={`flex flex-row items-center ${spacingClass}`}>
      <AvatarFront
        musclePercentages={percentageMap}
        width={width}
        height={height}
      />
      <AvatarBack
        musclePercentages={percentageMap}
        width={width}
        height={height}
      />
    </div>
  );
}

export default AvatarBodies;
