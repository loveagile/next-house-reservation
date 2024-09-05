import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Dialog from "@mui/material/Dialog";

import TimeSetDialog from "../TimeSetDialog/TimeSetDialog";

import { includeEventDate, getTimeStr, getDateStr } from "@/utils/convert";
import { EventDateAtom, SelectYearMonthAtom } from "@/lib/recoil/EventDateAtom";

import "./TableCellItem.css";

const TableCellItem: React.FC<{ day: number }> = ({ day }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [eventDates, setEventDates] = useRecoilState(EventDateAtom);
  const selectYearMonth = useRecoilValue(SelectYearMonthAtom);

  const { status, time, index } = includeEventDate(
    eventDates,
    selectYearMonth.year,
    selectYearMonth.month,
    day
  );

  const date = getDateStr(selectYearMonth.year, selectYearMonth.month, day);

  const handleDelete = () => {
    setEventDates([
      ...eventDates.slice(0, index),
      ...eventDates.slice(index + 1),
    ]);
  };

  return (
    <>
      <p className="font-semibold">{day}</p>
      {status === true ? (
        <div className="flex">
          <Button
            className="reservation_btn"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            {getTimeStr(time[0])}-<br></br>
            {getTimeStr(time[time.length - 1])}
          </Button>
          <Button
            className="del_btn"
            variant="contained"
            onClick={handleDelete}
          >
            <CloseRoundedIcon />
          </Button>
        </div>
      ) : (
        <Button
          className="add_btn"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          <AddRoundedIcon />
        </Button>
      )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <Button
          className="absolute right-1 top-1 min-w-0 text-[#95979c]"
          autoFocus
          onClick={() => setOpen(false)}
        >
          <CloseRoundedIcon />
        </Button>
        <DialogTitle className="dialog_title" id="responsive-dialog-title">
          予約設定をしてください
        </DialogTitle>
        <DialogContent className="p-0 font-semibold mt-5">
          <TimeSetDialog time={time} date={date} setOpen={setOpen} index={index} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableCellItem;
