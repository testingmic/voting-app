import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {
  AlertCircle,
  Clock,
  Calendar,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Edit2,
  Lock,
  AlertTriangle,
  ThumbsUp,
  Users,
  Building2,
  Info,
  ListChecks,
  Timer
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';

interface Position {
  id: string;
  title: string;
  description: string;
  maxVotes: number;
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  position: string;
}

interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'completed';
  positions: Position[];
  allowMultipleVotes: boolean;
}

interface VoteSelection {
  positionId: string;
  candidateIds: string[];
}

const VotingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(true);
  const [election, setElection] = useState<Election | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');
  const [error, setError] = useState<{
    type: 'invalid' | 'not-started' | 'ended' | 'paused' | 'already-voted' | null;
    message: string;
  }>({ type: null, message: '' });
  const [currentStep, setCurrentStep] = useState<'intro' | 'voting' | 'review'>('intro');
  const [selectedVotes, setSelectedVotes] = useState<VoteSelection[]>([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  // Initialize FingerprintJS and get device ID
  useEffect(() => {
    const initializeFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDeviceId(result.visitorId);
      } catch (error) {
        console.error('Error initializing fingerprint:', error);
        toast.error('Failed to initialize security check');
      }
    };

    initializeFingerprint();
  }, []);

  // Load and validate election
  useEffect(() => {
    const loadElection = async () => {
      setLoading(true);
      setValidating(true);
      try {
        // Simulate API call to get election data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock election data
        const mockElection: Election = {
          id: id || '1',
          title: 'Student Council Election 2024',
          description: 'Annual election for student council positions',
          startDate: '2024-01-15T09:00:00Z',
          endDate: '2025-12-31T17:00:00Z',
          status: 'active',
          allowMultipleVotes: false,
          positions: [
            {
              id: '1',
              title: 'President',
              description: 'Lead the student council',
              maxVotes: 1,
              candidates: [
                {
                  id: '1',
                  name: 'John Smith',
                  bio: 'Experienced leader with proven track record',
                  photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                  position: 'President'
                },
                {
                  id: '2',
                  name: 'Sarah Johnson',
                  bio: 'Passionate about student welfare',
                  photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
                  position: 'President'
                }
              ]
            },
            {
              id: '2',
              title: 'Vice President',
              description: 'Assist the president and manage committees',
              maxVotes: 1,
              candidates: [
                {
                  id: '3',
                  name: 'Michael Brown',
                  bio: 'Dedicated to improving campus life',
                  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                  position: 'Vice President'
                },
                {
                  id: '4',
                  name: 'Emily Davis',
                  bio: 'Committed to student success',
                  photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                  position: 'Vice President'
                }
              ]
            }
          ]
        };

        setElection(mockElection);

        // Validate election
        const now = new Date();
        const startDate = new Date(mockElection.startDate);
        const endDate = new Date(mockElection.endDate);
        
        console.log('Validation:', {
          now: now.toISOString(),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        });

        if (mockElection.status !== 'active') {
          setError({
            type: 'paused',
            message: 'This election is currently paused. Please check back later.'
          });
          return;
        }

        if (now.getTime() < startDate.getTime()) {
          setError({
            type: 'not-started',
            message: `This election hasn't started yet. It will begin on ${startDate.toLocaleDateString()} at ${startDate.toLocaleTimeString()}.`
          });
          return;
        }

        if (now.getTime() > endDate.getTime()) {
          setError({
            type: 'ended',
            message: 'This election has ended. Thank you for your interest.'
          });
          return;
        }

        // Simulate checking if user has already voted
        const hasVoted = false; // This would be an API call in production
        if (hasVoted && !mockElection.allowMultipleVotes) {
          setError({
            type: 'already-voted',
            message: 'You have already cast your vote in this election.'
          });
          return;
        }

        // Initialize selected votes structure
        setSelectedVotes(
          mockElection.positions.map(position => ({
            positionId: position.id,
            candidateIds: []
          }))
        );

        setError({ type: null, message: '' });
      } catch (error) {
        setError({
          type: 'invalid',
          message: 'This election does not exist or has been removed.'
        });
      } finally {
        setLoading(false);
        setValidating(false);
      }
    };

    if (id && deviceId) {
      loadElection();
    }
  }, [id, deviceId]);

  const handleVoteSelection = (positionId: string, candidateId: string) => {
    setSelectedVotes(prev => prev.map(vote => {
      if (vote.positionId === positionId) {
        const position = election?.positions.find(p => p.id === positionId);
        if (!position) return vote;

        const currentIds = vote.candidateIds;
        const maxVotes = position.maxVotes;

        if (currentIds.includes(candidateId)) {
          // Remove vote if already selected
          return {
            ...vote,
            candidateIds: currentIds.filter(id => id !== candidateId)
          };
        } else if (currentIds.length < maxVotes) {
          // Add vote if under max votes limit
          return {
            ...vote,
            candidateIds: [...currentIds, candidateId]
          };
        }
        
        // Replace last vote if at max votes limit
        return {
          ...vote,
          candidateIds: [...currentIds.slice(0, maxVotes - 1), candidateId]
        };
      }
      return vote;
    }));
  };

  const handleSubmitVotes = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Your votes have been cast successfully!');
      // Redirect to success page or show success state
      setCurrentStep('review');
    } catch (error) {
      toast.error('Failed to submit votes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPositionVoteStatus = (positionId: string) => {
    const position = election?.positions.find(p => p.id === positionId);
    const votes = selectedVotes.find(v => v.positionId === positionId)?.candidateIds.length || 0;
    
    if (!position) return { complete: false, message: '' };
    
    if (votes === 0) {
      return {
        complete: false,
        message: `Select up to ${position.maxVotes} candidate${position.maxVotes > 1 ? 's' : ''}`
      };
    }
    
    if (votes < position.maxVotes) {
      return {
        complete: true,
        message: `Selected ${votes} of ${position.maxVotes} possible votes`
      };
    }
    
    return {
      complete: true,
      message: `All ${position.maxVotes} vote${position.maxVotes > 1 ? 's' : ''} selected`
    };
  };

  const handleNext = () => {
    if (election && currentPositionIndex < election.positions.length - 1) {
      setCurrentPositionIndex(currentPositionIndex + 1);
    } else {
      setCurrentStep('review');
    }
  };

  const handlePrevious = () => {
    if (currentPositionIndex > 0) {
      setCurrentPositionIndex(currentPositionIndex - 1);
    }
  };

  const getProgress = () => {
    if (!election) return 0;
    const totalPositions = election.positions.length;
    return ((currentPositionIndex + 1) / totalPositions) * 100;
  };

  if (loading || validating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {validating ? 'Validating election...' : 'Loading election details...'}
          </p>
        </div>
      </div>
    );
  }

  if (error.type) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        {error.type === 'invalid' && (
          <Card>
            <CardBody>
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Election</h2>
                <p className="text-gray-600 mb-6">{error.message}</p>
                <Button onClick={() => navigate('/')}>
                  Return Home
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {error.type === 'not-started' && (
          <Card>
            <CardBody>
              <div className="text-center">
                <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Election Not Started</h2>
                <p className="text-gray-600 mb-6">{error.message}</p>
                <Button onClick={() => navigate('/')}>
                  Return Later
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {error.type === 'ended' && (
          <Card>
            <CardBody>
              <div className="text-center">
                <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Election Ended</h2>
                <p className="text-gray-600 mb-6">{error.message}</p>
                <Button onClick={() => navigate('/')}>
                  View Results
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {error.type === 'paused' && (
          <Card>
            <CardBody>
              <div className="text-center">
                <Lock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Election Paused</h2>
                <p className="text-gray-600 mb-6">{error.message}</p>
                <Button onClick={() => navigate('/')}>
                  Check Back Later
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {error.type === 'already-voted' && (
          <Card>
            <CardBody>
              <div className="text-center">
                <ThumbsUp className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Already Voted</h2>
                <p className="text-gray-600 mb-6">{error.message}</p>
                <Button onClick={() => navigate('/')}>
                  View Results
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }

  if (!election) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentStep === 'intro' ? (
        <div className="space-y-8">
          {/* Organization & Election Info */}
          <div className="text-center mb-8">
            <Building2 className="w-16 h-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{election.title}</h1>
            <p className="text-lg text-gray-600">{election.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Election Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-medium text-gray-900">Election Details</h2>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Start Date</span>
                    <span className="font-medium">{new Date(election.startDate).toLocaleDateString()} {new Date(election.startDate).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">End Date</span>
                    <span className="font-medium">{new Date(election.endDate).toLocaleDateString()} {new Date(election.endDate).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      election.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Multiple Votes</span>
                    <span className="font-medium">{election.allowMultipleVotes ? 'Allowed' : 'Not Allowed'}</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Positions Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <ListChecks className="w-5 h-5 text-primary-600" />
                  <h2 className="text-xl font-medium text-gray-900">Positions</h2>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {election.positions.map((position, index) => (
                    <div key={position.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{position.title}</h3>
                        <p className="text-xs text-gray-500">{position.candidates.length} candidates</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Important Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h2 className="text-xl font-medium text-gray-900">Important Information</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Timer className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Time Limit</h3>
                    <p className="text-sm text-gray-600">Once you begin voting, please complete your selections for all positions. Your session may expire if left inactive for too long.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ListChecks className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Selection Rules</h3>
                    <p className="text-sm text-gray-600">You must select candidates for all positions. Each position may have different voting limits.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Vote Confirmation</h3>
                    <p className="text-sm text-gray-600">You will have a chance to review all your selections before final submission. {!election.allowMultipleVotes && "Once submitted, you cannot change your votes or vote again."}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Begin Voting Button */}
          <div className="flex items-center justify-between pt-6">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit
            </Button>
            <Button onClick={() => setCurrentStep('voting')} size="lg">
              Begin Voting
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      ) : currentStep === 'voting' ? (
        <>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{election.title}</h1>
            <p className="text-gray-600">{election.description}</p>
            
            <div className="mt-4 flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Clock className="w-4 h-4 mr-1" />
                Ends {new Date(election.endDate).toLocaleDateString()}
              </span>
              {election.allowMultipleVotes && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Multiple votes allowed
                </span>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Position {currentPositionIndex + 1} of {election.positions.length}</span>
              <span>{Math.round(getProgress())}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary-600 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>

          {/* Current Position */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {election.positions[currentPositionIndex].title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {election.positions[currentPositionIndex].description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      getPositionVoteStatus(election.positions[currentPositionIndex].id).complete
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}>
                      {getPositionVoteStatus(election.positions[currentPositionIndex].id).message}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {election.positions[currentPositionIndex].candidates.map((candidate) => {
                    const selectedIds = selectedVotes.find(
                      v => v.positionId === election.positions[currentPositionIndex].id
                    )?.candidateIds || [];
                    const isSelected = selectedIds.includes(candidate.id);
                    
                    return (
                      <button
                        key={candidate.id}
                        onClick={() => handleVoteSelection(
                          election.positions[currentPositionIndex].id,
                          candidate.id
                        )}
                        className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1 text-left">
                          <h3 className="text-lg font-medium text-gray-900">
                            {candidate.name}
                            {isSelected && (
                              <CheckCircle className="w-5 h-5 text-primary-600 inline ml-2" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">{candidate.bio}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={currentPositionIndex === 0 ? () => navigate('/') : handlePrevious}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentPositionIndex === 0 ? 'Exit' : 'Previous Position'}
            </Button>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Position {currentPositionIndex + 1} of {election.positions.length}
              </div>
              <Button
                onClick={handleNext}
                disabled={!getPositionVoteStatus(election.positions[currentPositionIndex].id).complete}
              >
                {currentPositionIndex === election.positions.length - 1 ? (
                  <>
                    Review Votes
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next Position
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Review Step */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-900">Review Your Votes</h2>
              <p className="text-sm text-gray-600">
                Please review your selections carefully before submitting.
              </p>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {election.positions.map((position) => {
                  const selectedIds = selectedVotes.find(v => v.positionId === position.id)?.candidateIds || [];
                  const selectedCandidates = position.candidates.filter(c => selectedIds.includes(c.id));
                  
                  return (
                    <div key={position.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">{position.title}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentStep('voting')}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      
                      {selectedCandidates.length > 0 ? (
                        <div className="space-y-3">
                          {selectedCandidates.map((candidate) => (
                            <div
                              key={candidate.id}
                              className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
                            >
                              <img
                                src={candidate.photoUrl}
                                alt={candidate.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{candidate.name}</p>
                                <p className="text-sm text-gray-600">{candidate.bio}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No candidate selected</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          {/* Submit */}
          <div className="mt-8 flex items-center justify-between">
            <Button variant="outline" onClick={() => setCurrentStep('voting')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Voting
            </Button>
            <Button
              onClick={handleSubmitVotes}
              loading={loading}
              disabled={selectedVotes.every(vote => vote.candidateIds.length === 0)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Votes
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VotingPage; 