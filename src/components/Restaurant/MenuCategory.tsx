'use client';
import React, { useState } from 'react';
import MenuItem, { MenuItemType } from './MenuItem';

interface MenuCategoryProps {
  id: string;
  name: string;
  items: MenuItemType[];
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  name,
  items
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="mb-8">
      <div 
        className="flex items-center justify-between py-2 cursor-pointer border-b border-gray-100 mb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-bold">{name}</h3>
        <button className="text-gray-500 p-1">
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategory;
