"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@mui/material";

import { IoCheckmarkSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

import Loading from "@/components/molecules/loading";
import { IEvent, initialEvent } from "@/utils/types";
import { formatDateToJapaneseString } from "@/utils/convert";

interface IEventReserveForm {
  reserveDate: string;
  startTime: string;
  endTime: string;
}

interface ICustomerForm {
  lastName: string;
  firstName: string;
  seiName: string;
  meiName: string;
  zipCode: string;
  prefecture: string;
  city: string;
  street: string;
  building?: string;
  phone: string;
  email: string;
  note?: string;
}

const initialCustomer: ICustomerForm = {
  lastName: "",
  firstName: "",
  seiName: "",
  meiName: "",
  zipCode: "",
  prefecture: "",
  city: "",
  street: "",
  building: "",
  phone: "",
  email: "",
  note: "",
}

const EventCompletePage: React.FC = () => {
  const { id, event_url } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<IEvent>(initialEvent);
  const [reserveDateTime, setReserveDateTime] = useState<IEventReserveForm>({
    reserveDate: new Date().toString(),
    startTime: "00:00",
    endTime: "23:30",
  });

  useEffect(() => {
    const eventReserveData = localStorage.getItem("eventReserveData");
    if (eventReserveData) {
      setReserveDateTime(JSON.parse(eventReserveData));

      const fetchEventDetail = async () => {
        setIsLoading(true);
        const res = await axios.post("/api/events/detail", { id });
        if (res.status === 200) {
          const data = res.data[0];
          setEvent(data);

          const userID = data.userID;
          const { data: user } = await axios.post("/api/auth/detail", {
            id: userID,
          });
          if (user.eventURL !== event_url) {
            router.push("/404");
          }
        } else {
          router.push("/404");
        }

        setIsLoading(false);
      };
      fetchEventDetail();

    } else {
      router.push(`/${event_url}/events/${id}/`);
    }
  }, []);

  const {
    title, type,
    prefecture, address1, address2,
    images, mainIndex,
  } = event;

  const mainImg = images?.split(",").map((img) => img.trim())[mainIndex] || "/imgs/events/no_image.png";
  const webAddress = (prefecture || "") + (address1 || "") + (address2 || "");

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <div className="bg-[#F3F4F6] w-full min-h-screen">
        <div className="flex flex-col w-full max-w-[640px] mx-auto my-8">
          {/* Event Information */}

          <div>
            <div className="w-full">
              <p className="bg-[#D1D5DB] text-center text-black p-1 text-sm">
                予約完了です！
              </p>
              <div className="flex items-center justify-center my-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold">
                  1
                </div>
                <div className="h-1 w-16 bg-[#3B82F6]"></div>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold">
                  2
                </div>
                <div className="h-1 w-16 bg-[#3B82F6]"></div>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold">
                  3
                </div>
                <div className="h-1 w-16 bg-[#3B82F6]"></div>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold">
                  <IoCheckmarkSharp />
                </div>
              </div>
            </div>

            <div className="relative rounded-xl">
              <Image src={mainImg} className="rounded-xl" width={640} height={360} alt="イベント画像" />
            </div>

            <div className="bg-[#F9FAFB] p-6 my-8 rounded-xl">
              <h2 className="text-lg text-black font-bold">予約内容</h2>
              <p className="border-b-[1px] border-[#E5E7EB] py-3">
                <span className="inline-block w-[100px]">イベント名</span>{title}
              </p>
              <p className="border-b-[1px] border-[#E5E7EB] py-3">
                <span className="inline-block w-[100px]">開催場所</span>{webAddress}
              </p>
              <p className="border-b-[1px] border-[#E5E7EB] py-3">
                <span className="inline-block w-[100px]">予約日</span>
                {formatDateToJapaneseString(new Date(reserveDateTime.reserveDate))}
              </p>
              <p className="pt-3">
                <span className="inline-block w-[100px]">予約時間</span>
                {reserveDateTime?.startTime}
              </p>
            </div>
          </div>

          <div className="px-2">
            <p className="text-[#EF4444] text-center text-2xl font-bold my-4">
              予約が完了しました。
            </p>

            <p className="text-center mt-2">ご登録いただきましたメールアドレスに確認メールをお送りいたしましたので、ご確認ください。</p>
            <p className="text-center mt-2">申し込み内容を変更したい・行けなくなった場合は担当者へご連絡くださいますようお願いいたします。</p>
            <p className="text-center text-sm mt-2">※1日以内に予約完了メールが届かない場合は、受信拒否設定などブロックされている場合がありますので主催者へ直接お電話にてお問合せください。
              （TEL：<Link href="tel:0995-55-8900" className="text-link-color no-underline">0995-55-8900</Link>）
            </p>

            {/* Register Button */}
            <div className="w-full mt-10 flex justify-center">
              <Link href="https://smile-builders-hiraya.com/"
                className="w-full max-w-[640px] text-center font-medium bg-[#4B5563] text-white text-lg px-2 py-2 rounded transition-all duration-300 ease-out hover:opacity-90"
              >
                トップページに戻る
              </Link>
            </div>
          </div>

          <footer className="bg-[#2563EB] rounded-b-xl mt-4">
            <div className="flex items-center justify-center p-10 w-full max-w-[760px] text-white text-sm m-auto">
              <div className="leading-5">
                <Link href="https://smile-builders-hiraya.com/" className="text-xl font-bold block mb-3">
                  スマイルビルダーズ‐姶良総合住宅展示場-
                </Link>
                <p className="text-center">〒899-5432</p>
                <p className="text-center">鹿児島県姶良市加治木町木田2511-1</p>
              </div>
            </div>
          </footer>
        </div>
      </div >
    )
  );
};

export default EventCompletePage;
