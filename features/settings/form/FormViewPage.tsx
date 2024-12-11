"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import { IForm } from "@/utils/types";
import FormListItem from "@/components/organisms/ListItem/FormListItem";
import Loading from "@/components/molecules/loading";

export default function FormViewPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [formItems, setFormItems] = useState<IForm[]>([]);
  const mainID = cookies['user'].id;
  const subID = cookies['user'].subId;
  const userID = subID !== -1 ? subID : mainID;

  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/forms/view", {
        userID,
      });
      if (res.status === 200) {
        setFormItems(res.data);
      }
      setIsLoading(false);
    }
    fetchForms();
  }, [])

  const handleDeleteItem = (id: number) => {
    const filteredItems = formItems.filter(item => item.id !== id);
    setFormItems(filteredItems);
  }

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            フォーム項目
          </h1>
        </div>
        <div className="flex flex-col bg-white grow w-full p-5">
          <div>
            <Link
              href="/settings/form/create"
              className="inline-flex items-center px-4 py-2 bg-[#2296f3] text-white hover:opacity-90 transition-all duration-300 ease-out"
            >
              <FaPlus />
              <span className="ml-1">新規作成</span>
            </Link>
          </div>
          {formItems.length ? (
            <div className="grow bg-white w-full py-3">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="w-1/2 bg-[#2fa8b5] p-3 text-sm text-white font-normal">項目名</th>
                    <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal">項目タイプ</th>
                    <th className="w-[130px] bg-[#2fa8b5] p-3 text-sm text-white font-normal">表示 / 非表示</th>
                    <th className="w-[90px] bg-[#2fa8b5] p-3 text-sm text-white font-normal">変更</th>
                  </tr>
                </thead>
                <tbody>
                  {formItems.map((formItem, index) => (
                    <FormListItem key={index} formItem={formItem} setDeleteItem={handleDeleteItem} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-3 bg-[#fcf8e3] border-[#faebcc] border-[1px] p-3 rounded-sm">
              フォーム項目がありません
            </p>
          )}
        </div>
      </div >
    )
  );
}