import { z } from "zod";

export const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Nazwa użytkownika musi mieć minimum 3 znaki" })
    .max(20, { message: "Nazwa użytkownika może mieć maksymalnie 20 znaków" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia",
    }),
  phone: z.string().min(9, { message: "Numer telefonu jest nieprawidłowy" }),
  email: z.string().email({ message: "Nieprawidłowy format adresu email" }),
  password: z
    .string()
    .min(8, { message: "Hasło musi mieć minimum 8 znaków" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Hasło musi zawierać małe i duże litery, cyfrę oraz znak specjalny",
      }
    ),
  city: z.string().min(2, { message: "Nazwa miasta jest za krótka" }),
  zipCode: z.string().regex(/^\d{2}-\d{3}$/, {
    message: "Nieprawidłowy format kodu pocztowego",
  }),
  checkbox: z.boolean().refine((value) => value === true, {
    message: "Musisz zaakceptować warunki użytkowania",
  }),
});

export const loginFormSchema = z.object({
  username: z.string().min(1, "Nazwa użytkownika jest wymagana"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

export const offerFormSchema = z
  .object({
    mark: z
      .string()
      .min(1, { message: "Marka jest wymagana!" })
      .refine((val) => val !== "0", {
        message: "Wybierz markę pojazdu",
      }),
    model: z
      .string()
      .min(1, { message: "Model jest wymagany!" })
      .refine((val) => val !== "0", {
        message: "Wybierz model pojazdu",
      }),
    price: z.coerce.number().min(0, { message: "Cena musi być dodatnia!" }),
    offerType: z
      .string()
      .min(1, { message: "Rodzaj zlecenia jest wymagany!" })
      .refine((val) => val !== "0", {
        message: "Wybierz rodzaj oferty!",
      }),

    // Pola opcjonalne
    generation: z.string().optional(),
    comment: z.string().optional(),
    // Rok produkcji (od - do)
    yearOfProductionFrom: z.coerce
      .number()
      .int()
      .min(0, { message: "Rok produkcji musi być dodatni!" })
      .optional(),
    yearOfProductionTo: z.coerce
      .number()
      .int()
      .min(0, { message: "Rok produkcji musi być dodatni!" })
      .optional(),

    // Moc silnika (od - do)
    horsePowerFrom: z.coerce
      .number()
      .min(0, { message: "Moc silnika musi być dodatnia!" })
      .optional(),
    horsePowerTo: z.coerce
      .number()
      .min(0, { message: "Moc silnika musi być dodatnia!" })
      .optional(),

    // Przebieg (od - do)
    mileageFrom: z.coerce
      .number()
      .min(0, { message: "Przebieg musi być dodatni!" })
      .optional(),
    mileageTo: z.coerce
      .number()
      .min(0, { message: "Przebieg musi być dodatni!" })
      .optional(),

    fuelTypeId: z.coerce
      .number()
      .int()
      .min(1, { message: "Rodzaj paliwa jest wymagany" })
      .optional(),
    carStateId: z.coerce
      .number()
      .int()
      .min(1, { message: "Rodzaj paliwa jest wymagany" })
      .optional(),
    bodyTypeId: z.coerce
      .number()
      .int()
      .min(1, { message: "Rodzaj nadwozia jest wymagany" })
      .optional(),
    gearBoxId: z.coerce
      .number()
      .int()
      .min(1, { message: "Rodzaj skrzyni biegów jest wymagany" })
      .optional(),
    colorId: z.coerce
      .number()
      .int()
      .min(1, { message: "Kolor jest wymagany" })
      .optional(),
    doorsCountId: z.coerce
      .number()
      .int()
      .min(1, { message: "Liczba drzwi jest wymagana" })
      .optional(),
    driveTypeId: z.coerce
      .number()
      .int()
      .min(1, { message: "Rodzaj napędu jest wymagany" })
      .optional(),
    countryOfOriginId: z.coerce
      .number()
      .int()
      .min(1, { message: "Kraj pochodzenia jest wymagany" })
      .optional(),
  })
  .superRefine(
    (
      {
        mileageFrom,
        mileageTo,
        yearOfProductionFrom,
        yearOfProductionTo,
        horsePowerFrom,
        horsePowerTo,
      },
      ctx
    ) => {
      // Validation for mileage
      if (
        mileageFrom !== undefined &&
        mileageTo !== undefined &&
        mileageFrom > mileageTo
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Przebieg od nie może być większy niż przebieg do",
          path: ["mileageFrom"],
        });
        ctx.addIssue({
          code: "custom",
          message: "Przebieg do nie może być mniejszy niż przebieg od",
          path: ["mileageTo"],
        });
      }

      // Validation for year of production
      if (
        yearOfProductionFrom !== undefined &&
        yearOfProductionTo !== undefined &&
        yearOfProductionFrom > yearOfProductionTo
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Rok produkcji od nie może być większy niż rok produkcji do",
          path: ["yearOfProductionFrom"],
        });
        ctx.addIssue({
          code: "custom",
          message:
            "Rok produkcji do nie może być mniejszy niż rok produkcji od",
          path: ["yearOfProductionTo"],
        });
      }

      // Validation for horsepower
      if (
        horsePowerFrom !== undefined &&
        horsePowerTo !== undefined &&
        horsePowerFrom > horsePowerTo
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "Liczba koni mechanicznych od nie może być większa niż liczba koni mechanicznych do",
          path: ["horsePowerFrom"],
        });
        ctx.addIssue({
          code: "custom",
          message:
            "Liczba koni mechanicznych do nie może być mniejsza niż liczba koni mechanicznych od",
          path: ["horsePowerTo"],
        });
      }
    }
  );

