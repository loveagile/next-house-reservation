"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import InputLabel from "@mui/material/InputLabel";

import Loading from "@/components/molecules/loading";
import UpdateBtn from "@/components/atoms/Button/UpdateBtn";
import SelectBox from "@/components/molecules/SelectBox";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

interface IPropertyTypeProps {
  propertyType: string;
}

const properties = ["設定しない", "戸建て", "建築条件付土地", "土地"];

const EventPropertyTypeEditPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [propertyType, setPropertyType] = useState<string>("設定しない");
  const router = useRouter();

  useEffect(() => {
    const fetchEventPropertyType = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        setPropertyType(res.data[0].propertyType);
      }
      setIsLoading(false);
    };
    fetchEventPropertyType();
  }, [id]);

  const { control, handleSubmit } = useForm<IPropertyTypeProps>();

  const onSubmit = async (data: IPropertyTypeProps) => {
    const { propertyType } = data;

    await axios.post("/api/events/update", {
      id,
      field_names: ["propertyType"],
      field_values: [propertyType],
    });

    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
          物件形態
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <div className="flex w-[250px] justify-end pr-5 mt-1">
            <InputLabel htmlFor="type">物件形態</InputLabel>
          </div>
          <div className="flex flex-col w-full">
            <SelectBox
              id="propertyType"
              control={control}
              value={propertyType}
              names={properties}
              className="max-w-[250px]"
            />
            <UpdateBtn />
          </div>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default EventPropertyTypeEditPage;
