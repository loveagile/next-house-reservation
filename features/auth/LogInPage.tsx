"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import { FaArrowRightLong } from "react-icons/fa6";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

import InputField from "@/components/molecules/Input/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";

interface ILogInForm {
  email: string;
  password: string;
}

export default function LogInPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [cookies, setCookie] = useCookies(["user"]);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("メールアドレスは必須です")
      .email("メールアドレスを正しく入力してください"),
    password: yup.string().required("パスワードは必須です"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogInForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ILogInForm) => {
    const { email, password } = data;

    const res = await axios.post("/api/auth/login", {
      email,
      password,
    });

    if (res.status === 200) {
      if (res.data.error === "Invalid email") {
        setError("メールアドレスは存在しません。");
        return;
      } else if (res.data.error === "Invalid password") {
        setError("パスワードが違います。");
        return;
      } else {
        setCookie("user", res.data);
        router.push("/");
      }
    } else {
      setError("メールアドレスかパスワードが違います。");
    }
  };

  return (
    <div className="max-w-[600px] m-auto">
      <div className="bg-white w-full m-4 px-10 pt-8 pb-10">
        <figure className="flex justify-center mb-5">
          <Image src="/imgs/icons/logo.svg" width={125} height={80} alt="LOGO" />
        </figure>
        <div className="text-center text-black">
          <h1 className="text-xl font-bold">スマイルビルダーズシステム</h1>
          <p className="m-2 text-sm">
            メールアドレスとパスワードを入力してください
          </p>
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

          <div className="flex flex-col">
            <div className="flex mt-6 mb-2">
              <InputLabel htmlFor="password">パスワード</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <InputField
                id="password"
                control={control}
                className="w-full"
                isPassword
              />
              {errors.password && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {!errors.email && !errors.password && error && (
            <p className="text-sm mt-3 text-m-red">{error}</p>
          )}

          {/* Register Button */}
          <div className="flex items-start my-5">
            <div className="w-full">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  padding: "4px 30px",
                  fontSize: "18px",
                  borderRadius: "1px",
                }}
              >
                ログイン
              </Button>
            </div>
          </div>
        </form>

        <Link
          href="/forgot-password"
          className="flex items-center text-[15px] text-link-color"
        >
          <FaArrowRightLong />
          <span className="ml-2">パスワードを忘れた方</span>
        </Link>
      </div>
    </div>
  );
}
