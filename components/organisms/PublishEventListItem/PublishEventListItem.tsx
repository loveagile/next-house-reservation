import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import StatusField from "@/components/molecules/StatusField/StatusField";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { getReservationPeriod, eventDateTimeSplit } from "@/utils/convert";
import { IEventDateTime } from "@/lib/recoil/EventDateAtom";
import { formatISO8601TimestampToJapaneseString } from "@/utils/convert";
import "./PublishEventListItem.css";

export interface IPublishEventListItem {
  id: number;
  title: string;
  type: string;
  format: string;
  eventDate: string;
  imgUrl: string;
  mainImg: number;
}

const PublishEventListItem: React.FC<{ values: IPublishEventListItem }> = ({ values }) => {
  const {
    id,
    title,
    type,
    format,
    eventDate,
    imgUrl,
    mainImg,
  } = values;

  const displayImg = imgUrl
    ? imgUrl.split(",").map((img) => img.trim())[mainImg]
    : "";

  let eventDates: IEventDateTime[] = [];
  if (eventDate) {
    const saveDates = eventDate.split(",").map((date) => date.trim());
    eventDates = saveDates.map((saveDate) => eventDateTimeSplit(saveDate));
  }

  return (
    <div className="w-full flex border-[1px] border-[#ddd] mb-5">
      <div className="flex p-2">
        <Image
          src={imgUrl ? displayImg : "/imgs/events/no_image.png"}
          width={160}
          height={120}
          className="w-[160px] h-[120px]"
          alt="イベント画像"
        />
        <div className="ml-10">
          <span className="text-[10px] text-white bg-black px-2 py-[2px]">
            {type}
          </span>
          <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
            {format}
          </span>
          <div className="text-sm mt-3 mb-5">{title}</div>
          {eventDates.length > 0 && (
            <div className="text-sm text-[#ff0000]">
              {getReservationPeriod(eventDates)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishEventListItem;
