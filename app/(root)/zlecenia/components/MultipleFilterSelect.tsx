import React, { SetStateAction, useEffect, useState } from "react";
import ChevronIcon from "../../../../public/images/icons/chevron_icon.svg";
import AnimatedCheckbox from "./AnimatedCheckbox";

// Define the FilterTypeOption interface
interface FilterTypeOption {
  id: number;
  value: string | number;
}

// Make this component generic too and add isDisabled prop
type Props<T extends string | number> = {
  name: string;
  label: string;
  selectData: FilterTypeOption[];
  selectedData: T[];
  setSelectedData: React.Dispatch<SetStateAction<T[]>>;
  isDisabled?: boolean;
};

const MultipleFilterSelect = <T extends string | number>({
  name,
  label,
  selectData,
  selectedData,
  setSelectedData,
  isDisabled = false,
}: Props<T>) => {
  const [selectActive, setSelectActive] = useState<boolean>(false);
  const [changeActive, setChangeActive] = useState<boolean>(!isDisabled);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] =
    useState<FilterTypeOption[]>(selectData);

  // Filter the data when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(selectData);
    } else {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      const filtered = selectData.filter((item) =>
        String(item.value).toLowerCase().includes(lowercaseSearchTerm)
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, selectData]);

  useEffect(() => {
    // Update changeActive based on isDisabled or other conditions
    if (isDisabled) {
      setChangeActive(false);
      setSelectActive(false); // Close dropdown when component becomes disabled
    } else {
      setChangeActive(true);
    }
  }, [isDisabled, name, selectData.length]);

  useEffect(() => {
    if (selectData.length < 1) {
      setSelectActive(false);
    }
  }, [selectedData, selectData.length]);

  // Focus on search input when dropdown opens
  useEffect(() => {
    if (selectActive) {
      const searchInput = document.getElementById(`search-${name}`);
      if (searchInput) {
        searchInput.focus();
      }
    } else {
      // Clear search when dropdown closes
      setSearchTerm("");
    }
  }, [selectActive, name]);

  const handleSearchInputClick = (e: React.MouseEvent) => {
    // Prevent dropdown from closing when clicking on search input
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col relative">
      {selectActive && (
        <div
          className="fixed inset-0 bg-transparent z-[90]"
          onClick={() => {
            setSelectActive(false);
          }}
        />
      )}
      <label htmlFor={name} className="mobile-normal lg:desktop-normal mb-2">
        {label}
      </label>
      <button
        onClick={() => {
          if (changeActive) {
            setSelectActive((prevState) => !prevState);
          }
        }}
        name={name}
        id={name}
        className={`mobile-normal lg:desktop-normal h-12 px-5 rounded-xl bg-transparent text-BLACK-100 border-[.12em] flex items-center ${
          !changeActive &&
          "pointer-events-none border-[#E6E6E6] !bg-[#FAFAFA] text-WHITE-600"
        }`}
      >
        {selectedData.length > 0 && (
          <div className="max-w-[230px] w-full text-ellipsis text-nowrap overflow-x-hidden text-left">
            {selectedData.map((item, index) => {
              if (
                name == "bodyType" ||
                name == "driveType" ||
                name == "doorsCount" ||
                name == "color" ||
                name == "fuelType" ||
                name == "countryOfOrigin" ||
                name == "gearBox"
              ) {
                return (
                  <span key={index}>
                    {selectData.find((sd) => sd.id == Number(item))?.value}{" "}
                    {index + 1 < selectedData.length && ","}{" "}
                  </span>
                );
              } else {
                return (
                  <span key={index}>
                    {item} {index + 1 < selectedData.length && ","}{" "}
                  </span>
                );
              }
            })}
          </div>
        )}
        {selectedData.length < 1 && (
          <span className="flex-grow text-left">{label}</span>
        )}
        <ChevronIcon
          width={20}
          height={20}
          fill="black"
          className={`${
            selectActive ? "rotate-180" : "rotate-0"
          } absolute right-5`}
        />
      </button>

      <div
        className={`z-[100] bg-WHITE-200 w-full absolute top-[85px] border-[.12em] rounded-xl px-8 py-6 flex-col gap-4 ${
          selectActive ? "flex" : "hidden"
        }`}
      >
        {/* Search Input */}
        <div className="sticky top-0 mb-4">
          <input
            id={`search-${name}`}
            type="text"
            placeholder="Wyszukaj..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={handleSearchInputClick}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-AQUA-400"
          />
        </div>

        {/* Filtered options list */}
        <ul className="w-full h-[250px] overflow-y-auto">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li key={item.id} className="flex gap-3 py-2">
                <AnimatedCheckbox<T>
                  id={`${item.value}_${item.id.toString()}`}
                  name={item.value as T}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  itemId={item.id}
                  type={name}
                />
              </li>
            ))
          ) : (
            <li className="text-center py-2 text-gray-500">Brak wyników</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MultipleFilterSelect;
