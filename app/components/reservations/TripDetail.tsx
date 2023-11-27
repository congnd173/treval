"use client";
import { SafeReservation } from "@/app/types";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import Avatar from "../Avatar";
import { Radio } from "@material-tailwind/react";
import { PaymentButton } from "./PaymentButton";

interface TripDetailProps {
  reservation: SafeReservation;
}

const TripDetail = ({ reservation }: TripDetailProps) => {
  const [payMethod, setPayMethod] = useState("now");

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} to ${format(end, "PP")}`;
  }, [reservation]);
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Reservation Detail</h1>
        <p>
          <span className="text-xl font-semibold">Date: </span>
          From {reservationDate}
        </p>
        <div className="flex flex-row items-center gap-2">
          <span className="text-xl font-semibold">Guest:</span>
          <Avatar src={reservation.user.image} />
          {reservation.user.name}
        </div>
        <p>
          <span className="text-xl font-semibold">Status: </span>
          {reservation.status}
        </p>
        <div className="flex flex-row items-center gap-2 text-2xl underline font-bold">
          Total price: ${reservation.totalPrice}
        </div>
      </div>
      {reservation.status === "Pending" && (
        <div className="flex flex-col gap-3">
        <div className="flex gap-10">
          <Radio
            name="type"
            label="Pay now with Stripe"
            checked={payMethod === "now"}
            onChange={(e) => setPayMethod(e.target.value)}
            value="now"
            color="pink"
          />
          <Radio
            name="type"
            label="Pay later"
            checked={payMethod === "later"}
            onChange={(e) => setPayMethod(e.target.value)}
            value="later"
            color="pink"
          />
        </div>
        <PaymentButton
          price={reservation.totalPrice}
          method={payMethod}
          reservationId={reservation.id}
        />
      </div>
      )} 
    </div>
  );
};

export default TripDetail;
