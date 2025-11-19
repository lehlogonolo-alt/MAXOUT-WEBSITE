import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface WorkoutSessionState {
  videoIds?: string[];
  workoutTitle?: string;
  workoutCategory?: string;
}

function WorkoutSession() {
  const { state } = useLocation() as { state: WorkoutSessionState };
  const { videoIds = [], workoutTitle, workoutCategory } = state || {};
  const [timeLeft, setTimeLeft] = useState<number>(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!videoIds.length) {
    return <p className="text-center text-muted-foreground">No video found for this workout.</p>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">{workoutTitle}</h2>
      <p className="mb-6 text-muted-foreground">
        <strong>Category:</strong> {workoutCategory}
      </p>

      <div className="aspect-video mb-6 rounded-lg overflow-hidden shadow-glow">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoIds[0]}?autoplay=1`}
          title="Workout Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h3 className="text-xl font-semibold mt-6">
        Timer: {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </h3>

      {timeLeft === 0 && (
        <p className="mt-4 text-lg font-bold text-green-500">Workout complete! 💪</p>
      )}
    </div>
  );
}

export default WorkoutSession;
