// src/components/HomeButton.tsx
import React from 'react';

interface HomeButtonProps {
  goToHome: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = ({ goToHome }) => {
  return (
    <button
      onClick={goToHome}
      className="p-2 bg-green-600 text-black rounded-md mt-4"
    >
      Go to Home
    </button>
  );
};

export default HomeButton;
