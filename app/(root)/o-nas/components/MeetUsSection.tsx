import React from "react";
import MeetUs from "../../../../public/images/about/meetus.webp";
import Image from "next/image";
import Link from "next/link";
type Props = {};

const MeetUsSection = (props: Props) => {
  return (
    <section className="w-full bg-[#0066FF] flex flex-col items-center relative pt-12">
      <div className="grid gap-x-20 grid-cols-1 lg:grid-cols-2 w-full mt-[400px] lg:mt-0 h-[150px] sm:h-[0px] lg:h-[520px] xl:h-[620px]">
        <div></div>
        <div className=" w-full h-ful flex items-end lg:pt-52 xl:pt-32 2xl:pt-12">
          <Image
            src={MeetUs}
            alt="meet us"
            height={540}
            width={1000}
            className="xl:block hidden"
          />
        </div>
      </div>
      <div className="px-10  h-full absolute top-1/2 translate-y-[-50%]  w-full flex justify-center place-items-center !left-0">
        <div className="grid gap-x-20 xl:grid-cols-2 grid-cols-1 place-content-center h-full max-w-[1400px] w-full place-items-center xl:place-items-start ">
          <div className="max-w-[500px] w-full flex flex-col text-WHITE-100 text-left h-full">
            <h2 className="mobile-h1 lg:desktop-h1 text-WHITE-100 self-start text-center w-full xl:w-auto xl:text-start">
              Poznaj nasz portal
            </h2>
            <p className="text-WHITE-100 mobile-normal lg:desktop-large mt-8  text-center w-full xl:w-auto xl:text-start">
              YourVehicle to nowoczesna alternatywa dla tradycyjnych serwisów
              ogłoszeniowych. Zamiast przewijać setki ofert lub publikować
              swoje, użytkownicy działają na podstawie konkretnych potrzeb i
              dopasowań.
            </p>
            <p className="text-WHITE-100 mobile-normal lg:desktop-large mt-3  text-center w-full xl:w-auto xl:text-start">
              Platforma upraszcza cały proces – wszystko opiera się na realnych
              intencjach, bez spamu, bez przypadkowych kontaktów i bez zbędnych
              kroków. To miejsce stworzone po to, by połączyć ludzi, którzy
              wiedzą, czego chcą – i umożliwić im szybki, bezpośredni kontakt.
            </p>
            <p className="text-WHITE-100 mobile-normal lg:desktop-large mt-3  text-center w-full xl:w-auto xl:text-start">
              Intuicyjnie, konkretnie i skutecznie. Tak działa współczesny
              handel samochodami.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 self-center sm:self-start justify-center xl:justify-start mt-8 w-full ">
              <Link
                className="light-btn lg:desktop-normal sm:mobile-normal mobile-small"
                href={"/chce-kupic"}
              >
                Kupuje samochod
              </Link>
              <Link
                className="light-btn !text-WHITE-100 !bg-transparent lg:desktop-normal sm:mobile-normal  mobile-small"
                href={"/chce-sprzedac"}
              >
                Sprzedaje samochod
              </Link>
            </div>
          </div>
          <div className="w-full xl:pt-12 h-full flex items-end relative"></div>
        </div>
      </div>
    </section>
  );
};

export default MeetUsSection;
