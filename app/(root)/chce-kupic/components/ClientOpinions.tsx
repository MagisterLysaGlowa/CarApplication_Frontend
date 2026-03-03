"use client";
import React, { useState } from "react";
import ClientOpnionCard from "./ClientOpnionCard";
import "../../../css/white.css";
import Link from "next/link";

const ClientOpinions = () => {
  const [opinions] = useState<ClientOpinion[]>([
    {
      rating: 3,
      comment:
        "Szukałem konkretnego BMW – w odpowiednim kolorze i z wybranym silnikiem – ale nigdzie nie mogłem znaleźć tego, co mi odpowiadało. Na tej stronie wpisałem swoje wymagania i jeszcze tego samego dnia trafiłem na auto, które idealnie pasowało. Cały proces przebiegł sprawnie i bez komplikacji. Polecam!",
      avatar: "avatar_1.jpg",
      name: "Wiktor",
      surname: "Kubicki",
      car: "BMW x5",
      cost: 89000,
    },
    {
      rating: 3.5,
      comment:
        "Bardzo fajna strona, polecam każdemu! Z żoną potrzebowaliśmy rodzinnego samochodu elektrycznego który sprosta wielu wymaganiom. Nie wiedziałem jaki konkretny model zabrać, więc wypełniłem zlecenie i otrzymałem znakomite rekomendacje i to w cenie jaka mi odpowiadała. POLECAM!",
      avatar: "avatar_2.jpg",
      name: "Paweł",
      surname: "Ostój",
      car: "Skoda Enyaq",
      cost: 124000,
    },
    {
      rating: 5,
      comment:
        "Świetna strona, bardzo intuicyjna i łatwa w obsłudze! Szukałem auta z napędem na cztery koła do jazdy w trudniejszych warunkach, a dzięki zaawansowanym filtrom mogłem precyzyjnie określić moje potrzeby. Już po kilku godzinach dostałem kilka interesujących ofert. Cały proces zakupu rewelacja! ",
      avatar: "avatar_3.jpg",
      name: "Bartłomiej",
      surname: "Waligóra",
      car: "Jeep Cherokee",
      cost: 86000,
    },
  ]);
  return (
    <section className="w-full flex flex-col items-center bg-[#F2F7FF] mt-12 pb-12 lg:mt-24 lg:pb-24 px-5 2xl:px-0">
      <p className="mobile-small lg:desktop-small text-GOLD-400 text-center mt-16">
        Opinie o YourVehicle
      </p>
      <h2 className="mobile-h2 lg:desktop-h2 text-BLACK-700 mt-5 text-center">
        Co mówią nasi Klienci?
      </h2>

      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-3 lg:gap-8 mt-12">
        {opinions.map((item, index) => {
          return <ClientOpnionCard key={index} clientOpinion={item} />;
        })}
      </div>
    </section>
  );
};

export default ClientOpinions;
