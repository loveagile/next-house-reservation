"use client";

import "./ReservationCandidatePage.css";

export default function ReservationCandidatePage() {
  return (
    <div className="flex flex-col p-10 w-full">
      <div className="mb-6">
        <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-3 font-bold ">
          イベント日程調整予約一覧
        </h1>
      </div>
      <div className="bg-white w-full p-5">
        <p className="text-sm bg-[#fcf8e3] border-[#faebcc] border-[1px] p-4 rounded-sm">
          日程調整中のイベントが見つかりませんでした。
        </p>
      </div>
    </div>
  );
}

