"use client";
import React, { useState } from "react";
import OfferCard from "./OfferCard";
import "../../../css/scrollbar.css";
import Link from "next/link";
import ChevronIcon from "../../../../public/images/icons/chevron_icon.svg";

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
      <header
        className="flex items-center mx-3 h-[80px] cursor-pointer"
        onClick={() => {
          setAccordVisible((prevState) => !prevState);
        }}
      >
        <p className="text-[#272727] flex-grow mobile-large-bold lg:desktop-large-bold">
          Twoje zlecenia
        </p>
        <ChevronIcon
          width={20}
          height={20}
          fill="black"
          className={`${
            accordVisible ? "rotate-180" : "rotate-0"
          } transition-all duration-300`}
        />
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
      <button
        className="aqua-border-btn !bg-AQUA-100 !border-AQUA-400 relative w-full mt-5"
        type="button"
      >
        <Link className="!text-AQUA-400 relative" href={"/zlecenie"}>
          <span className="absolute left-[-25px] text-[2rem] bold top-1/2 translate-y-[-54%]">
            +
          </span>
          <span>Dodaj zlecenie</span>
        </Link>
      </button>
    </aside>
  );
};

export default MyOffersAccord;
