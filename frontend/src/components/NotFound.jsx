import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const [typed, setTyped] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const text = 'Page Not Found';
    let i = 0;
    const interval = setInterval(() => {
      setTyped((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 text-blue-600 font-sans">
      <motion.div 
        className="w-full max-w-3xl text-center relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Element */}
        <div className="absolute -z-10 inset-0 flex items-center justify-center opacity-5">
          <svg viewBox="0 0 800 600" className="w-full h-full">
            <rect width="100%" height="100%" fill="white" />
            <text
              x="50%"
              y="40%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="40"
              fontFamily="sans-serif"
              fill="#2563eb" /* blue-600 */
            >
              404: File Not Found
            </text>
          </svg>
        </div>

        {/* 404 Heading */}
        <motion.h1 
          className="text-9xl md:text-[160px] font-black leading-none text-blue-600"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        >
          404
        </motion.h1>

        {/* Main Content */}
        <motion.div 
          className="bg-white border-2 border-blue-600/40 rounded-xl p-6 mb-8 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl mb-4 text-blue-600 font-semibold">
            {typed}
            <span className="animate-pulse text-blue-600">|</span>
          </h2>

          {/* Error Information */}
          <div className="bg-blue-50 text-blue-600 font-mono text-sm p-4 rounded-lg border border-blue-600/20 mt-4 text-left max-w-xl mx-auto">
            <p>We've searched everywhere, but we couldn't find the page you're looking for.</p>
            <p className="mt-2 font-medium">Please check the URL or try one of the options below.</p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search our site..."
                className="flex-1 bg-white border border-blue-600/30 text-blue-600 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors"
                onClick={() => window.location.href = `/search?q=${searchQuery}`}
              >
                Search
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/homepage" 
                className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300 text-center min-w-[140px] shadow-md"
              >
                Go Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
              <button 
                onClick={() => window.history.back()} 
                className="inline-block px-8 py-3 rounded-lg bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 transition duration-300 text-center min-w-[140px] shadow-sm"
              >
                Go Back
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
            <rect x="70" y="10" width="60" height="80" fill="#f0f5ff" stroke="#2563eb" strokeWidth="2" rx="4" />
            <rect x="80" y="20" width="40" height="6" fill="#2563eb" rx="2" />
            <rect x="80" y="30" width="40" height="6" fill="#2563eb" rx="2" />
            <rect x="80" y="40" width="25" height="6" fill="#2563eb" rx="2" />
            <text x="100" y="65" fontFamily="monospace" fontSize="16" fill="#2563eb" textAnchor="middle">404</text>
            <path d="M60,100 C60,80 140,80 140,100" stroke="#2563eb" strokeWidth="2" fill="none" />
            <circle cx="60" cy="100" r="4" fill="#2563eb" />
            <circle cx="140" cy="100" r="4" fill="#2563eb" />
          </svg>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-sm text-blue-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p>Need help? <a href="/support" className="underline hover:text-blue-800">Contact Support</a></p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;