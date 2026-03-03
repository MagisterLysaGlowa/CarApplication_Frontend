import React, { useState } from "react";
import Image from "next/image";

type Props = {
  filePath: string;
  index: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsGalleryOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageImage = ({
  filePath,
  index,
  setCurrentIndex,
  setIsGalleryOpen,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative">
      {/* Skeleton Loader before image is loaded */}
      <div
        className={`w-[60px] h-[60px] bg-gray-300 rounded-lg cursor-pointer border-2 border-WHITE-100 ${
          !isLoaded ? "animate-pulse" : "hidden"
        }`}
      ></div>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${filePath}`}
        alt="message"
        width={60}
        height={60}
        data-loaded="false"
        unoptimized
        loading="eager"
        priority
        onLoad={(event) => {
          event.currentTarget.setAttribute("data-loaded", "true");
          setIsLoaded(true); // Set isLoaded to true when the image is loaded
        }}
        className={`w-[60px] h-[60px] object-cover rounded-lg cursor-pointer border-2 border-WHITE-100 ${
          isLoaded ? "" : "hidden"
        }`}
        onClick={() => {
          setCurrentIndex(index);
          setIsGalleryOpen(true);
        }}
      />
    </div>
  );
};

export default MessageImage;
