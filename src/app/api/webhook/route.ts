import { stripe } from '@/lib/stripe';
import {
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  upsertProductRecord,
} from '@/lib/stripe/adminTasks';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = headers().get('Stripe-Signature');

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;

  // In development, allow missing webhook secret (webhooks will need to be configured for production)
  if (!webhookSecret) {
    if (process.env.NODE_ENV === 'production') {
      return new NextResponse(
        'Webhook secret is required in production. Please set STRIPE_WEBHOOK_SECRET or STRIPE_WEBHOOK_SECRET_LIVE.',
        { status: 500 }
      );
    }
    console.warn('⚠️ STRIPE_WEBHOOK_SECRET not set. Webhook endpoint is disabled in development.');
    return new NextResponse(
      JSON.stringify({ 
        received: false, 
        message: 'Webhook secret not configured. Configure STRIPE_WEBHOOK_SECRET for webhook handling.' 
      }),
      { status: 200 }
    );
  }

  let event: Stripe.Event;
  try {
    if (!sig) {
      return new NextResponse('Missing Stripe signature header', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProductRecord(event.data.object as Stripe.Product);
          break;
        case 'price.created':
        case 'price.updated':
          await upsertPriceRecord(event.data.object as Stripe.Price);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === 'customer.subscription.created'
          );
          console.log('FROM WEBHOOK🚀', subscription.status);
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true
            );
          }
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.log(error);
      return new NextResponse(
        'Webhook error: "Webhook handler failed. View logs."',
        { status: 400 }
      );
    }
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
