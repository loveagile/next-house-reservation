"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

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
        <p className="text-sm mb-4">見学会など、土日のみ数日間のイベント</p>
        <Link
          href={`/events/${id}/calendar/date_somedays`}
          className="px-8 py-2 text-xl rounded-[1px] mt-4 bg-btn-color text-white hover:opacity-85">
          数日間のイベント
        </Link>
      </div>

      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm mb-4">
          期間限定モデルハウスなど数週間〜数ヶ月間のイベント
        </p>
        <Link
          href={`/events/${id}/calendar/date_somedays`}
          className="px-8 py-2 text-xl rounded-[1px] mt-4 bg-btn-color text-white hover:opacity-85">
          数週間〜数ヶ月間のイベント
        </Link>
      </div>

      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm mb-4">ずっと開催、または終了日未定のイベント</p>
        <Link
          href={`/events/${id}/calendar/date_somedays`}
          className="px-8 py-2 text-xl rounded-[1px] mt-4 bg-btn-color text-white hover:opacity-85">
          終了日未定のイベント
        </Link>
      </div>
      <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
    </div>
  )
};

export default EventCalendarEditPage;
