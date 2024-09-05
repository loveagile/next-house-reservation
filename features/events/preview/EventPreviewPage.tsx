"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';

import Loading from "@/components/molecules/loading";
import HTMLContent from "@/components/atoms/HTMLContent";
import CustomSlider from "@/components/molecules/CustomSlider/CustomSlider";
import EventPublicBtn from "@/components/atoms/Button/EventPublicBtn";
import { IStatusProps } from "@/components/molecules/Bar/DetailSideBar";
import GoogleMapFC from "@/components/atoms/GoogleMapFC";

import { formatDateToJapaneseString } from "@/utils/convert";
import { IEvent, initialEvent } from "@/utils/types";
import { IEventDateTime } from "@/utils/types";
import "./EventPreviewPage.css";

const EventPreviewPage: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<IEvent>(initialEvent);
  const [eventDate, setEventDate] = useState<IEventDateTime[]>([]);
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
        setEventDate(JSON.parse(data.eventDate));
      }
      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  const {
    title, status, note, type, format,
    prefecture, address1, address2, hiddenAddress,
    images, FPImages, tag, feature, benefit,
    propertyType
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
            <div className="absolute top-2 right-5 z-50 flex items-center gap-x-2">
              <Button className="update_btn" variant="contained"
                href={`/events/${id}`}
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
                <FmdGoodIcon className="mr-1" />
                <span className="text-sm">{webAddress}</span>
              </p>
              <p className="flex items-center mt-1">
                <CalendarTodayRoundedIcon className="mr-1" />
                {eventDate && (
                  <span className="text-sm">
                    {formatDateToJapaneseString(new Date(eventDate[0].date))}
                    {eventDate.length > 1 && (
                      `〜${formatDateToJapaneseString(new Date(eventDate[eventDate.length - 1].date))}`
                    )}
                  </span>
                )}
              </p>
            </div>
          </section>

          <section className="mt-10" id="reservation">
            <h2 className="text-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
              <CheckCircleIcon className="mr-2" />
              <span>予約可能日時</span>
            </h2>

          </section>

          {feature && (
            <section className="mt-10">
              <h2 className="text-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
                <CheckCircleIcon className="mr-2" />
                <span>見どころ</span>
              </h2>
              <div className="my-4">
                <HTMLContent content={feature} />
              </div>
            </section>
          )}

          {splitTags.length > 0 && (
            <section className="mt-10">
              <h2 className="text-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
                <CheckCircleIcon className="mr-2" />
                <span>イベントタグ</span>
              </h2>
              <div className="flex gap-x-2 my-4">
                {splitTags.map((splitTag, index) => (
                  <span className="flex items-center text-[13px] p-1 border-[1px] border-[#777] rounded" key={index}>
                    <HomeIcon className="mr-1" />{splitTag}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="mt-10">
            <h2 className="text-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
              <CheckCircleIcon className="mr-2" />
              <span>マップ</span>
            </h2>
            <div className="my-4">
              <GoogleMapFC width={640} height={420} address={mapAddress} />
              <p className="flex items-center text-sm mt-2">
                <HomeIcon className="mr-1" /><span>{webAddress}</span>
              </p>
            </div>
          </section>

          {benefit && (
            <section className="mt-10">
              <h2 className="text-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
                <CheckCircleIcon className="mr-2" />
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
            <Button
              className="reserve_btn"
              href="#reservation"
            >予約する</Button>
          </section>

          <section className="mt-10">
            <h2 className="text-center text-xl font-bold border-y-[1px] border-[#ccc] p-3">
              <CheckCircleIcon className="mr-2" />
              <span>概要</span>
            </h2>
            <div className="my-4">
              <table className="w-full summary_table">
                <tbody>
                  <tr>
                    <th>ステータス</th>
                    <td>{title}</td>
                  </tr>
                  <tr>
                    <th>開催日時</th>
                    <td>
                      {eventDate && (
                        <span className="text-sm">
                          {formatDateToJapaneseString(new Date(eventDate[0].date))}
                          {eventDate.length > 1 && (
                            `〜${formatDateToJapaneseString(new Date(eventDate[eventDate.length - 1].date))}`
                          )}
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>開催場所</th>
                    <td>{webAddress}</td>
                  </tr>
                  <tr>
                    <th>種別</th>
                    <td>{format}</td>
                  </tr>
                  <tr>
                    <th>種類</th>
                    <td>{type}</td>
                  </tr>
                  <tr>
                    <th>会社ホームページ</th>
                    <td>
                      <Link href="https://smile-builders-hiraya.com/"
                        className="text-link-color"
                      >
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
