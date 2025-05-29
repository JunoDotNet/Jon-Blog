// src/components/NavigationButtons.tsx
import React from 'react';

interface QuitButtonProps {
  goQuit?: () => void;
}

const QuitButton: React.FC<QuitButtonProps> = ({ goQuit }) => {
  const handleQuit = () => {
    if (goQuit) goQuit();
    else window.location.href = '/'; // Fallback
  };

  return (
    <button 
      onClick={handleQuit}
      className="bg-white text-red-500 p-3 rounded-full shadow hover:bg-red-100 absolute bottom-10 left-10 z-50"
    >
      Quit
    </button>
  );
};

export default QuitButton;

