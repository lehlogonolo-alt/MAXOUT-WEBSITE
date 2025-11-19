function DailyRoutines() {
  const routines: string[] = [
    "Morning hydration",
    "5-minute stretch",
    "Protein-rich breakfast",
    "Goal review",
    "Short walk or sunlight exposure",
    "Time-blocking your day",
    "Midday movement break",
    "Healthy snack prep",
    "Digital detox moments",
    "Evening reflection",
    "Gratitude journaling",
    "Sleep hygiene routine",
    "Limiting caffeine after 2pm",
    "Reading or learning",
    "Planning tomorrow’s top 3 tasks"
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        15 Quick and Effective Daily Routines
      </h2>

      <img
        src="https://raw.githubusercontent.com/lehlogonolo-alt/maxout-images/main/daily_routines.jpg"
        alt="Man tying shoes before workout"
        className="w-full rounded-lg mb-6 shadow-glow"
      />

      <p className="text-base leading-relaxed text-muted-foreground mb-8">
        Building a consistent daily routine can boost <strong>productivity</strong>, <strong>mood</strong>, and <strong>fitness results</strong>.
        These 15 quick and effective habits are designed to fit into any schedule and help you stay energized, focused, and balanced throughout the day.
      </p>

      <ol className="list-decimal list-inside space-y-2 text-sm leading-loose">
        {routines.map((routine, i) => (
          <li key={i}>{routine}</li>
        ))}
      </ol>
    </div>
  );
}

export default DailyRoutines;

