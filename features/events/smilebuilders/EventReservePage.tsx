"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, InputLabel } from "@mui/material";

import { FaCheck } from "react-icons/fa6";
import { IoArrowBackCircle } from "react-icons/io5";
import { BsFillCheckCircleFill } from "react-icons/bs";

import CheckBox from "@/components/molecules/Input/CheckBox";
import InputField from "@/components/molecules/Input/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import MultilineField from "@/components/molecules/Input/MultilineField";

import Loading from "@/components/molecules/loading";
import { IEvent, initialEvent } from "@/utils/types";
import { formatDateToJapaneseString } from "@/utils/convert";

interface IEventReserveForm {
  reserveDate: string;
  startTime: string;
  endTime: string;
}

interface ICustomerForm {
  lastName: string;
  firstName: string;
  seiName: string;
  meiName: string;
  zipCode: string;
  prefecture: string;
  city: string;
  street: string;
  building?: string;
  phone: string;
  email: string;
  note?: string;
}

const initialCustomer: ICustomerForm = {
  lastName: "",
  firstName: "",
  seiName: "",
  meiName: "",
  zipCode: "",
  prefecture: "",
  city: "",
  street: "",
  building: "",
  phone: "",
  email: "",
  note: "",
}

const hiraganaRegex = /^[\u3040-\u309Fー]+$/;

