"use client";

import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";

interface ICheckBoxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  className?: string;
  text: string;
  disabled?: boolean;
}

const CheckBox: React.FC<ICheckBoxProps> = ({ checked, setChecked, className, text, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={className}>
      <Checkbox
        id={text}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        sx={{
          padding: "0",
        }}
        inputProps={{ "aria-label": "controlled" }}
      />
      <InputLabel htmlFor={text}>
        <span className="text-sm ml-1">{text}</span>
      </InputLabel>
    </div>
  );
};

export default CheckBox;
