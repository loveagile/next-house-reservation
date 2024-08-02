"use client";
import InputLabel from "@mui/material/InputLabel";
import RequiredLabel from "@/components/atoms/RequiredLabel";
import Button from "@mui/material/Button";
import SelectBox from "@/components/molecules/SelectBox/SelectBox";

import { formats } from "@/utils/constants";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/Loading/loading";
import EditBackBtn from "@/components/atoms/EditBackBtn";

import "./CampaignFormatEdit.css";

interface IFormatProps {
  format: string;
}

const CampaignFormatEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [format, setFormat] = useState<string>("");

  useEffect(() => {
    const fetchCampaignFormat = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/campaigns/detail", { id });
      if (res.status === 200) setFormat(res.data[0].format);
      setIsLoading(false);
    };
    fetchCampaignFormat();
  }, [id]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormatProps>();

  const onSubmit = async (data: IFormatProps) => {
    const { format } = data;

    const res = await axios.post("/api/campaigns/update", {
      id,
      field_name: "format",
      field_value: format,
    });

    router.push(`/campaigns/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-5 font-bold text-[#555]">
          まとめページの開催形式 の編集
        </h1>
        <div className="flex bg-white items-start mt-5 p-5 w-full">
          <div className="flex min-w-[250px] justify-end pr-5">
            <InputLabel htmlFor="format">まとめページの開催形式</InputLabel>
            <RequiredLabel />
          </div>
          <div className="w-full">
            <SelectBox
              id="format"
              names={formats.slice(0, 3)}
              value={format}
              control={control}
              className="max-w-[400px]"
            />
            <p className="text-sm mt-3 tracking-wide">
              ※イベントの開催形式は下記から選べます。<br></br>
              <span className="font-bold">オープン制: </span>
              予約が必要ではなく、だれでも参加可能なイベント<br></br>
              <span className="font-bold">予約制: </span>
              日時を指定し予約して来場をしてもらうイベント <br></br>
              <span className="font-bold">予約承認制:</span>
              予約し、承認されたユーザーだけが詳細閲覧可能にするイベント
              <br></br>
            </p>
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

export default CampaignFormatEditPage;
