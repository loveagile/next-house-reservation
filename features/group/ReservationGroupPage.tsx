"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Loading from "@/components/molecules/loading";
import ReservationGroupSearchBar from "@/components/molecules/SearchBar/ReservationGroupSearchBar";
import ReservationGroupListItem from "@/components/organisms/ListItem/ReservationGroupListItem";
import PaginationItem from "@/components/molecules/PaginationItem";
import { IGroupReservation } from "@/components/organisms/ListItem/ReservationGroupListItem";

const ReservationGroupPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [allReservations, setAllReservations] = useState<IGroupReservation[]>([]);
  const [reservationItems, setReservationItems] = useState<IGroupReservation[]>([]);
  const [selectedReservationItems, setSelectedReservationItems] = useState<IGroupReservation[]>([]);

  const [keyword, setKeyword] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const fetchGroupReservations = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/groups/reservation", {
        id: cookies['user'].id,
      });
      if (res.status === 200) {
        const reservations = res.data;
        setAllReservations(reservations);
        setReservationItems(reservations);
      }
      setCurrentPage(0);
      setIsLoading(false);
    };
    fetchGroupReservations();
  }, []);

  useEffect(() => {
    let filteredItems = allReservations;

    filteredItems = filteredItems.filter(item => {
      const fullName = item.lastName + item.firstName || "";
      const furiName = item.seiName + item.meiName || "";
      const fullAddress = item.prefecture + item.city + item.street + item.building || "";

      if (fullName.includes(keyword) || furiName.includes(keyword)) return true;
      if (fullAddress.includes(keyword)) return true;
      if (item.companyName?.includes(keyword)) return true;
      if (item.phone?.includes(keyword)) return true;
      if (item.email?.includes(keyword)) return true;
      if (item.memo?.includes(keyword) || item.note?.includes(keyword)) return true;
      if (item.customerId === Number(keyword)) return true;
      return false;
    });

    setReservationItems(filteredItems);
    setCurrentPage(0);
  }, [keyword]);

  useEffect(() => {
    const selectedItems = reservationItems.slice(
      currentPage * 20,
      (currentPage + 1) * 20
    );
    setSelectedReservationItems(selectedItems);
  }, [reservationItems, currentPage]);

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col w-full p-10">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            グループの予約確認
          </h1>
          <p className="text-sm">
            グループに所属している住宅会社のイベントの予約情報を確認することが出来ます
          </p>
        </div>

        <div className="flex flex-col w-full bg-white grow p-5">
          <ReservationGroupSearchBar totalCounts={reservationItems.length} setKeyword={setKeyword} />
          <div className="flex flex-col grow">
            <PaginationItem
              totalPages={Math.ceil(reservationItems.length / 20)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            <div className="grow bg-white w-full p-1">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="bg-[#2fa8b5] text-sm text-white font-normal">会社名</th>
                    <th className="bg-[#2fa8b5] text-sm text-white font-normal w-[250px]">イベント</th>
                    <th className="bg-[#2fa8b5] text-sm text-white font-normal w-[80px]">流入元</th>
                    <th className="bg-[#2fa8b5] text-sm text-white font-normal w-[120px]">予約日時</th>
                    <th className="bg-[#2fa8b5] text-sm text-white font-normal w-[90px]">お客様名</th>
                    <th className="bg-[#2fa8b5] py-3 text-sm text-white font-normal">
                      住所<br />
                      メールアドレス<br />
                      連絡先電話番号<br />
                    </th>
                    <th className="bg-[#2fa8b5] text-sm text-white font-normal w-[120px]">申込完了日時</th>
                    <th className="bg-[#2fa8b5] text-sm text-white font-normal w-[80px]">備考欄</th>
                    <th className="bg-[#2fa8b5] text-sm text-white font-normal w-[80px]">お客様ID</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReservationItems.map((reservationItem, index) =>
                    <ReservationGroupListItem key={index} item={reservationItem} />
                  )}
                </tbody>
              </table>
            </div>

            <PaginationItem
              totalPages={Math.ceil(reservationItems.length / 20)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default ReservationGroupPage;