import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import Navbar from "./components/Navbar"; // ✅ shared navbar
import { Typewriter } from "react-simple-typewriter"; // ✅ typing effect
import Chatbot from "./components/Chatbot"; // ✅ floating chatbot

interface Workout {
  title: string;
  imageUrl: string;
  details: string;
}

function Dashboard() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://maxout-api.onrender.com/workouts")
      .then((res) => res.json())
      .then((data: Workout[]) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch workouts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar /> {/* ✅ shared navbar */}

      {/* Hero Section */}
      <section className="px-6 py-16 text-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
        <h2 className="text-4xl font-bold mb-4 text-brand">
          <Typewriter
            words={[
              "MaxOut is your new home",
              "Your fitness journey starts here"
            ]}
            loop={true} // ✅ cycles through phrases
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Your personal fitness dashboard. Track progress, explore workouts, and stay motivated.
        </p>
      </section>

      {/* Workouts Section */}
      <section className="px-6 py-12 flex-1">
        <div className="flex items-center gap-3 mb-6">
          <Dumbbell className="w-6 h-6 text-brand" />
          <h3 className="text-2xl font-bold text-brand">Workouts</h3>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading workouts...</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {workouts.map((w, i) => (
              <div
                key={i}
                className="border border-gray-700 rounded-lg p-4 w-56 cursor-pointer hover:shadow-glow transition-all bg-zinc-900"
                onClick={() => navigate(`/workout/${w.title}`, { state: w })}
              >
                <img
                  src={`https://raw.githubusercontent.com/lehlogonolo-alt/maxout-images/main/${w.imageUrl}`}
                  alt={w.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/placeholder_workout.jpg";
                  }}
                />
                <h4 className="text-lg font-semibold">{w.title}</h4>
                <p className="text-sm text-muted-foreground">{w.details}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800 text-center">
        <h3 className="text-2xl font-bold mb-4 text-brand">MaxOut</h3>
        <p className="text-gray-400 mb-6">Your fitness journey starts here.</p>
        <div className="flex gap-6 justify-center text-sm text-gray-500">
          <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="/contact" className="hover:text-brand transition-colors">Contact Us</a>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}

export default Dashboard;



