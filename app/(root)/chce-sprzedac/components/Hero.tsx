"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full flex items-center bg-[#F2F7FF] flex-col relative section-height-box h-[600px] sm:h-[550px] md:h-[600px] lg:h-[800px] xl:h-[900px] py-12 xl:py-24">
      {/* Opcje wyboru */}
      <div className="flex gap-5 z-10">
        <p className="mobile-small lg:desktop-small text-GOLD-400 opacity-50">
          Chcę kupić
        </p>
        <p className="mobile-small lg:desktop-small text-GOLD-400">
          Chcę sprzedać
        </p>
      </div>
      {/* Nagłówki */}
      <div className="flex flex-col items-center mt-4 sm:mt-12 z-10">
        <h1 className="mobile-h2 lg:desktop-h1 text-BLACK-600 text-center px-2 sm:px-0">
          Chcesz sprzedać auto?
        </h1>
        <h2
          className="mobile-h3 lg:desktop-h2-light text-center px-2 sm:px-0"
          style={{ fontWeight: 400 }}
        >
          Nie wystawiaj ogłoszeń, wybierz kupca
        </h2>
        <p className="mobile-normal lg:desktop-large text-BLACK-500 text-center mt-3 sm:mt-3 max-w-[580px] px-2 sm:px-0">
          Lista aktywnych zleceń czeka. Znajdź dopasowanie i wyślij ofertę w
          kilka kliknięć.
        </p>
      </div>
      <Link
        className="aqua-btn mt-2 lg:mt-8 !py-2 lg:!py-5 z-10 !transition-none"
        href={"/zlecenia"}
      >
        Sprzedaję pojazd
      </Link>
      {/* Tło napisu */}
      <div className="unselectable absolute top-[340px] sm:top-[290px] md:top-[260px] lg:top-[360px] xl:top-[400px] 2xl:top-[425px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center hero-line-height leading-[40px] sm:leading-[80px] md:leading-[120px] lg:leading-[170px] xl:leading-[210px] 2xl:leading-[230px]">
        <span className="block hero-small-hero-text text-[#eaeff6] hero-font font-normal text-[30px] sm:text-[80px] md:text-[100px] lg:text-[150px] xl:text-[200px] 2xl:text-[240px]">
          YOUR
        </span>
        <span className="block hero-large-hero-text text-[40px] sm:text-[100px] md:text-[130px] lg:text-[180px] xl:text-[220px] 2xl:text-[280px] text-[#eaeff6] font-extrabold hero-font sm:tracking-[20px] tracking-[5px]">
          VEHICLE
        </span>
      </div>
      <Image
        src={"/images/landing/seller_hero.webp"}
        alt="hero"
        width={1300}
        height={1000}
        className="absolute hero-car-image-box z-[20] top-[360px] sm:top-[310px] md:top-[285px] lg:top-[400px] xl:top-[460px]"
      />
    </section>
  );
};

export default Hero;
