"use server";

export const fetchOptions = async (type: string): Promise<Option[]> => {
  if (type == "offerType") {
    return [
      { value: "leasing", option: "cesja leasingu" },
      { value: "invoice", option: "zakup na fakturę" },
      { value: "private", option: "zakup prywatny" },
    ];
  } else if (type == "generation") {
    return [];
  } else if (type == "bodyType") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/BodyTypes`);
    const bodyTypes = await res.json();
    const bodyTypesOption: any[] = bodyTypes.map((item: any) => ({
      value: item.bodyTypeId, // Assuming `id` is the unique identifier
      option: item.name, // Assuming `name` is the label
    }));
    return bodyTypesOption;
  } else if (type == "gearBox") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/GearBoxes`);
    const gearBoxes = await res.json();
    const gearBoxesOption: any[] = gearBoxes.map((item: any) => ({
      value: item.gearBoxId, // Assuming `id` is the unique identifier
      option: item.name, // Assuming `name` is the label
    }));
    return gearBoxesOption;
  } else if (type == "driveType") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/DriveTypes`
    );
    const driveTypes = await res.json();
    const driveTypesOption: any[] = driveTypes.map((item: any) => ({
      value: item.driveTypeId, // Assuming `id` is the unique identifier
      option: item.name, // Assuming `name` is the label
    }));
    return driveTypesOption;
  } else if (type == "fuelTypeId") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/FuelTypes`);
    const fuelTypes = await res.json();
    const fuelTypesOption: any[] = fuelTypes.map((item: any) => ({
      value: item.fuelTypeId, // Assuming `id` is the unique identifier
      option: item.name, // Assuming `name` is the label
    }));
    return fuelTypesOption;
  } else {
    return [];
  }
};
export const fetchModelOptions = async (
  type: string,
  mark?: string
): Promise<Option[]> => {
  if (type == "model") {
    if (mark == "BMW") {
      return [
        { value: "Seria 1", option: "Seria 1" },
        { value: "Seria 3", option: "Seria 3" },
        { value: "M3", option: "M3" },
      ];
    } else if (mark == "Audi") {
      return [
        { value: "A3", option: "A3" },
        { value: "A4", option: "A4" },
        { value: "A5", option: "A5" },
      ];
    } else if (mark == "Toyota") {
      return [
        { value: "Yaris", option: "Yaris" },
        { value: "Celica", option: "Celica" },
        { value: "Avensis", option: "Avensis" },
      ];
    } else {
      return [];
    }
  } else {
    return [];
  }
};
export const fetchGenerationOptions = async (
  type: string,
  model?: string
): Promise<Option[]> => {
  if (type == "generation") {
    if (model == "Seria 1") {
      return [
        { value: "F20", option: " F20" },
        { value: "114", option: " 114" },
        { value: "E81", option: " E81" },
      ];
    } else if (model == "Seria 3") {
      return [
        { value: "E36", option: " E36" },
        { value: "E46", option: " E46" },
        { value: "E90", option: " E90" },
      ];
    } else if (model == "M3") {
      return [];
    } else if (model == "A3") {
      return [
        { value: "8P", option: " 8P" },
        { value: "8L", option: " 8L" },
        { value: "8V", option: " 8V" },
      ];
    } else if (model == "A4") {
      return [
        { value: "B5", option: " B5" },
        { value: "B6", option: " B6" },
        { value: "B7", option: " B7" },
      ];
    } else if (model == "A5") {
      return [
        { value: "B10", option: " B10" },
        { value: "8T", option: "8T" },
        { value: "F5", option: "F5" },
      ];
    } else if (model == "Celica") {
      return [];
    } else if (model == "Yaris") {
      return [
        { value: "I", option: "I" },
        { value: "II", option: "II" },
        { value: "III", option: "III" },
      ];
    } else if (model == "Avensis") {
      return [
        { value: "I", option: "I" },
        { value: "II", option: "II" },
        { value: "III", option: "III" },
      ];
    } else {
      return [];
    }
  } else {
    return [];
  }
};
