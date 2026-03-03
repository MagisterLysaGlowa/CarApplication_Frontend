"use client";
import React, { useState } from "react";
import "../../../css/scrollbar.css";

type Props = {
  multipleActiveFormFields: MultipleSelectActiveFormFields[];
  setMultipleActiveFormFields: React.Dispatch<
    React.SetStateAction<MultipleSelectActiveFormFields[]>
  >;
  singleActiveFormFields: SingleSelectActiveFormFields[];
  setSingleActiveFormFields: React.Dispatch<
    React.SetStateAction<SingleSelectActiveFormFields[]>
  >;
};

interface Option {
  label: string;
  name: string;
  type: "multiple" | "single";
  // Adding a group property for range fields
  group?: string;
}

const Preferences = (props: Props) => {
  const {
    multipleActiveFormFields,
    setMultipleActiveFormFields,
    singleActiveFormFields,
    setSingleActiveFormFields,
  } = props;

  // Updated to include both multiple and single select options with groups
  const [options] = useState<Option[]>([
    // Multiple select options
    { label: "Typ nadwozia", name: "bodyType", type: "multiple" },
    { label: "Liczba drzwi", name: "doorsCount", type: "multiple" },
    { label: "Skrzynia biegów", name: "gearBox", type: "multiple" },
    { label: "Napęd", name: "driveType", type: "multiple" },
    { label: "Stan pojazdu", name: "carState", type: "multiple" },
    { label: "Rodzaj paliwa", name: "fuelType", type: "multiple" },
    { label: "Kraj pochodzenia", name: "countryOfOrigin", type: "multiple" },
    { label: "Kolor", name: "color", type: "multiple" },

    // Single select options - grouped by category
    { label: "Rok produkcji", name: "year", type: "single", group: "year" },
    { label: "Przebieg", name: "mileage", type: "single", group: "mileage" },
    {
      label: "Liczba koni",
      name: "horsePower",
      type: "single",
      group: "horsePower",
    },
    { label: "Cena", name: "price", type: "single", group: "price" },
  ]);

  const [preferencesActive, setPreferencesActive] = useState<boolean>(false);

  // Check if an option is active based on its type and group
  const isOptionActive = (option: Option): boolean => {
    if (option.type === "multiple") {
      return !!multipleActiveFormFields.find((e) => e.name === option.name)
        ?.active;
    } else if (option.group) {
      // For grouped options, check if any field in the group is active
      const fromField = singleActiveFormFields.find(
        (e) => e.name === `${option.group}From`
      );
      const toField = singleActiveFormFields.find(
        (e) => e.name === `${option.group}To`
      );
      return fromField?.active || toField?.active || false;
    }
    return false;
  };

  // Toggle the active state of an option
  const toggleOption = (option: Option) => {
    if (option.type === "multiple") {
      const field = multipleActiveFormFields.find(
        (e) => e.name === option.name
      );
      if (field) {
        const newActiveState = !field.active;

        // Update the active state
        const updatedFormFields = multipleActiveFormFields.map((formField) =>
          formField.name === option.name
            ? { ...formField, active: newActiveState }
            : formField
        );

        // If deactivating, also reset the selected values
        if (!newActiveState && field.setSelectedData) {
          field.setSelectedData([]);
        }

        setMultipleActiveFormFields(updatedFormFields);
      }
    } else if (option.group) {
      // For grouped options, toggle both "from" and "to" fields
      const fromField = singleActiveFormFields.find(
        (e) => e.name === `${option.group}From`
      );
      const toField = singleActiveFormFields.find(
        (e) => e.name === `${option.group}To`
      );

      // Determine the new active state (toggle based on current state)
      const newActive = !(fromField?.active || toField?.active);

      // Update the active state
      const updatedFormFields = singleActiveFormFields.map((formField) => {
        if (
          formField.name === `${option.group}From` ||
          formField.name === `${option.group}To`
        ) {
          return { ...formField, active: newActive };
        }
        return formField;
      });

      // If deactivating, also reset the filter values in filterTypes
      if (!newActive && fromField && toField && fromField.setFilterTypes) {
        // Use a timeout to ensure the state update happens after the current execution
        setTimeout(() => {
          fromField.setFilterTypes((prev: any) => {
            const updatedFilterTypes = { ...prev };
            // Reset both from and to values
            if (fromField.name in updatedFilterTypes) {
              updatedFilterTypes[fromField.name as keyof FilterType] = null;
            }
            if (toField.name in updatedFilterTypes) {
              updatedFilterTypes[toField.name as keyof FilterType] = null;
            }
            return updatedFilterTypes;
          });
        }, 0);
      }

      setSingleActiveFormFields(updatedFormFields);
    }

    setPreferencesActive(false);
  };

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
            const isActive = isOptionActive(item);
            return (
              <li
                key={index}
                className={`h-10 hover:bg-WHITE-300 flex items-center px-3 ${
                  isActive && "text-AQUA-400"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex justify-start"
                  onClick={() => toggleOption(item)}
                >
                  {item.label}
                </button>
                {isActive && (
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
