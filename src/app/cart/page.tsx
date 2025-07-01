'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, CreditCard } from 'lucide-react';
import CartItem, { CartItemType } from '@/components/Cart/CartItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from "next/link";

// Mock cart data
const initialCartItems: CartItemType[] = [
  {
    id: '1',
    name: 'Classic Burger',
    customizations: ['Extra cheese', 'Spicy level: Medium'],
    quantity: 2,
    price: 12.00,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
  },
  {
    id: '2',
    name: 'Loaded Fries',
    customizations: ['No onions'],
    quantity: 1,
    price: 8.99,
    imageUrl: 'https://images.unsplash.com/photo-1576021522997-9e5d5f924ee8?w=300',
  },
];

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;

    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-6 mt-2">
          <button onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <ArrowLeft size={18} />
            <span>Back to Restaurant</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-bold text-xl">Cart Items</h2>
              </div>

              {cartItems.length > 0 ? (
                <div>
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}

                  <div className="p-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <Link href="/restaurant/1">
                        + Add More Items
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Button asChild>
                    <Link href="/">Browse Restaurants</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-20">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-bold text-xl">Order Summary</h2>
              </div>

              <div className="p-4">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Promo Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow"
                    />
                    <Button variant="outline" className="whitespace-nowrap">Apply</Button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold mb-2">Delivery Address</h3>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md mb-2">
                    <div className="flex items-center gap-2">
                      <Home size={18} className="text-bonkster-blue" />
                      <span className="font-medium">123 Main St...</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">+ Add New</Button>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold mb-2">Payment Method</h3>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-bonkster-blue" />
                      <span className="font-medium">Card **** 1234</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Use PayPal
                  </Button>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600"
                  >
                    I agree to terms and conditions
                  </label>
                </div>

                <Button
                  className="w-full bg-bonkster-orange hover:bg-bonkster-orange/90"
                  disabled={!agreedToTerms || cartItems.length === 0}
                  asChild
                >
                  <Link href="/tracking">
                    Place Order →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
