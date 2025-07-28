import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Users, 
  Calendar, 
  FileText,
  Settings,
  Save,
  Play,
  Pause,
  Eye,
  Trash2,
  CheckCircle,
  AlertCircle,
  Edit
} from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
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
  isNew?: boolean;
}

interface ElectionData {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  positions: Position[];
  status: 'draft' | 'active' | 'inactive' | 'paused' | 'completed';
}

const EditElectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [electionData, setElectionData] = useState<ElectionData | null>(null);

  // Mock existing candidates
  const existingCandidates: Candidate[] = [
    {
      id: '1',
      name: 'John Smith',
      bio: 'Experienced leader with a passion for student advocacy.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      bio: 'Dedicated to improving student life and campus facilities.',
      photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Mike Davis',
      bio: 'Organized and detail-oriented with excellent communication skills.',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const steps = [
    { id: 1, name: 'Basic Information', icon: FileText },
    { id: 2, name: 'Positions', icon: Users },
    { id: 3, name: 'Candidates', icon: Users },
    { id: 4, name: 'Review & Update', icon: Settings }
  ];

  // Load election data
  useEffect(() => {
    const loadElectionData = async () => {
      setLoading(true);
      try {
        // Simulate API call to load election data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock election data
        const mockElectionData: ElectionData = {
          id: parseInt(id || '1'),
          title: 'Student Council Election 2024',
          description: 'Annual election for student council positions including President, Vice President, Secretary, and Treasurer.',
          startDate: '2024-01-15T09:00',
          endDate: '2024-01-17T17:00',
          status: 'active',
          positions: [
            {
              id: '1',
              title: 'President',
              description: 'Lead the student council and represent student body',
              maxVotes: 1,
              candidates: [
                {
                  id: '1',
                  name: 'John Smith',
                  bio: 'Experienced leader with a passion for student advocacy.',
                  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                },
                {
                  id: '2',
                  name: 'Sarah Johnson',
                  bio: 'Dedicated to improving student life and campus facilities.',
                  photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
                }
              ]
            },
            {
              id: '2',
              title: 'Vice President',
              description: 'Support the president and manage council activities',
              maxVotes: 1,
              candidates: [
                {
                  id: '3',
                  name: 'Mike Davis',
                  bio: 'Organized and detail-oriented with excellent communication skills.',
                  photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                }
              ]
            }
          ]
        };
        
        setElectionData(mockElectionData);
      } catch (error) {
        toast.error('Failed to load election data');
        navigate('/elections');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadElectionData();
    }
  }, [id, navigate]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveChanges = async () => {
    if (!electionData) return;
    
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Election updated successfully');
      navigate('/elections');
    } catch (error) {
      toast.error('Failed to update election');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: ElectionData['status']) => {
    if (!electionData) return;
    
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setElectionData(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success(`Election ${newStatus} successfully`);
    } catch (error) {
      toast.error(`Failed to ${newStatus} election`);
    } finally {
      setSaving(false);
    }
  };

  const addPosition = () => {
    if (!electionData) return;
    
    const newPosition: Position = {
      id: Date.now().toString(),
      title: '',
      description: '',
      maxVotes: 1,
      candidates: []
    };
    setElectionData(prev => prev ? {
      ...prev,
      positions: [...prev.positions, newPosition]
    } : null);
  };

  const updatePosition = (positionId: string, field: keyof Position, value: any) => {
    if (!electionData) return;
    
    setElectionData(prev => prev ? {
      ...prev,
      positions: prev.positions.map(pos =>
        pos.id === positionId ? { ...pos, [field]: value } : pos
      )
    } : null);
  };

  const removePosition = (positionId: string) => {
    if (!electionData) return;
    
    setElectionData(prev => prev ? {
      ...prev,
      positions: prev.positions.filter(pos => pos.id !== positionId)
    } : null);
  };

  const addCandidateToPosition = (positionId: string, candidate: Candidate) => {
    if (!electionData) return;
    
    setElectionData(prev => prev ? {
      ...prev,
      positions: prev.positions.map(pos =>
        pos.id === positionId
          ? { ...pos, candidates: [...pos.candidates, candidate] }
          : pos
      )
    } : null);
  };

  const removeCandidateFromPosition = (positionId: string, candidateId: string) => {
    if (!electionData) return;
    
    setElectionData(prev => prev ? {
      ...prev,
      positions: prev.positions.map(pos =>
        pos.id === positionId
          ? { ...pos, candidates: pos.candidates.filter(c => c.id !== candidateId) }
          : pos
      )
    } : null);
  };

  const canProceedToNext = () => {
    if (!electionData) return false;
    
    switch (currentStep) {
      case 1:
        return electionData.title && electionData.description && electionData.startDate && electionData.endDate;
      case 2:
        return electionData.positions.length > 0 && electionData.positions.every(pos => pos.title && pos.description);
      case 3:
        return electionData.positions.every(pos => pos.candidates.length > 0);
      default:
        return true;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!electionData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Election Not Found</h1>
          <p className="text-gray-600 mb-8">The election you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/elections')}>
            Back to Elections
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Election</h1>
            <p className="mt-2 text-gray-600">
              Update election details, positions, and candidates
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => navigate('/elections')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Elections
            </Button>
            <Button onClick={() => navigate(`/elections/${electionData.id}`)}>
              <Eye className="w-4 h-4 mr-2" />
              View Election
            </Button>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="mb-6">
        <div className={`p-4 rounded-lg border ${
          electionData.status === 'active' ? 'bg-green-50 border-green-200' :
          electionData.status === 'paused' ? 'bg-yellow-50 border-yellow-200' :
          electionData.status === 'completed' ? 'bg-gray-50 border-gray-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                electionData.status === 'active' ? 'bg-green-100 text-green-800' :
                electionData.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                electionData.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {electionData.status.charAt(0).toUpperCase() + electionData.status.slice(1)}
              </span>
              <span className="ml-3 text-sm text-gray-600">
                {electionData.status === 'active' ? 'Election is currently running' :
                 electionData.status === 'paused' ? 'Election is paused' :
                 electionData.status === 'completed' ? 'Election has ended' :
                 'Election is in draft mode'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {electionData.status === 'active' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('paused')}
                  loading={saving}
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              {electionData.status === 'paused' && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange('active')}
                  loading={saving}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isActive 
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : isCompleted
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardBody>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label="Election Title"
                      value={electionData.title}
                      onChange={(e) => setElectionData(prev => prev ? { ...prev, title: e.target.value } : null)}
                      placeholder="e.g., Student Council Election 2024"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={4}
                      value={electionData.description}
                      onChange={(e) => setElectionData(prev => prev ? { ...prev, description: e.target.value } : null)}
                      placeholder="Describe the purpose and scope of this election..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <Input
                    label="Start Date & Time"
                    type="datetime-local"
                    value={electionData.startDate}
                    onChange={(e) => setElectionData(prev => prev ? { ...prev, startDate: e.target.value } : null)}
                  />
                  <Input
                    label="End Date & Time"
                    type="datetime-local"
                    value={electionData.endDate}
                    onChange={(e) => setElectionData(prev => prev ? { ...prev, endDate: e.target.value } : null)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Positions */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Election Positions</h3>
                <Button onClick={addPosition}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Position
                </Button>
              </div>

              {electionData.positions.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No positions added yet</h3>
                  <p className="text-gray-600 mb-4">Add positions that candidates will run for in this election.</p>
                  <Button onClick={addPosition}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Position
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {electionData.positions.map((position, index) => (
                    <div key={position.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-md font-medium text-gray-900">Position {index + 1}</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removePosition(position.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Position Title"
                          value={position.title}
                          onChange={(e) => updatePosition(position.id, 'title', e.target.value)}
                          placeholder="e.g., President, Vice President"
                        />
                        <Input
                          label="Max Votes per Voter"
                          type="number"
                          min="1"
                          value={position.maxVotes}
                          onChange={(e) => updatePosition(position.id, 'maxVotes', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={position.description}
                          onChange={(e) => updatePosition(position.id, 'description', e.target.value)}
                          placeholder="Describe the responsibilities and requirements for this position..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Candidates */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Add Candidates</h3>
              
              {electionData.positions.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No positions available</h3>
                  <p className="text-gray-600 mb-4">Please add positions first before adding candidates.</p>
                  <Button onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back to Positions
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {electionData.positions.map((position, index) => (
                    <div key={position.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-medium text-gray-900 mb-4">
                        {position.title || `Position ${index + 1}`}
                      </h4>
                      
                      <CandidateSelector
                        position={position}
                        existingCandidates={existingCandidates}
                        onAddCandidate={(candidate) => addCandidateToPosition(position.id, candidate)}
                        onRemoveCandidate={(candidateId) => removeCandidateFromPosition(position.id, candidateId)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review & Update */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Review & Update</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Election Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Title:</span> {electionData.title}</p>
                    <p><span className="font-medium">Description:</span> {electionData.description}</p>
                    <p><span className="font-medium">Start Date:</span> {new Date(electionData.startDate).toLocaleString()}</p>
                    <p><span className="font-medium">End Date:</span> {new Date(electionData.endDate).toLocaleString()}</p>
                    <p><span className="font-medium">Status:</span> {electionData.status}</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Positions & Candidates</h4>
                  <div className="space-y-3">
                    {electionData.positions.map((position, index) => (
                      <div key={position.id} className="border-l-4 border-primary-500 pl-3">
                        <p className="font-medium">{position.title}</p>
                        <p className="text-sm text-gray-600">{position.description}</p>
                        <p className="text-sm text-gray-500">Candidates: {position.candidates.length}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleSaveChanges}
                  loading={saving}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={() => navigate('/elections')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleSaveChanges}
            loading={saving}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          
          {currentStep < steps.length && (
            <Button
              onClick={handleNext}
              disabled={!canProceedToNext()}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Candidate Selector Component (reused from CreateElectionPage)
interface CandidateSelectorProps {
  position: Position;
  existingCandidates: Candidate[];
  onAddCandidate: (candidate: Candidate) => void;
  onRemoveCandidate: (candidateId: string) => void;
}

const CandidateSelector: React.FC<CandidateSelectorProps> = ({
  position,
  existingCandidates,
  onAddCandidate,
  onRemoveCandidate
}) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    bio: '',
    photoUrl: ''
  });

  const handleAddExisting = (candidate: Candidate) => {
    if (!position.candidates.find(c => c.id === candidate.id)) {
      onAddCandidate(candidate);
    }
  };

  const handleAddNew = () => {
    if (newCandidate.name && newCandidate.bio) {
      const candidate: Candidate = {
        id: Date.now().toString(),
        name: newCandidate.name,
        bio: newCandidate.bio,
        photoUrl: newCandidate.photoUrl || `https://ui-avatars.com/api/?name=${newCandidate.name}&background=3b82f6&color=fff`,
        isNew: true
      };
      onAddCandidate(candidate);
      setNewCandidate({ name: '', bio: '', photoUrl: '' });
      setShowAddNew(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Selected Candidates */}
      {position.candidates.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Selected Candidates</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {position.candidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={candidate.photoUrl}
                  alt={candidate.name}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                  <p className="text-xs text-gray-500">{candidate.bio.substring(0, 50)}...</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveCandidate(candidate.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Candidates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium text-gray-700">Add Candidates</h5>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddNew(!showAddNew)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>

        {/* Add New Candidate Form */}
        {showAddNew && (
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <Input
              label="Name"
              value={newCandidate.name}
              onChange={(e) => setNewCandidate(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter candidate name"
            />
            <Input
              label="Photo URL (optional)"
              value={newCandidate.photoUrl}
              onChange={(e) => setNewCandidate(prev => ({ ...prev, photoUrl: e.target.value }))}
              placeholder="Enter photo URL"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                rows={3}
                value={newCandidate.bio}
                onChange={(e) => setNewCandidate(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Enter candidate bio"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleAddNew}>
                Add Candidate
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAddNew(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Existing Candidates */}
        <div>
          <h6 className="text-xs font-medium text-gray-600 mb-2">Select from existing candidates</h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {existingCandidates.map((candidate) => {
              const isSelected = position.candidates.some(c => c.id === candidate.id);
              return (
                <button
                  key={candidate.id}
                  onClick={() => handleAddExisting(candidate)}
                  disabled={isSelected}
                  className={`flex items-center space-x-3 p-2 rounded-lg border transition-colors duration-200 ${
                    isSelected
                      ? 'border-green-300 bg-green-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={candidate.photoUrl}
                    alt={candidate.name}
                  />
                  <div className="text-left">
                    <p className={`text-sm font-medium ${
                      isSelected ? 'text-green-700' : 'text-gray-900'
                    }`}>
                      {candidate.name}
                    </p>
                    <p className={`text-xs ${
                      isSelected ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {candidate.bio.substring(0, 30)}...
                    </p>
                  </div>
                  {isSelected && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditElectionPage; 