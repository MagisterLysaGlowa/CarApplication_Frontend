"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { billingFormSchema } from "@/app/schema/schema";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Updated Zod schema to include street and country
// Type inference for the schema
type BillingFormData = z.infer<typeof billingFormSchema>;

interface CartProduct {
  id: string;
  title: string;
  tokens: number;
  savings?: string;
  totalPrice: number;
  pricePerToken: number;
  currency: string;
}

interface OrderItemType {
  tokenPackageId: number;
  amount: number;
}

interface Props {
  token: string | undefined;
  user: any;
}

const BillingForm = ({ token, user }: Props) => {
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);
  const [orderPrice, setOrderPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("pl");
  const [zipCode, setZipCode] = useState<string>("");
  const [companyZipCode, setCompanyZipCode] = useState<string>("");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    reset,
    trigger,
  } = useForm<BillingFormData>({
    resolver: zodResolver(billingFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      purchaseType: "private",
      needsInvoice: false,
      companyName: "",
      nip: "",
    },
  });

  //!SET VALUES FROM DB

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/userByUserId/${user.userId}`
        );
        const data = await res.json();

        if (data) {
          setValue("firstName", data.name);
          setValue("lastName", data.surname);
          setValue("phone", `+48 ${data.phoneNumber}`);
          setValue("email", data.email);
          setValue("city", data.city);
          setValue("street", data.street);
          setValue("postalCode", data.zipCode);
          setZipCode(data.zipCode);
        }
      } catch {}
    };
    fetchUserData();
  }, []);

  // Watch form values for conditional rendering
  const purchaseType = watch("purchaseType");
  const needsInvoice = watch("needsInvoice");

  const handleZipCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    let formattedValue = value.replace(/\D/g, "");
    if (formattedValue.length > 2) {
      formattedValue = `${formattedValue.slice(0, 2)}-${formattedValue.slice(
        2,
        5
      )}`;
    }

    // Limit to 5 characters after formatting
    formattedValue = formattedValue.slice(0, 6);

    if (name == "postalCode") {
      setValue("postalCode", formattedValue, { shouldValidate: true });
      setZipCode(formattedValue);
    } else if (name == "companyPostalCode") {
      setValue("companyPostalCode", formattedValue, { shouldValidate: true });
      setCompanyZipCode(formattedValue);
    }
  };
  useEffect(() => {
    if (purchaseType === "private" && !needsInvoice) {
      setValue("companyName", "");
      setValue("nip", "");
      setValue("companyStreet", "");
      setValue("companyCity", "");
      setValue("companyCountry", "");
      setValue("companyPostalCode", "");
    }
  }, [purchaseType, needsInvoice, setValue]);

  useEffect(() => {
    const fetchCart = async () => {
      const cartKey = "cartItems";
      const storedData = localStorage.getItem(cartKey);
      let cart: CartProduct[] = [];
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/TokenPackage`
      );
      const data = await res.json();

      if (storedData) {
        try {
          cart = JSON.parse(storedData) as CartProduct[];
        } catch (error) {
          console.error("Błąd parsowania zawartości localStorage:", error);
        }
      }

      let priceCalculate: number = 0;
      cart.forEach((item) => {
        priceCalculate += item.totalPrice;
      });
      setOrderPrice(priceCalculate);

      // Mapa do grupowania pakietów według ich ID
      const orderItemsMap = new Map<number, number>();

      cart.forEach((item) => {
        const tokenPackageId =
          data.find(
            (x: TokenPackage) =>
              x.title === item.title && x.tokenCount === item.tokens
          )?.tokenPackageId ?? 0;

        if (tokenPackageId !== 0) {
          orderItemsMap.set(
            tokenPackageId,
            (orderItemsMap.get(tokenPackageId) || 0) + 1
          );
        }
      });

      // Zamiana mapy na tablicę
      const orderItemsArray: OrderItemType[] = Array.from(
        orderItemsMap,
        ([id, amount]) => ({
          tokenPackageId: id,
          amount,
        })
      );
      setOrderItems(orderItemsArray);
    };
    fetchCart();
  }, []);

  const onSubmit = async (data: BillingFormData) => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        fullPrice: orderPrice,
        description: `Token Package Order - ${new Date().toISOString()}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phone,
        zipCode: data.postalCode,
        street: data.street,
        country: data.country,
        city: data.city,
        nip: data.nip || null,
        companyName: data.companyName || null,
        companyZipCode: data.companyPostalCode || null,
        companyStreet: data.companyStreet || null,
        companyCity: data.companyCity || null,
        companyCountry: data.companyCountry || null,
        orderItems,
        returnUrl: `${window.location.origin}/paymentStatus`,
        token: token,
      };

      const response = await fetch("api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.text();
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${responseData}`
        );
      }
      localStorage.setItem("isLoggedIn", "true");

      try {
        const parsedData = JSON.parse(responseData);
        window.location.href = parsedData.redirectUrl;
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        setError("Nieprawidłowa odpowiedź serwera");
      }
    } catch (err: any) {
      console.error("Payment submission error:", err);
      setError(err.message || "Wystąpił błąd podczas tworzenia płatności");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:max-w-[800px] lg:mx-auto lg:p-4 sm:p-6 p-3 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div className="col-span-2">
        <h2 className="mobile-h2 lg:desktop-h2 text-center pb-0 mb-2">
          Dane do rozliczeń
        </h2>
        <p className="mobile-normal lg:desktop-normal font-[400] text-center pt-0 mt-0">
          Jeśli kupujesz jako firma lub potrzebujesz faktury, zaznacz
          odpowiednie opcję.
        </p>
      </div>

      {/* Rodzaj zakupu i faktura */}
      <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center sm:flex-row sm:items-center py-4 space-y-4 sm:space-y-0 sm:space-x-12">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="private"
            {...register("purchaseType")}
            className="form-radio cursor-pointer"
          />
          <span className="mobile-small sm:mobile-normal lg:desktop-normal">
            Kupuję jako osoba prywatna
          </span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="company"
            {...register("purchaseType")}
            className="form-radio cursor-pointer"
          />
          <span className="mobile-small sm:mobile-normal lg:desktop-normal">
            Kupuję jako firma
          </span>
        </label>

        <div className="lg:block hidden border-0 border-solid border-l py-4 border-[#CACACA]" />

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("needsInvoice")}
            className="form-checkbox cursor-pointer"
          />
          <span className="mobile-small sm:mobile-normal lg:desktop-normal">
            Potrzebuję faktury
          </span>
        </label>
      </div>

      <h4 className="mobile-large-bold sm:mobile-h4 lg:desktop-h4 col-span-2">
        Dane osobowe
      </h4>

      {/* Imię */}
      <div className="col-span-2 sm:col-span-1">
        <label
          htmlFor="firstName"
          className="block mb-1 text-[18px] font-[600]"
        >
          Imię
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2 outline-none"
          placeholder="Wpisz imię"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Nazwisko */}
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="lastName" className="block mb-1 text-[18px] font-[600]">
          Nazwisko
        </label>
        <input
          id="lastName"
          type="text"
          {...register("lastName")}
          className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2 outline-none"
          placeholder="Wpisz nazwisko"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>

      {/* Pola dla firmy (Nazwa firmy i Numer NIP) */}
      {(purchaseType === "company" || needsInvoice) && (
        <>
          {/* Nazwa firmy */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="companyName"
              className="block mb-1 text-[18px] font-[600]"
            >
              Nazwa firmy
            </label>
            <input
              id="companyName"
              type="text"
              {...register("companyName")}
              className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2"
              placeholder="Wpisz nazwę firmy"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Numer NIP */}
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="nip" className="block mb-1 text-[18px] font-[600]">
              Numer NIP
            </label>
            <input
              id="nip"
              type="text"
              {...register("nip")}
              className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2"
              placeholder="Wpisz numer NIP (10 cyfr)"
            />
            {errors.nip && (
              <p className="text-red-500 text-sm mt-1">{errors.nip.message}</p>
            )}
          </div>
        </>
      )}

      {/* Adres e-mail */}
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="email" className="block mb-1 text-[18px] font-[600]">
          Adres e-mail
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2 pointer-events-none bg-WHITE-300"
          placeholder="Wpisz adres e-mail"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Numer telefonu */}
      {/* Phone number with PhoneInput */}
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="phone" className="block mb-1 text-[18px] font-[600]">
          Numer telefonu
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              country={selectedCountry}
              value={value ? `+${value}` : ""}
              onChange={(phone, data: CountryData) => {
                const formattedPhone = phone.startsWith("+")
                  ? phone.slice(1)
                  : phone;
                onChange(formattedPhone);
                if (data && data.countryCode) {
                  setSelectedCountry(data.countryCode);
                }
              }}
              onBlur={() => {
                setValue("phone", value, { shouldValidate: true });
              }}
              preferredCountries={["pl", "de", "us"]}
              placeholder="Podaj numer telefonu"
              inputStyle={{
                width: "100%",
                height: "42px",
                borderRadius: "10px",
                padding: "0 2.8rem",
                fontSize: "1rem",
              }}
              containerStyle={{
                width: "100%",
              }}
            />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <h4 className="mobile-large-bold sm:mobile-h4 lg:desktop-h4 col-span-2 mt-8">
        Adres rozliczeniowy
      </h4>

      {/* Postal code with auto-formatting */}
      <div className="col-span-2 sm:col-span-1">
        <label
          htmlFor="postalCode"
          className="block mb-1 text-[18px] font-[600]"
        >
          Kod pocztowy
        </label>
        <input
          id="postalCode"
          type="text"
          value={zipCode}
          {...register("postalCode")}
          onChange={(e) => handleZipCodeChange(e)}
          className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2 outline-none"
          placeholder="00-000"
        />
        {errors.postalCode && (
          <p className="text-red-500 text-sm mt-1">
            {errors.postalCode.message}
          </p>
        )}
      </div>

      {/* Ulica - New field */}
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="street" className="block mb-1 text-[18px] font-[600]">
          Ulica
        </label>
        <input
          id="street"
          type="text"
          {...register("street")}
          className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2 outline-none"
          placeholder="Wpisz ulicę"
        />
        {errors.street && (
          <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
        )}
      </div>

      {/* Miejscowość */}
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="city" className="block mb-1 text-[18px] font-[600]">
          Miejscowość
        </label>
        <input
          id="city"
          type="text"
          {...register("city")}
          className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2 outline-none"
          placeholder="Wpisz miejscowość"
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>

      {/* Kraj - New field */}
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="country" className="block mb-1 text-[18px] font-[600]">
          Kraj
        </label>
        <input
          id="country"
          type="text"
          {...register("country")}
          className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2 outline-none"
          placeholder="Wpisz kraj"
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* Pola dla firmy (Nazwa firmy i Numer NIP) */}
      {(purchaseType === "company" || needsInvoice) && (
        <>
          <h4 className="mobile-large-bold sm:mobile-h4 lg:desktop-h4 col-span-2 mt-8">
            Adres rozliczeniowy (dla firmy)
          </h4>

          {/* Ulica firmy */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="companyStreet"
              className="block mb-1 text-[18px] font-[600]"
            >
              Ulica
            </label>
            <input
              id="companyStreet"
              type="text"
              {...register("companyStreet")}
              className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2  outline-none"
              placeholder="Wpisz ulicę"
            />
            {errors.companyStreet && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyStreet.message}
              </p>
            )}
          </div>
          {/* Kod pocztowy firmy */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="companyPostalCode"
              className="block mb-1 text-[18px] font-[600]"
            >
              Kod pocztowy
            </label>
            <input
              id="companyPostalCode"
              type="text"
              value={companyZipCode}
              {...register("companyPostalCode")}
              onChange={(e) => handleZipCodeChange(e)}
              className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2  outline-none"
              placeholder="00-000"
            />
            {errors.companyPostalCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyPostalCode.message}
              </p>
            )}
          </div>

          {/* Miejscowość firmy */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="companyCity"
              className="block mb-1 text-[18px] font-[600]"
            >
              Miejscowość
            </label>
            <input
              id="companyCity"
              type="text"
              {...register("companyCity")}
              className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2 outline-none"
              placeholder="Wpisz miejscowość"
            />
            {errors.companyCity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyCity.message}
              </p>
            )}
          </div>

          {/* Kraj firmy */}
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="companyCountry"
              className="block mb-1 text-[18px] font-[600]"
            >
              Kraj
            </label>
            <input
              id="companyCountry"
              type="text"
              {...register("companyCountry")}
              className="w-full border border-[#CACACA] rounded-[10px] px-3 py-2 outline-none"
              placeholder="Wpisz kraj"
            />
            {errors.companyCountry && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyCountry.message}
              </p>
            )}
          </div>
        </>
      )}

      <div className="col-span-2 flex items-start">
        <input
          type="checkbox"
          id="rodo"
          {...register("acceptRodo")}
          className="mr-2 mt-2 cursor-pointer"
        />
        <label htmlFor="rodo" className="cursor-pointer text-[14px]">
          Wyrażam zgodę na przetwarzanie moich danych osobowych w celach
          marketingowych i promocyjnych przez yourvehicle.pl YV Marcin
          Wawrzyniak, NIP 6222858790 z siedzibą w Ostrowie Wielkopolskim.
        </label>
      </div>
      {errors.acceptRodo && (
        <p className="text-red-500 text-sm col-span-1 sm:col-span-2">
          {errors.acceptRodo.message}
        </p>
      )}

      <div className="col-span-2 sm:col-span-2 flex items-start">
        <input
          type="checkbox"
          id="rodo2"
          {...register("acceptRodo2")}
          className="mr-2 mt-2 cursor-pointer"
        />
        <label htmlFor="rodo2" className="cursor-pointer text-[14px]">
          Wyrażam zgodę na przetwarzanie moich danych osobowych przez
          yourvehicle.pl reprezentowany przez: YV Marcin Wawrzyniak, NIP
          6222858790 z siedzibą w Ostrowie Wielkopolskim, w celu i w zakresie
          niezbędnym do realizacji obsługi niniejszego zgłoszenia. Zapoznałem
          się z treścią informacji o sposobie przetwarzania moich danych
          osobowych udostępnionych pod domeną yourvehicle.pl/rodo
        </label>
      </div>
      {errors.acceptRodo2 && (
        <p className="text-red-500 text-sm col-span-1 sm:col-span-2">
          {errors.acceptRodo2.message}
        </p>
      )}

      {/* Przycisk wysłania */}
      <div className="flex justify-center col-span-2 pt-6">
        <button
          type="submit"
          disabled={!isValid || loading}
          className={`aqua-btn ${
            !isValid || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Przetwarzanie..." : "Kupuję i płacę"}
        </button>
      </div>

      {/* Błąd ogólny */}
      {error && (
        <div className="col-span-1 sm:col-span-2 text-red-500 text-center">
          {error}
        </div>
      )}
    </form>
  );
};

export default BillingForm;
