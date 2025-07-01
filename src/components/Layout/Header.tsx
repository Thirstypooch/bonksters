'use client';
import React, { useState } from 'react';
import { MapPin, Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from "next/link";
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [location, setLocation] = useState('Current Location');
  const isMobile = useIsMobile();
  const cartItemCount = 0; // This would come from a cart context/state

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          {/* Logo + Location (left side) */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <div className="mr-2 relative">
                <div className="h-10 w-10 bg-bonkster-orange rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-white text-lg">B</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-bonkster-blue rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-white text-xs">!</span>
                </div>
              </div>
              {!isMobile && (
                <div className="font-display font-bold text-lg leading-none">
                  <span className="text-bonkster-orange">Booster&#39;s</span>
                  <br />
                  <span className="text-bonkster-blue text-sm">Your Food Buddy</span>
                </div>
              )}
            </Link>
            
            {!isMobile && (
              <div className="ml-4 flex items-center text-sm border border-gray-300 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50">
                <MapPin size={16} className="text-bonkster-orange mr-1" />
                <span className="truncate max-w-[150px]">{location}</span>
              </div>
            )}
          </div>

          {/* Search bar (center - hidden on mobile) */}
          {!isMobile && (
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search restaurants or dishes..." 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full"
                />
              </div>
            </div>
          )}

          {/* User + Cart (right side) */}
          <div className="flex items-center gap-2">
            {!isMobile ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/account">
                    <User size={20} />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="relative" asChild>
                  <Link href="/cart">
                    <ShoppingCart size={20} />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-bonkster-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </Button>
              </>
            ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-6 pt-6">
                    <div className="flex items-center gap-2 px-2">
                      <MapPin size={18} className="text-bonkster-orange" />
                      <span className="text-sm">{location}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <Link 
                        href="/"
                        className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md"
                      >
                        Home
                      </Link>
                      <Link 
                        href="/account"
                        className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md"
                      >
                        <User size={18} />
                        My Account
                      </Link>
                      <Link 
                        href="/cart"
                        className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md"
                      >
                        <ShoppingCart size={18} />
                        Cart
                        {cartItemCount > 0 && (
                          <span className="bg-bonkster-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ml-auto">
                            {cartItemCount}
                          </span>
                        )}
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>

        {/* Mobile search (only visible on mobile) */}
        {isMobile && (
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search restaurants or dishes..." 
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full"
              />
            </div>
            <div className="flex items-center text-sm border border-gray-300 rounded-full px-3 py-1 mt-2 cursor-pointer hover:bg-gray-50 w-fit">
              <MapPin size={16} className="text-bonkster-orange mr-1" />
              <span className="truncate max-w-[200px]">{location}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
