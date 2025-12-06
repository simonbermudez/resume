'use client';

import { useState } from 'react';
import ThreeScene from '@/components/ThreeScene';
import Footer from '@/components/Footer';

export default function Home() {
  const [showFooter, setShowFooter] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      
      <ThreeScene onShowFooter={setShowFooter} onError={setError} />
      <Footer visible={showFooter} />
    </div>
  );
}
