"use client";
import React, { useState } from "react";
import OfferCard from "./OfferCard";
import "../../../css/scrollbar.css";
import Link from "next/link";
import ChevronIconSvg from "../../../../public/images/icons/chevron_icon.svg";

type Props = {
  userOffers: FullOffer[];
  openedOffer: FullOffer | null;
  setOpenedOffer: React.Dispatch<React.SetStateAction<FullOffer | null>>;
};

const MyOffersAccord = (props: Props) => {
  const { userOffers, openedOffer, setOpenedOffer } = props;
  const [accordVisible, setAccordVisible] = useState<boolean>(false);
  return (
    <aside
      className={`bg-WHITE-100 rounded-[24px] px-4 pb-12 max-h-[600px] xl:hidden block overflow-hidden transition-all duration-500 ease-linear ${
        accordVisible ? "max-h-[600px]" : "max-h-[80px]"
      }`}
    >
      <header className="flex items-center mx-3 h-[80px]">
        <p className="text-[#272727] flex-grow mobile-large-bold lg:desktop-large-bold">
          Twoje zlecenia
        </p>
        <button
          className="flex gap-2 items-center "
          onClick={() => {
            setAccordVisible((prevState) => !prevState);
          }}
        >
          {accordVisible ? "ukryj" : "pokaż"}
          <ChevronIconSvg
            width={18}
            height={18}
            fill="black"
            className={`transition-all duration-300 translate-y-[1px] ${
              accordVisible ? "rotate-[180deg]" : "rotate-[0deg]"
            }`}
          />
        </button>
      </header>
      <ul className="flex flex-col gap-3 overflow-y-scroll !h-[400px] scrollContainer p-3">
        {userOffers &&
          userOffers.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setAccordVisible(false);
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

export default MyOffersAccord;
