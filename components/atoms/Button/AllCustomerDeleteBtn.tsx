"use client";

import Button from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ICustomer } from "@/utils/types";
import axios from "axios";

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
        className="px-3 py-1 text-xs bg-m-red hover:bg-m-red hover:opacity-80 rounded-sm"
        variant="contained"
        onClick={() => setOpen(true)}
      >
        <DeleteRoundedIcon className="mr-1" />
        お客様情報を全削除
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="text-lg YuGothic text-center font-semibold"
        >
          お客様情報をまとめて削除します。<br></br>
          よろしいですか？（予約情報は消えません。）
        </DialogTitle>
        <DialogActions>
          <Button
            autoFocus
            className="YuGothic font-semibold text-base"
            onClick={handleDelete}
          >
            はい
          </Button>
          <Button
            autoFocus
            className="YuGothic font-semibold text-base"
            onClick={() => setOpen(false)}
          >
            いいえ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllCustomerDeleteBtn;
