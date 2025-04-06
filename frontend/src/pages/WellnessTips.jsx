import React, { useState, useEffect } from 'react';

export default function WellnessTips() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [animate, setAnimate] = useState(false);

  const categories = ['all', 'nutrition', 'exercise', 'mental', 'sleep'];

  const wellnessTips = [
    {
      id: 1,
      category: 'nutrition',
      title: 'Stay Hydrated',
      description: "Drink 8 glasses of water daily. It helps maintain body functions, improves digestion, and gives your skin a healthy glow.",
      icon: '💧',
      color: 'bg-blue-100',
      borderColor: 'border-blue-300'
    },
    {
      id: 2,
      category: 'exercise',
      title: 'Daily Walk',
      description: "Take a 30-minute walk daily to boost cardiovascular health, improve mood, and maintain healthy weight.",
      icon: '🚶',
      color: 'bg-green-100',
      borderColor: 'border-green-300'
    },
    {
      id: 3,
      category: 'mental',
      title: 'Mindful Breaks',
      description: "Practice 5-minute mindfulness during work breaks. It reduces stress, improves focus, and enhances overall wellbeing.",
      icon: '🧘',
      color: 'bg-purple-100',
      borderColor: 'border-purple-300'
    },
    {
      id: 4,
      category: 'sleep',
      title: 'Consistent Sleep Schedule',
      description: "Maintain a regular sleep and wake time, even on weekends. This regulates your body clock and improves sleep quality.",
      icon: '😴',
      color: 'bg-indigo-100',
      borderColor: 'border-indigo-300'
    },
    {
      id: 5,
      category: 'nutrition',
      title: 'Colorful Plates',
      description: "Fill your plate with a variety of colorful fruits and vegetables to ensure you get a wide range of essential nutrients.",
      icon: '🥗',
      color: 'bg-blue-100',
      borderColor: 'border-blue-300'
    },
    {
      id: 6,
      category: 'exercise',
      title: 'Strength Training',
      description: "Include strength exercises at least twice a week to maintain muscle mass and support bone health.",
      icon: '💪',
      color: 'bg-green-100',
      borderColor: 'border-green-300'
    },
    {
      id: 7,
      category: 'mental',
      title: 'Digital Detox',
      description: "Take regular breaks from screens and social media to reduce stress and improve real-life connections.",
      icon: '📵',
      color: 'bg-purple-100',
      borderColor: 'border-purple-300'
    },
    {
      id: 8,
      category: 'sleep',
      title: 'Bedtime Routine',
      description: "Create a relaxing pre-sleep routine to signal your body it's time to wind down and prepare for rest.",
      icon: '🌙',
      color: 'bg-indigo-100',
      borderColor: 'border-indigo-300'
    },
  ];

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredTips = activeCategory === 'all'
    ? wellnessTips
    : wellnessTips.filter(tip => tip.category === activeCategory);

  const getCategoryEmoji = (category) => {
    switch(category) {
      case 'all': return '✨';
      case 'nutrition': return '🍎';
      case 'exercise': return '🏃';
      case 'mental': return '🧠';
      case 'sleep': return '💤';
      default: return '✨';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Daily Wellness Tips</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Simple practices for a healthier and more balanced lifestyle.</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow 
            ${activeCategory === cat 
              ? 'bg-blue-500 text-white transform scale-105' 
              : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            <span>{getCategoryEmoji(cat)}</span>
            <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
          </button>
        ))}
      </div>

      {/* Tips List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTips.map(tip => (
          <div 
            key={tip.id} 
            className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 
            ${tip.color} ${tip.borderColor} border hover:shadow-lg
            ${animate ? 'transform scale-95 opacity-0' : 'transform scale-100 opacity-100'}`}
          >
            <div className="p-6">
              <div className="text-4xl mb-4">{tip.icon}</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{tip.title}</h2>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTips.length === 0 && (
        <div className="text-center p-10">
          <p className="text-gray-500 text-lg">No tips available for this category.</p>
        </div>
      )}
      
      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>Choose a category to filter tips or view all for complete wellness.</p>
      </div>
    </div>
  );
}