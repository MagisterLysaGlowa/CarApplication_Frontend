"use client";
import React, { useState } from "react";
import OfferCard from "./OfferCard";
import "../../../css/scrollbar.css";
import Link from "next/link";

type Props = {
  userOffers: FullOffer[];
  openedOffer: FullOffer | null;
  setOpenedOffer: React.Dispatch<React.SetStateAction<FullOffer | null>>;
};

const MyOffers = (props: Props) => {
  const { userOffers, openedOffer, setOpenedOffer } = props;

  return (
    <aside className="bg-WHITE-100 rounded-[24px] px-4 pb-12 max-h-[600px] xl:block hidden">
      <p className="text-[#272727] mobile-large-bold lg:desktop-large-bold mt-10 mx-3">
        Twoje zlecenia
      </p>
      <ul className="flex flex-col gap-3 mt-5 overflow-y-scroll !h-[400px] scrollContainer p-3">
        {userOffers &&
          userOffers.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setOpenedOffer(item);
                }}
              >
                <OfferCard
                  offer={item}
                  active={openedOffer?.offerId == item.offerId}
                />
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default MyOffers;
