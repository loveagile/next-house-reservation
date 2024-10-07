"use client";

import axios from "axios";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import CheckBox from "@/components/molecules/Input/CheckBox";
import DetailBackBtn from "@/components/atoms/Button/DetailBackBtn";
import EditBtn from "@/components/atoms/Button/EditBtn";
import Loading from "@/components/molecules/loading";
import ItemField from "@/components/molecules/Field/ItemField";
import NoInputLabel from "@/components/atoms/Label/NoInputLabel";
import EventStatusSideBar from "@/components/molecules/SideBar/EventStatusSideBar";
import HTMLContent from "@/components/atoms/HTMLContent";
import GoogleMapFC from "@/components/atoms/GoogleMapFC";
import EventCampaignDeleteBtn from "@/components/atoms/Button/EventCampaignDeleteBtn";

import { EventAtom } from "@/lib/recoil/EventAtom";
import { eventHoldingPeriod } from "@/utils/convert";

const EventDetailPage: React.FC = () => {
  const { id } = useParams();
  const [eventAtom, setEventAtom] = useRecoilState(EventAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPriority, setIsPriority] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        setEventAtom(res.data[0]);
        setIsPriority(res.data[0].priority);
      }
      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  useEffect(() => {
    const setPriority = async () => {
      await axios.post("/api/events/update", {
        id,
        field_names: ["priority"],
        field_values: [Number(isPriority)],
      });
    };
    setPriority();
  }, [isPriority]);

  const {
    title, note, type, format,
    status, statusBit, eventDate,
    prefecture, address1, address2, hiddenAddress,
    images, FPImages, tag, feature, benefit,
    propertyType
  } = eventAtom;

  const imgs = images?.split(",").map((img) => img.trim()) || [];
  const FPImgs = FPImages?.trim() ? FPImages.split(",").map((img) => img.trim()) : [];
  const webAddress = (prefecture || "") + (address1 || "") + (address2 || "");
  const mapAddress = webAddress + (hiddenAddress || "");
  const splitTags = tag?.split(",").map(item => item.trim()) || [];
  const convEventDate = eventDate ? JSON.parse(eventDate) : [];

  return (
    isLoading ? <Loading /> : (
      <div className="p-5 w-full">
        <DetailBackBtn linkUrl="/events/list" />
        <div className="w-full">
          <div className="bg-white p-5 text-2xl my-5 font-semibold">{title}</div>

          {/* Event Status Sidebar */}
          <EventStatusSideBar id={Number(id)} status={status} statusBit={statusBit} eventDate={eventDate} />

          <div className="pt-5 px-5 mr-[275px]">
            {/* Event Note */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField src="/imgs/icons/label.png" name="社内用備考欄" />
              </div>
              <div className="flex items-center p-5 w-full">
                {note ? <p className="text-sm">{note}</p> : (
                  <p className="text-sm">
                    社内用に共有するメモを設定することができます。<br></br>
                    設定したメモがイベントページに表示されることはありません。
                  </p>
                )}
                <EditBtn linkUrl={`/events/${id}/note`} className="self-start" />
              </div>
            </div>

            <div className="text-lg my-6">
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
                <p className="text-sm">{title}</p>
                <EditBtn linkUrl={`/events/${id}/title`} className="self-start" />
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
              <div className="flex items-center p-5 w-full">
                <p className="text-sm">{type}</p>
                <EditBtn linkUrl={`/events/${id}/type`} className="self-start" />
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
              <div className="flex items-center p-5 w-full">
                <p className="text-sm">{format}</p>
                <EditBtn linkUrl={`/events/${id}/format`} className="self-start" />
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
                {convEventDate.length > 0 ? (
                  <p className="text-sm">
                    {eventHoldingPeriod(convEventDate)}
                    <br></br>
                    上記の期間で開催日が{convEventDate.length}日設定されています。
                  </p>
                ) : (
                  <NoInputLabel />
                )}
                <EditBtn
                  linkUrl={`/events/${id}/calendar/date_somedays`}
                  text="設定" className="self-start"
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
                {webAddress ? (
                  <div>
                    <p className="mb-3 text-sm leading-7">
                      {webAddress}
                      <span className="bg-[#AAA] ml-1 p-1 border-black border-[1px]">{hiddenAddress}</span><br></br>
                      ※グレー部分はイベントページには表示されません。
                    </p>
                    <GoogleMapFC width={450} height={300} address={mapAddress} />
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

            <div className="text-lg my-6">
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
                          width={100}
                          height={75}
                          objectFit="cover"
                          className="aspect-[4/3] border-[#ddd] border-[1px] rounded-[2px]"
                          alt="参考画像"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <EditBtn linkUrl={`/events/${id}/picture`} text="設定" className="self-start" />
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
                {splitTags.length > 0 ? (
                  <div className="flex gap-x-2">
                    {splitTags.map((splitTag, index) => (
                      <span className="text-sm text-white bg-[#EA9B54] p-1" key={index}>{splitTag}</span>
                    ))}
                  </div>
                ) : (
                  <NoInputLabel />
                )}
                <EditBtn linkUrl={`/events/${id}/tag`} className="self-start" />
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
                {feature ? (
                  <HTMLContent content={feature} />
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
                {benefit ? (
                  <HTMLContent content={benefit} />
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
                {FPImgs.length === 0 ? (
                  <NoInputLabel />
                ) : (
                  <div className="flex gap-2">
                    {FPImgs.map((url, index) => (
                      <div
                        className="border-[#ddd] border-[1px] rounded bg-cover bg-center"
                        key={index}
                      >
                        <Image
                          src={url}
                          width={100}
                          height={75}
                          objectFit="cover"
                          className="aspect-[4/3] border-[#ddd] border-[1px] rounded-[2px]"
                          alt="間取り画像"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <EditBtn linkUrl={`/events/${id}/floor_image`} text="設定" />
              </div>
            </div>

            <div className="text-lg my-6 ">
              その他イベントに関する設定をしましょう！
            </div>

            {/* Event Property Type */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/home.png"
                  name="物件形態"
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {propertyType === "設定しない" ? (
                  <p className="text-sm">
                    <strong>物件形態を登録する</strong><br></br>
                    建売・土地の販売を行う場合は「物件形態」を設定してください。 「物件形態」の入力を行った場合は物件概要の入力ができ、<br></br>
                    イベント詳細ページに物件概要を表示することができます。
                  </p>
                ) : (
                  <p className="text-sm">
                    {propertyType}
                  </p>
                )}

                <EditBtn linkUrl={`/events/${id}/propertyType`} className="self-start" />
              </div>
            </div>

            {/* Event Priority */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/priority.png"
                  name="優先順位"
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
                <CheckBox
                  checked={isPriority} setChecked={setIsPriority}
                  className="flex flex-col justify-center ml-auto"
                  text="上位表示する"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mr-5">
          <DetailBackBtn linkUrl="/events/list" />
          <EventCampaignDeleteBtn linkUrl="/events/list" id={Number(id)} type="events" />
        </div>
      </div>
    )
  );
};

export default EventDetailPage;
