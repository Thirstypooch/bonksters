'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Search, ShoppingCart, User, Menu, LogOut } from 'lucide-react';
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
import Image from 'next/image';

interface HeaderProps {
  user: SupabaseUser | null;
}

const Header = ({ user }: HeaderProps) => {
  const [location] = useState('Current Location');
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const cartItemCount = 0;

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
                      <span className="truncate max-w-[150px]">{location}</span>
                    </div>
                )}
              </div>
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

              <div className="flex items-center gap-2">
                {!isMobile ? (
                    <>
                      {!user ? (
                          <Button onClick={() => setAuthDialogOpen(true)}>Sign In</Button>
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
                            <span className="text-sm">{location}</span>
                          </div>
                          <div className="space-y-3">
                            <Link href="/" className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md">Home</Link>
                            {!user ? (
                                <div onClick={() => setAuthDialogOpen(true)} className="flex items-center gap-3 px-2 py-3 hover:bg-gray-100 rounded-md cursor-pointer">
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
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search restaurants or dishes..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full"
                    />
                  </div>
                </div>
            )}
          </div>
        </header>

        <AuthDialog
            open={isAuthDialogOpen}
            onOpenChangeAction={setAuthDialogOpen}
            onSuccess={() => setAuthDialogOpen(false)}
        />
      </>
  );
};

export default Header;