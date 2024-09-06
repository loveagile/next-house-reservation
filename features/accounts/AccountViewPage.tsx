
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { FaPlus, FaUnlockKeyhole, FaEnvelope } from "react-icons/fa6";
import { RiSettings3Fill } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";

import Loading from "@/components/molecules/loading";
import AccountDeleteBtn from "@/components/atoms/Button/AccountDeleteBtn";

import Button from "@mui/material/Button";
import { IAccount } from "@/utils/types";

export default function AccountViewPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/accounts/view");
      if (res.status === 200) {
        setAccounts(res.data);
      }
      setIsLoading(false);
    };
    fetchAccounts();
  }, []);

  const handleRemoveAccount = (removeId: number) => {
    const filteredAccounts = accounts.filter(account => account.id !== removeId);
    setAccounts(filteredAccounts);
  }

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col w-full p-10">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            アカウント管理
          </h1>
          <p className="text-sm">
            アカウント登録されている一覧です。新たに追加・編集・削除することができます。
          </p>
        </div>

        {/* New Account Create */}
        <div className="flex justify-center items-center mb-6">
          <Button
            variant="contained"
            href="/accounts/select_type"
            sx={{
              fontSize: "20px",
              padding: "3px 30px",
              borderRadius: "1px",
            }}
          >
            <FaPlus className="text-xl mr-1" />
            アカウントを追加する
          </Button>
        </div>

        <div className="flex flex-col w-full bg-white p-5">
          <table className="w-full">
            <thead>
              <tr>
                <th className="font-normal text-[15px] bg-[#2fa8b5] p-[10px] text-white">承認済み</th>
                <th className="font-normal text-[15px] bg-[#2fa8b5] p-[10px] text-white">権限名</th>
                <th className="font-normal text-[15px] bg-[#2fa8b5] p-[10px] text-white">お名前</th>
                <th className="font-normal text-[15px] bg-[#2fa8b5] p-[10px] text-white">メールアドレス / 電話番号</th>
                <th className="font-normal text-[15px] bg-[#2fa8b5] p-[10px] text-white">再送</th>
                <th className="font-normal text-[15px] bg-[#2fa8b5] p-[10px] text-white">パスワード再設定</th>
                <th className="font-normal text-[15px] bg-[#2fa8b5] p-[10px] text-white">編集</th>
                <th className="font-normal text-[15px] bg-[#2fa8b5] p-[10px] text-white">削除</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => {
                const { id, approved, isAdmin, privilege, name, email, phone } = account;
                return (
                  <tr key={index}>
                    <td className="p-2 text-[15px] text-center">
                      {approved > 0 && <MdOutlineDone className="w-full text-center text-lg" />}
                    </td>
                    <td className="p-2 text-[15px] text-center">{privilege}</td>
                    <td className="p-2 text-[15px] text-center">{name}</td>
                    <td className="p-2 text-[15px] text-center">
                      {email}{email && phone && " / "}{phone}
                    </td>
                    <td className="p-2 text-[15px] text-center">
                      {!approved && (
                        <Button variant="contained" sx={{
                          width: "100%",
                          backgroundColor: "#2296f3",
                          fontSize: "13px",
                          padding: "2px 0 0",
                          borderRadius: "1px",
                          '&:hover': {
                            backgroundColor: "#2296f3",
                            opacity: 0.9,
                          }
                        }}>
                          <FaEnvelope />
                          <span className="ml-1">再送</span>
                        </Button>
                      )}
                    </td>
                    <td className="p-2 text-[15px] text-center">
                      <Button variant="contained" href={`/accounts/${id}/password`} sx={{
                        width: "100%",
                        backgroundColor: "#29ac6d",
                        fontSize: "13px",
                        padding: "2px 0 0",
                        borderRadius: "1px",
                        '&:hover': {
                          backgroundColor: "#29ac6d",
                          opacity: 0.9,
                        }
                      }}
                      >
                        <RiSettings3Fill className="text-base" />
                        <span className="ml-1">パスワード再設定</span>
                      </Button>
                    </td>
                    <td className="p-2 text-[15px] text-center">
                      <Button variant="contained" href={`/accounts/${id}`} sx={{
                        width: "100%",
                        backgroundColor: "#ea9b54",
                        fontSize: "13px",
                        padding: "2px 0 0",
                        borderRadius: "1px",
                        '&:hover': {
                          backgroundColor: "#ea9b54",
                          opacity: 0.9,
                        }
                      }}
                      >
                        <FaUnlockKeyhole />
                        <span className="ml-1">編集</span>
                      </Button>
                    </td>
                    <td className="p-2 text-[15px] text-center">
                      {!isAdmin && (
                        <AccountDeleteBtn id={id} handleRemoveAccount={handleRemoveAccount} />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}