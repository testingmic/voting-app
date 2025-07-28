import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import GlassCard, { GlassCardBody } from '../ui/GlassCard';
import Button from '../ui/Button';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SecuritySettings: React.FC = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: user?.twoFactorEnabled || false,
    deviceFingerprinting: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const handleSecurityToggle = (setting: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    toast.success(`${setting} ${!securitySettings[setting as keyof typeof securitySettings] ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-6">
      <GlassCard>
        <GlassCardBody>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Security Settings</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => handleSecurityToggle('twoFactorEnabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  securitySettings.twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Device Fingerprinting</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Track and prevent duplicate voting from same device</p>
              </div>
              <button
                onClick={() => handleSecurityToggle('deviceFingerprinting')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  securitySettings.deviceFingerprinting ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    securitySettings.deviceFingerprinting ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white shadow-lg shadow-primary-500/25">
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </GlassCardBody>
      </GlassCard>
    </div>
  );
};

export default SecuritySettings; 