"use client";

import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useParams } from "next/navigation";

import InputLabel from "@mui/material/InputLabel";

import InputField from "@/components/molecules/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import Loading from "@/components/molecules/loading";
import UpdateBtn from "@/components/atoms/Button/UpdateBtn";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

interface ITitleProps {
  title: string;
}

const CampaignTitleEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchCampaignTitle = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/campaigns/detail", { id });
      if (res.status === 200) {
        setTitle(res.data[0].title);
      }
      setIsLoading(false);
    };
    fetchCampaignTitle();
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

    await axios.post("/api/campaigns/update", {
      id,
      field_name: "title",
      field_value: title,
    });

    router.push(`/campaigns/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
          まとめページ名 の編集
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <div className="flex w-[250px] justify-end pr-5">
            <InputLabel htmlFor="title">まとめページ名</InputLabel>
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
        <EditBackBtn className="mt-4" linkUrl={`/campaigns/${id}`} />
      </div>
    </form>
  );
};

export default CampaignTitleEditPage;
