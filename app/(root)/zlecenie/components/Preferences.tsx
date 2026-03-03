"use client";
import React, { useState } from "react";
import "../../../css/scrollbar.css";
import { ActiveFormFields } from "./OfertForm";

interface OfertFormField {
  id: string;
  id2?: string;
  placeholder: string;
  placeholder2?: string;
  name: keyof ActiveFormFields;
  name2?: keyof ActiveFormFields;
  fields?: "single" | "double" | "multiple";
  label: string;
  inputType: "select" | "text" | "number";
  active: boolean;
}

type Props = {
  formFields: OfertFormField[];
  setFormFields: (newFormFields: OfertFormField[]) => void;
};

interface Option {
  label: string;
  name: string;
}

const Preferences = (props: Props) => {
  const { formFields, setFormFields } = props;
  const [options] = useState<Option[]>([
    { label: "Generacja", name: "generation" },
    { label: "Typ nadwozia", name: "bodyTypeId" },
    { label: "Uwagi ogólne", name: "comment" },
    { label: "Liczba drzwi", name: "doorsCountId" },
    { label: "Skrzynia biegów", name: "gearBoxId" },
    { label: "Napęd", name: "driveTypeId" },
    { label: "Stan pojazdu", name: "carStateId" },
    { label: "Rok produkcji", name: "yearOfProductionFrom" },
    { label: "Przebieg", name: "mileageFrom" },
    { label: "Liczba koni mechanicznych", name: "horsePowerFrom" },
    { label: "Rodzaj paliwa", name: "fuelTypeId" },
    { label: "Kraj pochodzenia", name: "countryOfOriginId" },
    { label: "Kolor", name: "colorId" },
  ]);
  const [preferencesActive, setPreferencesActive] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => {
          setPreferencesActive((prevState) => !prevState);
        }}
        className="aqua-border-btn !bg-AQUA-100 !border-AQUA-400 relative w-full"
        type="button"
      >
        <span className="!text-AQUA-400 relative mobile-small lg:desktop-normal">
          <span className="absolute left-[-25px] text-[2rem] bold top-1/2 translate-y-[-54%]">
            +
          </span>
          <span>Dodaj więcej preferencji</span>
        </span>
      </button>

      {preferencesActive && (
        <ul className="absolute top-[60px] left-0 bg-white z-[30] border-[.12em] border-AQUA-400 rounded-[10px] w-full px-3 py-5 overflow-y-scroll scrollbar- h-[300px] scrollContainer">
          {options.map((item, index) => {
            return (
              <li
                key={index}
                className={`h-10 hover:bg-WHITE-300 flex items-center px-3 ${
                  formFields.find((e) => e.name === item.name)?.active &&
                  "text-AQUA-400"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex justify-start"
                  onClick={() => {
                    const field = formFields.find((e) => e.name === item.name);
                    if (field) {
                      // Create a new array with the updated field
                      const updatedFormFields = formFields.map((formField) =>
                        formField.name === item.name
                          ? { ...formField, active: !formField.active }
                          : formField
                      );

                      // Call the parent's setFormFields with the new array
                      setFormFields(updatedFormFields);
                      setPreferencesActive(false);
                    }
                  }}
                >
                  {item.label}
                </button>
                {formFields.find((e) => e.name === item.name)?.active && (
                  <div className="w-4 h-4 rounded-full bg-AQUA-400 border-2 border-AQUA-100"></div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Preferences;