export const userBasicInfoFormSchema = z.object({
  phone: z
    .string()
    .min(1, "Numer telefonu jest wymagany")
    .regex(/^\+?[1-9][0-9\s]{8,17}$/, "Niepoprawny format numeru telefonu"),

  email: z
    .string()
    .min(1, "Email jest wymagany")
    .email("Niepoprawny adres email"),

  name: z
    .string()
    .regex(
      /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż\s]*$/,
      "Imię może zawierać tylko litery i spacje"
    )
    .optional()
    .or(z.literal("")),

  surname: z
    .string()
    .regex(
      /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż\s-]*$/,
      "Nazwisko może zawierać tylko litery, spacje i myślniki"
    )
    .optional()
    .or(z.literal("")),

  companyName: z
    .string()
    .regex(
      /^[A-Za-z0-9\s&.,'-]*$/,
      "Nazwa firmy może zawierać tylko litery, cyfry, spacje, przecinki, kropki, apostrofy, myślniki oraz '&'"
    )
    .optional()
    .or(z.literal("")),

  nip: z
    .string()
    .regex(/^(\d{10})?$/, "NIP musi składać się z 10 cyfr")
    .optional()
    .or(z.literal("")),
});

export const userAddressInfoFormSchema = z.object({
  city: z
    .string()
    .regex(
      /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż\s-]*$/,
      "Miasto może zawierać tylko litery, spacje i myślniki"
    )
    .optional()
    .or(z.literal("")),

  street: z
    .string()
    .regex(
      /^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż0-9\s.,'-]*$/,
      "Ulica może zawierać tylko litery, cyfry, spacje, przecinki, kropki, apostrofy i myślniki"
    )
    .optional()
    .or(z.literal("")),

  buildingNumber: z
    .string()
    .regex(
      /^(\d+[a-zA-Z]?(\/\d+[a-zA-Z]?)?)?$/,
      "Numer budynku może zawierać cyfry, opcjonalną literę oraz numer mieszkania po ukośniku"
    )
    .optional()
    .or(z.literal("")),

  zipCode: z
    .string()
    .regex(/^(\d{2}-\d{3})?$/, "Kod pocztowy musi być w formacie XX-XXX")
    .optional()
    .or(z.literal("")),
});

