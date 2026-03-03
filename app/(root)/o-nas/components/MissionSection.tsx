import React from "react";
import Mission from "../../../../public/images/about/mission.webp";
import Image from "next/image";
type Props = {};

const MissionSection = (props: Props) => {
  return (
    <section className="w-full bg-WHITE-100 flex justify-center pt-12 xl:pt-20  mb-12 lg:mb-24 2xl:px-0 px-10">
      <div className="grid gap-x-20 w-full max-w-[1400px] lg:grid-cols-2 grid-cols-1 place-items-center">
        <div className="w-full flex flex-col items-center justify-center text-WHITE-100 text-left 2xl:!pr-48 ">
          <h2 className="mobile-h1 lg:desktop-h1 text-BLACK-600 self-start lg:text-start text-center w-full">
            Nasza misja i wizja
          </h2>
          <p className="text-BLACK-500 mobile-normal lg:desktop-large mt-8 lg:text-start text-center">
            Naszą misją jest uproszczenie procesu kupna i sprzedaży samochodów –
            bez ogłoszeń, bez stresu i bez straty czasu. Chcemy zbudować
            miejsce, gdzie ludzie spotykają się wokół realnych potrzeb, a nie
            przypadkowych ofert.
          </p>
          <p className="text-BLACK-500 mobile-normal lg:desktop-large mt-3 lg:text-start text-center">
            Wierzymy, że nowoczesna technologia może działać na Twoją korzyść –
            dlatego stawiamy na dopasowanie zamiast przeszukiwania, konkret
            zamiast chaosu, i kontakt tylko wtedy, gdy naprawdę warto.
          </p>
          <p className="text-BLACK-500 mobile-normal lg:desktop-large mt-3 lg:text-start text-center">
            Naszą wizją jest platforma, która zmienia sposób, w jaki myślimy o
            rynku motoryzacyjnym – bardziej osobisty, bardziej precyzyjny i
            znacznie skuteczniejszy.
          </p>
        </div>
        <div className="w-full flex justify-center lg:justify-start">
          <Image
            src={Mission}
            alt="mission"
            width={800}
            height={600}
            className=" mt-8 lg:mt-0"
          />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
