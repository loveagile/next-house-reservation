"use client";

import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

import { Button, Dialog, DialogTitle, DialogActions, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ThisFCProps {
  groupID: number;
  userID: number;
  className?: string;
  handleRemoveGroup: (id: number) => void;
}

const GroupDeleteBtn: React.FC<ThisFCProps> = ({
  groupID,
  userID,
  className = "",
  handleRemoveGroup,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDelete = async () => {
    const res = await axios.post("/api/groups/delete", {
      groupID,
      userID
    });
    if (res.status !== 200) {
      console.log("error => ", res.data);
    }
    handleRemoveGroup(userID);
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
        <MdDelete className="text-[17px]" />
        <span className="ml-1">削除</span>
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
          再度参加してもらうにはもう一度招待を承認してもらう必要があります。
          削除してもいいですか?
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

export default GroupDeleteBtn;
