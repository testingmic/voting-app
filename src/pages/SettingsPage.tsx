import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Building, 
  Shield, 
  Bell, 
  Palette,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Monitor
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1234567890'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: user?.twoFactorEnabled || false,
    deviceFingerprinting: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [organizationSettings, setOrganizationSettings] = useState({
    name: 'Sample School',
    type: 'school',
    primaryColor: '#3b82f6',
    logo: '',
    customBranding: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'organization', name: 'Organization', icon: Building },
    { id: 'appearance', name: 'Appearance', icon: Palette }
  ];

  const handleProfileSave = async () => {
    setLoading(true);
    try {
      await updateUser(profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSecurityToggle = (setting: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleNotificationToggle = (setting: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <img
                      className="h-20 w-20 rounded-full object-cover"
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff`}
                      alt={user?.name}
                    />
                    <div>
                      <Button variant="outline">Change Photo</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <Input
                      label="Phone Number"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleProfileSave} loading={loading}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <button
                        onClick={() => handleSecurityToggle('twoFactorEnabled')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          securitySettings.twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200'
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
                        <h3 className="text-sm font-medium text-gray-900">Device Fingerprinting</h3>
                        <p className="text-sm text-gray-500">Track and prevent duplicate voting from same device</p>
                      </div>
                      <button
                        onClick={() => handleSecurityToggle('deviceFingerprinting')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                          securitySettings.deviceFingerprinting ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            securitySettings.deviceFingerprinting ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <Input
                            label="Current Password"
                            type={showPassword ? 'text' : 'password'}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <Input
                          label="New Password"
                          type="password"
                        />
                        <Input
                          label="Confirm New Password"
                          type="password"
                        />
                      </div>
                      <div className="mt-4">
                        <Button>Update Password</Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('emailNotifications')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        securitySettings.emailNotifications ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          securitySettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('smsNotifications')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        securitySettings.smsNotifications ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          securitySettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Notification Types</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-gray-700">Election reminders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-gray-700">Voting confirmations</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-gray-700">Results announcements</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-gray-700">Security alerts</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Organization Settings */}
          {activeTab === 'organization' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Organization Settings</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      {organizationSettings.logo ? (
                        <img src={organizationSettings.logo} alt="Logo" className="w-16 h-16 object-contain" />
                      ) : (
                        <Building className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Button variant="outline">Upload Logo</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Organization Name"
                      value={organizationSettings.name}
                      onChange={(e) => setOrganizationSettings(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type</label>
                      <select
                        value={organizationSettings.type}
                        onChange={(e) => setOrganizationSettings(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="school">School</option>
                        <option value="church">Church</option>
                        <option value="organization">Organization</option>
                      </select>
                    </div>
                    <Input
                      label="Primary Color"
                      type="color"
                      value={organizationSettings.primaryColor}
                      onChange={(e) => setOrganizationSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Custom Branding</h3>
                      <p className="text-sm text-gray-500">Enable custom colors and branding</p>
                    </div>
                    <button
                      onClick={() => setOrganizationSettings(prev => ({ ...prev, customBranding: !prev.customBranding }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        organizationSettings.customBranding ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          organizationSettings.customBranding ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Organization Settings</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Appearance Settings</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border-2 border-primary-500 rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Light</span>
                          <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
                        </div>
                        <div className="h-20 bg-gray-100 rounded"></div>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Dark</span>
                          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="h-20 bg-gray-800 rounded"></div>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Auto</span>
                          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-800 rounded"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Layout</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-2 border-primary-500 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Compact</span>
                          <Monitor className="w-4 h-4 text-primary-600" />
                        </div>
                        <p className="text-xs text-gray-500">Tighter spacing for more content</p>
                      </div>
                      <div className="border-2 border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Comfortable</span>
                          <Smartphone className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500">More breathing room</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Appearance</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 