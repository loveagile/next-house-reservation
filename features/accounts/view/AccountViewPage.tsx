
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Loading from "@/components/molecules/loading";
import AccountDeleteBtn from "@/components/molecules/AccountDeleteBtn/AccountDeleteBtn";

import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import { IAccount } from "@/utils/types";
import "./AccountViewPage.css";

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
        <div className="flex justify-center mb-6">
          <Button
            className="new_account_btn YuGothic"
            variant="contained"
            href="/accounts/select-type"
          >
            <AddRoundedIcon className="plus_sign" />
            アカウントを追加する
          </Button>
        </div>

        <div className="flex flex-col w-full bg-white p-5">
          <table className="account_table">
            <thead>
              <tr>
                <th>承認済み</th>
                <th>権限名</th>
                <th>お名前</th>
                <th>メールアドレス / 電話番号</th>
                <th>再送</th>
                <th>パスワード再設定</th>
                <th>編集</th>
                <th>削除</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => {
                const { id, approved, isAdmin, privilege, name, email, phone } = account;
                return (
                  <tr key={index}>
                    <td>{approved > 0 && <DoneRoundedIcon />}</td>
                    <td>{privilege}</td>
                    <td>{name}</td>
                    <td>
                      {email}{email && phone && " / "}{phone}
                    </td>
                    <td>
                      {!approved && (
                        <Button variant="contained" className="account_resend_btn">
                          <EmailRoundedIcon className="account_icon" />再送
                        </Button>
                      )}
                    </td>
                    <td>
                      <Button variant="contained" className="account_psd_reset_btn"
                        href={`/accounts/${id}/password`}
                      >
                        <SettingsRoundedIcon className="account_icon" />パスワード再設定
                      </Button>
                    </td>
                    <td>
                      <Button variant="contained" className="account_edit_btn"
                        href={`/accounts/${id}`}
                      >
                        <LockOpenRoundedIcon className="account_icon" />編集
                      </Button>
                    </td>
                    <td>
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