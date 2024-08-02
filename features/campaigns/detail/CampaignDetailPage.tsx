"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import Button from "@mui/material/Button";
import EditBtn from "@/components/atoms/EditBtn";

import DetailBackBtn from "@/components/atoms/DetailBackBtn";
import { getReservationPeriod, eventDateTimeSplit } from "@/utils/convert";
import ItemField from "@/components/molecules/ItemField/ItemField";
import { useRecoilState } from "recoil";
import { CampaignAtom } from "@/lib/recoil/CampaignAtom";
import Loading from "@/components/molecules/Loading/loading";
import NoInputLabel from "@/components/atoms/NoInputLabel";
import DeleteBtn from "@/components/atoms/DeleteBtn";
import { IEventDateTime } from "@/lib/recoil/EventDateAtom";
import HTMLContent from "@/components/atoms/HTMLContent";
import DetailSideBar from "@/components/molecules/DetailSideBar/DetailSideBar";
import "./CampaignDetailPage.css";
import { text } from "stream/consumers";

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams();
  const [campaignAtom, setCampaignAtom] = useRecoilState(CampaignAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/campaigns/detail", { id });
      if (res.status === 200) {
        const data = res.data[0];
        setCampaignAtom(data);
      }
      setIsLoading(false);
    };
    fetchCampaignDetail();
  }, []);

  let eventDates: IEventDateTime[] = [];

  if (campaignAtom.eventDate) {
    const saveDates = campaignAtom.eventDate
      .split(",")
      .map((date) => date.trim());
    eventDates = saveDates.map((saveDate) => eventDateTimeSplit(saveDate));
  }

  const imgs = campaignAtom.imgUrl
    ? campaignAtom.imgUrl.split(",").map((img) => img.trim())
    : [];

  const prefecture = campaignAtom.prefecture || "";
  const address1 = campaignAtom.address1 || "";
  const address2 = campaignAtom.address2 || "";
  const fullAddress = prefecture + address1 + address2;

  return (
    <>
      {isLoading && <Loading />}
      <div className="p-5 w-full">
        <DetailBackBtn linkUrl="/campaigns/list" />
        <div className="w-full">
          <div className="bg-white p-5 text-[30px] my-5">
            {campaignAtom.title}
          </div>

          {/* Campaign Status Sidebar */}
          <DetailSideBar status={campaignAtom.status} />

          <div className="pt-5 px-5 mr-[280px]">
            {/* Campaign Title */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/label.png"
                  name="まとめページ名"
                  required
                />
              </div>
              <div className="flex items-center p-5 w-full">
                <p className="text-sm">{campaignAtom.title}</p>
                <EditBtn linkUrl={`/campaigns/${id}/title`} />
              </div>
            </div>

            {/* Campaign Type */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/folder.png"
                  name="まとめページの種類"
                  required
                />
              </div>
              <div className="flex items-center p-5 w-full">
                <p className="text-sm">{campaignAtom.type}</p>
                <EditBtn linkUrl={`/campaigns/${id}/type`} />
              </div>
            </div>

            {/* Campaign Format */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/folder.png"
                  name="開催形式"
                  required
                />
              </div>
              <div className="flex items-center p-5 w-full">
                <p className="text-sm">{campaignAtom.format}</p>
                <EditBtn linkUrl={`/campaigns/${id}/format`} />
              </div>
            </div>

            {/* Campaign Date */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/calendar.png"
                  name="開催日"
                  required
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {campaignAtom.eventDate ? (
                  <p className="text-[15px]">
                    {getReservationPeriod(eventDates)}
                    <br></br>
                    上記の期間で開催日が{eventDates.length}日設定されています。
                  </p>
                ) : (
                  <NoInputLabel />
                )}
                <EditBtn
                  linkUrl={`/campaigns/${id}/calendar/campaign_date_calendar`}
                  text="設定"
                />
              </div>
            </div>

            {/* Campaign Address */}
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
                  linkUrl={`/campaigns/${id}/address`}
                  className="self-start"
                />
              </div>
            </div>

            {/* Campaign FeaturedEvent */}
            {/* <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField
                  src="/imgs/icons/folder.png"
                  name="掲載イベント"
                  required
                />
              </div>
              <div className="flex items-center p-5 w-full">
                {!campaignAtom.featuredEvent && <NoInputLabel />}
                <EditBtn linkUrl={`/campaigns/${id}/events`} />
              </div>
            </div> */}

            {/* Campaign Picture */}
            <div className="flex bg-white mb-5">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField src="/imgs/icons/picture.png" name="写真" />
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
                <EditBtn linkUrl={`/campaigns/${id}/picture`} text="設定" />
              </div>
            </div>

            {/* Campaign Article */}
            <div className="flex bg-white mb-8 ">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField src="/imgs/icons/pencil.png" name="本文" />
              </div>
              <div className="flex items-center p-5 w-full">
                {campaignAtom.article ? (
                  <HTMLContent content={campaignAtom.article} />
                ) : (
                  <NoInputLabel />
                )}
                <EditBtn
                  linkUrl={`/campaigns/${id}/article`}
                  className="self-start"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mr-5">
          <DetailBackBtn linkUrl="/campaigns/list" />
          <DeleteBtn
            linkUrl="/campaigns/list"
            id={Number(id)}
            type="campaigns"
          />
        </div>
      </div>
    </>
  );
};

export default CampaignDetailPage;
