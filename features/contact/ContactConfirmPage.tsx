"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";

import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

interface IContactConfirmForm {
  type: string;
  detail: string;
  contactPerson: string;
  email: string;
}

export default function ContactConfirmPage() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const [contactData, setContactData] = useState<IContactConfirmForm>();

  useEffect(() => {
    setIsLoading(true);
    const storedData = localStorage.getItem("contactData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setContactData(data);
    } else {
      router.push("/contact/create");
    }
    setIsLoading(false);
  }, [])

  const handleSendClick = async () => {

    const content = `
      システム担当者様

      ${contactData?.contactPerson}様から新しい新規ごお問い合わせがございました。

      ■【担当者名】
      ${contactData?.contactPerson}

      ■【メールアドレス】
      ${contactData?.email}

      ■【お問い合わせ内容】
      ${contactData?.type}

      ■【お問い合わせ詳細】
      ${contactData?.detail}

      
      --------------------------------------------------------------
      平屋だけの姶良総合住宅展示場スマイルビルダーズ
      住所：鹿児島県姶良市加治木町木田2511-1
      営業時間：10:00〜18:00
      定休日：水曜日
      FAX：0995-55-8818
      MAIL：info@smile-builders-hiraya.com
      TEL：0995-55-8900
      --------------------------------------------------------------
    `;

    await axios.post("/api/sendEmail", {
      to: [
        { email: "info@smile-builders-hiraya.com" },
        { email: "info@wazeka.co.jp" },
      ],
      subject: "【スマイルビルダーズ】新しい新規ごお問い合わせがございました。",
      text: content,
    });

    localStorage.clear();
    router.push("/");
  }

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            お問い合わせ
          </h1>
          <p className='text-sm'>
            自社サイトへの連携方法の使い方など、何かご不明点がありましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="bg-white w-full p-5  text-[15px]">
          <table className="w-full border border-collapse border-gray-300">
            <tbody>
              <tr>
                <th className="w-56 font-medium px-2 py-2 text-sm text-left bg-gray-100 border border-gray-300">
                  お問い合わせ内容
                </th>
                <td className="px-2 py-2 text-sm border border-gray-300">{contactData?.type}</td>
              </tr>
              <tr>
                <th className="w-56 font-medium px-2 py-2 text-sm text-left bg-gray-100 border border-gray-300">
                  お問い合わせ詳細
                </th>
                <td className="px-2 py-2 text-sm border border-gray-300">{contactData?.detail}</td>
              </tr>
              <tr>
                <th className="w-56 font-medium px-2 py-2 text-sm text-left bg-gray-100 border border-gray-300">
                  担当者名
                </th>
                <td className="px-2 py-2 text-sm border border-gray-300">{contactData?.contactPerson}</td>
              </tr>
              <tr>
                <th className="w-56 font-medium px-2 py-2 text-sm text-left bg-gray-100 border border-gray-300">
                  メールアドレス
                </th>
                <td className="px-2 py-2 text-sm border border-gray-300">{contactData?.email}</td>
              </tr>
            </tbody>
          </table>

          {/* Send Button */}
          <div className="flex items-start my-5">
            <div className="flex min-w-[230px] justify-end pr-5"></div>
            <div className="w-full">
              <Button
                variant="contained"
                onClick={handleSendClick}
                sx={{
                  padding: "5px 30px",
                  fontSize: "20px",
                  borderRadius: "1px",
                }}
              >
                送信する
              </Button>
            </div>
          </div>
        </div>

        <EditBackBtn linkUrl="/contact/create" className="mt-4" />
      </div >
    )
  );
}

