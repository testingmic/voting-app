import React, { useState } from 'react';
import { 
  Bell,
  CheckCircle2,
  Clock,
  Vote,
  Users,
  AlertCircle,
  Search,
  ChevronDown,
  MoreVertical,
  Trash2,
  MailOpen,
  Filter,
  Eye
} from 'lucide-react';
import GlassCard, { GlassCardHeader, GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'election' | 'candidate' | 'system' | 'alert';
  status: 'unread' | 'read';
  timestamp: string;
  link?: string;
}

const NotificationsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'election' | 'candidate' | 'system' | 'alert'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Student Council Election Started',
      message: 'The voting period for Student Council Election 2024 has begun. Monitor the progress in real-time.',
      type: 'election',
      status: 'unread',
      timestamp: '2024-01-15T09:00:00Z',
      link: '/elections/1'
    },
    {
      id: '2',
      title: 'New Candidate Registration',
      message: 'Lisa Wilson has registered as a candidate for the position of Vice President.',
      type: 'candidate',
      status: 'unread',
      timestamp: '2024-01-14T15:30:00Z',
      link: '/candidates/2'
    },
    {
      id: '3',
      title: 'High Voter Turnout Alert',
      message: 'The current election has reached 75% voter turnout. Consider sending reminder notifications to remaining voters.',
      type: 'alert',
      status: 'read',
      timestamp: '2024-01-14T14:20:00Z'
    },
    {
      id: '4',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will be performed on January 20th, 2024, from 02:00 AM to 04:00 AM UTC.',
      type: 'system',
      status: 'read',
      timestamp: '2024-01-14T12:00:00Z'
    },
    {
      id: '5',
      title: 'Election Ending Soon',
      message: 'The Class Representative Election will end in 2 hours. Current turnout is 65%.',
      type: 'election',
      status: 'unread',
      timestamp: '2024-01-14T10:00:00Z',
      link: '/elections/2'
    }
  ]);

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'election':
        return <Vote className="w-5 h-5" />;
      case 'candidate':
        return <Users className="w-5 h-5" />;
      case 'system':
        return <Bell className="w-5 h-5" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'election':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      case 'candidate':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'system':
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
      case 'alert':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, status: 'read' }
          : notification
      )
    );
    toast.success('Notification marked as read');
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success('Notification deleted');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, status: 'read' }))
    );
    toast.success('All notifications marked as read');
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    toast.success('All notifications deleted');
  };

  const filteredNotifications = notifications
    .filter(notification => {
      if (selectedFilter !== 'all') {
        if (notification.status !== selectedFilter) return false;
      }
      if (selectedType !== 'all') {
        if (notification.type !== selectedType) return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          notification.title.toLowerCase().includes(query) ||
          notification.message.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {unreadCount} unread notifications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={!notifications.some(n => n.status === 'unread')}
          >
            <MailOpen className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button
            variant="outline"
            onClick={handleDeleteAll}
            disabled={notifications.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <GlassCard className="mb-6">
        <GlassCardBody>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as any)}
                  className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Types</option>
                  <option value="election">Elections</option>
                  <option value="candidate">Candidates</option>
                  <option value="system">System</option>
                  <option value="alert">Alerts</option>
                </select>
              </div>
            </div>
          )}
        </GlassCardBody>
      </GlassCard>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <GlassCard>
            <GlassCardBody>
              <div className="text-center py-6">
                <Bell className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No notifications</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery
                    ? 'No notifications match your search'
                    : 'You\'re all caught up!'}
                </p>
              </div>
            </GlassCardBody>
          </GlassCard>
        ) : (
          filteredNotifications.map((notification) => (
            <GlassCard key={notification.id}>
              <GlassCardBody>
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          {notification.title}
                          {notification.status === 'unread' && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-400">
                              New
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        <div className="relative group">
                          <button
                            onClick={() => {/* Toggle dropdown */}}
                            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          </button>
                          <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 hidden group-hover:block z-10">
                            {notification.link && (
                              <a
                                href={notification.link}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Eye className="w-4 h-4 mr-3" />
                                View Details
                              </a>
                            )}
                            {notification.status === 'unread' && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <CheckCircle2 className="w-4 h-4 mr-3" />
                                Mark as Read
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(notification.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      {notification.link && (
                        <a
                          href={notification.link}
                          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                        >
                          View Details →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCardBody>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 