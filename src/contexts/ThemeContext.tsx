import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  density: 'compact' | 'default' | 'comfortable';
  setDensity: (density: 'compact' | 'default' | 'comfortable') => void;
  radius: 'none' | 'small' | 'medium' | 'large' | 'full';
  setRadius: (radius: 'none' | 'small' | 'medium' | 'large' | 'full') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Color preferences
  const [primaryColor, setPrimaryColor] = useState(() => 
    localStorage.getItem('primaryColor') || '#6366f1'
  );
  const [accentColor, setAccentColor] = useState(() => 
    localStorage.getItem('accentColor') || '#8b5cf6'
  );

  // Density and radius preferences
  const [density, setDensity] = useState<'compact' | 'default' | 'comfortable'>(() => 
    (localStorage.getItem('density') as 'compact' | 'default' | 'comfortable') || 'default'
  );
  const [radius, setRadius] = useState<'none' | 'small' | 'medium' | 'large' | 'full'>(() => 
    (localStorage.getItem('radius') as 'none' | 'small' | 'medium' | 'large' | 'full') || 'medium'
  );

  // Update theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Update colors
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    localStorage.setItem('primaryColor', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent', accentColor);
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);

  // Update density
  useEffect(() => {
    const spacingValues = {
      compact: { base: '0.75rem', lg: '1rem' },
      default: { base: '1rem', lg: '1.5rem' },
      comfortable: { base: '1.25rem', lg: '2rem' }
    };
    
    const spacing = spacingValues[density];
    document.documentElement.style.setProperty('--spacing-base', spacing.base);
    document.documentElement.style.setProperty('--spacing-lg', spacing.lg);
    localStorage.setItem('density', density);
  }, [density]);

  // Update radius
  useEffect(() => {
    const radiusValues = {
      none: { base: '0', lg: '0' },
      small: { base: '0.25rem', lg: '0.375rem' },
      medium: { base: '0.375rem', lg: '0.5rem' },
      large: { base: '0.5rem', lg: '0.75rem' },
      full: { base: '9999px', lg: '9999px' }
    };
    
    const radiusValue = radiusValues[radius];
    document.documentElement.style.setProperty('--radius-base', radiusValue.base);
    document.documentElement.style.setProperty('--radius-lg', radiusValue.lg);
    localStorage.setItem('radius', radius);
  }, [radius]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
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
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 