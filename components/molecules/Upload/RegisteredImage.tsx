"use client";

import * as React from "react";
import Image from "next/image";

import { MdDelete, MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";

import { Button } from "@mui/material";

export interface IRegisteredImageProps {
  urls: string[];
  mainIndex: number;
}

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
    [swapUrls[index - 1], swapUrls[index]] = [swapUrls[index], swapUrls[index - 1]];
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
    [swapUrls[index], swapUrls[index + 1]] = [swapUrls[index + 1], swapUrls[index]];
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
      <div className="text-lg mb-5">登録済み画像</div>
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
              width={120}
              height={90}
              className="aspect-[4/3] border-[#ddd] border-[1px] rounded-[2px] object-cover object-center"
              alt="登録済み画像"
              objectFit="cover"
            ></Image>
          </div>
          <div className="flex flex-col justify-center min-w-[180px] ml-auto gap-y-2">
            {isMainImgDisplayed && registeredImgs.mainIndex !== index && (
              <Button
                onClick={() => handleMainBtn(index)}
                variant="contained"
                sx={{
                  fontSize: "15px",
                  borderRadius: "1px",
                  backgroundColor: "#29ac6d",
                  '&:hover': {
                    backgroundColor: "#29ac6d",
                    opacity: 0.8,
                  }
                }}
              >
                メイン画像に利用
              </Button>
            )}
            {index > 0 && (
              <Button
                onClick={() => handleUpArrowBtn(index)}
                variant="outlined"
                sx={{
                  borderRadius: "1px",
                }}
              >
                <MdKeyboardArrowUp className="text-2xl" />
              </Button>
            )}
            {index < registeredImgs.urls.length - 1 && (
              <Button
                onClick={() => handleUpDownBtn(index)}
                variant="outlined"
                sx={{
                  borderRadius: "1px",
                }}
              >
                <MdOutlineKeyboardArrowDown className="text-2xl" />
              </Button>
            )}
            <Button
              onClick={() => handleDeleteBtn(index)}
              variant="contained"
              sx={{
                fontSize: "15px",
                borderRadius: "1px",
                backgroundColor: "#e73939",
                '&:hover': {
                  backgroundColor: "#e73939",
                  opacity: 0.8,
                }
              }}
            >
              <MdDelete className="text-xl" />
              <span className="ml-1">画像を削除</span>
            </Button>
          </div>
        </div>
      ))}
      <div className="flex">
        <div className="flex w-[250px] justify-end pr-5"></div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "170px",
            fontSize: "20px",
            padding: "3px 25px",
            marginTop: "20px",
            borderRadius: "1px",
            textAlign: "center",
          }}
        >
          更新する
        </Button>
      </div>
    </div>
  );
};

export default RegisteredImage;
