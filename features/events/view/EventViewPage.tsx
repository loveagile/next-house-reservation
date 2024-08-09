"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Loading from "@/components/molecules/Loading/loading";
import PaginationItem from "@/components/molecules/PaginationItem/PaginationItem";
import EventListItem from "@/components/organisms/EventListItem/EventListItem";
import { IEventListItem } from "@/components/organisms/EventListItem/EventListItem";
import SearchBar, { ISearchForm } from "@/components/molecules/SearchBar/SearchBar";

import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import "./EventViewPage.css";

export default function EventViewPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [eventItems, setEventItems] = useState<IEventListItem[]>([]);
  const [selectedEventItems, setSelectedEventItems] = useState<IEventListItem[]>([]);
  const [searchData, setSearchData] = useState<ISearchForm>({
    keyword: "",
    type: "イベント種別 - 全て",
    status: "ステータス - 全て",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchEvents = async () => {
      const events = await axios.post("/api/events/view", {
        ...searchData,
      });
      setEventItems(events.data);
      setIsLoading(false);
    };
    fetchEvents();
  }, [searchData]);

  useEffect(() => {
    const selectedItems = eventItems.slice(
      currentPage * 10,
      (currentPage + 1) * 10
    );
    setSelectedEventItems(selectedItems);
  }, [eventItems, currentPage]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-3 font-bold text-[#555]">
            イベントページ編集
          </h1>
          <p className="text-[14px] ">
            イベントを告知するページを作成することができます。<br></br>
            アピールポイントや写真もアップして、イベントを魅力的に伝えましょう！
          </p>
        </div>

        {/* New Event Create */}
        <div className="mb-6 flex justify-center">
          <Button
            className="new_event_btn"
            variant="contained"
            href="/events/create"
          >
            <AddRoundedIcon className="plus_sign" />
            新しいイベントを作成
          </Button>
        </div>

        <div className="bg-white grow w-full p-5">
          <SearchBar
            totalCounts={eventItems.length}
            setSearchData={setSearchData}
          />

          {selectedEventItems.length ? (
            <div className="flex flex-col">
              <PaginationItem
                totalPages={Math.ceil(eventItems.length / 10)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              {/* Event List */}
              <div className="grow">
                {selectedEventItems.map((eventItem, index) => (
                  <EventListItem key={index} values={eventItem} setIsLoading={setIsLoading} />
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
    </>
  );
}
