import React, { SetStateAction, useEffect, useState } from "react";
import ChevronIcon from "../../../../public/images/icons/chevron_icon.svg";
import AnimatedCheckbox from "./AnimatedCheckbox";

type Props = {
  name: string;
  label: string;
  selectData: Option[];
  filterTypes: FilterType;
  setFilterTypes: React.Dispatch<SetStateAction<FilterType>>;
};

const SingleFilterSelect = ({
  name,
  label,
  selectData,
  filterTypes,
  setFilterTypes,
}: {
  name: string;
  label: string;
  selectData: any;
  filterTypes: FilterType;
  setFilterTypes: React.Dispatch<SetStateAction<FilterType>>;
}) => {
  const [selectActive, setSelectActive] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [changeActive, setChangeActive] = useState<boolean>(true);

  useEffect(() => {}, [selectData]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value) {
      const numValue = Number(value);
      switch (name) {
        case "priceFrom":
          if (filterTypes.priceTo && numValue > Number(filterTypes.priceTo)) {
            setFilterTypes({
              ...filterTypes,
              priceFrom: numValue.toString(),
              priceTo: numValue.toString(),
            });
          } else {
            setFilterTypes({
              ...filterTypes,
              priceFrom: numValue.toString(),
            });
          }
          break;

        case "priceTo":
          if (
            filterTypes.priceFrom &&
            numValue < Number(filterTypes.priceFrom)
          ) {
            setFilterTypes({
              ...filterTypes,
              priceTo: filterTypes.priceFrom,
            });
          } else {
            setFilterTypes({
              ...filterTypes,
              priceTo: numValue.toString(),
            });
          }
          break;

        case "mileageFrom":
          if (
            filterTypes.mileageTo &&
            numValue > Number(filterTypes.mileageTo)
          ) {
            setFilterTypes({
              ...filterTypes,
              mileageFrom: numValue.toString(),
              mileageTo: numValue.toString(),
            });
          } else {
            setFilterTypes({
              ...filterTypes,
              mileageFrom: numValue.toString(),
            });
          }
          break;

        case "mileageTo":
          if (
            filterTypes.mileageFrom &&
            numValue < Number(filterTypes.mileageFrom)
          ) {
            setFilterTypes({
              ...filterTypes,
              mileageTo: filterTypes.mileageFrom,
            });
          } else {
            setFilterTypes({
              ...filterTypes,
              mileageTo: numValue.toString(),
            });
          }
          break;

        case "yearOfProductionFrom":
          if (
            filterTypes.yearOfProductionTo &&
            numValue > Number(filterTypes.yearOfProductionTo)
          ) {
            setFilterTypes({
              ...filterTypes,
              yearOfProductionFrom: numValue.toString(),
              yearOfProductionTo: numValue.toString(),
            });
          } else {
            setFilterTypes({
              ...filterTypes,
              yearOfProductionFrom: numValue.toString(),
            });
          }
          break;

        case "yearOfProductionTo":
          if (
            filterTypes.yearOfProductionFrom &&
            numValue < Number(filterTypes.yearOfProductionFrom)
          ) {
            setFilterTypes({
              ...filterTypes,
              yearOfProductionTo: filterTypes.yearOfProductionFrom,
            });
          } else {
            setFilterTypes({
              ...filterTypes,
              yearOfProductionTo: numValue.toString(),
            });
          }
          break;

        case "horsePowerFrom":
          if (
            filterTypes.horsePowerTo &&
            numValue > Number(filterTypes.horsePowerTo)
          ) {
            setFilterTypes({
              ...filterTypes,
              horsePowerFrom: numValue.toString(),
              horsePowerTo: numValue.toString(),
            });
          } else {
            setFilterTypes({
              ...filterTypes,
              horsePowerFrom: numValue.toString(),
            });
          }
          break;

        case "horsePowerTo":
          if (
            filterTypes.horsePowerFrom &&
            numValue < Number(filterTypes.horsePowerFrom)
          ) {
            setFilterTypes({
              ...filterTypes,
              horsePowerTo: filterTypes.horsePowerFrom,
            });
          } else {
            setFilterTypes({
              ...filterTypes,
              horsePowerTo: numValue.toString(),
            });
          }
          break;

        default:
          // Dla innych przypadków bez walidacji zakresu
          setFilterTypes({
            ...filterTypes,
            [name]: numValue,
          });
      }
    } else {
      // Jeśli wartość jest pusta (usunięto wybór)
      setFilterTypes({
        ...filterTypes,
        [name]: null,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mobile-normal lg:desktop-normal mb-2">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="h-12 px-5 rounded-xl bg-transparent text-BLACK-100 border-[.12em]"
        onChange={handleSelectChange}
        value={filterTypes[name as keyof FilterType] || ""}
      >
        {/* Add a unique key to the default option */}
        <option key={`${name}-default`} value="">
          Wybierz {label.toLowerCase()}
        </option>
        {selectData.map((item: any, index: number) => (
          // Use both id and index to ensure uniqueness
          <option key={`${name}-${item.id || index}`} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SingleFilterSelect;
