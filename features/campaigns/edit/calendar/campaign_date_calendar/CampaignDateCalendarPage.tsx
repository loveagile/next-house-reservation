"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/Loading/loading";
import DateCalendar from "@/components/organisms/DateCalendar/DateCalendar";
import { eventDateTimeSplit, formatDateToDBString } from "@/utils/convert";

import { useRecoilState } from "recoil";
import { EventDateAtom, SelectYearMonthAtom } from "@/lib/recoil/EventDateAtom";

import "./CampaignDateCalendarPage.css";

const CampaignDateCalendarPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [eventDates, setEventDates] = useRecoilState(EventDateAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [_, setSelectYearMonth] = useRecoilState(SelectYearMonthAtom);

  useEffect(() => {
    const fetchCampaignEventDate = async () => {
      setIsLoading(true);

      const currentDate: Date = new Date();
      setSelectYearMonth({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      });

      const res = await axios.post("/api/campaigns/detail", { id });

      if (res.status === 200) {
        const saveDateStr: string = res.data[0].eventDate;
        if (saveDateStr) {
          const saveDates = saveDateStr.split(",").map((date) => date.trim());
          setEventDates(
            saveDates.map((saveDate) => eventDateTimeSplit(saveDate))
          );
        }
      }
      setIsLoading(false);
    };
    fetchCampaignEventDate();
  }, [id]);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    await axios.post("/api/campaigns/update", {
      id,
      field_name: "eventDate",
      field_value: formatDateToDBString(eventDates),
    });
    router.push(`/campaigns/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 font-bold text-[#555]">
          開催日カレンダー
        </h1>
        <p className="text-[15px] mt-3">
          色が付いている日が開催日です。<br></br>
          「+」を押すと、その日を開催日として登録することができます。時刻を押すと編集ができます。
          <br></br>
          終了日未定のキャンペーンは現在から３ヶ月以降のイベントは自動生成されていくため、確認できません。
        </p>
        <DateCalendar />
      </div>
    </form>
  );
};

export default CampaignDateCalendarPage;
