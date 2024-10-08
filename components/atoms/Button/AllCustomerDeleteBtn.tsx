"use client";

import { useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

import { Button, Dialog, DialogActions, DialogTitle, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ICustomer } from "@/utils/types";

interface ThisFCProps {
  setCustomerItems: (customerItems: ICustomer[]) => void;
}

const AllCustomerDeleteBtn: React.FC<ThisFCProps> = ({ setCustomerItems }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDelete = async () => {
    const res = await axios.post("/api/customers/deleteAll");
    if (res.status === 200) setCustomerItems([]);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained" onClick={() => setOpen(true)} sx={{
          padding: "2px 8px",
          backgroundColor: "#e73939",
          borderRadius: "2px",
          '&:hover': {
            backgroundColor: "#e73939",
            opacity: 0.9,
          }
        }}
      >
        <MdDelete className="text-lg" />
        <span className="ml-[2px] pt-[2px] text-[13px]">お客様情報を全削除</span>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: "500px",
          }
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "700",
            textAlign: "center",
            paddingTop: "30px",
            fontSize: "18px",
            letterSpacing: "1px",
          }}
        >
          お客様情報をまとめて削除します。<br></br>
          よろしいですか？（予約情報は消えません。）
        </DialogTitle>
        <DialogActions sx={{
          padding: "10px",
          margin: "5px 10px 10px 0",
        }}>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              borderRadius: "1px",
              padding: "5px 20px",
            }}
          >
            はい
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            sx={{
              backgroundColor: "#bcbcbc",
              padding: "5px 20px",
              borderRadius: "1px",
              '&:hover': {
                backgroundColor: "#bcbcbc",
              }
            }}
          >
            いいえ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllCustomerDeleteBtn;
