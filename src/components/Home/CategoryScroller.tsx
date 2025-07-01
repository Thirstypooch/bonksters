'use client';
import React, { useState } from 'react';
import { 
  Beef, Pizza, Fish, Salad, Coffee, ChevronRight, ChevronLeft 
} from 'lucide-react';

interface CategoryProps {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const CATEGORIES: CategoryProps[] = [
  { id: 'burgers', name: 'Burgers', icon: <Beef className="h-5 w-5" /> },
  { id: 'pizza', name: 'Pizza', icon: <Pizza className="h-5 w-5" /> },
  { id: 'sushi', name: 'Sushi', icon: <Fish className="h-5 w-5" /> },
  { id: 'vegan', name: 'Vegan', icon: <Salad className="h-5 w-5" /> },
  { id: 'breakfast', name: 'Breakfast', icon: <Coffee className="h-5 w-5" /> },
];

const CategoryScroller = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      const scrollAmount = 200;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setScrollPosition(scrollPosition + scrollAmount);
      }
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="relative mb-6">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold">Categories</h2>
        <div className="ml-auto flex gap-2">
          <button 
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => scroll('left')}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => scroll('right')}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2"
        ref={scrollContainer}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={`category-pill ${
              activeCategory === category.id ? 'category-pill-active' : 'category-pill-inactive'
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
        <button className="category-pill category-pill-inactive">
          More Categories
        </button>
      </div>
    </div>
  );
};

export default CategoryScroller;
