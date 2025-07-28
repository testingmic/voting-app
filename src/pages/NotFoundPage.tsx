import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  FileText, 
  HelpCircle,
  ExternalLink,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
import GlassCard, { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const popularPages = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, description: 'Main dashboard' },
    { name: 'Elections', href: '/elections', icon: Search, description: 'Manage elections' },
    { name: 'Documentation', href: '/docs', icon: FileText, description: 'Help & guides' },
    { name: 'System Status', href: '/status', icon: Clock, description: 'Service status' }
  ];

  const helpResources = [
    {
      title: 'Getting Started',
      description: 'Learn how to create your first election',
      href: '/docs',
      icon: FileText
    },
    {
      title: 'Contact Support',
      description: 'Get help from our team',
      href: '/security-privacy',
      icon: HelpCircle
    },
    {
      title: 'System Status',
      description: 'Check if there are any issues',
      href: '/status',
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-gray-900 dark:text-white opacity-10">
              404
            </h1>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" onClick={() => navigate('/dashboard')}>
                <Home className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularPages.map((page) => {
                const Icon = page.icon;
                return (
                  <GlassCard key={page.name} className="hover:scale-105 transition-transform duration-200">
                    <GlassCardBody className="flex flex-col items-center justify-center">
                      <button
                        onClick={() => navigate(page.href)}
                        className="w-full text-left group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                              {page.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {page.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    </GlassCardBody>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Help Resources */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Need Help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {helpResources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <GlassCard key={resource.title} className="hover:shadow-lg transition-shadow duration-200">
                    <GlassCardBody className="p-2">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            {resource.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {resource.description}
                          </p>
                          <button
                            onClick={() => navigate(resource.href)}
                            className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-200"
                          >
                            Learn More
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </GlassCardBody>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mb-8">
            <GlassCard>
              <GlassCardBody className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Can't find what you're looking for?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try searching our documentation or contact our support team for assistance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/docs')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Browse Documentation
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/security-privacy')}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </GlassCardBody>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 