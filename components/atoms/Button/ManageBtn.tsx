"use client";

import axios from "axios";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import { IoWarning } from "react-icons/io5";

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ThisFCProps {
  name: string;
  className?: string;
}

const ManageBtn: React.FC<ThisFCProps> = ({
  name,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{
        display: "flex",
        fontSize: "12px",
        padding: "1px 5px 0",
        marginTop: "2px",
        borderRadius: "1px",
        '&:hover': {
          opacity: 0.9,
        }
      }}>
        <span className="ml-1">管理ページへ</span>
        <PiSignInBold className="text-[17px]" />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: "650px",
            padding: "30px",
          }
        }}
      >
        <Button
          className="absolute right-1 top-1 min-w-0 text-[#95979c]"
          onClick={() => setOpen(false)}
        >
          <CgClose className="text-lg" />
        </Button>
        <DialogTitle sx={{
          fontWeight: 700,
          borderLeft: "5px #35bda1 solid",
          padding: "0 0 0 4px",
          fontSize: "19px",
          margin: "15px 0",
        }}>
          「{name}」の管理ページを開きます
        </DialogTitle>
        <DialogContent sx={{
          padding: "0",
          lineHeight: "1.4",
        }}>
          <p className="inline-block">
            <IoWarning className="text-xl inline" />
            <span className="ml-2 text-sm">直接「{name}」のデータを閲覧、操作が可能になりますので、誤ってデータを削除等しないようにご注意ください。</span>
          </p>
          <p className="inline-block mt-2">
            <IoWarning className="text-xl inline" />
            <span className="ml-2 text-sm">「{name}」の管理ページで「ログアウト」すると、管理者としてもログアウトするので、続けて管理者として操作する場合は、「親アカウントに戻る」を選択してください。</span>
          </p>
        </DialogContent>
        <DialogActions sx={{
          margin: "20px 0 5px",
          padding: "0",
        }}>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            sx={{
              width: "100%",
              borderRadius: "1px",
            }}
          >
            <span className="mr-2 text-lg">管理ページを開く</span>
            <PiSignInBold className="text-2xl" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageBtn;
