import RatingBar from "@/app/components/RatingBar";
import React from "react";
import Image from "next/image";

type Props = {
  clientOpinion: ClientOpinion;
};

const ClientOpnionCard = (props: Props) => {
  const { clientOpinion } = props;
  return (
    <div className="bg-WHITE-100 flex flex-col rounded-[24px] !px-5 !py-5 lg:px-10 lg:py-10">
      <div className="text-GOLD-400">
        <RatingBar rating={clientOpinion.rating} />
      </div>
      <div className="flex-grow text-BLACK-500 mobile-normal lg:desktop-normal !mt-2 lg:mt-3">
        <p>{clientOpinion.comment}</p>
      </div>
      <div className="flex !mt-4 lg:mt-7 items-center">
        <div className="w-[60px] h-[60px] rounded-full bg-gray-400 overflow-hidden relative">
          <Image
            src={`/images/avatar/${clientOpinion.avatar}`}
            alt="esa"
            width={60}
            height={60}
            className="top-1/2 translate-y-[-50%] absolute h-full object-cover"
          />
        </div>
        <div className="flex-grow flex flex-col justify-center ml-5">
          <p className="mobile-normal-bold lg:desktop-normal-bold text-BLACK-500">
            <span>{clientOpinion.name}</span>
            <span className="ml-2">{clientOpinion.surname}</span>
          </p>
          <span className="mobile-small lg:desktop-small text-BLACK-500">
            Kupił {clientOpinion.car} za {clientOpinion.cost} zł
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientOpnionCard;
