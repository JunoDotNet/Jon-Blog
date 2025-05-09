import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 text-white text-3xl py-4 px-6 shadow-md">
        <h1 className="font-semibold">Windows XP Retro</h1>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-200 p-4 shadow-md">
        <ul className="flex space-x-4">
          <li><a href="/about" className="text-blue-600 hover:text-blue-800">About</a></li>
          <li><a href="/blog" className="text-blue-600 hover:text-blue-800">Blog</a></li>
          <li><a href="/contact" className="text-blue-600 hover:text-blue-800">Contact</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-grow px-6 py-8">
        <section className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-500">Welcome to the Retro Experience</h2>
            <p>Experience the nostalgia of the Windows XP interface!</p>
            {/* XP Styled Button */}
            <div className="mt-4">
              <button className="bg-blue-500 text-black px-4 py-2 rounded">XP Styled Button</button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-500">Start Your Journey</h2>
            <p>Explore our various pages and resources.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-4">
        <p className="text-sm">© 2025 Windows XP Retro</p>
      </footer>
    </div>
  );
};

export default HomePage;
