'use client';

import { useEffect, useState } from 'react';
import ThreeScene from '@/components/ThreeScene';
import Footer from '@/components/Footer';

export default function Home() {
  const [showFooter, setShowFooter] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  // Restore the saved theme preference on mount.
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setDarkMode(saved === 'dark');
  }, []);

  // Persist the preference and toggle the page background.
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {error && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="text-red-500 text-2xl font-mono mb-4">
            Error Loading Experience
          </div>
          <div className="text-white text-sm font-mono max-w-md text-center">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-white text-black font-mono rounded hover:bg-gray-200 transition-colors"
          >
            Reload Page
          </button>
        </div>
      )}

      <button
        onClick={() => setDarkMode((d) => !d)}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`fixed top-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-lg backdrop-blur-sm transition-colors ${
          darkMode
            ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
            : 'border-black/10 bg-black/5 text-black hover:bg-black/10'
        }`}
      >
        {darkMode ? '☀' : '☾'}
      </button>

      <ThreeScene onShowFooter={setShowFooter} onError={setError} darkMode={darkMode} />
      <Footer visible={showFooter} darkMode={darkMode} />
    </div>
  );
}
