"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailBackBtn from "@/components/atoms/DetailBackBtn";
import DeleteBtn from "@/components/atoms/DeleteBtn";

import Image from "next/image";

import { getReservationPeriod, eventDateTimeSplit } from "@/utils/convert";
import { IEventDateTime } from "@/lib/recoil/EventDateAtom";
import EditBtn from "@/components/atoms/EditBtn";
import { useRecoilState } from "recoil";
import { EventAtom } from "@/lib/recoil/EventAtom";
import Loading from "@/components/molecules/Loading/loading";
import NoInputLabel from "@/components/atoms/NoInputLabel";
import ItemField from "@/components/molecules/ItemField/ItemField";
import DetailSideBar from "@/components/molecules/DetailSideBar/DetailSideBar";

import "./EventDetailPage.css";
import HTMLContent from "@/components/atoms/HTMLContent";
import CheckBox from "@/components/molecules/CheckBox/CheckBox";

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

const EventDetailPage: React.FC = () => {
  const { id } = useParams();
  const [eventAtom, setEventAtom] = useRecoilState(EventAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) setEventAtom(res.data[0]);
      setChecked(res.data[0].priority);
      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  useEffect(() => {
    console.log(checked);
    const setPriority = async () => {
      await axios.post("/api/events/update", {
        id,
        field_name: "priority",
        field_value: Number(checked),
      });
    };
    setPriority();
  }, [checked]);

  let eventDates: IEventDateTime[] = [];

  if (eventAtom.eventDate) {
    const saveDates = eventAtom.eventDate.split(",").map((date) => date.trim());
    eventDates = saveDates.map((saveDate) => eventDateTimeSplit(saveDate));
  }

  const imgs = eventAtom.imgUrl
    ? eventAtom.imgUrl.split(",").map((img) => img.trim())
    : [];

  const floorImgs = eventAtom.floorImgs
    ? eventAtom.floorImgs?.split(",").map((img) => img.trim())
    : [];

  const prefecture = eventAtom.prefecture || "";
  const address1 = eventAtom.address1 || "";
  const address2 = eventAtom.address2 || "";
  const fullAddress = prefecture + address1 + address2;

  return (
    <>
      {isLoading && <Loading />}
      <div className="p-5 w-full">
        <DetailBackBtn linkUrl="/events/list" />
        <div className="w-full">
          <div className="bg-white p-5 text-[30px] my-5">{eventAtom.title}</div>

          {/* Event Status Sidebar */}
          <DetailSideBar status={eventAtom.status} />

          <div className="pt-5 px-5 mr-[280px]">
            {/* Event Note */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField src="/imgs/icons/label.png" name="社内用備考欄" />
              </div>
              <div className="flex items-center p-5 w-full">
                {eventAtom.note ? (
                  <p className="text-sm">{eventAtom.note}</p>
                ) : (
                  <p className="text-sm">
                    社内用に共有するメモを設定することができます。<br></br>
                    設定したメモがイベントページに表示されることはありません。
                  </p>
                )}
                <EditBtn
                  linkUrl={`/events/${id}/note`}
                  className="self-start"
                />
              </div>
            </div>

            <div className="text-[18px] my-8 yu_gothic">
              イベントの公開に最低限必要な情報を入力しましょう！
            </div>

            {/* Event Title */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/label.png"
                  name="イベント名"
                  required
                />
              </div>
              <div className="flex items-center p-5 w-full">
                <p className="text-sm">{eventAtom.title}</p>
                <EditBtn linkUrl={`/events/${id}/title`} />
              </div>
            </div>

            {/* Event Type */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/folder.png"
                  name="イベントの種類"
                  required
                />
              </div>
              <div className="flex p-5 w-full">
                <p className="text-sm">{eventAtom.type}</p>
                <EditBtn linkUrl={`/events/${id}/type`} />
              </div>
            </div>

            {/* Event Format */}
            <div className="flex items-center bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/folder.png"
                  name="イベントの開催形式"
                  required
                />
              </div>
              <div className="flex p-5 w-full">
                <p className="text-sm">{eventAtom.format}</p>
                <EditBtn linkUrl={`/events/${id}/format`} />
              </div>
            </div>

            {/* Event Date */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/calendar.png"
                  name="開催日"
                  required
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {eventAtom.eventDate ? (
                  <p className="text-[15px]">
                    {getReservationPeriod(eventDates)}
                    <br></br>
                    上記の期間で開催日が{eventDates.length}日設定されています。
                  </p>
                ) : (
                  <NoInputLabel />
                )}
                <EditBtn
                  linkUrl={`/events/${id}/calendar/event_date_calendar`}
                  text="設定"
                />
              </div>
            </div>

            {/* Event Address */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/location.png"
                  name="住所"
                  required
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {fullAddress ? (
                  <div>
                    <p className="mb-3">{fullAddress}</p>
                    <iframe
                      width="450"
                      height="300"
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAP_API_KEY}&q=${fullAddress}`}
                    ></iframe>
                  </div>
                ) : (
                  <div>
                    <NoInputLabel />
                    <p className="text-sm mt-1">
                      ※オンラインのまとめページの場合、事務所などの住所を登録して下さい。
                    </p>
                  </div>
                )}
                <EditBtn
                  linkUrl={`/events/${id}/address`}
                  className="self-start"
                />
              </div>
            </div>

            <div className="text-[18px] mt-16 mb-4 yu_gothic">
              アピールポイントや写真もアップして、イベントを魅力的に伝えましょう！
            </div>

            {/* Event Picture */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/picture.png"
                  name="写真"
                  recommend
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {imgs.length === 0 ? (
                  <NoInputLabel />
                ) : (
                  <div className="flex gap-2">
                    {imgs.map((url, index) => (
                      <div
                        className="border-[#ddd] border-[1px] rounded bg-cover bg-center"
                        key={index}
                      >
                        <Image
                          src={url}
                          width={80}
                          height={60}
                          objectFit="cover"
                          className="w-full h-auto aspect-[4/3]"
                          alt="参考画像"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <EditBtn linkUrl={`/events/${id}/picture`} text="設定" />
              </div>
            </div>

            {/* Event Tag */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/pencil.png"
                  name="イベントタグ"
                  recommend
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {eventAtom.tag ? (
                  <p className="text-sm">{eventAtom.tag}</p>
                ) : (
                  <NoInputLabel />
                )}
                <EditBtn linkUrl={`/events/${id}/tag`} />
              </div>
            </div>

            {/* Event Features */}
            <div className="flex bg-white mb-8 ">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/pencil.png"
                  name="見どころ・特徴"
                  recommend
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {eventAtom.feature ? (
                  <HTMLContent content={eventAtom.feature} />
                ) : (
                  <NoInputLabel />
                )}
                <EditBtn
                  linkUrl={`/events/${id}/feature`}
                  className="self-start"
                />
              </div>
            </div>

            {/* Event Benefits */}
            <div className="flex bg-white mb-8 ">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/pencil.png"
                  name="キャンペーン・特典"
                  recommend
                  className="flex flex-col"
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {eventAtom.benefit ? (
                  <HTMLContent content={eventAtom.benefit} />
                ) : (
                  <NoInputLabel />
                )}
                <EditBtn
                  linkUrl={`/events/${id}/benefit`}
                  className="self-start"
                />
              </div>
            </div>

            {/* Event Floor Picture */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/picture.png"
                  name="間取り画像"
                  recommend
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {floorImgs.length === 0 ? (
                  <NoInputLabel />
                ) : (
                  <div className="flex gap-2">
                    {floorImgs.map((url, index) => (
                      <div
                        className="border-[#ddd] border-[1px] rounded bg-cover bg-center"
                        key={index}
                      >
                        <Image
                          src={url}
                          width={80}
                          height={60}
                          objectFit="cover"
                          className="w-full h-auto aspect-[4/3]"
                          alt="間取り画像"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <EditBtn linkUrl={`/events/${id}/floor-image`} text="設定" />
              </div>
            </div>

            <div className="text-[18px] my-8 yu_gothic">
              その他イベントに関する設定をしましょう！
            </div>

            {/* Event Priority */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/priority.png"
                  name="優先順位を上げる"
                  height={36}
                />
              </div>
              <div className="flex items-center p-5 w-full">
                <p className="text-sm leading-6">
                  <strong>イベントを優先的に上位に表示する</strong>
                  <br></br>
                  現在の表示は終了日の近いイベント順に上位表示されるようになっています。
                  <br></br>
                  優先的に上位表示したい場合は右のチェックボックスにチェックを入れてください。
                </p>
                <CheckBox checked={checked} setChecked={setChecked} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mr-5">
          <DetailBackBtn linkUrl="/events/list" />
          <DeleteBtn linkUrl="/events/list" id={Number(id)} type="events" />
        </div>
      </div>
    </>
  );
};

export default EventDetailPage;
