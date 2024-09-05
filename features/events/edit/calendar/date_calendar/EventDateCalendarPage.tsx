"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/components/molecules/loading";
import DateCalendar from "@/components/organisms/DateCalendar/DateCalendar";

import { EventDateAtom, SelectYearMonthAtom } from "@/lib/recoil/EventDateAtom";
import "./EventDateCalendarPage.css";

const EventDateCalendarPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [eventDates, setEventDates] = useRecoilState(EventDateAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [__, setSelectYearMonth] = useRecoilState(SelectYearMonthAtom);

  useEffect(() => {
    const fetchEventDate = async () => {
      setIsLoading(true);

      const currentDate: Date = new Date();
      setSelectYearMonth({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      });

      const res = await axios.post("/api/events/detail", { id });

      if (res.status === 200) {
        if (res.data[0].eventDate) {
          setEventDates(JSON.parse(res.data[0].eventDate));
        }
      }
      setIsLoading(false);
    };
    fetchEventDate();
  }, []);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    let sortedEventDates = [...eventDates];

    sortedEventDates.sort((lhs, rhs) => {
      return new Date(lhs.date).getTime() - new Date(rhs.date).getTime();
    })

    await axios.post("/api/events/update-json", {
      id,
      field_name: "eventDate",
      field_value: sortedEventDates,
    });
    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 font-bold">
          開催日カレンダー
        </h1>
        <p className="text-sm mt-3">
          色が付いている日が開催日です。<br></br>
          「+」を押すと、その日を開催日として登録することができます。時刻を押すと編集ができます。
          <br></br>
          終了日未定のイベントは現在から３ヶ月以降のイベントは自動生成されていくため、確認できません。
        </p>
        <DateCalendar />
      </div>
    </form>
  );
};

export default EventDateCalendarPage;
