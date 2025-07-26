export const getFillColor = (
  avatarBodyParts: string[],
  targetMuscNames: string[]
) => {
  const mainColor = "#0972FF";
  // const secondaryColor = "#84B9FF";
  const defaultColor = "#919EAB";

  for (let targetMuscName of targetMuscNames) {
    if (avatarBodyParts.includes(targetMuscName)) {
      return mainColor;
    }
  }

  return defaultColor;
};
