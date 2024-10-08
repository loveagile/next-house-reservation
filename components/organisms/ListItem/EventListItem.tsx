"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import { FaPencilAlt } from "react-icons/fa";

import StatusField from "@/components/molecules/Field/StatusField";

import { IEvent } from "@/utils/types";
import { formatISO8601TimestampToJapaneseString, eventHoldingPeriod, convEventStatus } from "@/utils/convert";

interface ThisFCProps {
  item: IEvent;
}

const EventListItem: React.FC<ThisFCProps> = ({ item }) => {
  const router = useRouter();
  const {
    id, title, type, format,
    attend, eventDate, status, priority,
    prefecture, address1, address2,
    images, mainIndex,
    updatedAt,
  } = item;

  const mainImg = images?.split(",").map((img) => img.trim())[mainIndex] || "/imgs/events/no_image.png";
  const address = (prefecture || "") + (address1 || "") + (address2 || "");

  const handleDuplicate = async () => {
    const res = await axios.post('/api/events/duplicate', { id });
    const { lastInsertedId } = res.data;
    router.push(`/events/${lastInsertedId}`);
  }

  return (
    <div className="w-full flex border-[1px] border-[#ddd] mb-5">
      <div className="flex flex-col justify-center items-center w-[120px] border-r-[1px] border-[#ddd] p-1">
        {priority === 1 &&
          <Image
            src="/imgs/icons/priority.png"
            className="w-[30px] h-[36px]"
            width={30}
            height={36}
            alt="優先順位"
          />
        }
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
          <span className="text-[10px] text-white bg-black px-2 py-[2px]">
            {type}
          </span>
          <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
            {format}
          </span>
          <span className="text-sm ml-2">
            予約者 : {" "}
            <Link href="#" className="text-[#ea9b54]">{attend} 名</Link>
          </span>
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
      <div className="flex flex-col ml-auto p-5 w-[25%] min-w-[300px]">
        <Button
          href={`/events/${id}`}
          variant="contained"
          sx={{
            padding: '8px 40px',
            marginBottom: '12px',
            borderRadius: '1px',
            fontSize: '14px',
          }}
        >
          <FaPencilAlt className="text-sm mr-1" />
          <span className="text-sm">イベントを編集</span>
        </Button>
        <div className="flex justify-between text-sm">
          <Link
            className="border-[1px] w-[49%] border-[#484848] text-center p-[2px]"
            href={`/smilebuilders/events/${id}`}
            target="_blank"
          >
            <span className="text-sm">プレビュー</span>
          </Link>
          <Button
            sx={{
              border: '1px solid #484848',
              width: '49%',
              padding: 0,
              borderRadius: 0,
              color: 'black',
            }}
            onClick={handleDuplicate}
          >
            <span className="text-sm">複製</span>
          </Button>
        </div>
        <div className="text-xs mt-auto">最終更新: {formatISO8601TimestampToJapaneseString(updatedAt.toString())}</div>
      </div>
    </div>
  );
};

export default EventListItem;
