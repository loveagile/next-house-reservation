"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, InputLabel } from "@mui/material";

import { IoIosInformationCircle } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";

import CheckBox from "@/components/molecules/Input/CheckBox";
import InputField from "@/components/molecules/Input/InputField";
import RequiredLabel from "@/components/atoms/Label/RequiredLabel";
import MultilineField from "@/components/molecules/Input/MultilineField";
import MoreFormFC from "@/components/molecules/MoreFormFC";

import Loading from "@/components/molecules/loading";
import { IEvent, initialEvent } from "@/utils/types";
import { formatDateToJapaneseString } from "@/utils/convert";

import { IEventFormProps } from "../edit/EventFormEdit";

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
  const { id, event_url } = useParams();
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
  const [formValues, setFormValues] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const schema = yup.object().shape({
    lastName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください。"),
    firstName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください。"),
    seiName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください。")
      .matches(hiraganaRegex, 'ひらがなで入力してください。'),
    meiName: yup.string().required("入力してください。")
      .max(10, "10字以内で入力してください。")
      .matches(hiraganaRegex, 'ひらがなで入力してください。'),
    zipCode: yup.string().required("入力してください。")
      .test('is-not-empty', '7桁の数字で入力してください。', (value) => {
        value = value.replaceAll('-', '')
        return /^\d+$/.test(value) && value.length === 7;
      }),
    prefecture: yup.string().required("入力してください。"),
    city: yup.string().required("入力してください。"),
    street: yup.string().required("入力してください。"),
    phone: yup.string().required("入力してください。")
      .test('is-not-empty', '電話番号を正しく入力してください。', (value) => {
        value = value.replaceAll('-', '')
        return /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/g.test(value)
      }),
    email: yup.string().required("入力してください。")
      .email("メールアドレスを正しく入力してください。")
      .max(80, "80字以内で入力してください。"),
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
    if (!zipCode) return;
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
            console.error("Address not found")
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
        setFormValues(customerConvData.formValues);
        setIsReceiveInfo(customerConvData.isReceiveInfo);
      }
    } else {
      router.push(`/${event_url}/events/${id}/`);
    }

    const fetchEventDetail = async () => {
      setIsLoading(true);
      const res = await axios.post("/api/events/detail", { id });
      if (res.status === 200) {
        const data = res.data[0];
        setEvent(data);

        const userID = data.userID;
        const { data: user } = await axios.post("/api/auth/detail", {
          id: userID,
        });
        if (user.eventURL !== event_url) {
          router.push("/404");
        }
      } else {
        router.push("/404");
      }

      setIsLoading(false);
    };
    fetchEventDetail();
  }, []);

  const {
    title, type,
    prefecture, address1, address2,
    images, mainIndex, reserveForm,
  } = event;

  const mainImg = images?.split(",").map((img) => img.trim())[mainIndex] || "/imgs/events/no_image.png";
  const webAddress = (prefecture || "") + (address1 || "") + (address2 || "");
  const moreForms = reserveForm ? JSON.parse(reserveForm) as IEventFormProps[] : [];

  const onMoreFormChange = (index: number, updatedValue: string = "") => {
    const nextValues = formValues.slice();
    while (nextValues.length < index) {
      nextValues.push("");
    }
    nextValues[index] = updatedValue;
    setFormValues(nextValues);
  }

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
      formValues,
    }));

    let errorStrs: string[] = [];

    for (let i = 0; i < moreForms.length; i++) {
      if (moreForms[i].isNecessary && !formValues[i]) {
        const errorMessage = (moreForms[i].type === "一行テキスト" || moreForms[i].type === "複数行テキスト")
          ? "入力してください。"
          : "選択してください。";

        errorStrs.push(errorMessage);
      } else {
        errorStrs.push("");
      }
    }

    setFormErrors(errorStrs);
    if (errorStrs.some(error => error)) return;

    router.push(`/${event_url}/events/${id}/confirm`);
  }

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <div className="bg-[#F3F4F6] w-full min-h-screen">
        <div className="flex flex-col w-full max-w-[640px] bg-white mx-auto my-8 rounded-xl">
          {/* Event Information */}
          <div className="px-6">
            <div className="w-full">
              <p className="bg-[#D1D5DB] text-center text-black p-1 text-sm">
                予約完了まであと少し！
              </p>
              <div className="flex items-center justify-center my-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold">
                  1
                </div>
                <div className="h-1 w-16 bg-[#3B82F6]"></div>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold">
                  2
                </div>
                <div className="h-1 w-16 bg-[#c8c8c8]"></div>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-[#c8c8c8] border-[2px] text-black font-bold">
                  3
                </div>
                <div className="h-1 w-16 bg-[#c8c8c8]"></div>

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-[#c8c8c8] border-[2px] text-black font-bold">
                  <IoCheckmarkSharp />
                </div>
              </div>
            </div>

            <div className="relative rounded-xl">
              <Image src={mainImg} className="rounded-xl" width={640} height={360} alt="イベント画像" />
            </div>

            <div className="bg-[#F9FAFB] p-6 my-8 rounded-xl">
              <h2 className="text-lg text-black font-bold">予約内容</h2>
              <p className="border-b-[1px] border-[#E5E7EB] py-3">
                <span className="inline-block w-[100px]">イベント名</span>{title}
              </p>
              <p className="border-b-[1px] border-[#E5E7EB] py-3">
                <span className="inline-block w-[100px]">開催場所</span>{webAddress}
              </p>
              <p className="border-b-[1px] border-[#E5E7EB] py-3">
                <span className="inline-block w-[100px]">予約日</span>
                {formatDateToJapaneseString(new Date(reserveDateTime.reserveDate))}
              </p>
              <p className="pt-3">
                <span className="inline-block w-[100px]">予約時間</span>
                {reserveDateTime?.startTime}
              </p>
            </div>
          </div>

          <div className="px-6 pb-8">
            <h2 className="flex items-center text-lg font-bold">
              <IoIosInformationCircle className="text-2xl mr-2" />
              <span className="text-black">お客様の情報</span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Client Name */}
              <div className="flex w-full gap-x-4 mt-4">
                <div>
                  <div className="flex mb-2">
                    <InputLabel>姓</InputLabel>
                    <RequiredLabel />
                  </div>
                  <InputField id="lastName" control={control} value={customer.lastName} placeholder="例) 田中" />
                </div>
                <div>
                  <div className="flex mb-2">
                    <InputLabel>名</InputLabel>
                    <RequiredLabel />
                  </div>
                  <InputField id="firstName" control={control} value={customer.firstName} placeholder="例) 太郎" />
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
                  <div className="flex mb-2">
                    <InputLabel>せい</InputLabel>
                    <RequiredLabel />
                  </div>
                  <InputField id="seiName" control={control} value={customer.seiName} placeholder="例) たなか" />
                </div>
                <div>
                  <div className="flex mb-2">
                    <InputLabel>めい</InputLabel>
                    <RequiredLabel />
                  </div>
                  <InputField id="meiName" control={control} value={customer.meiName} placeholder="例) たろう" />
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
                <div className="flex mb-2">
                  <InputLabel>電話番号（ハイフンなし）</InputLabel>
                  <RequiredLabel />
                </div>

                <div className="w-full">
                  <InputField id="phone" control={control} className="w-full" value={customer.phone} placeholder="例) 09011112222" />
                </div>

                {errors.phone && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="w-full mt-8">
                <div className="flex mb-2">
                  <InputLabel>メールアドレス</InputLabel>
                  <RequiredLabel />
                </div>

                <div className="w-full">
                  <InputField id="email" control={control} className="w-full" value={customer.email} placeholder="例) ○○○○@example.com" />
                </div>

                {errors.email && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.email.message}
                  </p>
                )}

                <p className="text-sm leading-5 mt-3">
                  Gmail・Yahoo!・iCloudメールなどの「.html形式メールが受信可能な」メールアドレスを推奨しています。<br />
                  ※携帯キャリアメールの場合は、正しくご確認できない場合がございますので、ご了承ください。
                </p>
              </div>

              {/* Postal Code */}
              <div className="w-full mt-8">
                <div className="flex mb-2">
                  <InputLabel>郵便番号</InputLabel>
                  <RequiredLabel />
                </div>

                <div className="w-full">
                  <InputField id="zipCode" control={control} className="w-1/2" value={customer.zipCode} placeholder="例) 0000000" />
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
                  <div className="flex mb-2">
                    <InputLabel>都道府県</InputLabel>
                    <RequiredLabel />
                  </div>
                  <InputField id="prefecture" control={control} value={customer.prefecture} placeholder="例) 鹿児島県" />
                </div>
                <div className="w-full">
                  <div className="flex pl-2 mb-2">
                    <InputLabel>市区町村</InputLabel>
                    <RequiredLabel />
                  </div>
                  <InputField id="city" control={control} className="w-full" value={customer.city} placeholder="例) 鹿児島市加治屋町" />
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
                <div className="flex mb-2">
                  <InputLabel>番地</InputLabel>
                  <RequiredLabel />
                </div>

                <div className="w-full">
                  <InputField id="street" control={control} className="w-full" value={customer.street} placeholder="例) ○○ビル123-45" />
                </div>

                {errors.email && (
                  <p className="text-sm mt-3 text-m-red">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Building Name */}
              <div className="w-full mt-8">
                <div className="flex mb-2">
                  <InputLabel>建物名・部屋番号</InputLabel>
                </div>

                <div className="w-full">
                  <InputField id="building" control={control} className="w-full" value={customer.building} placeholder="例) ○○マンション○号室" />
                </div>
              </div>

              {/* More Form Items */}
              {moreForms.map((form, index) => (
                <MoreFormFC key={index} formData={form} index={index}
                  value={formValues.length > index ? formValues[index] : ""}
                  error={formErrors.length > index ? formErrors[index] : ""}
                  onFormChange={onMoreFormChange} />
              ))}

              {/* Contract Info */}
              <div className="w-full mt-8">
                <div className="flex mb-2">
                  <InputLabel>質問・ご要望事項</InputLabel>
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
                    maxWidth: "640px",
                    fontWeight: "5500",
                    backgroundColor: "#2563EB",
                    color: "white",
                    fontSize: "18px",
                    padding: "8px",
                    '&:hover': {
                      backgroundColor: "#2563EB",
                      opacity: 0.9,
                      transition: "all 0.3s ease-out"
                    }
                  }}
                >
                  確認画面へ
                </Button>
              </div>

              {/* Backward Button */}
              <div className="w-full mt-5">
                <Button
                  onClick={() => router.push(`/${event_url}/events/${id}`)}
                  variant="contained"
                  sx={{
                    width: "100%",
                    maxWidth: "640px",
                    fontWeight: "500",
                    backgroundColor: "#4B5563",
                    color: "white",
                    fontSize: "18px",
                    padding: "4px 8px",
                    '&:hover': {
                      backgroundColor: "#4B5563",
                      opacity: 0.9,
                      transition: "all 0.3s ease-out"
                    }
                  }}
                >
                  <span className="ml-1">詳細ページに戻る</span>
                </Button>
              </div>
            </form>
          </div>

          <footer className="bg-[#2563EB] rounded-b-xl">
            <div className="flex items-center justify-center p-10 w-full max-w-[760px] text-white text-sm m-auto">
              <div className="leading-5">
                <Link href="https://smile-builders-hiraya.com/" className="text-xl font-bold block mb-3">
                  スマイルビルダーズ‐姶良総合住宅展示場-
                </Link>
                <p className="text-center">〒899-5432</p>
                <p className="text-center">鹿児島県姶良市加治木町木田2511-1</p>
              </div>
            </div>
          </footer>
        </div >
      </div >
    )
  );
};

export default EventReservePage;
