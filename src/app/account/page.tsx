cat Account.tsx

import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import AccountNav from '@/components/Account/AccountNav';

const Account = () => {
  const location = useLocation();
  
  // Redirect to profile page if the exact /account path is accessed
  if (location.pathname === '/account') {
    return <Navigate to="/account/profile" replace />;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <AccountNav />
          </div>
          
          <div className="md:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Account;
