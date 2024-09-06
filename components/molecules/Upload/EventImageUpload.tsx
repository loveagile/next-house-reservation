"use client";

import * as React from "react";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

import { IoMdCloudUpload } from "react-icons/io";

import { Button, Box, InputLabel } from "@mui/material";

import { IRegisteredImageProps } from "./RegisteredImage";

interface IImageProps {
  url: string;
  name: string;
}

interface IImageUploadProps {
  setRegisteredImgs: React.Dispatch<
    React.SetStateAction<IRegisteredImageProps>
  >;
}

const EventImageUpload: React.FC<IImageUploadProps> = ({ setRegisteredImgs }) => {
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

    const res = await axios.post("/api/events/upload-image", formData);

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
          <Box className="flex items-center border-[1px] border-[#ccc] rounded w-[400px]">
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
                className="rounded-none YuGothic"
                startIcon={<IoMdCloudUpload />}
              >
                画像を選択
              </Button>
            </label>
            <span className="ml-3 text-sm">{uploadImg.name}</span>
          </Box>
          <p className="text-sm mt-3 leading-6">
            ※推奨サイズ: 「1024px × 768px」、画像比率: 「4(横) : 3(縦)」
            <br></br>
            ※アップロード画像の推奨カラーモードは「RGB」です。「CMYK」でアップロードいただいた場合、本来の色とは異なった見え方になる可能性があります。
            <br></br>
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
            variant="contained"
            sx={{
              width: "170px",
              fontSize: "20px",
              marginTop: "20px",
              padding: "3px 25px",
              borderRadius: "1px",
              textAlign: "center",
            }}
          >
            登録する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventImageUpload;
