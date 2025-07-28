import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Award,
  TrendingUp,
  Vote,
  Users,
  Calendar,
  BarChart2,
  Star,
  Edit2,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

interface ElectionPerformance {
  id: number;
  title: string;
  position: string;
  date: string;
  votes: number;
  totalVotes: number;
  rank: number;
  totalCandidates: number;
  status: 'won' | 'lost' | 'ongoing';
}

const CandidateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - replace with API call
  const candidate = {
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
    stats: {
      totalElections: 5,
      totalVotes: 1247,
      averagePosition: 2.1,
      winRate: 60
    },
    electionPerformance: [
      {
        id: 1,
        title: 'Student Council Election 2024',
        position: 'President',
        date: '2024-02-15',
        votes: 234,
        totalVotes: 450,
        rank: 1,
        totalCandidates: 5,
        status: 'won' as const
      },
      {
        id: 2,
        title: 'Department Representatives',
        position: 'Vice President',
        date: '2024-01-20',
        votes: 189,
        totalVotes: 300,
        rank: 2,
        totalCandidates: 4,
        status: 'lost' as const
      },
      {
        id: 3,
        title: 'Sports Committee Selection',
        position: 'Board Member',
        date: '2024-03-01',
        votes: 156,
        totalVotes: 400,
        rank: 3,
        totalCandidates: 8,
        status: 'ongoing' as const
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Candidate Profile</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">View candidate details and performance</p>
        </div>
        <Link to={`/candidates/${id}/edit`}>
          <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="space-y-6">
          {/* Basic Info Card */}
          <GlassCard className="transform hover:scale-105 transition-all duration-300">
            <GlassCardBody>
              <div className="text-center mb-6">
                <img
                  src={candidate.photoUrl}
                  alt={candidate.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{candidate.name}</h2>
                <p className="text-purple-600 dark:text-purple-400 font-medium">{candidate.position}</p>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3" />
                  {candidate.email}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3" />
                  {candidate.phone}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3" />
                  {candidate.location}
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                {candidate.socialLinks.linkedin && (
                  <a
                    href={candidate.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {candidate.socialLinks.twitter && (
                  <a
                    href={candidate.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </GlassCardBody>
          </GlassCard>

          {/* Experience & Education */}
          <GlassCard className="transform hover:scale-105 transition-all duration-300">
            <GlassCardBody>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Experience & Education</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Experience</h4>
                  <ul className="space-y-2">
                    {candidate.experience.map((exp, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-1 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Education</h4>
                  <ul className="space-y-2">
                    {candidate.education.map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-1 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCardBody>
          </GlassCard>

          {/* Achievements */}
          <GlassCard className="transform hover:scale-105 transition-all duration-300">
            <GlassCardBody>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
              <ul className="space-y-3">
                {candidate.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-1 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{achievement}</span>
                  </li>
                ))}
              </ul>
            </GlassCardBody>
          </GlassCard>
        </div>

        {/* Performance Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard className="transform hover:scale-105 transition-all duration-300">
              <GlassCardBody>
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg shadow-lg">
                    <Vote className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Elections</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{candidate.stats.totalElections}</p>
                  </div>
                </div>
              </GlassCardBody>
            </GlassCard>

            <GlassCard className="transform hover:scale-105 transition-all duration-300">
              <GlassCardBody>
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Votes</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{candidate.stats.totalVotes}</p>
                  </div>
                </div>
              </GlassCardBody>
            </GlassCard>

            <GlassCard className="transform hover:scale-105 transition-all duration-300">
              <GlassCardBody>
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg shadow-lg">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Position</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{candidate.stats.averagePosition}</p>
                  </div>
                </div>
              </GlassCardBody>
            </GlassCard>

            <GlassCard className="transform hover:scale-105 transition-all duration-300">
              <GlassCardBody>
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Win Rate</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{candidate.stats.winRate}%</p>
                  </div>
                </div>
              </GlassCardBody>
            </GlassCard>
          </div>

          {/* Election Performance */}
          <GlassCard className="transform">
            <GlassCardBody>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Election Performance</h3>
              <div className="space-y-4">
                {candidate.electionPerformance.map((election) => (
                  <div key={election.id} className="p-4 bg-white dark:bg-dark-300 rounded-lg shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{election.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{election.position}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        election.status === 'won'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : election.status === 'lost'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Votes Received</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {election.votes} / {election.totalVotes}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Position</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {election.rank} of {election.totalCandidates}
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          election.status === 'won'
                            ? 'bg-gradient-to-r from-green-500 to-green-600'
                            : election.status === 'lost'
                            ? 'bg-gradient-to-r from-red-500 to-red-600'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600'
                        }`}
                        style={{ width: `${(election.votes / election.totalVotes) * 100}%` }}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {election.date}
                      </div>
                      <Link
                        to={`/elections/${election.id}`}
                        className="flex items-center text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                      >
                        View Election
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCardBody>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsPage; 