"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import CancelBtn from "@/components/atoms/Button/CancelBtn";
import ChangeDateBtn from "@/components/atoms/ChangeDateBtn";

import "./ReservationDetailPage.css";
import Loading from "@/components/molecules/loading";

import { ReserveAtom } from "@/lib/recoil/ReserveAtom";
import { formatSlashSplitDateString, formatReservationDateToJapaneseString } from "@/utils/convert";

const ReservationDetailPage: React.FC = () => {
  const { id } = useParams();
  const [reserveAtom, setReserveAtom] = useRecoilState(ReserveAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservationDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/reservations/detail", { id });
      if (res.status === 200) {
        setReserveAtom(res.data[0]);
      }
      setIsLoading(false);
    };
    fetchReservationDetail();
  }, [id]);

  const { date: receptionDate, time: receptionTime } = formatReservationDateToJapaneseString(reserveAtom.receptionAt);

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-3 font-bold ">
            予約詳細
          </h1>
          <p className="text-sm">
            お客様の予約情報「詳細画面」です。予約情報の確認・承認作業・キャンセル処理などが行なえます。<br></br>
            流入元：cms
          </p>
          <div>
            {/* <ChangeDateBtn reserveDate={"reserveDate"} startTime={""} id={1} /> */}
            {/* <CancelBtn setCurrentStatus={(false) => void} id={1} /> */}
          </div>
        </div>
        <div className="bg-white grow w-full p-5">
          <table className="w-full">
            <tbody>
              <tr>
                <th className="w-[200px]">イベント名</th>
                <td>
                  <span className="text-[10px] text-white bg-black px-2 py-[2px]">
                    {reserveAtom.type}
                  </span>
                  <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
                    {reserveAtom.format}
                  </span>
                  <p className="mt-2 text-[15px]">
                    <Link href={`/events/${reserveAtom.eventId}`} className="text-m-blue underline">
                      {reserveAtom.title}
                    </Link>
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px]">予約日時</th>
                <td>
                  <p className="text-sm">{formatSlashSplitDateString(reserveAtom.reserveDate)} {reserveAtom.startTime}</p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px]">質問・ご連絡事項</th>
                <td>
                  <p className="text-sm">{reserveAtom.note}</p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px]">社内メモ</th>
                <td>
                  <p className="text-sm">{reserveAtom.memo}</p>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full mt-5">
            <tbody>
              <tr>
                <th className="w-[200px]">お客様名</th>
                <td>
                  <p className="text-sm">
                    {reserveAtom.lastName}{reserveAtom.firstName}（{reserveAtom.seiName}{reserveAtom.meiName}）
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px]">郵便番号</th>
                <td>
                  <p className="text-sm">
                    〒{reserveAtom.zipCode}
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px]">住所</th>
                <td>
                  <p className="text-sm">
                    {reserveAtom.prefecture}{reserveAtom.city}{reserveAtom.street}{reserveAtom.building}
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px]">電話番号</th>
                <td>
                  <p className="text-sm">{reserveAtom.phone}</p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px]">メールアドレス</th>
                <td>
                  <p className="text-sm">{reserveAtom.email}</p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px]">配信可否</th>
                <td>
                  <p className="text-sm">配信可</p>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full mt-5">
            <tbody>
              <tr>
                <th className="w-[200px]">担当者名</th>
                <td>
                  <p className="text-sm">
                    {reserveAtom.employee}
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px]">予約申込日時</th>
                <td>
                  <p className="text-sm">
                    {receptionDate} {receptionTime}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-5">
            <p className="text-[15px]">自動送信メール履歴</p>
            <table className="w-full mt-2">
              <tbody>
                <tr>
                  <th className="w-[200px]">担当者名</th>
                  <td className="top_td">ステータス</td>
                  <td className="top_td">不達理由</td>
                </tr>
                <tr>
                  <th className="w-[200px]">予約完了メール</th>
                  <td>未送信</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="w-[200px]">前日リマインドメール</th>
                  <td>未送信</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="w-[200px]">当日リマインドメール</th>
                  <td>未送信</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="w-[200px]">時間変更メール</th>
                  <td>未送信</td>
                  <td></td>
                </tr>
                <tr>
                  <th className="w-[200px]">キャンセルメール</th>
                  <td>未送信</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <EditBackBtn linkUrl="/reservations/list" className="mt-4" />
      </div>
    )
  );
};

export default ReservationDetailPage;
