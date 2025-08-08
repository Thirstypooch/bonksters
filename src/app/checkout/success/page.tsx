'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');

    const { data: order, isLoading } = trpc.order.getOrderById.useQuery(
        { orderId: orderId! },
        {
            enabled: !!orderId,
            retry: true,
            retryDelay: 500,
        }
    );

    if (isLoading || (order && order.status === 'pending')) {
        return (
            <>
                <Loader2 className="h-16 w-16 animate-spin text-gray-400" />
                <h1 className="text-2xl font-bold mt-4">Confirming your payment...</h1>
                <p className="text-gray-600">Please wait while we process your order.</p>
            </>
        );
    }

    if (!order || order.status !== 'confirmed') {
        return (
            <>
                <h1 className="text-2xl font-bold text-red-600">Payment Issue</h1>
                <p className="text-gray-600">There was an issue with your payment. Please contact support.</p>
            </>
        );
    }

    return (
        <>
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold mt-4">Thank you for your order!</h1>
            <p className="text-gray-600">Your payment was successful and your order is confirmed.</p>
            <Button asChild className="mt-6">
                <Link href={`/tracking?orderId=${orderId}`}>Track Your Order</Link>
            </Button>
        </>
    )
};

const CheckoutSuccessPage = () => {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center text-center min-h-[60vh]">
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
};

export default CheckoutSuccessPage;