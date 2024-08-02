"use client";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import DraggableDialog from "@/components/molecules/DraggableDialog/DraggableDialog";
import { Fragment } from "react";

const news = [
  {
    date: "2024年05月24日(金)",
    title:
      "【新機能】複数イベントを1ページにまとめて表示できるようになりました",
    content:
      "KengakuCloudでは皆様のご要望にお応えし、複数イベントを1ページにまとめて表示することができるように機能改修を行いました！",
  },
  {
    date: "2024年05月24日(金)",
    title: "【新機能】スタッフ向けLINE通知機能をリリース！",
    content:
      "KengakuCloudでは、スタッフ様のLINEアカウントへイベント予約通知を送信できるようになりました。スマートフォンからも確認しやすく、予約通知の見落とし防止にお役立ていただけますので、ぜひご活用ください！",
  },
  {
    date: "2024年04月12日(金)",
    title: "【重要】Google広告「P-MAXキャンペーン」の設定にご注意ください",
    content:
      "Google広告が提供する「P-MAX（Performance Max）キャンペーン」をご利用の方は、キャンペーン設定の［最終ページURLの拡張］設定を必ずご確認ください。",
  },
];

export default function TopPage() {
  return (
    <div className="flex p-10 w-full">
      <div className="flex flex-col justify-center items-center p-10 bg-[#ea9b54]">
        <InfoRoundedIcon className="text-white text-[2rem]" />
        <span className="text-center mt-3 text-white text-[1.2rem] font-bold">
          運営からの
          <br />
          お知らせ
        </span>
      </div>
      <div className="bg-white grow p-5">
        {news.map((newItem, index) => (
          <Fragment key={index}>
            <p className="text-[15px]">{newItem.date}</p>
            <DraggableDialog
              date={newItem.date}
              title={newItem.title}
              content={newItem.content}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
