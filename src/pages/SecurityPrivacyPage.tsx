import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Server, 
  Key, 
  Users, 
  Globe,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import GlassCard, { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

interface PolicySection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}

const SecurityPrivacyPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['security']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const policySections: PolicySection[] = [
    {
      id: 'security',
      title: 'Security Measures',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Data Encryption
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All data transmitted to and from VoteFlow is encrypted using industry-standard TLS 1.3 encryption. 
              This ensures that your voting data, personal information, and communications are protected from 
              unauthorized access during transmission.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                End-to-end encryption for all data in transit
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                AES-256 encryption for data at rest
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Secure key management and rotation
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Authentication & Access Control
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We implement multiple layers of authentication and access control to ensure only authorized 
              users can access the system and perform voting operations.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Multi-factor authentication (MFA) support
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Role-based access control (RBAC)
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Session management and timeout controls
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                IP-based access restrictions
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Infrastructure Security
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our infrastructure is built on secure, enterprise-grade cloud platforms with comprehensive 
              security measures and regular security audits.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                SOC 2 Type II compliance
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Regular security penetration testing
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Automated vulnerability scanning
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                DDoS protection and mitigation
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: Eye,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Information We Collect
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We collect only the information necessary to provide our voting services and improve user experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Account Information</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Name and email address</li>
                  <li>• Organization details</li>
                  <li>• Role and permissions</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Voting Data</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Election configurations</li>
                  <li>• Vote records (anonymized)</li>
                  <li>• Analytics and usage data</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              How We Use Your Information
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your information is used solely for providing and improving our voting services.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                To provide and maintain our voting platform
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                To process and validate votes securely
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                To send important notifications about elections
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                To improve our services and user experience
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                To comply with legal obligations
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Data Retention
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We retain your data only for as long as necessary to provide our services and comply with legal requirements.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Important Note</h5>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Vote records are permanently anonymized and cannot be traced back to individual voters. 
                    This ensures the integrity and secrecy of the voting process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'compliance',
      title: 'Compliance & Certifications',
      icon: FileText,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Industry Standards
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              VoteFlow adheres to industry best practices and maintains various certifications to ensure 
              the highest standards of security and privacy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">SOC 2 Type II</h5>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Annual audit covering security, availability, processing integrity, confidentiality, and privacy.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">GDPR Compliance</h5>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Full compliance with European data protection regulations and user rights.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">ISO 27001</h5>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Information security management system certification.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <h5 className="font-medium text-orange-900 dark:text-orange-100 mb-2">CCPA Ready</h5>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  California Consumer Privacy Act compliance and user rights.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Regular Audits
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We undergo regular third-party security audits and assessments to maintain our security posture.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Annual penetration testing by certified security firms
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Quarterly vulnerability assessments
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Continuous security monitoring and threat detection
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Regular compliance reviews and updates
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'incident',
      title: 'Incident Response',
      icon: AlertTriangle,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Security Incident Response
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We have a comprehensive incident response plan to quickly identify, contain, and resolve 
              any security incidents that may occur.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 dark:text-red-400 font-medium text-sm">1</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Detection & Analysis</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    24/7 monitoring systems detect and analyze potential security threats in real-time.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 dark:text-yellow-400 font-medium text-sm">2</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Containment & Eradication</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Immediate containment measures followed by thorough eradication of the threat.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 dark:text-green-400 font-medium text-sm">3</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">Recovery & Notification</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    System recovery and timely notification to affected users and stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Breach Notification
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              In the unlikely event of a data breach, we have clear procedures for notification and response.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Immediate notification to affected users within 72 hours
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Detailed incident report with impact assessment
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Remediation steps and preventive measures
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Compliance with legal notification requirements
              </li>
            </ul>
          </div>
        </div>
      )
    }
  ];

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
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Security & Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your trust is our priority. Learn about our security measures and privacy practices.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {policySections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(section.id);
            
            return (
              <GlassCard key={section.id}>
                <GlassCardBody className="p-6">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-purple-500" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      {section.content}
                    </div>
                  )}
                </GlassCardBody>
              </GlassCard>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="mt-12">
          <GlassCard>
            <GlassCardBody className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Questions About Security or Privacy?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Email Us</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    security@voteflow.com
                  </p>
                </div>
                <div className="text-center">
                  <Phone className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Call Us</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    +1 (555) 123-4567
                  </p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Office</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    123 Security St, Tech City, TC 12345
                  </p>
                </div>
              </div>
            </GlassCardBody>
          </GlassCard>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This policy is effective as of {new Date().toLocaleDateString()}. 
            We may update this policy from time to time and will notify users of any material changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityPrivacyPage; 