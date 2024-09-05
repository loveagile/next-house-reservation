
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

import "./AccountMemberCreatePage.css";

interface IAccountEditForm {
  name: string;
  phone: string;
}

export default function AccountMemberCreatePage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const schema = yup.object({
    name: yup.string().required("入力してください。"),
    phone: yup
      .string().required("入力してください。")
      .transform((value) => (value ? value.replaceAll("-", "") : value))
      .test("is-valid-phone", "電話番号を正しく入力してください", (value) => {
        return /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/g.test(value);
      }),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<IAccountEditForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IAccountEditForm) => {
    const { name, phone } = data;
    const res = await axios.post("/api/accounts/detail", {
      field_name: "phone",
      field_value: phone,
    });
    const isExist = res.data.length > 0;
    if (isExist) {
      setError("電話番号はすでに存在します。");
      return;
    }
    await axios.post("/api/accounts/create", {
      name,
      phone,
      privilege: "日程調整のみ",
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
          社外の関係者アカウントを作成します。<br></br>
          日程調整予約イベントに申し込みが入った時や予約日確定の連絡は、登録された電話番号にショートメッセージが届きます。
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

          {/* Account Phone Number */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5 mt-1">
              <InputLabel htmlFor="phone">電話番号</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <InputField id="phone" control={control} placeholder="08011112222" className="w-full" />
              {errors.phone && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.phone.message}
                </p>
              )}
              <p className="text-sm mt-4">
                ※ 携帯番号（SMSが届きますので、正しくご入力ください。）<br></br>
                ※  -（ハイフン）無しで入力してください。
              </p>
              <p className="text-sm font-bold mt-4">
                「登録する」ボタンを押すと本人確認のメッセージがSMSで届きますので、URLをクリックし本人確認処理を必ず行なってください。
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