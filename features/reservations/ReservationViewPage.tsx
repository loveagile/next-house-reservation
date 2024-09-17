"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

import Button from "@mui/material/Button";
import { FaPlus } from "react-icons/fa6";

import Loading from "@/components/molecules/loading";
import PaginationItem from "@/components/molecules/PaginationItem";
import ReservationListItem, { IReservationListItem } from "@/components/organisms/ListItem/ReservationListItem";
import ReservationSearchBar, { IReservationSearchForm } from "@/components/molecules/SearchBar/ReservationSearchBar";
import { getFormatDate } from "@/utils/convert";

export default function ReservationViewPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [reservationItems, setReservationItems] = useState<IReservationListItem[]>([]);
  const [selectedReservationItems, setSelectedReservationItems] = useState<IReservationListItem[]>([]);
  const [searchData, setSearchData] = useState<IReservationSearchForm>({
    sortMethod: "申込日: 降順",
    keyword: "",
    type: "イベント種別 - 全て",
  });

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/reservations/view", { customerId: -1 });
      if (res.status === 200) {
        let filteredItems: IReservationListItem[] = res.data;
        const { sortMethod, keyword, type } = searchData;

        if (sortMethod === "申込日: 降順") {
          filteredItems = [...filteredItems].sort((lhs: IReservationListItem, rhs: IReservationListItem) => (
            new Date(rhs.receptionAt).getTime() - new Date(lhs.receptionAt).getTime()
          ));
        }
        if (sortMethod === "申込日: 昇順") {
          filteredItems = [...filteredItems].sort((lhs: IReservationListItem, rhs: IReservationListItem) => (
            new Date(lhs.receptionAt).getTime() - new Date(rhs.receptionAt).getTime()
          ));
        }
        if (sortMethod === "予約日: 降順") {
          filteredItems = [...filteredItems].sort((lhs: IReservationListItem, rhs: IReservationListItem) => (
            getFormatDate(rhs.reserveDate, rhs.startTime).getTime() - getFormatDate(lhs.reserveDate, lhs.startTime).getTime()
          ));
        }
        if (sortMethod === "予約日: 昇順") {
          filteredItems = [...filteredItems].sort((lhs: IReservationListItem, rhs: IReservationListItem) => (
            getFormatDate(lhs.reserveDate, lhs.startTime).getTime() - getFormatDate(rhs.reserveDate, rhs.startTime).getTime()
          ));
        }

        if (keyword) {
          filteredItems = filteredItems.filter(item => {
            const fullName = item.lastName + item.firstName;
            const furiName = item.seiName + item.meiName;
            const fullAddress = item.prefecture + item.city + item.street + item.building;

            if (item.title && item.title.includes(keyword)) return true;
            if (fullName.includes(keyword) || furiName.includes(keyword)) return true;
            if (fullAddress.includes(keyword)) return true;
            if (item.phone.includes(keyword)) return true;
            if (item.email.includes(keyword)) return true;
            if (item.memo.includes(keyword) || item.note.includes(keyword)) return true;
            return false;
          })
        }

        if (type !== 'イベント種別 - 全て') {
          filteredItems = filteredItems.filter(item => item.type === type);
        }

        setReservationItems(filteredItems);
        setCurrentPage(0);
      }
      setCurrentPage(0);
      setIsLoading(false);
    };
    fetchReservations();
  }, [searchData])

  useEffect(() => {
    const selectedItems = reservationItems.slice(
      currentPage * 20,
      (currentPage + 1) * 20
    );
    setSelectedReservationItems(selectedItems);
  }, [reservationItems, currentPage]);

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-3 font-bold ">
            予約一覧
          </h1>
          <p className="text-sm">
            全ての予約情報が確認でき、「承認」「日付変更」「取り消し」など各種変更を行えます。<br></br>
            「予約詳細」をクリックすると、予約情報「詳細画面」が表示されます。<br></br>
            ※ 必ず「予約詳細」をご確認いただきますようお願い致します。<br></br>
            【来場確認につきまして】・・・《予約日時》が過ぎると「来場せず」ボタンが表示されます。来場が無かった場合「来場せず」ボタンを押してください。<br></br>
            ※「来場があった場合」は特に処理は必要ありません。<br></br>
          </p>
        </div>

        <div className="bg-white grow w-full p-5">
          <ReservationSearchBar totalCounts={reservationItems.length}
            searchData={searchData} setSearchData={setSearchData}
          />

          {/* New Reservation Create */}
          <div className="mb-6">
            <Button
              variant="contained"
              href="/reservations/select_event"
              sx={{
                fontSize: "16px",
                padding: "5px 15px",
                borderRadius: "1px",
              }}
            >
              <FaPlus />
              <span className="ml-1">予約を手入力する</span>
            </Button>
          </div>

          {selectedReservationItems.length ? (
            <div className="flex flex-col">
              <PaginationItem
                totalPages={Math.ceil(reservationItems.length / 20)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              {/* Reservation List */}
              <div className="grow bg-white w-full p-5">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-[90px] bg-[#2fa8b5] p-3 text-sm text-white font-normal">予約詳細</th>
                      <th className="w-[135px] bg-[#2fa8b5] p-3 text-sm text-white font-normal">予約日時</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal">お客様情報</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal">イベント名</th>
                      <th className="w-20 bg-[#2fa8b5] p-3 text-sm text-white font-normal">流入元</th>
                      <th className="w-[135px] bg-[#2fa8b5] p-3 text-sm text-white font-normal">ステータス</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReservationItems.map((reservationItem) => (
                      <ReservationListItem key={v4()} values={reservationItem} />
                    ))}
                  </tbody>
                </table>
              </div>

              <PaginationItem
                totalPages={Math.ceil(reservationItems.length / 20)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <p className="bg-[#fcf8e3] border-[#faebcc] border-[1px] p-4 rounded-sm">
              イベント予約が見つかりませんでした
            </p>
          )}
        </div>
      </div>
    )
  );
}
