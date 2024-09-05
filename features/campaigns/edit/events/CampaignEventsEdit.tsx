"use client";

import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import "./CampaignEventsEdit.css";

const CampaignEventsEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchCampaignEvents = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/campaigns/detail", {
        id,
      });
      if (res.status === 200) setTitle(res.data[0].title);
      setIsLoading(false);
    };
    fetchCampaignEvents();
  }, [id]);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    // const { title } = data;

    // const res = await axios.post("/api/campaigns/update", {
    //   id,
    //   field_name: "title",
    //   field_value: title,
    // });

    router.push(`/campaigns/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl p-0 pl-2 mb-5 font-bold ">
          掲載イベント選択
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <div className="flex flex-col w-full">
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

export default CampaignEventsEditPage;
