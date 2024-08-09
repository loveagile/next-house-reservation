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
import { useRouter } from "next/navigation";
import axios from "axios";

interface IDeleteBtnProps {
  linkUrl: string;
  id: number;
  className?: string;
  type: string;
}

const DeleteBtn: React.FC<IDeleteBtnProps> = ({
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
    } else {
      const res = await axios.post("/api/events/delete", { id });
    }
    router.push(linkUrl);
  };
  return (
    <>
      <Button
        className={`px-[5px] py-[2px] text-[11px] bg-m-red hover:bg-m-red hover:opacity-80 ${className}`}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        <DeleteRoundedIcon className="mr-1" />
        このまとめページを削除する
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          className="font-bold"
          id="responsive-dialog-title"
        >
          {"本当に削除しますか？"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button
            autoFocus
            className="font-semibold"
            onClick={handleDelete}
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

export default DeleteBtn;
