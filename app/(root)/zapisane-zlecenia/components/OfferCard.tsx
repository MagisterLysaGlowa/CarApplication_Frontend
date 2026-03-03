"use client";
import React, { useState, useEffect } from "react";
import WheelIcon from "../../../../public/images/icons/wheel_icon.svg";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { daysUntilEnd } from "@/lib/utils";
import HeartIconSvg from "../../../../public/images/icons/heart_icon.svg";

// Enable custom date parsing
dayjs.extend(customParseFormat);

type Props = {
  offer: FullOffer;
  active: boolean;
};

export const HeartIcon: React.FC = () => {
  return <HeartIconSvg fill="#E75A5D" width={22} height={22} />;
};

const OfferCard = (props: Props) => {
  const { active, offer } = props;
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    setDaysRemaining(daysUntilEnd(offer.endDate));
  }, []);

  return (
    <div
      className={`bg-WHITE-200 py-4 px-4  items-center flex cursor-pointer rounded-lg ${
        active && "outline-AQUA-400 outline-[.12em] outline"
      }`}
    >
      <WheelIcon width={25} height={25} />
      <p className="mobile-small-bold w-full lg:desktop-small-bold text-BLACK-700 ml-3 flex-grow">
        {offer.mark} {offer.model}
      </p>
      <HeartIcon />
    </div>
  );
};

export default OfferCard;
