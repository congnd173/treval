"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

declare global {
  let cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const router = useRouter();
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  const handleDelete = (index: number) => {
    value.splice(index, 1);
    router.refresh();
  };

  console.log(value);

  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="av5dps79"
        options={{
          maxFiles: 5,
          multiple: true,
        }}
      >
        {({ open }) => {
          return (
            <>
              {value && !value.length && (
                <div
                  onClick={() => open?.()}
                  className="relative cursor-pointer hover:border-gray-600 rounded-2xl hover:text-gray-600 transition border-dashed border-2 p-40 border-gray-400 flex flex-col justify-center items-center gap-4 text-gray-400"
                >
                  <TbPhotoPlus size={50} />
                  <div className="font-semibold text-lg">Upload here!</div>
                </div>
              )}
              <div>
                {value && value.length > 0 && (
                  <div className="flex flex-wrap">
                    {value.map((imageUrl, index) => (
                      <div
                        key={imageUrl}
                        className=" w-40 h-40 relative rounded-lg overflow-hidden m-2"
                      >
                        <Image
                          alt="Uploaded Image"
                          fill
                          style={{ objectFit: "cover" }}
                          src={imageUrl}
                        />
                        <RxCross2
                          className="absolute right-1 top-1 text-red-600 bg-white/60 rounded-full hover:bg-white"
                          size={24}
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    ))}
                    <div
                      onClick={() => open?.()}
                      className="relative cursor-pointer hover:border-gray-600 rounded-lg hover:text-gray-600 transition border-dashed border-2 w-40 h-40 m-2 border-gray-400 flex flex-col justify-center items-center gap-4 text-gray-400"
                    >
                      <TbPhotoPlus size={32} />
                      <div className="font-semibold text-md">Upload here!</div>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
