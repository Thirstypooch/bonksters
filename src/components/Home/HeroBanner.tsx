
import React from 'react';

const HeroBanner = () => {
  return (
    <div className="relative bg-bonkster-orange overflow-hidden rounded-lg shadow-md mb-6">
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            30% OFF YOUR FIRST ORDER!
          </h1>
          <p className="text-white text-lg mb-6">
            Use code <span className="font-bold">HUNGRY30</span> at checkout
          </p>
          <button className="bg-white text-bonkster-orange px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
            Order Now
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
        <div className="w-40 h-40 bg-bonkster-blue opacity-20 rounded-full"></div>
      </div>
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden md:block">
        <div className="relative">
          <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center animate-bounce-slight">
            <div className="font-display font-bold text-bonkster-orange text-4xl">🎉</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
