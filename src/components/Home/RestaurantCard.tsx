
import React from 'react';
import Link from 'next/link';
import { Star, Clock } from 'lucide-react';
import Image from 'next/image';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string | null;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  deliveryTime,
  deliveryFee,
}) => {
  return (
    <Link href={`/restaurant/${id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="h-36 overflow-hidden">
          <Image
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{name}</h3>
          
          <div className="flex items-center text-sm mt-2">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-gray-700">{rating}</span>
            </div>
            <div className="mx-2 text-gray-300">•</div>
            <div className="flex items-center">
              <Clock size={14} className="text-gray-500" />
              <span className="ml-1 text-gray-700">{deliveryTime}</span>
            </div>
          </div>
          
          <div className="mt-2 text-sm">
            {deliveryFee ? (
              <span className="text-gray-600">${deliveryFee} Delivery</span>
            ) : (
              <span className="text-bonkster-blue font-medium">Free Delivery</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
