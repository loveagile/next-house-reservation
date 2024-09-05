"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import Loading from "@/components/molecules/loading";
import PublishEventListItem, { IPublishEventListItem } from "@/components/organisms/PublishEventListItem/PublishEventListItem";

import { IEvent } from "@/utils/types";
import "./ReservationCreatePage.css";

export default function ReservationCreatePage() {
  const [publishEventItems, setPublishEventItems] = useState<IPublishEventListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchPublishEvents = async () => {
      const res = await axios.post("/api/events/view");
      if (res.status === 200) {
        const events = res.data;
        const publishEvents = events.filter((event: IEvent) => event.status === "公開")
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
                <th>イベント内容</th>
                <th className="w-[200px]"></th>
              </tr>
            </thead>
            <tbody>
              {publishEventItems.map((item) => (
                <tr key={item.id} className="w-full">
                  <td className="grow">
                    <PublishEventListItem values={item} />
                  </td>
                  <td className="align-middle p-2 min-w-[250px]">
                    <Button href={`/reservations/${item.id}/new`} className="edit_btn" variant="contained">
                      <EditRoundedIcon className="mr-1" />
                      このイベントに登録する
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

