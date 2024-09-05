"use client";

import TextField from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";

interface ThisFCProps {
  id: string;
  value?: string;
  placeholder?: string;
  isPassword?: boolean;
  className?: string;
  disabled?: boolean;
  control: Control<any>;
}

const InputField: React.FC<ThisFCProps> = ({
  id,
  placeholder,
  isPassword = false,
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
          sx={{
            maxWidth: '500px',
            color: "black",
            '& .MuiInputBase-input': {
              padding: '3px 12px',
              fontSize: "15px",
            },
            '& .Mui-disabled': {
              background: '#e6e6e6',
            }
          }}
          className={className}
          placeholder={placeholder}
          type={isPassword === false ? "text" : "password"}
        />
      )}
    />
  );
};

export default InputField;
