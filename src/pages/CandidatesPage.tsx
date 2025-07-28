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
  Save,
  Eye
} from 'lucide-react';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody } from '../components/ui/GlassCard';
import { Link } from 'react-router-dom';

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
        // This function is no longer needed as modals are removed
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditCandidate = (candidate: Candidate) => {
    // This function is no longer needed as modals are removed
  };

  const handleSaveCandidate = () => {
    // This function is no longer needed as modals are removed
  };

  const handleDeleteCandidate = (candidate: Candidate) => {
    // This function is no longer needed as modals are removed
  };

  const confirmDelete = () => {
    // This function is no longer needed as modals are removed
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
        <Link to="/candidates/add">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25">
            <Plus className="w-5 h-5 mr-2" />
            Add Candidate
          </Button>
        </Link>
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
                  <Link
                    to={`/candidates/${candidate.id}`}
                    className="inline-flex items-center p-2 bg-white/90 dark:bg-dark-200/90 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white dark:hover:bg-dark-200 transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/candidates/${candidate.id}/edit`}
                    className="inline-flex items-center p-2 bg-white/90 dark:bg-dark-200/90 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white dark:hover:bg-dark-200 transition-colors duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDeleteCandidate(candidate)}
                    className="p-2 bg-white/90 dark:bg-dark-200/90 text-red-600 dark:text-red-400 rounded-lg hover:bg-white dark:hover:bg-dark-200 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
      {/* Removed as per edit hint */}

      {/* Delete Confirmation Modal */}
      {/* Removed as per edit hint */}
    </div>
  );
};

export default CandidatesPage; 