import React from "react";

type Props = {
  inputType: "select" | "number" | "text";
  placeholder: string;
  label: string;
  name: string;
  id: string;
};

const InputGroup = (props: Props) => {
  const { label, inputType, placeholder, name, id } = props;
  if (inputType == "select") {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mobile-normal lg:desktop-normal mb-2">
          {label}
        </label>
        <select
          name={name}
          className="mobile-normal lg:desktop-normal h-12 px-3 rounded-lg bg-transparent text-[#747474] border-[.12em] "
        >
          <option>{placeholder}</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
          <option>option 5</option>
        </select>
      </div>
    );
  }
  if (inputType == "text" || inputType == "number") {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mobile-normal lg:desktop-normal mb-2">
          {label}
        </label>
        <input
          type={inputType}
          placeholder={placeholder}
          name={name}
          className="mobile-normal lg:desktop-normal"
        />
      </div>
    );
  }
};

export default InputGroup;
