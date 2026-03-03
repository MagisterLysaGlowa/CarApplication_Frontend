// components/AnimatedCheckbox.jsx
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";

interface Props<T extends string | number> {
  id: string;
  name: T;
  selectedData: T[];
  setSelectedData: React.Dispatch<SetStateAction<T[]>>;
  itemId: number;
  type: string;
}

const AnimatedCheckbox = <T extends string | number>({
  id,
  name,
  setSelectedData,
  selectedData,
  itemId,
  type,
}: Props<T>) => {
  // Determine if this checkbox should be checked based on selectedData
  const isItemSelected = () => {
    if (
      type !== "bodyType" &&
      type !== "driveType" &&
      type !== "doorsCount" &&
      type !== "color" &&
      type !== "fuelType" &&
      type !== "countryOfOrigin" &&
      type !== "gearBox" &&
      type !== "carState"
    ) {
      return selectedData.includes(name);
    } else {
      return selectedData.includes(itemId as unknown as T);
    }
  };

  // Use the actual selected state rather than an independent local state
  const [checked, setChecked] = useState(isItemSelected());

  // Update local checked state whenever selectedData changes
  useEffect(() => {
    setChecked(isItemSelected());
  }, [selectedData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (newChecked) {
      if (
        type !== "bodyType" &&
        type !== "driveType" &&
        type !== "doorsCount" &&
        type !== "color" &&
        type !== "fuelType" &&
        type !== "countryOfOrigin" &&
        type !== "gearBox" &&
        type !== "carState"
      ) {
        setSelectedData([...selectedData, name]);
      } else {
        setSelectedData([...selectedData, itemId as unknown as T]);
      }
    } else {
      if (
        type !== "bodyType" &&
        type !== "driveType" &&
        type !== "doorsCount" &&
        type !== "color" &&
        type !== "fuelType" &&
        type !== "countryOfOrigin" &&
        type !== "gearBox" &&
        type !== "carState"
      ) {
        setSelectedData(selectedData.filter((sd) => sd !== name));
      } else {
        setSelectedData(selectedData.filter((sd) => sd !== itemId));
      }
    }

    // No need to manually set checked - the useEffect will handle it
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        {/* Hidden native checkbox for accessibility */}
        <input
          type="checkbox"
          id={`${id}`}
          checked={checked}
          onChange={handleChange}
          className="sr-only" // Hide visually but keep accessible
        />

        {/* Custom checkbox container */}
        <label
          htmlFor={id}
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              checked
                ? "bg-blue-500 border-blue-500"
                : "bg-white border-gray-300 hover:border-blue-400"
            }
          `}
        >
          {/* Animated checkmark */}
          {checked && (
            <svg
              className="w-4 h-4 text-white animate-plus"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5 L10 15 M5 10 L15 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </label>
      </div>

      {/* Label text */}
      {name && (
        <label
          htmlFor={id}
          className="ml-4 cursor-pointer mobile-normal lg:desktop-normal"
        >
          {name}
        </label>
      )}
    </div>
  );
};

export default AnimatedCheckbox;
