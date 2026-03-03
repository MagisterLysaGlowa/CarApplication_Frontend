import React from "react";
import OffersContainer from "./components/OffersContainer";
import "../../css/body.css";
import { getOffersForUser } from "@/app/actions/getOffersForUser";
import { getFavouriteUserOffers } from "@/app/actions/getFavouriteUserOffers";
import { ToastContainer } from "react-toastify";
import { getAuth } from "@/app/actions/getAuth";

const page = async () => {
  const userOffers = await getFavouriteUserOffers();
  const user = await getAuth();

  // Check if userOffers and userOffers.data are defined
  if (!userOffers || !userOffers.data) {
    return (
      <main className="w-full flex justify-center mb-24">
        <section className="w-full max-w-[1400px] flex flex-col items-center mt-12">
          <p className="text-GOLD-400 mobile-small lg:desktop-small text-center">
            Pokaż nam czego potrzebujesz
          </p>
          <h2 className="mobile-h2 lg:desktop-h2 text-[#272727] mt-8 text-center">
            Zapisane zlecenia
          </h2>
          <p className="text-[#363636] mobile-normal lg:desktop-normal text-center mt-6 max-w-[700px]">
            Nie udało się załadować zleceń.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full flex justify-center mb-24 xl:px-0 px-3">
      <ToastContainer />
      <section className="w-full max-w-[1400px] flex flex-col items-center mt-12">
        <p className="text-GOLD-400 mobile-small lg:desktop-small text-center">
          Pokaż nam czego potrzebujesz
        </p>
        <h2 className="mobile-h2 lg:desktop-h2 text-[#272727] mt-8 text-center">
          Zapisane zlecenia
        </h2>
        <p className="text-[#363636] mobile-normal lg:desktop-normal text-center mt-6 max-w-[700px]">
          Tutaj właśnie znajdziesz to czego potrzebujesz. Dodaj nowe zlecenia
          lub odśwież już istniejące aby sprzedający mogli wciąż odpowiadać na
          Twoje zlecenie.
        </p>
        <OffersContainer userOffers={userOffers.data} user={user.data} />
      </section>
    </main>
  );
};

export default page;
