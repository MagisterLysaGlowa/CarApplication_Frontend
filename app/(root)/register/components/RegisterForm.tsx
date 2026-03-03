"use client";

import { registerUser } from "@/app/actions/registerUser";
import CheckBox from "@/app/components/CheckBox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { registerFormSchema } from "@/app/schema/schema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// Define an interface that matches the schema exactly
interface RegisterFormData {
  username: string;
  phone: string;
  email: string;
  password: string;
  city: string;
  zipCode: string;
  checkbox: boolean;
}

interface ValidationErrors {
  username?: string;
  email?: string;
  phone?: string;
}

// Custom debounce function
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const InputGroup = ({
  inputType,
  label,
  placeholder,
  name,
  register,
  error,
  onBlur,
  onChange,
}: {
  inputType: string;
  label: string;
  error?: string;
  name: keyof z.infer<typeof registerFormSchema>;
  placeholder: string;
  register: any;
  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col">
    <label className="w-full text-[#272727] desktop-large-bold mb-2">
      {label}
    </label>
    <input
      className="w-full h-12 border-[.1em] border-gray-300 rounded-[10px] desktop-normal px-5"
      type={inputType}
      {...register(name, {
        onBlur,
        onChange: onChange,
      })}
      placeholder={placeholder}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

const RegisterForm = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string>("pl");
  const [zipCode, setZipCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      checkbox: false,
    },
  });

  const watchAllFields = watch();

  // Use debounced values
  const debouncedUsername = useDebounce(watchAllFields.username, 500);
  const debouncedEmail = useDebounce(watchAllFields.email, 500);
  const debouncedPhone = useDebounce(watchAllFields.phone, 500);

  // Check username availability
  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (debouncedUsername && debouncedUsername.length >= 3) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/usernameIsFree/${debouncedUsername}`
          );
          const isAvailable = await response.json();

          if (!isAvailable) {
            setValidationErrors((prev) => ({
              ...prev,
              username: "Ta nazwa użytkownika jest już zajęta",
            }));
          } else {
            setValidationErrors((prev) => {
              const { username, ...rest } = prev;
              return rest;
            });
          }
        } catch (error) {
          console.error("Błąd sprawdzania nazwy użytkownika:", error);
        }
      }
    };

    checkUsernameAvailability();
  }, [debouncedUsername]);

  // Check email availability
  useEffect(() => {
    const checkEmailAvailability = async () => {
      if (
        debouncedEmail &&
        debouncedEmail.includes("@") &&
        debouncedEmail.includes(".")
      ) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/emailIsFree/${debouncedEmail}`
          );
          const isAvailable = await response.json();

          if (!isAvailable) {
            setValidationErrors((prev) => ({
              ...prev,
              email: "Ten adres email jest już zajęty",
            }));
          } else {
            setValidationErrors((prev) => {
              const { email, ...rest } = prev;
              return rest;
            });
          }
        } catch (error) {
          console.error("Błąd sprawdzania emaila:", error);
        }
      }
    };

    checkEmailAvailability();
  }, [debouncedEmail]);

  // Check phone availability
  useEffect(() => {
    const checkPhoneAvailability = async () => {
      if (debouncedPhone && debouncedPhone.length >= 9) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/phoneIsFree/${debouncedPhone}`
          );
          const isAvailable = await response.json();

          if (!isAvailable) {
            setValidationErrors((prev) => ({
              ...prev,
              phone: "Ten numer telefonu jest już zajęty",
            }));
          } else {
            setValidationErrors((prev) => {
              const { phone, ...rest } = prev;
              return rest;
            });
          }
        } catch (error) {
          console.error("Błąd sprawdzania numeru telefonu:", error);
        }
      }
    };

    checkPhoneAvailability();
  }, [debouncedPhone]);

  const isFormFilled =
    watchAllFields.username &&
    watchAllFields.phone &&
    watchAllFields.email &&
    watchAllFields.password &&
    watchAllFields.city &&
    watchAllFields.zipCode &&
    watchAllFields.checkbox === true;

  const hasValidationErrors = Object.keys(validationErrors).length > 0;

  const onSubmit = async (data: RegisterFormData) => {
    // Ostateczne sprawdzenie dostępności przed wysłaniem formularza
    try {
      const [usernameResponse, emailResponse, phoneResponse] =
        await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/usernameIsFree/${data.username}`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/emailIsFree/${data.email}`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/phoneIsFree/${data.phone}`
          ),
        ]);

      const [isUsernameAvailable, isEmailAvailable, isPhoneAvailable] =
        await Promise.all([
          usernameResponse.json(),
          emailResponse.json(),
          phoneResponse.json(),
        ]);

      const errors: ValidationErrors = {};

      if (!isUsernameAvailable) {
        errors.username = "Ta nazwa użytkownika jest już zajęta";
      }

      if (!isEmailAvailable) {
        errors.email = "Ten adres email jest już zajęty";
      }

      if (!isPhoneAvailable) {
        errors.phone = "Ten numer telefonu jest już zajęty";
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      const loadingToastId = toast.loading("Rejestracja w toku...", {
        position: "top-right",
        autoClose: false,
      });

      try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          const value = data[key as keyof RegisterFormData];

          if (key === "checkbox") {
            formData.append(key, value === true ? "true" : "false");
          } else {
            formData.append(key, String(value));
          }
        });
        setLoading(true);

        const result = await registerUser(null, formData);

        toast.dismiss(loadingToastId);

        if (result && result.success) {
          toast.success("Rejestracja zakończona sukcesem!", {
            position: "top-right",
            autoClose: 3000,
            onClose: () => {
              setLoading(false);
              router.push("/signIn");
            },
          });
        } else {
          toast.error("Rejestracja nie powiodła się", {
            onClose: () => {
              setLoading(false);
            },
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.dismiss(loadingToastId);

        toast.error("Wystąpił błąd podczas rejestracji", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Błąd rejestracji:", error);
      }
    } catch (error) {
      toast.error("Wystąpił błąd podczas walidacji danych", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Błąd walidacji:", error);
    }
  };

  const handleZipCodeChange = (value: string) => {
    let formattedValue = value.replace(/\D/g, "");
    if (formattedValue.length > 2) {
      formattedValue = `${formattedValue.slice(0, 2)}-${formattedValue.slice(
        2
      )}`;
    }

    setZipCode(formattedValue);
    setValue("zipCode", formattedValue, { shouldValidate: true });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 max-w-[1000px]"
      >
        <InputGroup
          inputType="text"
          label="Nazwa użytkownika"
          placeholder="Wpisz nazwę"
          name="username"
          register={register}
          error={validationErrors.username || errors.username?.message}
        />

        <div className="flex flex-col">
          <label className="w-full text-[#272727] desktop-large-bold mb-2">
            Numer kontaktowy
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country={selectedCountry}
                value={value ? `+${value}` : ""} // Ensure the + is always displayed
                onChange={(phone, data: CountryData) => {
                  // Remove the + when storing the value
                  const formattedPhone = phone.startsWith("+")
                    ? phone.slice(1)
                    : phone;
                  onChange(formattedPhone);
                  if (data && data.countryCode) {
                    setSelectedCountry(data.countryCode);
                  }
                }}
                onBlur={() => {
                  // Trigger validation on blur
                  setValue("phone", value, { shouldValidate: true });
                }}
                preferredCountries={["pl", "de", "us"]}
                placeholder="Podaj numer telefonu"
                inputStyle={{
                  width: "100%",
                  height: "3rem",
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
          {(validationErrors.phone || errors.phone?.message) && (
            <span className="text-red-500 text-sm mt-1">
              {validationErrors.phone || errors.phone?.message}
            </span>
          )}
        </div>

        <InputGroup
          inputType="email"
          label="Adres e-mail"
          placeholder="Wpisz adres e-mail"
          name="email"
          register={register}
          error={validationErrors.email || errors.email?.message}
        />

        <InputGroup
          inputType="password"
          label="Hasło"
          placeholder="Wpisz hasło"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        <div className="flex flex-col">
          <label className="w-full text-[#272727] desktop-large-bold mb-2">
            Miejscowość i kod pocztowy
          </label>
          <div className="register-location-grid">
            <div>
              <input
                className="w-full h-12 border-[.1em] border-gray-300 rounded-[10px] desktop-normal px-5"
                type="text"
                placeholder="Wpisz miejscowość"
                {...register("city")}
              />
              {errors.city?.message && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.city?.message}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                className="w-full h-12 border-[.1em] border-gray-300 rounded-[10px] desktop-normal px-5"
                type="text"
                placeholder="00-000"
                value={zipCode}
                {...register("zipCode")}
                onChange={(e) => handleZipCodeChange(e.target.value)}
              />
              {errors.zipCode?.message && (
                <span className="text-red-500 text-sm mt-1 absolute w-full left-0 top-[50px]">
                  {errors.zipCode?.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <CheckBox
            register={register}
            label={
              <label
                htmlFor="checkbox"
                className="ml-2 mobile-small sm:desktop-small text-[#454545]"
              >
                <span>Akceptuję</span>
                <span className="text-AQUA-400 mx-1">politykę prywatności</span>
                <span>oraz</span>
                <span className="text-AQUA-400 mx-1">regulamin</span>
                <span>serwisu YourVehicle</span>
              </label>
            }
            name="checkbox"
          />
          {errors.checkbox?.message && (
            <span className="text-red-500 text-sm mt-3">
              {errors.checkbox?.message}
            </span>
          )}
        </div>

        <div className="flex justify-between mt-16 sm:mt-4">
          <button
            type="button"
            className="mobile-small sm:mobile-large light-btn"
            onClick={() => router.back()}
          >
            Wróć
          </button>
          <button
            type="submit"
            className={`mobile-small sm:mobile-large aqua-btn ${
              !isValid || hasValidationErrors || loading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!isValid || hasValidationErrors || loading}
          >
            {loading ? "Rejestrowanie..." : "Przejdź dalej"}
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default RegisterForm;
