"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FaMapMarker, FaCalendar } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

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
  const { id } = useParams();
  const [event, setEvent] = useState<IEvent>(initialEvent);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eventStatus, setEventStatus] = useState<IStatusProps>({
    status: "非公開",
    isEmbed: false,
    isIemiru: false,
  })

  useEffect(() => {
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
  }, []);

  const {
    title, status, note, type, format,
    prefecture, address1, address2, hiddenAddress,
    eventDate, tag, feature, benefit,
    images, FPImages, propertyType
  } = event;

  const imgs = images?.split(",").map((img) => img.trim()) || [];
  const FPImgs = FPImages?.split(",").map((img) => img.trim()) || [];
  const webAddress = (prefecture || "") + (address1 || "") + (address2 || "");
  const mapAddress = webAddress + (hiddenAddress || "");
  const splitTags = tag?.split(",").map(item => item.trim()) || [];

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <>
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
        <div className="flex flex-col w-full max-w-[640px] mx-auto mt-14">
          <section>
            <CustomSlider imgs={imgs} />
            <div className="p-2">
              <h1 className="text-xl font-bold my-2">{title}</h1>
              <p className="flex items-center">
                <FaMapMarker className="mr-1" />
                <span className="text-sm">{webAddress}</span>
              </p>
              <p className="flex items-center mt-1">
                <FaCalendar className="mr-1" />
                <span className="text-sm">
                  {eventHoldingPeriod(JSON.parse(eventDate))}
                </span>
              </p>
            </div>
          </section>

          <section className="mt-10" id="reservation">
            <h2 className="flex justify-center items-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
              <BsFillCheckCircleFill className="mr-2" />
              <span>予約可能日時</span>
            </h2>
            <EventCalendarPage />
          </section>

          {feature && (
            <section className="mt-10">
              <h2 className="flex justify-center items-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
                <BsFillCheckCircleFill className="mr-2" />
                <span>見どころ</span>
              </h2>
              <div className="my-4">
                <HTMLContent content={feature} />
              </div>
            </section>
          )}

          {splitTags.length > 0 && (
            <section className="mt-10">
              <h2 className="flex justify-center items-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
                <BsFillCheckCircleFill className="mr-2" />
                <span>イベントタグ</span>
              </h2>
              <div className="flex gap-x-2 my-4">
                {splitTags.map((splitTag, index) => (
                  <span className="flex items-center text-[13px] p-1 border-[1px] border-[#777] rounded" key={index}>
                    <AiFillHome className="text-lg mr-1" />{splitTag}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="mt-10">
            <h2 className="flex justify-center items-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
              <BsFillCheckCircleFill className="mr-2" />
              <span>マップ</span>
            </h2>
            <div className="my-4">
              <GoogleMapFC width={640} height={420} address={mapAddress} />
              <p className="flex items-center text-sm mt-2">
                <AiFillHome className="text-lg mr-1" /><span>{webAddress}</span>
              </p>
            </div>
          </section>

          {benefit && (
            <section className="mt-10">
              <h2 className="flex justify-center items-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
                <BsFillCheckCircleFill className="mr-2" />
                <span>キャンペーン情報</span>
              </h2>
              <div className="my-4">
                <HTMLContent content={benefit} />
              </div>
            </section>
          )}

          {/* Floor Plan Images */}
          {FPImgs.length > 0 && (
            <section>
              <CustomSlider imgs={FPImgs} />
            </section>
          )}

          <section className="my-10 w-full">
            <Button href="#reservation" sx={{
              width: "100%",
              maxWidth: "640px",
              fontWeight: "600",
              backgroundColor: "#E7625F",
              color: "white",
              fontSize: "18px",
              padding: "8px",
              '&:hover': {
                backgroundColor: "#E7625F",
                opacity: 0.8,
              }
            }}>予約する</Button>
          </section>

          <section className="mt-10">
            <h2 className="flex justify-center items-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
              <BsFillCheckCircleFill className="mr-2" />
              <span>概要</span>
            </h2>
            <div className="my-4">
              <table className="w-full border-collapse border-y border-gray-300">
                <tbody>
                  <tr>
                    <th className="w-52 font-bold py-4 text-sm bg-gray-100 text-center border-y border-gray-300">
                      ステータス
                    </th>
                    <td className="py-4 text-sm text-center border-y border-gray-300">{title}</td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold py-4 text-sm bg-gray-100 text-center border-y border-gray-300">
                      開催日時
                    </th>
                    <td className="py-4 text-sm text-center border-y border-gray-300">
                      {eventHoldingPeriod(JSON.parse(eventDate))}
                    </td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold py-4 text-sm bg-gray-100 text-center border-y border-gray-300">
                      開催場所
                    </th>
                    <td className="py-4 text-sm text-center border-y border-gray-300">{webAddress}</td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold py-4 text-sm bg-gray-100 text-center border-y border-gray-300">
                      種別
                    </th>
                    <td className="py-4 text-sm text-center border-y border-gray-300">{format}</td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold py-4 text-sm bg-gray-100 text-center border-y border-gray-300">
                      種類
                    </th>
                    <td className="py-4 text-sm text-center border-y border-gray-300">{type}</td>
                  </tr>
                  <tr>
                    <th className="w-52 font-bold py-4 text-sm bg-gray-100 text-center border-y border-gray-300">
                      会社ホームページ
                    </th>
                    <td className="py-4 text-sm text-center border-y border-gray-300">
                      <Link href="https://smile-builders-hiraya.com/" className="text-blue-600 underline">
                        https://smile-builders-hiraya.com/
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </section>
        </div >
      </>
    )
  );
};

export default EventPreviewPage;
