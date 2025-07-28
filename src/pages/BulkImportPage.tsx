import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard, { GlassCardBody } from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { 
  Upload, 
  Download, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft, 
  Users, 
  X,
  Crown,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Info
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CSVMember {
  member_id: string;
  name: string;
  email: string;
  role: 'admin' | 'voter';
  phone: string;
  position: string;
  department: string;
  status?: 'active' | 'inactive';
}

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

const BulkImportPage: React.FC = () => {
  const navigate = useNavigate();
  const [csvData, setCsvData] = useState<CSVMember[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [importResults, setImportResults] = useState<ImportResult | null>(null);
  const [currentStep, setCurrentStep] = useState<'upload' | 'preview' | 'import' | 'results'>('upload');

  // CSV Processing Functions
  const parseCSV = (csvText: string): CSVMember[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const data: CSVMember[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue;
      
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      // Validate required fields
      if (row.name && row.email && row.role) {
        data.push({
          member_id: row.member_id,
          name: row.name,
          email: row.email,
          role: row.role.toLowerCase() === 'admin' ? 'admin' : 'voter',
          phone: row.phone || '',
          position: row.position || '',
          department: row.department || '',
          status: row.status?.toLowerCase() === 'inactive' ? 'inactive' : 'active'
        });
      }
    }

    return data;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error('Please upload a valid CSV file');
      return;
    }

    processFile(file);
  };

  const handleBulkImport = async () => {
    if (csvData.length === 0) {
      toast.error('No data to import');
      return;
    }

    setImportLoading(true);
    setCurrentStep('import');
    
    try {
      // Simulate API call with progress
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate some failures for demo
      const results: ImportResult = {
        success: Math.floor(csvData.length * 0.9), // 90% success rate
        failed: Math.floor(csvData.length * 0.1), // 10% failure rate
        errors: [
          'john.doe@example.com - Email already exists',
          'jane.smith@example.com - Invalid email format'
        ]
      };

      setImportResults(results);
      setCurrentStep('results');
      
      if (results.success > 0) {
        toast.success(`Successfully imported ${results.success} members`);
      }
      if (results.failed > 0) {
        toast.error(`${results.failed} members failed to import`);
      }
    } catch (error) {
      toast.error('Failed to import members');
      setCurrentStep('preview');
    } finally {
      setImportLoading(false);
    }
  };

  const downloadCSVTemplate = () => {
    const headers = ['member_id', 'name', 'email', 'role', 'phone', 'position', 'department', 'status'];
    const sampleData = [
      ['STU830', 'John Doe', 'john.doe@example.com', 'voter', '+1 (555) 123-4567', 'Teacher', 'Mathematics', 'active'],
      ['STU831', 'Jane Smith', 'jane.smith@example.com', 'admin', '+1 (555) 234-5678', 'Principal', 'Administration', 'active'],
      ['STU832', 'Mike Johnson', 'mike.johnson@example.com', 'voter', '+1 (555) 345-6789', 'Teacher', 'Science', 'active'],
      ['STU833', 'Sarah Wilson', 'sarah.wilson@example.com', 'voter', '+1 (555) 456-7890', 'Teacher', 'English', 'inactive']
    ];
    
    const csvContent = [
      headers.join(','),
      ...sampleData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'members_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('CSV template downloaded');
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      voter: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role as keyof typeof colors]}`}>
        {role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status === 'active' ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const resetImport = () => {
    setCsvData([]);
    setCsvFile(null);
    setImportResults(null);
    setCurrentStep('upload');
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        // Process the dropped file directly
        processFile(file);
      } else {
        toast.error('Please upload a valid CSV file');
      }
    }
  };

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }

    setCsvFile(file);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        toast.error('No valid data found in CSV file');
        return;
      }

      setCsvData(parsedData);
      setCurrentStep('preview');
      toast.success(`Found ${parsedData.length} valid records in CSV`);
    };

    reader.onerror = () => {
      toast.error('Failed to read CSV file');
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/organization" 
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Organization</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={downloadCSVTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Bulk Import Members
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Import multiple organization members at once using a CSV file. 
            Download the template to see the required format and get started.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { key: 'upload', label: 'Upload File', icon: Upload },
              { key: 'preview', label: 'Preview Data', icon: FileText },
              { key: 'import', label: 'Import', icon: Users },
              { key: 'results', label: 'Results', icon: CheckCircle }
            ].map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.key;
              const isCompleted = ['preview', 'import', 'results'].includes(currentStep) && index < 3;
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
                    isActive 
                      ? 'bg-purple-500 border-purple-500 text-white'
                      : isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive 
                      ? 'text-purple-600 dark:text-purple-400'
                      : isCompleted
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                  {index < 3 && (
                    <ChevronRight className={`w-4 h-4 mx-2 ${
                      isCompleted ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <GlassCard>
          <GlassCardBody className="p-8">
            {/* Step 1: Upload */}
            {currentStep === 'upload' && (
              <div className="space-y-6">
                {/* Instructions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">CSV Import Instructions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
                        <div>
                          <h5 className="font-medium mb-2">Required Fields:</h5>
                          <ul className="space-y-1">
                            <li>• <strong>member_id</strong> - Member ID (must be unique)</li>
                            <li>• <strong>name</strong> - Full name of the member</li>
                            <li>• <strong>email</strong> - Email address (must be unique)</li>
                            <li>• <strong>role</strong> - "admin" or "voter"</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Optional Fields:</h5>
                          <ul className="space-y-1">
                            <li>• <strong>phone</strong> - Phone number</li>
                            <li>• <strong>position</strong> - Job position/title</li>
                            <li>• <strong>department</strong> - Department or division</li>
                            <li>• <strong>status</strong> - "active" or "inactive"</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div 
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors duration-200"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <div className="cursor-pointer" onClick={() => document.getElementById('csv-upload')?.click()}>
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      Choose CSV file or drag and drop
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      CSV files only, max 5MB
                    </p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Select File
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Preview */}
            {currentStep === 'preview' && (
              <div className="space-y-6">
                {/* File Info */}
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium text-green-900 dark:text-green-100">
                        File Uploaded Successfully
                      </h4>
                      <p className="text-sm text-green-800 dark:text-green-200">
                        {csvFile?.name} • {csvData.length} valid records found
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetImport}
                    className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove File
                  </Button>
                </div>

                {/* Preview Table */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Preview Data ({csvData.length} records)
                  </h3>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Position
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Department
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                          {csvData.slice(0, 10).map((member, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                {member.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                {member.email}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {getRoleBadge(member.role)}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                {member.position || '-'}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                {member.department || '-'}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {getStatusBadge(member.status || 'active')}
                              </td>
                            </tr>
                          ))}
                          {csvData.length > 10 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                                ... and {csvData.length - 10} more records
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={resetImport}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBulkImport}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Import {csvData.length} Members
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Import Progress */}
            {currentStep === 'import' && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-6"></div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Importing Members
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we import {csvData.length} members...
                </p>
              </div>
            )}

            {/* Step 4: Results */}
            {currentStep === 'results' && importResults && (
              <div className="space-y-6">
                {/* Results Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {importResults.success}
                    </div>
                    <div className="text-sm text-green-800 dark:text-green-200">
                      Successfully Imported
                    </div>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                      {importResults.failed}
                    </div>
                    <div className="text-sm text-red-800 dark:text-red-200">
                      Failed to Import
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
                    <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {csvData.length}
                    </div>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      Total Records
                    </div>
                  </div>
                </div>

                {/* Error Details */}
                {importResults.errors.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Import Errors
                    </h4>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <ul className="space-y-2">
                        {importResults.errors.map((error, index) => (
                          <li key={index} className="text-sm text-red-800 dark:text-red-200 flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/organization')}
                  >
                    Back to Organization
                  </Button>
                  <Button
                    onClick={resetImport}
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  >
                    Import Another File
                  </Button>
                </div>
              </div>
            )}
          </GlassCardBody>
        </GlassCard>
      </div>
    </div>
  );
};

export default BulkImportPage; 