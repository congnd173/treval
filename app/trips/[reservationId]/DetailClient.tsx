import ListingHead from "@/app/components/listings/ListingHead";
import TripDetail from "@/app/components/reservations/TripDetail";
import { SafeReservation, SafeUser } from "@/app/types";

interface DetailClientProps {
  reservation: SafeReservation;
  currentUser: SafeUser;
}

export const DetailClient = ({
  reservation,
  currentUser,
}: DetailClientProps) => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6">
        <ListingHead
          title={reservation.listing.title}
          locationValue={reservation.listing.locationValue}
          id={reservation.listing.id}
          imgSrc={reservation.listing.imageSrc}
          currentUser={currentUser}
        />
        <TripDetail reservation={reservation} />
      </div>
    </div>
  );
};
