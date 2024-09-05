"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Loading from "@/components/molecules/loading";
import PaginationItem from "@/components/molecules/PaginationItem";
import ReservationListItem, { IReservationListItem } from "@/components/organisms/ReservationListItem/ReservationListItem";
import ReservationSearchBar, { IReservationSearchForm } from "@/components/molecules/SearchBar/ReservationSearchBar";

export default function ReservationViewPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [reservationItems, setReservationItems] = useState<IReservationListItem[]>([]);
  const [selectedReservationItems, setSelectedReservationItems] = useState<
    IReservationListItem[]
  >([]);
  const [searchData, setSearchData] = useState<IReservationSearchForm>({
    sortMethod: "申込日: 降順",
    keyword: "",
    type: "イベント種別 - 全て",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchReservations = async () => {
      const reservations = await axios.post("/api/reservations/view", { customerId: -1 });
      setReservationItems(reservations.data);
      setIsLoading(false);
    };
    fetchReservations();
  }, [searchData]);

  useEffect(() => {
    const selectedItems = reservationItems.slice(
      currentPage * 20,
      (currentPage + 1) * 20
    );
    setSelectedReservationItems(selectedItems);
  }, [reservationItems, currentPage]);

  return (
    <>
      {isLoading && <Loading />}
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
          <ReservationSearchBar totalCounts={reservationItems.length} setSearchData={setSearchData} />

          {/* New Reservation Create */}
          <div className="mb-6">
            <Button
              variant="contained"
              href="/reservations/create"
              sx={{
                fontSize: "16px",
                padding: "5px 15px",
                borderRadius: "1px",
              }}
            >
              <AddRoundedIcon sx={{
                fontSize: "20px",
                marginRight: "3px",
              }} />
              予約を手入力する
            </Button>
          </div>

          {selectedReservationItems.length ? (
            <div className="flex flex-col">
              <PaginationItem
                totalPages={Math.ceil(reservationItems.length / 10)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              {/* Reservation List */}
              <div className="grow bg-white w-full p-5">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="detail_column list_th">予約詳細</th>
                      <th className="date_column list_th">予約日時</th>
                      <th className="list_th">お客様情報</th>
                      <th className="list_th">イベント名</th>
                      <th className="method_column list_th">流入元</th>
                      <th className="status_column list_th">ステータス</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReservationItems.map((reservationItem, index) => (
                      <ReservationListItem key={index} values={reservationItem} />
                    ))}
                  </tbody>
                </table>
              </div>

              <PaginationItem
                totalPages={Math.ceil(reservationItems.length / 10)}
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
    </>
  );
}
