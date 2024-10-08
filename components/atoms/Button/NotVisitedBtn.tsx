"use client";

import axios from "axios";
import { useState } from "react";

import { Button, Dialog, DialogTitle, DialogActions, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ThisFCProps {
  id: number;
  setCurrentStatus: (status: string) => void;
}

const NotVisitedBtn: React.FC<ThisFCProps> = ({ id, setCurrentStatus }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleNotVisited = async () => {
    await axios.post("/api/reservations/update", {
      id,
      field_names: ['status'],
      field_values: ['not_visited'],
    })
    setOpen(false);
    setCurrentStatus('not_visited');
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
        来場せず
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
            color: "#555",
            paddingTop: "30px",
            fontSize: "18px",
            letterSpacing: "1px",
          }}
        >
          来場の確認ができなかった場合は、<br></br>
          「OK」ボタンを押して下さい。
        </DialogTitle>
        <DialogActions sx={{
          padding: "10px",
          margin: "5px 10px 10px 0",
        }}>
          <Button
            onClick={handleNotVisited}
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

export default NotVisitedBtn;
