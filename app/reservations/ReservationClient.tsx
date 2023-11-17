"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafePurchase, SafeReservation, SafeUser } from "../types";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import PurchaseTable from "../components/reservations/PurchaseTable";
import ReservationTable from "../components/reservations/ReservationTable";

interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
  purchases: SafePurchase[];
}

const ReservationClient = ({
  reservations,
  currentUser,
  purchases
}: ReservationClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="All purchase to your listing" subtitle="Where you can view successful payments to your listing" />
      <PurchaseTable purchases={purchases}/>
      <Heading title="All your reservation" subtitle="Where you can view all your reservations that you have" />
      <ReservationTable reservations={reservations} onCancel={onCancel}/>
      {/* <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Deny reservation"
          />
        ))}
      </div> */}
    </Container>
  );
};

export default ReservationClient;
