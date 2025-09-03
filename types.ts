
export enum ScreenView {
  SPLASH = 'SPLASH',
  HOME = 'HOME',
  MANUAL_KEY_VALIDATION = 'MANUAL_KEY_VALIDATION',
  QR_SCANNER = 'QR_SCANNER',
  BOOK_WORD_VALIDATION = 'BOOK_WORD_VALIDATION',
  QUESTION = 'QUESTION',
  SUCCESS = 'SUCCESS',
  COMPLETION = 'COMPLETION',
}

export interface Challenge {
  id: number;
  name: string;
  apiKey: string;
  bookWord: string;
  points: number;
  completed: boolean;
  questionPrompt: string;
  correctAnswer: string;
  successMessage: string;
  answerHintInBook: string;
  bookWordLocationHint: string;
  nextQrHint: string | null;
  qrCodeLocationHint: string; // Hint for finding the QR code in the book
  manualKeyHint: string; // Hint for finding the manual key (textual apiKey)
}

export interface ColorsConfig {
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  border: string;
  buttonPrimary: string;
  buttonSecondary: string;
}

declare global {
  interface Window {
    Html5QrcodeScanner: any; 
  }
}
