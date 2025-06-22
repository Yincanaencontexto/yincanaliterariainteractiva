
import React, { useState, useEffect, useCallback } from 'react';
import { ScreenView, Challenge } from './types';
import { DESAFIOS, COLORS } from './constants'; // Assuming COLORS might be used for main layout if needed

import { SplashScreen } from './components/screens/SplashScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ManualKeyValidationScreen } from './components/screens/ManualKeyValidationScreen';
import { QRScannerScreen } from './components/screens/QRScannerScreen';
import { BookWordValidationScreen } from './components/screens/BookWordValidationScreen';
import { QuestionScreen } from './components/screens/QuestionScreen';
import { SuccessScreen } from './components/screens/SuccessScreen';
import { CompletionScreen } from './components/screens/CompletionScreen';
import { BottomNavigationBar } from './components/BottomNavigationBar';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ScreenView>(ScreenView.SPLASH);
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const savedChallenges = localStorage.getItem('yincanaChallenges');
    return savedChallenges ? JSON.parse(savedChallenges) : DESAFIOS.map(d => ({ ...d, completed: false }));
  });
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [score, setScore] = useState<number>(() => {
    const savedScore = localStorage.getItem('yincanaScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  const [error, setError] = useState<string | null>(null);

  const totalScore = DESAFIOS.reduce((sum, challenge) => sum + challenge.points, 0);

  useEffect(() => {
    localStorage.setItem('yincanaChallenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('yincanaScore', score.toString());
  }, [score]);

  const handleStart = useCallback(() => {
    const allCompleted = challenges.every(c => c.completed);
    if (allCompleted && challenges.length > 0) { // check challenges not empty
      setCurrentView(ScreenView.COMPLETION);
    } else {
      setCurrentView(ScreenView.HOME);
    }
    setError(null);
  }, [challenges]);

  const handleChallengeSelect = useCallback((challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setError(null);
    setCurrentView(ScreenView.MANUAL_KEY_VALIDATION);
  }, []);

  const handleValidateKey = useCallback((key: string) => {
    if (currentChallenge && key === currentChallenge.apiKey) {
      setCurrentView(ScreenView.BOOK_WORD_VALIDATION);
      setError(null);
    } else {
      setError("Clave secreta incorrecta. Inténtalo de nuevo o revisa el libro.");
      // Stay on current screen (QR or Manual)
    }
  }, [currentChallenge]);

  const handleValidateWord = useCallback((word: string) => {
    if (currentChallenge && word.toLowerCase() === currentChallenge.bookWord.toLowerCase()) {
      setCurrentView(ScreenView.QUESTION);
      setError(null);
    } else {
      setError("Palabra del libro incorrecta. Revisa la pista y el libro con atención.");
    }
  }, [currentChallenge]);

  const handleBackNavigation = useCallback(() => {
    setError(null);
    switch (currentView) {
      case ScreenView.MANUAL_KEY_VALIDATION:
        setCurrentView(ScreenView.HOME);
        setCurrentChallenge(null); // Clear current challenge when going back to home
        break;
      case ScreenView.QR_SCANNER: 
        // Navigate back to ManualKeyValidationScreen, keeping currentChallenge
        setCurrentView(ScreenView.MANUAL_KEY_VALIDATION);
        break;
      case ScreenView.BOOK_WORD_VALIDATION:
        setCurrentView(ScreenView.MANUAL_KEY_VALIDATION);
        break;
      case ScreenView.QUESTION:
        setCurrentView(ScreenView.BOOK_WORD_VALIDATION);
        break;
      case ScreenView.SUCCESS: // From success, continue to home
      case ScreenView.COMPLETION: // From completion, restart takes to home
        setCurrentView(ScreenView.HOME);
        setCurrentChallenge(null);
        break;
      default:
        setCurrentView(ScreenView.HOME);
        setCurrentChallenge(null);
    }
  }, [currentView]);

  const handleNavigate = useCallback((view: ScreenView) => {
    setCurrentView(view);
    setError(null);
    if (view === ScreenView.HOME) {
        setCurrentChallenge(null); // Clear challenge selection when navigating to home explicitly
    }
  }, []);
  
  const handleNavigateToScanQR = useCallback(() => {
    setCurrentView(ScreenView.QR_SCANNER);
    setError(null);
  }, []);

  const handleSubmitAnswer = useCallback((answer: string) => {
    if (currentChallenge && answer.toLowerCase() === currentChallenge.correctAnswer.toLowerCase()) {
      if (!currentChallenge.completed) { // Only add score if not already completed
        setChallenges(prev => prev.map(c =>
          c.id === currentChallenge.id ? { ...c, completed: true } : c
        ));
        setScore(prev => prev + currentChallenge.points);
      }
      setCurrentView(ScreenView.SUCCESS);
      setError(null);
    } else {
      setError("Respuesta incorrecta. ¡No te rindas, revisa la pista del libro!");
    }
  }, [currentChallenge]);

  const handleSuccessContinue = useCallback(() => {
    const allCompleted = challenges.every(c => c.completed);
    if (allCompleted) {
      setCurrentView(ScreenView.COMPLETION);
    } else {
      setCurrentView(ScreenView.HOME);
    }
    // currentChallenge is kept for SuccessScreen, but cleared when moving to Home/Completion
    // setCurrentChallenge(null); // This is handled by handleBackNavigation or explicit navigation
  }, [challenges]);

  const handleRestart = useCallback(() => {
    setChallenges(DESAFIOS.map(d => ({ ...d, completed: false })));
    setScore(0);
    setCurrentChallenge(null);
    setError(null);
    setCurrentView(ScreenView.SPLASH); // Or ScreenView.HOME
  }, []);

  const renderScreen = () => {
    switch (currentView) {
      case ScreenView.SPLASH:
        return <SplashScreen onStart={handleStart} />;
      case ScreenView.HOME:
        return <HomeScreen challenges={challenges} onChallengeSelect={handleChallengeSelect} score={score} totalScore={totalScore} />;
      case ScreenView.MANUAL_KEY_VALIDATION:
        return <ManualKeyValidationScreen challenge={currentChallenge} onValidateKey={handleValidateKey} onBack={handleBackNavigation} onNavigateToScanQR={handleNavigateToScanQR} error={error} />;
      case ScreenView.QR_SCANNER:
        return <QRScannerScreen onScanSuccess={handleValidateKey} onBack={handleBackNavigation} error={error} />;
      case ScreenView.BOOK_WORD_VALIDATION:
        return <BookWordValidationScreen challenge={currentChallenge} onValidateWord={handleValidateWord} onBack={handleBackNavigation} error={error} />;
      case ScreenView.QUESTION:
        return <QuestionScreen challenge={currentChallenge} onSubmitAnswer={handleSubmitAnswer} onBack={handleBackNavigation} error={error} />;
      case ScreenView.SUCCESS:
        return <SuccessScreen challenge={currentChallenge} onContinue={handleSuccessContinue} />;
      case ScreenView.COMPLETION:
        return <CompletionScreen score={score} totalScore={totalScore} onRestart={handleRestart} />;
      default:
        return <div className="flex items-center justify-center min-h-screen">Vista no encontrada</div>;
    }
  };

  // Determine if BottomNavigationBar should be visible
  const showBottomNav = currentView !== ScreenView.SPLASH;


  return (
    <div className={`min-h-screen flex flex-col ${COLORS.primary}`}>
      <main className="flex-grow pb-24"> {/* Added pb-24 here */}
        {renderScreen()}
      </main>
      {showBottomNav && <BottomNavigationBar currentView={currentView} onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;
