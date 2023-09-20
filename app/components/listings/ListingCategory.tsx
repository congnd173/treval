"use client";

import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory = ({
  icon: Icon,
  label,
  description,
}: ListingCategoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-gray-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-gray-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
