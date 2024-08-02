"use client";

import InputField from "@/components/molecules/InputField/InputField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { types, formats } from "@/utils/constants";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";
import MultilineField from "@/components/molecules/MultilineField/MultilineField";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import RequiredLabel from "@/components/atoms/RequiredLabel";
import EditBackBtn from "@/components/atoms/EditBackBtn";
import "./EventCreatePage.css";

interface IEventCreateForm {
  title: string;
  type?: string;
  format?: string;
  note?: string;
}

export default function EventCreatePage() {
  const router = useRouter();

  const schema = yup.object().shape({
    title: yup.string().required("入力してください。"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEventCreateForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IEventCreateForm) => {
    const { title, type, format, note } = data;

    const res = await axios.post('/api/events/create', {
      title,
      type,
      format,
      note,
    });

    const { lastInsertedId } = res.data;

    router.push(`/events/${lastInsertedId}`);
  };

  return (
    <div className="flex flex-col p-10 w-full">
      <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-5 font-bold text-[#555]">
        イベントの作成開始
      </h1>
      <div className="bg-white w-full p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Event Title */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5">
              <InputLabel htmlFor="title">イベント名</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <InputField id="title" control={control} />
              {errors.title && (
                <p className="text-[14px] mt-3 text-m-red">
                  {errors.title.message}
                </p>
              )}
              <p
                className={`text-[14px] mt-3 ${
                  errors.title ? "text-m-red" : ""
                }`}
              >
                ※地域名をタイトルの先頭に入れると検索によるアクセス増加が見込めます。
                <br></br>
                例）《XX市XX区XX町》XX見学会
              </p>
            </div>
          </div>

          {/* Event Type */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5">
              <InputLabel htmlFor="type">イベントの種類</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <SelectBox
                id="type"
                control={control}
                names={types.slice(1)}
                className="max-w-[400px]"
              />
              <p className="text-[14px] mt-3">
                ※オンライン相談ツール「Zoom（ズーム）」を利用したオンライン住宅イベントを実施する場合は、「オンライン相談会」
                or 「オンライン見学会」を選択してください。<br></br>
                ※スペースコアと連携する場合は「無人見学会」をご利用ください。
                <br></br>
                ※KengakuCloudの「OB邸見学」機能を使用して開催されたイベントへは見学保険が適用されます。
              </p>
            </div>
          </div>

          {/* Event Format */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5">
              <InputLabel htmlFor="format">イベントの開催形式</InputLabel>
              <RequiredLabel />
            </div>
            <div className="w-full">
              <SelectBox
                id="format"
                names={formats}
                control={control}
                className="max-w-[400px]"
              />
              <p className="text-[14px] mt-3 tracking-wide">
                ※イベントの開催形式は下記から選べます。 <br></br>
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

          {/* Event Note */}
          <div className="flex items-start mt-5">
            <div className="flex min-w-[230px] justify-end pr-5">
              <InputLabel className="mr-5" htmlFor="note">
                社内用備考欄
              </InputLabel>
            </div>
            <div className="w-full">
              <MultilineField id="note" control={control} />
              <p className="text-[14px] mt-3 tracking-wide">
                ※社内用に共有するメモがある場合にご入力ください。<br></br>
                こちらに入力した内容はイベント編集ページで表示されます。
                <br></br>
                また、設定したメモがイベントページに表示されることはありません。
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
                className="register_btn"
                variant="contained"
              >
                登録する
              </Button>
            </div>
          </div>
        </form>
      </div>
      <EditBackBtn linkUrl={"/events/list"} className="mt-4" />
    </div>
  );
}
