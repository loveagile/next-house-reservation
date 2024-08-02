"use client";

import InputField from "@/components/molecules/InputField/InputField";
import InputLabel from "@mui/material/InputLabel";
import RequiredLabel from "@/components/atoms/RequiredLabel";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/Loading/loading";
import EditBackBtn from "@/components/atoms/EditBackBtn";
import "./EventTitleEdit.css";

interface ITitleProps {
  title: string;
}

const EventTitleEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchEventTitle = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", {
        id,
      });
      if (res.status === 200) setTitle(res.data[0].title);
      setIsLoading(false);
    };
    fetchEventTitle();
  }, [id]);

  const schema = yup.object().shape({
    title: yup.string().required("入力してください。"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITitleProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ITitleProps) => {
    const { title } = data;

    await axios.post("/api/events/update", {
      id,
      field_name: "title",
      field_value: title,
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
            <InputLabel htmlFor="title">イベント名</InputLabel>
            <RequiredLabel />
          </div>
          <div className="flex flex-col w-full">
            <InputField id="title" control={control} value={title} />
            {errors.title && (
              <p className="text-[14px] mt-3 text-m-red">
                {errors.title.message}
              </p>
            )}
            <Button type="submit" className="update_btn" variant="contained">
              更新する
            </Button>
          </div>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/campaigns/${id}`} />
      </div>
    </form>
  );
};

export default EventTitleEditPage;
