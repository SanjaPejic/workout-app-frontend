import type { Exercise } from "@/types/Exercise";

interface WoMuscNamePercentage {
  name: string;
  percentage: number;
}

/*
 * Calculates a "score" for each muscle:
 *   score = averageIntensity * (frequency ^ 1.2)
 * Returns array of { name, percentage } (0-100), normalised so the highest muscle is 100%
 */
function calculateWoMuscPercentages(exercises: Exercise[]): WoMuscNamePercentage[] {
  const muscleSum: Record<string, number> = {};
  const muscleFreq: Record<string, number> = {};

  // Sum up all percentages and frequency per muscle
  exercises.forEach(exercise => {
    exercise.targetMuscles.forEach(({ muscle, percentage }) => {
      const name = muscle.name;
      muscleSum[name] = (muscleSum[name] || 0) + percentage;
      muscleFreq[name] = (muscleFreq[name] || 0) + 1;
    });
  });

  // Calculate scores (in percentages)
  const scores: Record<string, number> = {};
  Object.keys(muscleSum).forEach(name => {
    const avg = muscleSum[name] / muscleFreq[name];
    const freq = muscleFreq[name];
    scores[name] = avg * Math.pow(freq, 1.2);
  });

  // Normalise scores
  const maxScore = Math.max(...Object.values(scores));
  const normalised: WoMuscNamePercentage[] = Object.entries(scores).map(([name, value]) => ({
    name,
    percentage: maxScore ? Math.round((value / maxScore) * 100) : 0
  }));

  return normalised;
}

export default calculateWoMuscPercentages;
