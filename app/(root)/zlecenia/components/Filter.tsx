"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import MultipleFilterSelect from "./MultipleFilterSelect";
import { mileage, price, year } from "./data/filter";
import SingleFilterSelect from "./SingleFilterSelect";
import Preferences from "./Preferences";
import XIcon from "../../../../public/images/icons/x_icon.svg";

interface Props {
  selectedBrands: string[];
  selectedModels: string[];
  selectedGenerations: string[];
  selectedBodyTypes: number[];
  selectedDriveTypes: number[];
  selectedDoorsCounts: number[];
  selectedColors: number[];
  selectedFuelTypes: number[];
  selectedCountryOfOrigins: number[];
  selectedGearBoxes: number[];
  selectedCarStates: number[];
  setSelectedBrands: React.Dispatch<SetStateAction<string[]>>;
  setSelectedModels: React.Dispatch<SetStateAction<string[]>>;
  setSelectedGenerations: React.Dispatch<SetStateAction<string[]>>;
  setSelectedBodyTypes: React.Dispatch<SetStateAction<number[]>>;
  setSelectedDriveTypes: React.Dispatch<SetStateAction<number[]>>;
  setSelectedDoorsCounts: React.Dispatch<SetStateAction<number[]>>;
  setSelectedColors: React.Dispatch<SetStateAction<number[]>>;
  setSelectedFuelTypes: React.Dispatch<SetStateAction<number[]>>;
  setSelectedCountryOfOrigins: React.Dispatch<SetStateAction<number[]>>;
  setSelectedGearBoxes: React.Dispatch<SetStateAction<number[]>>;
  setSelectedCarStates: React.Dispatch<SetStateAction<number[]>>;
  filterTypes: FilterType;
  setFilterTypes: React.Dispatch<SetStateAction<FilterType>>;
  filterData: FilterData | null;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData | null>>;
  setBrandSelectData: React.Dispatch<React.SetStateAction<Brand[]>>;
  brandSelectData: Brand[];
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const Filter = (props: Props) => {
  //! FILTER STATES
  const [mobileFilterActive, setmobileFilterActive] = useState<boolean>(false);
  const [modelSelectData, setModelSelectData] = useState<Model[]>([]);
  const [generationSelectData, setGenerationSelectData] = useState<
    Generation[]
  >([]);

  const {
    selectedBrands,
    setSelectedBrands,
    selectedModels,
    setSelectedModels,
    selectedGenerations,
    setSelectedGenerations,
    selectedBodyTypes,
    setSelectedBodyTypes,
    selectedDriveTypes,
    selectedDoorsCounts,
    selectedColors,
    selectedFuelTypes,
    selectedCountryOfOrigins,
    selectedGearBoxes,
    selectedCarStates,
    setSelectedDriveTypes,
    setSelectedDoorsCounts,
    setSelectedColors,
    setSelectedFuelTypes,
    setSelectedCountryOfOrigins,
    setSelectedGearBoxes,
    setSelectedCarStates,
    filterTypes,
    setFilterTypes,
    filterData,
    setFilterData,
    brandSelectData,
    setPageNumber,
  } = props;

  const [multipleActiveFormFields, setMultipleActiveFormFields] = useState<
    MultipleSelectActiveFormFields[]
  >([]);
  const [singleActiveFormFields, setSingleActiveFormFields] = useState<
    SingleSelectActiveFormFields[]
  >([]);

  // INITIAL SETUP of multipleActiveFormFields
  useEffect(() => {
    if (!multipleActiveFormFields.length) {
      setMultipleActiveFormFields([
        {
          name: "brand",
          label: "Wybierz markę pojazdu",
          selectData: null,
          selectedData: selectedBrands,
          setSelectedData: setSelectedBrands,
          active: true,
        },
        {
          name: "model",
          label: "Wybierz model pojazdu",
          selectData: null,
          selectedData: selectedModels,
          setSelectedData: setSelectedModels,
          active: true,
        },
        {
          name: "generation",
          label: "Wybierz generacje pojazdu",
          selectData: null,
          selectedData: selectedGenerations,
          setSelectedData: setSelectedGenerations,
          active: true,
        },
        {
          name: "bodyType",
          label: "Typ nadwozia",
          selectData: null,
          selectedData: selectedBodyTypes,
          setSelectedData: setSelectedBodyTypes,
          active: true,
        },
        {
          name: "driveType",
          label: "Typ napędu",
          selectData: null,
          selectedData: selectedDriveTypes,
          setSelectedData: setSelectedDriveTypes,
          active: false,
        },
        {
          name: "doorsCount",
          label: "Liczba drzwi",
          selectData: null,
          selectedData: selectedDoorsCounts,
          setSelectedData: setSelectedDoorsCounts,
          active: false,
        },
        {
          name: "color",
          label: "Kolor pojazdu",
          selectData: null,
          selectedData: selectedColors,
          setSelectedData: setSelectedColors,
          active: false,
        },
        {
          name: "fuelType",
          label: "Rodzaj paliwa",
          selectData: null,
          selectedData: selectedFuelTypes,
          setSelectedData: setSelectedFuelTypes,
          active: false,
        },
        {
          name: "countryOfOrigin",
          label: "Kraj pochodzenia",
          selectData: null,
          selectedData: selectedCountryOfOrigins,
          setSelectedData: setSelectedCountryOfOrigins,
          active: false,
        },
        {
          name: "gearBox",
          label: "Skrzynia biegów",
          selectData: null,
          selectedData: selectedGearBoxes,
          setSelectedData: setSelectedGearBoxes,
          active: false,
        },
        {
          name: "carState",
          label: "Stan pojazdu",
          selectData: null,
          selectedData: selectedCarStates,
          setSelectedData: setSelectedCarStates,
          active: false,
        },
      ]);
    }
  }, []);

  // INITIAL SETUP of singleActiveFormFields
  useEffect(() => {
    if (!singleActiveFormFields.length) {
      setSingleActiveFormFields([
        {
          name: "yearOfProductionFrom",
          label: "Rok produkcji - od",
          selectData: year,
          filterTypes: filterTypes,
          setFilterTypes: setFilterTypes,
          active: false, // Changed to false - will be controlled via preferences
        },
        {
          name: "yearOfProductionTo",
          label: "Rok produkcji - do",
          selectData: year,
          filterTypes: filterTypes,
          setFilterTypes: setFilterTypes,
          active: false, // Changed to false - will be controlled via preferences
        },
        {
          name: "mileageFrom",
          label: "Przebieg - od",
          selectData: mileage,
          filterTypes: filterTypes,
          setFilterTypes: setFilterTypes,
          active: false, // Changed to false - will be controlled via preferences
        },
        {
          name: "mileageTo",
          label: "Przebieg - do",
          selectData: mileage,
          filterTypes: filterTypes,
          setFilterTypes: setFilterTypes,
          active: false, // Changed to false - will be controlled via preferences
        },
        {
          name: "priceFrom",
          label: "Cena - od",
          selectData: price,
          filterTypes: filterTypes,
          setFilterTypes: setFilterTypes,
          active: false, // Changed to false - will be controlled via preferences
        },
        {
          name: "priceTo",
          label: "Cena - do",
          selectData: price,
          filterTypes: filterTypes,
          setFilterTypes: setFilterTypes,
          active: false, // Changed to false - will be controlled via preferences
        },
        {
          name: "horsePowerFrom",
          label: "Liczba koni - od",
          selectData: mileage, // You might want to create a different dataset for horsepower
          filterTypes: filterTypes,
          setFilterTypes: setFilterTypes,
          active: false,
        },
        {
          name: "horsePowerTo",
          label: "Liczba koni - do",
          selectData: mileage, // You might want to create a different dataset for horsepower
          filterTypes: filterTypes,
          setFilterTypes: setFilterTypes,
          active: false,
        },
      ]);
    }
  }, []);

  // Update both the selectData and keep track of latest selectedData in multipleActiveFormFields
  useEffect(() => {
    if (multipleActiveFormFields.length === 0) return;

    setMultipleActiveFormFields((prevFields) =>
      prevFields.map((field) => {
        let updatedSelectData = null;

        // Update selectData based on field name
        switch (field.name) {
          case "brand":
            updatedSelectData =
              brandSelectData.length > 0
                ? brandSelectData.map((item) => ({
                    id: item.id,
                    value: item.name,
                  }))
                : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedBrands, // Update reference to latest selectedBrands
            };
          case "model":
            updatedSelectData =
              modelSelectData.length > 0
                ? modelSelectData.map((item) => ({
                    id: item.id,
                    value: item.name,
                  }))
                : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedModels, // Update reference to latest selectedModels
            };
          case "generation":
            updatedSelectData =
              generationSelectData.length > 0
                ? generationSelectData.map((item) => ({
                    id: item.id,
                    value: item.name,
                  }))
                : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedGenerations, // Update reference
            };
          case "bodyType":
            updatedSelectData = filterData?.bodyTypes
              ? filterData.bodyTypes.map((item) => ({
                  id: item.bodyTypeId,
                  value: item.name,
                }))
              : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedBodyTypes, // Update reference
            };
          case "driveType":
            updatedSelectData = filterData?.driveTypes
              ? filterData.driveTypes.map((item) => ({
                  id: item.driveTypeId,
                  value: item.name,
                }))
              : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedDriveTypes, // Update reference
            };
          case "doorsCount":
            updatedSelectData = filterData?.doorsCounts
              ? filterData.doorsCounts.map((item) => ({
                  id: item.doorsCountId,
                  value: item.doorsQuantity,
                }))
              : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedDoorsCounts, // Update reference
            };
          case "color":
            updatedSelectData = filterData?.colors
              ? filterData.colors.map((item) => ({
                  id: item.colorId,
                  value: item.colorName,
                }))
              : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedColors, // Update reference
            };
          case "fuelType":
            updatedSelectData = filterData?.fuelTypes
              ? filterData.fuelTypes.map((item) => ({
                  id: item.fuelTypeId,
                  value: item.name,
                }))
              : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedFuelTypes, // Update reference
            };
          case "countryOfOrigin":
            updatedSelectData = filterData?.countryOfOrigins
              ? filterData.countryOfOrigins.map((item) => ({
                  id: item.countryOfOriginId,
                  value: item.name,
                }))
              : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedCountryOfOrigins, // Update reference
            };
          case "gearBox":
            updatedSelectData = filterData?.gearBoxes
              ? filterData.gearBoxes.map((item) => ({
                  id: item.gearBoxId,
                  value: item.name,
                }))
              : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedGearBoxes, // Update reference
            };
          case "carState":
            updatedSelectData = filterData?.carStates
              ? filterData.carStates.map((item) => ({
                  id: item.carStateId,
                  value: item.state,
                }))
              : null;
            return {
              ...field,
              selectData: updatedSelectData,
              selectedData: selectedCarStates, // Update reference
            };
          default:
            return field;
        }
      })
    );
    setPageNumber(1);
  }, [
    brandSelectData,
    modelSelectData,
    generationSelectData,
    filterData,
    selectedBrands,
    selectedModels,
    selectedGenerations,
    selectedBodyTypes,
    selectedDriveTypes,
    selectedDoorsCounts,
    selectedColors,
    selectedFuelTypes,
    selectedCountryOfOrigins,
    selectedGearBoxes,
    selectedCarStates,
    filterTypes.yearOfProductionFrom,
    filterTypes.yearOfProductionTo,
    filterTypes.mileageFrom,
    filterTypes.mileageTo,
    filterTypes.priceFrom,
    filterTypes.priceTo,
    filterTypes.horsePowerFrom,
    filterTypes.horsePowerTo,
    setPageNumber,
  ]);

  // Update singleActiveFormFields when filterTypes changes
  useEffect(() => {
    if (singleActiveFormFields.length === 0) return;

    setSingleActiveFormFields((prevFields) =>
      prevFields.map((field) => {
        return {
          ...field,
          filterTypes: filterTypes,
        };
      })
    );
  }, [filterTypes]);

  // Modified: Update models when brands change
  useEffect(() => {
    if (!filterData) return;

    // For multiple brand selections, show all possible models
    if (selectedBrands.length >= 1) {
      // Get all models from all selected brands
      const models: Model[] = [];
      selectedBrands.forEach((brandName) => {
        const brand = filterData.brands.find(
          (b: Brand) => b.name === brandName
        );
        if (brand) {
          models.push(...brand.models);
        }
      });
      setModelSelectData(models);

      // If the user has previously selected a model that's no longer valid, clear it
      if (selectedModels.length > 0) {
        const validModels = models.map((m) => m.name);
        const stillValidModels = selectedModels.filter((model) =>
          validModels.includes(model)
        );

        if (stillValidModels.length !== selectedModels.length) {
          setSelectedModels(stillValidModels);
        }
      }
    } else {
      // If no brands selected, clear models and generations
      setModelSelectData([]);
      if (selectedModels.length > 0) {
        setSelectedModels([]);
      }
      setGenerationSelectData([]);
      if (selectedGenerations.length > 0) {
        setSelectedGenerations([]);
      }
    }
  }, [selectedBrands, filterData, setSelectedModels, setSelectedGenerations]);

  // Modified: Update generations when models change
  useEffect(() => {
    if (!filterData) return;

    if (selectedModels.length >= 1) {
      const generations: Generation[] = [];

      // For each selected model, find its generations
      selectedModels.forEach((modelName) => {
        // Find which brand has this model
        for (const brand of filterData.brands) {
          const model = brand.models.find((m: Model) => m.name === modelName);
          if (model) {
            generations.push(...model.generations);
            break; // Found the model, no need to check other brands
          }
        }
      });

      setGenerationSelectData(generations);

      // If the user has previously selected a generation that's no longer valid, clear it
      if (selectedGenerations.length > 0) {
        const validGenerations = generations.map((g) => g.name);
        const stillValidGenerations = selectedGenerations.filter((generation) =>
          validGenerations.includes(generation)
        );

        if (stillValidGenerations.length !== selectedGenerations.length) {
          setSelectedGenerations(stillValidGenerations);
        }
      }
    } else {
      // If no models selected, clear generations
      setGenerationSelectData([]);
      if (selectedGenerations.length > 0) {
        setSelectedGenerations([]);
      }
    }
  }, [selectedModels, filterData, setSelectedGenerations]);

  return (
    <>
      <div className="w-full bg-WHITE-100 rounded-[24px] hidden lg:grid grid-cols-4 p-8 gap-y-12 gap-x-8 shadow-md">
        {/* Render all multiple filter selects from the array */}
        {multipleActiveFormFields.map((item, index) => {
          if (item.active) {
            return (
              <MultipleFilterSelect<string | number>
                key={`${item.name}-${index}`}
                name={item.name}
                label={item.label}
                selectData={item.selectData || []} // Always provide an array, even if empty
                selectedData={item.selectedData as (string | number)[]}
                setSelectedData={
                  item.setSelectedData as React.Dispatch<
                    SetStateAction<(string | number)[]>
                  >
                }
                // Add prop to control visibility/disabling
                isDisabled={
                  (item.name === "model" &&
                    (selectedBrands.length === 0 ||
                      selectedBrands.length > 1)) ||
                  (item.name === "generation" &&
                    (selectedModels.length === 0 || selectedModels.length > 1))
                }
              />
            );
          }
          return null;
        })}

        {/* Render single filter selects individually instead of in pairs */}
        {singleActiveFormFields.map((item, index) => {
          if (item.active) {
            return (
              <SingleFilterSelect
                key={`${item.name}-${index}`}
                name={item.name}
                label={item.label}
                selectData={item.selectData}
                filterTypes={item.filterTypes}
                setFilterTypes={item.setFilterTypes}
              />
            );
          }
          return null;
        })}

        <div className="col-span-4 flex justify-center w-full">
          <Preferences
            multipleActiveFormFields={multipleActiveFormFields}
            setMultipleActiveFormFields={setMultipleActiveFormFields}
            singleActiveFormFields={singleActiveFormFields}
            setSingleActiveFormFields={setSingleActiveFormFields}
          />
        </div>
      </div>
      {/* Mobile view remains unchanged */}
      <button
        className="aqua-btn !py-3 !px-20 lg:hidden flex self-center"
        onClick={() => {
          setmobileFilterActive(true);
        }}
      >
        Filtry
      </button>
      {mobileFilterActive && (
        <div className="w-full h-[2000px] fixed bg-[rgb(0,0,0,70%)] z-[80] top-[80px]"></div>
      )}
      {mobileFilterActive && (
        <div className="w-full bg-WHITE-100 rounded-[24px] lg:hidden flex flex-col p-8 gap-y-12 gap-x-8 shadow-md absolute top-[100px] z-[100]">
          <button
            className="absolute top-0 right-0 w-10 h-10 bg-WHITE-400 flex items-center justify-center rounded-full"
            onClick={() => {
              setmobileFilterActive(false);
            }}
          >
            <XIcon width={30} height={30} fill="black" />
          </button>
          {/* Render all multiple filter selects from the array */}
          {multipleActiveFormFields.map((item, index) => {
            if (item.active) {
              return (
                <MultipleFilterSelect<string | number>
                  key={`${item.name}-${index}`}
                  name={item.name}
                  label={item.label}
                  selectData={item.selectData || []} // Always provide an array, even if empty
                  selectedData={item.selectedData as (string | number)[]}
                  setSelectedData={
                    item.setSelectedData as React.Dispatch<
                      SetStateAction<(string | number)[]>
                    >
                  }
                  // Add prop to control visibility/disabling
                  isDisabled={
                    (item.name === "model" &&
                      (selectedBrands.length === 0 ||
                        selectedBrands.length > 1)) ||
                    (item.name === "generation" &&
                      (selectedModels.length === 0 ||
                        selectedModels.length > 1))
                  }
                />
              );
            }
            return null;
          })}

          {/* Render single filter selects individually instead of in pairs */}
          {singleActiveFormFields.map((item, index) => {
            if (item.active) {
              return (
                <SingleFilterSelect
                  key={`${item.name}-${index}`}
                  name={item.name}
                  label={item.label}
                  selectData={item.selectData}
                  filterTypes={item.filterTypes}
                  setFilterTypes={item.setFilterTypes}
                />
              );
            }
            return null;
          })}

          <div className="col-span-4 flex justify-center w-full">
            <Preferences
              multipleActiveFormFields={multipleActiveFormFields}
              setMultipleActiveFormFields={setMultipleActiveFormFields}
              singleActiveFormFields={singleActiveFormFields}
              setSingleActiveFormFields={setSingleActiveFormFields}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
