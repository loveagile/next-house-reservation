
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

import Radio from '@mui/material/Radio';
import Button from "@mui/material/Button";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from "next/navigation";

import "./AccountSelectTypePage.css";

export default function AccountSelectTypePage() {

  const router = useRouter();
  const [currentValue, setCurrentValue] = useState<string>("管理者");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  }

  const handleNextBtnClicked = () => {
    if (currentValue === "管理者") router.push("/accounts/create/manager");
    if (currentValue === "スタッフ") router.push("/accounts/create/normal");
    if (currentValue === "日程調整のみ") router.push("/accounts/create/member");
    if (currentValue === "施主・OB") router.push("/accounts/create/owner");
  }

  return (
    <div className="flex flex-col w-full p-10">
      <div className="mb-6">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
          アカウント管理
        </h1>
        <p className="text-sm">
          アカウント種別を選択します。
        </p>
      </div>

      <div className="flex flex-col w-full bg-white p-5">
        <RadioGroup name="use-radio-group" value={currentValue}
          onChange={handleRadioChange}
        >
          <table className="account_type_table w-full">
            <tbody>
              <tr>
                <th>ー</th>
                <th>イベント管理</th>
                <th>アカウント閲覧/編集</th>
                <th>顧客閲覧/編集</th>
                <th>予約日時の日程調整</th>
                <th>見学受入謝礼</th>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    value="管理者"
                    control={<Radio />}
                    label="管理者"
                    labelPlacement="bottom"
                  />
                </td>
                <td>●</td>
                <td>● / ●</td>
                <td>● / ●</td>
                <td>●</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    value="スタッフ"
                    control={<Radio />}
                    label="スタッフ"
                    labelPlacement="bottom"
                  />
                </td>
                <td>●</td>
                <td>● / ー</td>
                <td>● / ー</td>
                <td>●</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    value="日程調整のみ"
                    control={<Radio />}
                    label="日程調整のみ"
                    labelPlacement="bottom"
                  />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>●</td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    value="施主・OB"
                    control={<Radio />}
                    label="施主・OB"
                    labelPlacement="bottom"
                  />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>●</td>
                <td>●</td>
              </tr>
            </tbody>
          </table>
        </RadioGroup>

        <div className="pl-10 pt-8 text-[15px]">
          <ul className="list-disc">
            <li className="mb-3 leading-6">管理者: KengakuCloudの全ての機能を利用することができます。</li>
            <li className="mb-3 leading-6">
              スタッフ: KengakuCloudへのログイン、イベント作成や予約の確認ができます。<br></br>
              例）自社の社員向けアカウント<br></br>
            </li>
            <li className="mb-3 leading-6">
              日程調整のみ: 日程調整の回答を行うことが出来ます。<br></br>
              例）社外の関係者向けアカウント（現場監督、大家、不動産管理、セミナー講師など）<br></br>
              ※KengakuCloudへログインすることは出来ません。<br></br>
            </li>
            <li className="mb-3 leading-6">
              施主・OB: 日程調整の回答を行うことが出来ます。また見学受入謝礼機能が利用できます。<br></br>
              例）施主・OB向けアカウント<br></br>
              ※KengakuCloudへログインすることは出来ません。<br></br>
            </li>
          </ul>
        </div>

        {/* Next Button */}
        <div className="flex items-start justify-end">
          <Button
            className="next_btn"
            variant="contained"
            onClick={handleNextBtnClicked}
          >
            次へ
          </Button>
        </div>
      </div>

      <EditBackBtn linkUrl="/accounts/list" className="mt-4" />
    </div>
  );
}