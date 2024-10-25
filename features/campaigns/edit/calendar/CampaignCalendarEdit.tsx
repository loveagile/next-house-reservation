"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

const CampaignCalendarEditPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="px-10 py-8 w-full">
      <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 font-bold ">
        開催日の設定
      </h1>
      <p className="mt-2 mb-5 text-sm">どんなまとめページですか？</p>
      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm">見学会など、土日のみ数日間のまとめページ</p>
        <Link
          href={`/campaigns/${id}/calendar/date_somedays`}
          className="px-8 py-2 text-xl inline-block rounded-[1px] mt-3 bg-btn-color text-white hover:opacity-90"
        >
          数日間のまとめページ
        </Link>
      </div>

      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm">
          期間限定モデルハウスなど数週間〜数ヶ月間のまとめページ
        </p>
        <Link
          href={`/campaigns/${id}/calendar/date_period`}
          className="px-8 py-2 text-xl inline-block rounded-[1px] mt-3 bg-btn-color text-white hover:opacity-90"
        >
          数週間〜数ヶ月間のまとめページ
        </Link>
      </div>

      <div className="bg-white items-start mt-5 p-5 w-full">
        <p className="text-sm">ずっと開催、または終了日未定のまとめページ</p>
        <Link
          href={`/campaigns/${id}/calendar/date_endless`}
          className="px-8 py-2 text-xl inline-block rounded-[1px] mt-3 bg-btn-color text-white hover:opacity-90"
        >
          終了日未定のまとめページ
        </Link>
      </div>
      <EditBackBtn className="mt-4" linkUrl={`/campaigns/${id}`} />
    </div>
  )
};

export default CampaignCalendarEditPage;
