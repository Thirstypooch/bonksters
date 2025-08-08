import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    console.log('--- Stripe webhook POST request received ---');
    const body = await req.text();
    const signature = headers().get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        let message = 'Unknown Error';
        if (err instanceof Error) {
            message = err.message;
        }
        console.error(`Webhook signature verification failed: ${message}`);
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        console.log('Checkout session completed event received.');

        if (!session?.metadata?.orderId) {
            console.error("Webhook Error: Missing orderId in session metadata.");
            return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
        }

        const orderId = session.metadata.orderId;

        try {
            await db.update(orders)
                .set({ status: 'confirmed' })
                .where(eq(orders.id, orderId));

            console.log(`Order ${orderId} successfully updated to confirmed.`);
        } catch (dbError) {
            console.error(`Database Error updating order ${orderId}:`, dbError);
            return NextResponse.json({ error: "Database update failed." }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}