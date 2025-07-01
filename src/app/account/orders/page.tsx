
import React from 'react';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";

// Mock data
const orders = [
  {
    id: '1',
    restaurant: 'Burger Joint',
    items: [
      { name: 'Classic Burger', quantity: 2 },
      { name: 'Fries', quantity: 1 },
    ],
    total: 32.50,
    date: '2025-05-10T18:30:00',
    status: 'Delivered',
  },
  {
    id: '2',
    restaurant: 'Pizza Palace',
    items: [
      { name: 'Pepperoni Pizza', quantity: 1 },
      { name: 'Garlic Bread', quantity: 1 },
    ],
    total: 24.99,
    date: '2025-05-08T19:45:00',
    status: 'Delivered',
  },
  {
    id: '3',
    restaurant: 'Sushi Heaven',
    items: [
      { name: 'California Roll', quantity: 2 },
      { name: 'Miso Soup', quantity: 2 },
    ],
    total: 45.80,
    date: '2025-05-05T20:15:00',
    status: 'Delivered',
  },
];

const Orders = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="font-display font-bold text-xl">Order History</h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {orders.map((order) => (
          <div key={order.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{order.restaurant}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                order.status === 'On the way' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="mb-3">
              <ul className="space-y-1">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    {item.quantity}x {item.name}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-2">
                <CalendarIcon size={14} />
                <span>{formatDate(order.date)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <ClockIcon size={14} />
                <span>{formatTime(order.date)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="font-medium">
                Total: ${order.total.toFixed(2)}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/orders/${order.id}`} className="flex items-center gap-1">
                    Details
                    <ArrowRightIcon size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
