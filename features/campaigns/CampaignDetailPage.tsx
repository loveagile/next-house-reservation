"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";

import EditBtn from "@/components/atoms/Button/EditBtn";
import Loading from "@/components/molecules/loading";
import NoInputLabel from "@/components/atoms/Label/NoInputLabel";
import EventCampaignDeleteBtn from "@/components/atoms/Button/EventCampaignDeleteBtn";
import DetailBackBtn from "@/components/atoms/Button/DetailBackBtn";
import ItemField from "@/components/molecules/Field/ItemField";
import HTMLContent from "@/components/atoms/HTMLContent";
import GoogleMapFC from "@/components/atoms/GoogleMapFC";
import CampaignStatusSideBar from "@/components/molecules/SideBar/CampaignStatusSideBar";

import { eventHoldingPeriod } from "@/utils/convert";
import { CampaignAtom } from "@/lib/recoil/CampaignAtom";

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams();
  const [campaignAtom, setCampaignAtom] = useRecoilState(CampaignAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/campaigns/detail", { id });
      if (res.status === 200) {
        setCampaignAtom(res.data[0]);
      }
      setIsLoading(false);
    };
    fetchCampaignDetail();
  }, []);

  const {
    title, type, format,
    status, statusBit, eventDate,
    prefecture, address1, address2, hiddenAddress,
    images, article
  } = campaignAtom;

  const imgs = images?.split(",").map((img) => img.trim()) || [];
  const webAddress = (prefecture || "") + (address1 || "") + (address2 || "");
  const mapAddress = webAddress + (hiddenAddress || "");
  const convEventDate = eventDate ? JSON.parse(eventDate) : [];

  return (
    isLoading ? <Loading /> : (
      <div className="p-5 w-full">
        <DetailBackBtn linkUrl="/campaigns/list" />
        <div className="w-full">
          <div className="bg-white p-5 text-2xl my-5 font-semibold">{title}</div>

          {/* Campaign Status Sidebar */}
          <CampaignStatusSideBar status={status} statusBit={statusBit} id={Number(id)} />

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
                <p className="text-sm">{title}</p>
                <EditBtn linkUrl={`/campaigns/${id}/title`} className="self-start" />
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
                <p className="text-sm">{type}</p>
                <EditBtn linkUrl={`/campaigns/${id}/type`} className="self-start" />
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
                <p className="text-sm">{format}</p>
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
                  linkUrl={`/campaigns/${id}/calendar/date_somedays`}
                  text="設定" className="self-start"
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
                <EditBtn linkUrl={`/campaigns/${id}/picture`} text="設定" className="self-start" />
              </div>
            </div>

            {/* Campaign Article */}
            <div className="flex bg-white mb-8 ">
              <div className="flex items-center p-5 min-w-[260px] border-r-[1px] border-[#eee]">
                <ItemField src="/imgs/icons/pencil.png" name="本文" />
              </div>
              <div className="flex items-center p-5 w-full">
                {article ? (
                  <HTMLContent content={article} />
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
          <EventCampaignDeleteBtn linkUrl="/campaigns/list" id={Number(id)} type="campaigns" />
        </div>
      </div>
    )
  );
};

export default CampaignDetailPage;
