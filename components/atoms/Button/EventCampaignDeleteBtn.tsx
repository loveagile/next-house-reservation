"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { MdDelete } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ThisFCProps {
  linkUrl: string;
  id: number;
  className?: string;
  type: string;
}

const EventCampaignDeleteBtn: React.FC<ThisFCProps> = ({
  linkUrl,
  id,
  className = "",
  type,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const handleDelete = async () => {
    if (type === "campaigns") {
      const res = await axios.post("/api/campaigns/delete", { id });
      if (res.status !== 200) {
        console.log("error => ", res.data);
      }
    } else {
      const res = await axios.post("/api/events/delete", { id });
      if (res.status !== 200) {
        console.log("error => ", res.data);
      }
    }
    router.push(linkUrl);
  };
  return (
    <>
      <Button
        className={className}
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          padding: "1px 8px",
          backgroundColor: "#e73939",
          borderRadius: "2px",
          '&:hover': {
            backgroundColor: "#e73939",
            opacity: 0.9,
          }
        }}
      >
        <MdDelete className="text-lg" />
        <span className="ml-[2px]">このまとめページを削除する</span>
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
          本当に削除しますか?
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

export default EventCampaignDeleteBtn;
