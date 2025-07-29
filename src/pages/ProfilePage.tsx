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
  Building,
  QrCode,
  Copy,
  Download,
  Key,
  AlertCircle
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody } from '../components/ui/GlassCard';
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
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    timezone: user?.timezone || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Add new state for 2FA setup
  const [twoFactorSetupStep, setTwoFactorSetupStep] = useState<'initial' | 'qr' | 'verify' | 'backup' | 'complete'>('initial');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [qrCodeUrl] = useState('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/VoteFlow:john.doe@example.com?secret=JBSWY3DPEHPK3PXP&issuer=VoteFlow');

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

  // Function to handle 2FA verification
  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    // Simulate API verification
    if (verificationCode === '123456') {
      // Generate backup codes
      const codes = Array.from({ length: 8 }, () => 
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      setBackupCodes(codes);
      setTwoFactorSetupStep('backup');
      toast.success('Code verified successfully');
    } else {
      toast.error('Invalid verification code');
    }
  };

  // Function to copy backup codes
  const handleCopyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    toast.success('Backup codes copied to clipboard');
  };

  // Function to download backup codes
  const handleDownloadBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voteflow-2fa-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Backup codes downloaded');
  };

  // Function to complete 2FA setup
  const handleComplete2FASetup = () => {
    setTwoFactorSetupStep('complete');
    toast.success('Two-factor authentication enabled successfully');
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

  // Update the security tab content
  const renderSecurityTab = () => {
    if (twoFactorSetupStep === 'initial') {
      return (
        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <GlassCardBody>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Security Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark-300/50">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <Button
                  onClick={() => setTwoFactorSetupStep('qr')}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Enable 2FA
                </Button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
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
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={handlePasswordChange}
                    loading={loading}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>
      );
    }

    if (twoFactorSetupStep === 'qr') {
      return (
        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <GlassCardBody>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Set Up Two-Factor Authentication</h3>
              <Button
                variant="outline"
                onClick={() => setTwoFactorSetupStep('initial')}
                className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
              >
                Cancel
              </Button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-dark-400/50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Important Instructions</p>
                    <ol className="mt-2 text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside space-y-1">
                      <li>Download and install an authenticator app (Google Authenticator, Authy, etc.)</li>
                      <li>Scan the QR code with your authenticator app</li>
                      <li>Enter the 6-digit code shown in your app to verify setup</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <div className="bg-white dark:bg-dark-300 p-4 rounded-lg">
                  <img
                    src={qrCodeUrl}
                    alt="2FA QR Code"
                    className="w-48 h-48"
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Can't scan the QR code?</p>
                  <div className="flex items-center justify-center space-x-2">
                    <code className="px-3 py-1 bg-gray-100 dark:bg-dark-400 rounded text-sm font-mono text-gray-900 dark:text-white">
                      JBSWY3DPEHPK3PXP
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText('JBSWY3DPEHPK3PXP');
                        toast.success('Secret key copied to clipboard');
                      }}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => setTwoFactorSetupStep('verify')}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                >
                  Continue
                </Button>
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>
      );
    }

    if (twoFactorSetupStep === 'verify') {
      return (
        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <GlassCardBody>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Verify Setup</h3>
              <Button
                variant="outline"
                onClick={() => setTwoFactorSetupStep('qr')}
                className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
              >
                Back
              </Button>
            </div>

            <div className="space-y-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter the 6-digit code from your authenticator app to verify the setup
              </p>

              <div className="flex flex-col items-center space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="w-48 px-4 py-2 text-center text-2xl tracking-widest font-mono rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    placeholder="000000"
                  />
                </div>

                <Button
                  onClick={handleVerifyCode}
                  disabled={verificationCode.length !== 6}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify Code
                </Button>
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>
      );
    }

    if (twoFactorSetupStep === 'backup') {
      return (
        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <GlassCardBody>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Save Backup Codes</h3>
              <Button
                variant="outline"
                onClick={() => setTwoFactorSetupStep('verify')}
                className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
              >
                Back
              </Button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-dark-400/50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Key className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Important</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Save these backup codes in a secure place. You can use them to access your account if you lose your authenticator device.
                      Each code can only be used once.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-300 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, index) => (
                    <code
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-400 rounded text-sm font-mono text-gray-900 dark:text-white text-center"
                    >
                      {code}
                    </code>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleCopyBackupCodes}
                  className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Codes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadBackupCodes}
                  className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleComplete2FASetup}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                >
                  Complete Setup
                </Button>
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>
      );
    }

    // Complete state
    return (
      <GlassCard className="transform hover:scale-105 transition-all duration-300">
        <GlassCardBody>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Two-Factor Authentication Enabled
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Your account is now protected with an additional layer of security
            </p>
            <Button
              onClick={() => setTwoFactorSetupStep('initial')}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
            >
              Done
            </Button>
          </div>
        </GlassCardBody>
      </GlassCard>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <GlassCard className="transform hover:scale-105 transition-all duration-300">
            <GlassCardBody className="text-center">
              <div className="relative inline-block">
                <img
                  className="h-32 w-32 rounded-full object-cover mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-lg"
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff&size=128`}
                  alt={user?.name}
                />
                <button className="absolute bottom-4 right-4 p-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-full hover:from-purple-500 hover:to-purple-600 transition-colors duration-200">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-2">{user?.role === 'admin' ? 'Administrator' : 'Voter'}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">{user?.organization}</p>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
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
                  className="w-full border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {editing ? 'Cancel Edit' : 'Edit Profile'}
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
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                      <textarea
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!editing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-dark-400 disabled:text-gray-500 dark:disabled:text-gray-400"
                      />
                    </div>
                  </div>

                  {editing && (
                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={handleProfileSave}
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

              <GlassCard className="transform hover:scale-105 transition-all duration-300">
                <GlassCardBody>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Account Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Elections Created</div>
                    </div>
                    <div className="text-center p-4 bg-green-50/50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">45</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Votes Cast</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">8</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Candidates Added</div>
                    </div>
                  </div>
                </GlassCardBody>
              </GlassCard>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && renderSecurityTab()}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <GlassCard className="transform hover:scale-105 transition-all duration-300">
              <GlassCardBody>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark-300/50 hover:bg-gray-50/50 dark:hover:bg-dark-400/50 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCardBody>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 