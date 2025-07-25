'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, CreditCard } from 'lucide-react';
import CartItem from '@/components/Cart/CartItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from "next/link";
import { useCartStore } from '@/lib/store/cart';


const Cart = () => {
  const router = useRouter();
  const { items, removeItem, updateQuantity } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08;
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
                <h2 className="font-bold text-xl">Cart Items ({items.length})</h2>
              </div>

              {items.length > 0 ? (
                <div>
                  {items.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
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
                  disabled={!agreedToTerms || items.length === 0}
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
