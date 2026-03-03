import React, { SetStateAction, useState } from "react";
import ChevronIcon from "../../../../../public/images/icons/chevron_icon.svg";

type Props = {
  colors: Color[];
  selectedColors: Color[];
  setSelctedColors: React.Dispatch<SetStateAction<Color[]>>;
};

const ColorMultipleSelect = ({
  colors,
  selectedColors,
  setSelctedColors,
}: Props) => {
  const [colorSelectActive, setColorSelectActive] = useState<boolean>(false);
  return (
    <div className="flex flex-col relative">
      <label
        htmlFor={""}
        className="mobile-large-bold lg:desktop-large-bold text-[#272727]"
      >
        Wybierz kolor
      </label>
      <button
        onClick={() => {
          setColorSelectActive((prevState) => !prevState);
        }}
        type="button"
        id={"id"}
        className="flex items-center mt-1 h-12 mobile-normal text-left lg:desktop-normal bg-transparent border-[.12em] border-WHITE-500 px-5 text-[#747474] rounded-[10px]"
      >
        <span className="flex-grow text-ellipsis text-nowrap overflow-hidden">
          {selectedColors.length > 0 ? (
            <>
              {selectedColors.map((item, index) => {
                if (index < selectedColors.length - 1)
                  return `${item.colorName},`;
                else return `${item.colorName}`;
              })}
            </>
          ) : (
            `Wybierz kolor`
          )}
        </span>
        <ChevronIcon
          width={20}
          height={20}
          fill="black"
          className={`${colorSelectActive ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <div
        className="absolute w-full bg-WHITE-200 border-[.12em] border-WHITE-600 top-[85px] z-[100] justify-center rounded-2xl shadow-sm"
        style={{ display: colorSelectActive ? "flex" : "none" }}
      >
        <div className="flex flex-wrap gap-x-5 gap-y-5 py-8 w-[93%]">
          {colors.map((item, index) => {
            return (
              <button
                type="button"
                onClick={() => {
                  if (
                    selectedColors.find((sc) => sc.colorName == item.colorName)
                  ) {
                    setSelctedColors([
                      ...selectedColors.filter(
                        (sc) => sc.colorName !== item.colorName
                      ),
                    ]);
                  } else {
                    setSelctedColors([...selectedColors, item]);
                  }
                }}
                key={index}
                className={`w-12 h-12 rounded-full transition-all duration-200`}
                style={{
                  backgroundColor: `${item.colorHex}`,
                  outline:
                    selectedColors.find(
                      (sc) => sc.colorName == item.colorName
                    ) && "3px #0066FF solid",
                  border:
                    selectedColors.find(
                      (sc) => sc.colorName == item.colorName
                    ) && "6px white solid",
                }}
              ></button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorMultipleSelect;
