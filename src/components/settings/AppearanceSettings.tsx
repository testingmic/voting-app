import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard, { GlassCardHeader, GlassCardBody } from '../ui/GlassCard';
import { Sun, Moon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AppearanceSettings: React.FC = () => {
  const {
    theme,
    toggleTheme,
    primaryColor,
    setPrimaryColor,
    accentColor,
    setAccentColor,
    density,
    setDensity,
    radius,
    setRadius
  } = useTheme();

  const colorPresets = [
    { name: 'Indigo', primary: '#6366f1', accent: '#8b5cf6' },
    { name: 'Blue', primary: '#3b82f6', accent: '#6366f1' },
    { name: 'Green', primary: '#10b981', accent: '#059669' },
    { name: 'Purple', primary: '#8b5cf6', accent: '#7c3aed' },
    { name: 'Orange', primary: '#f97316', accent: '#ea580c' },
    { name: 'Red', primary: '#ef4444', accent: '#dc2626' },
  ];

  const handleColorPresetChange = (primary: string, accent: string) => {
    setPrimaryColor(primary);
    setAccentColor(accent);
    toast.success('Color scheme updated');
  };

  const handleDensityChange = (newDensity: 'compact' | 'default' | 'comfortable') => {
    setDensity(newDensity);
    toast.success('Interface density updated');
  };

  const handleRadiusChange = (newRadius: 'none' | 'small' | 'medium' | 'large' | 'full') => {
    setRadius(newRadius);
    toast.success('Border radius updated');
  };

  return (
    <div className="space-y-6">
      {/* Theme */}
      <GlassCard>
        <GlassCardHeader>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Theme</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Choose your preferred color theme
          </p>
        </GlassCardHeader>
        <GlassCardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  theme === 'light'
                    ? 'bg-primary-100 border-primary-200 text-primary-900'
                    : 'bg-transparent border-gray-200 dark:border-gray-700'
                }`}
              >
                <Sun className="w-5 h-5 mr-2" />
                Light
              </button>
              <button
                onClick={toggleTheme}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-primary-900/20 border-primary-800/20 text-primary-100'
                    : 'bg-transparent border-gray-200 dark:border-gray-700'
                }`}
              >
                <Moon className="w-5 h-5 mr-2" />
                Dark
              </button>
            </div>
          </div>
        </GlassCardBody>
      </GlassCard>

      {/* Colors */}
      <GlassCard>
        <GlassCardHeader>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Colors</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Customize the color scheme of your interface
          </p>
        </GlassCardHeader>
        <GlassCardBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleColorPresetChange(preset.primary, preset.accent)}
                    className={`flex items-center p-3 rounded-lg border transition-colors duration-200 ${
                      primaryColor === preset.primary
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex space-x-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Accent Color
                </label>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </GlassCardBody>
      </GlassCard>

      {/* Interface Settings */}
      <GlassCard>
        <GlassCardHeader>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Interface</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Customize spacing and border radius
          </p>
        </GlassCardHeader>
        <GlassCardBody>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Interface Density
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleDensityChange('compact')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    density === 'compact'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Compact
                </button>
                <button
                  onClick={() => handleDensityChange('default')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    density === 'default'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Default
                </button>
                <button
                  onClick={() => handleDensityChange('comfortable')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    density === 'comfortable'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Comfortable
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Border Radius
              </label>
              <div className="grid grid-cols-5 gap-3">
                <button
                  onClick={() => handleRadiusChange('none')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    radius === 'none'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  None
                </button>
                <button
                  onClick={() => handleRadiusChange('small')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    radius === 'small'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Small
                </button>
                <button
                  onClick={() => handleRadiusChange('medium')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    radius === 'medium'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => handleRadiusChange('large')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    radius === 'large'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Large
                </button>
                <button
                  onClick={() => handleRadiusChange('full')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    radius === 'full'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  Full
                </button>
              </div>
            </div>
          </div>
        </GlassCardBody>
      </GlassCard>
    </div>
  );
};

export default AppearanceSettings; 