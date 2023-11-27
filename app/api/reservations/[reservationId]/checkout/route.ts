import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import Stripe from "stripe";
import { stripe } from "@/app/libs/stripe";

export async function POST(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.id || !user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: params.reservationId,
      },
      include: {
        listing: true,
      },
    });

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_reservationId: {
          userId: user.id,
          reservationId: params.reservationId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!reservation) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: reservation.listing.title,
            description: reservation.listingId,
          },
          unit_amount: Math.round(reservation.totalPrice * 100),
        },
      },
    ];

    let stripeCustomer = await prisma.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
      });

      stripeCustomer = await prisma.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/trips/${reservation.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/trips/${reservation.id}?cancle=1`,
      metadata: {
        reservationId: reservation.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[CHECKOUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
