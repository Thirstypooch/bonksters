import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type MenuItemType } from '@/components/Restaurant/MenuItem'; // We can reuse this type

export interface CartItem extends MenuItemType {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: MenuItemType) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((cartItem) =>
                            cartItem.id === item.id
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                        ),
                    });
                } else {
                    set({ items: [...currentItems, { ...item, quantity: 1 }] });
                }
            },
            removeItem: (itemId) => {
                set({
                    items: get().items.filter((item) => item.id !== itemId),
                });
            },
            updateQuantity: (itemId, quantity) => {
                if (quantity < 1) {
                    get().removeItem(itemId);
                } else {
                    set({
                        items: get().items.map((item) =>
                            item.id === itemId ? { ...item, quantity } : item
                        ),
                    });
                }
            },
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'bonksters-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);