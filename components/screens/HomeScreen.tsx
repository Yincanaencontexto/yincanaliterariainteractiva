
import React, { useState } from 'react';
import { Challenge } from '../../types';
import { COLORS, URL_IMAGE_HOME_SCREEN } from '../../constants';
import { ChallengeCard } from '../ChallengeCard';

interface HomeScreenProps {
  challenges: Challenge[];
  onChallengeSelect: (challenge: Challenge) => void;
  score: number;
  totalScore: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ challenges, onChallengeSelect, score, totalScore }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const completedChallenges = challenges.filter(c => c.completed).length;
  const progressPercentage = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;

  return (
    <div className={`min-h-screen ${COLORS.primary} animate-fadeIn`}> {/* Removed pb-28 */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative h-56 md:h-64 overflow-hidden rounded-b-lg mx-0 md:mx-4 md:mt-4 shadow-lg">
          {!imageError ? (
            <img
              src={URL_IMAGE_HOME_SCREEN}
              alt="Yincana Literaria"
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center ${COLORS.secondary} ${COLORS.textSecondary}`}>
              Imagen no disponible
            </div>
          )}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
        </div>
        
        <div className="text-center mt-[-40px] md:mt-[-50px] mb-6 relative z-10">
          <h1 className={`text-4xl md:text-5xl font-cinzel-decorative font-bold ${COLORS.textAccent}`} style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
            YINCANA LITERARIA
          </h1>
          <p className={`${COLORS.textSecondary} text-sm`}>Del libro: Caminar para aprender.</p>
        </div>

        <div className="mx-4 mb-6 p-4 bg-slate-800 rounded-lg shadow-md">
          <h2 className={`text-lg font-semibold mb-2 ${COLORS.textPrimary}`}>Progreso General</h2>
          <div className={`w-full ${COLORS.secondary} rounded-full h-3.5 mb-2 border border-slate-700`}>
            <div
              className={`bg-amber-500 h-full rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className={COLORS.textSecondary}>{`${completedChallenges} / ${challenges.length} Desafíos Completados`}</span>
            <span className={`${COLORS.textAccent} font-semibold`}>{`Puntuación: ${score} / ${totalScore} pts`}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 pb-4">
          {challenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onSelect={onChallengeSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};