const EventReservePage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<IEvent>(initialEvent);
  const [reserveDateTime, setReserveDateTime] = useState<IEventReserveForm>({
    reserveDate: new Date().toString(),
    startTime: "00:00",
    endTime: "23:30",
  });
  const [customer, setCustomer] = useState<ICustomerForm>(initialCustomer);
  const [isReceiveInfo, setIsReceiveInfo] = useState<boolean>(false);

  const schema = yup.object().shape({
    lastName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください"),
    firstName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください"),
    seiName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください")
      .matches(hiraganaRegex, 'ひらがなで入力してください'),
    meiName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください")
      .matches(hiraganaRegex, 'ひらがなで入力してください'),
    zipCode: yup.string().required("入力してください。")
      .test('is-not-empty', '7桁の数字で入力してください', (value) => {
        value = value.replaceAll('-', '')
        return /^\d+$/.test(value) && value.length === 7;
      }),
    prefecture: yup.string().required("入力してください。"),
    city: yup.string().required("入力してください。"),
    street: yup.string().required("入力してください。"),
    phone: yup.string().required("入力してください。")
      .test('is-not-empty', '電話番号を正しく入力してください', (value) => {
        value = value.replaceAll('-', '')
        return /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/g.test(value)
      }),
    email: yup.string().required("入力してください。")
      .email("メールアドレスを正しく入力してください")
      .max(80, "80字以内で入力してください"),
  });

  const {
    control,
    handleSubmit,
    watch, setValue,
    formState: { errors },
  } = useForm<ICustomerForm>({
    resolver: yupResolver(schema),
  });

  const zipCode = watch("zipCode");
  useEffect(() => {
    const getAddress = async () => {
      await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            const { address1, address2, address3 } = data.results[0]

            setValue("prefecture", address1);
            setValue("city", address2 + address3);
            // setValue("street", address3);
          } else {
            console.log("Address not found")
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
    };

    getAddress();
  }, [zipCode])

  useEffect(() => {
    const eventReserveData = localStorage.getItem("eventReserveData");
    const customerData = localStorage.getItem("customerData");
    if (eventReserveData) {
      setReserveDateTime(JSON.parse(eventReserveData));
      if (customerData) {
        const customerConvData = JSON.parse(customerData);
        setCustomer(customerConvData);
        setIsReceiveInfo(customerConvData.isReceiveInfo);
      }
    } else {
      router.push(`/smilebuilders/events/${id}/`);
    }

    const fetchEventDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        const data = res.data[0];
        setEvent(data);
      }
      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  const {
    title, type,
    prefecture, address1, address2,
    images, mainIndex,
  } = event;

  const mainImg = images?.split(",").map((img) => img.trim())[mainIndex] || "/imgs/events/no_image.png";
  const webAddress = (prefecture || "") + (address1 || "") + (address2 || "");

  const onSubmit = async (data: ICustomerForm) => {
    const { lastName, firstName, seiName, meiName,
      phone, email, note,
      zipCode, prefecture, city, street, building,
    } = data;

    localStorage.setItem("customerData", JSON.stringify({
      lastName, firstName, seiName, meiName,
      phone, email, note,
      zipCode, prefecture, city, street, building,
      isReceiveInfo,
    }));

    router.push(`/smilebuilders/events/${id}/confirm`);
  }

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <section className="flex flex-col w-full max-w-[640px] mx-auto">
        {/* Event Information */}
        <div className="mt-5">
          <div className="w-full">
            <p className="bg-[#c8c8c8] text-center text-white p-1 text-sm">
              予約完了まであと2ステップです！
            </p>
            <ol className="flex justify-between relative list-none m-5 before:content-[''] before:absolute before:block before:bg-[#c8c8c8] before:top-5 before:h-[3px] before:w-full">
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-[#c8c8c8] border-[2px] border-solid border-[#c8c8c8] rounded-full bg-white">1</li>
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-white border-[2px] border-solid border-[#448ACA] rounded-full bg-[#448ACA]">2</li>
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-[#c8c8c8] border-[2px] border-solid border-[#c8c8c8] rounded-full bg-white">3</li>
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-[#c8c8c8] border-[2px] border-solid border-[#c8c8c8] rounded-full bg-white">
                <FaCheck />
              </li>
            </ol>
          </div>

          <div className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:block after:w-full after:h-full after:bg-[rgba(0,0,0,0.6)]">
            <Image src={mainImg} width={640} height={360} alt="イベント画像" />
            <div className="absolute z-10 bottom-0 text-white p-6">
              <h1 className=" text-xl mb-3 font-bold underline">{title}</h1>
              <p className="text-sm">{type}</p>
              <p className="text-sm">{webAddress}</p>
            </div>
          </div>

          <div className="w-full flex">
            <dl className="w-[50%] border-[1px] px-3 py-2">
              <dt className="text-xs">予約希望日</dt>
              <dd className="mt-[2px]">{formatDateToJapaneseString(new Date(reserveDateTime.reserveDate))}</dd>
            </dl>
            <dl className="w-[50%] border-[1px] border-l-0 px-3 py-2">
              <dt className="text-xs">時間</dt>
              <dd className="mt-[2px]">{reserveDateTime?.startTime}</dd>
            </dl>
          </div>
        </div>

        <div className="p-3">
          <h2 className="flex items-center text-xl font-bold">
            <BsFillCheckCircleFill className="mr-2" />
            <span>お客様の情報</span>
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Client Name */}
            <div className="flex w-full gap-x-4 mt-4">
              <div>
                <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                  <InputLabel>姓</InputLabel>
                  <RequiredLabel />
                </div>
                <InputField id="lastName" control={control} value={customer.lastName} placeholder="例）見学" />
              </div>
              <div>
                <div className="flex pl-2 mb-2">
                  <InputLabel>名</InputLabel>
                </div>
                <InputField id="firstName" control={control} value={customer.firstName} placeholder="例）太郎" />
              </div>
            </div>
            {(errors.lastName || errors.firstName) && (
              <p className="text-sm mt-3 text-m-red">
                {errors.lastName && errors.lastName?.message}
                {!errors.lastName && errors.firstName?.message}
              </p>
            )}

            {/* Furigana Client Name */}
            <div className="flex w-full gap-x-4 mt-8">
              <div>
                <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                  <InputLabel>せい</InputLabel>
                  <RequiredLabel />
                </div>
                <InputField id="seiName" control={control} value={customer.seiName} placeholder="例）けんがく" />
              </div>
              <div>
                <div className="flex pl-2 mb-2">
                  <InputLabel>めい</InputLabel>
                </div>
                <InputField id="meiName" control={control} value={customer.meiName} placeholder="例）たろう" />
              </div>
            </div>
            {(errors.seiName || errors.meiName) && (
              <p className="text-sm mt-3 text-m-red">
                {errors.seiName && errors.seiName?.message}
                {!errors.seiName && errors.meiName?.message}
              </p>
            )}

            {/* Contract Phone */}
            <div className="w-full mt-8">
              <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                <InputLabel>電話番号（ハイフンなし）</InputLabel>
                <RequiredLabel />
              </div>

              <div className="w-full">
                <InputField id="phone" control={control} className="w-full" value={customer.phone} placeholder="例）09011112222" />
              </div>

              {errors.phone && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="w-full mt-8">
              <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                <InputLabel>メールアドレス</InputLabel>
                <RequiredLabel />
              </div>

              <div className="w-full">
                <InputField id="email" control={control} className="w-full" value={customer.email} placeholder="例）○○○○@example.com" />
              </div>

              {errors.email && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.email.message}
                </p>
              )}

              <p className="text-sm mt-3">
                GmailやYahoo・iCloudメールなどの「html形式メールが受信可能な」メールアドレスを推奨しています。<br />
                ※携帯キャリアメールの場合は、正しくご確認できない場合がございますので、ご了承ください。
              </p>
            </div>

            {/* Postal Code */}
            <div className="w-full mt-8">
              <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                <InputLabel>郵便番号</InputLabel>
                <RequiredLabel />
              </div>

              <div className="w-full">
                <InputField id="zipCode" control={control} className="w-1/2" value={customer.zipCode} placeholder="例）0000000" />
              </div>

              {errors.zipCode && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.zipCode.message}
                </p>
              )}

              <p className="text-sm mt-3">
                郵便番号を入力いただくと自動で住所が入力されます
              </p>
            </div>

            {/* Prefecture & City */}
            <div className="flex w-full gap-x-2 mt-8">
              <div className="w-1/2">
                <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                  <InputLabel>都道府県</InputLabel>
                  <RequiredLabel />
                </div>
                <InputField id="prefecture" control={control} value={customer.prefecture} placeholder="例）鹿児島県" />
              </div>
              <div className="w-full">
                <div className="flex pl-2 mb-2">
                  <InputLabel>市区町村</InputLabel>
                  <RequiredLabel />
                </div>
                <InputField id="city" control={control} className="w-full" value={customer.city} placeholder="例）姶良市加治木町" />
              </div>
            </div>
            {(errors.prefecture || errors.city) && (
              <p className="text-sm mt-3 text-m-red">
                {errors.prefecture && errors.prefecture?.message}
                {!errors.prefecture && errors.city?.message}
              </p>
            )}

            {/* Street */}
            <div className="w-full mt-8">
              <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                <InputLabel>番地</InputLabel>
                <RequiredLabel />
              </div>

              <div className="w-full">
                <InputField id="street" control={control} className="w-full" value={customer.street} placeholder="例）〇〇町1丁目23-45" />
              </div>

              {errors.email && (
                <p className="text-sm mt-3 text-m-red">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Building Name */}
            <div className="w-full mt-8">
              <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                <InputLabel>建物名・部屋番号</InputLabel>
              </div>

              <div className="w-full">
                <InputField id="building" control={control} className="w-full" value={customer.building} placeholder="例）〇〇マンション〇号室" />
              </div>
            </div>

            {/* Contract Info */}
            <div className="w-full mt-8">
              <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                <InputLabel>質問・ご連絡事項</InputLabel>
              </div>

              <div className="w-full">
                <MultilineField id="note" control={control} className="w-full" value={customer.note} />
              </div>
            </div>

            <div className="w-full mt-6">
              <CheckBox
                checked={isReceiveInfo} setChecked={setIsReceiveInfo}
                className="flex items-center ml-auto"
                text="住宅会社からの情報提供を希望しない"
              />
            </div>

            {/* Register Button */}
            <div className="w-full mt-5">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  padding: "5px 30px",
                  fontSize: "24px",
                  borderRadius: "1px",
                }}
              >
                確認画面へ
              </Button>
            </div>

            {/* Backward Button */}
            <div className="w-full mt-5">
              <Button
                onClick={() => router.push(`/smilebuilders/events/${id}`)}
                variant="contained"
                sx={{
                  padding: "5px 12px",
                  marginBottom: "10px",
                  fontSize: "16px",
                  borderRadius: "1px",
                  background: "#777",
                  '&:hover': {
                    background: "#777",
                    opacity: 0.9,
                  }
                }}
              >
                <IoArrowBackCircle className="text-xl" />
                <span className="ml-1">詳細ページに戻る</span>
              </Button>
            </div>
          </form>
        </div>
      </section >
    )
  );
};

export default EventReservePage;
