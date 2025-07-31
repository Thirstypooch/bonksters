
import React from 'react';
import Image from 'next/image';

interface TrendingItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const TRENDING_ITEMS: TrendingItemProps[] = [
  {
    id: '1',
    name: 'Biryani',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Sushi Rolls',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Burgers',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
  },
];

const TrendingSection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Trending Now</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {TRENDING_ITEMS.map((item) => (
          <div 
            key={item.id}
            className="relative rounded-lg overflow-hidden h-48 group cursor-pointer"
          >
            <Image
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg">
                  Trending: {item.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
