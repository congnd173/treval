"use client";

import { useRouter } from "next/navigation";

import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { AiFillHeart } from "react-icons/ai";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  onSecondaryAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  secondActionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  avgRating?: number;
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
  avgRating,
  onSecondaryAction,
  secondActionLabel,
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  console.log(avgRating);

  const location = getByValue(data.locationValue);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const handleDetail = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onSecondaryAction?.(actionId);
    },
    [onSecondaryAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")}-${format(end, "PP")}`;
  }, [reservation]);
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className=" aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc[0]}
            className=" object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className=" absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        {!!avgRating && (
          <div className="flex flex-row gap-2 items-center">
            <AiFillHeart color="rgb(244 63 94)" />
            {avgRating.toFixed(1)}
          </div>
        )}
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">/ night</div>}
        </div>
        {reservation && (
          <div className="text-gray-500">
            {reservation.status}
          </div>
        )}
        <div className="flex flex-row gap-1">
          {onSecondaryAction && secondActionLabel && (
            <Button
              disabled={disabled}
              small
              fullWidth
              label={secondActionLabel}
              onClick={handleDetail}
            />
          )}
          {onAction && actionLabel && reservation?.status !== "Paid" && (
            <Button
              disabled={disabled}
              small
              fullWidth
              outline
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
