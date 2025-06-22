
import React from 'react';
import { ScreenView } from '../types';
import { COLORS } from '../constants';
import { HomeIcon } from './icons/HomeIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { KeyIcon } from './icons/KeyIcon';

interface BottomNavigationBarProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
  // unlockedChallengesCount: number; // This prop was in original, but not used. Removing for now.
}

interface NavItem {
  view: ScreenView;
  label: string;
  icon: React.ElementType; // React.FC<IconProps>
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ currentView, onNavigate }) => {
  const navItems: NavItem[] = [
    { view: ScreenView.HOME, label: "Inicio", icon: HomeIcon },
    // Removed direct nav to QR and Key from here as per new flow.
    // They are now accessed contextually from ManualKeyValidationScreen or by starting a challenge.
    // If global access to QR scanner is desired, it can be re-added.
    // For now, this simplifies navigation based on the user's request context.
  ];
  
  // Specific views where bottom nav should be simpler or different
   if (currentView === ScreenView.MANUAL_KEY_VALIDATION || 
       currentView === ScreenView.BOOK_WORD_VALIDATION ||
       currentView === ScreenView.QUESTION ||
       currentView === ScreenView.QR_SCANNER
    ) {
    // A simplified nav bar or just a home button for challenge-related screens
    return (
      <nav className={`fixed bottom-0 left-0 right-0 ${COLORS.secondary} border-t ${COLORS.border} shadow-top flex justify-around items-center py-2 px-1 z-50`}>
        <button
          onClick={() => onNavigate(ScreenView.HOME)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ${COLORS.textSecondary} hover:${COLORS.textPrimary}`}
        >
          <HomeIcon className="w-7 h-7 mb-1" />
          <span className="text-sm font-medium">Inicio</span>
        </button>
      </nav>
    );
  }


  // Default navigation bar for Home, Success, etc.
  // The original navItems had direct access to QR and Key.
  // New approach: Key/QR are part of the challenge flow.
  // So, the bottom bar might mostly be for 'Home'.
  // If the user selects a challenge, they go to ManualKeyValidation.
  // ManualKeyValidation has its own "Scan QR" button.
  // So, the global "Scan QR" and "Enter Key" in bottom nav might be redundant or confusing.
  // For now, let's keep it simple with just Home for other screens.
  
  // The old nav items were:
  // { view: ScreenView.HOME, label: "Inicio", icon: HomeIcon },
  // { view: ScreenView.QR_SCANNER, label: "Escanear QR", icon: QrCodeIcon },
  // { view: ScreenView.MANUAL_KEY_VALIDATION, label: "Ingresar Clave", icon: KeyIcon },

  // A more restricted set for general navigation:
  const generalNavItems: NavItem[] = [
     { view: ScreenView.HOME, label: "Inicio", icon: HomeIcon },
  ];


  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${COLORS.secondary} border-t ${COLORS.border} shadow-top flex justify-around items-center py-2 px-1 z-50`}>
      {generalNavItems.map(item => (
        <button
          key={item.view}
          onClick={() => onNavigate(item.view)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 w-1/3 ${ // w-1/3 if 3 items, adjust as needed
            currentView === item.view 
              ? `${COLORS.textAccent} bg-amber-500/10` 
              : `${COLORS.textSecondary} hover:${COLORS.textPrimary}`
          }`}
        >
          <item.icon className="w-7 h-7 mb-1" />
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
    