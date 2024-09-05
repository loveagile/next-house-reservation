"use client";
import Button from "@mui/material/Button";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

import "./CampaignCalendarEdit.css";

const CampaignCalendarEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eventNote, setEventNote] = useState<string>("");

  useEffect(() => {
    const fetchCampaignEventNote = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/campaigns/detail", {
        id,
      });
      if (res.status === 200) setEventNote(res.data[0].eventNote);
      setIsLoading(false);
    };
    fetchCampaignEventNote();
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="px-10 py-8 w-full">
      <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 font-bold ">
        開催日の設定
      </h1>
      <p className="mt-2 mb-5 text-sm">どんなまとめページですか？</p>
      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm">見学会など、土日のみ数日間のイベント</p>
        <Button
          href={`/campaigns/${id}/calendar/campaign_date_calendar`}
          className="date_btn"
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
          href={`/campaigns/${id}/calendar/campaign_date_period`}
          className="date_btn"
          variant="contained"
        >
          数週間〜数ヶ月間のイベント
        </Button>
      </div>

      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm">ずっと開催、または終了日未定のイベント</p>
        <Button
          href={`/campaigns/${id}/calendar/campaign_date_endless`}
          className="date_btn"
          variant="contained"
        >
          終了日未定のイベント
        </Button>
      </div>
      <EditBackBtn className="mt-4" linkUrl={`/campaigns/${id}`} />
    </div>
  );
};

export default CampaignCalendarEditPage;
