export async function GET() {
  const startTime = Date.now(); // Start time measurement

  const totalPoints = 1_000_000;
  const frequency = 0.00005; // Decrease frequency to space out peaks
  const amplitude = 0.5; // Reduce amplitude for a lower wave

  const sineWaveData = Array.from({ length: totalPoints }, (_, i) => ({
    x: i,
    y: amplitude * Math.sin(2 * Math.PI * frequency * i), // Proper sine wave equation
  }));

  const endTime = Date.now(); // End time measurement
  console.log(
    `Generated ${totalPoints} sine wave points in ${endTime - startTime} ms`
  );

  return Response.json({
    first: sineWaveData[0],
    last: sineWaveData[sineWaveData.length - 1],
    allData: sineWaveData, // Full access
  });
}
