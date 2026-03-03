"use client";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import OfferList from "./OfferList";
// import { Pagination } from "@heroui/react";
import { Pagination } from "@heroui/pagination";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  user: any;
}

const OfferContainer = (props: Props) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<number[]>([]);
  const [selectedDriveTypes, setSelectedDriveTypes] = useState<number[]>([]);
  const [selectedDoorsCounts, setSelectedDoorsCounts] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<number[]>([]);
  const [selectedCarStates, setSelectedCarStates] = useState<number[]>([]);
  const [selectedCountryOfOrigins, setSelectedCountryOfOrigins] = useState<
    number[]
  >([]);
  const [selectedGearBoxes, setSelectedGearBoxes] = useState<number[]>([]);
  const [filterTypes, setFilterTypes] = useState<FilterType>({
    priceFrom: "",
    priceTo: "",
    yearOfProductionFrom: "",
    yearOfProductionTo: "",
    mileageFrom: "",
    mileageTo: "",
    horsePowerFrom: "",
    horsePowerTo: "",
  });
  const [offers, setOffers] = useState<FullOffer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<FilterData | null>(null);
  const [brandSelectData, setBrandSelectData] = useState<Brand[]>([]);
  // Fetch filter data only once on component mount
  useEffect(() => {
    const fetchInitialFilterData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/filterData`
        );
        const data = await res.json();
        setFilterData(data);
        setBrandSelectData(data.brands);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchInitialFilterData();
  }, []);

  const fetchOffers = async () => {
    let query: string = `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/filtered?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (selectedBrands.length > 0) {
      selectedBrands.forEach((item) => {
        query += `&marks=${item}`;
      });
    }
    if (selectedModels.length > 0) {
      selectedModels.forEach((item) => {
        query += `&models=${item}`;
      });
    }
    if (selectedGenerations.length > 0) {
      selectedGenerations.forEach((item) => {
        query += `&generations=${item}`;
      });
    }
    if (selectedBodyTypes.length > 0) {
      selectedBodyTypes.forEach((item) => {
        query += `&BodyTypeIds=${item.toString()}`;
      });
    }
    if (selectedDriveTypes.length > 0) {
      selectedDriveTypes.forEach((item) => {
        query += `&DriveTypeIds=${item.toString()}`;
      });
    }
    if (selectedDoorsCounts.length > 0) {
      selectedDoorsCounts.forEach((item) => {
        query += `&DoorsCountIds=${item.toString()}`;
      });
    }
    if (selectedColors.length > 0) {
      selectedColors.forEach((item) => {
        query += `&ColorIds=${item.toString()}`;
      });
    }

    if (selectedGearBoxes.length > 0) {
      selectedGearBoxes.forEach((item) => {
        query += `&GearBoxIds=${item.toString()}`;
      });
    }
    if (selectedFuelTypes.length > 0) {
      selectedFuelTypes.forEach((item) => {
        query += `&FuelTypeIds=${item.toString()}`;
      });
    }
    if (selectedCountryOfOrigins.length > 0) {
      selectedCountryOfOrigins.forEach((item) => {
        query += `&CountryOfOriginIds=${item.toString()}`;
      });
    }
    if (selectedCountryOfOrigins.length > 0) {
      selectedCountryOfOrigins.forEach((item) => {
        query += `&CarStatesIds=${item.toString()}`;
      });
    }

    //!FILTROWANIE CENY
    if (filterTypes.priceFrom != "" && filterTypes.priceFrom != null) {
      query += `&priceFrom=${filterTypes.priceFrom}`;
    }
    if (filterTypes.priceTo != "" && filterTypes.priceTo != null) {
      query += `&priceTo=${filterTypes.priceTo}`;
    }

    //!FILTROWANIE ROKU PRODUKCJI
    if (
      filterTypes.yearOfProductionFrom != "" &&
      filterTypes.yearOfProductionFrom != null
    ) {
      query += `&yearOfProductionFrom=${filterTypes.yearOfProductionFrom}`;
    }
    if (
      filterTypes.yearOfProductionTo != "" &&
      filterTypes.yearOfProductionTo != null
    ) {
      query += `&yearOfProductionTo=${filterTypes.yearOfProductionTo}`;
    }

    //!FILTROWANIE PRZEBIEGU
    if (filterTypes.mileageFrom != "" && filterTypes.mileageFrom != null) {
      query += `&mileageFrom=${filterTypes.mileageFrom}`;
    }
    if (filterTypes.mileageTo != "" && filterTypes.mileageTo != null) {
      query += `&mileageTo=${filterTypes.mileageTo}`;
    }

    const res = await fetch(query);
    const data = await res.json();
    return data;
  };

  const setOffersState = async () => {
    setIsLoading(true);
    const data = await fetchOffers();
    setPageCount(Math.ceil(data.totalItems / pageSize));
    setOffers(data.items);
    setIsLoading(false);
  };

  useEffect(() => {
    setOffersState();
  }, [
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
    filterTypes,
  ]);

  useEffect(() => {
    setOffersState();
  }, [pageNumber]);

  const { user } = props;
  return (
    <article className="w-full mt-12 flex flex-col items-center">
      <Filter
        selectedModels={selectedModels}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        setSelectedModels={setSelectedModels}
        selectedGenerations={selectedGenerations}
        setSelectedGenerations={setSelectedGenerations}
        selectedBodyTypes={selectedBodyTypes}
        setSelectedBodyTypes={setSelectedBodyTypes}
        filterTypes={filterTypes}
        setFilterTypes={setFilterTypes}
        selectedDriveTypes={selectedDriveTypes}
        selectedDoorsCounts={selectedDoorsCounts}
        selectedColors={selectedColors}
        selectedFuelTypes={selectedFuelTypes}
        selectedCountryOfOrigins={selectedCountryOfOrigins}
        selectedGearBoxes={selectedGearBoxes}
        setSelectedDriveTypes={setSelectedDriveTypes}
        setSelectedDoorsCounts={setSelectedDoorsCounts}
        setSelectedColors={setSelectedColors}
        setSelectedFuelTypes={setSelectedFuelTypes}
        setSelectedCountryOfOrigins={setSelectedCountryOfOrigins}
        setSelectedGearBoxes={setSelectedGearBoxes}
        filterData={filterData}
        selectedCarStates={selectedCarStates}
        setSelectedCarStates={setSelectedCarStates}
        setFilterData={setFilterData}
        brandSelectData={brandSelectData}
        setBrandSelectData={setBrandSelectData}
        setPageNumber={setPageNumber}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {offers.length > 0 ? (
            <OfferList offers={offers} user={user} />
          ) : (
            <h5 className="mobile-h5 lg:desktop-h5 mt-6">Brak pojazdów</h5>
          )}
        </>
      )}
      <>
        {offers.length > 0 && !isLoading && (
          <Pagination
            initialPage={pageNumber}
            total={pageCount}
            onChange={setPageNumber}
            className="mt-6 hidden gap-x-3 sm:flex"
            showControls={true}
            loop
            classNames={{
              item: "bg-white text-black rounded-xl hover:bg-gray-100",
              wrapper: "gap-x-3",
              next: "bg-white text-black rounded-xl hover:bg-gray-100",
              prev: "bg-white text-black rounded-xl hover:bg-gray-100",
            }}
          />
        )}
        {offers.length > 0 && !isLoading && (
          <Pagination
            initialPage={pageNumber}
            total={pageCount}
            onChange={setPageNumber}
            className="mt-6 flex gap-x-3 sm:hidden"
            siblings={0}
            loop
            classNames={{
              item: "bg-white text-black rounded-xl hover:bg-gray-100",
              wrapper: "gap-x-3",
              next: "bg-white text-black rounded-xl hover:bg-gray-100",
              prev: "bg-white text-black rounded-xl hover:bg-gray-100",
            }}
          />
        )}
      </>
    </article>
  );
};

export default OfferContainer;
