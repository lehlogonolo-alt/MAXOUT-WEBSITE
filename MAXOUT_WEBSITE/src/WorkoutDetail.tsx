import { useLocation, useNavigate } from "react-router-dom";
import WorkoutVideoLibrary, { WorkoutCategory } from "./WorkoutVideoLibrary";

interface Workout {
  title: string;
  imageUrl: string;
  details: string;
}

interface LocationState {
  state: Workout;
}

function WorkoutDetail() {
  const { state: workout } = useLocation() as LocationState;
  const navigate = useNavigate();

  if (!workout) {
    return <p className="text-center text-muted-foreground">No workout selected.</p>;
  }

  const category: WorkoutCategory = (() => {
    const title = workout.title.toLowerCase();
    if (title.includes("leg day")) return "Leg Day";
    if (title.includes("running")) return "Running";
    if (title.includes("squats")) return "Squats";
    if (title.includes("full body stretching")) return "Full Body Stretching";
    if (title.includes("abs")) return "Abs";
    if (title.includes("push ups")) return "Push Ups";
    return "Running"; // fallback
  })();

  const videoIds: string[] = WorkoutVideoLibrary[category];

  const startWorkout = () => {
    if (videoIds.length === 0) {
      alert("No videos found for this workout.");
      return;
    }
    navigate("/session", {
      state: {
        videoIds,
        workoutTitle: workout.title,
        workoutCategory: category,
      },
    });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">{workout.title}</h2>
      <img
        src={`https://raw.githubusercontent.com/lehlogonolo-alt/maxout-images/main/${workout.imageUrl}`}
        alt={workout.title}
        className="w-96 rounded-lg mb-6 shadow-glow"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/images/placeholder_workout.jpg"; // ✅ fallback
        }}
      />
      <p className="text-base leading-relaxed text-muted-foreground mb-4">{workout.details}</p>
      <p className="text-sm text-muted-foreground">
        <strong>Category:</strong> {category}
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        <strong>Duration:</strong> 10 Minutes
      </p>
      <button
        onClick={startWorkout}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-glow hover:bg-primary/90 transition-all"
      >
        ▶ Start Workout
      </button>
    </div>
  );
}

export default WorkoutDetail;




