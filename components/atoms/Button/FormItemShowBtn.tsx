"use client";

import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

import { Button, Dialog, DialogTitle, DialogActions, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ThisFCProps {
  id: number;
  isHidden: number;
}

const FormItemShowBtn: React.FC<ThisFCProps> = ({ id, isHidden }) => {
  const [show, setShow] = useState<number>(isHidden);

  const changeShowStatus = async () => {
    setShow(() => 1 - show);
    const res = await axios.post("/api/forms/update", {
      id,
      field_names: ["isHidden"],
      field_values: [1 - show],
    });
    if (res.status !== 200) {
      console.error("Error in FormItemShowBtn: ");
    }
  }

  return (
    <Button
      onClick={changeShowStatus}
      variant="contained" sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: show ? "#2296f3" : "#ea9b54",
        padding: "6px",
        fontSize: "12px",
        borderRadius: "1px",
        transition: "all 0.3s ease-out",
        '&:hover': {
          backgroundColor: show ? "#2296f3" : "#ea9b54",
          opacity: 0.9,
        }
      }}>
      <span className="text-sm">
        {show ? "表示にする" : "非表示にする"}
      </span>
    </Button>
  );
};

export default FormItemShowBtn;
