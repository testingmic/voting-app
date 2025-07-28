import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Users,
  Shield,
  Eye,
  EyeOff,
  Copy,
  RefreshCw
} from 'lucide-react';
import GlassCard, { GlassCardHeader, GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';

interface Voter {
  id: string;
  name: string;
  email: string;
  phone: string;
  voterId: string;
  status: 'pending' | 'validated' | 'active' | 'voted';
  validatedAt?: string;
  validatedBy?: string;
  photoUrl?: string;
  idDocument?: string;
}

const VoterValidationPage: React.FC = () => {
  const { id: electionId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [voters, setVoters] = useState<Voter[]>([]);
  const [filteredVoters, setFilteredVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [validating, setValidating] = useState(false);
  const [election, setElection] = useState<any>(null);

  // Load election and voters data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API call for election data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock election data
        const mockElection = {
          id: electionId,
          title: 'Student Council Election 2024',
          status: 'active'
        };
        setElection(mockElection);

        // Mock voters data
        const mockVoters: Voter[] = [
          {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1234567890',
            voterId: 'VOT001234',
            status: 'pending',
            photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            idDocument: 'https://example.com/id-document-1.pdf'
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1234567891',
            voterId: 'VOT001235',
            status: 'validated',
            validatedAt: '2024-01-15T10:30:00Z',
            validatedBy: 'admin@voteflow.com',
            photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
            idDocument: 'https://example.com/id-document-2.pdf'
          },
          {
            id: '3',
            name: 'Michael Brown',
            email: 'michael.brown@email.com',
            phone: '+1234567892',
            voterId: 'VOT001236',
            status: 'active',
            validatedAt: '2024-01-15T11:15:00Z',
            validatedBy: 'admin@voteflow.com',
            photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            idDocument: 'https://example.com/id-document-3.pdf'
          },
          {
            id: '4',
            name: 'Emily Davis',
            email: 'emily.davis@email.com',
            phone: '+1234567893',
            voterId: 'VOT001237',
            status: 'voted',
            validatedAt: '2024-01-15T09:45:00Z',
            validatedBy: 'admin@voteflow.com',
            photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            idDocument: 'https://example.com/id-document-4.pdf'
          }
        ];
        
        setVoters(mockVoters);
        setFilteredVoters(mockVoters);
      } catch (error) {
        toast.error('Failed to load voter data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [electionId]);

  // Filter voters based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredVoters(voters);
      return;
    }

    const filtered = voters.filter(voter =>
      voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.voterId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voter.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVoters(filtered);
  }, [voters, searchTerm]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setSearching(true);
    try {
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Search logic is handled by useEffect above
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setSearching(false);
    }
  };

  const handleValidateVoter = (voter: Voter) => {
    setSelectedVoter(voter);
    setValidationModalOpen(true);
  };

  const confirmValidation = async () => {
    if (!selectedVoter) return;

    setValidating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update voter status
      const updatedVoters = voters.map(voter =>
        voter.id === selectedVoter.id
          ? {
              ...voter,
              status: 'active' as const,
              validatedAt: new Date().toISOString(),
              validatedBy: 'admin@voteflow.com'
            }
          : voter
      );
      
      setVoters(updatedVoters);
      toast.success(`Voter ${selectedVoter.name} validated and activated successfully!`);
      setValidationModalOpen(false);
      setSelectedVoter(null);
    } catch (error) {
      toast.error('Failed to validate voter');
    } finally {
      setValidating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'validated':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <UserCheck className="w-3 h-3 mr-1" />
            Validated
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case 'voted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Voted
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusCounts = () => {
    return {
      pending: voters.filter(v => v.status === 'pending').length,
      validated: voters.filter(v => v.status === 'validated').length,
      active: voters.filter(v => v.status === 'active').length,
      voted: voters.filter(v => v.status === 'voted').length,
      total: voters.length
    };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate(`/elections/${electionId}`)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Election
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Voter Validation</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Validate and activate voter IDs for {election?.title}
            </p>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <GlassCard>
          <GlassCardBody>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{statusCounts.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Voters</div>
            </div>
          </GlassCardBody>
        </GlassCard>
        <GlassCard>
          <GlassCardBody>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{statusCounts.pending}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
            </div>
          </GlassCardBody>
        </GlassCard>
        <GlassCard>
          <GlassCardBody>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{statusCounts.validated}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Validated</div>
            </div>
          </GlassCardBody>
        </GlassCard>
        <GlassCard>
          <GlassCardBody>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{statusCounts.active}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
            </div>
          </GlassCardBody>
        </GlassCard>
        <GlassCard>
          <GlassCardBody>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{statusCounts.voted}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Voted</div>
            </div>
          </GlassCardBody>
        </GlassCard>
      </div>

      {/* Search */}
      <GlassCard className="mb-6">
        <GlassCardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, voter ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>
            </div>
            <Button 
              onClick={handleSearch}
              loading={searching}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
            >
              {searching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {searching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </GlassCardBody>
      </GlassCard>

      {/* Voters List */}
      <div className="space-y-4">
        {filteredVoters.map((voter) => (
          <GlassCard key={voter.id} className="hover:shadow-lg transition-shadow duration-200">
            <GlassCardBody>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={voter.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(voter.name)}&background=6366f1&color=fff`}
                    alt={voter.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{voter.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{voter.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">ID: {voter.voterId}</span>
                      {getStatusBadge(voter.status)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {voter.status === 'pending' && (
                    <Button
                      onClick={() => handleValidateVoter(voter)}
                      className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-500/25"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Validate
                    </Button>
                  )}
                  
                  {voter.status === 'validated' && (
                    <Button
                      onClick={() => handleValidateVoter(voter)}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Activate
                    </Button>
                  )}
                  
                  {(voter.status === 'active' || voter.status === 'voted') && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {voter.validatedAt && `Validated: ${new Date(voter.validatedAt).toLocaleDateString()}`}
                    </span>
                  )}
                </div>
              </div>
            </GlassCardBody>
          </GlassCard>
        ))}
        
        {filteredVoters.length === 0 && (
          <GlassCard>
            <GlassCardBody>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Voters Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm 
                    ? 'No voters match your search criteria. Try a different search term.'
                    : 'No voters have been registered for this election yet.'
                  }
                </p>
              </div>
            </GlassCardBody>
          </GlassCard>
        )}
      </div>

      {/* Validation Modal */}
      {validationModalOpen && selectedVoter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <GlassCard className="w-full max-w-2xl transform transition-all">
            <GlassCardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Validate Voter
                  </h3>
                </div>
                <button
                  onClick={() => setValidationModalOpen(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={selectedVoter.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedVoter.name)}&background=6366f1&color=fff`}
                    alt={selectedVoter.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">{selectedVoter.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedVoter.email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Voter ID: {selectedVoter.voterId}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-dark-300 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Status:</span>
                    {getStatusBadge(selectedVoter.status)}
                  </div>
                  
                  {selectedVoter.idDocument && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">ID Document:</span>
                      <a
                        href={selectedVoter.idDocument}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Document
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      <p className="font-medium">Validation Process:</p>
                      <ul className="mt-1 space-y-1">
                        <li>• Verify the person's identity matches the voter ID</li>
                        <li>• Confirm they are eligible to vote in this election</li>
                        <li>• Activate their account for voting access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setValidationModalOpen(false)}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmValidation}
                  loading={validating}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-500/25"
                >
                  {validating ? 'Validating...' : selectedVoter.status === 'pending' ? 'Validate & Activate' : 'Activate Account'}
                </Button>
              </div>
            </GlassCardBody>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default VoterValidationPage; 