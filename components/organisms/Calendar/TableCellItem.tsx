import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { FaPlus } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

import { Button, Dialog, DialogTitle, DialogContent, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TimeSetDialog from "../../molecules/Dialog/TimeSetDialog";

import { includeEventDate, getTimeStr, getDateStr } from "@/utils/convert";
import { EventDateTimeAtom, YearMonthAtom } from "@/lib/recoil/EventDateTimeAtom";

const TableCellItem: React.FC<{ day: number }> = ({ day }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [eventDates, setEventDates] = useRecoilState(EventDateTimeAtom);
  const selectYearMonth = useRecoilValue(YearMonthAtom);

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
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              padding: "2px 8px",
              borderRadius: "2px",
              marginTop: "10px",
              minWidth: "auto",
              backgroundColor: "#29ac6d",
              lineHeight: 1,
              fontSize: "14px",
              '&:hover': {
                backgroundColor: "#29ac6d",
                opacity: 0.9,
              }
            }}
          >
            <span className="text-xs leading-[14px]">
              {getTimeStr(time[0])}-<br></br>{getTimeStr(time[time.length - 1])}
            </span>
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            sx={{
              padding: "2px 8px",
              borderRadius: "2px",
              marginTop: "10px",
              minWidth: "auto",
              backgroundColor: "#e73939",
              lineHeight: 1,
              fontSize: "14px",
              alignSelf: "flex-end",
              '&:hover': {
                backgroundColor: "#e73939",
                opacity: 0.9,
              }
            }}
          >
            <CgClose />
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            padding: "2px 8px",
            borderRadius: "2px",
            marginTop: "10px",
            minWidth: "auto",
          }}
        >
          <FaPlus />
        </Button>
      )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: "750px",
            padding: "40px",
          }
        }}
      >
        <Button
          className="absolute right-1 top-1 min-w-0 text-[#95979c]"
          autoFocus
          onClick={() => setOpen(false)}
        >
          <CgClose className="text-xl" />
        </Button>
        <DialogTitle sx={{
          fontWeight: 700,
          borderLeft: "5px #35bda1 solid",
          padding: "0 0 0 8px",
        }}>
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
