'use client';

import React, { useState, useEffect, ReactNode } from 'react';

interface FramedSlideProps {
  children: ReactNode;
  frameSrc: string;
  baseWidth?: number;
  baseHeight?: number;
}

const FramedSlide: React.FC<FramedSlideProps> = ({
  children,
  frameSrc,
  baseWidth = 896,
  baseHeight = 504,
}) => {
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;

      if (width < 640) setScale(1.0);
      else if (width < 768) setScale(1.1);
      else if (width < 1024) setScale(1.25);
      else if (width < 1440) setScale(1.5);
      else setScale(1.75);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="relative ml-50"
        style={{ width: `${baseWidth}px`, height: `${baseHeight}px` }}
      >
        <img
          src={frameSrc}
          alt="Frame"
          className="absolute top-0 left-0 w-full h-full object-fill z-0 pointer-events-none"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center',
          }}
        />

        <div className="relative z-10 w-full h-full px-10 pt-2 pb-4 text-white">

          {children}
        </div>
      </div>
    </div>
  );
};

export default FramedSlide;
