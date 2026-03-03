"use client";
import React, { useEffect, useState } from "react";
import OfferAccord from "./OfferAccord";

interface Props {
  offers: FullOffer[];
  user: any;
}
const OfferList = (props: Props) => {
  const { offers, user } = props;
  const [favourite, setFavourite] = useState<FavouriteUserOffer[]>([]);
  const [refetchData, setRefetchData] = useState<boolean>(false);

  const fetchFavourite = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/FavouriteUserOffer/user/${user.userId}`
    );
    const data = await res.json();
    setFavourite(data);
  };

  useEffect(() => {
    fetchFavourite();
  }, []);

  useEffect(() => {
    fetchFavourite();
    setRefetchData(false);
  }, [refetchData]);

  return (
    <div className="flex flex-col gap-5 items-center max-w-[800px] w-full mt-12 px-2">
      {offers.map((item, index) => {
        return (
          <OfferAccord
            offer={item}
            key={index}
            user={user}
            setRefetchData={setRefetchData}
            userFavourite={favourite.some((f) => f.offerId == item.offerId)}
          />
        );
      })}
    </div>
  );
};

export default OfferList;
