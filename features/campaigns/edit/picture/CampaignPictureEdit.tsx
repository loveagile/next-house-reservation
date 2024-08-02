"use client";

import RegisteredImage from "@/components/molecules/RegisteredImage/RegisteredImage";
import CampaignImageUpload from "@/components/molecules/CampaignImageUpload/CampaignImageUpload";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/Loading/loading";
import EditBackBtn from "@/components/atoms/EditBackBtn";

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
        if (res.data[0].imgUrl)
          setRegisteredImgs({
            urls: res.data[0].imgUrl
              .split(",")
              .map((img: string) => img.trim()),
            mainIndex: res.data[0].mainImg,
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
      field_name: "imgUrl",
      field_value: registeredImgs.urls.join(","),
    });
    await axios.post("/api/campaigns/update", {
      id,
      field_name: "mainImg",
      field_value: registeredImgs.mainIndex,
    });
    router.push(`/campaigns/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-5 font-bold text-[#555]">
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
