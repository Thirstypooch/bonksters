
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import OrderStatus from '@/components/Order/OrderStatus';

const Tracking = () => {
  // Mock data
  const orderStatusData = {
    currentStatus: 'on-the-way' as const,
    rider: {
      name: 'John Doe',
      vehicle: 'Bike 🚲',
      licensePlate: 'FD-1234',
      eta: '8:15 PM (10 min)',
    },
  };
  
  return (
    <>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <OrderStatus {...orderStatusData} />
      </div>
    </>
  );
};

export default Tracking;
