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
      field_names: ['status'],
      field_values: ['canceled'],
    })
    setOpen(false);
    setCurrentStatus('canceled');
  };
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{
        width: "100%",
        display: "block",
        backgroundColor: "#fff",
        color: "black",
        textAlign: "center",
        marginTop: "8px",
        fontSize: "12px",
        padding: "3px 5px 1px",
        borderRadius: "1px",
        border: "1px solid #ddd",
        '&:hover': {
          backgroundColor: "#fff",
          opacity: "0.9",
        }
      }}>
        取り消し
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
            color: "#555",
            fontSize: "18px",
            letterSpacing: "1px",
          }}
        >
          予約を取り消しますか？<br></br>
          取り消した場合、ユーザーにも通知されます。
        </DialogTitle>
        <DialogActions sx={{
          padding: "10px",
          margin: "5px 10px 10px 0",
        }}>
          <Button
            onClick={handleUpdate}
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

export default CancelBtn;
