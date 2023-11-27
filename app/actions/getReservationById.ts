import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export default async function getRerservationById(params: IParams) {
  try {
    const { reservationId } = params;

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        user: true,
        listing: true
      },
    });

    if (!reservation) {
      return null;
    }

    return {
      ...reservation,
      createAt: reservation.createAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      user: {
        ...reservation.user,
        createAt: reservation.user.createAt.toISOString(),
        updateAt: reservation.user.updateAt.toISOString(),
        emailVerified: reservation.user.emailVerified?.toISOString() || null,
      }, 
      listing:{
        ...reservation.listing,
        createAt: reservation.listing.createAt.toISOString(),
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}