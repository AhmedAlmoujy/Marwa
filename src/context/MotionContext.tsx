'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface MotionContextType {
  isPaused: boolean;
  togglePause: () => void;
  prefersReducedMotion: boolean;
}

const MotionContext = createContext<MotionContextType>({
  isPaused: false,
  togglePause: () => {},
  prefersReducedMotion: false,
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPaused(true);
    }

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsPaused(true);
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isPaused) {
      document.body.classList.add('motion-paused');
    } else {
      document.body.classList.remove('motion-paused');
    }
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <MotionContext.Provider value={{ isPaused, togglePause, prefersReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => useContext(MotionContext);
