
import React from 'react';
import { Button } from '../Button';
import { CheckCircleIcon } from '../icons/CheckCircleIcon'; // Re-using, or could be a TrophyIcon
import { COLORS } from '../../constants';

interface CompletionScreenProps {
  score: number;
  totalScore: number;
  onRestart: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ score, totalScore, onRestart }) => {
  const handleDownloadCertificate = () => {
    // Placeholder URL for the certificate PDF
    const certificateUrl = 'https://yincanaencontexto.github.io/certificado-pdf/'; // IMPORTANT: Replace with actual URL
    
    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = 'Certificado_Yincana_Literaria.pdf'; // Suggested filename
    link.target = '_blank'; // Open in new tab if direct download isn't forced by server
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 md:p-6 ${COLORS.primary} animate-fadeIn`}> {/* Removed pb-28 */}
      <div className={`w-full max-w-2xl mx-auto p-6 md:p-8 rounded-xl shadow-2xl ${COLORS.secondary} text-center`}>
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Using CheckCircleIcon, but a TrophyIcon would be more thematic */}
              <CheckCircleIcon className="w-28 h-28 md:w-32 md:h-32 text-green-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-5xl" role="img" aria-label="Trofeo">🏆</span>
              </div>
            </div>
          </div>
          <h1 className={`text-4xl md:text-5xl font-cinzel-decorative font-bold mb-4 ${COLORS.textAccent}`}>
            ¡Felicitaciones!
          </h1>
          <h2 className={`text-2xl md:text-3xl font-merriweather font-semibold mb-6 ${COLORS.textPrimary}`}>
            Has Completado la Yincana Literaria
          </h2>
        </div>
        
        <div className={`p-6 rounded-lg ${COLORS.primary} border ${COLORS.border} mb-8`}>
          <p className={`text-3xl font-bold ${COLORS.textAccent} mb-2`}>
            {score} / {totalScore} puntos
          </p>
          <p className={`text-lg ${COLORS.textSecondary}`}>
            {score === totalScore ? "¡Puntuación perfecta! Eres un verdadero maestro del conocimiento." : "¡Gran esfuerzo, has llegado al final!"}
          </p>
        </div>

        <div className={`mb-8 p-4 rounded-md ${COLORS.primary} border ${COLORS.border}`}>
          <p className={`text-md md:text-lg ${COLORS.textPrimary} mb-4`}>
            Has demostrado tu sabiduría y perseverancia. Como reconocimiento, puedes descargar tu certificado.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleDownloadCertificate} 
            className="w-full text-lg py-3 md:py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
          >
            <span role="img" aria-label="Certificado" className="mr-2 text-xl">📜</span>
            Descargar Certificado PDF
          </Button>
          <Button 
            onClick={onRestart} 
            variant="secondary" 
            className="w-full"
          >
            Comenzar Nueva Aventura
          </Button>
        </div>
      </div>
    </div>
  );
};