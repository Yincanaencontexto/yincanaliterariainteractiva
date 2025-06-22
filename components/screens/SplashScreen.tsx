
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { BookOpenIcon } from '../icons/BookOpenIcon';
import { COLORS } from '../../constants';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-8 text-center ${COLORS.primary} ${COLORS.textPrimary} transition-opacity duration-1000 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <BookOpenIcon className={`w-24 h-24 text-amber-400 mb-8 animate-pulseOnce`} />
      <h1
        className="text-5xl md:text-6xl font-cinzel-decorative font-bold mb-4"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
      >
        Yincana Literaria
      </h1>
      <p className="text-lg md:text-xl font-merriweather mb-12 max-w-2xl">
        Embárcate en un viaje épico a través de tierras encantadas. Resuelve acertijos, desbloquea secretos y conviértete en un maestro del conocimiento.
      </p>
      <Button onClick={onStart} className="font-cinzel-decorative text-xl md:text-2xl px-10 py-4">
        Comenzar tu Aventura
      </Button>
    </div>
  );
}; 