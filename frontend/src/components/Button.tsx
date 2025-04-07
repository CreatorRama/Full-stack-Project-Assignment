import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  type = 'button', 
  onClick, 
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 bg-[#2E3B62] text-white font-medium rounded-md 
                  hover:bg-[#3A4978] transition-colors duration-300 focus:outline-none 
                  focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 
                  disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
