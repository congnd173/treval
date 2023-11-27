import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  const listingsWithAverage = listings.map((listing: any) => {
    const ratings = listing.ratings;
    if (ratings && ratings.length > 0) {
      const totalRatingCount = ratings.reduce(
        (sum: number, rating: any) => sum + rating.ratingCount,
        0
      );
      const averageRatingCount = totalRatingCount / ratings.length;
      return {
        ...listing,
        averageRatingCount,
      };
    } else {
      return {
        ...listing,
        averageRatingCount: 0,
      };
    }
  });

  if (listingsWithAverage.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listingsWithAverage.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              avgRating={listing.averageRatingCount}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
