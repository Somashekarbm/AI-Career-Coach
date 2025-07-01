import React from 'react';
import { Target, Users, Brain, Award, Shield, Zap } from 'lucide-react';

const AboutModal = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Target size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          About GoalForge AI
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Empowering your career journey with intelligent AI-driven solutions
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Brain size={20} className="text-indigo-600" />
            Our Mission
          </h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            GoalForge AI is dedicated to revolutionizing career development by providing personalized, 
            AI-powered tools that help individuals achieve their professional goals. We believe everyone 
            deserves access to intelligent career guidance that adapts to their unique journey.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Users size={20} className="text-indigo-600" />
            Who We Serve
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Students</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Navigate your academic journey and prepare for your future career
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Job Seekers</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Stand out in competitive markets with AI-enhanced applications
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Professionals</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Advance your career with strategic planning and skill development
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Career Changers</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Successfully transition to new industries and roles
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Award size={20} className="text-indigo-600" />
            What Sets Us Apart
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Zap size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">AI-Powered Personalization</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our advanced AI algorithms create tailored experiences based on your unique profile
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Privacy-First Approach</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your data security and privacy are our top priorities
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target size={18} className="text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">Goal-Oriented Design</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Every feature is designed to help you achieve measurable career milestones
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Ready to Transform Your Career?
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Join thousands of professionals who have already accelerated their career growth 
            with GoalForge AI. Start your journey today and discover what's possible.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Founded in 2024</strong> • Trusted by professionals worldwide
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal; 