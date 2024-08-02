"use client";

import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/molecules/Loading/loading";
import EditBackBtn from "@/components/atoms/EditBackBtn";
import Skeleton from "@mui/material/Skeleton";

import dynamic from "next/dynamic";
import "./CampaignArticleEdit.css";

const CKEditorFC = dynamic(
  () => import("@/components/molecules/CKEditor/CKEditorFC"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="rectangular" className="CKEditorSkeleton" />
    ),
  }
);

const CampaignArticleEditPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchCampaignArticle = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/campaigns/detail", { id });
      if (res.status === 200) setArticle(res.data[0].article || "");
      setIsLoading(false);
    };
    fetchCampaignArticle();
  }, []);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    await axios.post("/api/campaigns/update", {
      id,
      field_name: "article",
      field_value: article,
    });
    router.push(`/campaigns/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-hover-green border-l-[6px] text-[20px] p-0 pl-2 mb-5 font-bold text-[#555]">
          本文 の編集
        </h1>
        <div className="flex flex-col bg-white items-start mt-5 p-5 w-full">
          <CKEditorFC article={article} setArticle={setArticle} />
          <p className="text-[14px] mt-3">
            ※画像/動画の表示サイズ: 「640px(最大) ×
            360px」（縦長や幅の大きいサイズの画像/動画は正しく表示されない場合がございます。）
            <br></br>
            ※iFrameの埋め込みは現在のページでは正しく表示されない場合がございます。「更新する」ボタンを押下後にキャンペーンページにて確認してください。
            更新する
          </p>
          <Button type="submit" className="update_btn" variant="contained">
            更新する
          </Button>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/campaigns/${id}`} />
      </div>
    </form>
  );
};

export default CampaignArticleEditPage;
