"use client";
import React, { JSX } from "react";
import "../css/checkbox.css";
import { UseFormRegister } from "react-hook-form";

type RegisterFormData = {
  username: string;
  phone: string;
  email: string;
  password: string;
  city: string;
  zipCode: string;
  checkbox: boolean;
};

type Props = {
  label: string | JSX.Element;
  name: keyof RegisterFormData;
  register: UseFormRegister<RegisterFormData> | null;
};

const CheckBox = (props: Props) => {
  const { label, name, register } = props;

  if (register) {
    return (
      <label className="container flex items-center">
        <input type="checkbox" id={name} {...register(name)} />
        <span className="absolute top-[-10px] left-[20px]">{label}</span>
        <span className="checkmark"></span>
      </label>
    );
  }

  return null;
};

export default CheckBox;
