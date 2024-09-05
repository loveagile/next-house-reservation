"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import RegisteredImage from "@/components/molecules/RegisteredImage/RegisteredImage";
import EventImageUpload from "@/components/molecules/EventImageUpload/EventImageUpload";

import "./EventPictureEdit.css";

export interface IRegisteredImageProps {
  urls: string[];
  mainIndex: number;
}

const EventPictureEditPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registeredImgs, setRegisteredImgs] = useState<IRegisteredImageProps>({
    urls: [],
    mainIndex: 0,
  });

  useEffect(() => {
    const fetchEventImage = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
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
    fetchEventImage();
  }, []);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    await axios.post("/api/events/update", {
      id,
      field_names: ["images", "mainIndex"],
      field_values: [registeredImgs.urls.join(","), registeredImgs.mainIndex],
    });
    router.push(`/events/${id}`);
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
          <EventImageUpload setRegisteredImgs={setRegisteredImgs} />
        </div>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <RegisteredImage
            registeredImgs={registeredImgs}
            setRegisteredImgs={setRegisteredImgs}
            isMainImgDisplayed
          />
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default EventPictureEditPage;
