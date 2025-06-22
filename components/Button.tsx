
import React from 'react';
import { COLORS } from '../constants';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
}) => {
  const baseStyle = "px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center gap-2";
  const variantStyle = variant === 'primary' 
    ? `${COLORS.buttonPrimary} ${COLORS.textPrimary} focus:ring-amber-400`
    : `${COLORS.buttonSecondary} ${COLORS.textPrimary} focus:ring-slate-500`;
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""; // Prevent scale on hover when disabled

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${disabledStyle} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
    