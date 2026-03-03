import React from "react";
import WheelIcon from "../../../../public/images/offer/wheel_icon.svg";
import CarIcon from "../../../../public/images/offer/car_icon.svg";
import CostIcon from "../../../../public/images/offer/cost_icon.svg";
import ColorIcon from "../../../../public/images/offer/color_icon.svg";
import SettingIcon from "../../../../public/images/offer/settings_icon.svg";
import HorseIcon from "../../../../public/images/offer/horse_icon.svg";
import CommentIcon from "../../../../public/images/offer/comment_icon.svg";
import SuspensionIcon from "../../../../public/images/icons/suspension.svg";
import CalendarIcon from "../../../../public/images/icons/calendar_icon.svg";
import FuelIcon from "../../../../public/images/icons/fuel.svg";
import DoorIcon from "../../../../public/images/icons/door.svg";
import DriveIcon from "../../../../public/images/icons/drive.svg";
import GearBoxIcon from "../../../../public/images/icons/gearbox.svg";
import GenerationIcon from "../../../../public/images/icons/generation.svg";
import CountryIcon from "../../../../public/images/icons/country.svg";
import CarStateIcon from "../../../../public/images/icons/car_state.svg";

type Props = {
  car: FullOffer | null;
};

const CarInfoBox = (props: Props) => {
  const { car } = props;
  return (
    <div className="flex flex-col gap-5 mt-3">
      {car?.mark && (
        <div className="flex gap-2">
          <WheelIcon width={25} height={25} fill="#0066FF" />
          <p className="mobile-normal lg:desktop-normal">
            Szukam samochodu marki:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.mark}
            </span>
          </p>
        </div>
      )}

      {car?.model && (
        <div className="flex gap-2">
          <CarIcon width={25} height={25} fill="#0066FF" />
          <p className="mobile-normal lg:desktop-normal">
            Model pojazdu:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.model}
            </span>
          </p>
        </div>
      )}

      {car?.generation && (
        <div className="flex gap-2">
          <GenerationIcon
            width={25}
            height={25}
            fill="#0066FF"
            stroke="#0066FF"
          />
          <p className="mobile-normal lg:desktop-normal">
            Generacja pojazdu:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.generation}
            </span>
          </p>
        </div>
      )}

      {car?.price && (
        <div className="flex gap-2">
          <CostIcon width={25} height={25} fill="#0066FF" />
          <p className="mobile-normal lg:desktop-normal">
            Maksymalna kwota pojazdu:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.price} zł
            </span>
          </p>
        </div>
      )}

      {car?.bodyTypes && car?.bodyTypes.length > 0 && (
        <div className="flex gap-2">
          <SuspensionIcon
            width={25}
            height={25}
            fill="#0066FF"
            stroke="#0066FF"
            strokeWidth={2}
            className="translate-x-[-1px]"
          />
          <p className="mobile-normal lg:desktop-normal">
            Nadwozie:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.bodyTypes.map((item, index) => (
                <strong key={index}>
                  {`${item.name} ${
                    index < car?.bodyTypes?.length! - 1 ? "," : ""
                  }`}{" "}
                </strong>
              ))}
            </span>
          </p>
        </div>
      )}

      {car?.colors && car?.colors.length > 0 && (
        <div className="flex gap-2">
          <ColorIcon width={25} height={25} fill="#0066FF" />
          <p className="mobile-normal lg:desktop-normal">
            Kolor:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.colors.map((item, index) => (
                <strong key={index}>
                  {`${item.colorName} ${
                    index < car?.colors?.length! - 1 ? "," : ""
                  }`}{" "}
                </strong>
              ))}
            </span>
          </p>
        </div>
      )}

      {car?.mileageFrom && car?.mileageTo && (
        <div className="flex gap-2">
          <SettingIcon width={25} height={25} fill="#0066FF" />
          <p className="mobile-normal lg:desktop-normal">
            Przebieg:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              od {car?.mileageFrom} do {car?.mileageTo} km
            </span>
          </p>
        </div>
      )}

      {car?.horsePowerFrom && car?.horsePowerTo && (
        <div className="flex gap-2">
          <HorseIcon width={25} height={25} fill="#0066FF" />
          <p className="mobile-normal lg:desktop-normal">
            Liczba koni mechanicznych:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              od {car?.horsePowerFrom} do {car?.horsePowerTo} KM
            </span>
          </p>
        </div>
      )}

      {car?.yearOfProductionFrom && car?.yearOfProductionTo && (
        <div className="flex gap-2">
          <CalendarIcon width={25} height={25} fill="#0066FF" />
          <p className="mobile-normal lg:desktop-normal">
            Rok produkcji:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              od {car?.yearOfProductionFrom}r do {car?.yearOfProductionTo}r
            </span>
          </p>
        </div>
      )}

      {car?.fuelTypes && car?.fuelTypes.length > 0 && (
        <div className="flex gap-2">
          <FuelIcon
            width={25}
            height={25}
            fill="#0066FF"
            className="scale-[1.4] translate-x-[-2px]"
          />
          <p className="mobile-normal lg:desktop-normal">
            Rodzaj paliwa:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.fuelTypes.map((item, index) => (
                <strong key={index}>
                  {`${item.name} ${
                    index < car?.fuelTypes?.length! - 1 ? "," : ""
                  }`}{" "}
                </strong>
              ))}
            </span>
          </p>
        </div>
      )}

      {car?.doorsCounts && car?.doorsCounts.length > 0 && (
        <div className="flex gap-2">
          <DoorIcon
            width={25}
            height={25}
            fill="#0066FF"
            className="scale-[1.2] translate-x-[-3px]"
          />
          <p className="mobile-normal lg:desktop-normal">
            Liczba drzwi:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.doorsCounts.map((item, index) => (
                <strong key={index}>
                  {`${item.doorsQuantity.toString()} ${
                    index < car?.doorsCounts?.length! - 1 ? "," : ""
                  }`}{" "}
                </strong>
              ))}
            </span>
          </p>
        </div>
      )}

      {car?.driveTypes && car?.driveTypes.length > 0 && (
        <div className="flex gap-2">
          <DriveIcon
            width={25}
            height={25}
            fill="#0066FF"
            stroke="#0066FF"
            className="scale-[1.2] translate-x-[-3px]"
          />
          <p className="mobile-normal lg:desktop-normal">
            Napęd:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.driveTypes.map((item, index) => (
                <strong key={index}>
                  {`${item.name} ${
                    index < car?.driveTypes?.length! - 1 ? "," : ""
                  }`}{" "}
                </strong>
              ))}
            </span>
          </p>
        </div>
      )}

      {car?.gearBoxes && car?.gearBoxes.length > 0 && (
        <div className="flex gap-2">
          <GearBoxIcon
            width={25}
            height={25}
            fill="#0066FF"
            className="scale-[1.2] translate-x-[-3px]"
          />
          <p className="mobile-normal lg:desktop-normal">
            Skrzynia biegów:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.gearBoxes.map((item, index) => (
                <strong key={index}>
                  {`${item.name} ${
                    index < car?.gearBoxes?.length! - 1 ? "," : ""
                  }`}{" "}
                </strong>
              ))}
            </span>
          </p>
        </div>
      )}

      {car?.countryOfOrigins && car?.countryOfOrigins.length > 0 && (
        <div className="flex gap-2">
          <CountryIcon
            width={25}
            height={25}
            stroke="#0066FF"
            strokeWidth={2}
            className="scale-[1.2] translate-x-[-2px]"
          />
          <p className="mobile-normal lg:desktop-normal">
            Kraj pochodzenia:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.countryOfOrigins.map((item, index) => (
                <strong key={index}>
                  {`${item.name} ${
                    index < car?.countryOfOrigins?.length! - 1 ? "," : ""
                  }`}{" "}
                </strong>
              ))}
            </span>
          </p>
        </div>
      )}

      {car?.carStates && car?.carStates.length > 0 && (
        <div className="flex gap-2">
          <CarStateIcon
            width={25}
            height={25}
            fill="#0066FF"
            className="scale-[1.1] translate-x-[-2px]"
          />
          <p className="mobile-normal lg:desktop-normal">
            Stan pojazdu:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.carStates.map((item, index) => (
                <strong key={index}>
                  {`${item.state} ${
                    index < car?.carStates?.length! - 1 ? "," : ""
                  }`}{" "}
                </strong>
              ))}
            </span>
          </p>
        </div>
      )}

      {car?.comment && (
        <div className="flex gap-2">
          <CommentIcon
            width={25}
            height={25}
            fill="#0066FF"
            className="scale-[1.1] translate-x-[-3px]"
          />
          <p className="mobile-normal lg:desktop-normal">
            Uwagi ogólne:{" "}
            <span className="mobile-normal-bold lg:desktop-normal-bold">
              {car?.comment}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CarInfoBox;
