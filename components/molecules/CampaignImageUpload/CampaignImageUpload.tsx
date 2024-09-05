"use client";

import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import { Button, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { IRegisteredImageProps } from "@/features/campaigns/edit/picture/CampaignPictureEdit";

import "./CampaignImageUpload.css";

interface IImageProps {
  url: string;
  name: string;
}

interface IImageUploadProps {
  setRegisteredImgs: React.Dispatch<
    React.SetStateAction<IRegisteredImageProps>
  >;
}

const CampaignImageUpload: React.FC<IImageUploadProps> = ({
  setRegisteredImgs,
}) => {
  const [uploadImg, setUploadImg] = useState<IImageProps>({
    url: "",
    name: "選択ファイルなし",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image = event.target.files?.[0];
    if (!image) {
      setUploadImg({
        url: "",
        name: "選択ファイルなし",
      });
      setErrorMsg("エラーがあります。確認してください。");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("/api/campaigns/upload-image", formData);

    setErrorMsg("");
    setUploadImg({
      url: res.data.url,
      name: image.name,
    });
  };

  const addImageURL = () => {
    if (!uploadImg.url) {
      setErrorMsg("エラーがあります。確認してください。");
      return;
    }
    setRegisteredImgs((prevState: IRegisteredImageProps) => ({
      ...prevState,
      urls: [...prevState.urls, uploadImg.url],
    }));
  };

  return (
    <div className="flex flex-col w-full">
      {errorMsg && (
        <p className="rounded-[5px] border-[1px] text-m-red border-m-red p-4 mb-5">
          {errorMsg}
        </p>
      )}
      <div className="flex">
        <div className="flex min-w-[250px] justify-end pr-5">
          <InputLabel htmlFor="picture">画像をアップロード</InputLabel>
        </div>
        <div className="flex flex-col w-full">
          <Box className="border-[1px] border-[#ccc] rounded w-[400px]">
            <input
              accept=".png, .jpg, .jpeg"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                color="primary"
                component="span"
                className="rounded-none"
                startIcon={<CloudUploadIcon />}
              >
                画像を選択
              </Button>
            </label>
            <span className="ml-2">{uploadImg.name}</span>
          </Box>
          <p className="text-sm mt-3">
            ※推奨サイズ: 「640px × 480px」、画像比率: 「4(横) : 3(縦)」<br></br>
            ※アップロード画像の推奨カラーモードは「RGB」です。「CMYK」でアップロードいただいた場合、本来の色とは異なった見え方になる可能性があります。
            <br></br>
            画像は4枚までアップロード可能です。<br></br>
            また、アップロードできる画像の拡張子は「.png, .jpg,
            .jpeg」のみとなっております。
          </p>
          {uploadImg.url && (
            <Image
              src={uploadImg.url}
              alt="アップロード画像"
              width={300}
              height={200}
            />
          )}
          <Button
            onClick={addImageURL}
            className="update_btn"
            variant="contained"
          >
            登録する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignImageUpload;
