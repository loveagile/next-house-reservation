"use client";

import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useParams } from "next/navigation";

import Loading from "@/components/molecules/loading";
import UpdateBtn from "@/components/atoms/Button/UpdateBtn";
import InputField from "@/components/molecules/InputField";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";

import InputLabel from "@mui/material/InputLabel";

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
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        setTitle(res.data[0].title);
      }
      setIsLoading(false);
    };
    fetchEventTitle();
  }, [id]);

  const schema = yup.object().shape({
    title: yup.string().required("入力してください。"),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<ITitleProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ITitleProps) => {
    const { title } = data;

    await axios.post("/api/events/update", {
      id,
      field_names: ["title"],
      field_values: [title],
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
          <div className="flex w-[250px] justify-end pr-5">
            <InputLabel htmlFor="title">イベント名</InputLabel>
            <RequiredLabel />
          </div>
          <div className="flex flex-col w-full">
            <InputField id="title" control={control} value={title} />
            {errors.title && (
              <p className="text-sm mt-3 text-m-red">
                {errors.title.message}
              </p>
            )}
            <UpdateBtn />
          </div>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default EventTitleEditPage;
