"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import './AccountDeleteBtn.css';

interface ThisFCProps {
  id: number;
  className?: string;
  handleRemoveAccount: (id: number) => void;
}

const AccountDeleteBtn: React.FC<ThisFCProps> = ({
  id,
  className = "",
  handleRemoveAccount,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const handleDelete = async () => {
    const res = await axios.post("/api/accounts/delete", { id });
    if (res.status !== 200) {
      console.log("error => ", res.data);
    }
    handleRemoveAccount(id);
  };
  return (
    <>
      <Button variant="contained" className="account_del_btn" onClick={() => setOpen(true)}>
        <DeleteRoundedIcon className="account_icon" />削除
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
          {"本当に削除しますか？"}
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

export default AccountDeleteBtn;
