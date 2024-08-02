"use client";
import InputLabel from "@mui/material/InputLabel";
import RequiredLabel from "@/components/atoms/RequiredLabel";
import Button from "@mui/material/Button";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/Loading/loading";
import EditBackBtn from "@/components/atoms/EditBackBtn";

import { types } from "@/utils/constants";
import "./CampaignTypeEdit.css";

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
      if (res.status === 200) setType(res.data[0].type);
      setIsLoading(false);
    };
    fetchCampaignType();
  }, [id]);

  const {
    control,
    handleSubmit,
  } = useForm<ITypeProps>();

  const onSubmit = async (data: ITypeProps) => {
    const { type } = data;

    const res = await axios.post("/api/campaigns/update", {
      id,
      field_name: "type",
      field_value: type,
    });

    router.push(`/campaigns/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-5 font-bold text-[#555]">
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
            <Button type="submit" className="update_btn" variant="contained">
              更新する
            </Button>
          </div>
        </div>
        <EditBackBtn linkUrl={`/campaigns/${id}`} className="mt-4" />
      </div>
    </form>
  );
};

export default CampaignTypeEditPage;
