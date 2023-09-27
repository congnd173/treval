import { Listing, Rating, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createAt"> & {
  createAt: string;
};

export type SafeRating = Omit<Rating, "createAt"> & {
  createAt: string;
  user: SafeUser;
};

export type SafeReservation = Omit<
  Reservation,
  "createAt" | "startDate" | "endDate" | "listing"
> & {
  createAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<User, "createAt" | "updateAt" | "emailVerified"> & {
  createAt: string;
  updateAt: string;
  emailVerified: string | null;
};
