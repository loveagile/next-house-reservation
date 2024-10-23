"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaPlus } from "react-icons/fa6";

import Loading from "@/components/molecules/loading";
import PaginationItem from "@/components/molecules/PaginationItem";
import GroupSearchBar from "@/components/molecules/SearchBar/GroupSearchBar";
import GroupDeleteBtn from "@/components/atoms/Button/GroupDeleteBtn";
import ManageBtn from "@/components/atoms/Button/ManageBtn";

import { IGroup } from "@/utils/types";
import { formatISO8601TimestampToJapaneseString } from "@/utils/convert";

const UsersGroupPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [allGroups, setAllGroups] = useState<IGroup[]>([]);
  const [groupItems, setGroupItems] = useState<IGroup[]>([]);
  const [selectedGroupItems, setSelectedGroupItems] = useState<IGroup[]>([]);

  const [keyword, setKeyword] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/groups/view", {
        id: cookies['user'].id,
      });
      if (res.status === 200) {
        const groups = res.data;
        setAllGroups(groups);
        setGroupItems(groups);
      }
      setCurrentPage(0);
      setIsLoading(false);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    let filteredItems = allGroups;
    if (keyword) {
      filteredItems = filteredItems.filter(item => {
        const fullAddress = item.prefecture + item.address;

        if (item.name && item.name.includes(keyword)) return true;
        if (item.email && item.email.includes(keyword)) return true;
        if (fullAddress && fullAddress.includes(keyword)) return true;
        if (item.phone && item.phone.includes(keyword)) return true;
        if (item.fax && item.fax.includes(keyword)) return true;
        if (item.websiteURL && item.websiteURL.includes(keyword)) return true;
        return false;
      })
    }

    setGroupItems(filteredItems);
    setCurrentPage(0);
  }, [keyword])

  useEffect(() => {
    const selectedItems = groupItems.slice(
      currentPage * 20,
      (currentPage + 1) * 20
    );
    setSelectedGroupItems(selectedItems);
  }, [groupItems, currentPage]);


  const handleRemoveGroup = (removeId: number) => {
    const filteredGroups = groupItems.filter(group => group.id !== removeId);
    setGroupItems(filteredGroups);
  }

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col w-full p-10">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            グループ管理
          </h1>
          <p className="text-sm">
            グループにする住宅会社を管理することができます。
          </p>
        </div>

        {/* Invite Group */}
        <div className="flex justify-center mb-6">
          <Link href="/group/invite" className="flex items-center px-7 py-1 text-white bg-[#1976d2] rounded-[1px]">
            <FaPlus className="text-xl" />
            <span className="text-xl ml-2">新しく招待する</span>
          </Link>
        </div>

        <div className="flex flex-col w-full bg-white grow p-5">
          <GroupSearchBar setKeyword={setKeyword} />
          {selectedGroupItems.length ? (
            <div className="flex flex-col grow">
              <PaginationItem
                totalPages={Math.ceil(groupItems.length / 20)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

              <div className="grow bg-white w-full p-5">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal">住宅会社名</th>
                      <th className="bg-[#2fa8b5] p-3 text-sm text-white font-normal">メールアドレス</th>
                      <th className="w-[20%] bg-[#2fa8b5] p-3 text-sm text-white font-normal">参加日</th>
                      <th className="w-[20%] bg-[#2fa8b5] p-3 text-sm text-white font-normal">最終アクセス日時</th>
                      <th className="w-[130px] bg-[#2fa8b5] p-3 text-sm text-white font-normal">変更</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedGroupItems.map((groupItem, index) => {
                      const { id, name, email, createdAt, updatedAt } = groupItem;

                      return (
                        <tr className="w-full" key={index}>
                          <td className="p-4 text-sm">
                            {name}
                            <ManageBtn subId={id} name={name} />
                          </td>
                          <td className="p-4 text-sm">
                            {email}
                          </td>
                          <td className="p-4 text-sm">
                            {formatISO8601TimestampToJapaneseString(createdAt.toString())}
                          </td>
                          <td className="p-4 text-sm">
                            {formatISO8601TimestampToJapaneseString(updatedAt.toString())}
                          </td>
                          <td className="p-2 text-sm">
                            <GroupDeleteBtn groupID={cookies['user'].id} userID={id} handleRemoveGroup={handleRemoveGroup} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <PaginationItem
                totalPages={Math.ceil(groupItems.length / 20)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <p className="bg-[#fcf8e3] border-[#faebcc] border-[1px] p-4 rounded-sm">
              参加している住宅会社はありません。
            </p>
          )}
        </div>
      </div>
    )
  );
}

export default UsersGroupPage;