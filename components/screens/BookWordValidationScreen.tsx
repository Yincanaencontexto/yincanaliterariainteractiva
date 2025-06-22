
import React, { useState } from 'react';
import { Button } from '../Button';
import { BookOpenIcon } from '../icons/BookOpenIcon';
import { COLORS } from '../../constants';
import { Challenge } from '../../types';

interface BookWordValidationScreenProps {
  challenge: Challenge | null;
  onValidateWord: (word: string) => void;
  onBack: () => void;
  error: string | null;
}

export const BookWordValidationScreen: React.FC<BookWordValidationScreenProps> = ({
  challenge,
  onValidateWord,
  onBack,
  error: externalError,
}) => {
  const [bookWord, setBookWord] = useState('');
  const [internalError, setInternalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInternalError(null);
    if (bookWord.trim()) {
      onValidateWord(bookWord.trim());
    } else {
      setInternalError("La palabra no puede estar vacía.");
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
        <BookOpenIcon className={`w-16 h-16 ${COLORS.textAccent} mx-auto mb-6`} />
        <h1 className={`text-3xl font-cinzel-decorative font-bold text-center mb-2 ${COLORS.textPrimary}`}>
          Palabra del Libro
        </h1>
        <p className={`text-sm ${COLORS.textSecondary} text-center mb-4 px-2`}>
          Ingresa la palabra clave que se encuentra en el libro para el desafío "{challenge.name}".
        </p>

        {challenge.bookWordLocationHint && (
          <div className={`mb-6 p-3 rounded-md bg-slate-900/50 border ${COLORS.border} text-sm`}>
             <p className={`${COLORS.textSecondary}`}>
              <span className={`font-semibold ${COLORS.textAccent}`}>Pista de ubicación:</span> {challenge.bookWordLocationHint}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="bookWord" className={`block text-sm font-medium ${COLORS.textSecondary} mb-1`}>
              Palabra Clave
            </label>
            <input
              type="text"
              id="bookWord"
              name="bookWord"
              value={bookWord}
              onChange={(e) => setBookWord(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg ${COLORS.primary} ${COLORS.textPrimary} border ${COLORS.border} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow`}
              placeholder="Ej: aventura"
            />
          </div>
          {displayError && <p className="text-red-500 text-sm text-center">{displayError}</p>}
          <Button type="submit" className="w-full">Validar Palabra</Button>
          <Button onClick={onBack} variant="secondary" className="w-full">Atrás</Button>
        </form>
      </div>
    </div>
  );
};
    