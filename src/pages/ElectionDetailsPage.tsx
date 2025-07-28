import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Copy,
  ExternalLink,
  Play,
  Pause,
  BarChart3,
  Users,
  Vote,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Monitor,
  Tablet,
  Chrome,
  Globe,
  Eye
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Election, Analytics } from '../types';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

const ElectionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState<Election | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'analytics'>('overview');

  useEffect(() => {
    const loadElectionData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock election data
        const mockElection: Election = {
          id: parseInt(id || '1'),
          title: 'Student Council Election 2024',
          description: 'Annual election for student council positions including President, Vice President, Secretary, and Treasurer.',
          startDate: '2024-01-15T09:00:00Z',
          endDate: '2024-01-17T17:00:00Z',
          status: 'active',
          totalVoters: 1247,
          totalVotes: 987,
          candidates: [
            {
              id: 1,
              name: 'John Smith',
              position: 'President',
              bio: 'Experienced leader with a passion for student advocacy.',
              photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
              voteCount: 245,
              electionId: parseInt(id || '1'),
              createdAt: '2024-01-10T10:00:00Z'
            },
            {
              id: 2,
              name: 'Sarah Johnson',
              position: 'Vice President',
              bio: 'Dedicated to improving student life and campus facilities.',
              photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
              voteCount: 198,
              electionId: parseInt(id || '1'),
              createdAt: '2024-01-10T10:00:00Z'
            }
          ],
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-15T09:00:00Z'
        };

        // Mock analytics data
        const mockAnalytics: Analytics = {
          totalVoters: 1247,
          totalVotes: 987,
          turnoutRate: 78,
          deviceTypes: {
            mobile: 65,
            desktop: 30,
            tablet: 5
          },
          browserStats: {
            chrome: 45,
            firefox: 25,
            safari: 20,
            edge: 10
          },
          votingTimeline: [
            { hour: 9, votes: 45 },
            { hour: 10, votes: 78 },
            { hour: 11, votes: 92 },
            { hour: 12, votes: 156 },
            { hour: 13, votes: 134 },
            { hour: 14, votes: 167 },
            { hour: 15, votes: 145 },
            { hour: 16, votes: 89 },
            { hour: 17, votes: 67 },
            { hour: 18, votes: 34 }
          ],
          results: [
            { candidateId: 1, candidateName: 'John Smith', votes: 245, percentage: 35 },
            { candidateId: 2, candidateName: 'Sarah Johnson', votes: 198, percentage: 28 },
            { candidateId: 3, candidateName: 'Mike Davis', votes: 156, percentage: 22 },
            { candidateId: 4, candidateName: 'Lisa Wilson', votes: 98, percentage: 14 }
          ]
        };

        setElection(mockElection);
        setAnalytics(mockAnalytics);
      } catch (error) {
        toast.error('Failed to load election data');
        navigate('/elections');
      } finally {
        setLoading(false);
      }
    };

    loadElectionData();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus: 'active' | 'paused') => {
    if (!election) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setElection(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success(`Election ${newStatus} successfully`);
    } catch (error) {
      toast.error(`Failed to ${newStatus} election`);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://voteflow.app/vote/${id}`);
    toast.success('Election link copied to clipboard');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!election || !analytics) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Election Not Found</h1>
          <p className="text-gray-600 mb-8">The election you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/elections')}>
            Back to Elections
          </Button>
        </div>
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
              <Button variant="outline" onClick={() => navigate('/elections')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Elections
              </Button>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(election.status)}`}>
                {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">{election.title}</h1>
            <p className="mt-2 text-gray-600">{election.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleCopyLink}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" onClick={() => navigate(`/elections/${election.id}/edit`)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            {election.status === 'active' ? (
              <Button variant="outline" onClick={() => handleStatusChange('paused')}>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            ) : election.status === 'paused' ? (
              <Button onClick={() => handleStatusChange('active')}>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'positions'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Positions & Candidates
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'analytics'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardBody>
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Voters</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalVoters.toLocaleString()}</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Vote className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Votes</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalVotes.toLocaleString()}</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Turnout Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.turnoutRate}%</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Eye className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Time Left</p>
                    <p className="text-2xl font-bold text-gray-900">2d 4h</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Election Details */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Election Details</h3>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Schedule</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Start Date</p>
                        <p className="text-sm text-gray-500">{format(new Date(election.startDate), 'PPP p')}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">End Date</p>
                        <p className="text-sm text-gray-500">{format(new Date(election.endDate), 'PPP p')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Status Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Created</p>
                        <p className="text-sm text-gray-500">{format(new Date(election.createdAt), 'PPP p')}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Last Updated</p>
                        <p className="text-sm text-gray-500">{format(new Date(election.updatedAt), 'PPP p')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full" onClick={handleCopyLink}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Vote Link
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate(`/elections/${election.id}/edit`)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Election
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab('analytics')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Positions & Candidates Tab */}
      {activeTab === 'positions' && (
        <div className="space-y-6">
          {election.candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardBody>
                <div className="flex items-start space-x-4">
                  <img
                    src={candidate.photoUrl}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.position}</p>
                    <p className="text-sm text-gray-600 mt-2">{candidate.bio}</p>
                    <div className="mt-3 flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Votes: {candidate.voteCount}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${(candidate.voteCount / analytics.totalVotes) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {((candidate.voteCount / analytics.totalVotes) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Device Types */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Device Types</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {Object.entries(analytics.deviceTypes).map(([device, percentage]) => (
                  <div key={device} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {device === 'mobile' && <Smartphone className="w-4 h-4" />}
                      {device === 'desktop' && <Monitor className="w-4 h-4" />}
                      {device === 'tablet' && <Tablet className="w-4 h-4" />}
                      <span className="text-sm font-medium text-gray-900 capitalize">{device}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Browser Statistics */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Browser Statistics</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {Object.entries(analytics.browserStats).map(([browser, percentage]) => (
                  <div key={browser} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {browser === 'chrome' && <Chrome className="w-4 h-4" />}
                      {browser !== 'chrome' && <Globe className="w-4 h-4" />}
                      <span className="text-sm font-medium text-gray-900 capitalize">{browser}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Voting Timeline */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Voting Timeline</h3>
            </CardHeader>
            <CardBody>
              <div className="h-64 flex items-end space-x-2">
                {analytics.votingTimeline.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary-600 rounded-t"
                      style={{ 
                        height: `${(data.votes / Math.max(...analytics.votingTimeline.map(d => d.votes))) * 200}px` 
                      }}
                    />
                    <span className="text-xs text-gray-500 mt-2">{data.hour}:00</span>
                    <span className="text-xs font-medium text-gray-900">{data.votes}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Results</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {analytics.results.map((result, index) => (
                  <div key={result.candidateId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{result.candidateName}</h4>
                        <p className="text-sm text-gray-500">{result.votes} votes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12">{result.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ElectionDetailsPage; 