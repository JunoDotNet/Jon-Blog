'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useClock } from '../lib/useClock';



const DraggableWindow = dynamic(() => import('../components/DraggableWindow'), {
  ssr: false,
});
const AboutApp = dynamic(() => import('../components/apps/AboutApp'), { ssr: false });
const WelcomeApp = dynamic(() => import('../components/apps/WelcomeApp'), { ssr: false });
const ContactApp = dynamic(() => import('../components/apps/ContactApp'), { ssr: false });
const ClockApp = dynamic(() => import('../components/apps/ClockApp'), { ssr: false });






const HomePage = () => {
  const [showWindow, setShowWindow] = useState(true);
  const [showResume, setShowResume] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showClock, setShowClock] = useState(false);
  const time = useClock();
  
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/notbliss.png')" }}>

      {showWindow && (
        <DraggableWindow
          title="Welcome"
          onClose={() => setShowWindow(false)}
          resizable={true}
          width={600}
          height="auto"
          initialX={550}
          initialY={10}
        >
          <WelcomeApp />
        </DraggableWindow>
      )}



      {showResume && (
        <DraggableWindow
          title="Resume — QA Engineer (UI/UX)"
          onClose={() => setShowResume(false)}
          resizable={false}
          width={900}
          height={650}
        >
          <iframe
            src="/Jon%20Wickerd%20%E2%80%94%20QA%20Engineer%20Role%20(UI_UX-Focused).pdf"
            title="Jon Wickerd Resume"
            className="w-full h-full border border-gray-300"
          />
        </DraggableWindow>
      )}

      {showAbout && (
      <DraggableWindow
        title="About Me"
        onClose={() => setShowAbout(false)}
        resizable={false}
        width={1200}
        height={700}
        initialX={50}
        initialY={20}
      >
        <AboutApp />
      </DraggableWindow>
    )}

    {showContact && (
      <DraggableWindow
        title="Contact"
        onClose={() => setShowContact(false)}
        resizable={false}
        width={1000}
        height={500}
        initialX={80}
        initialY={40}
      >
        <ContactApp />
      </DraggableWindow>
    )}

    {showClock && (
      <DraggableWindow
        title="Clock"
        onClose={() => setShowClock(false)}
        resizable={true}
        width={600}
        height={150}
        initialX={200}
        initialY={80}
      >
        <ClockApp />
      </DraggableWindow>
    )}
      
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col space-y-4">
        <Link href="/blog" className="flex flex-col items-center cursor-pointer group">
          <img src="/xp icons/ICON/49.ico" alt="My Blog" className="w-12 h-12 group-hover:scale-105 transition" />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">My Blog</span>
        </Link>

        <div
          onClick={() => setShowResume(true)}
          className="flex flex-col items-center cursor-pointer group"
        >
          <img
            src="/xp icons/ICON/497.ico"
            alt="Resume"
            className="w-12 h-12 group-hover:scale-105 transition"
          />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">Resume</span>
        </div>

        <a href="https://www.linkedin.com/in/jonathan-wickerd-b85240178/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center cursor-pointer group">
          <img src="/xp icons/ICON/633.ico" alt="LinkedIn" className="w-12 h-12 group-hover:scale-105 transition" />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">LinkedIn</span>
        </a>

        <a href="https://github.com/JunoDotNet" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center cursor-pointer group">
          <img src="/xp icons/ICON/98.ico" alt="GitHub" className="w-12 h-12 group-hover:scale-105 transition" />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">GitHub</span>
        </a>

        <div
          onClick={() => setShowAbout(true)}
          className="flex flex-col items-center cursor-pointer group"
        >
          <img src="/xp icons/ICON/1111.ico" alt="About Me" className="w-12 h-12 group-hover:scale-105 transition" />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">About Me</span>
        </div>


        <div
          onClick={() => setShowContact(true)}
          className="flex flex-col items-center cursor-pointer group"
        >
          <img src="/xp icons/ICON/1086.ico" alt="Contact" className="w-12 h-12 group-hover:scale-105 transition" />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">Contact</span>
        </div>

        <div onClick={() => setShowClock(true)} className="flex flex-col items-center cursor-pointer group">
          <img src="/xp icons/ICON/166.ico" alt="Clock" className="w-12 h-12 group-hover:scale-105 transition" />
          <span className="text-white text-sm mt-1 text-center group-hover:underline">Clock</span>
        </div>


      </div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 w-full">
        <div className="taskbar flex items-center justify-between h-12 px-2">
          {/* Start Button */}
          <button className="start-button flex items-center gap-2 px-3 py-1">
            <img src="/xp icons/ICON/622.ico" alt="Start" className="w-5 h-5" />
            <span className="font-bold text-black text-sm">Start</span>
          </button>

          {/* Quick Launch / Middle */}
          <div className="flex-1 flex items-center space-x-2 ml-4">
            {/* Add more quick launch icons here if needed */}
          </div>

          {/* Clock */}
          <div className="text-sm text-black mr-2 font-mono">{time}</div>

        </div>
      </div>

    </div>
  );
};

export default HomePage;
