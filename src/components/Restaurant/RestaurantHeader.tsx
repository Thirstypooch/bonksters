
import React from 'react';
import { ArrowLeft, Star, Clock } from 'lucide-react';
import Link from "next/link";

interface RestaurantHeaderProps {
  name: string;
  coverImage: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  name,
  coverImage,
  rating,
  deliveryTime,
  deliveryFee,
}) => {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 md:h-64 w-full overflow-hidden">
        <img
          src={coverImage}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>
      
      {/* Restaurant Info */}
      <div className="bg-white border-b border-gray-200 pb-4">
        <div className="container mx-auto px-4 -mt-8 relative">
          <div className="bg-white rounded-t-lg shadow-sm p-4 border border-gray-100">
            <h1 className="text-2xl font-bold mb-2">{name}</h1>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                <span>{rating}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={14} className="text-gray-500 mr-1" />
                <span>{deliveryTime}</span>
              </div>
              
              <div>
                {deliveryFee === "Free" ? (
                  <span className="text-bonkster-blue font-medium">Free Delivery</span>
                ) : (
                  <span>${deliveryFee} Delivery Fee</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
