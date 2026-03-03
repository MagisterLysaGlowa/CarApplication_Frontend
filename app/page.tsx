import Link from "next/link";
import Hero from "./components/Hero";
import Pill from "./components/Pill";
import DocumentIcon from "../public/images/icons/welcome_document.svg";
import WalletIcon from "../public/images/icons/welcome_wallet.svg";
import ClockIcon from "../public/images/icons/welcome_clock.svg";

export default function WelcomePage() {
  return (
    <main className="w-full flex justify-center">
      <section className="h-screen flex-grow">
        <div className="flex flex-col lg:grid grid-cols-2 lg:gap-[100px] 2xl:gap-[200px] h-full px-3 py-5 lg:py-14 lg:px-14 lg:items-center">
          <Hero />
          <article className="w-full mt-10 lg:mt-0 px-2 lg:px-0 flex flex-col items-center">
            <h1 className="mobile-h1 md:desktop-h1 md:max-w-[500px] tracking-tight text-center">
              Szukasz auta? A może chcesz sprzedać?
            </h1>
            <h4 className="mobile-h4 md:desktop-h4 mt-5 md:max-w-[500px] tracking-tight text-center">
              Bez ogłoszeń. Bez spamu. Tylko konkrety.
            </h4>
            <p
              className="mobile-large md:desktop-h5 mt-4 lg:mt-8 md:max-w-[480px] text-center"
              style={{ fontWeight: 400 }}
            >
              Zamiast przeszukiwać tysiące ogłoszeń – opisz, czego szukasz, a my
              pokażemy Ci dopasowane oferty. Zamiast czekać, aż ktoś przypadkiem
              znajdzie Twoje auto – zobacz, kto już go szuka.
            </p>
            <div className=" lg:mt-12 mt-5 flex flex-row gap-8 flex-wrap justify-center">
              <div
                className={`grid items-center lg:place-items-center max-w-[190px]`}
                style={{ gridTemplateColumns: "auto 1fr" }}
              >
                <DocumentIcon width={26} height={26} />
                <p className="ml-2 mobile-normal lg:desktop-normal">
                  Jeden formularz = dopasowane oferty
                </p>
              </div>

              <div
                className={`grid items-center lg:place-items-center max-w-[220px]`}
                style={{ gridTemplateColumns: "auto 1fr" }}
              >
                <WalletIcon width={26} height={26} />
                <p className="ml-2 mobile-normal lg:desktop-normal">
                  Skuteczna sprzedaż bez wystawiania ogłoszenia
                </p>
              </div>

              <div
                className={`grid items-center lg:place-items-center max-w-[200px]`}
                style={{ gridTemplateColumns: "auto 1fr" }}
              >
                <ClockIcon width={26} height={26} />
                <p className="ml-2 mobile-normal lg:desktop-normal">
                  Oszczędność czasu, zero spamu
                </p>
              </div>
              {/* <Pill text="Jeden formularz = dopasowane oferty" />
              <Pill text="Skuteczna sprzedaż bez wystawiania ogłoszenia" />
              <Pill text="Oszczędność czasu, zero spamu" /> */}
            </div>

            <div className="mt-12 md:max-w-[500px] flex flex-row flex-wrap gap-x-8 gap-y-5 justify-center mb-10 sm:mb-0">
              <Link
                href={"/chce-kupic"}
                className="aqua-btn !py-5 sm:w-auto w-[250px] lg:px-10"
              >
                Kupuje samochód
              </Link>
              <Link
                href={"/chce-sprzedac"}
                className="aqua-border-btn sm:w-auto w-[250px] lg:px-8 !py-5"
              >
                Sprzedaje samochód
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
