"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Loading from "@/components/molecules/loading";
import PaginationItem from "@/components/molecules/PaginationItem";
import EventGroupListItem from "@/components/organisms/ListItem/EventGroupListItem";

import { IEvent } from "@/utils/types";

export interface IGroupEvent extends IEvent {
  companyName: string;
  eventURL: string;
}

const EventGroupPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [eventItems, setEventItems] = useState<IGroupEvent[]>([]);
  const [selectedEventItems, setSelectedEventItems] = useState<IGroupEvent[]>([]);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/groups/event", {
        id: cookies['user'].id,
        isApproved: 1,
      });
      if (res.status === 200) {
        const events = res.data;
        events.sort((lhs: IEvent, rhs: IEvent) => {
          return new Date(rhs.updatedAt).getTime() - new Date(lhs.updatedAt).getTime();
        });
        setEventItems(events);
      }
      setCurrentPage(0);
      setIsLoading(false);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const selectedItems = eventItems.slice(
      currentPage * 20,
      (currentPage + 1) * 20
    );
    setSelectedEventItems(selectedItems);
  }, [eventItems, currentPage]);

  const handleNotApprovedEvent = (notApprovedId: number) => {
    const filteredEvents = eventItems.filter(event => event.id !== notApprovedId);
    setEventItems(filteredEvents);
  }

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col w-full p-10">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            掲載イベント管理
          </h1>
          <p className="text-sm">
            グループに所属している住宅会社のイベントの掲載を管理することができます。
          </p>
        </div>

        <div className="flex flex-col w-full bg-white grow p-5">
          <div className="flex border-b-[1px] pb-3 border-[#eee] mb-5">
            <span className="flex items-center">
              <strong className="text-sm">掲載中</strong>
            </span>
          </div>
          {selectedEventItems.length ? (
            <div className="flex flex-col grow">
              <PaginationItem
                totalPages={Math.ceil(eventItems.length / 20)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              <div className="grow bg-white w-full p-5">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-[120px] bg-[#2fa8b5] p-3 text-sm text-white font-normal">ステータス</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal">会社名</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal">イベント</th>
                      <th className=" bg-[#2fa8b5] p-3 text-sm text-white font-normal">申請日</th>
                      <th className="w-[130px] bg-[#2fa8b5] p-3 text-sm text-white font-normal">変更</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEventItems.map((eventItem, index) =>
                      <EventGroupListItem key={index} item={eventItem} handleNotApprovedEvent={handleNotApprovedEvent} />
                    )}
                  </tbody>
                </table>
              </div>

              <PaginationItem
                totalPages={Math.ceil(eventItems.length / 20)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <p className="bg-[#fcf8e3] border-[#faebcc] border-[1px] p-4 rounded-sm">
              参加している住宅会社はありません。
            </p>
          )}
        </div>
      </div>
    )
  );
}

export default EventGroupPage;