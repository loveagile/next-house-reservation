"use client";

import InputField from "@/components/molecules/InputField/InputField";
import InputLabel from "@mui/material/InputLabel";
import RequiredLabel from "@/components/atoms/RequiredLabel";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/Loading/loading";
import EditBackBtn from "@/components/atoms/EditBackBtn";
import "./EventTagEdit.css";

interface ITagProps {
  tag: string;
}

const EventTagEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    const fetchEventTag = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) setTag(res.data[0].tag);
      setIsLoading(false);
    };
    fetchEventTag();
  }, []);

  const { control, handleSubmit } = useForm<ITagProps>();

  const onSubmit = async (data: ITagProps) => {
    const { tag } = data;

    await axios.post("/api/events/update", {
      id,
      field_name: "tag",
      field_value: tag,
    });

    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-5 font-bold text-[#555]">
          イベントタグ
        </h1>
        <div className="flex flex-col bg-white items-start mt-5 p-5 w-full">
          <p className="text-sm leading-6 mb-4">
            このイベントの特徴を表す言葉や単語などを自由にご入力ください。
            <br></br>
            入力例）キッズルームあり、QUOカードをプレゼント、駐車スペースあり
          </p>
          <div className="flex flex-col w-full">
            <InputField
              id="tag"
              control={control}
              value={tag}
              className="max-w-full"
            />
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

export default EventTagEditPage;
