
"use client";

import axios from "axios";
import bcryptjs from 'bcryptjs';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import InputField from "@/components/molecules/InputField";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

interface IPasswordForm {
  password: string;
  confirmPassword: string;
}

export default function AccountPasswordEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const schema = yup.object().shape({
    password: yup.string().required("英数字8文字以上で入力してください。")
      .min(8, "英数字8文字以上で入力してください。").matches(
        /^(?=.*[a-zA-Z])(?=.*\d).+$/,
        "英数字8文字以上で入力してください。"
      ),
    confirmPassword: yup.string().required("英数字8文字以上で入力してください。")
      .min(8, "英数字8文字以上で入力してください。").matches(
        /^(?=.*[a-zA-Z])(?=.*\d).+$/,
        "英数字8文字以上で入力してください。"
      ).oneOf([yup.ref("password")], "パスワードの入力が一致しません。"),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<IPasswordForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IPasswordForm) => {
    const { password } = data;
    const hashPassword = await bcryptjs.hash(password, 10);
    await axios.post("/api/accounts/update", {
      id,
      field_name: "password",
      field_value: hashPassword,
    });
    router.push("/accounts/list");
  }

  return (
    <div className="flex flex-col w-full p-10">
      <div className="mb-6">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
          アカウント管理
        </h1>
        <p className="text-sm">
          パスワードの再設定を行うことができます。
        </p>
      </div>

      <div className="flex flex-col w-full bg-white p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start">
            <div className="flex min-w-[230px] justify-end pr-5 mt-1">
              <InputLabel htmlFor="password">パスワード</InputLabel>
            </div>
            <div className="w-full">
              <InputField id="password" control={control} className="w-full" isPassword />
              {errors.password && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5 mt-1">
              <InputLabel htmlFor="confirmPassword">確認用パスワード</InputLabel>
            </div>
            <div className="w-full">
              <InputField id="confirmPassword" control={control} className="w-full" isPassword />
              {errors.confirmPassword && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.confirmPassword.message}
                </p>
              )}
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
  );
}