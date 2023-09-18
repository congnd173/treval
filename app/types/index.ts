import { User, Listing } from "@prisma/client";

export type SafeListing = Omit<Listing, "createAt"> & {
  createAt: string;
};

export type SafeUser = Omit<User, "createAt" | "updateAt" | "emailVerified"> & {
  createAt: string;
  updateAt: string;
  emailVerified: string | null;
};
