
import React from 'react';
import { MinusCircle, PlusCircle, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export interface CartItemType {
  id: string;
  name: string;
  customizations?: string[];
  quantity: number;
  price: number;
  imageUrl: string;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove
}) => {
  return (
    <div className="flex gap-4 p-4 border-b border-gray-100">
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.imageUrl} 
          alt={item.name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h4 className="font-medium mb-1">{item.name}</h4>
        
        {item.customizations && item.customizations.length > 0 && (
          <div className="mb-2">
            {item.customizations.map((customization, index) => (
              <div key={index} className="text-sm text-gray-600">
                - {customization}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="text-gray-500 hover:text-bonkster-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MinusCircle size={20} />
            </button>
            <span className="font-medium w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="text-gray-500 hover:text-bonkster-blue"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
