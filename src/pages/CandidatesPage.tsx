import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  User,
  Mail,
  Globe,
  Twitter,
  Linkedin
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Candidate } from '../types';

const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockCandidates: Candidate[] = [
      {
        id: 1,
        name: 'John Smith',
        position: 'Student Council President',
        bio: 'Experienced leader with a passion for student advocacy and community building. Committed to improving campus life and representing student voices.',
        manifesto: 'I believe in creating an inclusive environment where every student feels heard and supported. My focus will be on improving campus facilities, enhancing student services, and fostering a strong sense of community.',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        socialLinks: {
          twitter: 'https://twitter.com/johnsmith',
          linkedin: 'https://linkedin.com/in/johnsmith',
          website: 'https://johnsmith.com'
        },
        electionId: 1,
        voteCount: 245,
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        position: 'Student Council Vice President',
        bio: 'Dedicated to improving student life and campus facilities. Experienced in event planning and student engagement.',
        manifesto: 'My vision is to create memorable student experiences through better events, improved facilities, and stronger student-faculty relationships.',
        photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        socialLinks: {
          twitter: 'https://twitter.com/sarahjohnson',
          linkedin: 'https://linkedin.com/in/sarahjohnson'
        },
        electionId: 1,
        voteCount: 198,
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 3,
        name: 'Mike Davis',
        position: 'Student Council Secretary',
        bio: 'Organized and detail-oriented with excellent communication skills. Committed to transparency and efficient record-keeping.',
        manifesto: 'I will ensure transparent communication between the student body and administration, maintain accurate records, and keep everyone informed about important decisions.',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/mikedavis'
        },
        electionId: 1,
        voteCount: 156,
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 4,
        name: 'Lisa Wilson',
        position: 'Student Council Treasurer',
        bio: 'Financial management expert with a track record of fiscal responsibility. Committed to transparent budgeting and financial planning.',
        manifesto: 'I will ensure responsible management of student funds, transparent budgeting, and strategic financial planning to maximize the impact of our resources.',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        socialLinks: {
          website: 'https://lisawilson.com'
        },
        electionId: 1,
        voteCount: 98,
        createdAt: '2024-01-10T10:00:00Z'
      }
    ];

    setCandidates(mockCandidates);
    setFilteredCandidates(mockCandidates);
    setLoading(false);
  }, []);

  // Filter candidates based on search term and position
  useEffect(() => {
    let filtered = candidates;

    if (searchTerm) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (positionFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.position === positionFilter);
    }

    setFilteredCandidates(filtered);
  }, [candidates, searchTerm, positionFilter]);

  const positions = Array.from(new Set(candidates.map(c => c.position)));

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateModal(true);
  };

  const handleEditCandidate = (candidate: Candidate) => {
    // TODO: Implement edit functionality
    console.log('Edit candidate:', candidate);
  };

  const handleDeleteCandidate = (candidateId: number) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      setCandidates(prev => prev.filter(c => c.id !== candidateId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
            <p className="mt-2 text-gray-600">
              Manage and view all election candidates
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Position Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Positions</option>
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-md transition-shadow duration-200">
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={candidate.photoUrl || `https://ui-avatars.com/api/?name=${candidate.name}&background=3b82f6&color=fff`}
                    alt={candidate.name}
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.position}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleViewCandidate(candidate)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditCandidate(candidate)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCandidate(candidate.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {candidate.bio}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Votes: {candidate.voteCount}</span>
                <span>Election ID: {candidate.electionId}</span>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewCandidate(candidate)}
                >
                  View Profile
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleEditCandidate(candidate)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || positionFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first candidate.'
                }
              </p>
              {!searchTerm && positionFilter === 'all' && (
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Candidate
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Candidate Detail Modal */}
      {showCandidateModal && selectedCandidate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Candidate Profile</h3>
                <button
                  onClick={() => setShowCandidateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="text-center mb-4">
                <img
                  className="h-24 w-24 rounded-full object-cover mx-auto mb-3"
                  src={selectedCandidate.photoUrl || `https://ui-avatars.com/api/?name=${selectedCandidate.name}&background=3b82f6&color=fff`}
                  alt={selectedCandidate.name}
                />
                <h4 className="text-xl font-medium text-gray-900">{selectedCandidate.name}</h4>
                <p className="text-sm text-gray-500">{selectedCandidate.position}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-1">Bio</h5>
                  <p className="text-sm text-gray-600">{selectedCandidate.bio}</p>
                </div>

                {selectedCandidate.manifesto && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-1">Manifesto</h5>
                    <p className="text-sm text-gray-600">{selectedCandidate.manifesto}</p>
                  </div>
                )}

                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Social Links</h5>
                  <div className="flex space-x-2">
                    {selectedCandidate.socialLinks?.twitter && (
                      <a
                        href={selectedCandidate.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {selectedCandidate.socialLinks?.linkedin && (
                      <a
                        href={selectedCandidate.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {selectedCandidate.socialLinks?.website && (
                      <a
                        href={selectedCandidate.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Votes:</span>
                  <span className="font-medium">{selectedCandidate.voteCount}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCandidateModal(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleEditCandidate(selectedCandidate);
                    setShowCandidateModal(false);
                  }}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Candidate Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Candidate</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter candidate name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter position"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter candidate bio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter photo URL"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button>
                    Add Candidate
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage; 