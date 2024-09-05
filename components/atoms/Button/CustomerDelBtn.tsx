"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";


interface ThisFCProps {
  id: number;
  setDeleteItemId: (id: number) => void;
}

const CustomerDelBtn: React.FC<ThisFCProps> = ({ id, setDeleteItemId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDelete = async () => {
    await axios.post("/api/customers/delete", { id });
    setOpen(false);
    setDeleteItemId(id);
  };
  return (
    <>
      <Button
        className="w-full flex items-center bg-m-red hover:bg-m-red hover:opacity-80 pt-[2px] pb-1 text-xs rounded-sm"
        variant="contained" onClick={() => setOpen(true)}>
        <DeleteRoundedIcon className="mr-1" />削除
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="cancel_dialog_title"
      >
        <DialogTitle
          id="customer_dialog_title"
          className="text-lg YuGothic text-center font-semibold"
        >
          削除してもいいですか？
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

export default CustomerDelBtn;
