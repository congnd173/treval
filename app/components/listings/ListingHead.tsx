"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { Carousel, IconButton } from "@material-tailwind/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imgSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
  title,
  locationValue,
  imgSrc,
  id,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region},${location?.label}`}
      />
      <div className=" w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Carousel
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-20 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i
                      ? "w-8 bg-gradient-to-r from-rose-500 to-purple-500"
                      : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="pink"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4"
            >
              <FiChevronLeft size={48} />
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="purple"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4"
            >
              <FiChevronRight size={48} />
            </IconButton>
          )}
          loop
        >
          {imgSrc.map((src, index) => (
            <Image
              alt="Image"
              src={src}
              fill
              key={src}
              className={`object-cover w-full ${index === 0 ? "" : "-z-10"}`}
            />
          ))}
        </Carousel>
        <div className="absolute top-5 right-5 z-10">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
