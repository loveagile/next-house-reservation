"use client";

import TextField from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";
import "./InputField.css";
import { useEffect, useState } from "react";

interface IInputField {
  id: string;
  value?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  control: Control<any>;
}

const InputField: React.FC<IInputField> = ({
  id,
  placeholder,
  value = "",
  className,
  disabled,
  control,
}) => {
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={value}
      render={({ field }) => (
        <TextField
          {...field}
          id={id}
          disabled={disabled}
          className={`w-full max-w-[500px] ${className} ${
            disabled ? "bg-[#e6e6e6]" : ""
          }`}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default InputField;
