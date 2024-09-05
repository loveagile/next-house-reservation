
"use client";

import axios from "axios";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import InputField from "@/components/molecules/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";

import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

import "./AccountNormalCreatePage.css";

interface IAccountEditForm {
  name: string;
  email: string;
  phone?: string;
}

export default function AccountNormalCreatePage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

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
    const res = await axios.post("/api/accounts/detail", {
      field_name: "email",
      field_value: email,
    });
    const isExist = res.data.length > 0;
    if (isExist) {
      setError("エラーがあります。確認してください。");
      return;
    }
    await axios.post("/api/accounts/create", {
      name,
      email,
      phone,
      privilege: "スタッフ",
    })
    router.push("/accounts/list");
  }

  return (
    <div className="flex flex-col w-full p-10">
      <div className="mb-6">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
          アカウント管理
        </h1>
        <p className="text-sm">
          社内のアカウントを作成します
        </p>
      </div>

      <div className="flex flex-col w-full bg-white p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {error &&
            <p className="border-[1px] border-m-red p-3 text-m-red rounded text-[15px] mb-4">
              <InfoRoundedIcon className="mr-1" />{error}
            </p>
          }

          <div className="flex items-start">
            <div className="flex min-w-[230px] justify-end pr-5 mt-1">
              <InputLabel htmlFor="name">お名前</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <InputField id="name" control={control} placeholder="ビズ 太郎" className="w-full" />
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
              <InputField id="email" control={control} placeholder="taro@biz-creation.co.jp" className="w-full" />
              {errors.email && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.email.message}
                </p>
              )}
              {error &&
                <p className="text-sm mt-3 text-m-red">
                  既に招待済みのメールアドレスです。
                </p>
              }
            </div>
          </div>

          {/* Account Phone Number */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5 mt-1">
              <InputLabel htmlFor="phone">電話番号</InputLabel>
            </div>
            <div className="w-full">
              <InputField id="phone" control={control} placeholder="080-1234-5555" className="w-full" />
              {errors.phone && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.phone.message}
                </p>
              )}
              <p className="text-sm mt-4">
                ※日程調整予約を行う際にSMSを利用するため、日程調整を利用する場合は必ず「携帯番号」を正しくご入力ください。<br></br>
              </p>
              <p className="text-sm font-bold mt-4">
                「登録する」ボタンを押すと本人確認のメッセージを入力したメールアドレスに届きます。URLをクリックしメールアドレスの確認処理を行なってください。
              </p>
            </div>
          </div>

          {/* Register Button */}
          <div className="flex items-start my-3">
            <div className="flex min-w-[230px] justify-end pr-5"></div>
            <div className="w-full">
              <Button
                type="submit"
                className="register_btn"
                variant="contained"
              >
                登録する
              </Button>
            </div>
          </div>
        </form>
      </div>
      <EditBackBtn linkUrl="/accounts/select-type" className="mt-4" />
    </div>
  );
}