"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";

import Loading from "@/components/molecules/loading";
import UpdateBtn from "@/components/atoms/Button/UpdateBtn";
import InputField from "@/components/molecules/Input/InputField";
import SelectBox from "@/components/molecules/Input/SelectBox";
import EditBackBtn from "@/components/atoms/Button/EditBackBtn";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";

import InputLabel from "@mui/material/InputLabel";

import { prefectures, villages, mapformats, mailformats, TPrefectureEnum } from "@/utils/constants";

interface IFormProps {
  prefecture: string;
  address1: string;
  address2: string;
  hiddenAddress: string;
  webAddress: string;
  mapAddress: string;
  mapFormat: string;
  mailFormat: string;
}

const CampaignAddressEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedVillages, setSelectedVillages] = useState<string[]>(
    villages[prefectures[0] as TPrefectureEnum]
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<IFormProps>({
    defaultValues: {
      prefecture: prefectures[0],
      address1: villages[prefectures[0] as TPrefectureEnum][0],
      address2: "",
      hiddenAddress: "",
      webAddress: prefectures[0] + villages[prefectures[0] as TPrefectureEnum][0],
      mapAddress: prefectures[0] + villages[prefectures[0] as TPrefectureEnum][0],
      mapFormat: "地図にピンを表示する",
      mailFormat: "住所を全て記載する",
    },
  });

  useEffect(() => {
    const fetchEventAddress = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        const { prefecture, address1, address2, hiddenAddress, mapFormat, mailFormat } = res.data[0];
        if (prefecture) {
          setValue("prefecture", prefecture);
          const currentVillages = villages[prefecture as TPrefectureEnum];
          setSelectedVillages(currentVillages);
          setValue(
            "address1",
            address1 || villages[prefecture as TPrefectureEnum][0]
          );
          setValue("address2", address2 || "");
          setValue("hiddenAddress", hiddenAddress || "");
          setValue(
            "webAddress",
            prefecture + (address1 || villages[prefecture as TPrefectureEnum][0]) + (address2 || "")
          );
          setValue(
            "mapAddress",
            prefecture + (address1 || villages[prefecture as TPrefectureEnum][0]) + (address2 || "") + (hiddenAddress || "")
          );
          setValue("mapFormat", mapFormat || "地図にピンを表示する");
          setValue("mailFormat", mailFormat || "住所を全て記載する");
        }
      }
      setIsLoading(false);
    };
    fetchEventAddress();
  }, []);

  const currentPrefecture = watch("prefecture") || prefectures[0];
  const currentAddress1 = watch("address1") || villages[currentPrefecture as TPrefectureEnum][0];
  const currentAddress2 = watch("address2") || "";
  const currentHiddenAddress = watch("hiddenAddress") || "";
  const webAddress = currentPrefecture + currentAddress1 + currentAddress2;
  const mapAddress = webAddress + currentHiddenAddress;
  const mapFormat = watch("mapFormat");
  const mailFormat = watch("mailFormat");

  useEffect(() => {
    const currentVillages = villages[currentPrefecture as TPrefectureEnum];
    setValue("prefecture", currentPrefecture);
    setValue("address1", currentVillages[0]);
    setSelectedVillages(currentVillages);
  }, [currentPrefecture]);

  useEffect(() => {
    setValue("address1", currentAddress1);
  }, [currentAddress1]);

  useEffect(() => {
    setValue("webAddress", webAddress);
  }, [webAddress]);

  useEffect(() => {
    setValue("mapAddress", mapAddress);
  }, [mapAddress]);

  useEffect(() => {
    setValue("mapFormat", mapFormat);
  }, [mapFormat]);

  useEffect(() => {
    setValue("mailFormat", mailFormat);
  }, [mailFormat]);

  const onSubmit = async (data: IFormProps) => {
    const { prefecture, address1, address2, hiddenAddress, mapFormat, mailFormat } = data;
    await axios.post("/api/events/update", {
      id,
      field_names: ["prefecture", "address1", "address2", "hiddenAddress", "mapFormat", "mailFormat"],
      field_values: [prefecture, address1, address2, hiddenAddress, mapFormat, mailFormat],
    })
    router.push(`/events/${id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="px-10 py-8 w-full">
        <h1 className="border-m-green border-l-[6px] text-xl pl-2 mb-5 font-bold">
          都道府県 の編集
        </h1>
        <div className="flex flex-col bg-white items-start mt-5 p-5 w-full">
          {/* Address Prefecture */}
          <div className="flex w-full items-center">
            <div className="flex w-[250px] justify-end pr-5">
              <InputLabel htmlFor="prefecture">都道府県</InputLabel>
              <RequiredLabel />
            </div>
            <div className="flex flex-col w-full">
              <SelectBox
                id="prefecture"
                control={control}
                value={currentPrefecture}
                names={prefectures}
                className="max-w-[250px]"
              />
            </div>
          </div>

          {/* Address Address1 */}
          <div className="flex w-full items-center mt-5">
            <div className="flex w-[250px] justify-end pr-5">
              <InputLabel htmlFor="address1">市区町村</InputLabel>
            </div>
            <div className="flex flex-col w-full">
              <SelectBox
                id="address1"
                control={control}
                value={currentAddress1}
                names={selectedVillages}
                className="max-w-[250px]"
              />
            </div>
          </div>

          {/* Address Address2 */}
          <div className="flex w-full items-center mt-5">
            <div className="flex w-[250px] justify-end pr-5">
              <InputLabel htmlFor="address2">以降住所</InputLabel>
            </div>
            <div className="flex flex-col w-full">
              <InputField
                id="address2"
                control={control}
                placeholder="「〇〇町」までご入力ください（英数字・記号入力不可）"
                value={currentAddress2}
              />
            </div>
          </div>

          {/* Hidden Address */}
          <div className="flex w-full items-center mt-5 pb-5 bg-[#eee]">
            <div className="flex w-[250px] justify-end pr-5">
              <InputLabel htmlFor="hiddenaddress">非表示箇所</InputLabel>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-sm mt-3 mb-1">
                ここより下は地図表示の為にご入力いただきます。
              </p>
              <InputField
                id="hiddenAddress"
                control={control}
                className="bg-white"
                placeholder="「3-16-5」など番地をご入力ください"
              />
              <p className="text-sm mt-3">
                ※プライバシー保護の為WEB上に表示しない部分はこちらに入力ください。
              </p>
            </div>
          </div>

          {/* Web Address */}
          <div className="flex w-full items-center mt-5">
            <div className="flex w-[250px] justify-end pr-5">
              <InputLabel htmlFor="webaddress">
                WEB上に表示される住所
              </InputLabel>
            </div>
            <div className="flex flex-col w-full">
              <InputField
                id="webAddress"
                disabled
                control={control}
                placeholder="「〇〇町」までご入力ください（英数字・記号入力不可）"
                value={webAddress}
              />
            </div>
          </div>

          {/* Map Address */}
          <div className="flex w-full items-center mt-5">
            <div className="flex w-[250px] justify-end pr-5">
              <InputLabel htmlFor="mapaddress">地図で利用される住所</InputLabel>
              <RequiredLabel />
            </div>
            <div className="flex flex-col w-full">
              <InputField
                id="mapAddress"
                disabled
                control={control}
                value={mapAddress}
              />
            </div>
          </div>

          {/* Map Address Format */}
          <div className="flex w-full items-center mt-5">
            <div className="flex w-[250px] self-start justify-end pr-5">
              <InputLabel htmlFor="mapformat">地図表示形式</InputLabel>
              <RequiredLabel />
            </div>
            <div className="flex flex-col w-full">
              <SelectBox
                id="mapFormat"
                control={control}
                value={mapFormat}
                names={mapformats}
                className="max-w-[250px]"
              />
              <p className="text-sm mt-3">
                ※ 地図の表示形式を選択してください。<br></br>
                ※「地図を非表示にする」に変更した場合、予約確定メールからのみ地図が表示されます。
              </p>
            </div>
          </div>

          {/* Mail Address Format */}
          <div className="flex w-full items-center mt-5">
            <div className="flex w-[250px] self-start justify-end pr-5">
              <InputLabel htmlFor="mailformat">メール住所表示形式</InputLabel>
              <RequiredLabel />
            </div>
            <div className="flex flex-col w-full">
              <SelectBox
                id="mailFormat"
                value={mailFormat}
                control={control}
                names={mailformats}
                className="max-w-[400px]"
              />
            </div>
          </div>

          {/* Register*/}
          <div className="flex w-full items-center mt-5">
            <div className="flex w-[250px] self-start justify-end pr-5"></div>
            <div className="flex flex-col w-full">
              <UpdateBtn />
            </div>
          </div>
        </div>
        <EditBackBtn className="mt-4" linkUrl={`/events/${id}`} />
      </div>
    </form>
  );
};

export default CampaignAddressEditPage;
