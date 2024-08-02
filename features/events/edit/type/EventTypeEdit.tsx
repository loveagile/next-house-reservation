"use client";
import InputField from "@/components/molecules/InputField/InputField";
import InputLabel from "@mui/material/InputLabel";
import RequiredLabel from "@/components/atoms/RequiredLabel";
import Button from "@mui/material/Button";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";

import { types } from "@/utils/constants";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/Loading/loading";
import EditBackBtn from "@/components/atoms/EditBackBtn";

import "./EventTypeEdit.css";

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
      if (res.status === 200) setType(res.data[0].type);
      setIsLoading(false);
    };
    fetchEventType();
  }, [id]);

  const { control, handleSubmit } = useForm<ITypeProps>();

  const onSubmit = async (data: ITypeProps) => {
    const { type } = data;

    const res = await axios.post("/api/events/update", {
      id,
      field_name: "type",
      field_value: type,
    });

    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-5 font-bold text-[#555]">
          イベント名 の編集
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <div className="flex w-[250px] justify-end pr-5">
            <InputLabel htmlFor="type">イベントの種類</InputLabel>
            <RequiredLabel />
          </div>
          <div className="w-full">
            <SelectBox
              id="type"
              control={control}
              value={type}
              names={types.slice(1)}
              className="max-w-[400px]"
            />
            <p className="text-[14px] mt-3">
              ※オンライン相談ツール「Zoom（ズーム）」を利用したオンライン住宅イベントを実施する場合は、「オンライン相談会」
              or 「オンライン見学会」を選択してください。<br></br>
              ※予約時にミーティング用URLを記載した招待メールを自動でお客様に送信します。
              <br></br>
              ※KengakuCloudの「OB邸見学」機能を使用して開催されたイベントへは見学保険が適用されます。
            </p>
            <Button type="submit" className="update_btn" variant="contained">
              更新する
            </Button>
          </div>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default EventTypeEditPage;
