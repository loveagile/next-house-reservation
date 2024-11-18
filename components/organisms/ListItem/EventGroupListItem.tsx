"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import GroupEventNotApprovedBtn from "@/components/atoms/Button/GroupEventNotApprovedBtn";

import { IGroupEvent } from "@/features/group/EventGroupPage";
import { formatISO8601TimestampToJapaneseString, convEventStatus } from "@/utils/convert";

interface ThisFCProps {
  item: IGroupEvent;
  handleNotApprovedEvent: (notApprovedId: number) => void;
}

const EventGroupListItem: React.FC<ThisFCProps> = ({ item, handleNotApprovedEvent }) => {
  const {
    id, title, type, format,
    eventDate, status,
    companyName, eventURL,
    updatedAt,
  } = item;

  const convStatus = convEventStatus(status, JSON.parse(eventDate));

  return (
    <tr className="w-full">
      <td className="p-4 text-sm text-center leading-6">
        {convStatus === "非公開(下書き)" ? (
          <span>下書き中<br />／非公開</span>
        ) : convStatus === "公開(開催終了)" ? (
          <span>公開中<br />(開催終了)</span>
        ) : (
          <span>公開中</span>
        )}
      </td>
      <td className="p-4 text-sm">
        {companyName}
      </td>
      <td className="p-4">
        <p className="mb-2">
          <span className="text-[10px] text-white bg-black px-2 py-[2px]">
            {type}
          </span>
          <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
            {format}
          </span>
        </p>
        <Link href={`/${eventURL}/events/${id}`}
          // target="_blank"
          className="text-sm mt-3 mb-5 text-link-color underline">
          {title}
        </Link>
      </td>
      <td className="p-4 text-sm">
        {formatISO8601TimestampToJapaneseString(updatedAt.toString())}
      </td>
      <td className="p-2">
        <GroupEventNotApprovedBtn id={id} handleNotApprovedEvent={handleNotApprovedEvent} />
      </td>
    </tr>
  );
};

export default EventGroupListItem;
