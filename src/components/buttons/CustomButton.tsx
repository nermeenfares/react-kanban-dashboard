import React from 'react';

interface CustomButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  type = 'button',
  onClick,
  isLoading = false,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-2 rounded-md text-white transition duration-200 ease-in-out 
        ${isLoading || disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-blue-700'} 
        ${className}`}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
};

export default CustomButton;
