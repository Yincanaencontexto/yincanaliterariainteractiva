
import React from 'react';
import { Button } from '../Button';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { COLORS } from '../../constants';
import { Challenge } from '../../types';

interface SuccessScreenProps {
  challenge: Challenge | null;
  onContinue: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ challenge, onContinue }) => {
  if (!challenge) {
    // Should ideally not happen if logic is correct
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${COLORS.primary} animate-fadeIn`}> {/* Removed pb-28 */}
        <p>Error: Información del desafío no disponible.</p>
        <Button onClick={onContinue} className="mt-4">Continuar</Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${COLORS.primary} animate-fadeIn`}> {/* Removed pb-28 */}
      <div className={`w-full max-w-lg mx-auto p-8 rounded-xl shadow-2xl ${COLORS.secondary} text-center`}>
        <CheckCircleIcon className="w-20 h-20 md:w-24 md:h-24 text-green-500 mx-auto mb-6" />
        <h1 className={`text-3xl md:text-4xl font-cinzel-decorative font-bold mb-3 ${COLORS.textAccent}`}>
          ¡Desafío Completado!
        </h1>
        <h2 className={`text-xl md:text-2xl font-merriweather font-semibold mb-4 ${COLORS.textPrimary}`}>
          {challenge.name}
        </h2>
        <p className={`text-md md:text-lg ${COLORS.textSecondary} mb-6 italic`}>{challenge.successMessage}</p>
        
        <div className={`p-4 rounded-lg ${COLORS.primary} border ${COLORS.border} mb-6`}>
          <p className={`text-2xl font-bold ${COLORS.textAccent}`}>+{challenge.points} puntos</p>
          <p className={`text-sm ${COLORS.textSecondary}`}>¡Bien hecho, aventurero!</p>
        </div>

        {challenge.nextQrHint && (
          <div className={`mb-6 p-3 rounded-md ${COLORS.primary} border ${COLORS.border} text-sm`}>
            <strong className={`${COLORS.textAccent}`}>Próximo Paso: </strong>
            <span className={`${COLORS.textSecondary}`}>{challenge.nextQrHint}</span>
          </div>
        )}
        {!challenge.nextQrHint && (
           <div className={`mb-6 p-3 rounded-md ${COLORS.primary} border ${COLORS.border} text-sm`}>
            <strong className={`${COLORS.textAccent}`}>¡Felicidades! </strong>
            <span className={`${COLORS.textSecondary}`}>Has completado el último desafío.</span>
          </div>
        )}
        
        <Button onClick={onContinue} className="w-full">
          Continuar Aventura
        </Button>
      </div>
    </div>
  );
};
    