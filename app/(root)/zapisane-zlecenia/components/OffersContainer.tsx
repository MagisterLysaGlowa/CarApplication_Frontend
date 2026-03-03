"use client";
import React, { useEffect, useState } from "react";
import MyOffers from "./MyOffers";
import OpenedOffer from "./OpenedOffer";
import { useRouter, useSearchParams } from "next/navigation";
import MyOffersAccord from "./MyOffersAccord";
import { getFavouriteUserOffers } from "@/app/actions/getFavouriteUserOffers";

interface Props {
  userOffers: FullOffer[];
  user: any;
}

const OffersContainer = ({ userOffers, user }: Props) => {
  const [openedOffer, setOpenedOffer] = useState<FullOffer | null>(null);
  const [offersList, setOffersList] = useState<FullOffer[]>([]);
  const [refetchData, setRefetchData] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const offerId = searchParams.get("offerId");

  useEffect(() => {
    // Zapisz ofertę, jeśli `offerId` istnieje i się zmieniło
    if (offerId) {
      const foundOffer = userOffers.find((uo) => uo.offerId == Number(offerId));
      if (foundOffer && foundOffer !== openedOffer) {
        setOpenedOffer(foundOffer);
      }
    }

    // Usuń `offerId` z URL-a bez zmiany stanu
    const url = new URL(window.location.href);
    if (url.searchParams.has("offerId")) {
      url.searchParams.delete("offerId");
      router.replace(url.toString(), { scroll: false });
    }
  }, [offerId, userOffers]);

  const refetchOfferData = async () => {
    const userOffers = await getFavouriteUserOffers();
    setOffersList(userOffers.data);
  };

  useEffect(() => {
    if (refetchData) {
      refetchOfferData();
    }
    setRefetchData(false);
  }, [refetchData]);

  useEffect(() => {
    setOffersList(userOffers);
  }, [userOffers]);

  return (
    <div className="grid w-full gap-10 mt-14 my-offers-grid">
      <MyOffers
        openedOffer={openedOffer}
        setOpenedOffer={setOpenedOffer}
        userOffers={offersList}
      />

      <MyOffersAccord
        openedOffer={openedOffer}
        setOpenedOffer={setOpenedOffer}
        userOffers={offersList}
      />
      <OpenedOffer
        openedOffer={openedOffer}
        user={user}
        setRefetchData={setRefetchData}
        setOpenedOffer={setOpenedOffer}
      />
    </div>
  );
};

export default OffersContainer;
