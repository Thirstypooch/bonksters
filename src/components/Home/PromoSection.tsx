
import React from 'react';

const PromoSection = () => {
  return (
    <div className="bg-bonkster-blue rounded-lg overflow-hidden shadow-md mb-8">
      <div className="p-4 md:p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              30% OFF YOUR FIRST ORDER! 🎉
            </h3>
            <p className="mb-4 md:mb-0">
              Use code <span className="font-bold">HUNGRY30</span> at checkout
            </p>
          </div>
          <button className="bg-white text-bonkster-blue px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
