import React from "react";
import "../../../css/body.css";
import Header from "./components/Header";
import OfertForm from "./components/OfertForm";
import { ToastContainer } from "react-toastify";
import { getAuth } from "@/app/actions/getAuth";

const fetchOfferData = async (offerId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/${offerId}`,
    { cache: "no-store" } // Ensures fresh data on every request
  );
  if (!res.ok) {
    throw new Error("Failed to fetch offer data");
  }
  const data = await res.json();
  return data.data;
};

const OfertPage = async ({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) => {
  const offerId = (await params).offerId;
  try {
    const offerDb: FullOffer = await fetchOfferData(offerId);
    const user = await getAuth();

    if (offerDb && user) {
      return (
        <main className="w-full flex justify-center mb-32 px-3 sm:px-0">
          <ToastContainer />
          <section className="w-full max-w-[650px]">
            <Header />
            <div className="bg-WHITE-100 rounded-[48px] px-5 sm:px-10 py-10 mt-12">
              <OfertForm offerDb={offerDb} user={user} />
            </div>
          </section>
        </main>
      );
    }
  } catch (error) {
    return <p className="text-center text-red-500">Offer not found.</p>;
  }
};

export default OfertPage;
