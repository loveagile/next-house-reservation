"use client";

import { useState } from "react";

import CheckURLBtn from "../../atoms/Button/CheckURLBtn";
import CheckHTMLBtn from "../../atoms/Button/CheckHTMLBtn";
import EventPublicBtn from "../../atoms/Button/EventPublicBtn";

import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckIcon from "@mui/icons-material/Check";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "@mui/material/Button";

interface ThisFCProps {
  id: number;
  status: string;
  statusBit: number;
}

export interface IStatusProps {
  status: string;
  isEmbed: boolean;
  isIemiru: boolean;
}

const EventStatusSideBar: React.FC<ThisFCProps> = ({ id, status, statusBit }) => {
  const [eventStatus, setEventStatus] = useState<IStatusProps>({
    status: (statusBit === 0 && status === "公開") ? "限定公開" : status, // 公開, 限定公開, or 非公開
    isEmbed: statusBit >= 2,
    isIemiru: statusBit % 2 === 1,
  })

  return (
    <div className="float-right pt-5 w-[270px]">
      <div className="bg-white p-5 mb-3 text-[15px]">
        <div className="mb-4 font-bold">公開設定</div>

        {/*  STATUS  ===  公開  */}
        {eventStatus.status === "公開" && (
          <div>
            <div className="border-[1px] rounded border-[#eee] relative">
              <div className="flex items-center absolute left-[15px] top-[-15px] bg-white px-1">
                <RemoveRedEyeIcon sx={{
                  color: "#2aac6d",
                  marginRight: "4px",
                  fontSize: "24px",
                  margin: "4px 0",
                }} />
                <span className="ml-1">公開</span>
              </div>
              <div className="px-5 pt-5 pb-3">
                <p className="relative">
                  {eventStatus.isEmbed && <CheckIcon sx={{
                    color: "#2aac6d",
                    position: "absolute",
                  }} />}
                  <span className="pl-7">埋込先HP</span>
                </p>
                <p className="relative">
                  {eventStatus.isIemiru && <CheckIcon sx={{
                    color: "#2aac6d",
                    position: "absolute",
                  }} />}
                  <span className="pl-7">iemiru</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button href={`/smilebuilders/events/${id}`} target="_blank" variant="contained" sx={{
                backgroundColor: "white",
                color: "black",
                padding: "5px 20px",
                fontSize: "14px",
                border: "1px solid #888",
                borderRadius: "1px",
                '&:hover': {
                  backgroundColor: "white",
                }
              }}>
                プレビュー
              </Button>
              <EventPublicBtn
                id={id}
                eventStatus={eventStatus}
                setEventStatus={setEventStatus}
              />
            </div>
          </div>
        )}

        {/* STATUS  ===  限定公開 */}
        {eventStatus.status === "限定公開" && (
          <div>
            <div className="border-[1px] rounded border-[#eee] relative">
              <div className="flex items-center absolute left-[15px] top-[-15px] bg-white px-1">
                <RemoveRedEyeIcon sx={{
                  color: "#2aac6d",
                  marginRight: "4px",
                  fontSize: "24px",
                  margin: "4px 0",
                }} />
                <span className="ml-1 ">限定公開</span>
              </div>
              <p className="px-5 pt-5 pb-2 text-[13px] leading-5">
                URLを知っているお客様のみが閲覧できます。
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <Button href={`/smilebuilders/events/${id}`} target="_blank" variant="contained" sx={{
                backgroundColor: "white",
                color: "black",
                padding: "5px 20px",
                fontSize: "14px",
                border: "1px solid #888",
                borderRadius: "1px",
                '&:hover': {
                  backgroundColor: "white",
                }
              }}>
                プレビュー
              </Button>
              <EventPublicBtn
                id={id}
                eventStatus={eventStatus}
                setEventStatus={setEventStatus}
              />
            </div>
          </div>
        )}

        {/* STATUS  ===  非公開 */}
        {eventStatus.status === "非公開" && (
          <div className="flex flex-col">
            <div className="flex items-center">
              <VisibilityOffRoundedIcon sx={{
                color: "#737373",
                fontSize: "20px",
                margin: "4px 0",
              }} />
              <span className="ml-2 ">非公開 (下書き)</span>
            </div>
            <Button
              variant="contained"
              href={`/smilebuilders/events/${id}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
                borderRadius: "1px",
                padding: "10px 0",
              }}
            >
              <span>プレビューで確認して</span>
              <p className="text-xl mt-1">公開する</p>
            </Button>
          </div>
        )}
      </div>

      {/* {status !== "非公開" && (
        <div className="bg-white p-3 mt-4">
          <div className="bg-[#DCEEF4] p-4 flex flex-col items-center">
            <p className="text-sm mb-3 leading-6 tracking-wider text-justify">
              メールやSNSで配信すればもっとたくさんの人にこのイベントに来てもらうことができます！
            </p>
            <Button href={`#`} variant="contained" sx={{
              padding: "5px 20px",
              fontSize: "14px",
              marginBottom: "12px",
              backgroundColor: "#0098ba",
              border: "1px solid #0098ba",
              borderRadius: "1px",
              '&:hover': {
                backgroundColor: "#0098ba",
              }
            }}>
              配信設定
            </Button>
          </div>
        </div>
      )} */}

      <div className="bg-white p-5 mt-4 text-[15px]">
        <div className="mb-3 font-bold">自社HPに埋め込む</div>
        <p className="mb-1 text-sm leading-6">※下記から公開後のURL・HTMLをご確認いただけます。</p>
        <div className="flex flex-col gap-y-3">
          <CheckURLBtn id={id} type="events" />
          <CheckHTMLBtn id={id} type="events" />
        </div>
      </div>
    </div>
  );
};

export default EventStatusSideBar;
