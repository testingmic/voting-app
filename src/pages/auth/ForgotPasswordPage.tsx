import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard, { GlassCardBody } from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import apiService from '../../services/api';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    
    try {
      await apiService.forgotPassword(email);
      setEmailSent(true);
      toast.success('Password reset email sent successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    
    try {
      await apiService.forgotPassword(email);
      toast.success('Reset email sent again!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <GlassCard className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 shadow-2xl">
          <GlassCardBody className="p-8">
            {!emailSent ? (
              <>
                <div className="text-center mb-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Forgot Password?
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    No worries! Enter your email and we'll send you reset instructions.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  >
                    Send Reset Instructions
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Link>
                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium mb-1">Need help?</p>
                      <p>If you're having trouble accessing your account, contact our support team at support@votingapp.com</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Check Your Email
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We've sent password reset instructions to <span className="font-medium text-gray-900 dark:text-white">{email}</span>
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={handleResendEmail}
                    loading={loading}
                    variant="outline"
                    className="w-full border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30"
                  >
                    Resend Email
                  </Button>

                  <Button
                    onClick={() => setEmailSent(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Use Different Email
                  </Button>

                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Link>
                </div>

                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <p className="font-medium text-gray-900 dark:text-white">Didn't receive the email?</p>
                    <ul className="space-y-1 text-left">
                      <li>• Check your spam folder</li>
                      <li>• Make sure you entered the correct email address</li>
                      <li>• Wait a few minutes before requesting another email</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </GlassCardBody>
        </GlassCard>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 