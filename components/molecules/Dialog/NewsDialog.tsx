"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import { Button, Dialog, DialogContent } from "@mui/material";
import { DialogTitle, DialogContentText } from "@mui/material";

interface ThisFCProps {
  date: string;
  title: string;
  content: string;
}

const NewsDialog: React.FC<ThisFCProps> = ({ date, title, content }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen} sx={{
        textDecoration: "underline",
        color: "#2296f3",
        padding: 0,
        fontSize: "15px",
        '&:hover': {
          textDecoration: "underline",
          color: "#2296f3",
          background: "transparent",
        },
      }}>
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: "700px",
            padding: "10px",
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
          <h4 className="border-[#35bda1] border-l-[6px] text-xl pl-3 font-semibold  text-[#555]">
            {title}
          </h4>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{
            fontSize: "14px",
            color: "#2b2e38",
          }}>
            <p className="font-medium leading-[21px] break-words overflow-hidden" dangerouslySetInnerHTML={{ __html: content }}></p>
            <p className="text-right font-semibold mt-8">{date}</p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default NewsDialog;
