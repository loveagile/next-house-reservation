"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

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

const CampaignTypeEditPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchCampaignType = async () => {
      setIsLoading(true);

      const res = await axios.post("/api/campaigns/detail", { id });
      if (res.status === 200) {
        setType(res.data[0].type);
      }

      setIsLoading(false);
    };
    fetchCampaignType();
  }, [id]);

  const { control, handleSubmit } = useForm<ITypeProps>();

  const onSubmit = async (data: ITypeProps) => {
    const { type } = data;

    await axios.post("/api/campaigns/update", {
      id,
      field_names: ["type"],
      field_values: [type],
    });

    router.push(`/campaigns/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
          まとめページの種類 の編集
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <div className="flex w-[250px] justify-end pr-5">
            <InputLabel htmlFor="type">まとめページの種類</InputLabel>
            <RequiredLabel />
          </div>
          <div className="flex flex-col w-full">
            <SelectBox
              id="type"
              control={control}
              value={type}
              names={types.slice(1)}
              className="max-w-[400px]"
            />
            <UpdateBtn />
          </div>
        </div>
        <EditBackBtn linkUrl={`/campaigns/${id}`} className="mt-4" />
      </div>
    </form>
  );
};

export default CampaignTypeEditPage;
