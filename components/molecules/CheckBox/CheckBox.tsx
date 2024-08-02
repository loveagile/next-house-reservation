"use client";

import Checkbox from "@mui/material/Checkbox";
import "./CheckBox.css";
import { useEffect, useState } from "react";

interface ICheckBoxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

const CheckBox: React.FC<ICheckBoxProps> = ({ checked, setChecked }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="flex flex-col justify-center ml-auto">
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <span className="text-sm">上位表示する</span>
    </div>
  );
};

export default CheckBox;
