import React, { useState, useEffect } from 'react';
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
  Eye,
  AlertTriangle
} from 'lucide-react';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody } from '../components/ui/GlassCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiService from '../services/api';
import { Candidate } from '../types';

const CandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<Candidate | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Load candidates from API
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setLoading(true);
        const response = await apiService.getCandidates();
        if (response.success && response.data && response.data.length > 0) {
          setCandidates(response.data);
          setError(null);
        } else {
          // No candidates found or empty response
          setCandidates([]);
          setError(null);
        }
      } catch (error: any) {
        console.error('Failed to load candidates:', error);
        setCandidates([]);
        setError('No candidates found');
        
        // Fallback to mock data for demonstration
        const mockCandidates: Candidate[] = [];
        setCandidates(mockCandidates);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

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
    setCandidateToDelete(candidate);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!candidateToDelete) return;

    setDeleting(true);
    try {
      await apiService.deleteCandidate(candidateToDelete.id);
      setCandidates(candidates.filter(c => c.id !== candidateToDelete.id));
      toast.success('Candidate deleted successfully!');
      setDeleteModalOpen(false);
      setCandidateToDelete(null);
    } catch (error: any) {
      console.error('Failed to delete candidate:', error);
      toast.error(error.message || 'Failed to delete candidate');
    } finally {
      setDeleting(false);
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'all' || candidate.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  if (loading && candidates.length === 0) {
    return <div className="text-center py-8">Loading candidates...</div>;
  }

  if (error) {
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
        
        <GlassCard>
          <GlassCardBody>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Candidates Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error === 'No candidates found' 
                  ? 'No candidates have been added yet. Get started by creating your first candidate.'
                  : 'Unable to load candidates at this time. Please try again later.'
                }
              </p>
              <Link to="/candidates/add">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Candidate
                </Button>
              </Link>
            </div>
          </GlassCardBody>
        </GlassCard>
      </div>
    );
  }

  if (candidates.length === 0) {
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
        
        <GlassCard>
          <GlassCardBody>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Candidates Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || selectedPosition !== 'all' 
                  ? 'No candidates match your search criteria. Try adjusting your filters.'
                  : 'No candidates have been added yet. Get started by creating your first candidate.'
                }
              </p>
              {!searchTerm && selectedPosition === 'all' && (
                <Link to="/candidates/add">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Candidate
                  </Button>
                </Link>
              )}
            </div>
          </GlassCardBody>
        </GlassCard>
      </div>
    );
  }

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
            {Array.from(new Set(candidates.map(c => c.position))).map((position) => (
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
                  <MapPin className="w-4 h-4 mr-2" />
                  {candidate.bio.substring(0, 50)}...
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  {candidate.voteCount} votes
                </div>
              </div>
              <div className="mt-4 flex justify-center space-x-3">
                {candidate.socialLinks?.linkedin && (
                  <a href={candidate.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {candidate.socialLinks?.twitter && (
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
      {deleteModalOpen && candidateToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-center items-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to delete candidate "{candidateToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={confirmDelete}
                loading={deleting}
                className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage; 