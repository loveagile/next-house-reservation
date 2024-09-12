"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import Button from "@mui/material/Button";
import Loading from "@/components/molecules/loading";
import PublishEventListItem, { IPublishEventListItem } from "@/components/organisms/ListItem/PublishEventListItem";
import { convEventStatus } from "@/utils/convert";
import { IEvent } from "@/utils/types";

export default function ReservationSelectEventPage() {
  const [publishEventItems, setPublishEventItems] = useState<IPublishEventListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchPublishEvents = async () => {
      const res = await axios.post("/api/events/view");
      if (res.status === 200) {
        const events = res.data;
        const publishEvents = events.filter((event: IEvent) => {
          const { status, eventDate } = event;
          const convStatus = convEventStatus(status, JSON.parse(eventDate));
          return convStatus === "公開" || convStatus === "限定公開";
        })
        setPublishEventItems(publishEvents);
      }
      setIsLoading(false);
    };
    fetchPublishEvents();
  }, []);

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-3 font-bold ">
            予約入力 - イベント選択
          </h1>
          <p className="text-sm">
            予約入力するイベントを選択してください。イベントは予約受付中のイベントのみが表示されています。
          </p>
        </div>
        <div className="bg-white w-full p-5">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-[#2fa8b5] p-[10px] text-white font-medium">イベント内容</th>
                <th className="bg-[#2fa8b5] p-[10px] text-white font-medium w-[200px]"></th>
              </tr>
            </thead>
            <tbody>
              {publishEventItems.map((item) => (
                <tr key={item.id} className="w-full">
                  <td className="grow">
                    <PublishEventListItem values={item} />
                  </td>
                  <td className="align-middle p-2 min-w-[250px]">
                    <Button href={`/reservations/${item.id}/create`} variant="contained" sx={{
                      width: "100%",
                      padding: "8px 20px",
                      marginBottom: 0,
                      fontSize: "14px",
                      borderRadius: "1px",
                    }}>
                      <FaPencilAlt className="text-sm" />
                      <span className="ml-[6px]">このイベントに登録する</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

