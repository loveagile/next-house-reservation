"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

import Loading from "@/components/molecules/loading";
import UpdateBtn from "@/components/atoms/Button/UpdateBtn";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";

import Skeleton from "@mui/material/Skeleton";

const CKEditorFC = dynamic(
  () => import("@/components/molecules/CKEditorFC"),
  {
    ssr: false,
    loading: () => (
      <Skeleton variant="rectangular" sx={{
        width: "100%",
        height: "440px",
      }} />
    ),
  }
);

const EventFeatureEditPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feature, setFeature] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchEventFeature = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        setFeature(res.data[0].feature || "");
      }
      setIsLoading(false);
    };
    fetchEventFeature();
  }, []);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    await axios.post("/api/events/update", {
      id,
      field_names: ["feature"],
      field_values: [feature],
    });
    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
          見どころ・特徴 の編集
        </h1>
        <p>
          下記はイベントページの表示可能な横幅と同じ幅で表示しています。編集画面にて画像がはみ出した場合、自動的に縮小処理をして表示します。
        </p>
        <div className="flex flex-col bg-white items-start mt-5 p-5 w-full">
          <CKEditorFC article={feature} setArticle={setFeature} />
          <p className="text-sm mt-3">
            ※画像/動画の表示幅: 620px(最大)
            <br></br>
            ※アップロード画像の推奨カラーモードは「RGB」です。「CMYK」でアップロードいただいた場合、本来の色とは異なった見え方になる可能性があります
            <br></br>
            ※iFrameの埋め込みは現在のページでは正しく表示されない場合がございます。「更新する」ボタンを押下後にイベントページにて確認してください。
          </p>
          <UpdateBtn />
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default EventFeatureEditPage;
