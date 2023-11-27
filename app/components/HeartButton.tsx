"use client";

import useFavorite from "../hooks/useFavorite";
import { SafeUser } from "../types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorite, toggleHeart } = useFavorite({ listingId, currentUser });
  return (
    <div
      onClick={toggleHeart}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineStar
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillStar
        size={24}
        className={hasFavorite ? "fill-yellow-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
