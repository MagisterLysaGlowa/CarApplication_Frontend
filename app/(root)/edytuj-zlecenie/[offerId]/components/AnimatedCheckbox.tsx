// components/AnimatedCheckbox.jsx
import { ChangeEvent, SetStateAction, useState } from "react";

interface Props {
  objectId: number;
  name: string;
  selectedData: number[];
  setSelectedData: React.Dispatch<SetStateAction<number[]>>;
  isChecked: boolean | undefined;
}

const AnimatedCheckbox = ({
  objectId,
  name,
  setSelectedData,
  selectedData,
  isChecked,
}: Props) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (newChecked) {
      setSelectedData([...selectedData, objectId]);
    } else {
      setSelectedData(selectedData.filter((sd) => sd !== objectId));
    }
    setChecked((prevState) => !prevState);
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        {/* Hidden native checkbox for accessibility */}
        <input
          type="checkbox"
          id={`${name}_${objectId.toString()}`}
          checked={checked || isChecked}
          onChange={handleChange}
          className="sr-only" // Hide visually but keep accessible
        />

        {/* Custom checkbox container */}
        <label
          htmlFor={`${name}_${objectId.toString()}`}
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              checked || isChecked
                ? "bg-blue-500 border-blue-500"
                : "bg-white border-gray-300 hover:border-blue-400"
            }
          `}
        >
          {/* Animated checkmark */}
          {(checked || isChecked) && (
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
          htmlFor={`${name}_${objectId.toString()}`}
          className="ml-4 cursor-pointer mobile-normal lg:desktop-normal"
        >
          {name}
        </label>
      )}
    </div>
  );
};

export default AnimatedCheckbox;
