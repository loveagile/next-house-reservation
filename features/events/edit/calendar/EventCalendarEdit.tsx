"use client";

import { useParams } from "next/navigation";
import Button from "@mui/material/Button";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

const EventCalendarEditPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="px-10 py-8 w-full">
      <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 font-bold">
        開催日の設定
      </h1>
      <p className="mt-2 mb-5 text-sm">どんなイベントですか？</p>
      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm">見学会など、土日のみ数日間のイベント</p>
        <Button
          href={`/events/${id}/calendar/date_somedays`}
          variant="contained"
          sx={{
            padding: "3px 30px",
            fontSize: "20px",
            borderRadius: "1px",
            marginTop: "15px",
          }}
        >
          数日間のイベント
        </Button>
      </div>

      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm">
          期間限定モデルハウスなど数週間〜数ヶ月間のイベント
        </p>
        <Button
          href={`/events/${id}/calendar/date_period`}
          variant="contained"
          sx={{
            padding: "3px 30px",
            fontSize: "20px",
            borderRadius: "1px",
            marginTop: "15px",
          }}
        >
          数週間〜数ヶ月間のイベント
        </Button>
      </div>

      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm">ずっと開催、または終了日未定のイベント</p>
        <Button
          href={`/events/${id}/calendar/date_endless`}
          variant="contained"
          sx={{
            padding: "3px 30px",
            fontSize: "20px",
            borderRadius: "1px",
            marginTop: "15px",
          }}
        >
          終了日未定のイベント
        </Button>
      </div>
      <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
    </div>
  )
};

export default EventCalendarEditPage;
