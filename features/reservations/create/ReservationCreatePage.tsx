"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import PublishEventListItem, { IPublishEventListItem } from "@/components/organisms/PublishEventListItem/PublishEventListItem";
import Loading from "@/components/molecules/Loading/loading";
import "./ReservationCreatePage.css";

export default function ReservationCreatePage() {
  const router = useRouter();
  const [publishEventItems, setPublishEventItems] = useState<IPublishEventListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchPublishEvents = async () => {
      const publishEvents = await axios.post("/api/events/view", {
        status: "公開中",
      });
      setPublishEventItems(publishEvents.data);
      setIsLoading(false);
    };
    fetchPublishEvents();
  }, []);

  return (
    <div className="flex flex-col p-10 w-full">
      {isLoading && <Loading />}
      <div className="mb-6">
        <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-3 font-bold text-[#555]">
          予約入力 - イベント選択
        </h1>
        <p className="text-[14px] yu_gothic">
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
                <td className="w-[200px]"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

