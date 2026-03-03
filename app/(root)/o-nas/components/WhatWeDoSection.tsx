import React from "react";
import CheckIcon from "../../../../public/images/about/check_icon.svg";
type Props = {};

const WhatWeDoSection = (props: Props) => {
  return (
    <section className="flex w-full justify-center py-24 bg-WHITE-100 2xl:px-0 px-10">
      <div className="w-full max-w-[1400px] gap-x-0 grid xl:grid-cols-7 grid-cols-1">
        <article className=" !self-center place-self-center lg:place-self-end xl:pr-24 col-span-4">
          <h2 className="mobile-h1 lg:desktop-h1 xl:text-start text-center">
            Co możemy dla Ciebie zrobić?
          </h2>
          <p className="text-BLACK-500 mobile-small sm:mobile-normal lg:desktop-large mt-8  xl:text-start text-center">
            Na naszej platformie możesz szybko i wygodnie kupić lub sprzedać
            samochód, bez potrzeby przeglądania tysięcy ogłoszeń czy wystawiania
            własnych ofert.
          </p>
          <p className="text-BLACK-500 mobile-small sm:mobile-normal lg:desktop-large mt-3  xl:text-start text-center">
            Jeśli szukasz auta, po prostu wypełniasz zlecenie, w którym
            określasz, czego dokładnie potrzebujesz – marki, modelu, rocznika
            czy budżetu. Zamiast szukać na własną rękę, otrzymujesz dopasowane
            propozycje od realnych sprzedawców.
          </p>
          <p className="text-BLACK-500 mobile-small sm:mobile-normal lg:desktop-large mt-3  xl:text-start text-center">
            Jeśli sprzedajesz, zyskujesz dostęp do zleceń od osób, które już
            szukają auta takiego jak Twoje. Wybierasz interesujące Cię zapytania
            i odpowiadasz bezpośrednio – bez konieczności publikowania
            ogłoszenia.
          </p>
          <p className="text-BLACK-500 mobile-small sm:mobile-normal lg:desktop-large mt-3  xl:text-start text-center">
            Każde zlecenie jest przez nas weryfikowane, więc masz pewność, że
            kontaktujesz się z osobami naprawdę zainteresowanymi. Dzięki temu
            oszczędzasz czas, unikasz spamu i skupiasz się tylko na konkretnych
            ofertach, które mają sens.
          </p>
        </article>

        <article className="w-full grid gap-y-8 gap-x-8 sm:grid-cols-2 grid-cols-1 col-span-3 mt-12 xl:mt-0  xl:px-0 sm:px-10 md:px-20 lg:px-40">
          <div className="bg-[#F2F7FF] 2xl:px-10 py-8 rounded-[32px] shadow-sm flex flex-col 2xl:items-start items-center">
            <CheckIcon width={50} height={50} />
            <h5
              className="mobile-large lg:desktop-large mt-3 2xl:text-start text-center"
              style={{ fontWeight: "700", fontFamily: "var(--font-red-hat)" }}
            >
              Bez ogłoszeń, bez spamu
            </h5>
            <p className="text-BLACK-500 mobile-normal lg:desktop-normal mt-2 2xl:text-start text-center">
              Wszystko dzieje się na podstawie konkretnych zleceń.
            </p>
          </div>

          <div className="bg-[#F2F7FF] 2xl:px-10 py-8 rounded-[32px] shadow-sm flex flex-col 2xl:items-start items-center">
            <CheckIcon width={50} height={50} />
            <h5
              className="mobile-large lg:desktop-large mt-3 2xl:text-start text-center"
              style={{ fontWeight: "700", fontFamily: "var(--font-red-hat)" }}
            >
              Dopasowanie zamiast szukania
            </h5>
            <p className="text-BLACK-500 mobile-normal lg:desktop-normal mt-2 2xl:text-start text-center">
              Nie przeglądasz – dostajesz to, co pasuje.
            </p>
          </div>

          <div className="bg-[#F2F7FF] 2xl:px-10 py-8 rounded-[32px] shadow-sm flex flex-col 2xl:items-start items-center">
            <CheckIcon width={50} height={50} />
            <h5
              className="mobile-large lg:desktop-large mt-3 2xl:text-start text-center"
              style={{ fontWeight: "700", fontFamily: "var(--font-red-hat)" }}
            >
              Zweryfikowani użytkownicy
            </h5>
            <p className="text-BLACK-500 mobile-normal lg:desktop-normal mt-2 2xl:text-start text-center">
              Każde zlecenie przechodzi kontrolę jakości.
            </p>
          </div>

          <div className="bg-[#F2F7FF] 2xl:px-10 py-8 rounded-[32px] shadow-sm flex flex-col 2xl:items-start items-center">
            <CheckIcon width={50} height={50} />
            <h5
              className="mobile-large lg:desktop-large mt-3 2xl:text-start text-center"
              style={{ fontWeight: "700", fontFamily: "var(--font-red-hat)" }}
            >
              Szybki kontakt, realne oferty
            </h5>
            <p className="text-BLACK-500 mobile-normal lg:desktop-normal mt-2 2xl:text-start text-center">
              Wysyłasz wiadomość tylko tam, gdzie warto.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
