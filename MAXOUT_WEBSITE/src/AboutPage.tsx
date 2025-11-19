import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Dumbbell, Heart, Zap } from "lucide-react";

function AboutPage() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Dumbbell,
      title: "Strength & Discipline",
      description: "We believe fitness is built on consistency, discipline, and pushing beyond limits."
    },
    {
      icon: Heart,
      title: "Community & Support",
      description: "MaxOut is more than workouts — it’s a community that motivates and uplifts each other."
    },
    {
      icon: Zap,
      title: "Energy & Growth",
      description: "Our mission is to help you transform your body and mind with sustainable energy."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-brand to-pink-500 bg-clip-text text-transparent">
          About MaxOut
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          MaxOut is your personal fitness companion across web and mobile. 
          We combine expert workouts, motivational content, and powerful tracking tools 
          to help you crush your goals and elevate your lifestyle.
        </p>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <Card key={i} className="bg-zinc-900 border border-gray-700 hover:border-brand transition-all duration-300 hover:shadow-glow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand to-pink-500 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Created by Trainers */}
      <section className="py-20 px-6 bg-black text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-brand">Created by Trainers</h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            MaxOut was founded by a passionate team of trainers — Conner Bell, Samuel Ntumba, 
            Lehlogonolo Makwela, and El Shaddai Godana — who believed fitness should be accessible 
            to everyone, regardless of income or background. They saw a gap in reliable health and 
            fitness information online, where too many platforms focused on profit or appearance 
            rather than true well-being. In 2025, MaxOut launched with the mission to deliver 
            research-backed fitness content and keep the core platform free for everyone.
          </p>
        </div>
      </section>

      {/* Driven by You */}
      <section className="py-20 px-6 bg-zinc-950 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-brand">Driven by You</h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Since day one, MaxOut has relied on its members to shape our workouts, features, 
            and even the way we grow as a team. We listen closely to your feedback on sessions, 
            beta testing, and community requests. Your input has guided our evolution, and we 
            sincerely hope our tools help you on your fitness journey. At MaxOut, we believe 
            good things happen when you put people first.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Join the Movement</h2>
        <p className="text-lg text-gray-400 mb-10">
          Thousands of fitness enthusiasts are already transforming their lives with MaxOut. 
          Be part of the journey today.
        </p>
        <Button 
          size="lg" 
          className="bg-brand hover:bg-pink-600 text-white font-bold text-xl px-12 py-6 shadow-glow animate-bounce"
          onClick={() => navigate("/signup")}
        >
          Get Started Free
        </Button>
      </section>
    </div>
  );
}

export default AboutPage;

