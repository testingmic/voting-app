import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ElectionsPage from './pages/ElectionsPage';
import CandidatesPage from './pages/CandidatesPage';
import AddCandidatePage from './pages/AddCandidatePage';
import CandidateDetailsPage from './pages/CandidateDetailsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import OrganizationPage from './pages/OrganizationPage';
import CreateElectionPage from './pages/CreateElectionPage';
import EditElectionPage from './pages/EditElectionPage';
import ElectionDetailsPage from './pages/ElectionDetailsPage';
import VotingPage from './pages/VotingPage';
import SubscriptionPage from './pages/SubscriptionPage';
import NotificationsPage from './pages/NotificationsPage';
import './index.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-100 dark:via-dark-200 dark:to-dark-300 transition-colors duration-300">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]"></div>
      <Navbar />
      <main className="relative">{children}</main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <DashboardPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/elections"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ElectionsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/elections/create"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CreateElectionPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/elections/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ElectionDetailsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/elections/:id/edit"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <EditElectionPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidates"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CandidatesPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidates/add"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AddCandidatePage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidates/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CandidateDetailsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidates/:id/edit"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AddCandidatePage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AnalyticsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <SettingsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ProfilePage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organization"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <OrganizationPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <NotificationsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              
              {/* Public Voting Route */}
              <Route path="/vote/:id" element={<VotingPage />} />

              {/* Subscription Route */}
              <Route
                path="/subscription"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <SubscriptionPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                className: 'dark:bg-dark-200 dark:text-white',
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App; 