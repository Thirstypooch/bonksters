'use client'

import React from 'react';
import RestaurantHeader from '@/components/Restaurant/RestaurantHeader';
import MenuCategory from '@/components/Restaurant/MenuCategory';
import CartSummary from '@/components/Restaurant/CartSummary';
import { trpc } from '@/lib/trpc/client'; // Import tRPC
import { Skeleton } from '@/components/ui/skeleton';

const menuCategories = [
    {
        id: 'appetizers',
        name: 'Appetizers',
        items: [
            {
                id: 'app1',
                name: 'Mozzarella Sticks',
                description: 'Golden fried mozzarella sticks served with marinara sauce',
                price: 7.99,
                imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300',
            },
            {
                id: 'app2',
                name: 'Loaded Fries',
                description: 'French fries topped with cheese, bacon, and green onions',
                price: 8.99,
                imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300',
            },
        ],
    },
    {
        id: 'main',
        name: 'Main Course',
        items: [
            {
                id: 'main1',
                name: 'Classic Burger',
                description: 'Beef patty with lettuce, tomato, onion, and our special sauce',
                price: 12.99,
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
            },
            {
                id: 'main2',
                name: 'Chicken Sandwich',
                description: 'Grilled chicken breast with avocado, bacon, and honey mustard',
                price: 11.99,
                imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300',
            },
            {
                id: 'main3',
                name: 'Veggie Burger',
                description: 'Plant-based patty with all the fresh toppings',
                price: 13.99,
                imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300',
            },
            {
                id: 'main4',
                name: 'Double Cheese Burger',
                description: 'Two beef patties with extra cheese, pickles and caramelized onions',
                price: 15.99,
                imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300',
            },
        ],
    },
    {
        id: 'desserts',
        name: 'Desserts',
        items: [
            {
                id: 'dessert1',
                name: 'Chocolate Shake',
                description: 'Rich and creamy chocolate milkshake topped with whipped cream',
                price: 5.99,
                imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300',
            },
            {
                id: 'dessert2',
                name: 'Apple Pie',
                description: 'Warm apple pie with a scoop of vanilla ice cream',
                price: 6.99,
                imageUrl: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=300',
            },
        ],
    },
];

interface RestaurantPageProps {
    id: string;
}

const RestaurantPage = ({ id }: RestaurantPageProps) => {
    const { data: restaurant, isLoading, isError } = trpc.restaurant.getRestaurantById.useQuery({ id });
    const cartItemCount = 0;
    const cartTotal = 0;

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <Skeleton className="h-64 w-full mb-4" />
                <Skeleton className="h-10 w-1/2" />
            </div>
        );
    }
    if (isError || !restaurant) {
        return <div className="container mx-auto p-6 text-center text-red-500">Restaurant not found or failed to load.</div>;
    }

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
                    {/* Menu Categories (left) */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-20">
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-3">Menu Categories</h3>
                                <ul className="space-y-2">
                                    {menuCategories.map((category) => (
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

                    {/* Menu Items (right) */}
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold mb-6">Menu</h2>

                        {menuCategories.map((category) => (
                            <div key={category.id} id={category.id}>
                                <MenuCategory
                                    id={category.id}
                                    name={category.name}
                                    items={category.items}
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

            {/* Add padding to avoid content being covered by the cart summary */}
            {cartItemCount > 0 && <div className="h-16"></div>}
        </>
    );
};

export default RestaurantPage;