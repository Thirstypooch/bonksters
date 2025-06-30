
import React from 'react';
import { MapPin, Plus, Home, Briefcase, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data
const addresses = [
  {
    id: '1',
    label: 'Home',
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    address: '456 Business Ave, Suite 300, New York, NY 10002',
    isDefault: false,
  }
];

const Addresses = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-display font-bold text-xl">Saved Addresses</h2>
        <Button size="sm" className="flex items-center gap-2">
          <Plus size={16} />
          Add New Address
        </Button>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {addresses.map((address) => (
            <div 
              key={address.id}
              className={`border rounded-md p-4 ${address.isDefault ? 'border-bonkster-orange/30 bg-orange-50' : 'border-gray-200'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {address.label === 'Home' ? (
                      <Home className="h-5 w-5 text-gray-600" />
                    ) : address.label === 'Work' ? (
                      <Briefcase className="h-5 w-5 text-gray-600" />
                    ) : (
                      <MapPin className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{address.label}</h3>
                      {address.isDefault && (
                        <span className="bg-bonkster-orange/10 text-bonkster-orange text-xs px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mt-1">{address.address}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
