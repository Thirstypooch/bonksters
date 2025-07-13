
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cart';

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MenuItem: React.FC<MenuItemType> = (props) => {
  const { id, name, description, price, imageUrl } = props;
  const addItemToCart = useCartStore((state) => state.addItem);

  const handleAddItem = () => {
    addItemToCart(props);
  };
  return (
    <div className="flex gap-4 p-3 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h4 className="font-medium mb-1">{name}</h4>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-medium">${price.toFixed(2)}</span>
          <Button size="sm" className="flex items-center gap-1" onClick={handleAddItem}>
            <PlusCircle size={16} />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
