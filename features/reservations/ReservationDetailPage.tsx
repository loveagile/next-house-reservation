"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import { Button } from "@mui/material";

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
  const { eventId, type, format, title,
    reserveDate, startTime, note, memo, employee,
    lastName, firstName, seiName, meiName,
    zipCode, prefecture, city, street, building,
    phone, email,
  } = reserveAtom;

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
          <div className="w-full flex justify-center">
            <Button variant="contained" href={`/reservations/${id}/edit`} sx={{
              textAlign: "center",
              fontSize: "14px",
              padding: "5px 25px",
              borderRadius: "1px",
            }}>
              編集
            </Button >
          </div>
        </div>
        <div className="bg-white grow w-full p-5">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">イベント名</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <span className="text-[10px] text-white bg-black px-2 py-[2px]">
                    {type}
                  </span>
                  <span className="text-xs border-[1px] border-[#737373] px-2 py-[2px] ml-1">
                    {format}
                  </span>
                  <p className="mt-2">
                    <Link href={`/events/${eventId}`} className="text-m-blue underline">
                      {title}
                    </Link>
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">予約日時</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">{formatSlashSplitDateString(reserveDate)} {startTime}</p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">質問・ご連絡事項</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">{note}</p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">社内メモ</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">{memo}</p>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full mt-5 text-sm">
            <tbody>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">お客様名</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">
                    {lastName}{firstName}（{seiName}{meiName}）
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">郵便番号</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">
                    〒{zipCode}
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">住所</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">
                    {prefecture}{city}{street}{building}
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">電話番号</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">{phone}</p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">メールアドレス</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">{email}</p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">配信可否</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">配信可</p>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full mt-5 text-sm">
            <tbody>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">担当者名</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">
                    {employee}
                  </p>
                </td>
              </tr>
              <tr>
                <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">予約申込日時</th>
                <td className="px-3 py-2 border-[#ddd]">
                  <p className="text-sm">
                    {receptionDate} {receptionTime}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-5">
            <p className="text-[15px]">自動送信メール履歴</p>
            <table className="w-full mt-2 text-sm">
              <tbody>
                <tr>
                  <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">担当者名</th>
                  <td className="px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">ステータス</td>
                  <td className="px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">不達理由</td>
                </tr>
                <tr>
                  <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">予約完了メール</th>
                  <td className="px-3 py-2 border-[#ddd]">未送信</td>
                  <td className="px-3 py-2 border-[#ddd]"></td>
                </tr>
                <tr>
                  <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">前日リマインドメール</th>
                  <td className="px-3 py-2 border-[#ddd]">未送信</td>
                  <td className="px-3 py-2 border-[#ddd]"></td>
                </tr>
                <tr>
                  <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">当日リマインドメール</th>
                  <td className="px-3 py-2 border-[#ddd]">未送信</td>
                  <td className="px-3 py-2 border-[#ddd]"></td>
                </tr>
                <tr>
                  <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">時間変更メール</th>
                  <td className="px-3 py-2 border-[#ddd]">未送信</td>
                  <td className="px-3 py-2 border-[#ddd]"></td>
                </tr>
                <tr>
                  <th className="w-[200px] px-3 py-2 bg-[#f7f7f7] font-medium text-left border-[#ddd]">キャンセルメール</th>
                  <td className="px-3 py-2 border-[#ddd]">未送信</td>
                  <td className="px-3 py-2 border-[#ddd]"></td>
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
