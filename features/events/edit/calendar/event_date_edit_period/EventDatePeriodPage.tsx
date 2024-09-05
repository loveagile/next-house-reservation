"use client";
import InputLabel from "@mui/material/InputLabel";
import MultilineField from "@/components/molecules/MultilineField";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import "./EventDatePeriodPage.css";
import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

interface INoteProps {
  event_note: string;
}

const EventDatePeriodPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eventNote, setEventNote] = useState<string>("");

  useEffect(() => {
    const fetchEventTitle = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", {
        id,
      });
      if (res.status === 200) setEventNote(res.data[0].eventNote);
      setIsLoading(false);
    };
    fetchEventTitle();
  }, [id]);

  const schema = yup.object().shape({
    event_name: yup.string().required("入力してください。"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<INoteProps>();

  const onSubmit = async (data: INoteProps) => {
    const { event_note } = data;

    const res = await axios.post("/api/events/update", {
      id,
      field_names: ["eventNote"],
      field_values: [event_note],
    });

    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 font-bold ">
          月にわたるイベント
        </h1>
        <div className="bg-white items-start mt-5 p-5 w-full">
          <p className="text-sm">見学会など、土日のみ数日間のイベント</p>
          <Button
            href="/events/calendar/event_date_calendar"
            className="text-xl px-10 mt-3 date_btn"
            variant="contained"
          >
            数日間のイベント
          </Button>
        </div>

        <div className="bg-white items-start mt-5 p-5 w-full">
          <p className="text-sm">
            期間限定モデルハウスなど数週間〜数ヶ月間のイベント
          </p>
          <Button
            href="/events/calendar/event_date_edit_period"
            className="text-xl px-10 mt-3 date_btn"
            variant="contained"
          >
            数週間〜数ヶ月間のイベント
          </Button>
        </div>

        <div className="bg-white items-start mt-5 p-5 w-full">
          <p className="text-sm">ずっと開催、または終了日未定のイベント</p>
          <Button
            href="/events/calendar/event_date_edit_endless"
            className="text-xl px-10 mt-3 date_btn"
            variant="contained"
          >
            終了日未定のイベント
          </Button>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default EventDatePeriodPage;
