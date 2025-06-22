
import React, { useState } from 'react';
import { Button } from '../Button';
import { KeyIcon } from '../icons/KeyIcon'; // Or a more thematic icon like a question mark
import { COLORS } from '../../constants';
import { Challenge } from '../../types';

interface QuestionScreenProps {
  challenge: Challenge | null;
  onSubmitAnswer: (answer: string) => void;
  onBack: () => void;
  error: string | null;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  challenge,
  onSubmitAnswer,
  onBack,
  error: externalError,
}) => {
  const [answer, setAnswer] = useState('');
  const [internalError, setInternalError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInternalError(null);
    if (answer.trim()) {
      onSubmitAnswer(answer.trim());
    } else {
      setInternalError("La respuesta no puede estar vacía.");
    }
  };

  const displayError = externalError || internalError;

  if (!challenge) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${COLORS.primary} animate-fadeIn`}> {/* Removed pb-28 */}
        <p>Error: Desafío no encontrado.</p>
        <Button onClick={onBack} className="mt-4">Volver</Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${COLORS.primary} animate-fadeIn`}> {/* Removed pb-28 */}
      <div className={`w-full max-w-md mx-auto p-8 rounded-xl shadow-2xl ${COLORS.secondary}`}>
        <KeyIcon className={`w-16 h-16 ${COLORS.textAccent} mx-auto mb-6`} /> {/* Consider using a different icon, e.g., Lightbulb for question/hint */}
        <h1 className={`text-3xl font-cinzel-decorative font-bold text-center mb-4 ${COLORS.textPrimary}`}>
          Pregunta del Desafío
        </h1>
        <p className={`text-lg ${COLORS.textPrimary} text-center mb-6 font-merriweather`}>{challenge.questionPrompt}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="answer" className={`block text-sm font-medium ${COLORS.textSecondary} mb-1`}>
              Tu Respuesta
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg ${COLORS.primary} ${COLORS.textPrimary} border ${COLORS.border} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow`}
              placeholder="Ej: dragón"
            />
          </div>
          {displayError && <p className="text-red-500 text-sm text-center">{displayError}</p>}
          <Button type="submit" className="w-full">Enviar Respuesta</Button>
          
          {challenge.answerHintInBook && (
            <Button onClick={() => setShowHint(!showHint)} variant="secondary" className="w-full !py-2 !text-sm">
              {showHint ? "Ocultar Pista" : "Mostrar Pista del Libro"}
            </Button>
          )}
        </form>

        {showHint && challenge.answerHintInBook && (
          <div className={`mt-4 text-xs ${COLORS.textSecondary} italic p-3 border ${COLORS.border} rounded bg-slate-900/50 animate-fadeIn`}>
            <strong className={`text-amber-400`}>Pista del Libro: </strong>
            {challenge.answerHintInBook}
          </div>
        )}
        
        <Button onClick={onBack} variant="secondary" className="w-full mt-4 !text-xs !py-1.5">
          Atrás (Palabra del Libro)
        </Button>
      </div>
    </div>
  );
};