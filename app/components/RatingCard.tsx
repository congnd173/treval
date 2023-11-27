import { Rating } from "@material-tailwind/react";
import { SafeUser } from "../types";
import Avatar from "./Avatar";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { formatDistance } from "date-fns";

interface RatingCardProps {
  user: SafeUser;
  body: string | null;
  count: number;
  date: string;
}

const RatingCard = ({ user, body, count, date }: RatingCardProps) => {
  return (
    <div className="flex flex-col border-[1px] border-neutral-300 p-4 rounded-lg relative">
      <div className=" font-semibold gap-3 text-md flex flex-row items-center">
        <Avatar src={user.image} />
        {user.name}
      </div>
      <Rating
        value={count}
        readonly
        ratedIcon={<AiFillHeart color="rgb(244 63 94)" />}
        unratedIcon={<AiOutlineHeart color="rgb(212 212 212)" />}
      />
      <div className="text-lg">{body}</div>
      <div className=" font-light text-sm absolute top-4 right-4 text-neutral-500">
        {formatDistance(new Date(date), new Date())}
      </div>
    </div>
  );
};

export default RatingCard;
