import Image from "next/image";
import Link from "next/link";

import { eventHoldingPeriod } from "@/utils/convert";

export interface IPublishEventListItem {
  id: number;
  title: string;
  type: string;
  format: string;
  eventDate: string;
  images: string;
  mainIndex: number;
}

const PublishEventListItem: React.FC<{ values: IPublishEventListItem }> = ({ values }) => {
  const {
    id,
    title,
    type,
    format,
    eventDate,
    images,
    mainIndex,
  } = values;

  const convertEventDate = JSON.parse(eventDate);
  const mainImg = images?.split(",").map((img) => img.trim())[mainIndex] || "/imgs/events/no_image.png";

  return (
    <div className="w-full h-full flex">
      <div className="flex p-2">
        <Image
          src={mainImg}
          width={160}
          height={120}
          className="w-[160px] h-[120px]"
          alt="イベント画像"
        />
        <div className="flex flex-col ml-3">
          <div className="mb-2">
            <span className="text-[10px] text-white bg-black px-2 py-[2px]">
              {type}
            </span>
            <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
              {format}
            </span>
          </div>
          <Link href={`/events/${id}`} className="text-sm mb-5 text-link-color underline">{title}</Link>
          <p className="text-sm text-[#ff0000] mt-auto">
            {eventHoldingPeriod(JSON.parse(eventDate))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublishEventListItem;
