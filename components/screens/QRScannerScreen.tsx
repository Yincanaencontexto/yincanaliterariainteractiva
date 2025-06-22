
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../Button';
import { QrCodeIcon } from '../icons/QrCodeIcon';
import { COLORS } from '../../constants';

interface QRScannerScreenProps {
  onScanSuccess: (decodedText: string) => void;
  onBack: () => void;
  error: string | null; // External error from validation
}

export const QRScannerScreen: React.FC<QRScannerScreenProps> = ({ onScanSuccess, onBack, error: externalError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const scannerRef = useRef<any>(null); // To hold the Html5QrcodeScanner instance

  useEffect(() => {
    // Ensure the library is loaded
    if (!window.Html5QrcodeScanner) {
      setInternalError("Librería de escáner QR no cargada. Refresca la página.");
      return;
    }

    const startScanner = () => {
      try {
        setInternalError(null);
        setIsScanning(true);

        const config = {
          fps: 10,
          qrbox: (viewportWidth: number, viewportHeight: number) => {
            const minEdge = Math.min(viewportWidth, viewportHeight);
            const qrBoxSize = Math.max(200, Math.min(300, minEdge * 0.7)); // Responsive QR box
            return { width: qrBoxSize, height: qrBoxSize };
          },
          aspectRatio: 1.0, // Square
          disableFlip: false,
          rememberLastUsedCamera: true,
        };
        
        const html5QrcodeScanner = new window.Html5QrcodeScanner(
          "qr-reader", // ID of the div element
          config,
          false // verbose = false
        );
        scannerRef.current = html5QrcodeScanner;

        const successCallback = (decodedText: string, decodedResult: any) => {
          if (scannerRef.current) {
            scannerRef.current.clear().then(() => {
              setIsScanning(false);
              onScanSuccess(decodedText);
            }).catch((err: any) => {
               console.error("Error al limpiar el escáner después del éxito:", err);
               setIsScanning(false);
               onScanSuccess(decodedText); // Proceed anyway
            });
          }
        };

        const failureCallback = (errorMessage: string) => {
          // console.debug(`Error de escaneo: ${errorMessage}`);
          // Don't set internalError for typical scan failures, only for setup/critical issues.
        };
        
        html5QrcodeScanner.render(successCallback, failureCallback);

      } catch (error: any) {
        console.error('Error al inicializar el escáner QR:', error);
        setInternalError(`Error al iniciar escáner: ${error.message}. Asegúrate de permitir el acceso a la cámara.`);
        setIsScanning(false);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err: any) => {
          console.error("Error al limpiar el escáner al desmontar:", err);
        });
        scannerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScanSuccess]); // Rerun if onScanSuccess changes, though it usually shouldn't.

  const displayError = externalError || internalError;

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 md:p-6 ${COLORS.primary} animate-fadeIn`}> {/* Removed pb-28 */}
      <div className={`w-full max-w-md mx-auto p-6 md:p-8 rounded-xl shadow-2xl ${COLORS.secondary}`}>
        <QrCodeIcon className={`w-16 h-16 ${COLORS.textAccent} mx-auto mb-6`} />
        <h1 className={`text-3xl font-cinzel-decorative font-bold text-center mb-4 ${COLORS.textPrimary}`}>Escanear Código QR</h1>
        <p className={`text-sm ${COLORS.textSecondary} text-center mb-6 px-2`}>
          Apunta la cámara al código QR del libro. Asegúrate de que esté bien iluminado y centrado.
        </p>
        
        <div 
          id="qr-reader" 
          className="w-full mb-6 rounded-lg overflow-hidden border-2 border-slate-700 bg-slate-900"
          style={{ minHeight: '250px' }} // Ensure space for the scanner view
        />
        
        {isScanning && !displayError && (
          <p className={`text-sm ${COLORS.textSecondary} text-center mb-4`}>
            Buscando código QR...
          </p>
        )}
        
        {displayError && (
          <p className="text-red-400 text-sm bg-red-900/30 p-3 rounded-md text-center mb-4 border border-red-500/50">
            Error: {displayError}
          </p>
        )}
        
        <Button onClick={onBack} variant="secondary" className="w-full">Volver</Button>
      </div>
    </div>
  );
};
    