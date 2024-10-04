"use client";

import axios from "axios";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import { FaArrowRightLong } from "react-icons/fa6";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

import SelectBox from "@/components/molecules/Input/SelectBox";
import InputField from "@/components/molecules/Input/InputField";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import MultilineField from "@/components/molecules/Input/MultilineField";

import { types, formats } from "@/utils/constants";
import { comparePassword } from "@/utils/auth";
import { useAuth } from "@/context/AuthContext";

interface ILogInForm {
  email: string;
  password: string;
}

export default function LogInPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { user, setUser } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().required('メールアドレスは必須です').email('メールアドレスを正しく入力してください'),
    password: yup.string().required('パスワードは必須です'),
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

    const res = await axios.post('/api/auth/detail', {
      email,
    });

    if (res.status === 200) {
      if (res.data.length === 0) {
        setError("メールアドレスは存在しません。");
        return;
      }
      const hashedPassword = res.data[0].password;
      if (await comparePassword(password, hashedPassword)) {
        setUser(res.data[0]);
        router.push("/home");
      } else {
        setError("パスワード が違います。");
      }
    } else {
      setError("メールアドレス か パスワード が違います。");
    }
  };

  return (
    <div className="max-w-[600px] m-auto">
      <div className="bg-white w-full m-4 p-10">
        <div className="text-center">
          <h1 className="text-xl font-bold">住宅会社様向け管理画面（ログイン）</h1>
          <p className="m-2 text-sm">メールアドレスとパスワードを入力してください</p>
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
              <InputField id="password" control={control} className="w-full" isPassword />
              {errors.password && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {error && (
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
                ログイン
              </Button>
            </div>
          </div>
        </form>

        <p className="text-sm py-4 leading-6">
          本サービスは、利用規約・プライバシーポリシーにご同意いただけない場合には、ご利用いただけません。特に利用規約には、お客様の義務、禁止事項、本サービスで保証されない事項、損害賠償の規律など、お客様と当社との間の重要な法的関係が記載されておりますので、必ずご理解いただいた上でご利用ください。
        </p>

        <ul>
          <li>
            <Link href="/home/terms_of_service" target="_blank" className="flex items-center text-[15px] text-link-color">
              <FaArrowRightLong /><span className="ml-2">利用規約</span>
            </Link>
          </li>
          <li>
            <Link href="/home/privacy_policy" target="_blank" className="flex items-center text-[15px] text-link-color">
              <FaArrowRightLong /><span className="ml-2">プライバシーポリシー</span>
            </Link>
          </li>
          <li>
            <Link href="#" target="_blank" className="flex items-center text-[15px] text-link-color">
              <FaArrowRightLong /><span className="ml-2">パスワードを忘れた方</span>
            </Link>
          </li>
          <li>
            <Link href="#" target="_blank" className="flex items-center text-[15px] text-link-color">
              <FaArrowRightLong /><span className="ml-2">確認メールが届かない方</span>
            </Link>
          </li>
        </ul>
      </div >
    </div >
  );
}
