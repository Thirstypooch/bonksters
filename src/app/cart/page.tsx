'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard } from 'lucide-react';
import CartItem from '@/components/Cart/CartItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from "next/link";
import { useCartStore } from '@/lib/store/cart';
import { trpc } from '@/lib/trpc/client';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {Skeleton} from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const Cart = () => {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { data: addresses, isLoading: isLoadingAddresses } = trpc.address.getAddresses.useQuery();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const continueShoppingHref = items.length > 0
      ? `/restaurant/${items[0].restaurantId}`
      : '/';

  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  React.useEffect(() => {
    const defaultAddress = addresses?.find(a => a.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    } else if (addresses && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses]);

  const createCheckoutSessionMutation = trpc.order.createCheckoutSession.useMutation({
    onSuccess: ({ url }) => {
      if (url) {
        clearCart();
        router.push(url);
      } else {
        toast.error("Could not redirect to payment. Please try again.");
      }
    },
    onError: (error) => {
      toast.error(`Order failed: ${error.message}`);
    },
  });

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address.");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!agreedToTerms) {
      toast.warning("Please agree to the terms and conditions.");
      return;
    }
    const selectedAddress = addresses?.find(a => a.id === selectedAddressId);
    if (!selectedAddress) {
      toast.error("Selected address not found.");
      return;
    }
    const restaurantId = items[0].restaurantId;

    createCheckoutSessionMutation.mutate({
      cartItems: items.map(item => ({ id: item.id, quantity: item.quantity })),
      restaurantId: restaurantId,
      deliveryAddress: selectedAddress.fullAddress,
      deliveryFeeCents: Math.round(deliveryFee * 100),
    });
  };

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
                      <Link href={continueShoppingHref}>
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
                {isDemoMode && (
                    <Alert className="mb-4 bg-blue-50 border-blue-200">
                      <Info className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="font-bold text-blue-800">Demo Mode</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        Payment details are pre-filled with a test card. Just click &#34;Pay now&#34; on the next screen to complete the demo.
                      </AlertDescription>
                    </Alert>
                )}
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
                  {isLoadingAddresses ? <Skeleton className="h-24 w-full" /> :
                      <RadioGroup value={selectedAddressId ?? ""} onValueChange={setSelectedAddressId}>
                        <div className="space-y-2">
                          {addresses?.map(address => (
                              <Label
                                  key={address.id}
                                  htmlFor={address.id}
                                  className="flex items-center gap-4 p-3 border border-gray-200 rounded-md has-[:checked]:border-primary"
                              >
                                <RadioGroupItem value={address.id} id={address.id} />
                                <div>
                                  <p className="font-medium">{address.label || 'Address'}{address.isDefault && <span className="text-xs text-primary ml-2">(Default)</span>}</p>
                                  <p className="text-sm text-gray-600">{address.fullAddress}</p>
                                </div>
                              </Label>
                          ))}
                          {addresses?.length === 0 && <p className="text-sm text-center text-gray-500 p-4">No addresses found. <Link href="/account/addresses" className="text-primary underline">Add one here.</Link></p>}
                        </div>
                      </RadioGroup>
                  }
                </div>


                <div className="mb-4">
                  <h3 className="font-bold mb-2">Payment Method</h3>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-bonkster-blue" />
                      <span className="font-medium">Card **** 1234</span>
                    </div>
                  </div>
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
                    disabled={!agreedToTerms || items.length === 0 || createCheckoutSessionMutation.isPending}
                    onClick={handlePlaceOrder}
                >
                  {createCheckoutSessionMutation.isPending ? 'Processing...' : 'Proceed to Payment →'}
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
