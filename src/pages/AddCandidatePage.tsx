import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Award,
  Star,
  Upload,
  Camera,
  Save,
  X,
  Plus,
  Briefcase,
  Search,
  User,
  Check
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import apiService from '../services/api';
import { User as UserType } from '../types';
import toast from 'react-hot-toast';

const AddCandidatePage: React.FC = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [formData, setFormData] = useState({
    full_name: '',
    position: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    experience: [''],
    education: [''],
    achievements: [''],
    socialLinks: {
      linkedin: '',
      twitter: ''
    }
  });

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await apiService.getUsers();
        if (response.status == 'success' && response.data) {
          setUsers(response?.data?.users);
          setFilteredUsers(response?.data?.users);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking inside the dropdown itself
      const target = event.target as Node;
      const dropdownElement = document.querySelector('[data-dropdown="user-dropdown"]');
      
      if (dropdownRef.current && !dropdownRef.current.contains(target) && 
          dropdownElement && !dropdownElement.contains(target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user);
    setFormData(prev => ({
      ...prev,
      full_name: user.name,
      email: user.email,
      phone: user.phone || '',
      position: user.position || '',
      location: user.location || '',
      bio: user.bio || ''
    }));
    setSearchQuery('');
    setShowUserDropdown(false);
  };

  const handleUserClick = (user: UserType, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setTimeout(() => {
      handleUserSelect(user);
    }, 10);
  };

  const updateDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  const handleClearSelection = () => {
    setSelectedUser(null);
    setFormData(prev => ({
      ...prev,
      full_name: '',
      email: '',
      phone: '',
      location: '',
      bio: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const candidateData = {
        name: formData.full_name,
        position: formData.position,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        photoUrl: previewImage || undefined,
        experience: formData.experience.filter(exp => exp.trim() !== ''),
        education: formData.education.filter(edu => edu.trim() !== ''),
        achievements: formData.achievements.filter(achievement => achievement.trim() !== ''),
        socialLinks: {
          linkedin: formData.socialLinks.linkedin,
          twitter: formData.socialLinks.twitter
        },
        userId: selectedUser?.id
      };

      const response = await apiService.createCandidate(candidateData);
      if(response.status == 'success') {
        navigate('/candidates');
      }
    } catch (error) {
      console.log((error as any).message);
    }
  };

  const handleArrayFieldAdd = (field: 'experience' | 'education' | 'achievements') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleArrayFieldRemove = (field: 'experience' | 'education' | 'achievements', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleArrayFieldChange = (
    field: 'experience' | 'education' | 'achievements',
    index: number,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Candidate</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Create a new candidate profile</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Selection */}
        <GlassCard className="transform">
          <GlassCardBody>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Select Existing User</h2>
            <div className="space-y-4">
              {selectedUser ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-900 dark:text-green-100">{selectedUser.name}</h3>
                        <p className="text-sm text-green-700 dark:text-green-300">{selectedUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleClearSelection}
                      >
                        Change User
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search for existing users..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowUserDropdown(true);
                          updateDropdownPosition();
                        }}
                        onFocus={() => {
                          setShowUserDropdown(true);
                          updateDropdownPosition();
                        }}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowUserDropdown(!showUserDropdown);
                        if (!showUserDropdown) {
                          updateDropdownPosition();
                        }
                      }}
                    >
                      Browse Users
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Dropdown positioned with fixed positioning */}
              {showUserDropdown && !selectedUser && createPortal(
                <div 
                  data-dropdown="user-dropdown"
                  className="fixed bg-white dark:bg-dark-300 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-[9999] max-h-60 overflow-y-auto"
                  style={{
                    top: `${dropdownPosition.top}px`,
                    left: `${dropdownPosition.left}px`,
                    width: `${dropdownPosition.width}px`
                  }}
                >
                    {loading ? (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        Loading users...
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No users found
                      </div>
                    ) : (
                      filteredUsers.map((user) => (
                        <button
                          key={user.id}
                          type="button"
                          onClick={(e) => handleUserClick(user, e)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>,
                document.body
              )}
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Select an existing user to pre-fill their information, or continue with manual entry below.</p>
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>

        {/* Photo Upload */}
        <GlassCard className="transform">
          <GlassCardBody>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors duration-200">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>

        {/* Basic Information */}
        <GlassCard className="transform">
          <GlassCardBody>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>

        {/* Experience & Education */}
        <GlassCard className="transform">
          <GlassCardBody>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Experience & Education</h2>
            
            <div className="space-y-6">
              {/* Experience */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Experience
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleArrayFieldAdd('experience')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={exp}
                        onChange={(e) => handleArrayFieldChange('experience', index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                        placeholder="Add experience"
                      />
                      <button
                        type="button"
                        onClick={() => handleArrayFieldRemove('experience', index)}
                        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Education
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleArrayFieldAdd('education')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={edu}
                        onChange={(e) => handleArrayFieldChange('education', index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                        placeholder="Add education"
                      />
                      <button
                        type="button"
                        onClick={() => handleArrayFieldRemove('education', index)}
                        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>

        {/* Achievements */}
        <GlassCard className="transform">
          <GlassCardBody>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Achievements</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleArrayFieldAdd('achievements')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Achievement
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleArrayFieldChange('achievements', index, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    placeholder="Add achievement"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayFieldRemove('achievements', index)}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCardBody>
        </GlassCard>

        {/* Social Links */}
        <GlassCard className="transform">
          <GlassCardBody>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Social Links</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                  }))}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Twitter className="w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  placeholder="Twitter URL"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                  }))}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/candidates')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Candidate
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCandidatePage; 