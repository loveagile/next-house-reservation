"use client";

import axios from "axios";
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface INotVisitedBtnProps {
  id: number;
  setCurrentStatus: (status: string) => void;
}

const NotVisitedBtn: React.FC<INotVisitedBtnProps> = ({ id, setCurrentStatus }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleNotVisited = async () => {
    await axios.post("/api/reservations/update", {
      id,
      field_name: 'status',
      field_value: 'not_visited',
    })
    setOpen(false);
    setCurrentStatus('not_visited');
  };
  return (
    <>
      <Button className="not_visited_btn" variant="contained" onClick={() => setOpen(true)}>
        来場せず
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="text-lg YuGothic font-semibold text-center p-[20px]"
        >
          来場の確認ができなかった場合は、<br></br>
          「OK」ボタンを押して下さい。
        </DialogTitle>
        <DialogActions>
          <Button
            autoFocus
            className="font-semibold"
            onClick={handleNotVisited}
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

export default NotVisitedBtn;
