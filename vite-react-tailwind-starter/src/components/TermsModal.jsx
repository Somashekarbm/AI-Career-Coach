import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale, Users, Shield } from 'lucide-react';

const TermsModal = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Terms of Service
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle size={20} className="text-indigo-600" />
            Acceptance of Terms
          </h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            By accessing and using GoalForge AI ("the Service"), you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Users size={20} className="text-indigo-600" />
            User Accounts and Registration
          </h4>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Account Creation</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• You must be at least 18 years old to create an account</li>
                <li>• Provide accurate and complete information during registration</li>
                <li>• Maintain the security of your account credentials</li>
                <li>• Notify us immediately of any unauthorized use</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Account Responsibilities</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• You are responsible for all activities under your account</li>
                <li>• Do not share your account with others</li>
                <li>• Keep your contact information updated</li>
                <li>• Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Scale size={20} className="text-indigo-600" />
            Acceptable Use Policy
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                <CheckCircle size={16} />
                Permitted Uses
              </h5>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Personal career development and goal setting</li>
                <li>• Professional networking and collaboration</li>
                <li>• Educational and training purposes</li>
                <li>• Legitimate business activities</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h5 className="font-medium text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} />
                Prohibited Uses
              </h5>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Illegal activities or content</li>
                <li>• Harassment or discrimination</li>
                <li>• Spam or unauthorized advertising</li>
                <li>• Attempting to breach security</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Shield size={20} className="text-indigo-600" />
            Intellectual Property Rights
          </h4>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Our Rights</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                GoalForge AI and its original content, features, and functionality are owned by us and are 
                protected by international copyright, trademark, patent, trade secret, and other intellectual 
                property laws.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Your Rights</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You retain ownership of content you submit to the Service. By submitting content, you grant 
                us a non-exclusive, worldwide, royalty-free license to use, modify, and display your content 
                in connection with the Service.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Service Availability and Modifications
          </h4>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We strive to provide reliable service but cannot guarantee uninterrupted availability. 
              We may modify, suspend, or discontinue the Service at any time with reasonable notice.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm font-bold">99.9%</span>
                </div>
                <h5 className="font-medium text-gray-900 dark:text-white">Uptime</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">Target availability</p>
              </div>
              <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm font-bold">24/7</span>
                </div>
                <h5 className="font-medium text-gray-900 dark:text-white">Support</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">Customer assistance</p>
              </div>
              <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-sm font-bold">30d</span>
                </div>
                <h5 className="font-medium text-gray-900 dark:text-white">Notice</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">For major changes</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Limitation of Liability
          </h4>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To the maximum extent permitted by law, GoalForge AI shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to loss 
              of profits, data, use, goodwill, or other intangible losses.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h5 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                Important Disclaimer
              </h5>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Our AI-powered recommendations are for guidance purposes only and should not be considered 
                as professional career advice. We recommend consulting with qualified professionals for 
                important career decisions.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Termination
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>By You:</strong> You may terminate your account at any time by contacting us or 
                using the account deletion feature in your settings.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>By Us:</strong> We may terminate or suspend your account immediately, without prior 
                notice, for conduct that we believe violates these Terms or is harmful to other users or us.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Effect:</strong> Upon termination, your right to use the Service will cease immediately, 
                and we may delete your account and data in accordance with our Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Contact Information
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> legal@goalforge.ai</p>
            <p><strong>Address:</strong> 123 Innovation Drive, Tech Valley, CA 94000</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal; 