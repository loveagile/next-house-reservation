"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import InputLabel from "@mui/material/InputLabel";

import UpdateBtn from "@/components/atoms/Button/UpdateBtn";
import Loading from "@/components/molecules/loading";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import MultilineField from "@/components/molecules/MultilineField";

interface INoteProps {
  note: string;
}

const EventNoteEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    const fetchEventNote = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        setNote(res.data[0].note);
      }
      setIsLoading(false);
    };
    fetchEventNote();
  }, [id]);

  const { control, handleSubmit } = useForm<INoteProps>();

  const onSubmit = async (data: INoteProps) => {
    const { note } = data;

    await axios.post("/api/events/update", {
      id,
      field_names: ["note"],
      field_values: [note],
    });

    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-lg pl-2 mb-5 font-bold">
          社内用備考欄 の編集
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <div className="flex w-[250px] justify-end pr-5">
            <InputLabel htmlFor="note">社内用備考欄</InputLabel>
          </div>
          <div className="flex flex-col w-full">
            <MultilineField id="note" control={control} value={note} />
            <UpdateBtn />
          </div>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default EventNoteEditPage;
