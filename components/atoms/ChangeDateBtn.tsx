"use client";

import Button from "@mui/material/Button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InputField from "@/components/molecules/InputField/InputField";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { INearestDateTime } from "@/features/reservations/new/ReservationNewPage";
import { formatReservationDateToJapaneseString, getNearestFutureDate } from "@/utils/convert";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import axios from "axios";

interface IChangeDateBtnProps {
  reservationAt: string;
  id: number;
}

interface IChangeDateForm {
  changeDate: string;
  changeTime: string;
}

const ChangeDateBtn: React.FC<IChangeDateBtnProps> = ({ reservationAt, id }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { time } = formatReservationDateToJapaneseString(reservationAt);
  const reservationTime = time.replace(/^0+/, '');
  const [nearestDate, setNearestDate] = useState<INearestDateTime>({
    candidateDate: "",
    candidateTimes: []
  });

  useEffect(() => {
    const fetchEventDetail = async () => {
      // setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      const data = res.data[0];
      if (res.status === 200) {
        setNearestDate(getNearestFutureDate(JSON.parse(data.eventDate)));
      }
      // setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  const {
    control,
    handleSubmit,
    watch, setValue,
    formState: { errors },
  } = useForm<IChangeDateForm>();

  const handleDelete = async () => {
    // if (type === "campaigns") {
    //   const res = await axios.post("/api/campaigns/delete", { id });
    // } else {
    //   const res = await axios.post("/api/events/delete", { id });
    // }
    // router.push(linkUrl);
  };

  const onSubmit = async (data: IChangeDateForm) => {
    console.log("heeee")
  }
  return (
    <>
      <Button className="date_change_btn" variant="contained" onClick={() => setOpen(true)}>
        日時変更
      </Button >
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
          変更する時間を指定してください
        </DialogTitle>
        <DialogContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start mt-5">
              <div className="w-full">
                <InputField id="changeDate" control={control} className="max-w-full w-full" value={nearestDate.candidateDate} disabled />
              </div>
            </div>

            <p className="text-sm mt-3 font-semibold">予約したい時刻を選択してください。</p>

            {/* Reservation Time */}
            <div className="flex items-start mt-3">
              <div className="w-full">
                <SelectBox
                  id="changeTime"
                  control={control}
                  value={reservationTime}
                  names={nearestDate.candidateTimes}
                  className="max-w-[150px]"
                />
              </div>
            </div>

            <p className="text-sm my-8">変更後、予約者にメールが送信されます。</p>

            <div className="flex gap-x-2">
              <Button type="submit" className="apply_btn" variant="contained">
                変更
              </Button >
              <Button className="discard_btn" variant="contained" onClick={() => setOpen(false)}>
                閉じる
              </Button >
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeDateBtn;
