import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/app/libs/stripe";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const reservationId = session?.metadata?.reservationId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !reservationId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }

    await prisma.purchase.create({
      data: {
        reservationId: reservationId,
        userId: userId,
      },
    });

    await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status: "Paid",
      },
    });
  } else {
    return new NextResponse(
      `Webhook Error: Unhandle event type ${event.type}`,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
