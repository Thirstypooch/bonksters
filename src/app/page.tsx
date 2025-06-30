import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import HeroBanner from '@/components/Home/HeroBanner';
import CategoryScroller from '@/components/Home/CategoryScroller';
import RestaurantCard from '@/components/Home/RestaurantCard';
import TrendingSection from '@/components/Home/TrendingSection';
import PromoSection from '@/components/Home/PromoSection';

// Mock data
const restaurantData = [
  {
    id: '1',
    name: 'Burger Joint',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
    rating: 4.5,
    deliveryTime: '30 min',
    deliveryFee: '5.99',
  },
  {
    id: '2',
    name: 'Pizza Palace',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop',
    rating: 4.2,
    deliveryTime: '25 min',
    deliveryFee: null,
  },
  {
    id: '3',
    name: 'Sushi Heaven',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=300&fit=crop',
    rating: 4.8,
    deliveryTime: '40 min',
    deliveryFee: '3.99',
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop',
    rating: 4.0,
    deliveryTime: '35 min',
    deliveryFee: '2.99',
  },
  {
    id: '5',
    name: 'Pasta Paradise',
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=300&fit=crop',
    rating: 4.6,
    deliveryTime: '35 min',
    deliveryFee: '3.99',
  },
  {
    id: '6',
    name: 'Healthy Bites',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=300&fit=crop',
    rating: 4.3,
    deliveryTime: '30 min',
    deliveryFee: '4.99',
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <HeroBanner />
        
        <CategoryScroller />
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Popular Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {restaurantData.map((restaurant) => (
              <RestaurantCard 
                key={restaurant.id} 
                {...restaurant}
              />
            ))}
          </div>
        </div>
        
        <PromoSection />
        
        <TrendingSection />
      </div>
    </MainLayout>
  );
};

export default Index;
