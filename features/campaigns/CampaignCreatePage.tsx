"use client";

import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

import SelectBox from "@/components/molecules/Input/SelectBox";
import InputField from "@/components/molecules/Input/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

import { types, formats } from "@/utils/constants";

interface ICampaignCreateForm {
  title: string;
  type?: string;
  format?: string;
}

export default function CampaignCreatePage() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const schema = yup.object().shape({
    title: yup.string().required("入力してください。"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICampaignCreateForm>({
    resolver: yupResolver(schema),
  });

  const mainID = cookies['user'].id;
  const subID = cookies['user'].subId;
  const userID = subID !== -1 ? subID : mainID;

  const onSubmit = async (data: ICampaignCreateForm) => {
    const { title, type, format } = data;

    const res = await axios.post("/api/campaigns/create", {
      userID,
      title,
      type,
      format,
    });

    const { lastInsertedId } = res.data;
    router.push(`/campaigns/${lastInsertedId}`);
  };

  return (
    <div className="flex flex-col p-10 w-full">
      <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
        まとめページの新規作成
      </h1>
      <div className="bg-white w-full p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campaign Title */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5">
              <InputLabel htmlFor="title">まとめページの名前</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <InputField id="title" control={control} className="w-full" />
              {errors.title && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>

          {/* Campaign Type */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5">
              <InputLabel htmlFor="type">まとめページの種類</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <SelectBox
                id="type"
                control={control}
                names={types.slice(1)}
                className="max-w-[250px]"
              />
              <p className="text-sm mt-3">
                ※オンライン相談会/オンライン見学会/オンラインセミナーに該当しないケースでご利用いただく場合は「オンライン」をご利用ください。
                <br></br>
                スペースコアと連携する場合は「無人見学会」をご利用ください。
              </p>
            </div>
          </div>

          {/* Campaign Format */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5">
              <InputLabel htmlFor="format">まとめページの開催形式</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <SelectBox
                id="format"
                names={formats}
                control={control}
                className="max-w-[250px]"
              />
              <p className="text-sm mt-3 tracking-wide">
                ※イベントの開催形式は下記から選べます。<br></br>
                <span className="font-bold">オープン制: </span>
                予約が必要ではなく、だれでも参加可能なイベント<br></br>
                <span className="font-bold">予約制: </span>
                日時を指定し予約して来場をしてもらうイベント <br></br>
                <span className="font-bold">予約承認制:</span>
                予約し、承認されたユーザーだけが詳細閲覧可能にするイベント
                <br></br>
                <span className="font-bold">日程調整予約:</span>
                日程調整ユーザー（お施主様、現場監督、セミナー講師など）と予約申込者の日程調整を可能にするイベント
                <br></br>
              </p>
            </div>
          </div>

          {/* Register Button */}
          <div className="flex items-start mt-5">
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
                登録する
              </Button>
            </div>
          </div>
        </form>
      </div>
      <EditBackBtn linkUrl="/campaigns/list" className="mt-4" />
    </div>
  );
}
