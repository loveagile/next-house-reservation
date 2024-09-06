"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Loading from "@/components/molecules/loading";
import PaginationItem from "@/components/molecules/PaginationItem";
import EventListItem from "@/components/organisms/ListItem/EventListItem";
import SearchBar, { ISearchForm } from "@/components/molecules/SearchBar/SearchBar";

import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";

import { IEvent } from "@/utils/types";
import { convEventStatus } from "@/utils/convert";

export default function EventViewPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [eventItems, setEventItems] = useState<IEvent[]>([]);
  const [selectedEventItems, setSelectedEventItems] = useState<IEvent[]>([]);
  const [searchData, setSearchData] = useState<ISearchForm>({
    keyword: "",
    type: "イベント種別 - 全て",
    status: "ステータス - 全て",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/view");
      if (res.status === 200) {
        const events = res.data;
        events.sort((lhs: IEvent, rhs: IEvent) => {
          return rhs.priority - lhs.priority;
        })
        setAllEvents(events);
        setEventItems(events);
      }
      setCurrentPage(0);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const { keyword, type, status } = searchData;
    let filteredItems = allEvents;
    if (keyword) {
      filteredItems = filteredItems.filter(item => {
        const fullAddress = item.prefecture + item.address1 + item.address2;

        if (item.title && item.title.includes(keyword)) return true;
        if (fullAddress && fullAddress.includes(keyword)) return true;
        return false;
      })
    }

    if (type !== 'イベント種別 - 全て') {
      filteredItems = filteredItems.filter(item => item.type === type);
    }

    if (status !== "ステータス - 全て") {
      filteredItems = filteredItems.filter(item => {
        const convStatus = convEventStatus(item.status, JSON.parse(item.eventDate));
        if (status === "公開中") {
          return convStatus === "公開" || convStatus === "限定公開";
        }
        if (status === "公開中(開催終了)") {
          return convStatus === "公開(開催終了)";
        }
        if (status === "下書き中／非公開") {
          return convStatus === "非公開(下書き)";
        }
      });
    }

    setEventItems(filteredItems);
    setCurrentPage(0);
  }, [searchData])

  useEffect(() => {
    const selectedItems = eventItems.slice(
      currentPage * 10,
      (currentPage + 1) * 10
    );
    setSelectedEventItems(selectedItems);
  }, [eventItems, currentPage]);

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col w-full p-10">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            イベントページ編集
          </h1>
          <p className="text-sm">
            イベントを告知するページを作成することができます。<br></br>
            アピールポイントや写真もアップして、イベントを魅力的に伝えましょう！
          </p>
        </div>

        {/* New Event Create */}
        <div className="flex justify-center mb-6">
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "5px 30px",
              borderRadius: "1px",
            }}
            variant="contained"
            href="/events/create"
          >
            <FaPlus className="text-xl" />
            <span className="text-xl ml-1">新しいイベントを作成</span>
          </Button>
        </div>

        <div className="flex flex-col w-full bg-white grow p-5">
          <SearchBar
            totalCounts={eventItems.length}
            setSearchData={setSearchData}
          />

          {selectedEventItems.length ? (
            <div className="flex flex-col grow">
              <PaginationItem
                totalPages={Math.ceil(eventItems.length / 10)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              {/* Event List */}
              <div className="grow">
                {selectedEventItems.map((eventItem, index) => (
                  <EventListItem key={index} item={eventItem} />
                ))}
              </div>

              <PaginationItem
                totalPages={Math.ceil(eventItems.length / 10)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <p className="bg-[#fcf8e3] border-[#faebcc] border-[1px] p-4 rounded-sm">
              イベントがありません
            </p>
          )}
        </div>
      </div>
    )
  );
}
