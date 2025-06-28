import React from "react";

const features = [
  { title: "AI Resume Review", description: "Instant feedback to boost your resume visibility." },
  { title: "Mock Interviews", description: "Practice with AI for real interview scenarios." },
  { title: "Career Path Guidance", description: "Customized roadmaps based on your interests." },
];

const Features = () => {
  return (
    <section id="features" className="py-16 px-4 bg-white dark:bg-[#121212] text-gray-900 dark:text-white">
  <div className="max-w-6xl mx-auto text-center">
    <h3 className="text-3xl font-bold mb-10">Features</h3>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {features.map((f, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition"
        >
          <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
          <p className="text-gray-600 dark:text-gray-300">{f.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default Features;