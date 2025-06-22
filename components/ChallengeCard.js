
import React from 'react';
import { Challenge } from '../types';
import { COLORS } from '../constants';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { KeyIcon } from './icons/KeyIcon';

interface ChallengeCardProps {
  challenge: Challenge;
  onSelect: (challenge: Challenge) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSelect }) => {
  const borderColor = challenge.completed ? 'border-green-500' : COLORS.border;
  return (
    <button
      onClick={() => onSelect(challenge)}
      className={`group relative p-6 rounded-xl ${COLORS.secondary} border-2 ${borderColor} hover:shadow-xl hover:border-amber-500/70 transition-all duration-300 ease-in-out transform hover:scale-105 text-left w-full`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className={`text-xl font-merriweather font-semibold ${challenge.completed ? COLORS.textSecondary : COLORS.textPrimary}`}>
          {challenge.name}
        </h2>
        {challenge.completed
          ? <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
          : <KeyIcon className={`w-6 h-6 ${COLORS.textAccent} group-hover:animate-sway flex-shrink-0`} />}
      </div>
      <p className={`${COLORS.textSecondary} text-sm mb-1`}>Desbloquea {challenge.points} puntos.</p>
      {challenge.completed && <p className="text-green-400 text-xs italic">¡Completado!</p>}
    </button>
  );
};
    