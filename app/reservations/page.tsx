import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import ReservationClient from "./ReservationClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import getPurchase from "../actions/getPurchase";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  const purchases = await getPurchase({
    authorId: currentUser.id,
  })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="You had no reservations yet"
          subtitle="Looks like there is no one book your place yet"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
        purchases={purchases}
      />
    </ClientOnly>
  );
};

export default ReservationPage;
