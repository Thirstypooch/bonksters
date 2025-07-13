'use client';
import React from 'react';
import HeroBanner from '@/components/Home/HeroBanner';
import CategoryScroller from '@/components/Home/CategoryScroller';
import RestaurantCard from '@/components/Home/RestaurantCard';
import TrendingSection from '@/components/Home/TrendingSection';
import PromoSection from '@/components/Home/PromoSection';
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  // Fetch data using the tRPC hook
  const { data: restaurants, isLoading, isError } = trpc.restaurant.getRestaurants.useQuery();

  // Handle loading state
  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-6">
          <HeroBanner />
          <CategoryScroller />
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Popular Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Render 6 skeleton loaders */}
              {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
              ))}
            </div>
          </div>
        </div>
    );
  }
  if (isError) {
    return <div className="container mx-auto p-6 text-center text-red-500">Failed to load restaurants. Please try again later.</div>;
  }
  return (
      <div className="container mx-auto px-4 py-6">
        <HeroBanner />
        
        <CategoryScroller />
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Popular Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {restaurants?.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                imageUrl={restaurant.coverImageUrl || 'https://placehold.co/500x300/f97316/white?text=Food'}
                rating={Number(restaurant.rating) || 0}
                deliveryTime={`${restaurant.deliveryTimeMinutes || 'N/A'} min`}
                deliveryFee={
                  restaurant.deliveryFeeCents === null || restaurant.deliveryFeeCents === undefined
                      ? 'N/A'
                      : restaurant.deliveryFeeCents === 0
                          ? null
                          : (restaurant.deliveryFeeCents / 100).toFixed(2)
                }
              />
            ))}
          </div>
        </div>
        <PromoSection />
        <TrendingSection />
      </div>
  );
};

export default Index;
