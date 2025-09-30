// src/app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err);
    return NextResponse.json({ status: "invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : undefined;

      const userId = session.metadata?.userId;

      if (!subscriptionId || !userId) {
        console.warn("Checkout session missing subscriptionId or userId");
        break;
      }

      console.log("✅ Subscription criada via checkout:", {
        subscriptionId,
        userId,
      });
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;

      // ⚠️ Na nova API 2025-08-27, invoice.subscription não existe
      // Se precisar do subscriptionId, busque via API usando invoice.customer ou session
      console.log("💰 Invoice pago:", {
        invoiceId: invoice.id,
        amount: invoice.amount_paid,
        customer: invoice.customer,
      });

      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (!userId) {
        console.warn("User ID não encontrado na subscription metadata");
        break;
      }

      console.log(`🔔 Subscription ${event.type}:`, {
        subscriptionId: subscription.id,
        userId,
        status: subscription.status,
      });

      break;
    }

    default:
      console.log("Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true });
}
