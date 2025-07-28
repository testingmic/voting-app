import React, { useState } from 'react';
import GlassCard, { GlassCardBody } from '../components/ui/GlassCard';
import { User, Shield, Bell, Palette } from 'lucide-react';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <GlassCard>
            <GlassCardBody>
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-dark-300/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </GlassCardBody>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 