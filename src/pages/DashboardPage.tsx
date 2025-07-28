import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Users,
  Vote,
  Calendar,
  Clock,
  TrendingUp,
  ChevronRight,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import GlassCard, { GlassCardBody as CardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  // Mock data
  const stats = {
    totalElections: 12,
    activeElections: 3,
    totalVoters: 1247,
    totalVotes: 856,
    upcomingElections: 2,
    completedElections: 7
  };

  const recentElections = [
    {
      id: 1,
      title: 'Student Council Election 2024',
      status: 'active',
      endDate: '2024-02-15',
      totalVotes: 234,
      totalVoters: 450
    },
    {
      id: 2,
      title: 'Department Representatives',
      status: 'upcoming',
      startDate: '2024-02-20',
      totalVoters: 300
    },
    {
      id: 3,
      title: 'Sports Committee Selection',
      status: 'completed',
      endDate: '2024-01-30',
      totalVotes: 289,
      totalVoters: 300
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Here's what's happening with your elections</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <CardBody>
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg shadow-lg">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Elections</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalElections}</p>
              </div>
            </div>
          </CardBody>
        </GlassCard>

        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <CardBody>
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Voters</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVoters}</p>
              </div>
            </div>
          </CardBody>
        </GlassCard>

        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <CardBody>
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Votes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVotes}</p>
              </div>
            </div>
          </CardBody>
        </GlassCard>
      </div>

      {/* Active Elections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Elections</h2>
            <Link to="/elections/create">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25">
                <Plus className="w-4 h-4 mr-2" />
                New Election
              </Button>
            </Link>
          </div>

          {recentElections.map((election) => (
            <GlassCard key={election.id} className="transform hover:scale-105 transition-all duration-300">
              <CardBody>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">{election.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    election.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : election.status === 'upcoming'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {election.status === 'upcoming' ? 'Starts' : 'Ends'}: {election.startDate || election.endDate}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    {election.totalVotes || 0}/{election.totalVoters} votes
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/elections/${election.id}`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-sm"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </CardBody>
            </GlassCard>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Stats</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassCard variant="success" className="transform hover:scale-105 transition-all duration-300">
              <CardBody>
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.activeElections} Elections</p>
                  </div>
                </div>
              </CardBody>
            </GlassCard>

            <GlassCard variant="primary" className="transform hover:scale-105 transition-all duration-300">
              <CardBody>
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.upcomingElections} Elections</p>
                  </div>
                </div>
              </CardBody>
            </GlassCard>

            <GlassCard variant="warning" className="transform hover:scale-105 transition-all duration-300 sm:col-span-2">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Participation</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {Math.round((stats.totalVotes / stats.totalVoters) * 100)}% Turnout
                      </p>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full border-4 border-orange-200 dark:border-orange-900/30 flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                      {Math.round((stats.totalVotes / stats.totalVoters) * 100)}%
                    </span>
                  </div>
                </div>
              </CardBody>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 