"use client";
import React from "react";
import Image from "next/image";
import CarSectionImage from "../../../../public/images/about/carSection.webp";
type Props = {};

const CarSection = (props: Props) => {
  return (
    <section className="w-full flex items-center justify-center bg-[#F2F7FF] h-[60px] sm:h-[100px] md:h-[160px] lg:h-[200px] xl:h-[280px]">
      <div className="w-full max-w-[1400px] px-3 xl:px-5">
        <Image
          src={CarSectionImage}
          alt="car section"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default CarSection;
