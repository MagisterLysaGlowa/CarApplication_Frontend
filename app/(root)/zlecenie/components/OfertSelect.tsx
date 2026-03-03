import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import { ActiveFormFields } from "./OfertForm";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGenerationOptions,
  fetchModelOptions,
  fetchOptions,
} from "@/app/actions/fetchOfferFormOptions";

type Props = {
  label: string;
  placeholder: string;
  name: keyof ActiveFormFields;
  id: string;
  error?: string;
  mark?: string;
  model?: string;
  setValue: any;
  register: any;
  active?: boolean;
};

const OfertSelect = (props: Props) => {
  const {
    label,
    name,
    placeholder,
    id,
    register,
    error,
    model,
    mark,
    setValue,
    active,
  } = props;

  const [selectData, setSelectData] = useState<Option[]>([]);
  const [generationData, setGenerationData] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (name == "mark") {
      const setBrandData = async () => {
        setIsLoading(true);
        try {
          const brands: any[] = await fetchMark();
          const data: Option[] = brands.map((item) => {
            return { value: item.name, option: item.name };
          });
          setSelectData(data);
        } finally {
          setIsLoading(false);
        }
      };
      setBrandData();
    }

    const fetchSelectOptions = async () => {
      setIsLoading(true);
      try {
        const data = await fetchOptions(name);
        setSelectData(data);
      } finally {
        setIsLoading(false);
      }
    };

    if (name != "mark" && name != "model" && name != "generation") {
      fetchSelectOptions();
    }
  }, [name]);

  useEffect(() => {
    const setModels = async () => {
      setIsLoading(true);
      try {
        const brands: any[] = await fetchMark();
        const selectedMark: any = brands.find((b) => b.name == mark);
        if (selectedMark && selectedMark.models.length > 0) {
          const models = selectedMark.models;
          const data: Option[] = models.map((item: any) => {
            return { value: item.name, option: item.name };
          });
          setSelectData(data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (name == "model") {
      setModels();
    }
  }, [mark]);

  useEffect(() => {
    const setGenerations = async () => {
      if (name == "generation") {
        setIsLoading(true);
        try {
          const brands: any[] = await fetchMark();
          const selectedMark: any = brands.find((b) => b.name == mark);
          if (selectedMark && selectedMark.models.length > 0) {
            const models = selectedMark.models;
            const selectedModel: any = models.find((m: any) => m.name == model);
            if (selectedModel && selectedModel.generations.length > 0) {
              const generations = selectedModel.generations;
              const data: Option[] = generations.map((item: any) => {
                return { value: item.name, option: item.name };
              });
              setGenerationData(data);
            } else {
              setGenerationData([]);
            }
          } else {
            setGenerationData([]);
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    setGenerations();
  }, [model]);

  const fetchMark = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Brand`);
    const data = await res.json();
    return data;
  };

  // Determine if select should be disabled
  const isSelectDisabled = () => {
    if (isLoading) return true;

    if (name == "model") {
      return mark == null || mark == "0";
    }
    if (name == "generation") {
      return model == null || model == "0";
    }

    return false;
  };

  return (
    <div className={`flex flex-col `}>
      <label
        htmlFor={id}
        className="mobile-large-bold lg:desktop-large-bold text-[#272727]"
      >
        {label}
      </label>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-WHITE-200 bg-opacity-50 rounded-[10px] z-10">
            <div className="w-5 h-5 border-2 border-AQUA-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <select
          id={id}
          {...register(name)}
          className="disabled:!bg-WHITE-300 disabled:!text-BLACK-100 mt-1 h-12 mobile-normal lg:desktop-normal bg-transparent border-[.12em] border-WHITE-500 px-5 text-[#747474] rounded-[10px] w-full"
          disabled={isSelectDisabled()}
        >
          <option value="0">{placeholder}</option>
          {name !== "generation" &&
            selectData.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.value}
                  className="bg-WHITE-100 text-BLACK-600 mobile-normal lg:desktop-normal"
                >
                  {item.option}
                </option>
              );
            })}
          {name == "generation" &&
            generationData.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.option}
                </option>
              );
            })}
        </select>
      </div>
      {mark == null ||
        (mark !== "0" && error && (
          <span className="text-red-500 text-sm mt-1">{error}</span>
        ))}
    </div>
  );
};

export default OfertSelect;
