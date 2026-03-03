"use server";

import { getServerSession } from "next-auth";
import { offerFormSchema } from "../schema/schema";
import { getAuth } from "./getAuth";
import { redirect } from "next/navigation";

export const updateOffer = async (
  offerId: number,
  formData: any,
  selectedColors: Color[],
  selectedBodyTypes: number[],
  selectedCountryOfOrigins: number[],
  selectedDriveTypes: number[],
  selectedDoorsCounts: number[],
  selectedFuelTypes: number[],
  selectedGearboxes: number[],
  selectedCarStates: number[]
): Promise<any> => {
  const offer = formData;

  try {
    const response = await getAuth();
    const user = response?.data;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/${offerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mark: offer.mark,
          model: offer.model,
          price: offer.price,
          offerType: offer.offerType,
          generation: offer.generation,
          bodyTypesId: selectedBodyTypes.length > 0 ? selectedBodyTypes : [],
          comment: offer.comment,
          selectedCountryOfOriginsId:
            selectedCountryOfOrigins.length > 0 ? selectedCountryOfOrigins : [],
          doorsCountId:
            selectedDoorsCounts.length > 0 ? selectedDoorsCounts : [],
          gearboxesId: selectedGearboxes.length > 0 ? selectedGearboxes : [],
          driveTypesId: selectedDriveTypes.length > 0 ? selectedDriveTypes : [],
          carStatesId: selectedCarStates.length > 0 ? selectedCarStates : [],
          yearOfProductionFrom: offer.yearOfProductionFrom,
          yearOfProductionTo: offer.yearOfProductionTo,
          horsePowerFrom: offer.horsePowerFrom,
          horsePowerTo: offer.horsePowerTo,
          mileageFrom: offer.mileageFrom,
          mileageTo: offer.mileageTo,
          fuelTypesId: selectedFuelTypes.length > 0 ? selectedFuelTypes : [],
          userId: user.userId,
          colorsId: [...selectedColors.map((item) => item.colorId)],
        }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Editing offer failed");
    }
    return { success: true, message: "edited successfuly!" };
  } catch (error) {
    return { error: `Failed to edit!. Please try again. ${error}` };
  }
};
