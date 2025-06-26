import React from "react";

const features = [
  { title: "AI Resume Review", description: "Instant feedback to boost your resume visibility." },
  { title: "Mock Interviews", description: "Practice with AI for real interview scenarios." },
  { title: "Career Path Guidance", description: "Customized roadmaps based on your interests." },
];

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold text-indigo-600 mb-10">Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
