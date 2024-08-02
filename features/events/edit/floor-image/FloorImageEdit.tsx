"use client";

import RegisteredImage from "@/components/molecules/RegisteredImage/RegisteredImage";
import EventImageUpload from "@/components/molecules/EventImageUpload/EventImageUpload";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/Loading/loading";
import EditBackBtn from "@/components/atoms/EditBackBtn";

import "./FloorImageEdit.css";

export interface IRegisteredImageProps {
  urls: string[];
  mainIndex: number;
}

const FloorImageEditPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registeredImgs, setRegisteredImgs] = useState<IRegisteredImageProps>({
    urls: [],
    mainIndex: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchEventFloorImage = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        if (res.data[0].floorImgs)
          setRegisteredImgs({
            urls: res.data[0].floorImgs
              .split(",")
              .map((img: string) => img.trim()),
            mainIndex: 0,
          });
      } else {
        setRegisteredImgs({
          urls: [],
          mainIndex: 0,
        });
      }
      setIsLoading(false);
    };
    fetchEventFloorImage();
  }, []);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    await axios.post("/api/events/update", {
      id,
      field_name: "floorImgs",
      field_value: registeredImgs.urls.join(","),
    });
    router.push(`/events/${id}`);
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
          <EventImageUpload setRegisteredImgs={setRegisteredImgs} />
        </div>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <RegisteredImage
            registeredImgs={registeredImgs}
            setRegisteredImgs={setRegisteredImgs}
          />
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default FloorImageEditPage;
