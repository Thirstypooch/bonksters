'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Search, ShoppingCart, User, Menu, LogOut, Loader2 } from 'lucide-react';
import { type User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AuthDialog from '../Auth/AuthDialog';
import { useAuthDialogStore } from '@/lib/store/authDialog';
import { useDebounce } from '@/hooks/use-debounce';
import { trpc } from '@/lib/trpc/client';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCartStore } from '@/lib/store/cart';
import { Skeleton } from '@/components/ui/skeleton';

interface HeaderProps {
  user: SupabaseUser | null;
}

const Header = ({ user }: HeaderProps) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const openAuthDialog = useAuthDialogStore((state) => state.open);

  const { data: addresses, isLoading: isLoadingAddresses } = trpc.address.getAddresses.useQuery(
      undefined,
      {
        enabled: !!user,
      }
  );

  const displayLocation = useMemo(() => {
    if (!user) {
      return 'Current Location';
    }
    if (isLoadingAddresses) {
      return '';
    }
    const defaultAddress = addresses?.find(addr => addr.isDefault);
    if (defaultAddress) {
      return defaultAddress.label || 'Default Address';
    }
    if (addresses && addresses.length > 0) {
      return addresses[0].label || 'Saved Address';
    }
    return 'Set a Location';
  }, [user, addresses, isLoadingAddresses]);

  const [searchQuery, setSearchQuery] = useState('')
  const [isPopoverOpen, setPopoverOpen]= useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const { data: searchResults, isLoading: isSearchLoading }= trpc.restaurant.searchRestaurants.useQuery(
      { query : debouncedSearchQuery},
      {
        enabled: debouncedSearchQuery.length > 1
      }
  );

  useEffect(() => {
    if(debouncedSearchQuery.length > 1) {
      setPopoverOpen(true)
    } else {
      setPopoverOpen(false)
    }
  }, [debouncedSearchQuery, searchResults])

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    toast.info('You have been signed out.');
  };

  const UserMenu = () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.user_metadata.avatar_url} alt={user?.user_metadata.name} />
              <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/account">My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );

  return (
      <>
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="container mx-auto py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center">
                  <div className="mr-2 relative">
                    <div className="h-12 w-12 rounded-full flex items-center justify-center">
                      <Image
                          src="/logo.png"
                          alt="Bonkster's Logo"
                          width={40}
                          height={40}
                          className="rounded-full"
                      />
                    </div>
                  </div>
                  {!isMobile && (
                      <div className="font-display font-bold text-lg leading-none">
                        <span className="text-bonkster-orange">Bonkster&#39;s</span>
                        <br />
                        <span className="text-bonkster-blue text-sm">Your Food Buddy</span>
                      </div>
                  )}
                </Link>
                {!isMobile && (
                    <div className="ml-4 flex items-center text-sm border border-gray-300 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50">
                      <MapPin size={16} className="text-bonkster-orange mr-1" />
                      {isLoadingAddresses && !!user ? (
                          <Skeleton className="h-4 w-24" />
                      ) : (
                          <span className="truncate max-w-[150px]">{displayLocation}</span>
                      )}
                    </div>
                )}
              </div>
              {!isMobile && (
                  <div className="flex-1 max-w-md mx-4">
                    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input
                              placeholder="Search restaurants or dishes..."
                              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onFocus={() => { if (searchQuery.length > 1) setPopoverOpen(true); }}
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                        <div className="flex flex-col gap-1 p-2">
                          {isSearchLoading && ( <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" /><span>Searching...</span></div> )}
                          {!isSearchLoading && searchResults && searchResults.length > 0 && (
                              searchResults.map((restaurant) => (
                                  <Link
                                      key={restaurant.id}
                                      href={`/restaurant/${restaurant.id}`}
                                      onClick={() => {
                                        setSearchQuery('');
                                        setPopoverOpen(false);
                                      }}
                                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                                  >
                                    <Image
                                        src={restaurant.coverImageUrl || 'https://placehold.co/40x40'}
                                        alt={restaurant.name ?? 'Restaurant'}
                                        width={40}
                                        height={40}
                                        className="rounded-md object-cover h-10 w-10"
                                    />
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm">{restaurant.name}</span>
                                      {restaurant.matchedOn && restaurant.matchedOn.toLowerCase() !== restaurant.name?.toLowerCase() && (
                                          <span className="text-xs text-gray-500 truncate">

                                            Found: &quot;{restaurant.matchedOn}&quot;
                                      </span>
                                      )}
                                    </div>
                                  </Link>
                              ))
                          )}
                          {!isSearchLoading && (!searchResults || searchResults.length === 0) && debouncedSearchQuery.length > 1 && (
                              <div className="px-4 py-2 text-sm text-center text-gray-500">
                                No results found for &quot;{debouncedSearchQuery}&quot;
                              </div>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
              )}
              <div className="flex items-center gap-2">
                {!isMobile ? (
                    <>
                      {!user ? (
                          <Button onClick={openAuthDialog}>Sign In</Button>
                      ) : (
                          <UserMenu />
                      )}
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
                            {isLoadingAddresses && !!user ? (
                                <Skeleton className="h-4 w-24" />
                            ) : (
                                <span className="text-sm">{displayLocation}</span>
                            )}
                          </div>
                          <div className="space-y-3">
                            <Link href="/" className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md">Home</Link>
                            {!user ? (
                                <div onClick={(openAuthDialog)} className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md cursor-pointer">
                                  <User size={18} /> Sign In
                                </div>
                            ) : (
                                <>
                                  <Link href="/account" className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md">
                                    <User size={18} /> My Account
                                  </Link>
                                  <div onClick={handleSignOut} className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md cursor-pointer text-red-500">
                                    <LogOut size={18} /> Sign Out
                                  </div>
                                </>
                            )}
                            <Link href="/cart" className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md">
                              <ShoppingCart size={18} /> Cart
                              {cartItemCount > 0 && (
                                  <span className="bg-bonkster-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ml-auto">{cartItemCount}</span>
                              )}
                            </Link>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                )}
              </div>
            </div>
            {isMobile && (
                <div className="mt-3">
                  <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search restaurants..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => { if (searchQuery.length > 1) setPopoverOpen(true); }}
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                      <div className="flex flex-col gap-1 p-2">
                        {isSearchLoading && ( <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" /><span>Searching...</span></div> )}
                        {!isSearchLoading && searchResults && searchResults.length > 0 && (
                            searchResults.map((restaurant) => (
                                <Link
                                    key={restaurant.id}
                                    href={`/restaurant/${restaurant.id}`}
                                    onClick={() => {
                                      setSearchQuery('');
                                      setPopoverOpen(false);
                                    }}
                                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                                >
                                  <Image
                                      src={restaurant.coverImageUrl || 'https://placehold.co/40x40'}
                                      alt={restaurant.name ?? 'Restaurant'}
                                      width={40}
                                      height={40}
                                      className="rounded-md object-cover h-10 w-10"
                                  />
                                  <div className="flex flex-col">
                                    <span className="font-medium text-sm">{restaurant.name}</span>
                                    {restaurant.matchedOn && restaurant.matchedOn.toLowerCase() !== restaurant.name?.toLowerCase() && (
                                        <span className="text-xs text-gray-500 truncate">
                                          Found: &quot;{restaurant.matchedOn}&quot;
                                        </span>
                                    )}
                                  </div>
                                </Link>
                            ))
                        )}
                        {!isSearchLoading && (!searchResults || searchResults.length === 0) && debouncedSearchQuery.length > 1 && (
                            <div className="px-4 py-2 text-sm text-center text-gray-500">
                              No results found for &quot;{debouncedSearchQuery}&quot;
                            </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
            )}
          </div>
        </header>

        <AuthDialog/>
      </>
  );
};

export default Header;