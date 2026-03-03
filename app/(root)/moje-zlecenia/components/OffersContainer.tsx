"use client";
import React, { useEffect, useState } from "react";
import MyOffers from "./MyOffers";
import OpenedOffer from "./OpenedOffer";
import { useRouter, useSearchParams } from "next/navigation";
import MyOffersAccord from "./MyOffersAccord";
import { getOffersForUser } from "@/app/actions/getOffersForUser";
import LoadingSpinner from "../../blog/components/LoadingSpinner";
import MessageModalAceept from "./MessageModalAceept";
import { ToastContainer } from "react-toastify";

interface Props {
  user: any;
}

const OffersContainer = ({ user }: Props) => {
  const [openedOffer, setOpenedOffer] = useState<FullOffer | null>(null);
  const [userOffers, setUserOffers] = useState<FullOffer[]>([]);
  const [revalidate, setRevalidate] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const offerId = searchParams.get("offerId");

  const fetchUserOffers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/allUserOffers/${user.userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      const updatedOffers = data.data;
      setUserOffers(updatedOffers);

      // Update openedOffer if it exists
      if (openedOffer) {
        const refreshedOffer = updatedOffers.find(
          (uo: any) => uo.offerId === openedOffer.offerId
        );
        if (refreshedOffer) {
          setOpenedOffer(refreshedOffer);
        }
      }

      return updatedOffers;
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOffers();
  }, []);

  useEffect(() => {
    if (revalidate) {
      fetchUserOffers();
      setRevalidate(false);
    }
  }, [revalidate]);

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

  return (
    <>
      <ToastContainer />
      <div className="grid w-full gap-10 mt-14 my-offers-grid">
        {modalActive && (
          <div
            className="bg-BLACK-600 opacity-70 w-full z-50 h-full max-h-[2000px] fixed top-0 left-0 flex"
            onClick={() => {
              setModalActive(false);
            }}
          ></div>
        )}
        {modalActive && (
          <MessageModalAceept
            openedOffer={openedOffer}
            user={user}
            setRevalidate={setRevalidate}
            setModalActive={setModalActive}
          />
        )}
        <MyOffers
          openedOffer={openedOffer}
          setOpenedOffer={setOpenedOffer}
          userOffers={userOffers}
        />

        <MyOffersAccord
          openedOffer={openedOffer}
          setOpenedOffer={setOpenedOffer}
          userOffers={userOffers}
        />
        {loading ? (
          <div className="w-full mt-12 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <OpenedOffer
            openedOffer={openedOffer}
            setOpenedOffer={setOpenedOffer}
            setModalActive={setModalActive}
          />
        )}
      </div>
    </>
  );
};

export default OffersContainer;
