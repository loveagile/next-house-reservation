"use client";

import { useState } from "react";

import CheckURLBtn from "../../atoms/Button/CheckURLBtn";
import CheckHTMLBtn from "../../atoms/Button/CheckHTMLBtn";
import CampaignPublicBtn from "@/components/atoms/Button/CampaignPublicBtn";

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

const CampaignStatusSideBar: React.FC<ThisFCProps> = ({ id, status, statusBit }) => {
  const [campaignStatus, setCampaignStatus] = useState<IStatusProps>({
    status: (statusBit === 0 && status === "公開") ? "限定公開" : status, // 公開, 限定公開, or 非公開
    isEmbed: statusBit >= 2,
    isIemiru: statusBit % 2 === 1,
  })

  return (
    <div className="float-right pt-5 w-[270px]">
      <div className="bg-white p-5 mb-3 text-[15px]">
        <div className="mb-4 font-bold">公開設定</div>

        {/*  STATUS  ===  公開  */}
        {campaignStatus.status === "公開" && (
          <div>
            <div className="border-[1px] rounded border-[#eee] relative">
              <div className="flex items-center absolute left-[15px] top-[-15px] bg-white px-1">
                <RemoveRedEyeIcon sx={{
                  color: "#2aac6d",
                  marginRight: "4px",
                  fontSize: "24px",
                  margin: "4px 0",
                }} />
                <span className="ml-1 YuGothic">公開</span>
              </div>
              <div className="px-5 pt-5 pb-3">
                <p className="relative">
                  {campaignStatus.isEmbed && <CheckIcon sx={{
                    color: "#2aac6d",
                    position: "absolute",
                  }} />}
                  <span className="pl-7">埋込先HP</span>
                </p>
                <p className="relative">
                  {campaignStatus.isIemiru && <CheckIcon sx={{
                    color: "#2aac6d",
                    position: "absolute",
                  }} />}
                  <span className="pl-7">iemiru</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button href={`/smilebuilders/campaigns/${id}`} target="_blank" variant="contained" sx={{
                backgroundColor: "white",
                color: "black",
                padding: "5px 20px",
                fontSize: "14px",
                border: "1px solid #888",
                borderRadius: "1px",
                marginBottom: "12px",
                '&:hover': {
                  backgroundColor: "white",
                }
              }}>
                プレビュー
              </Button>
              <CampaignPublicBtn
                id={id}
                campaignStatus={campaignStatus}
                setCampaignStatus={setCampaignStatus}
              />
            </div>
          </div>
        )}

        {/* STATUS  ===  限定公開 */}
        {campaignStatus.status === "限定公開" && (
          <div>
            <div className="border-[1px] rounded border-[#eee] relative">
              <div className="flex items-center absolute left-[15px] top-[-15px] bg-white px-1">
                <RemoveRedEyeIcon sx={{
                  color: "#2aac6d",
                  marginRight: "4px",
                  fontSize: "24px",
                  margin: "4px 0",
                }} />
                <span className="ml-1 YuGothic">限定公開</span>
              </div>
              <p className="px-5 pt-5 pb-2 text-[13px] leading-5">
                URLを知っているお客様のみが閲覧できます。
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <Button href={`/smilebuilders/campaigns/${id}`} target="_blank" variant="contained" sx={{
                backgroundColor: "white",
                color: "black",
                padding: "5px 20px",
                fontSize: "14px",
                border: "1px solid #888",
                borderRadius: "1px",
                marginBottom: "12px",
                '&:hover': {
                  backgroundColor: "white",
                }
              }}>
                プレビュー
              </Button>
              <CampaignPublicBtn
                id={id}
                campaignStatus={campaignStatus}
                setCampaignStatus={setCampaignStatus}
              />
            </div>
          </div>
        )}

        {/* STATUS  ===  非公開 */}
        {campaignStatus.status === "非公開" && (
          <div className="flex flex-col">
            <div className="flex items-center">
              <VisibilityOffRoundedIcon sx={{
                color: "#737373",
                fontSize: "20px",
                margin: "4px 0",
              }} />
              <span className="ml-2 YuGothic">非公開 (下書き)</span>
            </div>
            <Button
              variant="contained"
              href={`/smilebuilders/campaigns/${id}`}
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

      <div className="bg-white p-5 mt-4 text-[15px]">
        <div className="mb-3 font-bold">自社HPに埋め込む</div>
        <p className="mb-1 text-sm leading-6">※下記から公開後のURL・HTMLをご確認いただけます。</p>
        <div className="flex flex-col gap-y-3">
          <CheckURLBtn id={id} type="campaigns" />
          <CheckHTMLBtn id={id} type="campaigns" />
        </div>
      </div>
    </div>
  );
};

export default CampaignStatusSideBar;
