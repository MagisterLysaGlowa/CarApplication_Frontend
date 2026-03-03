"use client";
import React, { useState, useEffect } from "react";
import WheelIcon from "../../../../public/images/icons/wheel_icon.svg";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { daysUntilEnd } from "@/lib/utils";

// Enable custom date parsing
dayjs.extend(customParseFormat);

type Props = {
  offer: FullOffer;
  active: boolean;
};

const OfferCard = (props: Props) => {
  const { active, offer } = props;
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    setDaysRemaining(daysUntilEnd(offer.endDate));
  }, [offer.endDate]);

  return (
    <div
      className={`grid bg-WHITE-200 py-4 px-4  items-center offer-grid-box cursor-pointer rounded-lg ${
        active && "outline-AQUA-400 outline-[.12em] outline"
      }`}
    >
      <WheelIcon width={25} height={25} />
      <p className="mobile-small-bold w-full lg:desktop-small-bold text-BLACK-700 sm:ml-4">
        {offer.mark} {offer.model}
      </p>
      <p className="mobile-small lg:desktop-small text-BLACK-100 col-span-2 sm:col-span-1">
        {daysRemaining !== null ? (
          daysRemaining > 0 ? (
            daysRemaining > 3 ? (
              `koniec za: ${daysRemaining} dni`
            ) : (
              <span className="text-red-500">
                koniec za: {daysRemaining} dni
              </span>
            )
          ) : (
            <span className="text-AQUA-400">Zakończono</span>
          )
        ) : (
          "Błędna data"
        )}
      </p>
    </div>
  );
};

export default OfferCard;
