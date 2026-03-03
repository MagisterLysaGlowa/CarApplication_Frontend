import React, { SetStateAction, useEffect, useState } from "react";
import ChevronIcon from "../../../../../public/images/icons/chevron_icon.svg";
import AnimatedCheckbox from "./AnimatedCheckbox";

type Props = {
  name: string;
  label: string;
  selectOptionData:
    | BodyType[]
    | CountryOfOriginsType[]
    | DriveType[]
    | DoorsCountType[]
    | FuelType[]
    | GearBoxType[]
    | CarStateType[]
    | undefined;
  selectedOptions: number[] | undefined;
  setSelectedOptions: React.Dispatch<SetStateAction<number[]>> | undefined;
};

const MultipleSelect = ({
  selectOptionData,
  selectedOptions,
  setSelectedOptions,
  name,
  label,
}: Props) => {
  const [selectActive, setSelectActive] = useState<boolean>(false);

  const isBodyTypeArray = (data: any): data is BodyType[] => {
    return Array.isArray(data) && data.every((item) => "name" in item);
  };

  const isCountryOriginTypeArray = (
    data: any
  ): data is CountryOfOriginsType[] => {
    return Array.isArray(data) && data.every((item) => "name" in item);
  };

  const isDriveTypeArray = (data: any): data is DriveType[] => {
    return Array.isArray(data) && data.every((item) => "name" in item);
  };

  const isDoorsCountArray = (data: any): data is DoorsCountType[] => {
    return Array.isArray(data) && data.every((item) => "doorsQuantity" in item);
  };

  const isFuelTypeArray = (data: any): data is FuelType[] => {
    return Array.isArray(data) && data.every((item) => "name" in item);
  };

  const isGearBoxArray = (data: any): data is GearBoxType[] => {
    return Array.isArray(data) && data.every((item) => "name" in item);
  };

  const isCarStateArray = (data: any): data is CarStateType[] => {
    return Array.isArray(data) && data.every((item) => "state" in item);
  };

  function onlyUnique(value: any, index: number, array: any) {
    return array.indexOf(value) === index;
  }

  if (
    selectOptionData != undefined &&
    selectedOptions != undefined &&
    setSelectedOptions != undefined
  ) {
    return (
      <div className="flex flex-col relative">
        <label
          htmlFor={""}
          className="mobile-large-bold lg:desktop-large-bold text-[#272727]"
        >
          {label}
        </label>
        <button
          onClick={() => {
            setSelectActive((prevState) => !prevState);
          }}
          type="button"
          id={"id"}
          className="flex items-center mt-1 h-12 mobile-normal text-left lg:desktop-normal bg-transparent border-[.12em] border-WHITE-500 px-5 text-[#747474] rounded-[10px]"
        >
          <span className="flex-grow text-ellipsis text-nowrap overflow-hidden">
            {selectedOptions.length > 0 ? (
              <>
                {selectedOptions.map((item, index) => {
                  if (
                    name == "bodyType" &&
                    isBodyTypeArray(selectOptionData) &&
                    selectOptionData.length > 0
                  ) {
                    return `${
                      selectOptionData.find((so) => so.bodyTypeId == item)!.name
                    }${index < selectedOptions.length - 1 ? ", " : ""}`;
                  }
                  if (
                    name == "countryOfOrigin" &&
                    isCountryOriginTypeArray(selectOptionData) &&
                    selectOptionData.length > 0
                  ) {
                    return `${
                      selectOptionData.find(
                        (so) => so.countryOfOriginId == item
                      )!.name
                    }${index < selectedOptions.length - 1 ? ", " : ""}`;
                  }
                  if (
                    name === "driveType" &&
                    isDriveTypeArray(selectOptionData) &&
                    selectOptionData.length > 0
                  ) {
                    return `${
                      selectOptionData.find((so) => so.driveTypeId == item)!
                        .name
                    }${index < selectedOptions.length - 1 ? ", " : ""}`;
                  }
                  if (
                    name === "carState" &&
                    isCarStateArray(selectOptionData) &&
                    selectOptionData.length > 0
                  ) {
                    return `${
                      selectOptionData.find((so) => so.carStateId == item)!
                        .state
                    }${index < selectedOptions.length - 1 ? ", " : ""}`;
                  }
                  if (
                    name == "doorsCount" &&
                    isDoorsCountArray(selectOptionData) &&
                    selectOptionData.length > 0
                  ) {
                    return `${selectOptionData
                      .find((so) => so.doorsCountId == item)!
                      .doorsQuantity.toString()}${
                      index < selectedOptions.length - 1 ? ", " : ""
                    }`;
                  }
                  if (
                    name == "fuelType" &&
                    isFuelTypeArray(selectOptionData) &&
                    selectOptionData.length > 0
                  ) {
                    return `${
                      selectOptionData.find((so) => so.fuelTypeId == item)!.name
                    }${index < selectedOptions.length - 1 ? ", " : ""}`;
                  }
                  if (
                    name == "gearBox" &&
                    isGearBoxArray(selectOptionData) &&
                    selectOptionData.length > 0
                  ) {
                    return `${
                      selectOptionData.find((so) => so.gearBoxId == item)!.name
                    }${index < selectedOptions.length - 1 ? ", " : ""}`;
                  }
                })}
              </>
            ) : (
              label
            )}
          </span>
          <ChevronIcon
            width={20}
            height={20}
            fill="black"
            className={`${selectActive ? "rotate-180" : "rotate-0"}`}
          />
        </button>
        <div
          className="absolute w-full bg-WHITE-200 border-[.12em] border-WHITE-600 top-[85px] z-[100] justify-center rounded-2xl shadow-sm"
          style={{ display: selectActive ? "flex" : "none" }}
        >
          {name === "bodyType" && isBodyTypeArray(selectOptionData) && (
            <ul className="flex flex-col gap-x-5 gap-y-5 py-8 w-[93%] h-[300px] overflow-scroll">
              {selectOptionData.map((item, index) => (
                <li key={index}>
                  <AnimatedCheckbox
                    objectId={item.bodyTypeId}
                    name={item.name}
                    selectedData={selectedOptions}
                    setSelectedData={setSelectedOptions}
                    isChecked={selectedOptions.includes(item.bodyTypeId)}
                  />
                </li> // Now TypeScript knows `item` is a `BodyType`
              ))}
            </ul>
          )}

          {name === "countryOfOrigin" &&
            isCountryOriginTypeArray(selectOptionData) && (
              <ul className="flex flex-col gap-x-5 gap-y-5 py-8 w-[93%] h-[300px] overflow-scroll">
                {selectOptionData.map((item, index) => (
                  <li key={index}>
                    <AnimatedCheckbox
                      objectId={item.countryOfOriginId}
                      name={item.name}
                      selectedData={selectedOptions}
                      setSelectedData={setSelectedOptions}
                      isChecked={selectedOptions.includes(
                        item.countryOfOriginId
                      )}
                    />
                  </li> // Now TypeScript knows `item` is a `BodyType`
                ))}
              </ul>
            )}

          {name === "driveType" && isDriveTypeArray(selectOptionData) && (
            <ul className="flex flex-col gap-x-5 gap-y-5 py-8 w-[93%] h-[300px] overflow-scroll">
              {(() => {
                const systems = selectOptionData.map((item) => item.system);
                var unique = systems.filter(onlyUnique);
                return unique.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <p className="mobile-normal-bold lg:desktop-normal-bold">
                        {item}
                      </p>
                      {selectOptionData.map((option, index) => {
                        if (item == option.system)
                          return (
                            <li key={index}>
                              <AnimatedCheckbox
                                objectId={option.driveTypeId}
                                name={option.name}
                                selectedData={selectedOptions}
                                setSelectedData={setSelectedOptions}
                                isChecked={selectedOptions.includes(
                                  option.driveTypeId
                                )}
                              />
                            </li> // Now TypeScript knows `item` is a `BodyType`
                          );
                      })}
                    </React.Fragment>
                  );
                });
              })()}
            </ul>
          )}

          {name === "doorsCount" && isDoorsCountArray(selectOptionData) && (
            <ul className="flex flex-col gap-x-5 gap-y-5 py-8 w-[93%] h-[300px] overflow-scroll">
              {selectOptionData.map((item, index) => (
                <li key={index}>
                  <AnimatedCheckbox
                    objectId={item.doorsCountId}
                    name={item.doorsQuantity.toString()}
                    selectedData={selectedOptions}
                    setSelectedData={setSelectedOptions}
                    isChecked={selectedOptions.includes(item.doorsCountId)}
                  />
                </li> // Now TypeScript knows `item` is a `BodyType`
              ))}
            </ul>
          )}

          {name === "fuelType" && isFuelTypeArray(selectOptionData) && (
            <ul className="flex flex-col gap-x-5 gap-y-5 py-8 w-[93%] h-[300px] overflow-scroll">
              {(() => {
                const fuelKinds = selectOptionData.map((item) => item.fuelKind);
                var unique = fuelKinds.filter(onlyUnique);
                return unique.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <p className="mobile-normal-bold lg:desktop-normal-bold">
                        {item}
                      </p>
                      {selectOptionData.map((option, index) => {
                        if (item == option.fuelKind)
                          return (
                            <li key={index}>
                              <AnimatedCheckbox
                                objectId={option.fuelTypeId}
                                name={option.name}
                                selectedData={selectedOptions}
                                setSelectedData={setSelectedOptions}
                                isChecked={selectedOptions.includes(
                                  option.fuelTypeId
                                )}
                              />
                            </li> // Now TypeScript knows `item` is a `BodyType`
                          );
                      })}
                    </React.Fragment>
                  );
                });
              })()}
            </ul>
          )}

          {name === "gearBox" && isGearBoxArray(selectOptionData) && (
            <ul className="flex flex-col gap-x-5 gap-y-5 py-8 w-[93%] h-[300px] overflow-scroll">
              {selectOptionData.map((item, index) => (
                <li key={index}>
                  <AnimatedCheckbox
                    objectId={item.gearBoxId}
                    name={item.name.toString()}
                    selectedData={selectedOptions}
                    setSelectedData={setSelectedOptions}
                    isChecked={selectedOptions.includes(item.gearBoxId)}
                  />
                </li> // Now TypeScript knows `item` is a `BodyType`
              ))}
            </ul>
          )}

          {name === "carState" && isCarStateArray(selectOptionData) && (
            <ul className="flex flex-col gap-x-5 gap-y-5 py-8 w-[93%] h-[300px] overflow-scroll">
              {selectOptionData.map((item, index) => (
                <li key={index}>
                  <AnimatedCheckbox
                    objectId={item.carStateId}
                    name={item.state.toString()}
                    selectedData={selectedOptions}
                    setSelectedData={setSelectedOptions}
                    isChecked={selectedOptions.includes(item.carStateId)}
                  />
                </li> // Now TypeScript knows `item` is a `BodyType`
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
};

export default MultipleSelect;
