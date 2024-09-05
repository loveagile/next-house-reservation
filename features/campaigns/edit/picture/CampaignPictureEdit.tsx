"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import RegisteredImage from "@/components/molecules/RegisteredImage/RegisteredImage";
import CampaignImageUpload from "@/components/molecules/CampaignImageUpload/CampaignImageUpload";

import "./CampaignPictureEdit.css";

export interface IRegisteredImageProps {
  urls: string[];
  mainIndex: number;
}

const CampaignPictureEditPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registeredImgs, setRegisteredImgs] = useState<IRegisteredImageProps>({
    urls: [],
    mainIndex: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchCampaignImage = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/campaigns/detail", { id });
      if (res.status === 200) {
        if (res.data[0].images)
          setRegisteredImgs({
            urls: res.data[0].images.split(",").map((img: string) => img.trim()),
            mainIndex: res.data[0].mainIndex,
          });
      } else {
        setRegisteredImgs({
          urls: [],
          mainIndex: 0,
        });
      }
      setIsLoading(false);
    };
    fetchCampaignImage();
  }, []);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    await axios.post("/api/campaigns/update", {
      id,
      field_name: "images",
      field_value: registeredImgs.urls.join(","),
    });
    await axios.post("/api/campaigns/update", {
      id,
      field_name: "mainIndex",
      field_value: registeredImgs.mainIndex,
    });
    router.push(`/campaigns/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
          画像の追加
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <CampaignImageUpload setRegisteredImgs={setRegisteredImgs} />
        </div>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <RegisteredImage
            registeredImgs={registeredImgs}
            setRegisteredImgs={setRegisteredImgs}
            isMainImgDisplayed
          />
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/campaigns/${id}`} />
      </div>
    </form>
  );
};

export default CampaignPictureEditPage;
