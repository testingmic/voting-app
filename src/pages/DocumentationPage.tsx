import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Vote,
  BarChart3,
  Settings,
  CreditCard,
  Shield,
  FileText,
  Play,
  Download,
  Search,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  Video,
  Download as DownloadIcon,
  Book,
  Zap,
  Globe,
  Smartphone,
  Lock,
  TrendingUp
} from 'lucide-react';
import GlassCard, { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

interface DocumentationSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  articles: DocumentationArticle[];
}

interface DocumentationArticle {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  steps?: string[];
  tips?: string[];
  related?: string[];
}

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('getting-started');
  const [activeArticle, setActiveArticle] = useState<string>('welcome');
  const [searchQuery, setSearchQuery] = useState('');

  const documentationSections: DocumentationSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      description: 'Learn the basics and set up your account',
      articles: [
        {
          id: 'welcome',
          title: 'Welcome to VoteFlow',
          content: `VoteFlow is a comprehensive voting platform designed to make elections accessible, secure, and transparent. Whether you're running a student council election, a corporate board vote, or a community referendum, VoteFlow provides all the tools you need.

Our platform is built with modern technology and designed for the best user experience, making voting accessible to everyone while maintaining the highest security standards.`,
          tips: [
            'Take a tour of the dashboard to familiarize yourself with the interface',
            'Set up your organization profile before creating your first election',
            'Explore the different subscription plans to choose the right one for your needs'
          ]
        },
        {
          id: 'account-setup',
          title: 'Setting Up Your Account',
          content: `Creating and configuring your VoteFlow account is the first step to running successful elections. Follow these steps to get started.`,
          steps: [
            'Sign up with your email address and create a strong password',
            'Verify your email address by clicking the link sent to your inbox',
            'Complete your profile by adding your name and organization details',
            'Set up two-factor authentication for enhanced security',
            'Configure your notification preferences',
            'Choose your subscription plan based on your needs'
          ],
          tips: [
            'Use a strong, unique password for your account',
            'Enable two-factor authentication for additional security',
            'Keep your contact information up to date'
          ]
        },
        {
          id: 'navigation',
          title: 'Navigating the Platform',
          content: `VoteFlow features an intuitive interface designed to help you find what you need quickly and efficiently.`,
          steps: [
            'Dashboard: Overview of your elections, recent activity, and key metrics',
            'Elections: Create, manage, and monitor all your elections',
            'Candidates: Manage candidate profiles and information',
            'Analytics: View detailed reports and voting statistics',
            'Settings: Configure your account, organization, and preferences',
            'Subscription: Manage your plan and billing information'
          ]
        }
      ]
    },
    {
      id: 'elections',
      title: 'Election Management',
      icon: Vote,
      description: 'Create and manage elections effectively',
      articles: [
        {
          id: 'creating-elections',
          title: 'Creating Your First Election',
          content: `Creating an election in VoteFlow is straightforward with our step-by-step wizard. This guide will walk you through the entire process.`,
          steps: [
            'Navigate to Elections → Create Election',
            'Step 1: Enter basic election details (title, description, dates)',
            'Step 2: Add positions with descriptions and vote limits',
            'Step 3: Add candidates with photos and bios',
            'Step 4: Review all information and activate or save as draft'
          ],
          tips: [
            'Use clear, descriptive titles for your elections',
            'Set realistic start and end dates with sufficient voting time',
            'Add detailed position descriptions to help voters make informed decisions',
            'Upload high-quality candidate photos for better presentation',
            'Save as draft if you need to make changes before going live'
          ]
        },
        {
          id: 'managing-elections',
          title: 'Managing Active Elections',
          content: `Once your election is live, you can monitor its progress and make adjustments as needed.`,
          steps: [
            'Monitor real-time voting progress from the dashboard',
            'View live results and analytics',
            'Pause or resume elections if necessary',
            'Extend voting periods if needed',
            'Close elections when voting ends',
            'Export results and reports'
          ],
          tips: [
            'Regularly check the analytics dashboard for insights',
            'Use the pause feature if you need to investigate issues',
            'Communicate any changes to voters promptly',
            'Backup your results regularly'
          ]
        },
        {
          id: 'election-settings',
          title: 'Election Settings & Configuration',
          content: `Configure your elections with advanced settings to meet your specific requirements.`,
          steps: [
            'Set voting eligibility criteria',
            'Configure notification settings',
            'Set up custom branding',
            'Enable/disable features like comments or candidate profiles',
            'Configure result visibility settings',
            'Set up automated reminders'
          ]
        }
      ]
    },
    {
      id: 'voting',
      title: 'Voting Process',
      icon: Users,
      description: 'Understanding the voting experience',
      articles: [
        {
          id: 'voter-experience',
          title: 'Voter Experience Guide',
          content: `Understanding how voters interact with your elections helps you create better voting experiences.`,
          steps: [
            'Voters receive a unique voting link',
            'They verify their eligibility and election status',
            'Review election information and candidate profiles',
            'Cast votes for each position',
            'Review selections before submission',
            'Receive confirmation of successful voting'
          ],
          tips: [
            'Test the voting process before going live',
            'Provide clear instructions to voters',
            'Ensure the voting interface is mobile-friendly',
            'Set up support channels for voter questions'
          ]
        },
        {
          id: 'voting-security',
          title: 'Voting Security & Integrity',
          content: `VoteFlow implements multiple layers of security to ensure the integrity of your elections.`,
          steps: [
            'Device fingerprinting prevents duplicate voting',
            'IP address logging for audit trails',
            'Real-time fraud detection algorithms',
            'Secure vote encryption and storage',
            'Comprehensive audit logs for all actions',
            'Regular security audits and updates'
          ],
          tips: [
            'Communicate security measures to build voter confidence',
            'Monitor for unusual voting patterns',
            'Keep your platform updated with the latest security patches',
            'Regularly review audit logs for any suspicious activity'
          ]
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      icon: BarChart3,
      description: 'Understanding your election data',
      articles: [
        {
          id: 'understanding-analytics',
          title: 'Understanding Your Analytics',
          content: `VoteFlow provides comprehensive analytics to help you understand voting patterns and make data-driven decisions.`,
          steps: [
            'View real-time voting progress and turnout',
            'Analyze voting patterns by time and demographics',
            'Review device and browser usage statistics',
            'Export detailed reports for external analysis',
            'Compare results across multiple elections',
            'Generate custom reports for stakeholders'
          ],
          tips: [
            'Set up regular reporting schedules',
            'Use analytics to improve future elections',
            'Share relevant insights with stakeholders',
            'Keep historical data for trend analysis'
          ]
        },
        {
          id: 'exporting-reports',
          title: 'Exporting Reports & Data',
          content: `Export your election data in various formats for external analysis and record-keeping.`,
          steps: [
            'Navigate to the Analytics section',
            'Select the election you want to export',
            'Choose your preferred export format (PDF, CSV, Excel)',
            'Select the data range and fields to include',
            'Generate and download the report',
            'Store reports securely for future reference'
          ]
        }
      ]
    },
    {
      id: 'organization',
      title: 'Organization Management',
      icon: Settings,
      description: 'Managing your organization and team',
      articles: [
        {
          id: 'member-management',
          title: 'Managing Team Members',
          content: `Add and manage team members with different permission levels to collaborate effectively.`,
          steps: [
            'Navigate to Organization → Members',
            'Click "Add Member" to invite new team members',
            'Assign appropriate roles and permissions',
            'Set up member profiles with contact information',
            'Configure notification preferences for each member',
            'Monitor member activity and contributions'
          ],
          tips: [
            'Use role-based permissions to maintain security',
            'Regularly review and update member access',
            'Provide training for new team members',
            'Set up clear communication channels'
          ]
        },
        {
          id: 'organization-settings',
          title: 'Organization Settings',
          content: `Configure your organization profile, branding, and preferences to match your identity.`,
          steps: [
            'Update organization information and contact details',
            'Upload your organization logo and branding materials',
            'Configure custom colors and themes',
            'Set up default notification preferences',
            'Configure security and privacy settings',
            'Set up integration with external tools'
          ]
        }
      ]
    },
    {
      id: 'subscription',
      title: 'Subscription & Billing',
      icon: CreditCard,
      description: 'Managing your subscription and payments',
      articles: [
        {
          id: 'subscription-plans',
          title: 'Understanding Subscription Plans',
          content: `VoteFlow offers flexible subscription plans to meet different organization needs and budgets.`,
          steps: [
            'Review the features included in each plan',
            'Compare plan limits and capabilities',
            'Consider your organization size and voting needs',
            'Choose the plan that best fits your requirements',
            'Start with a free trial to test features',
            'Upgrade or downgrade as your needs change'
          ],
          tips: [
            'Start with the free plan to explore features',
            'Monitor your usage to optimize plan selection',
            'Contact sales for custom enterprise solutions',
            'Review your plan regularly as your organization grows'
          ]
        },
        {
          id: 'payment-management',
          title: 'Managing Payments & Billing',
          content: `Securely manage your payment methods and billing information through our integrated payment system.`,
          steps: [
            'Add and verify payment methods',
            'Set up automatic billing for convenience',
            'Review and download invoices',
            'Update billing information as needed',
            'Cancel or modify subscriptions',
            'Contact support for billing questions'
          ]
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      description: 'Understanding security measures',
      articles: [
        {
          id: 'security-features',
          title: 'Security Features Overview',
          content: `VoteFlow implements enterprise-grade security measures to protect your elections and voter data.`,
          steps: [
            'Two-factor authentication for account security',
            'Device fingerprinting to prevent fraud',
            'End-to-end encryption for all data',
            'Regular security audits and updates',
            'Compliance with data protection regulations',
            'Secure hosting and infrastructure'
          ],
          tips: [
            'Enable two-factor authentication on your account',
            'Use strong, unique passwords',
            'Regularly review your account activity',
            'Report any suspicious activity immediately'
          ]
        },
        {
          id: 'data-privacy',
          title: 'Data Privacy & Compliance',
          content: `We take data privacy seriously and ensure compliance with relevant regulations and best practices.`,
          steps: [
            'Review our privacy policy and terms of service',
            'Understand how your data is collected and used',
            'Configure privacy settings for your organization',
            'Implement data retention policies',
            'Ensure compliance with local regulations',
            'Regularly audit data handling practices'
          ]
        }
      ]
    }
  ];

  const getCurrentSection = () => {
    return documentationSections.find(section => section.id === activeSection);
  };

  const getCurrentArticle = () => {
    const section = getCurrentSection();
    return section?.articles.find(article => article.id === activeArticle);
  };

  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button size="sm">
                <Video className="w-4 h-4 mr-2" />
                Video Tutorials
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <GlassCard className="sticky top-8">
              <GlassCardBody className="p-6">
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documentation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {filteredSections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-200 ${
                          activeSection === section.id
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <section.icon className="w-5 h-5" />
                          <div>
                            <div className="font-medium">{section.title}</div>
                            <div className="text-sm opacity-75">{section.description}</div>
                          </div>
                        </div>
                        {activeSection === section.id ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      
                      {activeSection === section.id && (
                        <div className="ml-8 mt-2 space-y-1">
                          {section.articles.map((article) => (
                            <button
                              key={article.id}
                              onClick={() => setActiveArticle(article.id)}
                              className={`w-full text-left p-2 rounded text-sm transition-colors duration-200 ${
                                activeArticle === article.id
                                  ? 'text-purple-600 dark:text-purple-400 font-medium'
                                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                              }`}
                            >
                              {article.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </GlassCardBody>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <GlassCard>
              <GlassCardBody className="p-8">
                {getCurrentArticle() ? (
                  <div>
                    {/* Article Header */}
                    <div className="mb-8">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {getCurrentArticle()?.title}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Last updated: {new Date().toLocaleDateString()}</span>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        {getCurrentArticle()?.content}
                      </p>

                      {/* Steps */}
                      {getCurrentArticle()?.steps && (
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Step-by-Step Guide
                          </h3>
                          <ol className="space-y-3">
                            {getCurrentArticle()?.steps?.map((step, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Tips */}
                      {getCurrentArticle()?.tips && (
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Pro Tips
                          </h3>
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <ul className="space-y-2">
                              {getCurrentArticle()?.tips?.map((tip, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <Zap className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-blue-800 dark:text-blue-200">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Related Articles */}
                      {getCurrentArticle()?.related && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Related Articles
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getCurrentArticle()?.related?.map((related, index) => (
                              <Link
                                key={index}
                                to="#"
                                className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors duration-200"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-700 dark:text-gray-300">{related}</span>
                                  <ExternalLink className="w-4 h-4 text-gray-400" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Article Not Found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      The requested article could not be found. Please try searching for a different topic.
                    </p>
                  </div>
                )}
              </GlassCardBody>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage; 