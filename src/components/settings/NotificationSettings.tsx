import React, { useState } from 'react';
import GlassCard, { GlassCardBody } from '../ui/GlassCard';
import { toast } from 'react-hot-toast';

const NotificationSettings: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    electionReminders: true,
    votingConfirmations: true,
    resultsAnnouncements: true,
    securityAlerts: false
  });

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    toast.success(`${setting} ${!notificationSettings[setting as keyof typeof notificationSettings] ? 'enabled' : 'disabled'}`);
  };

  return (
    <GlassCard>
      <GlassCardBody>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
            </div>
            <button
              onClick={() => handleNotificationToggle('emailNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                notificationSettings.emailNotifications ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via SMS</p>
            </div>
            <button
              onClick={() => handleNotificationToggle('smsNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                notificationSettings.smsNotifications ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  notificationSettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Notification Types</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.electionReminders}
                  onChange={() => handleNotificationToggle('electionReminders')}
                  className="rounded border-gray-200 dark:border-gray-700 text-primary-600 focus:ring-primary-500 dark:bg-gray-800"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Election reminders</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.votingConfirmations}
                  onChange={() => handleNotificationToggle('votingConfirmations')}
                  className="rounded border-gray-200 dark:border-gray-700 text-primary-600 focus:ring-primary-500 dark:bg-gray-800"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Voting confirmations</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.resultsAnnouncements}
                  onChange={() => handleNotificationToggle('resultsAnnouncements')}
                  className="rounded border-gray-200 dark:border-gray-700 text-primary-600 focus:ring-primary-500 dark:bg-gray-800"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Results announcements</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings.securityAlerts}
                  onChange={() => handleNotificationToggle('securityAlerts')}
                  className="rounded border-gray-200 dark:border-gray-700 text-primary-600 focus:ring-primary-500 dark:bg-gray-800"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Security alerts</span>
              </label>
            </div>
          </div>
        </div>
      </GlassCardBody>
    </GlassCard>
  );
};

export default NotificationSettings; 