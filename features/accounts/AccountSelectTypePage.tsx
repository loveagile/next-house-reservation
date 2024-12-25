
"use client";

import { useState } from "react";

import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

import Radio from '@mui/material/Radio';
import Button from "@mui/material/Button";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from "next/navigation";


const AccountRadioButton: React.FC<{ value: string }> = ({ value }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={value}
      labelPlacement="bottom"
      sx={{
        '& .MuiSvgIcon-root': {
          width: "18px",
          height: "18px",
        },
        '& .MuiRadio-root': {
          padding: "5px",
        },
        '& .MuiFormControlLabel-label': {
          fontSize: "14px",
          fontWeight: 600,
        },
      }}
    />
  )
}

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
          <table className="w-full border-black">
            <tbody>
              <tr>
                <th className="font-semibold text-sm p-2 text-center w-1/6 border-black">ー</th>
                <th className="font-semibold text-sm p-2 text-center w-1/6 border-black">イベント管理</th>
                <th className="font-semibold text-sm p-2 text-center w-1/6 border-black">アカウント閲覧/編集</th>
                <th className="font-semibold text-sm p-2 text-center w-1/6 border-black">顧客閲覧/編集</th>
                <th className="font-semibold text-sm p-2 text-center w-1/6 border-black">予約日時の日程調整</th>
                <th className="font-semibold text-sm p-2 text-center w-1/6 border-black">見学受入謝礼</th>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"><AccountRadioButton value="管理者" /></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">●</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">● / ●</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">● / ●</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">●</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"></td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"><AccountRadioButton value="スタッフ" /></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">●</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">● / ー</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">● / ー</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">●</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"></td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"><AccountRadioButton value="日程調整のみ" /></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">●</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"></td>
              </tr>
              <tr>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"><AccountRadioButton value="施主・OB" /></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black"></td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">●</td>
                <td className="font-semibold text-sm p-1 text-center w-1/6 border-black">●</td>
              </tr>
            </tbody>
          </table>
        </RadioGroup>

        <div className="pl-10 pt-8 text-sm">
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
            variant="contained"
            onClick={handleNextBtnClicked}
            sx={{
              padding: "3px 30px",
              fontSize: "20px",
              borderRadius: "1px",
            }}
          >
            次へ
          </Button>
        </div>
      </div>

      <EditBackBtn linkUrl="/accounts/list" className="mt-4" />
    </div>
  );
}