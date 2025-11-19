import Navbar from "./components/Navbar";
import { Card, CardContent } from "./components/ui/card";
import { Coffee, Fish, Soup, Carrot, Clock } from "lucide-react";

function FatLossPlan() {
  const meals = [
    {
      icon: Coffee,
      title: "Breakfast",
      description: "Oatmeal with berries, black coffee",
      time: "08:00 AM",
    },
    {
      icon: Fish,
      title: "Lunch",
      description: "Grilled salmon, quinoa, mixed greens",
      time: "01:00 PM",
    },
    {
      icon: Soup,
      title: "Dinner",
      description: "Turkey chili with beans and vegetables",
      time: "07:30 PM",
    },
    {
      icon: Carrot,
      title: "Snacks",
      description: "Celery sticks, hummus, boiled eggs",
      time: "10:30 AM & 04:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
        <h2 className="text-5xl font-bold mb-4 text-brand">Fat Loss Plan</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Calorie-conscious meals to help you cut while staying energized.
        </p>
      </section>

      {/* Meals Section */}
      <section className="px-6 py-16 flex-1 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-center">Sample Meals & Schedule</h3>

        {/* Grid of Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {meals.map((meal, i) => (
            <Card key={i} className="bg-zinc-900 border border-gray-700 hover:border-brand transition-all duration-300 hover:shadow-glow">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-brand to-pink-500 flex items-center justify-center">
                  <meal.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{meal.title}</h4>
                <p className="text-gray-400 mb-2">{meal.description}</p>
                <span className="text-sm text-brand font-semibold flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {meal.time}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline View */}
        <div className="relative border-l-2 border-brand pl-6 space-y-8">
          {meals.map((meal, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-brand flex items-center justify-center">
                <meal.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold">{meal.title}</h4>
                <p className="text-gray-400 text-sm">{meal.description}</p>
                <span className="text-sm text-brand font-semibold">{meal.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800 text-center">
        <h3 className="text-2xl font-bold mb-4 text-brand">MaxOut</h3>
        <p className="text-gray-400 mb-6">Your fitness journey starts here.</p>
      </footer>
    </div>
  );
}

export default FatLossPlan;



