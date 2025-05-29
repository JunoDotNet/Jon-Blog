'use client';
import { useClock } from '../../lib/useClock';
import { useState, useEffect } from 'react';

const ClockApp = () => {
  const rawTime = useClock();
  const [showColon, setShowColon] = useState(true);

  // Toggle the colon every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setShowColon((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Split time into parts
  const [hour, minute] = rawTime.split(':');
  const minutePart = minute.slice(0, 2); // drop any AM/PM
  const suffix = minute.slice(2); // like " PM"

  return (
    <div className="w-full h-full p-6 bg-white text-black text-6xl font-mono flex items-center justify-center">
      <span>{hour}</span>
      <span className={showColon ? 'opacity-100' : 'opacity-0 transition-opacity duration-300'}>:</span>
      <span>{minutePart}</span>
      <span className="text-2xl ml-2">{suffix}</span>
    </div>
  );
};

export default ClockApp;
