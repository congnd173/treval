import getRerservationById from "@/app/actions/getReservationById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import { DetailClient } from "./DetailClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

interface IParams {
  reservationId: string;
}

const ReservationDetaiPage = async ({ params }: { params: IParams }) => {
  const reservation = await getRerservationById(params);
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  if (!reservation) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <DetailClient reservation={reservation} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ReservationDetaiPage;
