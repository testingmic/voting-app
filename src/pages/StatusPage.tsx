import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Activity, 
  Server, 
  Database, 
  Globe,
  RefreshCw,
  TrendingUp,
  Users,
  Shield,
  ArrowLeft,
  Calendar,
  AlertCircle
} from 'lucide-react';
import GlassCard, { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

interface SystemComponent {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: number;
  responseTime: number;
  lastIncident?: {
    date: string;
    title: string;
    description: string;
    resolved: boolean;
  };
}

interface Incident {
  id: string;
  title: string;
  description: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'minor' | 'major' | 'critical';
  startTime: string;
  endTime?: string;
  affectedComponents: string[];
}

const StatusPage: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock system components
  const [components] = useState<SystemComponent[]>([
    {
      id: 'api',
      name: 'API Services',
      status: 'operational',
      uptime: 99.98,
      responseTime: 45
    },
    {
      id: 'database',
      name: 'Database',
      status: 'operational',
      uptime: 99.99,
      responseTime: 12
    },
    {
      id: 'voting',
      name: 'Voting System',
      status: 'operational',
      uptime: 99.97,
      responseTime: 78
    },
    {
      id: 'cdn',
      name: 'CDN & Assets',
      status: 'operational',
      uptime: 99.99,
      responseTime: 23
    }
  ]);

  // Mock incidents
  const [incidents] = useState<Incident[]>([
    {
      id: '1',
      title: 'Scheduled Maintenance - Database Optimization',
      description: 'We will be performing routine database maintenance to improve performance. This maintenance is scheduled and should not affect voting operations.',
      status: 'resolved',
      severity: 'minor',
      startTime: '2024-01-15T02:00:00Z',
      endTime: '2024-01-15T04:00:00Z',
      affectedComponents: ['database']
    },
    {
      id: '2',
      title: 'Increased API Response Times',
      description: 'We are experiencing higher than normal API response times due to increased traffic. Our team is actively monitoring and optimizing performance.',
      status: 'resolved',
      severity: 'major',
      startTime: '2024-01-10T14:30:00Z',
      endTime: '2024-01-10T16:45:00Z',
      affectedComponents: ['api', 'voting']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 dark:text-green-400';
      case 'degraded':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'outage':
        return 'text-red-600 dark:text-red-400';
      case 'maintenance':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'outage':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'maintenance':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'major':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'minor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'investigating':
        return 'Investigating';
      case 'identified':
        return 'Issue Identified';
      case 'monitoring':
        return 'Monitoring';
      case 'resolved':
        return 'Resolved';
      default:
        return status;
    }
  };

  const refreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const overallStatus = components.every(c => c.status === 'operational') ? 'operational' : 'degraded';
  const averageUptime = components.reduce((sum, c) => sum + c.uptime, 0) / components.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshStatus}
                loading={isRefreshing}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            System Status
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Real-time monitoring of VoteFlow's system health and performance
          </p>
        </div>

        {/* Overall Status */}
        <div className="mb-8">
          <GlassCard>
            <GlassCardBody className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(overallStatus)}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      All Systems {overallStatus === 'operational' ? 'Operational' : 'Experiencing Issues'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Average uptime: {averageUptime.toFixed(2)}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {averageUptime.toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Uptime (30 days)
                  </div>
                </div>
              </div>
            </GlassCardBody>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Components */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              System Components
            </h3>
            <div className="space-y-4">
              {components.map((component) => (
                <GlassCard key={component.id}>
                  <GlassCardBody className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(component.status)}
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {component.name}
                          </h4>
                          <p className={`text-sm font-medium ${getStatusColor(component.status)}`}>
                            {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {component.uptime.toFixed(2)}%
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {component.responseTime}ms
                        </div>
                      </div>
                    </div>
                  </GlassCardBody>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Incidents
            </h3>
            {incidents.length === 0 ? (
              <GlassCard>
                <GlassCardBody className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Recent Incidents
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    All systems are operating normally
                  </p>
                </GlassCardBody>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <GlassCard key={incident.id}>
                    <GlassCardBody className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                            {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            incident.status === 'resolved' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {getStatusText(incident.status)}
                          </span>
                        </div>
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {incident.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {incident.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          Started: {new Date(incident.startTime).toLocaleString()}
                        </span>
                        {incident.endTime && (
                          <span>
                            Resolved: {new Date(incident.endTime).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </GlassCardBody>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard>
              <GlassCardBody className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  99.97%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Overall Uptime
                </div>
              </GlassCardBody>
            </GlassCard>
            
            <GlassCard>
              <GlassCardBody className="p-6 text-center">
                <Activity className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  45ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Response Time
                </div>
              </GlassCardBody>
            </GlassCard>
            
            <GlassCard>
              <GlassCardBody className="p-6 text-center">
                <Users className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  10,000+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Users
                </div>
              </GlassCardBody>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage; 