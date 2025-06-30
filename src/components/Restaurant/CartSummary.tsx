
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface CartSummaryProps {
  itemCount: number;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ itemCount, total }) => {
  if (itemCount === 0) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-bonkster-orange" />
          <span className="font-medium">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline font-bold">${total.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="md:hidden font-bold">${total.toFixed(2)}</span>
          <Link
            to="/cart"
            className="bg-bonkster-orange text-white px-6 py-2 rounded-full font-bold hover:bg-bonkster-orange/90 transition"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
