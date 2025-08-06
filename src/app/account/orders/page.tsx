'use client';
import React from 'react';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { trpc } from '@/lib/trpc/client';
import { Skeleton } from '@/components/ui/skeleton';
import { type AppRouter } from '@/server/trpc/root';
import { type inferRouterOutputs } from '@trpc/server';

type OrderHistoryOutput = inferRouterOutputs<AppRouter>['order']['getOrderHistory'];
type OrderWithRelations = OrderHistoryOutput[number];


const Orders = () => {
  // Fetch real data using the tRPC hook
  const { data: orders, isLoading, isError} = trpc.order.getOrderHistory.useQuery();

  const formatDate = (dateString: string |Date | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const formatTime = (dateString: string |Date | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit',
    });
  };
  if (isLoading) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="font-display font-bold text-xl">Order History</h2>
          </div>
          <div className="p-4 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3 p-4 border rounded-md">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
            ))}
          </div>
        </div>
    );
  }
  if (isError) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="font-display font-bold text-xl">Order History</h2>
          </div>
          <div className="p-8 text-center text-red-500">
            Failed to load your order history. Please try again later.
          </div>
        </div>
    )
  }
  return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="font-display font-bold text-xl">Order History</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {orders && orders.length > 0 ? (
              orders.map((order: OrderWithRelations) => (
                  <div key={order.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">{order.restaurant?.name || 'Restaurant Not Found'}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'on-the-way' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                      }`}>
                  {order.status}
                </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-500">
                        {order.orderItems.map(item => `${item.quantity}x ${item.menuItem?.name || 'Item'}`).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={14} />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <ClockIcon size={14} />
                        <span>{formatTime(order.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        Total: ${(order.totalCents / 100).toFixed(2)}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/tracking?orderId=${order.id}`} className="flex items-center gap-1">
                            Track Order
                            <ArrowRightIcon size={14} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
              ))
          ) : (
              <div className="p-8 text-center text-gray-500">
                You have not placed any orders yet.
              </div>
          )}
        </div>
      </div>
  );
};

export default Orders;
