"use client";

import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LaptopIcon from "@mui/icons-material/Laptop";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;


interface ThisFCProps {
  id: number;
  type: string;
}

const CheckURLBtn: React.FC<ThisFCProps> = ({ id, type }) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{
        backgroundColor: "#bcbcbc",
        border: "1px solid #bcbcbc",
        borderRadius: "1px",
        '&:hover': {
          backgroundColor: "#bcbcbc",
        }
      }}>
        <LaptopIcon className="mr-1" />
        URLを確認する
      </Button >
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: "750px",
          }
        }}
      >
        <Button
          className="absolute right-1 top-1 min-w-0 text-[#95979c]"
          autoFocus
          onClick={() => setOpen(false)}
        >
          <CloseRoundedIcon />
        </Button>
        <DialogTitle>
          <h4 className="border-[#35bda1] border-l-[6px] text-xl pl-2 font-bold  text-[#555]">
            URLを確認する
          </h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p className="text-[#b3b3b3] text-[15px]">下記がこのイベント公開後のURLとなります。コピーしてご活用ください。</p>
            <div className="flex flex-col mt-3">
              <p className="text-[15px] font-bold text-black">イベント告知ページ</p>
              <div className="flex w-full border-[1px] bg-[#e6e6e6] mt-1 rounded-sm py-[2px]">
                <span className="border-r-[1px] border-[#ccc] px-3">URL</span>
                <TextField
                  value={`${SITE_URL}/smilebuilders/${type}/${id}`}
                  sx={{
                    width: "100%",
                    '& .MuiInputBase-input': {
                      padding: "0 10px",
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                />
              </div>
            </div>
            {type === "events" && (
              <div className="flex flex-col my-3">
                <p className=" text-[15px] font-bold text-black">イベント予約ページ</p>
                <div className="flex w-full border-[1px] bg-[#e6e6e6] mt-1 rounded-sm py-[2px]">
                  <span className="border-r-[1px] border-[#ccc] px-3 ">URL</span>
                  <TextField
                    value={`${SITE_URL}/smilebuilders/${type}/${id}/calendar`}
                    sx={{
                      width: "100%",
                      '& .MuiInputBase-input': {
                        padding: "0 10px",
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckURLBtn;
