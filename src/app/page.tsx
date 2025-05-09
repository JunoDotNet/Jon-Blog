import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/notbliss.png')" }}>
      
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col space-y-4">
        <Link href="/blog" className="flex flex-col items-center cursor-pointer group">
          <img src="/icons/Book Disc.ico" alt="My Blog" className="w-12 h-12 group-hover:scale-105 transition" />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">My Blog</span>
        </Link>
        <Link href="/about" className="flex flex-col items-center cursor-pointer group">
          <img src="/icons/Builder.ico" alt="About Me" className="w-12 h-12 group-hover:scale-105 transition" />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">About Me</span>
        </Link>
        <Link href="/contact" className="flex flex-col items-center cursor-pointer group">
          <img src="/icons/mail.ico" alt="Contact" className="w-12 h-12 group-hover:scale-105 transition" />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">Contact</span>
        </Link>
      </div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 w-full">
        <div className="window bg-gray-200 flex items-center justify-between h-12 border-t-2 border-gray-400">
          {/* Start Button */}
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-1 ml-2 rounded hover:bg-green-700">
            <img src="/icons/start.png" alt="Start" className="w-5 h-5" />
            <span className="font-bold">Start</span>
          </button>

          {/* Quick Launch / Middle */}
          <div className="flex-1 flex items-center space-x-2 ml-4">
            {/* Add more quick launch icons here if needed */}
          </div>

          {/* Clock */}
          <div className="mr-4 text-sm text-black">
            {/* Static clock for now */}
            3:14 PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
