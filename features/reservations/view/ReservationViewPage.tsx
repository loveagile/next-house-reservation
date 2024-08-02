"use client";

import axios from "axios";
import PaginationItem from "@/components/molecules/PaginationItem/PaginationItem";
import Button from "@mui/material/Button";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import "./ReservationViewPage.css";
import { useEffect, useState } from "react";
import EventListItem from "@/components/organisms/EventListItem/EventListItem";
import { IEventListItem } from "@/components/organisms/EventListItem/EventListItem";
import SearchBar, {
  ISearchForm,
} from "@/components/molecules/SearchBar/SearchBar";
import Loading from "@/components/molecules/Loading/loading";

export default function ReservationViewPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [eventItems, setEventItems] = useState<IEventListItem[]>([]);
  const [selectedEventItems, setSelectedEventItems] = useState<
    IEventListItem[]
  >([]);
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

  console.log(eventItems)

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-3 font-bold text-[#555]">
            予約一覧
          </h1>
          <p className="text-[14px] yu_gothic">
            全ての予約情報が確認でき、「承認」「日付変更」「取り消し」など各種変更を行えます。<br></br>
            「予約詳細」をクリックすると、予約情報「詳細画面」が表示されます。<br></br>
            ※ 必ず「予約詳細」をご確認いただきますようお願い致します。<br></br>
            【来場確認につきまして】・・・《予約日時》が過ぎると「来場せず」ボタンが表示されます。来場が無かった場合「来場せず」ボタンを押してください。<br></br>
            ※「来場があった場合」は特に処理は必要ありません。<br></br>
          </p>
        </div>

        <div className="bg-white grow w-full p-5">
          <SearchBar
            totalCounts={eventItems.length}
            setSearchData={setSearchData}
          />

          {/* New Reservation Create */}
          <div className="mb-6">
            <Button
              className="new_reservation_btn"
              variant="contained"
              href="/reservations/create"
            >
              <AddRoundedIcon className="plus_sign" />
              予約を手入力する
            </Button>
          </div>

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
                  <EventListItem key={index} values={eventItem} />
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
