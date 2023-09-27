"use client";
import { Range } from "react-date-range";
import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";

import {
  SafeUser,
  SafeListing,
  SafeReservation,
  SafeRating,
} from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingReservation from "@/app/components/listings/ListingReservation";
import ListingComments from "@/app/components/listings/ListingComments";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  ratings?: SafeRating[];
}

const ListingClient = ({
  listing,
  reservations = [],
  currentUser,
  ratings = [],
}: ListingClientProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  console.log(ratings);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [dateCount, setDateCount] = useState(0);

  const [ratingBody, setRatingBody] = useState("");
  const [ratingCount, setRatingCount] = useState(0);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("You have your reservation");
        setDateRange(initialDateRange);
        router.push("/trips");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [loginModal, currentUser, totalPrice, router, listing?.id, dateRange]);

  const onSubmitRating = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);
    axios
      .post("/api/ratings", {
        ratingBody,
        ratingCount,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("You have rate this accomodation.");
        setRatingBody("");
        setRatingCount(0);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, loginModal, listing?.id, ratingCount, ratingBody, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      setDateCount(dayCount);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(0);
      }
    }
  }, [dateRange, listing.price]);

  useEffect(() => {
    if (dateCount < 1) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [dateCount]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imgSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                dateCount={dateCount}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
          <hr />
          <div className="mt-1">
            <ListingComments
              ratingBody={ratingBody}
              ratingCount={ratingCount}
              onChangeCount={(value) => setRatingCount(value)}
              onSubmit={onSubmitRating}
              onChangeBody={(value) => setRatingBody(value)}
              data={ratings}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
