import React from 'react';
import { Shield, Eye, Lock, Database, Users, FileText } from 'lucide-react';

const PrivacyModal = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Privacy Policy
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Eye size={20} className="text-indigo-600" />
            Information We Collect
          </h4>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Personal Information</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Name and email address</li>
                <li>• Professional information and career goals</li>
                <li>• Resume and profile data</li>
                <li>• Usage patterns and preferences</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Technical Information</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• IP address and device information</li>
                <li>• Browser type and version</li>
                <li>• Operating system</li>
                <li>• Usage analytics and performance data</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Lock size={20} className="text-indigo-600" />
            How We Use Your Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Service Provision</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                To provide personalized career guidance, AI-powered recommendations, and goal tracking features.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Communication</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                To send important updates, notifications, and respond to your inquiries and support requests.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Improvement</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                To analyze usage patterns and improve our services, features, and user experience.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Security</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                To protect against fraud, abuse, and ensure the security of our platform and users.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Database size={20} className="text-indigo-600" />
            Data Storage and Security
          </h4>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We implement industry-standard security measures to protect your personal information. 
              Your data is encrypted in transit and at rest, and we regularly review and update our 
              security practices to ensure the highest level of protection.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <Lock size={24} className="text-indigo-600 mx-auto mb-2" />
                <h5 className="font-medium text-gray-900 dark:text-white">Encryption</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">256-bit SSL encryption</p>
              </div>
              <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <Shield size={24} className="text-indigo-600 mx-auto mb-2" />
                <h5 className="font-medium text-gray-900 dark:text-white">Access Control</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">Role-based permissions</p>
              </div>
              <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <FileText size={24} className="text-indigo-600 mx-auto mb-2" />
                <h5 className="font-medium text-gray-900 dark:text-white">Compliance</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">GDPR & CCPA compliant</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Users size={20} className="text-indigo-600" />
            Information Sharing
          </h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share 
            your information only in the following circumstances:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Service Providers:</strong> With trusted third-party service providers who assist 
                us in operating our platform (e.g., cloud hosting, analytics).
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Legal Requirements:</strong> When required by law or to protect our rights, 
                property, or safety, or that of our users.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Consent:</strong> With your explicit consent for specific purposes.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Your Rights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Access & Update</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Access, update, or correct your personal information through your account settings.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Delete</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Request deletion of your account and associated data at any time.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Opt-out</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Unsubscribe from marketing communications and control notification preferences.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Portability</h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Request a copy of your data in a portable format for transfer to other services.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Contact Us
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about this Privacy Policy or our data practices, 
            please contact us at:
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> privacy@goalforge.ai</p>
            <p><strong>Address:</strong> 123 Innovation Drive, Tech Valley, CA 94000</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal; 