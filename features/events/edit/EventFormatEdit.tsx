"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";

import InputLabel from "@mui/material/InputLabel";

import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import UpdateBtn from "@/components/atoms/Button/UpdateBtn";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import SelectBox from "@/components/molecules/Input/SelectBox";
import Loading from "@/components/molecules/loading";

import { formats } from "@/utils/constants";

interface IFormatProps {
  format: string;
}

const EventFormatEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [format, setFormat] = useState<string>("");

  useEffect(() => {
    const fetchEventFormat = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        setFormat(res.data[0].format);
      }
      setIsLoading(false);
    };
    fetchEventFormat();
  }, [id]);

  const { control, handleSubmit } = useForm<IFormatProps>();

  const onSubmit = async (data: IFormatProps) => {
    const { format } = data;

    await axios.post("/api/events/update", {
      id,
      field_names: ["format"],
      field_values: [format],
    });

    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
          イベントの開催形式 の編集
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <div className="flex w-[250px] justify-end pr-5 mt-1">
            <InputLabel htmlFor="format">イベントの開催形式</InputLabel>
            <RequiredLabel />
          </div>
          <div className="w-full">
            <SelectBox
              id="format"
              names={formats}
              value={format}
              control={control}
              className="max-w-[400px]"
            />
            <p className="text-sm mt-3 tracking-wide">
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
            <p className="text-sm mt-8">
              オープン制から別の形式に変える場合、一度イベントが非公開に変わりますので、内容を確認して、もう一度公開ボタンを押してください。
            </p>
            <UpdateBtn />
          </div>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default EventFormatEditPage;
