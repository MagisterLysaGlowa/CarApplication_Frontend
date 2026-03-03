"use client";
import React, { useState } from "react";
import Accord from "./Accord";

const AccordMenu = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Accord
        question="Ile kosztuje wystawienie zgłoszenia?"
        answer="Nie. Nasz serwis pomaga kupującym znaleźć swój idealny samochód a sprzedającym znaleźć idealnego kupca. Jednak to obie strony ustalają w jaki sposób dojdzie do transakcji między nimi."
        isActive={activeIndex === 0}
        onToggle={() => handleToggle(0)}
      />
      <Accord
        question="Czy mogę przeglądać oferty bez rejestracji konta?"
        answer="Nie. Nasz serwis pomaga kupującym znaleźć swój idealny samochód a sprzedającym znaleźć idealnego kupca. Jednak to obie strony ustalają w jaki sposób dojdzie do transakcji między nimi."
        isActive={activeIndex === 1}
        onToggle={() => handleToggle(1)}
      />
      <Accord
        question="Czy serwis pośredniczy w transakcjach finansowych?"
        answer="Nie. Nasz serwis pomaga kupującym znaleźć swój idealny samochód a sprzedającym znaleźć idealnego kupca. Jednak to obie strony ustalają w jaki sposób dojdzie do transakcji między nimi."
        isActive={activeIndex === 2}
        onToggle={() => handleToggle(2)}
      />
      <Accord
        question="Czy mogę poszukiwać więcej niż jeden samochód?"
        answer="Nie. Nasz serwis pomaga kupującym znaleźć swój idealny samochód a sprzedającym znaleźć idealnego kupca. Jednak to obie strony ustalają w jaki sposób dojdzie do transakcji między nimi."
        isActive={activeIndex === 3}
        onToggle={() => handleToggle(3)}
      />
      <Accord
        question="Czy mogę negocjować cenę samochodu?"
        answer="Nie. Nasz serwis pomaga kupującym znaleźć swój idealny samochód a sprzedającym znaleźć idealnego kupca. Jednak to obie strony ustalają w jaki sposób dojdzie do transakcji między nimi."
        isActive={activeIndex === 4}
        onToggle={() => handleToggle(4)}
      />
    </div>
  );
};

export default AccordMenu;
