"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";

import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

interface IContactConfirmForm {
  content: string;
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

  const handleSendClick = () => {
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
                <td className="px-2 py-2 text-sm border border-gray-300">{contactData?.content}</td>
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

