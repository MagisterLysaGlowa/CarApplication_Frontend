import Image from "next/image";
import CardLanding1 from "../../../../public/images/landing/card_landing_1.svg";
import Link from "next/link";
const Description = () => {
  return (
    <section className="flex flex-col mt-14">
      <p className="text-ORANGE-400 desktop-small text-center text-GOLD-400">
        Proces poszukiwań
      </p>
      <h2 className="mobile-h2 md:desktop-h2 text-center mt-8">
        Jak to działa?
      </h2>
      <div className="w-full flex justify-center mt-16 px-5">
        <div className="w-full max-w-[1300px] description-grid-box gap-x-8 gap-y-5">
          <div className="row-span-2 bg-AQUA-100 description-main-frame rounded-[48px] overflow-hidden">
            <div
              className="py-4 sm:pt-8 px-8 flex-grow grid sm:flex flex-col gap-x-8 items-center sm:items-start"
              style={{ gridTemplateColumns: "1fr" }}
            >
              <div className="row-span-2 bg-[rgb(0,102,255,0.18)] w-16 h-16 rounded-full border-2 border-[#0066FF] flex justify-center items-center">
                <span className="text-[#0066FF] font-bold text-2xl">1</span>
              </div>
              <h5 className="mobile-h5 lg:desktop-h5 text-BLACK-600 mt-3 sm:mt-6">
                Znajdź odpowiednie dla Ciebie zlecenie
              </h5>
              <p className="mobile-normal lg:desktop-normal text-BLACK-500 mt-4 max-w-[400px] !leading-6">
                Nasi eksperci sprawdzą wiarygodność i realność zlecenia i
                opublikują ogłoszenie w 24h
              </p>
            </div>
            <Image
              src={"/images/landing/seller_about_1.webp"}
              alt="frame 1"
              width={500}
              height={200}
              className="sm:block hidden"
            />
          </div>

          <div className="bg-[#F2F7FF] flex rounded-[48px]  overflow-hidden">
            <div
              className="py-4 sm:pt-8 px-8 flex-grow grid sm:flex flex-col gap-x-8  items-center sm:items-start"
              style={{ gridTemplateColumns: "1fr" }}
            >
              <div className="row-span-2 bg-[rgb(0,102,255,0.18)] w-16 h-16 rounded-full border-2 border-[#0066FF] flex justify-center items-center">
                <span className="text-[#0066FF] font-bold text-2xl">2</span>
              </div>
              <h5 className="mobile-h5 lg:desktop-h5 text-BLACK-600  mt-3 sm:mt-6">
                Doładuj ilość kluczyków
              </h5>
              <p className="mobile-normal lg:desktop-normal text-BLACK-500 mt-4 sm:max-w-[200px] !leading-6">
                Wypełniając zlecenie odpowiedz na kilka pytań dotyczących
                Twojego wymarzonego samochodu
              </p>
            </div>
            <Image
              src={"/images/landing/seller_about_2.webp"}
              alt="frame 1"
              width={280}
              height={100}
              className="sm:block hidden"
            />
          </div>

          <div className="bg-AQUA-200 flex  rounded-[48px] overflow-hidden">
            <div
              className="py-4 sm:pt-8 px-8 flex-grow grid sm:flex flex-col gap-x-8 items-center sm:items-start"
              style={{ gridTemplateColumns: "1fr" }}
            >
              <div className="row-span-2 bg-[rgb(0,102,255,0.18)] w-16 h-16 rounded-full border-2 border-[#0066FF] flex justify-center items-center">
                <span className="text-[#0066FF] font-bold text-2xl">3</span>
              </div>
              <h5 className="mobile-h5 lg:desktop-h5 text-BLACK-600  mt-3 sm:mt-6 sm:max-w-[230px]">
                Złóż ofertę i napisz wiadomość do sprzedającego
              </h5>
              <p className="mobile-normal lg:desktop-normal text-BLACK-500 mt-4 sm:max-w-[230px]">
                Nasi eksperci sprawdzą wiarygodność i realność zlecenia i
                opublikują ogłoszenie w 24h
              </p>
            </div>
            <Image
              src={"/images/landing/seller_about_3.webp"}
              alt="frame 1"
              width={280}
              height={100}
              className="sm:block hidden"
            />
          </div>
        </div>
      </div>
      <Link
        className="aqua-btn mt-10 !py-2 md:!py-5 z-10 w-full max-w-[250px] self-center"
        href={"/zlecenia"}
      >
        Sprzedaję pojazd
      </Link>
    </section>
  );
};

export default Description;
