import React from 'react';

const PromoSection = () => {
  // A new, vibrant image that works well with a dark overlay
  const promoImageUrl = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1920&auto=format&fit=crop';

  return (
      <div
          className="relative bg-cover bg-center rounded-lg overflow-hidden shadow-md mb-8"
          style={{ backgroundImage: `url(${promoImageUrl})` }}
      >
        {/* This solid overlay darkens the image to make the white text stand out */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative p-4 md:p-6 text-white">
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