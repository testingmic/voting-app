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
  UserX
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { toast } from 'react-hot-toast';

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

  // Mock members data
  const members = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@sampleschool.edu',
      role: 'admin',
      status: 'active',
      joinedAt: '2023-01-15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@sampleschool.edu',
      role: 'admin',
      status: 'active',
      joinedAt: '2023-02-20',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@sampleschool.edu',
      role: 'voter',
      status: 'active',
      joinedAt: '2023-03-10',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Lisa Wilson',
      email: 'lisa.wilson@sampleschool.edu',
      role: 'voter',
      status: 'inactive',
      joinedAt: '2023-01-05',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
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

  const handleMemberAction = (memberId: number, action: string) => {
    toast.success(`${action} action performed for member ${memberId}`);
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      voter: 'bg-blue-100 text-blue-800'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role as keyof typeof colors]}`}>
        {role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status === 'active' ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Organization</h1>
        <p className="mt-2 text-gray-600">
          Manage your organization settings, branding, and members
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Organization Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {orgData.logo ? (
                    <img src={orgData.logo} alt="Logo" className="w-24 h-24 object-contain" />
                  ) : (
                    <Building className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <button className="absolute bottom-4 right-4 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-1">{orgData.name}</h2>
              <p className="text-gray-500 mb-2 capitalize">{orgData.type}</p>
              <p className="text-sm text-gray-400 mb-4">Est. {orgData.founded}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
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
                  className="w-full"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editing ? 'Cancel Edit' : 'Edit Organization'}
                </Button>
              </div>
            </CardBody>
          </Card>
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
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">Organization Information</h3>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Organization Name"
                      value={orgData.name}
                      onChange={(e) => setOrgData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!editing}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type</label>
                      <select
                        value={orgData.type}
                        onChange={(e) => setOrgData(prev => ({ ...prev, type: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50"
                      >
                        <option value="school">School</option>
                        <option value="church">Church</option>
                        <option value="organization">Organization</option>
                      </select>
                    </div>
                    <Input
                      label="Website"
                      value={orgData.website}
                      onChange={(e) => setOrgData(prev => ({ ...prev, website: e.target.value }))}
                      disabled={!editing}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={orgData.email}
                      onChange={(e) => setOrgData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!editing}
                    />
                    <Input
                      label="Phone"
                      value={orgData.phone}
                      onChange={(e) => setOrgData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!editing}
                    />
                    <Input
                      label="Founded Year"
                      value={orgData.founded}
                      onChange={(e) => setOrgData(prev => ({ ...prev, founded: e.target.value }))}
                      disabled={!editing}
                    />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        rows={2}
                        value={orgData.address}
                        onChange={(e) => setOrgData(prev => ({ ...prev, address: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={orgData.description}
                        onChange={(e) => setOrgData(prev => ({ ...prev, description: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  {editing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={handleSave} loading={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">Organization Statistics</h3>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-3`}>
                            <Icon className={`w-6 h-6 ${stat.color}`} />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Organization Members</h3>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center space-x-4">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={member.avatar}
                            alt={member.name}
                          />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-500">{member.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {getRoleBadge(member.role)}
                              {getStatusBadge(member.status)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">
                            Joined {new Date(member.joinedAt).toLocaleDateString()}
                          </span>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">Branding & Appearance</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        {orgData.logo ? (
                          <img src={orgData.logo} alt="Logo" className="w-16 h-16 object-contain" />
                        ) : (
                          <Building className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <Button variant="outline">Upload Logo</Button>
                        <p className="text-sm text-gray-500 mt-1">Recommended: 256x256px PNG or JPG</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={orgData.primaryColor}
                            onChange={(e) => setOrgData(prev => ({ ...prev, primaryColor: e.target.value }))}
                            className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                          />
                          <span className="text-sm text-gray-600">{orgData.primaryColor}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Custom Branding</h4>
                          <p className="text-sm text-gray-500">Enable custom colors and branding</p>
                        </div>
                        <button
                          onClick={() => setOrgData(prev => ({ ...prev, customBranding: !prev.customBranding }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            orgData.customBranding ? 'bg-primary-600' : 'bg-gray-200'
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

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Preview</h4>
                      <div className="p-4 border border-gray-200 rounded-lg bg-white">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: orgData.primaryColor }}
                          >
                            <Building className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{orgData.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">Organization Settings</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Public Profile</h4>
                        <p className="text-sm text-gray-500">Allow public access to organization information</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Member Invitations</h4>
                        <p className="text-sm text-gray-500">Allow members to invite new users</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Send email notifications for organization events</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                      </button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Danger Zone</h4>
                      <div className="space-y-3">
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Organization
                        </Button>
                        <p className="text-sm text-gray-500">
                          Once you delete an organization, there is no going back. Please be certain.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage; 