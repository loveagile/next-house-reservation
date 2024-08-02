import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { getReservationPeriod, eventDateTimeSplit } from "@/utils/convert";
import StatusField from "@/components/molecules/StatusField/StatusField";
import { IEventDateTime } from "@/lib/recoil/EventDateAtom";
import { formatISO8601TimestampToJapaneseString } from "@/utils/convert";
import "./CampaignListItem.css";

export interface ICampaignListItem {
  id: number;
  title: string;
  type: string;
  format: string;
  status: string;
  eventDate: string;
  prefecture: string;
  address1: string;
  address2: string;
  imgUrl: string;
  mainImg: number;
  updatedAt: string;
}

const CampaignListItem: React.FC<{ values: ICampaignListItem }> = ({
  values,
}) => {
  const {
    id,
    title,
    type,
    format,
    status,
    eventDate,
    prefecture,
    address1,
    address2,
    imgUrl,
    mainImg,
    updatedAt,
  } = values;

  const displayImg = imgUrl
    ? imgUrl.split(",").map((img) => img.trim())[mainImg]
    : "";

  const address = (prefecture || "") + (address1 || "") + (address2 || "");

  let eventDates: IEventDateTime[] = [];
  if (eventDate) {
    const saveDates = eventDate.split(",").map((date) => date.trim());
    eventDates = saveDates.map((saveDate) => eventDateTimeSplit(saveDate));
  }

  return (
    <div className="w-full flex border-[1px] border-[#ddd] mb-5">
      <div className="flex flex-col justify-center items-center w-[120px] border-r-[1px] border-[#ddd] p-1">
        <StatusField status={status} />
      </div>
      <div className="flex p-5">
        <Image
          src={imgUrl ? displayImg : "/imgs/campaigns/no_image.png"}
          width={160}
          height={120}
          className="w-[160px] h-[120px]"
          alt="イベント画像"
        />
        <div className="ml-10">
          <div className="flex items-center">
            <span className="text-[10px] text-white bg-black px-2 pt-[2px] pb-[4px]">
              {type}
            </span>
            <span className="text-xs border-[1px] border-[#737373] px-2 pt-[2px] pb-[3px] ml-1">
              {format}
            </span>
          </div>
          <div className="text-sm mt-2 mb-5">{title}</div>
          {eventDates.length > 0 && (
            <div className="text-sm text-[#ff0000]">
              {getReservationPeriod(eventDates)}
            </div>
          )}
          {address && <div className="text-sm my-1">・{address}</div>}
          <span className="text-xs mt-2 bg-[#2FA8B5] px-2 py-[2px] text-white">
            iemiru掲載設定済み
          </span>
        </div>
      </div>
      <div className="flex flex-col ml-auto p-5 min-w-[25%]">
        <Button
          href={`/campaigns/${id}`}
          className="edit_btn"
          variant="contained"
        >
          <EditRoundedIcon className="mr-1" />
          まとめページを編集
        </Button>
        <Link
          className="border-[1px] border-[#484848] text-center p-[6px] hover:bg-[#eee]"
          href={`/campaigns/${id}/preview`}
        >
          プレビュー
        </Link>
        <div className="text-[11px] mt-auto">最終更新: {formatISO8601TimestampToJapaneseString(updatedAt)}</div>
      </div>
    </div>
  );
};

export default CampaignListItem;
