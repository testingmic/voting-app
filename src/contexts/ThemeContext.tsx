import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  layout: 'default' | 'compact' | 'comfortable';
  setLayout: (layout: 'default' | 'compact' | 'comfortable') => void;
  density: 'default' | 'compact' | 'comfortable';
  setDensity: (density: 'default' | 'compact' | 'comfortable') => void;
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

  // Layout preferences
  const [layout, setLayout] = useState<'default' | 'compact' | 'comfortable'>(() => 
    (localStorage.getItem('layout') as 'default' | 'compact' | 'comfortable') || 'default'
  );
  const [density, setDensity] = useState<'default' | 'compact' | 'comfortable'>(() => 
    (localStorage.getItem('density') as 'default' | 'compact' | 'comfortable') || 'default'
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

  // Update layout preferences
  useEffect(() => {
    localStorage.setItem('layout', layout);
    document.documentElement.setAttribute('data-layout', layout);
  }, [layout]);

  useEffect(() => {
    localStorage.setItem('density', density);
    document.documentElement.setAttribute('data-density', density);
  }, [density]);

  useEffect(() => {
    localStorage.setItem('radius', radius);
    document.documentElement.setAttribute('data-radius', radius);
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
    layout,
    setLayout,
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