"use client";

import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

import { Button, Dialog, DialogTitle, DialogActions, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ThisFCProps {
  id: number;
  className?: string;
  handleNotApprovedEvent: (id: number) => void;
}

const GroupEventNotApprovedBtn: React.FC<ThisFCProps> = ({
  id,
  className = "",
  handleNotApprovedEvent,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleNotApproved = async () => {
    const res = await axios.post("/api/events/update", {
      id,
      field_names: ["isApproved"],
      field_values: [0],
    });
    if (res.status !== 200) {
      console.error("error => ", res.data);
    }
    handleNotApprovedEvent(id);
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{
        width: "100%",
        backgroundColor: "#e73939",
        fontSize: "12px",
        padding: "2px 0 0",
        borderRadius: "1px",
        '&:hover': {
          backgroundColor: "#e73939",
          opacity: 0.9,
        }
      }}>
        <span>承認しない</span>
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
            padding: "30px 40px",
            fontSize: "17px",
            letterSpacing: "1px",
          }}
        >
          承認を取り消します。よろしいですか?
        </DialogTitle>
        <DialogActions sx={{
          padding: "10px",
          margin: "5px 10px 10px 0",
        }}>
          <Button
            onClick={handleNotApproved}
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

export default GroupEventNotApprovedBtn;
