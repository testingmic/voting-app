import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Link as LinkIcon,
  X,
  AlertTriangle
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Election } from '../types';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'react-hot-toast';
import apiService from '../services/api';

const ElectionsPage: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [filteredElections, setFilteredElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [electionToDelete, setElectionToDelete] = useState<Election | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Load elections from API
  useEffect(() => {
    const loadElections = async () => {
      try {
        setLoading(true);
        const response = await apiService.getElections();
        if (response.success && response.data && response.data.length > 0) {
          setElections(response.data);
          setFilteredElections(response.data);
        } else {
          // No elections found or empty response
          setElections([]);
          setFilteredElections([]);
        }
      } catch (error: any) {
        console.error('Failed to load elections:', error);
        setElections([]);
        setFilteredElections([]);
        
        // Fallback to mock data for demonstration
        const mockElections: Election[] = [
          {
            id: 1,
            title: 'Student Council Election 2024',
            description: 'Annual election for student council positions including President, Vice President, Secretary, and Treasurer.',
            startDate: '2024-01-15T09:00:00Z',
            endDate: '2024-12-31T17:00:00Z',
            status: 'active',
            totalVoters: 1247,
            totalVotes: 987,
            candidates: [
              {
                id: 1,
                name: 'John Smith',
                position: 'President',
                bio: 'Experienced leader with proven track record',
                photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                voteCount: 245,
                electionId: 1,
                createdAt: '2024-01-10T10:00:00Z'
              },
              {
                id: 2,
                name: 'Sarah Johnson',
                position: 'President',
                bio: 'Passionate about student welfare',
                photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
                voteCount: 198,
                electionId: 1,
                createdAt: '2024-01-10T10:00:00Z'
              },
              {
                id: 3,
                name: 'Michael Brown',
                position: 'Vice President',
                bio: 'Dedicated to improving campus life',
                photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                voteCount: 156,
                electionId: 1,
                createdAt: '2024-01-10T10:00:00Z'
              },
              {
                id: 4,
                name: 'Emily Davis',
                position: 'Vice President',
                bio: 'Committed to student success',
                photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                voteCount: 134,
                electionId: 1,
                createdAt: '2024-01-10T10:00:00Z'
              }
            ],
            createdAt: '2024-01-10T10:00:00Z',
            updatedAt: '2024-01-15T09:00:00Z'
          },
          {
            id: 2,
            title: 'Church Board Election',
            description: 'Election for church board members to serve for the next two years.',
            startDate: '2024-01-20T10:00:00Z',
            endDate: '2024-01-22T18:00:00Z',
            status: 'completed',
            totalVoters: 856,
            totalVotes: 856,
            candidates: [],
            createdAt: '2024-01-15T14:00:00Z',
            updatedAt: '2024-01-22T18:00:00Z'
          },
          {
            id: 3,
            title: 'Organization Leadership',
            description: 'Leadership election for community organization board positions.',
            startDate: '2024-02-01T08:00:00Z',
            endDate: '2024-02-03T20:00:00Z',
            status: 'upcoming',
            totalVoters: 0,
            totalVotes: 0,
            candidates: [],
            createdAt: '2024-01-25T09:00:00Z',
            updatedAt: '2024-01-25T09:00:00Z'
          },
          {
            id: 4,
            title: 'Class Representative Election',
            description: 'Election for class representatives across all departments.',
            startDate: '2024-01-18T08:00:00Z',
            endDate: '2024-01-19T18:00:00Z',
            status: 'paused',
            totalVoters: 450,
            totalVotes: 320,
            candidates: [],
            createdAt: '2024-01-12T10:00:00Z',
            updatedAt: '2024-01-18T12:00:00Z'
          }
        ];
        setElections(mockElections);
        setFilteredElections(mockElections);
      } finally {
        setLoading(false);
      }
    };

    loadElections();
  }, []);

  // Filter elections based on search term and status
  useEffect(() => {
    let filtered = elections;

    if (searchTerm) {
      filtered = filtered.filter(election =>
        election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        election.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(election => election.status === statusFilter);
    }

    setFilteredElections(filtered);
  }, [elections, searchTerm, statusFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
      case 'upcoming':
        return <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const getTurnoutRate = (election: Election) => {
    if (election.totalVoters === 0) return 0;
    return Math.round((election.totalVotes / election.totalVoters) * 100);
  };

  const handlePauseElection = async (electionId: number) => {
    try {
      // Make API call to pause election
      await apiService.pauseElection(electionId);
      
      // Update local state
      setElections(prev => 
        prev.map(election => 
          election.id === electionId 
            ? { ...election, status: 'paused' as const }
            : election
        )
      );
      toast.success('Election paused successfully');
    } catch (error: any) {
      console.error('Failed to pause election:', error);
      toast.error(error.message || 'Failed to pause election. Please try again.');
    }
  };

  const handleResumeElection = async (electionId: number) => {
    try {
      // Make API call to resume election
      await apiService.resumeElection(electionId);
      
      // Update local state
      setElections(prev => 
        prev.map(election => 
          election.id === electionId 
            ? { ...election, status: 'active' as const }
            : election
        )
      );
      toast.success('Election resumed successfully');
    } catch (error: any) {
      console.error('Failed to resume election:', error);
      toast.error(error.message || 'Failed to resume election. Please try again.');
    }
  };

  const handleDeleteClick = (election: Election) => {
    setElectionToDelete(election);
    setDeleteModalOpen(true);
    setActiveMenu(null);
  };

  const handleDeleteConfirm = async () => {
    if (!electionToDelete) return;
    
    setDeleting(true);
    try {
      // Make API call to delete election
      await apiService.deleteElection(electionToDelete.id);
      
      // Remove election from state
      setElections(prev => prev.filter(e => e.id !== electionToDelete.id));
      toast.success('Election deleted successfully');
      setDeleteModalOpen(false);
      setElectionToDelete(null);
    } catch (error: any) {
      console.error('Failed to delete election:', error);
      toast.error(error.message || 'Failed to delete election. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setElectionToDelete(null);
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Elections</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage and monitor all your voting elections
            </p>
          </div>
          <Link to="/elections/create">
            <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Create Election
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <GlassCard className="mb-6">
        <GlassCardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search elections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </GlassCardBody>
      </GlassCard>

      {/* Elections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredElections.map((election) => (
          <GlassCard key={election.id} className="transition-all duration-300 transform hover:-translate-y-1">
            <GlassCardBody>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(election.status)}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(election.status)}`}>
                    {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                  </span>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === election.id ? null : election.id);
                    }}
                    className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-dark-300"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeMenu === election.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-dark-200 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
                      <Link
                        to={`/elections/${election.id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Eye className="w-4 h-4 mr-3" />
                        View Details
                      </Link>
                      <Link
                        to={`/vote/${election.id}`}
                        target="_blank"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(null);
                        }}
                      >
                        <Users className="w-4 h-4 mr-3" />
                        Preview Vote
                      </Link>
                      <Link
                        to={`/elections/${election.id}/edit`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Edit className="w-4 h-4 mr-3" />
                        Edit Election
                      </Link>
                      {election.status === 'active' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePauseElection(election.id);
                            setActiveMenu(null);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300"
                        >
                          <Pause className="w-4 h-4 mr-3" />
                          Pause Election
                        </button>
                      )}
                      {election.status === 'paused' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResumeElection(election.id);
                            setActiveMenu(null);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300"
                        >
                          <Play className="w-4 h-4 mr-3" />
                          Resume Election
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(`https://voteflow.app/vote/${election.id}`);
                          toast.success('Election link copied to clipboard');
                          setActiveMenu(null);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300"
                      >
                        <LinkIcon className="w-4 h-4 mr-3" />
                        Copy Vote Link
                      </button>
                      <Link
                        to={`/elections/${election.id}/validate-voters`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Users className="w-4 h-4 mr-3" />
                        Voter Validation
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(election);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                      >
                        <Trash2 className="w-4 h-4 mr-3" />
                        Delete Election
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {election.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {election.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Start Date</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(election.startDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">End Date</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(election.endDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Voters</span>
                  <span className="font-medium text-gray-900 dark:text-white">{election.totalVoters}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Turnout</span>
                  <span className="font-medium text-gray-900 dark:text-white">{getTurnoutRate(election)}%</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/elections/${election.id}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30"
                  >
                    View Details
                  </Button>
                </Link>
                
                {election.status === 'active' && (
                  <Button
                    variant="outline"
                    onClick={() => handlePauseElection(election.id)}
                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                )}
                
                {election.status === 'paused' && (
                  <Button
                    variant="outline"
                    onClick={() => handleResumeElection(election.id)}
                    className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/30"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </GlassCardBody>
          </GlassCard>
        ))}
      </div>

      {filteredElections.length === 0 && (
        <GlassCard>
          <GlassCardBody>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Elections Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No elections match your search criteria. Try adjusting your filters.'
                  : 'No elections have been created yet. Get started by creating your first election.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link to="/elections/create">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Election
                  </Button>
                </Link>
              )}
            </div>
          </GlassCardBody>
        </GlassCard>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && electionToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <GlassCard className="w-full max-w-md transform transition-all">
            <GlassCardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Delete Election
                  </h3>
                </div>
                <button
                  onClick={handleDeleteCancel}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Are you sure you want to delete this election? This action cannot be undone.
                </p>

                <div className="bg-gray-50 dark:bg-dark-300 rounded-lg p-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {electionToDelete.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {electionToDelete.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Status:</span>
                      <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(electionToDelete.status)}`}>
                        {electionToDelete.status.charAt(0).toUpperCase() + electionToDelete.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Total Voters:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {electionToDelete.totalVoters}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Total Votes:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {electionToDelete.totalVotes}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Turnout:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">
                        {getTurnoutRate(electionToDelete)}%
                      </span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Created:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {format(new Date(electionToDelete.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-700 dark:text-red-300">
                      <p className="font-medium">Warning:</p>
                      <ul className="mt-1 space-y-1">
                        <li>• All voting data will be permanently deleted</li>
                        <li>• Candidate information will be lost</li>
                        <li>• This action cannot be undone</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleDeleteCancel}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteConfirm}
                  loading={deleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700"
                >
                  {deleting ? 'Deleting...' : 'Delete Election'}
                </Button>
              </div>
            </GlassCardBody>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default ElectionsPage; 