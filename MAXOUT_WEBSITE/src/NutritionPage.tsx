import Navbar from "./components/Navbar";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Apple, Utensils, Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation

interface NutritionTip {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface MealPlan {
  title: string;
  imageUrl: string;
  description: string;
  route: string; // ✅ add route property
}

function NutritionPage() {
  const navigate = useNavigate();

  const tips: NutritionTip[] = [
    { icon: Apple, title: "Whole Foods First", description: "Prioritize fruits, vegetables, lean proteins, and whole grains." },
    { icon: Utensils, title: "Balanced Meals", description: "Aim for protein, carbs, and healthy fats in every meal." },
    { icon: Droplet, title: "Stay Hydrated", description: "Drink enough water daily to support performance and recovery." },
  ];

  const mealPlans: MealPlan[] = [
    {
      title: "Muscle Gain Plan",
      imageUrl: "/images/muscle_gain.jpg",
      description: "High-protein meals designed to fuel strength and growth.",
      route: "/nutrition/muscle-gain"
    },
    {
      title: "Fat Loss Plan",
      imageUrl: "/images/fat_loss.jpg",
      description: "Calorie-conscious meals to help you cut while staying energized.",
      route: "/nutrition/fat-loss"
    },
    {
      title: "Balanced Lifestyle Plan",
      imageUrl: "/images/balanced.jpg",
      description: "Flexible meals for sustainable health and fitness.",
      route: "/nutrition/balanced"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar /> {/* ✅ shared navbar */}

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
        <h2 className="text-5xl font-bold mb-4">Nutrition <span className="text-brand">Guides</span></h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Fuel your workouts and recovery with expert nutrition tips and meal plans.
        </p>
      </section>

      {/* Tips Section */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {tips.map((tip, i) => (
            <Card key={i} className="bg-zinc-900 border border-gray-700 hover:border-brand transition-all duration-300 hover:shadow-glow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand to-pink-500 flex items-center justify-center">
                  <tip.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
                <p className="text-gray-400">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Meal Plans Section */}
      <section className="py-20 px-6 bg-black flex-1">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured <span className="text-brand">Meal Plans</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {mealPlans.map((plan, i) => (
              <Card
                key={i}
                className="bg-zinc-900 border border-gray-700 hover:border-brand transition-all duration-300 hover:shadow-glow"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={plan.imageUrl}
                    alt={plan.title}
                    className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/placeholder_meal.jpg";
                    }}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3 hover:text-brand transition-colors">
                    {plan.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">{plan.description}</p>
                  <Button
                    className="w-full bg-brand hover:bg-pink-600 text-white font-semibold shadow-glow transition-all"
                    onClick={() => navigate(plan.route)} // ✅ navigate to detail page
                  >
                    View Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
    </div>
  );
}

export default NutritionPage;
