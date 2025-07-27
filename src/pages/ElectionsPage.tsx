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
  MoreVertical
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Election } from '../types';
import { formatDistanceToNow, format } from 'date-fns';

const ElectionsPage: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [filteredElections, setFilteredElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data for demonstration
  useEffect(() => {
    const mockElections: Election[] = [
      {
        id: 1,
        title: 'Student Council Election 2024',
        description: 'Annual election for student council positions including President, Vice President, Secretary, and Treasurer.',
        startDate: '2024-01-15T09:00:00Z',
        endDate: '2024-01-17T17:00:00Z',
        status: 'active',
        totalVoters: 1247,
        totalVotes: 987,
        candidates: [],
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
    setLoading(false);
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
        return <Clock className="w-4 h-4 text-green-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
      case 'upcoming':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTurnoutRate = (election: Election) => {
    if (election.totalVoters === 0) return 0;
    return Math.round((election.totalVotes / election.totalVoters) * 100);
  };

  const handlePauseElection = (electionId: number) => {
    setElections(prev => 
      prev.map(election => 
        election.id === electionId 
          ? { ...election, status: 'paused' as const }
          : election
      )
    );
  };

  const handleResumeElection = (electionId: number) => {
    setElections(prev => 
      prev.map(election => 
        election.id === electionId 
          ? { ...election, status: 'active' as const }
          : election
      )
    );
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
            <h1 className="text-3xl font-bold text-gray-900">Elections</h1>
            <p className="mt-2 text-gray-600">
              Manage and monitor all your voting elections
            </p>
          </div>
          <Link to="/elections/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Election
            </Button>
          </Link>
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
                  placeholder="Search elections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Elections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredElections.map((election) => (
          <Card key={election.id} className="hover:shadow-md transition-shadow duration-200">
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(election.status)}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(election.status)}`}>
                    {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {election.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {election.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Start Date</span>
                  <span className="font-medium">
                    {format(new Date(election.startDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">End Date</span>
                  <span className="font-medium">
                    {format(new Date(election.endDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Voters</span>
                  <span className="font-medium">{election.totalVoters}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Turnout</span>
                  <span className="font-medium">{getTurnoutRate(election)}%</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/elections/${election.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
                
                {election.status === 'active' && (
                  <Button
                    variant="secondary"
                    onClick={() => handlePauseElection(election.id)}
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                )}
                
                {election.status === 'paused' && (
                  <Button
                    variant="secondary"
                    onClick={() => handleResumeElection(election.id)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredElections.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No elections found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first election.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link to="/elections/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Election
                  </Button>
                </Link>
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ElectionsPage; 