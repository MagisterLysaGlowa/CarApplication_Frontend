import React from "react";
import "../../css/body.css";
import OfferContainer from "./components/OfferContainer";
import { getOffers } from "@/app/actions/getOffers";
import { getAuth } from "@/app/actions/getAuth";
import { ToastContainer } from "react-toastify";

const Page = async () => {
  const user = await getAuth();

  return (
    <main className="w-full flex justify-center mt-12 mb-24">
      <ToastContainer />
      <section className="flex flex-col max-w-[1400px] w-full items-center">
        <header>
          <p className="text-GOLD-400 mobile-small lg:desktop-small text-center">
            Tutaj znajdziesz kupców
          </p>
          <h2 className="mobile-h2 lg:mobile-h2 text-[#272727] text-center mt-8">
            Zlecenia osób kupujących
          </h2>
          <p className="text-[#363636] mobile-normal lg:desktop-normal text-center max-w-[600px] mt-6">
            Zapoznaj się z ogłoszeniami od osób poszukujących swoich wymarzonych
            samochodów. Może właśnie ktoś szuka auta, które Ty chcesz sprzedać!
          </p>
        </header>
        <OfferContainer user={user?.data} />
      </section>
    </main>
  );
};

export default Page;
