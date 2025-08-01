'use client'

import React from 'react';
import RestaurantHeader from '@/components/Restaurant/RestaurantHeader';
import MenuCategory from '@/components/Restaurant/MenuCategory';
import CartSummary from '@/components/Restaurant/CartSummary';
import { useCartStore } from '@/lib/store/cart';
import { type MenuItemType } from '@/components/Restaurant/MenuItem';

// Define types that match the data coming from the tRPC procedure
type Restaurant = {
    id: string;
    name: string;
    coverImageUrl: string | null;
    rating: string | null;
    deliveryTimeMinutes: number | null;
    deliveryFeeCents: number | null;
}

// This now correctly reflects what getMenuByRestaurantId returns
type MenuItemFromAPI = {
    id: string;
    name: string;
    description: string | null;
    price: number; // The API sends 'price' in dollars
    priceCents: number;
    imageUrl: string | null;
    category: string | null;
    restaurantId: string;
}

type MenuCategoryFromAPI = {
    id: string;
    name: string;
    items: MenuItemFromAPI[];
}

interface RestaurantPageProps {
    restaurant: Restaurant;
    menu: MenuCategoryFromAPI[];
}

const RestaurantPage = ({ restaurant, menu }: RestaurantPageProps) => {
    // 1. 'addItem' is not used here, so we remove it.
    const { items: cartItems } = useCartStore();

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    // 2. The CartItem type uses 'price' (in dollars), not 'priceCents'.
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <RestaurantHeader
                name={restaurant.name}
                coverImage={restaurant.coverImageUrl || 'https://placehold.co/1000x400/f97316/white?text=Food'}
                rating={Number(restaurant.rating) || 0}
                deliveryTime={`${restaurant.deliveryTimeMinutes || 'N/A'} min`}
                deliveryFee={
                    restaurant.deliveryFeeCents === null || restaurant.deliveryFeeCents === undefined
                        ? 'N/A'
                        : restaurant.deliveryFeeCents === 0
                            ? 'Free'
                            : (restaurant.deliveryFeeCents / 100).toFixed(2)
                }
            />

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-20">
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-3">Menu Categories</h3>
                                <ul className="space-y-2">
                                    {/* 3. Use the 'menu' prop for the navigation, not the non-existent 'menuCategories' */}
                                    {menu.map((category) => (
                                        <li key={category.id}>
                                            <a
                                                href={`#${category.id}`}
                                                className="block px-3 py-2 hover:bg-gray-100 rounded"
                                            >
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold mb-6">Menu</h2>

                        {menu.map((category) => (
                            <div key={category.id} id={category.id}>
                                <MenuCategory
                                    id={category.id}
                                    name={category.name}
                                    // 4. The `item` here already has `price` in dollars from the tRPC procedure.
                                    // No need to recalculate from `priceCents`.
                                    items={category.items.map((item): MenuItemType => ({
                                        ...item,
                                        price: item.price, // Use the existing price
                                        description: item.description || '',
                                        imageUrl: item.imageUrl || 'https://placehold.co/300x300/f6f6f7/403e43?text=Item',
                                    }))}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <CartSummary
                itemCount={cartItemCount}
                total={cartTotal}
            />

            {cartItemCount > 0 && <div className="h-20"></div> /* Adjusted height for summary bar */}
        </>
    );
};

export default RestaurantPage;