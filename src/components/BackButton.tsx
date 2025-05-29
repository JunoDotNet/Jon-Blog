import { button } from 'framer-motion/client';
import React from 'react';

interface BackButtonProps {
    goBack: () => void;
    label?: string;
    className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ goBack, label = 'Back', className =''}) => {
    return(
        <button
            onClick={goBack}
            className={`p-2 bg-green-600 text-black rounded-md mt-4 ${className}`}
        >
            ← {label}
        </button>
    );
};

export default BackButton;