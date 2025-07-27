import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Vote, 
  Users, 
  UserCheck, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import { Election } from '../types';
import { formatDistanceToNow } from 'date-fns';

const DashboardPage: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockElections: Election[] = [
      {
        id: 1,
        title: 'Student Council Election 2024',
        description: 'Annual election for student council positions',
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
        description: 'Election for church board members',
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
        description: 'Leadership election for community organization',
        startDate: '2024-02-01T08:00:00Z',
        endDate: '2024-02-03T20:00:00Z',
        status: 'upcoming',
        totalVoters: 0,
        totalVotes: 0,
        candidates: [],
        createdAt: '2024-01-25T09:00:00Z',
        updatedAt: '2024-01-25T09:00:00Z'
      }
    ];

    setElections(mockElections);
    setLoading(false);
  }, []);

  const stats = [
    {
      name: 'Active Elections',
      value: elections.filter(e => e.status === 'active').length,
      icon: Vote,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Total Voters',
      value: 1247,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Candidates',
      value: 12,
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Turnout Rate',
      value: '78%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-green-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
      case 'upcoming':
        return <Calendar className="w-4 h-4 text-blue-600" />;
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
      default:
        return 'bg-yellow-100 text-yellow-800';
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's an overview of your voting activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} className="hover:shadow-md transition-shadow duration-200">
            <CardBody>
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent Elections */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Elections</h2>
            <Link
              to="/elections"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View all
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {elections.slice(0, 3).map((election) => (
              <div
                key={election.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(election.status)}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {election.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {election.totalVotes} votes • {election.totalVoters} voters
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(election.status)}`}>
                    {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                  </span>
                  <Link
                    to={`/elections/${election.id}`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <CardBody>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Vote className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Create Election</h3>
              <p className="text-sm text-gray-600 mb-4">
                Set up a new election with candidates and voting rules
              </p>
              <Link
                to="/elections/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100"
              >
                Get Started
              </Link>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <CardBody>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Manage Candidates</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add and manage candidates for your elections
              </p>
              <Link
                to="/candidates"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-green-50 hover:bg-green-100"
              >
                Manage
              </Link>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <CardBody>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">View Analytics</h3>
              <p className="text-sm text-gray-600 mb-4">
                Analyze voting patterns and results
              </p>
              <Link
                to="/analytics"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-50 hover:bg-purple-100"
              >
                View Reports
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage; 