import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Vote, 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  Tablet,
  Chrome,
  Globe,
  Download,
  Calendar,
  Clock
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import { Analytics } from '../types';
import { format } from 'date-fns';

const AnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedElection, setSelectedElection] = useState<number>(1);

  // Mock analytics data
  useEffect(() => {
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

    setAnalytics(mockAnalytics);
    setLoading(false);
  }, []);

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getBrowserIcon = (browser: string) => {
    switch (browser) {
      case 'chrome':
        return <Chrome className="w-4 h-4" />;
      case 'firefox':
        return <Globe className="w-4 h-4" />;
      case 'safari':
        return <Globe className="w-4 h-4" />;
      case 'edge':
        return <Globe className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data available</h3>
          <p className="text-gray-600">Analytics will appear here once voting begins.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Results</h1>
            <p className="mt-2 text-gray-600">
              Detailed insights into voting patterns and results
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedElection}
              onChange={(e) => setSelectedElection(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value={1}>Student Council Election 2024</option>
              <option value={2}>Church Board Election</option>
              <option value={3}>Organization Leadership</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Peak Hour</p>
                <p className="text-2xl font-bold text-gray-900">2-4 PM</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                    {getDeviceIcon(device)}
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
                    {getBrowserIcon(browser)}
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
      </div>

      {/* Voting Timeline */}
      <Card className="mb-8">
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

      {/* Election Results */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Election Results</h3>
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

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Voting Patterns</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average voting time:</span>
                <span className="font-medium">2.5 minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Most active day:</span>
                <span className="font-medium">Wednesday</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Peak voting hour:</span>
                <span className="font-medium">2:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Completion rate:</span>
                <span className="font-medium">94%</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Security Metrics</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Unique devices:</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Suspicious activities:</span>
                <span className="font-medium text-green-600">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duplicate attempts:</span>
                <span className="font-medium text-green-600">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Security score:</span>
                <span className="font-medium text-green-600">98%</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage; 