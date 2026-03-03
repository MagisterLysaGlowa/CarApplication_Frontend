import React, { FC } from "react";
import LogoBig from "@/public/images/icons/LogoBig";
import Pill from "@/app/components/Pill";

const HeroSection: FC = ({}) => {
  return (
    <section
      className={`
        relative
        bg-cover bg-center bg-no-repeat
        text-white
        py-14 sm:py-36
      `}
      style={{ backgroundImage: `url("/images/about/hero.webp")` }}
    >
      {/* Półprzezroczysta nakładka, by tekst był lepiej widoczny */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Kontener, w którym ułożymy treści */}
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          {/* Lewa część - tekst */}
          <div className="md:w-1/2 space-y-4 max-w-[600px]">
            <h3 className="mobile-h3 lg:desktop-h3 font-bold">
              YourVehicle to nowoczesna platforma, która łączy kupujących i
              sprzedających auta – bez ogłoszeń, bez pośredników, bez spamu.
            </h3>

            <p className="leading-relaxed">
              Zamiast przeszukiwać setki ofert lub wystawiać ogłoszenia,
              korzystasz z dopasowań.
            </p>

            <p className="leading-relaxed">
              Kupujący określają, czego szukają. Sprzedający odpowiadają tylko
              tam, gdzie ich auto naprawdę pasuje.
            </p>
            <div className="grid mt-5 md:mt-0 gap-y-5 grid-cols-1 md:grid-cols-3 gap-x-5">
              <Pill text="Zero ogłoszeń, zero scrollowania" />
              <Pill text="Bez spamu, bez przypadkowych wiadomości" />
              <Pill text="Dopasowanie zamiast szukania" />
            </div>
          </div>

          {/* Prawa część - logo */}
          <div className="w-1/2 hidden md:flex md:justify-end mt-8 md:mt-0">
            <LogoBig />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
