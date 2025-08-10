function lerpColour(a: string, b: string, t: number): string {
  const ah = a.replace('#', '');
  const bh = b.replace('#', '');
  const ar = parseInt(ah.substring(0, 2), 16);
  const ag = parseInt(ah.substring(2, 4), 16);
  const ab = parseInt(ah.substring(4, 6), 16);
  const br = parseInt(bh.substring(0, 2), 16);
  const bg = parseInt(bh.substring(2, 4), 16);
  const bb = parseInt(bh.substring(4, 6), 16);

  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);

  return (
    "#" +
    rr.toString(16).padStart(2, "0") +
    rg.toString(16).padStart(2, "0") +
    rb.toString(16).padStart(2, "0")
  );
}

function getFillColour (
  avatarBodyParts: string[],
  musclePercentages: { [muscleName: string]: number }
) {
  const defaultColour = "#919EAB";
const lightColour = "#b2d3ee";
const darkColour = "#1254a1";

  // Gather all percentages for these avatarBodyParts
  const percents = avatarBodyParts
    .map(name => musclePercentages[name])
    .filter(p => typeof p === 'number');

  if (!percents.length) return defaultColour;

  // Find the max for this group (relative scaling)
  const max = Math.max(...Object.values(musclePercentages));
  if (max === 0) return defaultColour; // avoid divide by zero

  // For each part, return colour based on relative intensity
  // if multiple match, just use first match as before
  for (let name of avatarBodyParts) {
    const pct = musclePercentages[name];
    if (typeof pct === "number" && pct > 0) {
      const relative = pct / max; // 0..1, highest = 1
      return lerpColour(lightColour, darkColour, relative);
    }
  }

  return defaultColour;
};

export default getFillColour;
