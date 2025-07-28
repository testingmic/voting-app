import React, { useState } from 'react';
import { 
  Building, 
  Users, 
  Settings, 
  Palette,
  Shield,
  Bell,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  Plus,
  Trash2,
  Eye,
  Crown,
  UserCheck,
  UserX,
  CreditCard,
  X,
  AlertCircle,
  Home
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { toast } from 'react-hot-toast';
import MembersTab from '../components/organization/MembersTab';

const OrganizationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // Organization data
  const [orgData, setOrgData] = useState({
    name: 'Sample School',
    type: 'school',
    description: 'A leading educational institution committed to excellence in learning and community engagement.',
    website: 'https://sampleschool.edu',
    email: 'info@sampleschool.edu',
    phone: '+1 (555) 123-4567',
    address: '123 Education Street, New York, NY 10001',
    founded: '1995',
    primaryColor: '#3b82f6',
    logo: '',
    customBranding: true
  });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Building },
    { id: 'members', name: 'Members', icon: Users },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];



  // Mock organization stats
  const stats = [
    { label: 'Total Members', value: '1,247', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Active Elections', value: '3', icon: Building, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Total Votes', value: '2,156', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Success Rate', value: '94%', icon: Building, color: 'text-orange-600', bgColor: 'bg-orange-100' }
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEditing(false);
      toast.success('Organization settings updated successfully');
    } catch (error) {
      toast.error('Failed to update organization settings');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Organization</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your organization settings, branding, and members
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Organization Card */}
        <div className="lg:col-span-1">
          <GlassCard className="transform hover:scale-105 transition-all duration-300">
            <GlassCardBody className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gray-100 dark:bg-dark-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  {orgData.logo ? (
                    <img src={orgData.logo} alt="Logo" className="w-24 h-24 object-contain" />
                  ) : (
                    <Building className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <button className="absolute bottom-4 right-4 p-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full hover:from-purple-500 hover:to-purple-600 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{orgData.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-2 capitalize">{orgData.type}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Est. {orgData.founded}</p>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {orgData.website}
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {orgData.email}
                </div>
                <div className="flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {orgData.address}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setEditing(!editing)}
                  className="w-full border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editing ? 'Cancel Edit' : 'Edit Organization'}
                </Button>
              </div>
            </GlassCardBody>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tab Navigation */}
          <div className="mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-1 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <GlassCard className="transform hover:scale-105 transition-all duration-300">
                <GlassCardBody>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Organization Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        value={orgData.name}
                        onChange={(e) => setOrgData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Organization Type
                      </label>
                      <select
                        value={orgData.type}
                        onChange={(e) => setOrgData(prev => ({ ...prev, type: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      >
                        <option value="school">School</option>
                        <option value="church">Church</option>
                        <option value="organization">Organization</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        value={orgData.website}
                        onChange={(e) => setOrgData(prev => ({ ...prev, website: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={orgData.email}
                        onChange={(e) => setOrgData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={orgData.phone}
                        onChange={(e) => setOrgData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Founded Year
                      </label>
                      <input
                        type="text"
                        value={orgData.founded}
                        onChange={(e) => setOrgData(prev => ({ ...prev, founded: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <textarea
                        rows={2}
                        value={orgData.address}
                        onChange={(e) => setOrgData(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={orgData.description}
                        onChange={(e) => setOrgData(prev => ({ ...prev, description: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                  </div>

                  {editing && (
                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={handleSave}
                        loading={loading}
                        className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </GlassCardBody>
              </GlassCard>

              {/* Statistics */}
              <GlassCard className="transform hover:scale-105 transition-all duration-300">
                <GlassCardBody>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Organization Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="text-center p-4 bg-gray-50/50 dark:bg-dark-300/50 rounded-lg">
                          <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} dark:bg-${stat.color.split('-')[1]}-900/30 mb-3`}>
                            <Icon className={`w-6 h-6 ${stat.color} dark:text-${stat.color.split('-')[1]}-400`} />
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCardBody>
              </GlassCard>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && <MembersTab />}

          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <GlassCard className="transform hover:scale-105 transition-all duration-300">
                <GlassCardBody>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Branding & Appearance</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gray-100 dark:bg-dark-300 rounded-lg flex items-center justify-center">
                        {orgData.logo ? (
                          <img src={orgData.logo} alt="Logo" className="w-16 h-16 object-contain" />
                        ) : (
                          <Building className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        )}
                      </div>
                      <div>
                        <Button
                          variant="outline"
                          className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30"
                        >
                          Upload Logo
                        </Button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Recommended: 256x256px PNG or JPG</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Primary Color
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={orgData.primaryColor}
                            onChange={(e) => setOrgData(prev => ({ ...prev, primaryColor: e.target.value }))}
                            className="w-12 h-12 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{orgData.primaryColor}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Custom Branding</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Enable custom colors and branding</p>
                        </div>
                        <button
                          onClick={() => setOrgData(prev => ({ ...prev, customBranding: !prev.customBranding }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            orgData.customBranding ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              orgData.customBranding ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Preview</h4>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark-300/50">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: orgData.primaryColor }}
                          >
                            <Building className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">{orgData.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCardBody>
              </GlassCard>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <GlassCard className="transform hover:scale-105 transition-all duration-300">
                <GlassCardBody>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Organization Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Public Profile</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Allow public access to organization information</p>
                      </div>
                      <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        true ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          true ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Member Invitations</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Allow members to invite new users</p>
                      </div>
                      <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        false ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          false ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Send email notifications for organization events</p>
                      </div>
                      <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                        true ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          true ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Danger Zone</h4>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Organization
                        </Button>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Once you delete an organization, there is no going back. Please be certain.
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCardBody>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage; 