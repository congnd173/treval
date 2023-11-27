import prisma from "@/app/libs/prismadb";

interface IParams {
  authorId?: string;
}

export default async function getPurchase(params: IParams) {
  try {
    const { authorId } = params;

    const purchases = await prisma.purchase.findMany({
      where: {
        reservation: {
          listing: {
            userId: authorId,
          },
        },
      },
      include: {
        reservation: {
          include: {
            listing: {
              include: {
                user: true,
              },
            },
            user: true,
          },
        },
      },
      orderBy:{
        createdAt: "desc"
      }
    });

    const safePurchases = purchases.map((purchase) => ({
      ...purchase,
      createdAt: purchase.createdAt.toISOString(),
      updatedAt: purchase.updatedAt.toISOString(),
      reservation: {
        ...purchase.reservation,
        createAt: purchase.reservation.createAt.toISOString(),
        startDate: purchase.reservation.startDate.toISOString(),
        endDate: purchase.reservation.endDate.toISOString(),
        listing: {
          ...purchase.reservation.listing,
          createAt: purchase.reservation.listing.createAt.toISOString(),
        },
        user: {
          ...purchase.reservation.user,
          createAt: purchase.reservation.user.createAt.toISOString(),
          updateAt: purchase.reservation.user.updateAt.toISOString(),
          emailVerified:
            purchase.reservation.user.emailVerified?.toISOString() || null,
        },
      },
    }));
    return safePurchases;
  } catch (error: any) {
    throw new Error(error);
  }
}
