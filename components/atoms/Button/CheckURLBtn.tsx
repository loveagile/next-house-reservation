"use client";

import { useState } from "react";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { DialogContentText, useMediaQuery, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
        <HiMiniComputerDesktop className="text-xl" />
        <span className="ml-1">URLを確認する</span>
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
          <IoClose className="text-xl" />
        </Button>
        <DialogTitle>
          <h4 className="border-[#35bda1] border-l-[6px] text-xl pl-3 font-bold  text-[#555]">
            URLを確認する
          </h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p className="text-[#b3b3b3] text-[15px]">下記がこのイベント公開後のURLとなります。コピーしてご活用ください。</p>
            <div className="flex flex-col my-3">
              <p className="text-[15px] font-bold text-[#2b2e38]">イベント告知ページ</p>
              <div className="flex w-full border-[1px] bg-[#e6e6e6] mt-1 rounded-sm py-[2px]">
                <span className="border-r-[1px] border-[#ccc] px-3 py-1 text-sm">URL</span>
                <TextField
                  value={`${SITE_URL}/smilebuilders/${type}/${id}`}
                  sx={{
                    width: "100%",
                    '& .MuiInputBase-input': {
                      padding: "4px 10px",
                      fontSize: "14px",
                      color: "black",
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
                <p className=" text-[15px] font-bold text-[#2b2e38]">イベント予約ページ</p>
                <div className="flex w-full border-[1px] bg-[#e6e6e6] mt-1 rounded-sm py-[2px]">
                  <span className="border-r-[1px] border-[#ccc] px-3 py-1 text-sm">URL</span>
                  <TextField
                    value={`${SITE_URL}/smilebuilders/${type}/${id}/calendar`}
                    sx={{
                      width: "100%",
                      '& .MuiInputBase-input': {
                        padding: "4px 10px",
                        fontSize: "14px",
                        color: "black",
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

