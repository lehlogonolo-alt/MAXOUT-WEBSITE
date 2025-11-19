import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Play, Dumbbell, Heart, Zap } from "lucide-react";
import Navbar from "./components/Navbar"; // ✅ shared navbar

interface Workout {
  title: string;
  imageUrl: string;
  category: string;
}

interface Article {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

function LandingPage() {
  const navigate = useNavigate();

  const motivation: string[] = [
    "Discipline is choosing between what you want now and what you want most.",
    "Small habits build big results. Stay consistent.",
    "Your only limit is your mindset. Train it daily.",
    "Progress is progress, no matter how small.",
    "Energy flows where intention goes."
  ];
  const randomQuote = motivation[Math.floor(Math.random() * motivation.length)];

  const featuredWorkouts: Workout[] = [
    { title: "Leg Day Burner", imageUrl: "/images/legday.jpg", category: "Leg Day" },
    { title: "10-Min Abs", imageUrl: "/images/Abs.jpg", category: "Abs" },
    { title: "Full Body Stretch", imageUrl: "/images/stretchingg.jpg", category: "Full Body Stretching" }
  ];

  const articles: Article[] = [
    {
      title: "Supplement Guide",
      description: "Explore essential supplements to boost your workouts and recovery.",
      imageUrl: "/images/supplement_guide.jpg",
      link: "/articles/supplements"
    },
    {
      title: "15 Quick and Effective Daily Routines",
      description: "Simple habits to improve your fitness, energy, and focus every day.",
      imageUrl: "/images/daily_routines.jpg",
      link: "/articles/daily-routines"
    }
  ];

  const features: Feature[] = [
    { icon: Dumbbell, title: "Expert Workouts", description: "Professionally designed routines for all fitness levels" },
    { icon: Heart, title: "Track Progress", description: "Monitor your journey with detailed analytics" },
    { icon: Zap, title: "Stay Motivated", description: "Daily inspiration and community support" }
  ];

  const startWorkout = (title: string, category: string) => {
    const videoLibrary: Record<string, string[]> = {
      "Leg Day": ["r4aMIs0ouPU"],
      "Abs": ["9p7-YC91Q74"],
      "Full Body Stretching": ["f-G70VJMZvU"]
    };
    const videoIds = videoLibrary[category] || [];
    navigate("/session", { state: { videoIds, workoutTitle: title, workoutCategory: category } });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar /> {/* ✅ shared navbar handles auth */}

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-center">
        <h2 className="text-6xl md:text-7xl font-bold mb-6 animate-pulse">
          Welcome to <span className="text-brand">MaxOut</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Your personal fitness companion across web and mobile. Transform your body, elevate your mind.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-brand hover:bg-pink-600 text-white font-bold text-lg px-8 shadow-glow animate-bounce"
            onClick={() => navigate("/signup")}
          >
            Start Your Journey
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border border-brand text-brand hover:bg-brand/10 font-bold text-lg px-8"
            onClick={() => navigate("/about")}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card key={i} className="bg-zinc-900 border border-gray-700 hover:border-brand transition-all duration-300 hover:shadow-glow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand to-pink-500 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Motivation */}
      <section className="py-24 px-6 bg-black text-center">
        <h2 className="text-4xl font-bold mb-8 text-brand">Mindset & Motivation</h2>
        <blockquote className="text-2xl md:text-3xl font-light italic text-gray-300 leading-relaxed">
          "{randomQuote}"
        </blockquote>
      </section>

            {/* Workouts */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured <span className="text-brand">Workouts</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredWorkouts.map((workout, i) => (
              <Card
                key={i}
                className="bg-zinc-900 border border-gray-700 hover:border-brand transition-all duration-300 hover:shadow-glow cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={workout.imageUrl}
                    alt={workout.title}
                    className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/placeholder_workout.jpg";
                    }}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3 hover:text-brand transition-colors">
                    {workout.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">{workout.category}</p>
                  <Button
                    onClick={() => startWorkout(workout.title, workout.category)}
                    className="w-full bg-brand hover:bg-pink-600 text-white font-semibold shadow-glow transition-all"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Workout
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Articles & <span className="text-brand">Expert Tips</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, i) => (
              <Card
                key={i}
                className="bg-zinc-900 border border-gray-700 overflow-hidden group cursor-pointer hover:border-brand transition-all duration-300 hover:shadow-glow"
                onClick={() => navigate(article.link)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/placeholder_article.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-brand transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{article.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-center">
        <h2 className="text-5xl font-bold mb-6">Ready to Transform?</h2>
        <p className="text-xl text-gray-400 mb-10">
          Join thousands of fitness enthusiasts already crushing their goals.
        </p>
        <Button 
          size="lg" 
          className="bg-brand hover:bg-pink-600 text-white font-bold text-xl px-12 py-6 shadow-glow animate-bounce"
          onClick={() => navigate("/signup")}
        >
          Get Started Free
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-brand">MaxOut</h3>
          <p className="text-gray-400 mb-6">Your fitness journey starts here.</p>
          <div className="flex gap-6 justify-center text-sm text-gray-500">
            <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="/contact" className="hover:text-brand transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

      

      



