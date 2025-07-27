import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Activity,
  Edit,
  Camera,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  MapPin,
  Building
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1234567890',
    bio: 'Experienced administrator with a passion for transparent and secure voting systems.',
    location: 'New York, NY',
    timezone: 'America/New_York'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'activity', name: 'Activity', icon: Activity }
  ];

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'election_created',
      title: 'Created Student Council Election 2024',
      description: 'You created a new election with 4 candidates',
      timestamp: '2024-01-15T10:30:00Z',
      icon: '🗳️'
    },
    {
      id: 2,
      type: 'vote_cast',
      title: 'Vote cast in Church Board Election',
      description: 'You participated in the church board election',
      timestamp: '2024-01-20T14:15:00Z',
      icon: '✅'
    },
    {
      id: 3,
      type: 'candidate_added',
      title: 'Added candidate: Sarah Johnson',
      description: 'You added a new candidate to the election',
      timestamp: '2024-01-12T09:45:00Z',
      icon: '👤'
    },
    {
      id: 4,
      type: 'settings_updated',
      title: 'Updated security settings',
      description: 'You enabled two-factor authentication',
      timestamp: '2024-01-10T16:20:00Z',
      icon: '🔒'
    }
  ];

  const handleProfileSave = async () => {
    setLoading(true);
    try {
      await updateUser(profileData);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      // Simulate password update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'election_created':
        return '🗳️';
      case 'vote_cast':
        return '✅';
      case 'candidate_added':
        return '👤';
      case 'settings_updated':
        return '🔒';
      default:
        return '📝';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 text-gray-600">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="text-center">
              <div className="relative inline-block">
                <img
                  className="h-32 w-32 rounded-full object-cover mx-auto mb-4"
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff&size=128`}
                  alt={user?.name}
                />
                <button className="absolute bottom-4 right-4 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-200">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-500 mb-2">{user?.role === 'admin' ? 'Administrator' : 'Voter'}</p>
              <p className="text-sm text-gray-400 mb-4">{user?.organization}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {user?.email}
                </div>
                <div className="flex items-center justify-center">
                  <Building className="w-4 h-4 mr-2" />
                  {user?.organization}
                </div>
                <div className="flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since {new Date(user?.createdAt || '').toLocaleDateString()}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setEditing(!editing)}
                  className="w-full"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editing ? 'Cancel Edit' : 'Edit Profile'}
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
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!editing}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!editing}
                    />
                    <Input
                      label="Phone Number"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!editing}
                    />
                    <Input
                      label="Location"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!editing}
                    />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {editing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={handleProfileSave} loading={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">Account Statistics</h3>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">Elections Created</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">45</div>
                      <div className="text-sm text-gray-600">Votes Cast</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">8</div>
                      <div className="text-sm text-gray-600">Candidates Added</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user?.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <Button variant="outline" size="sm">
                          {user?.twoFactorEnabled ? 'Disable' : 'Enable'}
                        </Button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Change Password</h4>
                      <div className="space-y-4">
                        <div className="relative">
                          <Input
                            label="Current Password"
                            type={showPassword ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
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
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        />
                        <Input
                          label="Confirm New Password"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                      </div>
                      <div className="mt-4">
                        <Button onClick={handlePasswordChange} loading={loading}>
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 