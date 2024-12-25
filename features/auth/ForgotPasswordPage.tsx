"use client";

import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import { FaArrowRightLong } from "react-icons/fa6";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

import InputField from "@/components/molecules/Input/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";

interface IForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const schema = yup.object().shape({
    email: yup.string().required('メールアドレスは必須です').email('メールアドレスを正しく入力してください'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IForgotPasswordForm) => {
    const { email } = data;

    const res = await axios.post('/api/auth/forgot-password', {
      email
    });

    if (res.status === 200) {
      if (res.data.error === "Invalid email") {
        setError("メールアドレスは見つかりません。");
        return;
      } else {
        setError("");
        router.push("/login");
        return;
      }
    } else {
      setError("メールアドレスは見つかりません。");
    }


  };

  return (
    <div className="max-w-[600px] m-auto">
      <div className="bg-white w-full p-10">
        <figure className="flex justify-center mb-5">
          <Image src="/imgs/icons/logo.svg" width={125} height={80} alt="LOGO" />
        </figure>
        <div className="text-center text-black">
          <h1 className="text-xl font-bold">パスワードが分からない方</h1>
          <p className="m-2 text-sm">パスワードのリセット方法を数分以内にメールでご連絡します。</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <div className="flex mt-6 mb-2">
              <InputLabel htmlFor="email">メールアドレス</InputLabel>
              <RequiredLabel />
            </div>

            <div className="w-full">
              <InputField id="email" control={control} className="w-full" />
              {errors.email && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {!errors.email && error && (
            <p className="text-sm mt-3 text-m-red">
              {error}
            </p>
          )}

          {/* Register Button */}
          <div className="flex items-start my-5">
            <div className="w-full">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  padding: '4px 30px',
                  fontSize: '18px',
                  borderRadius: '1px',
                }}
              >
                パスワードを再設定する
              </Button>
            </div>
          </div>
        </form>

        <Link href="/login" className="flex items-center text-[15px] text-link-color">
          <FaArrowRightLong /><span className="ml-2">ログイン</span>
        </Link>
      </div >
    </div >
  );
}
