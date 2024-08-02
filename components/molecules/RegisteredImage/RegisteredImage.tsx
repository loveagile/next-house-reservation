"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@mui/material";

import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IRegisteredImageProps } from "@/features/campaigns/edit/picture/CampaignPictureEdit";

import "./RegisteredImage.css";

interface IRegistereProps {
  registeredImgs: IRegisteredImageProps;
  setRegisteredImgs: React.Dispatch<
    React.SetStateAction<IRegisteredImageProps>
  >;
  isMainImgDisplayed?: boolean;
}

const RegisteredImage: React.FC<IRegistereProps> = ({
  registeredImgs,
  setRegisteredImgs,
  isMainImgDisplayed = false,
}) => {
  const handleMainBtn = (index: number) => {
    setRegisteredImgs((prevState: IRegisteredImageProps) => ({
      ...prevState,
      mainIndex: index,
    }));
  };

  const handleUpArrowBtn = (index: number) => {
    let swapUrls = registeredImgs.urls;
    [swapUrls[index - 1], swapUrls[index]] = [
      swapUrls[index],
      swapUrls[index - 1],
    ];
    let mainIndex = registeredImgs.mainIndex;
    if (mainIndex === index - 1) mainIndex = index;
    else if (mainIndex === index) mainIndex = index - 1;
    setRegisteredImgs({
      urls: swapUrls,
      mainIndex,
    });
  };

  const handleUpDownBtn = (index: number) => {
    let swapUrls = registeredImgs.urls;
    [swapUrls[index], swapUrls[index + 1]] = [
      swapUrls[index + 1],
      swapUrls[index],
    ];
    let mainIndex = registeredImgs.mainIndex;
    if (mainIndex === index) mainIndex = index + 1;
    else if (mainIndex === index + 1) mainIndex = index;
    setRegisteredImgs({
      urls: swapUrls,
      mainIndex,
    });
  };

  const handleDeleteBtn = (index: number) => {
    let urls = registeredImgs.urls;
    let mainIndex = registeredImgs.mainIndex;
    if (mainIndex === urls.length - 1) {
      mainIndex = Math.max(urls.length - 2, 0);
    }
    setRegisteredImgs((prevState: IRegisteredImageProps) => ({
      urls: [...urls.slice(0, index), ...urls.slice(index + 1)],
      mainIndex,
    }));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-[18px] mb-5">登録済み画像</div>
      <hr className="w-full h-[1px] border-t-[1px] border-t-[#ccc]" />
      {registeredImgs.urls.map((img, index) => (
        <div key={index} className="flex border-b-[1px] border-b-[#ccc] py-4">
          <div className="min-w-[100px]">
            <strong>{index + 1}</strong>
            {isMainImgDisplayed === true &&
              registeredImgs.mainIndex === index && (
                <span className="text-xs bg-[#ea9b54] px-2 py-1 text-white ml-2 font-semibold">
                  メイン画像
                </span>
              )}
          </div>
          <div className="bg-cover bg-center">
            <Image
              src={img}
              width={100}
              height={75}
              className="border-[#ddd] border-[1px] rounded"
              alt="登録済み画像"
              objectFit="cover"
            ></Image>
          </div>
          <div className="flex flex-col justify-center min-w-[180px] ml-auto gap-y-2">
            {isMainImgDisplayed && registeredImgs.mainIndex !== index && (
              <Button
                onClick={() => handleMainBtn(index)}
                className="main_img_btn"
                variant="contained"
              >
                メイン画像に利用
              </Button>
            )}
            {index > 0 && (
              <Button
                onClick={() => handleUpArrowBtn(index)}
                className="up_arrow_btn"
                variant="outlined"
              >
                <KeyboardArrowUpRoundedIcon />
              </Button>
            )}
            {index < registeredImgs.urls.length - 1 && (
              <Button
                onClick={() => handleUpDownBtn(index)}
                className="down_arrow_btn"
                variant="outlined"
              >
                <KeyboardArrowDownRoundedIcon />
              </Button>
            )}
            <Button
              onClick={() => handleDeleteBtn(index)}
              className="delete_img_btn"
              variant="contained"
            >
              <DeleteRoundedIcon />
              画像を削除
            </Button>
          </div>
        </div>
      ))}
      <div className="flex">
        <div className="flex w-[250px] justify-end pr-5"></div>
        <Button
          type="submit"
          className="text-[20px] px-10 mt-5 update_btn"
          variant="contained"
        >
          更新する
        </Button>
      </div>
    </div>
  );
};

export default RegisteredImage;
