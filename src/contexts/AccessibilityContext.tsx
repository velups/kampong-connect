import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityState {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilityState;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AccessibilityState>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('kampong_connect_accessibility');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error('Failed to parse accessibility settings');
      }
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setSettings(prev => ({
      ...prev,
      reducedMotion: prev.reducedMotion || prefersReducedMotion,
      highContrast: prev.highContrast || prefersHighContrast,
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem('kampong_connect_accessibility', JSON.stringify(settings));
    
    // Apply settings to document
    const body = document.body;
    
    if (settings.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    
    if (settings.largeText) {
      body.classList.add('large-text');
    } else {
      body.classList.remove('large-text');
    }
    
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0s');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
      document.documentElement.style.removeProperty('--transition-duration');
    }
  }, [settings]);

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleLargeText = () => {
    setSettings(prev => ({ ...prev, largeText: !prev.largeText }));
  };

  const toggleReducedMotion = () => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        toggleHighContrast,
        toggleLargeText,
        toggleReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};