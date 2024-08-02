import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";

import { timesStr } from "@/utils/constants";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { includeEventDate } from "@/utils/convert";

import { useRecoilValue, useRecoilState } from "recoil";
import { EventDateAtom, SelectYearMonthAtom } from "@/lib/recoil/EventDateAtom";
import "./TableCellItem.css";

interface ITimeProps {
  startTime: string;
  endTime: string;
}

const TableCellItem: React.FC<{ day: number }> = ({ day }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [eventDates, setEventDates] = useRecoilState(EventDateAtom);
  const selectYearMonth = useRecoilValue(SelectYearMonthAtom);

  const { status, startTime, endTime, index } = includeEventDate(
    eventDates,
    selectYearMonth.year,
    selectYearMonth.month,
    day
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ITimeProps>();

  const handleDelete = () => {
    setEventDates([
      ...eventDates.slice(0, index),
      ...eventDates.slice(index + 1),
    ]);
  };

  const onRegister = async () => {
    const startTime = watch("startTime");
    const endTime = watch("endTime");
    const newEventDate = {
      year: selectYearMonth.year,
      month: selectYearMonth.month,
      day,
      startTime,
      endTime,
    };

    if (status) {
      setEventDates([
        ...eventDates.slice(0, index),
        newEventDate,
        ...eventDates.slice(index + 1),
      ]);
    } else {
      setEventDates([...eventDates, newEventDate]);
    }

    setOpen(false);
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
            {startTime}-<br></br>
            {endTime}
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
          <p>開催時間</p>
          <form onSubmit={handleSubmit(onRegister)} className="w-full">
            <div className="flex mt-3">
              <SelectBox
                id="startTime"
                className="max-w-[100px]"
                control={control}
                value={startTime}
                names={timesStr}
              />
              <span className="mx-4">〜</span>
              <SelectBox
                id="endTime"
                className="max-w-[100px]"
                control={control}
                value={endTime}
                names={timesStr}
              />
            </div>
            <Button
              className="update_btn"
              variant="contained"
              onClick={onRegister}
            >
              登録する
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableCellItem;
