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
  AlertCircle,
  Timer,
  UserCheck,
  Award,
  BarChart2,
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
  Hourglass,
  Star
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody as CardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  // Mock data
  const stats = {
    totalElections: 12,
    activeElections: 3,
    totalVoters: 1247,
    totalVotes: 856,
    upcomingElections: 2,
    completedElections: 7,
    averageTurnout: 78,
    totalCandidates: 45,
    recentVotes: 124,
    ongoingPositions: 8
  };

  const recentElections = [
    {
      id: 1,
      title: 'Student Council Election 2024',
      status: 'active',
      endDate: '2024-02-15',
      totalVotes: 234,
      totalVoters: 450,
      progress: 52
    },
    {
      id: 2,
      title: 'Department Representatives',
      status: 'upcoming',
      startDate: '2024-02-20',
      totalVoters: 300,
      progress: 0
    },
    {
      id: 3,
      title: 'Sports Committee Selection',
      status: 'completed',
      endDate: '2024-01-30',
      totalVotes: 289,
      totalVoters: 300,
      progress: 96
    },
    {
      id: 4,
      title: 'Department of Computer Science Election',
      status: 'draft',
      endDate: '2024-01-30',
      totalVotes: 250,
      totalVoters: 300,
      progress: 85
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'Student Council Election Ends',
      date: '2024-02-15 17:00',
      type: 'end'
    },
    {
      title: 'Department Representatives Starts',
      date: '2024-02-20 09:00',
      type: 'start'
    },
    {
      title: 'Candidate Registration Deadline',
      date: '2024-02-18 23:59',
      type: 'deadline'
    }
  ];

  const topPositions = [
    {
      position: 'President',
      totalVotes: 450,
      candidates: 5,
      trend: 'up'
    },
    {
      position: 'Vice President',
      totalVotes: 425,
      candidates: 4,
      trend: 'up'
    },
    {
      position: 'Secretary',
      totalVotes: 380,
      candidates: 3,
      trend: 'down'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Election Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Monitor and manage your voting activities</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <CardBody>
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg shadow-lg">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Elections</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeElections}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  Live Now
                </p>
              </div>
            </div>
          </CardBody>
        </GlassCard>

        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <CardBody>
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg shadow-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Votes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.recentVotes}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  Last 24h
                </p>
              </div>
            </div>
          </CardBody>
        </GlassCard>

        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <CardBody>
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Positions Open</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.ongoingPositions}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Active Races
                </p>
              </div>
            </div>
          </CardBody>
        </GlassCard>

        <GlassCard className="transform hover:scale-105 transition-all duration-300">
          <CardBody>
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg">
                <BarChart2 className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Turnout</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageTurnout}%</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Participation
                </p>
              </div>
            </div>
          </CardBody>
        </GlassCard>
      </div>

      {/* Active Elections and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Elections */}
        <div className="lg:col-span-2 space-y-6">
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

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{election.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        election.status === 'completed'
                          ? 'bg-gray-500 dark:bg-gray-400'
                          : 'bg-gradient-to-r from-purple-500 to-purple-600'
                      }`}
                      style={{ width: `${election.progress}%` }}
                    />
                  </div>
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

        {/* Quick Stats and Upcoming */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Deadlines</h2>
            <GlassCard className="transform hover:scale-105 transition-all duration-300">
              <CardBody>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        deadline.type === 'end'
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                          : deadline.type === 'start'
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {deadline.type === 'end' ? (
                          <Timer className="w-5 h-5" />
                        ) : deadline.type === 'start' ? (
                          <Calendar className="w-5 h-5" />
                        ) : (
                          <Hourglass className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{deadline.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{deadline.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </GlassCard>
          </div>

          {/* Top Positions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Top Positions</h2>
            <GlassCard className="transform hover:scale-105 transition-all duration-300">
              <CardBody>
                <div className="space-y-4">
                  {topPositions.map((position, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                          <Megaphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{position.position}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {position.candidates} candidates
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {position.totalVotes} votes
                        </p>
                        <p className={`text-sm flex items-center justify-end ${
                          position.trend === 'up'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {position.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          Trending
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </GlassCard>
          </div>

          {/* Participation Stats */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <GlassCard variant="success" className="bg-white transform hover:scale-105 transition-all duration-300">
                <CardBody>
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.completedElections}</p>
                    </div>
                  </div>
                </CardBody>
              </GlassCard>

              <GlassCard variant="primary" className="bg-white transform hover:scale-105 transition-all duration-300">
                <CardBody>
                  <div className="flex items-center">
                    <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.upcomingElections}</p>
                    </div>
                  </div>
                </CardBody>
              </GlassCard>

              <GlassCard variant="warning" className="bg-white transform hover:scale-105 transition-all duration-300 col-span-2">
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
    </div>
  );
};

export default DashboardPage; 