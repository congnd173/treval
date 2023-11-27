import { Rating, Textarea } from "@material-tailwind/react";
import Button from "../Button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeRating } from "@/app/types";

import RatingCard from "../RatingCard";
import { useMemo } from "react";

interface ListingCommentsProps {
  ratingBody: string;
  ratingCount: number;
  onChangeCount: (value: number) => void;
  onChangeBody: (value: string) => void;
  onSubmit: () => void;
  data?: SafeRating[];
}

const ListingComments = ({
  ratingBody,
  ratingCount,
  onChangeCount,
  onSubmit,
  onChangeBody,
  data = [],
}: ListingCommentsProps) => {
  const averageRatingCount = useMemo(() => {
    if (data.length === 0) {
      return 0;
    }

    const totalRatingCount = data.reduce(
      (sum, rating) => sum + rating.ratingCount,
      0
    );
    return totalRatingCount / data.length;
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        {data.length === 0 && (
          <div className="text-neutral-500">No one rate yet</div>
        )}
        <AiFillHeart
          color={averageRatingCount === 0 ? "#000000" : "rgb(244 63 94)"}
        />
        {averageRatingCount.toFixed(1)}
      </div>
      <div className="w-full">
        <Textarea
          variant="standard"
          placeholder="Your Comment"
          color="pink"
          value={ratingBody}
          rows={2}
          onChange={(e) => onChangeBody(e.target.value)}
          className="text-xl"
        />
        <div className="flex w-full justify-between py-1">
          <Rating
            value={ratingCount}
            onChange={(value) => onChangeCount(value)}
            ratedIcon={<AiFillHeart color="rgb(244 63 94)" />}
            unratedIcon={<AiOutlineHeart color="rgb(212 212 212)" />}
          />
          <div className="flex gap-2">
            <Button label="Rate" onClick={onSubmit} disabled={!ratingCount} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((rating) => (
          <RatingCard
            user={rating.user}
            key={rating.id}
            body={rating.ratingBody}
            count={rating.ratingCount}
            date={rating.createAt}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingComments;
