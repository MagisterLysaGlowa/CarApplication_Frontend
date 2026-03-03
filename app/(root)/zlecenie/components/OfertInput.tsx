import React from "react";
import { UseFormRegister, UseFormTrigger } from "react-hook-form";
import { ActiveFormFields } from "./OfertForm";

type Props = {
  inputType: string;
  label: string;
  placeholder: string;
  placeholder2?: string;
  name: keyof ActiveFormFields;
  name2?: keyof ActiveFormFields;
  id: string;
  id2?: string;
  fields: "single" | "double";
  error?: string; // Optional error prop
  error2?: string;
  register: any;
  trigger: any;
  // Nowa opcjonalna funkcja do niestandardowej obsługi zmian
  onCustomChange?: (
    fieldName: keyof ActiveFormFields,
    value: string,
    otherFieldName: keyof ActiveFormFields
  ) => void;
};

const OfertInput = (props: Props) => {
  const {
    inputType,
    label,
    placeholder,
    name,
    fields,
    id,
    error,
    register,
    onCustomChange,
    trigger,
  } = props;

  if (fields == "single") {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mobile-large-bold lg:desktop-large-bold text-[#272727]"
        >
          {label}
        </label>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          {...register(name, {
            setValueAs: (value: string) =>
              inputType === "number" ? parseFloat(value) : value, // Convert to number if input type is 'number'
          })}
          className="mt-1 h-12 mobile-normal lg:desktop-normal bg-transparent border-[.12em] border-WHITE-500 px-5 text-[#747474] rounded-[10px] focus:border-blue-500"
        />

        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  } else if (fields == "double") {
    const { placeholder2, name2, id2, error2 } = props;
    if (placeholder2 && name2 && id2) {
      return (
        <div className="flex flex-col">
          <label
            htmlFor={id}
            className="mobile-large-bold lg:desktop-large-bold text-[#272727]"
          >
            {label}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <input
                id={id}
                type={inputType}
                placeholder={placeholder}
                {...register(name, {
                  setValueAs: (value: string) =>
                    inputType === "number" ? parseFloat(value) : value,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    // Jeśli jest dostępna niestandardowa funkcja obsługi, użyj jej
                    if (onCustomChange && name2) {
                      onCustomChange(name, e.target.value, name2);
                    }
                  },
                  onBlur: () => {
                    // Wywołaj walidację gdy pole traci fokus
                    if (name.includes("From") || name.includes("To")) {
                      const counterpartName = name.includes("From")
                        ? name.replace("From", "To")
                        : name.replace("To", "From");
                      trigger([name, counterpartName as any]);
                    }
                  },
                })}
                className="mt-1 h-12 mobile-normal lg:desktop-normal bg-transparent border-[.12em] border-WHITE-500 px-5 text-[#747474] rounded-[10px] focus:border-blue-500"
              />
              {error && (
                <span className="text-red-500 text-sm mt-1">
                  {error == "Expected number, received nan"
                    ? "To pole nie może byc puste"
                    : error}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                id={id2}
                type={inputType}
                placeholder={placeholder2}
                {...register(name2, {
                  setValueAs: (value: string) => {
                    if (inputType === "number")
                      return value === "" ? undefined : parseFloat(value);
                    return value;
                  },
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    // Jeśli jest dostępna niestandardowa funkcja obsługi, użyj jej
                    if (onCustomChange) {
                      onCustomChange(name2, e.target.value, name);
                    }
                  },
                  onBlur: () => {
                    if (name.includes("From") || name.includes("To")) {
                      const counterpartName = name.toString().includes("From")
                        ? (name
                            .toString()
                            .replace("From", "To") as keyof ActiveFormFields)
                        : (name
                            .toString()
                            .replace("To", "From") as keyof ActiveFormFields);
                      trigger([name, counterpartName]);
                    }
                  },
                })}
                className="mt-1 h-12 mobile-normal lg:desktop-normal bg-transparent border-[.12em] border-WHITE-500 px-5 text-[#747474] rounded-[10px] focus:border-blue-500"
              />
              {error2 && (
                <span className="text-red-500 text-sm mt-1">
                  {" "}
                  {error == "Expected number, received nan"
                    ? "To pole nie może byc puste"
                    : error}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
};

export default OfertInput;
