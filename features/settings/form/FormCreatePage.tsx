"use client";

import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import InputField from "@/components/molecules/Input/InputField";
import SelectBox from "@/components/molecules/Input/SelectBox";
import MultilineField from "@/components/molecules/Input/MultilineField";

import { IForm } from "@/utils/types";
import { formTypes } from "@/utils/constants";

interface IFormCreateForm {
  formTitle: string;
  formDetail?: string;
  formType?: string;
  formChoice?: string;
}

export default function FormCreatePage() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [error, setError] = useState<string>("");
  const mainID = cookies['user'].id;
  const subID = cookies['user'].subId;
  const userID = subID !== -1 ? subID : mainID;

  const schema = yup.object().shape({
    formTitle: yup.string().required("入力してください。"),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormCreateForm>({
    resolver: yupResolver(schema),
  });
  const selectedType = watch("formType");

  const onSubmit = async (data: IFormCreateForm) => {
    const { formTitle, formDetail, formType, formChoice } = data;

    if ((selectedType === "ラジオボタン" || selectedType === "チェックボックス") && !formChoice) {
      setError("入力してください。");
      return;
    }
    setError("");

    const res = await axios.post('/api/forms/create', {
      userID,
      formTitle,
      formDetail,
      formType,
      formChoice,
    });

    if (res.status !== 200) {
      console.error("Error in FormCreatePage: ");
    }

    router.push("/settings/form/list");
  };

  return (
    <div className="flex flex-col p-10 w-full">
      <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-3 font-bold">
        フォーム項目編集
      </h1>
      <div className="bg-white w-full p-5 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form Title */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5 mt-1">
              <InputLabel htmlFor="formTitle">タイトル</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <InputField id="formTitle" control={control} className="w-full" />
              {errors.formTitle && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.formTitle.message}
                </p>
              )}
            </div>
          </div>

          {/* Form Detail */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5 mt-1">
              <InputLabel htmlFor="formDetail">
                説明文
              </InputLabel>
            </div>
            <div className="w-full">
              <MultilineField id="formDetail" control={control} />
            </div>
          </div>

          {/* Form Type */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5 mt-1">
              <InputLabel htmlFor="formType">種別</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <SelectBox
                id="formType"
                control={control}
                names={formTypes}
                className="max-w-[250px]"
              />
            </div>
          </div>

          {/* Form Choice */}
          {(selectedType === "ラジオボタン" || selectedType === "チェックボックス") && (
            <div className="flex items-start mt-5">
              <div className="flex min-w-[230px] justify-end pr-5 mt-1">
                <InputLabel htmlFor="formChoice">選択肢</InputLabel>
                <RequiredLabel />
              </div>
              <div className="w-full">
                <MultilineField id="formChoice" control={control} />
                {error && (
                  <p className="text-sm mt-3 text-m-red">
                    {error}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Register Button */}
          <div className="flex items-start my-5">
            <div className="flex min-w-[230px] justify-end pr-5"></div>
            <div className="w-full">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  padding: '5px 30px',
                  fontSize: '20px',
                  borderRadius: '1px',
                }}
              >
                更新する
              </Button>
            </div>
          </div>
        </form>
      </div>
      <EditBackBtn linkUrl={"/settings/form/list"} className="mt-4" />
    </div >
  );
}