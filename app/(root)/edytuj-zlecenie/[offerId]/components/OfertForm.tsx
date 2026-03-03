"use client";
import { useForm } from "react-hook-form";
import OfertInput from "./OfertInput";
import OfertSelect from "./OfertSelect";
import { zodResolver as hookFormZodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import Preferences from "./Preferences";
import { offerFormSchema } from "@/app/schema/schema";
import { createOffer } from "@/app/actions/createOffer";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ColorMultipleSelect from "./ColorMultipleSelect";
import MultipleSelect from "./MultipleSelect";
import { useRouter } from "next/navigation";
import { updateOffer } from "@/app/actions/updateOffer";
import Link from "next/link";
import { LogIn } from "lucide-react";

// Infer the types of the fields
export type ActiveFormFields = z.infer<typeof offerFormSchema>;

type OfertFormField = {
  id: string;
  id2?: string;
  placeholder: string;
  placeholder2?: string;
  name: keyof ActiveFormFields;
  name2?: keyof ActiveFormFields;
  fields?: "single" | "double" | "multiple";
  label: string;
  inputType: "select" | "text" | "number"; // Restricting inputType to valid options
  active: boolean;
};

interface Props {
  offerDb: FullOffer;
  user: any;
}

const OfertForm = ({ offerDb, user }: Props) => {
  const [formActiveFields, setFormActiveFields] = useState<OfertFormField[]>([
    {
      placeholder: "Marka pojazdu",
      label: "Wybierz markę pojazdu",
      inputType: "select",
      fields: "single",
      name: "mark",
      id: "mark",
      active: true,
    },
    {
      placeholder: "Model pojazdu",
      label: "Wybierz model pojazdu",
      inputType: "select",
      fields: "single",
      name: "model",
      id: "model",
      active: true,
    },
    {
      placeholder: "Podaj maksymalną cenę samochodu",
      label: "Maksymalna kwota samochodu",
      inputType: "number",
      fields: "single",
      name: "price",
      id: "price",
      active: true,
    },
    {
      placeholder: "Rodzaj oferty",
      label: "Wybierz rodzaj oferty",
      inputType: "select",
      fields: "single",
      name: "offerType",
      id: "offerType",
      active: true,
    },
    {
      placeholder: "Generacja",
      label: "Wybierz geeneracje",
      inputType: "select",
      fields: "single",
      name: "generation",
      id: "generation",
      active: false,
    },
    {
      placeholder: "Typ nadwozia",
      label: "Wybierz typ nadwozia",
      fields: "multiple",
      inputType: "select",
      name: "bodyTypeId",
      id: "bodyTypeId",
      active: false,
    },
    {
      placeholder: "Podaj liczbę drzwi",
      fields: "multiple",
      label: "Liczba drzwi",
      inputType: "select",
      name: "doorsCountId",
      id: "doorsCountId",
      active: false,
    },
    {
      placeholder: "Skrzynia biegów",
      label: "Wybierz rodzaj skrzyni biegów",
      fields: "multiple",
      inputType: "select",
      name: "gearBoxId",
      id: "gearBoxId",
      active: false,
    },
    {
      placeholder: "Rodzaj paliwa",
      fields: "multiple",
      label: "Wybierz rodzaj paliwa",
      inputType: "select",
      name: "fuelTypeId",
      id: "fuelTypeId",
      active: false,
    },
    {
      placeholder: "Kraj pochodzenia",
      fields: "multiple",
      label: "Wybierz kraj pochodzenia",
      inputType: "select",
      name: "countryOfOriginId",
      id: "countryOfOriginId",
      active: false,
    },
    {
      placeholder: "Kolor",
      fields: "multiple",
      label: "Wybierz kolor",
      inputType: "select",
      name: "colorId",
      id: "colorId",
      active: false,
    },
    {
      placeholder: "Napęd",
      fields: "multiple",
      label: "Wybierz rodzaj napędu",
      inputType: "select",
      name: "driveTypeId",
      id: "driveTypeId",
      active: false,
    },
    {
      placeholder: "Stan pojazdu",
      fields: "multiple",
      label: "Wybierz stan pojazdu",
      inputType: "select",
      name: "carStateId",
      id: "carStateId",
      active: false,
    },
    {
      placeholder: "Podaj przebieg od",
      placeholder2: "Podaj przebieg do",
      label: "Podaj przebieg",
      fields: "double",
      inputType: "number",
      name: "mileageFrom",
      id: "mileageFrom",
      name2: "mileageTo",
      id2: "mileageTo",
      active: false,
    },
    {
      placeholder: "Podaj liczbę koni od",
      placeholder2: "Podaj liczbę koni do",
      label: "Podaj liczbę koni mechanicznych",
      fields: "double",
      inputType: "number",
      name: "horsePowerFrom",
      id: "horsePowerFrom",
      name2: "horsePowerTo",
      id2: "horsePowerTo",
      active: false,
    },
    {
      placeholder: "Podaj rok produkcji od",
      placeholder2: "Podaj rok produkcji do",
      label: "Podaj rok produkcji",
      fields: "double",
      inputType: "number",
      name: "yearOfProductionFrom",
      id: "yearOfProductionFrom",
      name2: "yearOfProductionTo",
      id2: "yearOfProductionTo",
      active: false,
    },
    {
      placeholder: "Uwagi ogólne",
      label: "Wpisz uwagi ogólne",
      inputType: "text",
      fields: "single",
      name: "comment",
      id: "comment",
      active: false,
    },
  ]);

  type NewType = ActiveFormFields;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    trigger,
    formState: { errors, isValid },
  } = useForm<NewType>({
    resolver: zodResolver(offerFormSchema),
    mode: "onChange", // Trigger validation on every change
  });
  const [
    mark,
    model,
    generation,
    offerType,
    price,
    mileageFrom,
    mileageTo,
    yearOfProductionFrom,
    yearOfProductionTo,
    horsePowerFrom,
    horsePowerTo,
  ] = watch([
    "mark",
    "model",
    "generation",
    "offerType",
    "price",
    "mileageFrom",
    "mileageTo",
    "yearOfProductionFrom",
    "yearOfProductionTo",
    "horsePowerFrom",
    "horsePowerTo",
  ]);

  const router = useRouter();
  const [revalidateData, setRevalidateData] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [colorsDb, setColorsDb] = useState<Color[]>([]);
  const [bodyTypesDb, setBodyTypesDb] = useState<BodyType[]>([]);
  const [countryOfOriginsDb, setCountryOfOriginsDb] = useState<
    CountryOfOriginsType[]
  >([]);
  const [driveTypesDb, setDriveTypesDb] = useState<DriveType[]>([]);
  const [doorsCountDb, setDoorsCountDb] = useState<DoorsCountType[]>([]);
  const [fuelTypeDb, setFuelTypeDb] = useState<FuelType[]>([]);
  const [gearBoxDb, setGearBoxDb] = useState<GearBoxType[]>([]);
  const [carStateDb, setCarStateDb] = useState<CarStateType[]>([]);

  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<number[]>([]);
  const [selectedCountryOfOrigins, setSelectedCountryOfOrigins] = useState<
    number[]
  >([]);
  const [selectedDriveTypes, setSelectedDriveTypes] = useState<number[]>([]);
  const [selectedDoorsCounts, setSelectedDoorsCounts] = useState<number[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<number[]>([]);
  const [selectedGearboxes, setSelectedGearboxes] = useState<number[]>([]);
  const [selectedCarStates, setSelectedCarStates] = useState<number[]>([]);

  useEffect(() => {
    if (price !== undefined) {
      // Uruchom walidację dla wszystkich par pól od-do
      trigger([
        "mileageFrom",
        "mileageTo",
        "yearOfProductionFrom",
        "yearOfProductionTo",
        "horsePowerFrom",
        "horsePowerTo",
      ]);
    }
  }, [price, trigger]);

  // Dla przebiegu
  useEffect(() => {
    // Dodaj warunek sprawdzający tylko aktywne pola
    const field = formActiveFields.find(
      (f) => f.name === "mileageFrom" || f.name === "mileageTo"
    );
    if (
      field &&
      field.active &&
      (mileageFrom !== undefined || mileageTo !== undefined)
    ) {
      trigger(["mileageFrom", "mileageTo"]);
    }
  }, [mileageFrom, mileageTo, formActiveFields, trigger]);

  // Dla roku produkcji
  useEffect(() => {
    if (
      yearOfProductionFrom !== undefined ||
      yearOfProductionTo !== undefined
    ) {
      trigger(["yearOfProductionFrom", "yearOfProductionTo"]);
    }
  }, [yearOfProductionFrom, yearOfProductionTo, trigger]);

  // Dla mocy silnika
  useEffect(() => {
    if (horsePowerFrom !== undefined || horsePowerTo !== undefined) {
      trigger(["horsePowerFrom", "horsePowerTo"]);
    }
  }, [horsePowerFrom, horsePowerTo, trigger]);

  // Modified handleFormFieldsChange function to clear selected values when fields are deactivated
  const handleFormFieldsChange = (newFormFields: OfertFormField[]) => {
    // Find fields that were just activated
    const newlyActivatedFields = newFormFields.filter((newField) => {
      const oldField = formActiveFields.find(
        (field) => field.name === newField.name
      );
      return newField.active && oldField && !oldField.active;
    });

    // Find fields that were just deactivated
    const newlyDeactivatedFields = newFormFields.filter((newField) => {
      const oldField = formActiveFields.find(
        (field) => field.name === newField.name
      );
      return !newField.active && oldField && oldField.active;
    });

    // Set new fields
    setFormActiveFields(newFormFields);

    // Reset ONLY newly activated fields
    newlyActivatedFields.forEach((field) => {
      if (field.fields === "double") {
        if (field.name) resetField(field.name);
        if (field.name2) resetField(field.name2);
      } else {
        resetField(field.name);
      }
    });

    // Clear selected values AND reset form values for deactivated fields
    newlyDeactivatedFields.forEach((field) => {
      // Reset the form field(s)
      if (field.fields === "double") {
        if (field.name) {
          resetField(field.name);
          setValue(field.name, undefined, { shouldValidate: true });
        }
        if (field.name2) {
          resetField(field.name2);
          setValue(field.name2, undefined, { shouldValidate: true });
        }
      } else {
        resetField(field.name);
        setValue(field.name, undefined, { shouldValidate: true });
      }

      // Clear the corresponding selected values array
      switch (field.name) {
        case "bodyTypeId":
          setSelectedBodyTypes([]);
          break;
        case "countryOfOriginId":
          setSelectedCountryOfOrigins([]);
          break;
        case "driveTypeId":
          setSelectedDriveTypes([]);
          break;
        case "doorsCountId":
          setSelectedDoorsCounts([]);
          break;
        case "fuelTypeId":
          setSelectedFuelTypes([]);
          break;
        case "gearBoxId":
          setSelectedGearboxes([]);
          break;
        case "colorId":
          setSelectedColors([]);
          break;
        case "carStateId":
          setSelectedCarStates([]);
          break;
        default:
          break;
      }
    });
  };

  const createOfferMutation = useMutation({
    mutationFn: async (data: any) => {
      // Wyświetl toast "pending" gdy rozpoczyna się zapytanie
      setLoading(true);
      const pendingToastId = toast.loading("Trwa edytowanie oferty...");

      try {
        const result = await updateOffer(
          offerDb.offerId,
          data,
          selectedColors,
          selectedBodyTypes,
          selectedCountryOfOrigins,
          selectedDriveTypes,
          selectedDoorsCounts,
          selectedFuelTypes,
          selectedGearboxes,
          selectedCarStates
        );

        if (result?.error) throw new Error(result.error);

        // Aktualizuj toast pending na success
        toast.update(pendingToastId, {
          render: "Pomyślnie zedytowano ofertę!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          onClose: () => {
            setLoading(false);
            router.push("/moje-zlecenia");
          },
        });

        return result;
      } catch (error) {
        // Aktualizuj toast pending na error
        setLoading(false);
        toast.update(pendingToastId, {
          render: "Nie udało się zedytować oferty!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });

        throw error;
      }
    },
    // Usuwamy onSuccess i onError, ponieważ obsługujemy toasty bezpośrednio w mutationFn
  });

  useEffect(() => {
    //! FETCH FILTER DATA FOR SELECTS
    const fetchColors = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/filterData`
      );
      const data = await res.json();
      setColorsDb(data.colors);
      setBodyTypesDb(data.bodyTypes);
      setCountryOfOriginsDb(data.countryOfOrigins);
      setDriveTypesDb(data.driveTypes);
      setDoorsCountDb(data.doorsCounts);
      setFuelTypeDb(data.fuelTypes);
      setGearBoxDb(data.gearBoxes);
      setCarStateDb(data.carStates);
    };
    fetchColors();
  }, []);

  // Nowy useEffect, który uzupełnia formularz danymi z offerDb
  useEffect(() => {
    if (offerDb) {
      // Aktualizacja podstawowych pól
      if (offerDb.mark) setValue("mark", offerDb.mark);
      if (offerDb.model) setValue("model", offerDb.model);
      if (offerDb.price) setValue("price", offerDb.price);
      if (offerDb.offerType) setValue("offerType", offerDb.offerType);
      // if (revalidateData) {
      //   router.refresh();
      //   setRevalidateData(false);
      // }
      if (offerDb.offerType) setValue("offerType", offerDb.offerType);
      if (offerDb.generation)
        setValue("generation", offerDb.generation, { shouldValidate: true });
      if (offerDb.comment) setValue("comment", offerDb.comment);

      // Aktualizacja wartości zakresowych
      if (offerDb.mileageFrom !== undefined && offerDb.mileageFrom != null)
        setValue("mileageFrom", offerDb.mileageFrom);
      if (offerDb.mileageTo !== undefined && offerDb.mileageTo != null)
        setValue("mileageTo", offerDb.mileageTo);
      if (
        offerDb.yearOfProductionFrom !== undefined &&
        offerDb.yearOfProductionFrom != null
      )
        setValue("yearOfProductionFrom", offerDb.yearOfProductionFrom);
      if (
        offerDb.yearOfProductionTo !== undefined &&
        offerDb.yearOfProductionTo != null
      )
        setValue("yearOfProductionTo", offerDb.yearOfProductionTo);
      if (
        offerDb.horsePowerFrom !== undefined &&
        offerDb.horsePowerFrom != null
      )
        setValue("horsePowerFrom", offerDb.horsePowerFrom);
      if (offerDb.horsePowerTo !== undefined && offerDb.horsePowerTo != null)
        setValue("horsePowerTo", offerDb.horsePowerTo);
    }
  }, [offerDb, setValue, formActiveFields]);

  useEffect(() => {
    // Aktywacja i wypełnienie preferencji, które mają dane
    const updatedFormFields = [...formActiveFields];

    // Dla każdego pola w formularzu sprawdzamy, czy istnieją dla niego dane
    updatedFormFields.forEach((field, index) => {
      let shouldActivate = false;

      // Sprawdzenie czy pole powinno być aktywowane na podstawie danych
      switch (field.name) {
        case "generation":
          if (offerDb.generation) shouldActivate = true;
          break;
        case "bodyTypeId":
          if (offerDb.bodyTypes && offerDb.bodyTypes.length > 0) {
            shouldActivate = true;
            setSelectedBodyTypes(offerDb.bodyTypes.map((bt) => bt.bodyTypeId));
          }
          break;
        case "doorsCountId":
          if (offerDb.doorsCounts && offerDb.doorsCounts.length > 0) {
            shouldActivate = true;
            setSelectedDoorsCounts(
              offerDb.doorsCounts.map((dc) => dc.doorsCountId)
            );
          }
          break;
        case "gearBoxId":
          if (offerDb.gearBoxes && offerDb.gearBoxes.length > 0) {
            shouldActivate = true;
            setSelectedGearboxes(offerDb.gearBoxes.map((gb) => gb.gearBoxId));
          }
          break;
        case "fuelTypeId":
          if (offerDb.fuelTypes && offerDb.fuelTypes.length > 0) {
            shouldActivate = true;
            setSelectedFuelTypes(offerDb.fuelTypes.map((ft) => ft.fuelTypeId));
          }
          break;
        case "countryOfOriginId":
          if (offerDb.countryOfOrigins && offerDb.countryOfOrigins.length > 0) {
            shouldActivate = true;
            setSelectedCountryOfOrigins(
              offerDb.countryOfOrigins.map((co) => co.countryOfOriginId)
            );
          }
          break;
        case "colorId":
          if (offerDb.colors && offerDb.colors.length > 0) {
            shouldActivate = true;
            setSelectedColors(offerDb.colors);
          }
          break;
        case "driveTypeId":
          if (offerDb.driveTypes && offerDb.driveTypes.length > 0) {
            shouldActivate = true;
            setSelectedDriveTypes(
              offerDb.driveTypes.map((dt) => dt.driveTypeId)
            );
          }
          break;
        case "carStateId":
          if (offerDb.carStates && offerDb.carStates.length > 0) {
            shouldActivate = true;
            setSelectedCarStates(offerDb.carStates.map((cs) => cs.carStateId));
          }
          break;
        case "mileageFrom":
        case "mileageTo":
          if (offerDb.mileageFrom !== null || offerDb.mileageTo !== null) {
            shouldActivate = true;
          }
          break;
        case "horsePowerFrom":
        case "horsePowerTo":
          if (
            offerDb.horsePowerFrom !== null ||
            offerDb.horsePowerTo !== null
          ) {
            shouldActivate = true;
          }
          break;
        case "yearOfProductionFrom":
        case "yearOfProductionTo":
          if (
            offerDb.yearOfProductionFrom !== null ||
            offerDb.yearOfProductionTo !== null
          ) {
            shouldActivate = true;
          }
          break;
        case "comment":
          if (offerDb.comment) shouldActivate = true;
          break;
        default:
          break;
      }

      // Aktualizujemy stan aktywności pola
      if (shouldActivate && !field.active) {
        updatedFormFields[index] = { ...field, active: true };
      }
    });

    // Aktualizacja stanu pól formularza tylko jeśli wprowadzono zmiany
    if (
      JSON.stringify(updatedFormFields) !== JSON.stringify(formActiveFields)
    ) {
      setFormActiveFields(updatedFormFields);
    }
  }, [offerDb]);

  if (offerDb.user.userId == user.data.userId) {
    return (
      <form
        className="flex flex-col gap-y-8"
        onSubmit={handleSubmit((data) => {
          // Filter out inactive fields from the data
          const activeData = Object.fromEntries(
            Object.entries(data).filter(([key]) => {
              // Find if this key belongs to an active field
              const field = formActiveFields.find(
                (f) => f.name === key || f.name2 === key
              );
              return field && field.active;
            })
          );

          createOfferMutation.mutate(activeData);
        })}
      >
        {formActiveFields.map((item, index) => {
          if (item.active) {
            return (
              <div key={index} className="flex flex-col">
                {item.inputType === "select" ? (
                  item.fields == "single" ? (
                    <OfertSelect
                      name={item.name}
                      register={register}
                      id={item.id}
                      model={model && model}
                      mark={mark && mark}
                      label={item.label}
                      placeholder={item.placeholder}
                      setValue={setValue}
                      error={errors[item.name]?.message}
                      generation={generation && generation}
                      offerType={offerType && offerType}
                    />
                  ) : item.name == "colorId" ? (
                    <ColorMultipleSelect
                      selectedColors={selectedColors}
                      setSelctedColors={setSelectedColors}
                      colors={colorsDb}
                    />
                  ) : (
                    <MultipleSelect
                      label={item.label}
                      name={
                        item.name == "bodyTypeId"
                          ? "bodyType"
                          : item.name == "countryOfOriginId"
                          ? "countryOfOrigin"
                          : item.name == "driveTypeId"
                          ? "driveType"
                          : item.name == "fuelTypeId"
                          ? "fuelType"
                          : item.name == "doorsCountId"
                          ? "doorsCount"
                          : item.name == "gearBoxId"
                          ? "gearBox"
                          : item.name == "carStateId"
                          ? "carState"
                          : ""
                      }
                      selectOptionData={
                        item.name == "bodyTypeId"
                          ? bodyTypesDb
                          : item.name == "countryOfOriginId"
                          ? countryOfOriginsDb
                          : item.name == "driveTypeId"
                          ? driveTypesDb
                          : item.name == "fuelTypeId"
                          ? fuelTypeDb
                          : item.name == "doorsCountId"
                          ? doorsCountDb
                          : item.name == "gearBoxId"
                          ? gearBoxDb
                          : item.name == "carStateId"
                          ? carStateDb
                          : undefined
                      }
                      setSelectedOptions={
                        item.name == "bodyTypeId"
                          ? setSelectedBodyTypes
                          : item.name == "countryOfOriginId"
                          ? setSelectedCountryOfOrigins
                          : item.name == "driveTypeId"
                          ? setSelectedDriveTypes
                          : item.name == "fuelTypeId"
                          ? setSelectedFuelTypes
                          : item.name == "doorsCountId"
                          ? setSelectedDoorsCounts
                          : item.name == "gearBoxId"
                          ? setSelectedGearboxes
                          : item.name == "carStateId"
                          ? setSelectedCarStates
                          : undefined
                      }
                      selectedOptions={
                        item.name == "bodyTypeId"
                          ? selectedBodyTypes
                          : item.name == "countryOfOriginId"
                          ? selectedCountryOfOrigins
                          : item.name == "driveTypeId"
                          ? selectedDriveTypes
                          : item.name == "fuelTypeId"
                          ? selectedFuelTypes
                          : item.name == "doorsCountId"
                          ? selectedDoorsCounts
                          : item.name == "gearBoxId"
                          ? selectedGearboxes
                          : item.name == "carStateId"
                          ? selectedCarStates
                          : undefined
                      }
                    />
                  )
                ) : item.fields == "single" ? (
                  <OfertInput
                    register={register}
                    name={item.name}
                    id={item.id}
                    label={item.label}
                    inputType={item.inputType}
                    placeholder={item.placeholder}
                    error={errors[item.name]?.message}
                    fields="single"
                    trigger={trigger}
                  />
                ) : (
                  <OfertInput
                    register={register}
                    name={item.name}
                    name2={item.name2}
                    id={item.id}
                    id2={item.id2}
                    label={item.label}
                    inputType={item.inputType}
                    placeholder={item.placeholder}
                    placeholder2={item.placeholder2}
                    error={errors[item.name]?.message}
                    error2={item.name2 && errors[item.name2]?.message}
                    fields="double"
                    trigger={trigger}
                  />
                )}
              </div>
            );
          }
          return null;
        })}

        <Preferences
          formFields={formActiveFields}
          setFormFields={handleFormFieldsChange} // Zmodyfikowane - używamy nowej funkcji
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className={`aqua-btn !px-10 !py-4 ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isValid || loading}
          >
            Przejdź dalej
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-center mobile-small-bold sm:mobile-h2 lg:desktop-h2">
          Nie znaleziono zlecenia do edycji
        </h2>
        <Link className="aqua-btn !py-1 sm:!py-3 mt-10" href={"/moje-zlecenia"}>
          Przejdź do moje zlecenia
        </Link>
      </div>
    );
  }
};

export default OfertForm;
function zodResolver(
  schema: z.ZodSchema<ActiveFormFields>
): import("react-hook-form").Resolver<ActiveFormFields> {
  return hookFormZodResolver(schema); // Pass the schema directly to zodResolver
}
