"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { FiMapPin } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { Button } from "@mui/material";

import EventCalendarPage from "./EventCalendarPage";
import Loading from "@/components/molecules/loading";
import HTMLContent from "@/components/atoms/HTMLContent";
import CustomSlider from "@/components/molecules/CustomSlider/CustomSlider";
import EventPublicBtn from "@/components/atoms/Button/EventPublicBtn";
import { IStatusProps } from "@/components/molecules/SideBar/EventStatusSideBar";
import GoogleMapFC from "@/components/atoms/GoogleMapFC";

import { eventHoldingPeriod } from "@/utils/convert";
import { IEvent, initialEvent } from "@/utils/types";

const EventPreviewPage: React.FC = () => {
  const { id, event_url } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<IEvent>(initialEvent);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eventStatus, setEventStatus] = useState<IStatusProps>({
    status: "非公開",
    isEmbed: false,
  })

  useEffect(() => {
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
  }, []);

  const {
    title, status, note, type, format,
    prefecture, address1, address2, hiddenAddress,
    eventDate, tag, feature, benefit,
    images, FPImages, mainIndex, propertyType
  } = event;

  const imgs = images?.split(",").map((img) => img.trim()) || [];
  const FPImgs = FPImages?.split(",").map((img) => img.trim()) || [];
  const webAddress = (prefecture || "") + (address1 || "") + (address2 || "");
  const mapAddress = webAddress + (hiddenAddress || "");
  const splitTags = tag?.split(",").map(item => item.trim()) || [];

  if (mainIndex !== -1 && mainIndex !== 0) {
    imgs.unshift(imgs.splice(mainIndex, 1)[0]);
  }

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <div className="bg-[#F3F4F6] w-full min-h-screen">
        {status === "非公開" && (
          <div className="fixed top-0 w-full z-50 bg-black bg-opacity-50 text-white p-4">
            <p>このイベントは非公開です。公開をするをクリックして公開しましょう。</p>
            <div className="absolute top-[10px] right-5 flex items-center gap-x-2">
              <Button variant="contained" href={`/events/${id}`} sx={{
                backgroundColor: "#bcbcbc",
                border: "1px solid #bcbcbc",
                borderRadius: "1px",
                padding: "5px 20px",
                fontSize: "14px",
                '&:hover': {
                  backgroundColor: "#bcbcbc"
                }
              }}
              >
                修正する
              </Button>
              <EventPublicBtn id={Number(id)} eventStatus={eventStatus} setEventStatus={setEventStatus} isBack />
            </div>
          </div>
        )}
        <div className="flex flex-col w-full max-w-[640px] bg-white mx-auto my-8 rounded-xl">
          <section>
            <CustomSlider imgs={imgs} />
            <div className="p-6">
              <h1 className="text-2xl font-bold my-3 text-black">{title}</h1>
              <p className="flex items-center mt-2">
                <FiMapPin className="mr-2 text-[#3B82F6]" />
                <span className="text-sm">{webAddress}</span>
              </p>
              {eventDate && (
                <p className="flex items-center mt-2">
                  <CiCalendar className="mr-2 text-lg text-[#3B82F6]" />
                  <span className="text-sm">
                    {eventHoldingPeriod(JSON.parse(eventDate))}
                  </span>
                </p>
              )}
            </div>
          </section>

          {eventDate && (
            <section className="mt-2 border-t-[1px] p-6 border-[#F3F4F6]" id="reservation">
              <h2 className="flex items-center text-lg font-bold">
                <MdOutlineCalendarMonth className="mr-2 text-xl text-[#3B82F6]" />
                <span>予約可能日時</span>
              </h2>
              <EventCalendarPage />
            </section>
          )}

          {feature && (
            <section className="mt-2 border-t-[1px] p-6 border-[#F3F4F6]">
              <h2 className="flex items-center text-lg font-bold">
                <Image src="/imgs/icons/star.png" width={18} height={18} alt="見どころ" />
                <span className="ml-2">見どころ</span>
              </h2>
              <div className="my-4 bg-[#FDF2F8] p-6 rounded-xl">
                <HTMLContent content={feature} />
              </div>
            </section>
          )}

          {benefit && (
            <section className="mt-2 border-t-[1px] p-6 border-[#F3F4F6]">
              <h2 className="flex items-center text-lg font-bold">
                <Image src="/imgs/icons/gift.png" width={18} height={18} alt="キャンペーン情報" />
                <span className="ml-2">キャンペーン情報</span>
              </h2>
              <div className="my-4 bg-[#FDF2F8] p-6 rounded-xl">
                <HTMLContent content={benefit} />
              </div>
            </section>
          )}

          {(feature || benefit) && (
            <section className="px-6 pb-4 w-full">
              <Link href="#reservation"
                className="block w-full max-w-[640px] font-bold text-center rounded bg-[#2563EB] text-white text-lg p-2 hover:opacity-90 transition-all duration-300 ease-out"
              >
                予約する
              </Link>
            </section>
          )}

          {splitTags.length > 0 && (
            <section className="mt-2 border-t-[1px] p-6 border-[#F3F4F6]">
              <h2 className="flex items-center text-lg font-bold">
                <IoIosInformationCircleOutline className="mr-2 text-2xl text-[#3B82F6]" />
                <span>イベントタグ</span>
              </h2>
              <div className="flex flex-wrap gap-2 my-4">
                {splitTags.map((splitTag, index) => (
                  <span className="flex items-center text-xs p-1 border-[1px] border-[#777] rounded" key={index}>
                    {splitTag}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="mt-2 border-t-[1px] p-6 border-[#F3F4F6]">
            <h2 className="flex items-center text-lg font-bold">
              <Image src="/imgs/icons/map.png" width={20} height={20} alt="マップ" />
              <span className="ml-2">マップ</span>
            </h2>
            <div className="my-4">
              <GoogleMapFC width={592} height={320} address={mapAddress} />
              <p className="flex items-center text-sm mt-2">
                <FiMapPin className="mr-2 text-[#3B82F6]" /><span>{webAddress}</span>
              </p>
            </div>
          </section>

          {/* Floor Plan Images */}
          {FPImgs.length > 0 && (
            <section>
              <CustomSlider imgs={FPImgs} />
            </section>
          )}

          <section className="mt-2 border-t-[1px] p-6 border-[#F3F4F6]">
            <h2 className="flex items-center text-lg font-bold">
              <IoIosInformationCircleOutline className="mr-2 text-2xl text-[#3B82F6]" />
              <span>概要</span>
            </h2>
            <div className="my-4">
              <table className="w-full border-collapse border-y border-gray-300 rounded">
                <tbody>
                  <tr>
                    <th className="w-52 font-bold p-4 text-sm bg-gray-100 border-y border-gray-300">
                      ステータス
                    </th>
                    <td className="p-4 text-sm border-y border-gray-300">{title}</td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold p-4 text-sm bg-gray-100 border-y border-gray-300">
                      開催日時
                    </th>
                    <td className="p-4 text-sm border-y border-gray-300">
                      {eventHoldingPeriod(JSON.parse(eventDate))}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold p-4 text-sm bg-gray-100 border-y border-gray-300">
                      開催場所
                    </th>
                    <td className="p-4 text-sm border-y border-gray-300">{webAddress}</td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold p-4 text-sm bg-gray-100 border-y border-gray-300">
                      種別
                    </th>
                    <td className="p-4 text-sm border-y border-gray-300">{format}</td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold p-4 text-sm bg-gray-100 border-y border-gray-300">
                      種類
                    </th>
                    <td className="p-4 text-sm border-y border-gray-300">{type}</td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold p-4 text-sm bg-gray-100 border-y border-gray-300">
                      会社ホームページ
                    </th>
                    <td className="p-4 text-sm border-y border-gray-300">
                      <Link href="https://smile-builders-hiraya.com/" className="text-[#2563EB] no-underline">
                        https://smile-builders-hiraya.com/
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <footer className="bg-[#2563EB] rounded-b-xl">
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
        </div >
      </div>
    )
  );
};

export default EventPreviewPage;
