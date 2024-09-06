
"use client";

import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import Loading from "@/components/molecules/loading";
import CheckBox from "@/components/molecules/Input/CheckBox";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import InputField from "@/components/molecules/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";

import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import { IAccount } from "@/utils/types";

interface IAccountEditForm {
  name: string;
  email: string;
  phone?: string;
}

export default function AccountEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState<IAccount>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isManager, setIsManager] = useState<boolean>(false);

  useEffect(() => {
    const fetchAccountDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/accounts/detail", {
        field_name: "id",
        field_value: id.toString(),
      });
      if (res.status === 200) {
        const account = res.data[0];
        setCurrentAccount(account);
        setIsManager(account.privilege === "管理者");
      }
      setIsLoading(false);
    }
    fetchAccountDetail();
  }, [])

  const schema = yup.object({
    name: yup.string().required("入力してください。"),
    email: yup
      .string()
      .required("入力してください。")
      .email("メールアドレスを正しく入力してください")
      .max(80, "80字以内で入力してください"),
    phone: yup
      .string()
      .transform((value) => (value ? value.replaceAll("-", "") : value))
      .test("is-valid-phone", "電話番号を正しく入力してください", (value) => {
        if (!value) return true;
        return /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/g.test(value);
      }),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<IAccountEditForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IAccountEditForm) => {
    const { name, email, phone } = data;
    await axios.post("/api/accounts/updateAll", {
      id,
      name,
      email,
      phone,
      privilege: isManager === true ? "管理者" : "スタッフ"
    })
    router.push("/accounts/list");
  }

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col w-full p-10">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            アカウント管理
          </h1>
          <p className="text-sm">
            アカウント登録内容の変更・追加設定を行うことができます。必要情報を入力してください。
          </p>
        </div>

        <div className="flex flex-col w-full bg-white p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start">
              <div className="flex min-w-[230px] justify-end pr-5 mt-1">
                <InputLabel htmlFor="name">お名前</InputLabel>
                <RequiredLabel />
              </div>
              <div className="w-full">
                <InputField id="name" value={currentAccount?.name} control={control} className="w-full" />
                {errors.name && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Account Email Address */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5 mt-1">
                <InputLabel htmlFor="email">メールアドレス</InputLabel>
                <RequiredLabel />
              </div>
              <div className="w-full">
                <InputField id="email" value={currentAccount?.email} control={control} className="w-full" />
                {errors.email && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Account Phone Number */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5 mt-1">
                <InputLabel htmlFor="phone">電話番号</InputLabel>
              </div>
              <div className="w-full">
                <InputField id="phone" value={currentAccount?.phone} control={control} placeholder="080-1234-5555" className="w-full" />
                {errors.phone && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.phone.message}
                  </p>
                )}
                <p className="text-sm mt-4">
                  ※日程調整予約を行う際にSMSを利用するため、日程調整を利用する場合は必ず「携帯番号」を正しくご入力ください。<br></br>
                  <CheckBox
                    checked={isManager} setChecked={setIsManager}
                    className="flex items-center gap-x-2 mt-6 mb-2"
                    text="管理者"
                  />
                  ※管理者に設定すると全ての機能の閲覧/作成/編集が可能です。<br></br>
                </p>
              </div>
            </div>

            {/* Register Button */}
            <div className="flex items-start my-5">
              <div className="flex min-w-[230px] justify-end pr-5"></div>
              <div className="w-full">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: "3px 30px",
                    fontSize: "20px",
                    borderRadius: "1px",
                  }}
                >
                  更新する
                </Button>
              </div>
            </div>
          </form>
        </div>
        <EditBackBtn linkUrl="/accounts/list" className="mt-4" />
      </div>
    )
  );
}