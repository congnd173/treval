interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}
import prisma from "@/app/libs/prismadb";

export default async function getRatings(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const ratings = await prisma.rating.findMany({
      where: query,
      include: {
        user: true,
      },
      orderBy: {
        createAt: "desc",
      },
    });
    const safeRatings = ratings.map((rating) => ({
      ...rating,
      createAt: rating.createAt.toISOString(),
      user: {
        ...rating.user,
        createAt: rating.createAt.toISOString(),
        updateAt: rating.user.updateAt.toISOString(),
        emailVerified: rating.user.emailVerified?.toISOString() || null,
      },
    }));
    return safeRatings;
  } catch (error: any) {
    throw new Error(error);
  }
}
