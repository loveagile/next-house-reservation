"use client";

import axios from "axios";
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ICancelBtnProps {
  id: number;
  setCurrentStatus: (status: string) => void;
}

const CancelBtn: React.FC<ICancelBtnProps> = ({ id, setCurrentStatus }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleUpdate = async () => {
    await axios.post("/api/reservations/update", {
      id,
      field_name: 'status',
      field_value: 'canceled',
    })
    setOpen(false);
    setCurrentStatus('canceled');
  };
  return (
    <>
      <Button className="cancel_btn" variant="contained" onClick={() => setOpen(true)}>
        取り消し
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="cancel_dialog_title"
      >
        <DialogTitle
          id="cancel_dialog_title"
          className="text-lg YuGothic font-semibold text-center"
        >
          予約を取り消しますか？<br></br>
          取り消した場合、ユーザーにも通知されます。
        </DialogTitle>
        <DialogActions>
          <Button
            autoFocus
            className="font-semibold"
            onClick={handleUpdate}
          >
            はい
          </Button>
          <Button
            autoFocus
            className="font-semibold"
            onClick={() => setOpen(false)}
          >
            いいえ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CancelBtn;
