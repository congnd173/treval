import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { listingId, ratingBody, ratingCount } = body;

  if (!listingId || !ratingCount) {
    return NextResponse.error();
  }

  const ratingListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      ratings: {
        create: {
          userId: currentUser.id,
          ratingBody,
          ratingCount,
        },
      },
    },
  });

  return NextResponse.json(ratingListing);
}
