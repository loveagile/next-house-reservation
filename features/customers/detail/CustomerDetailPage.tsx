"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


import Button from "@mui/material/Button";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import ReservationListItem from "@/components/organisms/ReservationListItem/ReservationListItem";
import { IReservationListItem } from "@/components/organisms/ReservationListItem/ReservationListItem";

import { ICustomer } from "@/utils/types";

import "./CustomerDetailPage.css";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<ICustomer>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reservationItems, setReservationItems] = useState<IReservationListItem[]>([]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/customers/detail", { id });
      if (res.status === 200) setCustomer(res.data[0]);
      const reservations = await axios.post("/api/reservations/view", { customerId: id });
      if (reservations.status === 200) setReservationItems(reservations.data);
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
            <Button
              className="customer_edit_btn flex items-center"
              href={`/customers/${id}/edit`}
              variant="contained">
              <ModeEditRoundedIcon className="mr-1" /><span className="flex items-center">編集</span>
            </Button>
          </div>
        </div>
        <div className="bg-white w-full p-5">
          <div>
            <table className="w-full customer_table">
              <tbody>
                <tr>
                  <th>ステータス</th>
                  <td>{customer?.status}</td>
                </tr>
                <tr>
                  <th>顧客名</th>
                  <td>{customer?.lastName}{customer?.firstName}（{customer?.seiName}{customer?.meiName}）</td>
                </tr>
                <tr>
                  <th>郵便番号</th>
                  <td>{customer?.zipCode}</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>{customer?.prefecture}{customer?.city}{customer?.street}{customer?.building}</td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  <td>{customer?.phone}</td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  <td>{customer?.email}</td>
                </tr>
                <tr>
                  <th>生年月日</th>
                  <td>{birthdayStr}</td>
                </tr>
                <tr>
                  <th>社内向け備考</th>
                  <td>{customer?.note}</td>
                </tr>
                <tr>
                  <th>質問・ご連絡事項</th>
                  <td>{customer?.memo}</td>
                </tr>
                <tr>
                  <th>担当スタッフ</th>
                  <td>{customer?.employee}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <p className="text-[15px]">予約来場履歴</p>
            <table className="w-full reservation_table my-2">
              <thead>
                <tr>
                  <th className="w-[90px]">予約詳細</th>
                  <th className="w-[135px]">予約日時</th>
                  <th>お客様情報</th>
                  <th>イベント名</th>
                  <th className="w-[80px]">流入元</th>
                  <th className="w-[120px]">ステータス</th>
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
            <table className="w-full request_table my-2">
              <thead>
                <tr>
                  <th className="w-[90px]"></th>
                  <th className="w-[135px]">受付日時</th>
                  <th>お客様名</th>
                  <th>住所 / 電話番号</th>
                  <th className="w-[80px]">備考欄</th>
                  <th className="w-[120px]">ステータス</th>
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
