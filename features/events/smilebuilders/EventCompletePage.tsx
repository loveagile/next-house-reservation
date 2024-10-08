"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@mui/material";

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
  const { id } = useParams();
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
        }
        setIsLoading(false);
      };
      fetchEventDetail();

    } else {
      router.push(`/smilebuilders/events/${id}/`);
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
      <section className="flex flex-col w-full max-w-[640px] mx-auto">
        {/* Event Information */}
        <div className="mt-5">
          <div className="w-full">
            <p className="bg-[#c8c8c8] text-center text-white p-1 text-sm">
              予約完了です！
            </p>
            <ol className="flex justify-between relative list-none m-5 before:content-[''] before:absolute before:block before:bg-[#c8c8c8] before:top-5 before:h-[3px] before:w-full">
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-[#c8c8c8] border-[2px] border-solid border-[#c8c8c8] rounded-full bg-white">1</li>
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-[#c8c8c8] border-[2px] border-solid border-[#c8c8c8] rounded-full bg-white">2</li>
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-[#c8c8c8] border-[2px] border-solid border-[#c8c8c8] rounded-full bg-white">3</li>
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-white border-[2px] border-solid border-[#448ACA] rounded-full bg-[#448ACA]">
                <FaCheck />
              </li>
            </ol>
          </div>

          <div className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:block after:w-full after:h-full after:bg-[rgba(0,0,0,0.6)]">
            <Image src={mainImg} width={640} height={360} alt="イベント画像" />
            <div className="absolute z-10 bottom-0 text-white p-6">
              <h1 className=" text-xl mb-3 font-bold underline">{title}</h1>
              <p className="text-sm">{type}</p>
              <p className="text-sm">{webAddress}</p>
            </div>
          </div>

          <div className="w-full flex">
            <dl className="w-[50%] border-[1px] px-3 py-2">
              <dt className="text-xs">予約希望日</dt>
              <dd className="mt-[2px]">{formatDateToJapaneseString(new Date(reserveDateTime.reserveDate))}</dd>
            </dl>
            <dl className="w-[50%] border-[1px] border-l-0 px-3 py-2">
              <dt className="text-xs">時間</dt>
              <dd className="mt-[2px]">{reserveDateTime?.startTime}</dd>
            </dl>
          </div>
        </div>

        <div className="px-2 py-10">
          <p className="text-[#E7625F] text-center text-xl font-bold my-4">
            予約が完了しました。
          </p>

          <p className="text-sm mt-3">ご登録いただきましたメールアドレスに確認メールをお送りいたしましたので、ご確認ください。</p>
          <p className="text-sm mt-3">申し込み内容を変更したい・行けなくなった場合は担当者へご連絡くださいますようお願いいたします。</p>
          <p className="text-sm mt-3">※1日以内に予約完了メールが届かない場合は、受信拒否設定などブロックされている場合がありますので主催者へ直接お電話にてお問合せください。（TEL：
            <Link href="tel:0995-55-8900" className="text-link-color underline" >0995-55-8900</Link>）
          </p>

          {/* Register Button */}
          <div className="w-full mt-10 flex justify-center">
            <Button
              href="/reservations/list"
              variant="contained"
              sx={{
                width: "80%",
                padding: "2px 30px",
                fontSize: "22px",
                borderRadius: "1px",
                backgroundColor: "#777",
                '&:hover': {
                  backgroundColor: "#777",
                  opacity: 0.9,
                }
              }}
            >
              トップページに戻る
            </Button>
          </div>
        </div>
      </section >
    )
  );
};

export default EventCompletePage;
