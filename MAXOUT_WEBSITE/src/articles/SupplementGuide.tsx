function SupplementGuide() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary">Supplement Guide</h2>

      <img
        src="https://raw.githubusercontent.com/lehlogonolo-alt/maxout-images/main/supplement_guide.jpg"
        alt="Man drinking supplement in gym"
        className="w-full rounded-lg mb-6 shadow-glow"
      />

      <p className="text-base leading-relaxed text-muted-foreground mb-8">
        Supplements can support your fitness goals, but <strong>timing</strong>, <strong>dosage</strong>, and <strong>quality</strong> matter.
        Learn how to choose the right ones for <strong>muscle recovery</strong>, <strong>energy</strong>, and <strong>overall health</strong>.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-4">Why Supplements Matter</h3>
      <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed text-muted-foreground">
        <li><strong>Muscle Recovery:</strong> Protein powders and BCAAs help rebuild muscle after intense workouts.</li>
        <li><strong>Energy Boost:</strong> Pre-workouts and creatine can improve performance and endurance.</li>
        <li><strong>General Health:</strong> Multivitamins, omega-3s, and magnesium support immunity, joints, and sleep.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-8 mb-4">Tips for Choosing Supplements</h3>
      <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed text-muted-foreground">
        <li>Check for third-party testing and clean ingredient labels.</li>
        <li>Time your intake: protein post-workout, pre-workout 30 minutes before training.</li>
        <li>Start with basics before stacking multiple products.</li>
      </ul>

      <p className="mt-8 text-sm text-muted-foreground">
        Always consult a healthcare professional before starting any new supplement routine—especially if you have medical conditions or take medications.
      </p>
    </div>
  );
}

export default SupplementGuide;

