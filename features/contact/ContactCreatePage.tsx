"use client";

import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Loading from "@/components/molecules/loading";
import InputField from "@/components/molecules/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import MultilineField from "@/components/molecules/MultilineField";

interface IContactForm {
  detail: string;
  contactPerson: string;
  email: string;
}

const RadioButton: React.FC<{ value: string }> = ({ value }) => {
  return (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={value}
      sx={{
        marginBottom: "4px",
        '& .MuiSvgIcon-root': {
          width: "18px",
          height: "18px",
        },
        '& .MuiRadio-root': {
          padding: "5px",
        },
        '& .MuiFormControlLabel-label': {
          fontSize: "15px",
        }
      }}
    />
  )
}

export default function ContactCreatePage() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const [content, setContent] = useState<string>("操作方法について知りたい");

  const schema = yup.object().shape({
    detail: yup.string().required("入力してください。"),
    contactPerson: yup.string().required("入力してください。"),
    email: yup.string().required("入力してください。")
      .email("メールアドレスを正しく入力してください")
      .max(80, "80字以内で入力してください"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IContactForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setIsLoading(true);
    const storedData = localStorage.getItem("contactData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setContent(data.content);
      setValue("detail", data.detail);
      setValue("contactPerson", data.contactPerson);
      setValue("email", data.email);
    }
    setIsLoading(false);
  }, [])

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }

  const onSubmit = async (data: IContactForm) => {
    const { detail, contactPerson, email } = data;
    localStorage.setItem("contactData", JSON.stringify({
      content,
      detail,
      contactPerson,
      email
    }));
    router.push("/contact/confirm");
  };

  return (
    isLoading ? <Loading /> : (
      <div className="flex flex-col p-10 w-full">
        <div className="mb-6">
          <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
            お問い合わせ
          </h1>
          <p className='text-sm'>
            自社サイトへの連携方法の使い方など、何かご不明点がありましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="bg-white w-full p-5 text-[15px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Contact Content */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5 mt-1">
                <InputLabel htmlFor="content">お問い合わせ内容</InputLabel>
                <RequiredLabel />
              </div>
              <RadioGroup name="contact-content" value={content}
                onChange={handleRadioChange}
                className="ml-3"
              >
                <RadioButton value="操作方法について知りたい" />
                <RadioButton value="魅力的なページの作り方について知りたい" />
                <RadioButton value="iemiruについて知りたい" />
                <RadioButton value="集客方法について知りたい" />
                <RadioButton value="プラン内容の確認" />
                <RadioButton value="サービスを解約したい" />
                <RadioButton value="オプションプランについて(追加の埋め込み・連携機能についてなど)" />
                <RadioButton value="有料の機能について知りたい" />
                <RadioButton value="その他" />
              </RadioGroup>
            </div>

            {/* Contact Detail */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5 mt-1">
                <InputLabel htmlFor="detail">お問い合わせ詳細</InputLabel>
                <RequiredLabel />
              </div>
              <div className="w-full">
                <MultilineField id="detail" control={control} />
                {errors.detail && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.detail.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Person */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5 mt-1">
                <InputLabel htmlFor="contactPerson">担当者名</InputLabel>
                <RequiredLabel />
              </div>
              <div className="w-full">
                <InputField id="contactPerson" control={control} className="w-full" />
                {errors.contactPerson && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.contactPerson.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Email */}
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5 mt-1">
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

            {/* Confirm Button */}
            <div className="flex items-start my-5">
              <div className="flex min-w-[230px] justify-end pr-5"></div>
              <div className="w-full">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: "3px 25px",
                    fontSize: "20px",
                    borderRadius: "1px",
                  }}
                >
                  送信内容を確認する
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div >
    )
  );
}

