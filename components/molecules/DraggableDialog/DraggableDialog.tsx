"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./DraggableDialog.css";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

interface IDialogProps {
  date: string;
  title: string;
  content: string;
}

export default function DraggableDialog({
  date,
  title,
  content,
}: IDialogProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <Button
          className="absolute right-1 top-1 min-w-0 text-[#95979c]"
          autoFocus
          onClick={handleClose}
        >
          <CloseRoundedIcon />
        </Button>
        <DialogTitle
          className="border-[#35bda1] border-l-[6px] p-0 my-4 pl-2"
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
