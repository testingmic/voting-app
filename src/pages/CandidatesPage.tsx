import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Camera,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Save
} from 'lucide-react';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody } from '../components/ui/GlassCard';

interface Candidate {
  id: number;
  name: string;
  position: string;
  bio: string;
  photoUrl: string;
  email: string;
  phone: string;
  location: string;
  experience: string[];
  education: string[];
  achievements: string[];
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  createdAt: string;
}

const CandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCandidate, setEditedCandidate] = useState<Candidate | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Mock data
  const positions = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Board Member'];
  const candidates: Candidate[] = [
    {
      id: 1,
      name: 'John Smith',
      position: 'President',
      bio: 'Experienced leader with a track record of success in organizational management and strategic planning.',
      photoUrl: 'https://ui-avatars.com/api/?name=John+Smith&background=6366f1&color=fff',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      experience: [
        'CEO at Tech Innovations (2018-Present)',
        'Director of Operations at Global Solutions (2015-2018)',
        'Project Manager at Future Corp (2012-2015)'
      ],
      education: [
        'MBA, Harvard Business School',
        'BS in Business Administration, Yale University'
      ],
      achievements: [
        'Led company to 300% growth in 3 years',
        'Awarded "Leader of the Year" 2021',
        'Published author in Business Weekly'
      ],
      socialLinks: {
        linkedin: 'https://linkedin.com/in/johnsmith',
        twitter: 'https://twitter.com/johnsmith'
      },
      createdAt: '2024-01-15T10:00:00Z'
    },
    // Add more mock candidates here
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        if (editedCandidate) {
          setEditedCandidate({
            ...editedCandidate,
            photoUrl: reader.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setEditedCandidate(candidate);
    setPreviewImage(candidate.photoUrl);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveCandidate = () => {
    // Here you would typically make an API call to save the candidate
    console.log('Saving candidate:', editedCandidate);
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedCandidate(null);
    setEditedCandidate(null);
    setPreviewImage(null);
  };

  const handleDeleteCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Here you would typically make an API call to delete the candidate
    console.log('Deleting candidate:', selectedCandidate?.id);
    setIsDeleteModalOpen(false);
    setSelectedCandidate(null);
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'all' || candidate.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Candidates</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your election candidates</p>
        </div>
        <Button
          onClick={() => {
            setIsEditing(false);
            setSelectedCandidate(null);
            setEditedCandidate(null);
            setPreviewImage(null);
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-200 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
          >
            <option value="all">All Positions</option>
            {positions.map((position) => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <GlassCard
            key={candidate.id}
            className="transform hover:scale-105 transition-all duration-300"
          >
            <GlassCardBody>
              <div className="relative group">
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
                <div className="absolute top-0 right-0 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    onClick={() => handleEditCandidate(candidate)}
                    variant="ghost"
                    size="sm"
                    className="bg-white/90 dark:bg-dark-200/90 text-gray-700 dark:text-gray-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteCandidate(candidate)}
                    variant="ghost"
                    size="sm"
                    className="bg-white/90 dark:bg-dark-200/90 text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{candidate.name}</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">{candidate.position}</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {candidate.email}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {candidate.phone}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {candidate.location}
                </div>
              </div>
              <div className="mt-4 flex justify-center space-x-3">
                {candidate.socialLinks.linkedin && (
                  <a href={candidate.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {candidate.socialLinks.twitter && (
                  <a href={candidate.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </GlassCardBody>
          </GlassCard>
        ))}
      </div>

      {/* Add/Edit Candidate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-200 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isEditing ? 'Edit Candidate' : 'Add New Candidate'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo Upload */}
                <div className="md:col-span-2 flex justify-center">
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

                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editedCandidate?.name || ''}
                      onChange={(e) => setEditedCandidate(prev => prev ? {...prev, name: e.target.value} : null)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Position
                    </label>
                    <select
                      value={editedCandidate?.position || ''}
                      onChange={(e) => setEditedCandidate(prev => prev ? {...prev, position: e.target.value} : null)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    >
                      <option value="">Select Position</option>
                      {positions.map((position) => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editedCandidate?.email || ''}
                      onChange={(e) => setEditedCandidate(prev => prev ? {...prev, email: e.target.value} : null)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editedCandidate?.phone || ''}
                      onChange={(e) => setEditedCandidate(prev => prev ? {...prev, phone: e.target.value} : null)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editedCandidate?.location || ''}
                      onChange={(e) => setEditedCandidate(prev => prev ? {...prev, location: e.target.value} : null)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={editedCandidate?.bio || ''}
                      onChange={(e) => setEditedCandidate(prev => prev ? {...prev, bio: e.target.value} : null)}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Social Links
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Linkedin className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          placeholder="LinkedIn URL"
                          value={editedCandidate?.socialLinks.linkedin || ''}
                          onChange={(e) => setEditedCandidate(prev => prev ? {
                            ...prev,
                            socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                          } : null)}
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Twitter className="w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          placeholder="Twitter URL"
                          value={editedCandidate?.socialLinks.twitter || ''}
                          onChange={(e) => setEditedCandidate(prev => prev ? {
                            ...prev,
                            socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                          } : null)}
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Section */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Experience & Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Experience
                      </label>
                      <div className="space-y-2">
                        {editedCandidate?.experience.map((exp, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={exp}
                              onChange={(e) => {
                                const newExp = [...(editedCandidate?.experience || [])];
                                newExp[index] = e.target.value;
                                setEditedCandidate(prev => prev ? {...prev, experience: newExp} : null);
                              }}
                              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                            />
                            <button
                              onClick={() => {
                                const newExp = editedCandidate?.experience.filter((_, i) => i !== index);
                                setEditedCandidate(prev => prev ? {...prev, experience: newExp} : null);
                              }}
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <Button
                          onClick={() => setEditedCandidate(prev => prev ? {
                            ...prev,
                            experience: [...prev.experience, '']
                          } : null)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          Add Experience
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Achievements
                      </label>
                      <div className="space-y-2">
                        {editedCandidate?.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={achievement}
                              onChange={(e) => {
                                const newAchievements = [...(editedCandidate?.achievements || [])];
                                newAchievements[index] = e.target.value;
                                setEditedCandidate(prev => prev ? {...prev, achievements: newAchievements} : null);
                              }}
                              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                            />
                            <button
                              onClick={() => {
                                const newAchievements = editedCandidate?.achievements.filter((_, i) => i !== index);
                                setEditedCandidate(prev => prev ? {...prev, achievements: newAchievements} : null);
                              }}
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <Button
                          onClick={() => setEditedCandidate(prev => prev ? {
                            ...prev,
                            achievements: [...prev.achievements, '']
                          } : null)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          Add Achievement
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCandidate}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Save Changes' : 'Create Candidate'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-200 rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Delete Candidate</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete {selectedCandidate?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setIsDeleteModalOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage; 