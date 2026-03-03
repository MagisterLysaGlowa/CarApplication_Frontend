import React, { useEffect, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ActiveFormFields } from "./OfertForm";
import { useRouter } from "next/navigation";

interface Option {
  value: string;
  option: string;
}

interface Brand {
  name: string;
  models: Model[];
}

interface Model {
  name: string;
  generations: Generation[];
}

interface Generation {
  name: string;
}

interface Props {
  label: string;
  placeholder: string;
  name: keyof ActiveFormFields;
  id: string;
  error?: string;
  mark?: string;
  model?: string;
  generation?: string;
  offerType: string;
  setValue: UseFormSetValue<ActiveFormFields>;
  register: UseFormRegister<ActiveFormFields>;
}

const OfertSelect = ({
  label,
  name,
  placeholder,
  id,
  register,
  error,
  model,
  mark,
  generation,
  offerType,
  setValue,
}: Props) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const router = useRouter();

  // Fetch brands when component loads
  useEffect(() => {
    const fetchBrands = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Brand`);
      const data: Brand[] = await res.json();
      setBrands(data);

      // If brand is set and model is not, set model to first model of selected brand
      if (mark && !model) {
        const selectedBrand = data.find((b) => b.name === mark);
        if (selectedBrand) {
          setModels(selectedBrand.models);
          setValue("model", selectedBrand.models[0]?.name || "");
        }
      }
    };
    fetchBrands();
  }, [mark, model, setValue]);

  // Fetch models whenever brand changes
  useEffect(() => {
    if (mark && brands.length > 0) {
      const selectedBrand = brands.find((b) => b.name === mark);
      if (selectedBrand) {
        setModels(selectedBrand.models);
        if (!model && selectedBrand.models.length > 0) {
          setValue("model", selectedBrand.models[0]?.name || "");
        }
      }
    }
  }, [mark, brands, model, setValue]);

  // Fetch generations when model changes
  useEffect(() => {
    if (model && models.length > 0) {
      const selectedModel = models.find((m) => m.name === model);
      if (selectedModel) {
        setGenerations(selectedModel.generations);
        if (!generation && selectedModel.generations.length > 0) {
          setValue("generation", selectedModel.generations[0]?.name || "");
        }
      }
    }
  }, [model, models, generation, setValue]);

  // Set options based on the field (mark, model, generation)
  useEffect(() => {
    if (name === "mark") {
      setOptions(brands.map((b) => ({ value: b.name, option: b.name })));
    } else if (name === "model") {
      setOptions(models.map((m) => ({ value: m.name, option: m.name })));
    } else if (name === "generation") {
      setOptions(generations.map((g) => ({ value: g.name, option: g.name })));
    } else if (name === "offerType") {
      // Define your offer types here
      setOptions([
        { value: "leasing", option: "cesja leasingu" },
        { value: "invoice", option: "zakup na fakturę" },
        { value: "private", option: "zakup prywatny" },
      ]);
    }
  }, [brands, models, generations, offerType, name]);

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mobile-large-bold lg:desktop-large-bold text-[#272727]"
      >
        {label}
      </label>
      <select
        id={id}
        {...register(name)}
        onChange={(e) =>
          setValue(name, e.target.value, { shouldValidate: true })
        }
        className="flex items-center mt-1 h-12 mobile-normal text-left lg:desktop-normal bg-transparent border-[.12em] border-WHITE-500 px-5 text-[#747474] rounded-[10px]"
        disabled={
          (name === "model" && !mark) || (name === "generation" && !model)
        }
        value={
          name === "mark"
            ? mark
            : name === "model"
            ? model
            : name === "generation"
            ? generation
            : name === "offerType"
            ? offerType
            : ""
        }
      >
        <option value="">{placeholder}</option>
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default OfertSelect;