// Pozostałe schematy pozostają bez zmian

export const billingFormSchema = z
  .object({
    purchaseType: z.enum(["private", "company"]),
    needsInvoice: z.boolean(),
    firstName: z
      .string()
      .min(1, "Imię jest wymagane")
      .max(50, "Imię musi mieć mniej niż 50 znaków")
      .regex(/^[A-Za-z\s]+$/, "Imię może zawierać tylko litery i spacje"),
    lastName: z
      .string()
      .min(1, "Nazwisko jest wymagane")
      .max(50, "Nazwisko musi mieć mniej niż 50 znaków")
      .regex(/^[A-Za-z\s]+$/, "Nazwisko może zawierać tylko litery i spacje"),
    companyName: z
      .string()
      .max(100, "Nazwa firmy musi mieć mniej niż 100 znaków")
      .regex(
        /^[A-Za-z0-9\s]*$/,
        "Nazwa firmy może zawierać tylko litery, cyfry i spacje"
      )
      .optional()
      .or(z.literal("")),
    nip: z
      .string()
      .regex(/^\d{10}$/, "NIP musi składać się z 10 cyfr")
      .optional()
      .or(z.literal("")),
    street: z.string().min(1, { message: "Ulica jest wymagana." }),
    postalCode: z.string().regex(/^\d{2}-\d{3}$/, {
      message: "Nieprawidłowy format kodu pocztowego",
    }),
    city: z.string().min(1, { message: "Miejscowość jest wymagana." }),
    country: z.string().min(1, { message: "Kraj jest wymagany." }),
    email: z
      .string()
      .min(1, "Email jest wymagany")
      .email("Niepoprawny adres email"),
    phone: z.string().min(9, { message: "Numer telefonu jest nieprawidłowy" }),
    acceptRodo: z.literal(true, {
      errorMap: () => ({ message: "Musisz zaakceptować zgodę RODO." }),
    }),
    acceptRodo2: z.literal(true, {
      errorMap: () => ({
        message: "Musisz zaakceptować zgodę przetwarzania danych.",
      }),
    }),
    companyStreet: z
      .string()
      .min(1, { message: "Ulica działalności jest wymagana." })
      .optional()
      .or(z.literal("")),
    companyPostalCode: z
      .string()
      .regex(/^\d{2}-\d{3}$/, {
        message: "Nieprawidłowy format firmowego kodu pocztowego",
      })
      .optional()
      .or(z.literal("")),
    companyCity: z
      .string()
      .min(1, { message: "Miejscowość działalności jest wymagana." })
      .optional()
      .or(z.literal("")),
    companyCountry: z
      .string()
      .min(1, { message: "Kraj działalności jest wymagany." })
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Validate company fields only when purchaseType is 'company' or needsInvoice is true
    if (data.purchaseType === "company" || data.needsInvoice) {
      // Company name validation
      if (!data.companyName || data.companyName.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Nazwa firmy jest wymagana",
          path: ["companyName"],
        });
      }

      // NIP validation
      if (!data.nip || data.nip.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "NIP jest wymagany",
          path: ["nip"],
        });
      }
      // Company street validation
      if (!data.companyStreet || data.companyStreet.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Ulica działalności jest wymagana",
          path: ["companyStreet"],
        });
      }

      // Company postal code validation
      if (
        !data.companyPostalCode ||
        !/^\d{2}-\d{3}$/.test(data.companyPostalCode)
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Nieprawidłowy format firmowego kodu pocztowego",
          path: ["companyPostalCode"],
        });
      }

      // Company city validation
      if (!data.companyCity || data.companyCity.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Miejscowość działalności jest wymagana",
          path: ["companyCity"],
        });
      }

      // Company country validation
      if (!data.companyCountry || data.companyCountry.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Kraj działalności jest wymagany",
          path: ["companyCountry"],
        });
      }
    }
  });
