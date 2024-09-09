"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import Button from "@mui/material/Button";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import Loading from "@/components/molecules/loading";
import ReservationListItem, { IReservationListItem } from "@/components/organisms/ReservationListItem/ReservationListItem";
import { ICustomer } from "@/utils/types";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<ICustomer>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reservationItems, setReservationItems] = useState<IReservationListItem[]>([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setIsLoading(true);

      const res = await axios.post("/api/customers/detail", { id });
      if (res.status === 200) {
        setCustomer(res.data[0]);
      }

      const reservations = await axios.post("/api/reservations/view", { customerId: id });
      if (reservations.status === 200) {
        setReservationItems(reservations.data);
      }
      setIsLoading(false);
    }
    fetchCustomerData();
  }, [])

  let birthdayStr = "";
  if (customer?.birthYear !== -1 && customer?.birthMonth !== -1 && customer?.birthDate !== -1) {
    birthdayStr = `${customer?.birthYear}-${customer?.birthMonth.toString().padStart(2, "0")}-${customer?.birthDate.toString().padStart(2, "0")}`;
  }

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] mb-2 text-xl p-0 pl-2 font-bold ">
            顧客情報の詳細
          </h1>
          <p className="text-sm">予約履歴情報など、顧客の詳細データが確認できます。</p>
          <div className="flex justify-center mt-2">
            <Button href={`/customers/${id}/edit`} variant="contained" sx={{
              display: "flex",
              alignItems: "center",
              paddingTop: "8px",
              borderRadius: "1px",
            }}>
              <FaPencilAlt className="text-sm" />
              <span className="ml-[6px]">編集</span>
            </Button>
          </div>
        </div>
        <div className="bg-white w-full p-5">
          <div>
            <table className="w-full">
              <tbody>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">ステータス</th>
                  <td className="px-3 py-2 text-sm">{customer?.status}</td>
                </tr>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">顧客名</th>
                  <td className="px-3 py-2 text-sm">{customer?.lastName}{customer?.firstName}（{customer?.seiName}{customer?.meiName}）</td>
                </tr>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">郵便番号</th>
                  <td className="px-3 py-2 text-sm">{customer?.zipCode}</td>
                </tr>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">住所</th>
                  <td className="px-3 py-2 text-sm">{customer?.prefecture}{customer?.city}{customer?.street}{customer?.building}</td>
                </tr>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">電話番号</th>
                  <td className="px-3 py-2 text-sm">{customer?.phone}</td>
                </tr>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">メールアドレス</th>
                  <td className="px-3 py-2 text-sm">{customer?.email}</td>
                </tr>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">生年月日</th>
                  <td className="px-3 py-2 text-sm">{birthdayStr}</td>
                </tr>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">社内向け備考</th>
                  <td className="px-3 py-2 text-sm">{customer?.note}</td>
                </tr>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">質問・ご連絡事項</th>
                  <td className="px-3 py-2 text-sm">{customer?.memo}</td>
                </tr>
                <tr>
                  <th className="w-[220px] font-medium p-2 text-sm text-left bg-[#f7f7f7]">担当スタッフ</th>
                  <td className="px-3 py-2 text-sm">{customer?.employee}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <p className="text-[15px]">予約来場履歴</p>
            <table className="w-full my-2">
              <thead>
                <tr className="text-sm">
                  <th className="bg-[#2fa8b5] p-3 text-white w-[90px]">予約詳細</th>
                  <th className="bg-[#2fa8b5] p-3 text-white w-[135px]">予約日時</th>
                  <th className="bg-[#2fa8b5] p-3 text-white">お客様情報</th>
                  <th className="bg-[#2fa8b5] p-3 text-white">イベント名</th>
                  <th className="bg-[#2fa8b5] p-3 text-white w-[80px]">流入元</th>
                  <th className="bg-[#2fa8b5] p-3 text-white w-[120px]">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {reservationItems.map((reservationItem, index) => (
                  <ReservationListItem key={index} values={reservationItem} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <p className="text-[15px]">お問合せ・資料請求履歴</p>
            <table className="w-full my-2">
              <thead>
                <tr className="text-sm">
                  <th className="bg-[#2fa8b5] p-3 text-white w-[90px]"></th>
                  <th className="bg-[#2fa8b5] p-3 text-white w-[135px]">受付日時</th>
                  <th className="bg-[#2fa8b5] p-3 text-white">お客様名</th>
                  <th className="bg-[#2fa8b5] p-3 text-white">住所 / 電話番号</th>
                  <th className="bg-[#2fa8b5] p-3 text-white w-[80px]">備考欄</th>
                  <th className="bg-[#2fa8b5] p-3 text-white w-[120px]">ステータス</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
        </div>
        <EditBackBtn className="mt-4" linkUrl="/customers/list" />
      </div >
    )
  )
}
