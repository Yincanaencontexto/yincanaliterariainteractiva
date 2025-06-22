
import React, { useState } from 'react';
import { Button } from '../Button';
import { KeyIcon } from '../icons/KeyIcon';
import { QrCodeIcon } from '../icons/QrCodeIcon';
import { COLORS, DESAFIOS } from '../../constants'; // Importar DESAFIOS
import { Challenge } from '../../types';

interface ManualKeyValidationScreenProps {
  challenge: Challenge | null;
  onValidateKey: (key: string) => void;
  onBack: () => void; // To navigate back to home/challenge list
  onNavigateToScanQR: () => void;
  error: string | null;
}

export const ManualKeyValidationScreen: React.FC<ManualKeyValidationScreenProps> = ({
  challenge,
  onValidateKey,
  onBack,
  onNavigateToScanQR,
  error: externalError,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [internalError, setInternalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInternalError(null);
    if (apiKey.trim()) {
      onValidateKey(apiKey.trim());
    } else {
      setInternalError("La clave no puede estar vacía.");
    }
  };

  const displayError = externalError || internalError;

  if (!challenge) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${COLORS.primary} animate-fadeIn`}>
        <p>Error: Desafío no encontrado.</p>
        <Button onClick={onBack} className="mt-4">Volver</Button>
      </div>
    );
  }

  // Lógica para asegurar que la pista se muestre
  let displayHint = challenge.manualKeyHint;
  if (!displayHint && challenge.id) {
    // Si la pista no está en el desafío actual (posiblemente de localStorage antiguo),
    // búscala en la lista maestra de DESAFIOS.
    const masterChallengeData = DESAFIOS.find(d => d.id === challenge.id);
    if (masterChallengeData && masterChallengeData.manualKeyHint) {
      displayHint = masterChallengeData.manualKeyHint;
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${COLORS.primary} animate-fadeIn`}>
      <div className={`w-full max-w-md mx-auto p-6 md:p-8 rounded-xl shadow-2xl ${COLORS.secondary}`}>
        <div className="text-center mb-6">
          <KeyIcon className={`w-16 h-16 ${COLORS.textAccent} mx-auto mb-4`} />
          <h1 className={`text-2xl md:text-3xl font-cinzel-decorative font-bold ${COLORS.textPrimary}`}>
            {challenge.name}
          </h1>
          <p className={`text-sm ${COLORS.textSecondary} mt-1`}>
            Desbloquea este desafío.
          </p>
        </div>

        {challenge.qrCodeLocationHint && (
          <div className={`mb-6 p-3 rounded-md bg-slate-900/50 border ${COLORS.border} text-sm`}>
            <p className={`${COLORS.textSecondary}`}>
              <span className={`font-semibold ${COLORS.textAccent}`}>Pista para el QR:</span> {challenge.qrCodeLocationHint}
            </p>
          </div>
        )}
        
        <Button onClick={onNavigateToScanQR} variant="primary" className="w-full mb-4 text-base md:text-lg py-3">
          <QrCodeIcon className="w-5 h-5" />
          <span>Escanear Código QR</span>
        </Button>

        <div className="my-4 flex items-center">
            <hr className={`flex-grow border-t ${COLORS.border}`} />
            <span className={`px-3 ${COLORS.textSecondary} text-sm`}>O</span>
            <hr className={`flex-grow border-t ${COLORS.border}`} />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className={`block text-sm font-medium ${COLORS.textSecondary} mb-1`}>
              Ingresar Clave Manualmente
            </label>
            <input
              type="text"
              id="apiKey"
              name="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg ${COLORS.primary} ${COLORS.textPrimary} border ${COLORS.border} focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow`}
              placeholder="Ej: WOODS_KEY_123"
            />
             {displayHint && ( // Usar displayHint aquí
                <p className={`text-xs ${COLORS.textSecondary} mt-1 px-1`}>
                    {displayHint}
                </p>
             )}
          </div>
          {displayError && <p className="text-red-500 text-sm text-center -mt-2 mb-2">{displayError}</p>}
          <Button type="submit" className="w-full text-base md:text-lg py-3">
            Validar Clave
          </Button>
        </form>
        <Button onClick={onBack} variant="secondary" className="w-full mt-6 text-sm py-2">
            Volver a Desafíos
        </Button>
      </div>
    </div>
  );
};
