
import React from 'react';
import { User, MapPin, CreditCard, ClipboardList, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { 
    path: '/account/profile', 
    label: 'Profile', 
    icon: <User className="h-5 w-5" /> 
  },
  { 
    path: '/account/addresses', 
    label: 'Addresses', 
    icon: <MapPin className="h-5 w-5" /> 
  },
  { 
    path: '/account/payment', 
    label: 'Payment Methods', 
    icon: <CreditCard className="h-5 w-5" /> 
  },
  { 
    path: '/account/orders', 
    label: 'Order History', 
    icon: <ClipboardList className="h-5 w-5" /> 
  },
  { 
    path: '/account/settings', 
    label: 'Settings', 
    icon: <Settings className="h-5 w-5" /> 
  },
];

const AccountNav = () => {
  const location = useLocation();
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="font-display font-bold text-xl">My Account</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-bonkster-orange text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AccountNav;
