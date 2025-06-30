
import React from 'react';
import { CreditCard, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data
const paymentMethods = [
  {
    id: '1',
    type: 'visa',
    last4: '1234',
    expiry: '04/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'mastercard',
    last4: '5678',
    expiry: '10/26',
    isDefault: false,
  }
];

const Payment = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-display font-bold text-xl">Payment Methods</h2>
        <Button size="sm" className="flex items-center gap-2">
          <Plus size={16} />
          Add New Card
        </Button>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {paymentMethods.map((payment) => (
            <div 
              key={payment.id}
              className={`border rounded-md p-4 ${payment.isDefault ? 'border-bonkster-blue/30 bg-blue-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                    <span className="uppercase font-medium">{payment.type}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        •••• {payment.last4}
                      </h3>
                      {payment.isDefault && (
                        <span className="bg-bonkster-blue/10 text-bonkster-blue text-xs px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">Expires {payment.expiry}</p>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
