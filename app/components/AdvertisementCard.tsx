"use client";
import React, { useState, useEffect } from "react";
import WheelIcon from "../../public/images/icons/wheel_icon.svg";
import { ActiveFormFields } from "../(root)/zlecenie/components/OfertForm";

interface CarOffer {
  mark: string;
  model: string;
  cost: number;
  color?: string | undefined;
  fuelType?: string | undefined;
  mileage?: number | undefined;
  bodyType?: string | undefined;
  hp?: number | undefined;
}

const AdvertisementCard = () => {
  const [carOffer, setCarOffer] = useState<CarOffer | null>(null);

  const getCarOfferFromCookie = (): ActiveFormFields | null => {
    const cookies = document.cookie.split("; ");
    const carOfferCookie = cookies.find((cookie) =>
      cookie.startsWith("car_offer=")
    );

    if (carOfferCookie) {
      try {
        const cookieValue = carOfferCookie.split("=")[1];
        return JSON.parse(decodeURIComponent(cookieValue)) as ActiveFormFields;
      } catch (error) {
        console.error("Error parsing the car_offer cookie:", error);
        return null;
      }
    }

    return null;
  };

  useEffect(() => {
    const carOfferFromCookie = getCarOfferFromCookie();
    // setCarOffer(carOfferFromCookie);
  }, []);

  if (carOffer) {
    return (
      <div
        className="grid items-center bg-white px-5 py-6 rounded-[16px] shadow-md"
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <div>
          <WheelIcon width={26} height={26} className="mr-5" />
        </div>
        <div className="flex">
          <h6 className="desktop-h6 flex-grow">{carOffer.model}</h6>
          <span className="text-WHITE-600 desktop-small">Twoje zlecenie</span>
        </div>
        <div></div>
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="bg-AQUA-100 text-AQUA-400 h-6 px-2 rounded-[5px] flex items-center justify-center desktop-small">
            Kupię
          </div>

          <div className="bg-AQUA-100 text-AQUA-400 h-6 px-2 rounded-[5px] flex items-center justify-center desktop-small">
            Maksymalna kwota: {carOffer.cost} zł
          </div>

          <div className="bg-AQUA-100 text-AQUA-400 h-6 px-2 rounded-[5px] flex items-center justify-center desktop-small">
            Rok produkcji: 2024
          </div>

          <div className="bg-AQUA-100 text-AQUA-400 h-6 px-2 rounded-[5px] flex items-center justify-center desktop-small">
            Kolor: {carOffer.color}
          </div>

          <div className="bg-AQUA-100 text-AQUA-400 h-6 px-2 rounded-[5px] flex items-center justify-center desktop-small">
            Przebieg do: {carOffer.mileage}
          </div>

          <div className="bg-AQUA-100 text-AQUA-400 h-6 px-2 rounded-[5px] flex items-center justify-center desktop-small">
            Rodzaj paliwa: {carOffer.fuelType}
          </div>
        </div>
        <div></div>
        <div className="text-BLACK-500 desktop-small mt-3">
          <button>Edytuj</button>
        </div>
      </div>
    );
  }
};

export default AdvertisementCard;
