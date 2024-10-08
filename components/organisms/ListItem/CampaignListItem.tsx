import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";

import Button from "@mui/material/Button";

import StatusField from "@/components/molecules/Field/StatusField";

import { ICampaign } from "@/utils/types";
import { formatISO8601TimestampToJapaneseString, eventHoldingPeriod, convEventStatus } from "@/utils/convert";

interface ThisFCProps {
  item: ICampaign;
}

const CampaignListItem: React.FC<ThisFCProps> = ({ item }) => {
  const {
    id, title, type, format,
    status, eventDate,
    prefecture, address1, address2,
    images, mainIndex,
    updatedAt,
  } = item;

  const mainImg = images?.split(",").map((img) => img.trim())[mainIndex] || "/imgs/campaigns/no_image.png";
  const address = (prefecture || "") + (address1 || "") + (address2 || "");

  return (
    <div className="w-full flex border-[1px] border-[#ddd] mb-5">
      <div className="flex flex-col justify-center items-center w-[120px] border-r-[1px] border-[#ddd] p-1">
        <StatusField status={convEventStatus(status, JSON.parse(eventDate))} />
      </div>
      <div className="flex p-5">
        <Image
          src={mainImg}
          width={160}
          height={120}
          className="w-[160px] h-[120px]"
          alt="イベント画像"
        />
        <div className="ml-10">
          <div className="flex items-center">
            <span className="text-[10px] text-white bg-black px-2 py-[2px]">
              {type}
            </span>
            <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
              {format}
            </span>
          </div>
          <div className="text-sm mt-3 mb-5">{title}</div>
          <p className="text-sm text-m-red">
            {eventHoldingPeriod(JSON.parse(eventDate))}
          </p>
          {address && <div className="text-sm my-1">・{address}</div>}
          <span className="text-xs mt-2 bg-[#2FA8B5] px-2 py-[2px] text-white">
            iemiru掲載設定済み
          </span>
        </div>
      </div>
      <div className="flex flex-col ml-auto p-5 min-w-[25%]">
        <Button
          href={`/campaigns/${id}`}
          variant="contained"
          sx={{
            padding: '8px 40px',
            marginBottom: '12px',
            borderRadius: '1px',
            fontSize: '14px',
          }}
        >
          <FaPencilAlt className="text-sm mr-1" />
          <span className="text-sm">まとめページを編集</span>
        </Button>
        <Link
          className="border-[1px] border-[#484848] text-center p-1 hover:bg-[#eee]"
          href={`/smilebuilders/campaigns/${id}`}
          target="_blank"
        >
          <span className="text-sm">プレビュー</span>
        </Link>
        <div className="text-[11px] mt-auto">最終更新: {formatISO8601TimestampToJapaneseString(updatedAt.toString())}</div>
      </div>
    </div>
  );
};

export default CampaignListItem;
