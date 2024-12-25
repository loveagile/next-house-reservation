"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import InputLabel from "@mui/material/InputLabel";

import Loading from "@/components/molecules/loading";
import UpdateBtn from "@/components/atoms/Button/UpdateBtn";
import SelectBox from "@/components/molecules/Input/SelectBox";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";

import { types } from "@/utils/constants";

interface ITypeProps {
  type: string;
}

const EventTypeEditPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchEventType = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        setType(res.data[0].type);
      }
      setIsLoading(false);
    };
    fetchEventType();
  }, [id]);

  const { control, handleSubmit } = useForm<ITypeProps>();

  const onSubmit = async (data: ITypeProps) => {
    const { type } = data;

    await axios.post("/api/events/update", {
      id,
      field_names: ["type"],
      field_values: [type],
    });

    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
          イベント名 の編集
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <div className="flex w-[250px] justify-end pr-5 mt-1">
            <InputLabel htmlFor="type">イベントの種類</InputLabel>
            <RequiredLabel />
          </div>
          <div className="w-full">
            <SelectBox
              id="type"
              control={control}
              value={type}
              names={types.slice(1)}
              className="max-w-[300px]"
            />
            <p className="text-sm mt-3">
              ※オンライン相談ツール「Zoom（ズーム）」を利用したオンライン住宅イベントを実施する場合は、「オンライン相談会」
              or 「オンライン見学会」を選択してください。<br></br>
              ※予約時にミーティング用URLを記載した招待メールを自動でお客様に送信します。
              <br></br>
              ※KengakuCloudの「OB邸見学」機能を使用して開催されたイベントへは見学保険が適用されます。
            </p>
            <UpdateBtn />
          </div>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default EventTypeEditPage;
