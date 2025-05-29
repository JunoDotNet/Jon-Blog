// src/components/SearchButton.tsx
import React from 'react';

interface SearchButtonProps {
  goToSearch: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ goToSearch }) => {
  return (
    <button
      onClick={goToSearch}
      className="p-2 bg-green-600 text-black rounded-md mt-4"
    >
      Go to Search
    </button>
  );
};

export default SearchButton;
