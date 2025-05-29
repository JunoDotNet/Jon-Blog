'use client';

const WelcomeApp = () => {
  return (
    <div className="w-full h-full p-4 text-black bg-white overflow-auto">
      <p>Welcome to my portfolio site!</p>
      <p className="mt-2">
        This interface is inspired by Windows XP — everything is interactive:
      </p>
      <ul className="list-disc list-inside mt-2 text-sm">
        <li>Click desktop icons to open pages like Blog or About Me.</li>
        <li>Use the taskbar’s Start button (coming soon!) for navigation.</li>
        <li>Close or drag windows just like a real desktop.</li>
      </ul>
      <p className="mt-3 italic text-gray-700">
        Have fun exploring — and feel free to peek at the code on GitHub!
      </p>
    </div>
  );
};

export default WelcomeApp;
