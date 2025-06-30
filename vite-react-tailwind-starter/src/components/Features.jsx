import React from "react";

const features = [
  {
    title: "AI Resume Analyzer",
    description: "Get tailored suggestions to enhance your resume and stand out to recruiters."
  },
  {
    title: "Personalized Career Roadmaps",
    description: "Receive step-by-step, goal-oriented plans based on your background and interests."
  },
  {
    title: "Simulated AI Interviews",
    description: "Sharpen your interview skills with real-time, AI-driven practice sessions."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#121212] text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Features</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Discover powerful AI-driven tools designed to accelerate your career growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <span className="text-white text-lg font-bold">{index + 1}</span>
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                {feature.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;