"use client";

import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <GridLoader size={20} color="rgb(244 63 94)" />
    </div>
  );
};

export default Loader;
