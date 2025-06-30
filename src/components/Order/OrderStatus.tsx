
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

type OrderStep = 'confirmed' | 'preparing' | 'on-the-way' | 'delivered';

interface OrderStatusProps {
  currentStatus: OrderStep;
  rider: {
    name: string;
    vehicle: string;
    licensePlate: string;
    eta: string;
  };
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  currentStatus,
  rider
}) => {
  const steps: OrderStep[] = ['confirmed', 'preparing', 'on-the-way', 'delivered'];
  
  const getStatusLabel = (step: OrderStep): string => {
    switch (step) {
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'Preparing';
      case 'on-the-way': return 'On the Way';
      case 'delivered': return 'Delivered';
    }
  };
  
  const getCurrentStepIndex = (): number => {
    return steps.indexOf(currentStatus);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-600 hover:text-black">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {currentStatus === 'on-the-way' ? (
              <>Order Status: On the Way! 🚚 💨</>
            ) : (
              `Order Status: ${getStatusLabel(currentStatus)}`
            )}
          </h2>
          
          <div className="relative">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div 
                  key={step}
                  className={`text-sm font-medium ${
                    index <= getCurrentStepIndex() 
                      ? 'text-bonkster-orange' 
                      : 'text-gray-500'
                  }`}
                >
                  {getStatusLabel(step)}
                </div>
              ))}
            </div>
            
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-bonkster-orange rounded-full"
                style={{ 
                  width: `${(getCurrentStepIndex() / (steps.length - 1)) * 100}%`,
                  transition: 'width 1s ease-in-out'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2 text-gray-600" />
              <span className="text-gray-700">Live Map Placeholder</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Rider Details</h3>
            
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{rider.name}</span>
              </div>
              
              <div>
                <span className="text-gray-600">Vehicle:</span>
                <span className="ml-2 font-medium">{rider.vehicle}</span>
              </div>
              
              <div>
                <span className="text-gray-600">License Plate:</span>
                <span className="ml-2 font-medium">{rider.licensePlate}</span>
              </div>
              
              <div>
                <span className="text-gray-600">Estimated Arrival:</span>
                <span className="ml-2 font-medium">{rider.eta}</span>
              </div>
              
              <Button variant="outline" className="mt-2 w-full flex gap-2 items-center justify-center">
                <Phone size={16} />
                Contact Rider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
