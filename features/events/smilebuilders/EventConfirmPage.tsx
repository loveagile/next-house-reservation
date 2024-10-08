"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";

import { Button, InputLabel } from "@mui/material";

import { FaCheck } from "react-icons/fa6";
import { IoArrowBackCircle } from "react-icons/io5";

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

const EventConfirmPage: React.FC = () => {
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

  const { control } = useForm<ICustomerForm>();

  useEffect(() => {
    const eventReserveData = localStorage.getItem("eventReserveData");
    const customerData = localStorage.getItem("customerData");
    if (eventReserveData && customerData) {
      const customerConvData = JSON.parse(customerData);
      setReserveDateTime(JSON.parse(eventReserveData));
      setCustomer(customerConvData);
      setIsReceiveInfo(customerConvData.isReceiveInfo);
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

  const handleSubmit = async () => {
    let customerId = -1;
    const customerData = await axios.post("/api/customers/detail", {
      field_name: "email",
      field_value: customer.email,
    });

    if (customerData.status === 200) {
      const data = customerData.data;
      if (data.length > 0) {
        customerId = data[0].id;
      } else {
        const { lastName, firstName, seiName, meiName,
          zipCode, prefecture, city, street, building,
          phone, email, note,
        } = data;
        const res = await axios.post('/api/customers/create', {
          status: "未設定", route: "予約",
          lastName, firstName, seiName, meiName,
          zipCode, prefecture, city, street, building,
          phone: phone.replaceAll("-", ""),
          email, note,
          delivery: "未設定",
        });
        const { lastCustomerId } = res.data;
        customerId = lastCustomerId;
      }
    }

    await axios.post('/api/reservations/create', {
      customerId,
      eventId: id,
      reserveDate: reserveDateTime.reserveDate,
      startTime: reserveDateTime.startTime,
      endTime: reserveDateTime.endTime,
      status: "active",
      route: "KC",
    });

    router.push(`/smilebuilders/events/${id}/complete`);;
  }

  return (
    isLoading ? <Loading mlWidth={0} /> : (
      <section className="flex flex-col w-full max-w-[640px] mx-auto">
        {/* Event Information */}
        <div className="mt-5">
          <div className="w-full">
            <p className="bg-[#c8c8c8] text-center text-white p-1 text-sm">
              予約完了まであと1ステップです！
            </p>
            <ol className="flex justify-between relative list-none m-5 before:content-[''] before:absolute before:block before:bg-[#c8c8c8] before:top-5 before:h-[3px] before:w-full">
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-[#c8c8c8] border-[2px] border-solid border-[#c8c8c8] rounded-full bg-white">1</li>
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-[#c8c8c8] border-[2px] border-solid border-[#c8c8c8] rounded-full bg-white">2</li>
              <li className="relative z-10 w-11 h-11 flex justify-center items-center text-white border-[2px] border-solid border-[#448ACA] rounded-full bg-[#448ACA]">3</li>
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

          <p className="p-2 border-[1px] border-[#e73939] rounded-md text-sm text-center mx-auto my-5 w-4/5 leading-6">
            まだ送信は完了していません。<br />
            内容をご確認の上、「予約を確定します」ボタンを押してください。
          </p>
        </div>

        <div className="p-3">
          {/* Client Name */}
          <div className="flex w-full gap-x-4 mt-4">
            <div>
              <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                <InputLabel>姓</InputLabel>
              </div>
              <InputField id="lastName" control={control} value={customer.lastName} disabled />
            </div>
            <div>
              <div className="flex pl-2 mb-2">
                <InputLabel>名</InputLabel>
              </div>
              <InputField id="firstName" control={control} value={customer.firstName} disabled />
            </div>
          </div>

          {/* Furigana Client Name */}
          <div className="flex w-full gap-x-4 mt-8">
            <div>
              <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                <InputLabel>せい</InputLabel>
              </div>
              <InputField id="seiName" control={control} value={customer.seiName} disabled />
            </div>
            <div>
              <div className="flex pl-2 mb-2">
                <InputLabel>めい</InputLabel>
              </div>
              <InputField id="meiName" control={control} value={customer.meiName} disabled />
            </div>
          </div>

          {/* Contract Phone */}
          <div className="w-full mt-8">
            <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
              <InputLabel>電話番号（ハイフンなし）</InputLabel>
            </div>

            <div className="w-full">
              <InputField id="phone" control={control} className="w-full" value={customer.phone} disabled />
            </div>
          </div>

          {/* Email Address */}
          <div className="w-full mt-8">
            <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
              <InputLabel>メールアドレス</InputLabel>
              <RequiredLabel />
            </div>

            <div className="w-full">
              <InputField id="email" control={control} className="w-full" value={customer.email} disabled />
            </div>

            <p className="text-sm mt-3">
              GmailやYahoo・iCloudメールなどの「html形式メールが受信可能な」メールアドレスを推奨しています。<br />
              ※携帯キャリアメールの場合は、正しくご確認できない場合がございますので、ご了承ください。
            </p>
          </div>

          {/* Postal Code */}
          <div className="w-full mt-8">
            <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
              <InputLabel>郵便番号</InputLabel>
            </div>

            <div className="w-full">
              <InputField id="zipCode" control={control} className="w-1/2" value={customer.zipCode} disabled />
            </div>

            <p className="text-sm mt-3">
              郵便番号を入力いただくと自動で住所が入力されます
            </p>
          </div>

          {/* Prefecture & City */}
          <div className="flex w-full gap-x-2 mt-8">
            <div className="w-1/2">
              <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
                <InputLabel>都道府県</InputLabel>
              </div>
              <InputField id="prefecture" control={control} value={customer.prefecture} disabled />
            </div>
            <div className="w-full">
              <div className="flex pl-2 mb-2">
                <InputLabel>市区町村</InputLabel>
              </div>
              <InputField id="city" control={control} className="w-full" value={customer.city} disabled />
            </div>
          </div>

          {/* Street */}
          <div className="w-full mt-8">
            <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
              <InputLabel>番地</InputLabel>
            </div>

            <div className="w-full">
              <InputField id="street" control={control} className="w-full" value={customer.street} disabled />
            </div>
          </div>

          {/* Building Name */}
          <div className="w-full mt-8">
            <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
              <InputLabel>建物名・部屋番号</InputLabel>
            </div>

            <div className="w-full">
              <InputField id="building" control={control} className="w-full" value={customer.building} disabled />
            </div>
          </div>

          {/* Contract Info */}
          <div className="w-full mt-8">
            <div className="flex pl-2 mb-2 border-l-4 border-[#333]">
              <InputLabel>質問・ご連絡事項</InputLabel>
            </div>

            <div className="w-full">
              <MultilineField id="note" control={control} className="w-full" value={customer.note} disabled />
            </div>
          </div>

          <div className="w-full mt-6">
            <CheckBox
              checked={isReceiveInfo}
              setChecked={setIsReceiveInfo}
              className="flex items-center ml-auto"
              text="住宅会社からの情報提供を希望しない"
              disabled
            />
          </div>

          {/* Register Button */}
          <div className="w-full mt-5">
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                width: "100%",
                padding: "5px 30px",
                fontSize: "24px",
                borderRadius: "1px",
                backgroundColor: "#E7625F",
                '&:hover': {
                  backgroundColor: "#E7625F",
                  opacity: 0.9,
                }
              }}
            >
              予約を確定する
            </Button>
          </div>

          {/* Backward Button */}
          <div className="w-full mt-5">
            <Button
              onClick={() => router.push(`/smilebuilders/events/${id}/reserve`)}
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
              <span className="ml-1">入力内容を修正する</span>
            </Button>
          </div>
        </div>
      </section >
    )
  );
};

export default EventConfirmPage;
